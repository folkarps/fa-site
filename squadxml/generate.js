/*
Script to build squad.xml files at build time for static serving

Directory layout
* fragments - fragments of squad.xml files (usually members lists) that can be included in final squad.xml files
* resources - files that are copied into each final squad directory e.g. css, dtd, xsl, etc.
* squads - actual squads to generate squad.xmls for
** each directory contains:
*** a paa file, the ingame squad insignia
*** sqd_logo.png - PNG version of paa file to show in web browser
*** squad.xml.template - partial squad.xml file which fragments will be inserted into

Add a new squad by creating a new directory under squads, adding the insignia in paa & PNG format, and a squad.xml.template file
*/

const fs = require("fs");
const path = require('path');

const squadsDir = "./squadxml/squads";
const resourcesDir = "./squadxml/resources"
const fragmentsDir = "./squadxml/fragments"
const outputDir = process.argv[3];

const resources = fs.readdirSync(path.join(resourcesDir));

const fragmentFiles = fs.readdirSync(path.join(fragmentsDir));
var fragments = {};
fragmentFiles.forEach(f => {
  fragments[f] = fs.readFileSync(path.join(fragmentsDir, f));
});

console.log("Creating output directory: " + outputDir);
fs.mkdirSync(outputDir);

const squads = fs.readdirSync(squadsDir);
squads.forEach(squad => {
  var processing = path.join(squadsDir, squad);
  var squadOutDir = path.join(outputDir, squad);
  console.log("Processing " + processing + " => " + squadOutDir);

  fs.mkdirSync(squadOutDir);

  // Copy all files in resources dir
  resources.forEach(res => {
    fs.copyFileSync(path.join(resourcesDir, res), path.join(squadOutDir, res));
  });

  // Shallow copy squad files, populating .template files with fragments
  const squadFiles = fs.readdirSync(processing);
  squadFiles.forEach(f => {
    if(f.endsWith(".template")) {
      var template = fs.readFileSync(path.join(processing, f));
      content = template + "";

      Object.entries(fragments).forEach(e => {
        var name = e[0];
        var v = (e[1] + "").trim();
        var includePattern = new RegExp(`<!--\\s+INCLUDE\\s+${name}\\s+-->`, "ig");
        content = content.replace(includePattern, v);
      });

      fs.writeFileSync(path.join(squadOutDir, f.replace(".template", "")), content);
    } else {
      fs.copyFileSync(path.join(processing, f), path.join(squadOutDir, f));
    }
  });
});

// Special handling for default squad, copy output into root output directory as well
if(fs.existsSync(path.join(outputDir, "default"))) {
  console.log("Special handling for default squad");

  const defaultSquadFiles = fs.readdirSync(path.join(outputDir, "default"));
  defaultSquadFiles.forEach(f => {
    fs.copyFileSync(path.join(outputDir, "default", f), path.join(outputDir, f));
  });
}
