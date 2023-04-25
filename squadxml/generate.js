/*
Script to build squad.xml files at build time for static serving using a YAML format to define the squads
Also handles the build time injection of variables for the POTD edge function

Directory layout
* images - contains insignia PAA and PNG files, one directory per squad
* resources - files that are copied into each final squad directory e.g. css, dtd, xsl, etc.
* squads.yaml - defines actual squads to generate squad.xmls for

Add a new squad by creating a new entry in squads.yaml, creating images/$SQUAD_NAME, and adding the insignia in paa & PNG format to that directory
*/

const fs = require("fs");
const YAML = require('yaml');
const path = require('path');

const squadxmlDir = "./squadxml";
const yamlPath = `${squadxmlDir}/squads.yaml`;
const imagesDir = `${squadxmlDir}/images`;
const resourcesDir = `${squadxmlDir}/resources`;
const outputDir = process.argv[3];
const potdFuncFile = process.argv[4];

function renderMemberElement(member) {
  return `        <member id="${member.id}" nick="${member.nick}">
                <name>${member.name || 'N/A'}</name>
                <email>${member.email || 'N/A'}</email>
                <icq>${member.icq || 'N/A'}</icq>
                <remark>${member.remark || 'N/A'}</remark>
        </member>
`;
};

function renderSquadXML(squad, members) {
  const membersBlock = members.map(renderMemberElement).join('');
  return `<?xml version="1.0"?>
<!DOCTYPE squad SYSTEM "squad.dtd">
<?xml-stylesheet href="squad.xsl?" type="text/xsl"?>
<squad nick="${squad.nick}">
        <name>${squad.name}</name>
        <email>${squad.email}</email>
        <web>${squad.web}</web>
        <picture>${squad.picture}</picture>
        <title>${squad.title}</title>
${membersBlock.trimRight()}
</squad>
`;
};

// intAsBigInt to preserve Steam IDs
const config = YAML.parse(fs.readFileSync(yamlPath, 'utf8'), { intAsBigInt: true });

console.log(`Creating output directory: ${outputDir}`);
fs.mkdirSync(outputDir);

const potdFuncConfig = {
  paaFilePaths: {},
  membersAllowedSquads: {'allMembers': []}
};

Object.keys(config.squads).forEach(squadName => {
  const squadOutDir = path.join(outputDir, squadName);
  console.log(`Processing ${squadName} => ${squadOutDir}`);

  const squad = config.squads[squadName];
  var membersInSquad = [];
  if(squad.allMembers) {
    membersInSquad = config.members;
  } else {
    membersInSquad = config.members.filter(m => m.isHost || m.squads.includes(squadName));
  };

  const squadXML = renderSquadXML(squad, membersInSquad);

  fs.mkdirSync(squadOutDir);
  fs.writeFileSync(path.join(squadOutDir, "squad.xml"), squadXML);
  fs.cpSync(resourcesDir, squadOutDir, {recursive:true});
  fs.cpSync(path.join(imagesDir, squadName), squadOutDir, {recursive:true});

  potdFuncConfig.paaFilePaths[squad.picture] = `/xml3/${squadName}/${squad.picture}`;
  membersInSquad.forEach((m) => {
    if(!potdFuncConfig.membersAllowedSquads[m.id]) {
      potdFuncConfig.membersAllowedSquads[m.id] = [];
    }
    potdFuncConfig.membersAllowedSquads[m.id].push(squadName);
  });
  if(squad.allMembers) {
    potdFuncConfig.membersAllowedSquads['allMembers'].push(squadName);
  }
});

if (config.rootSquad) {
  fs.cpSync(path.join(outputDir, config.rootSquad), outputDir, {recursive:true});
};

fs.appendFileSync(potdFuncFile, "\nconst injectedConfig = " + JSON.stringify(potdFuncConfig) + ";\n");
