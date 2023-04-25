
export default async (request, context) => {
  if(request.method !== 'GET' && request.method !== 'HEAD') {
    return respondStatus(405);
  }

  const requestFileName = new URL(request.url).pathname.split('/').pop();
  switch(requestFileName) {
    case "squad.xml":
      return await handleSquadXml(request, context);
    default:
      if(injectedConfig.paaFilePaths[requestFileName]) {
        return new URL(injectedConfig.paaFilePaths[requestFileName], request.url);
      }

      const cookieSquad = context.cookies.get(COOKIE_NAME);
      if (cookieSquad) {
        return new URL("/xml3/" + cookieSquad + "/" + requestFileName, request.url);
      }
  }

  return respondStatus(404);
}

export const config = { path: '/xml3/potd/*' /**/ };

const COOKIE_NAME = "fa_potd_current_squad";

const respondStatus = (code) => new Response("", {status: code});

async function handleSquadXml(request, context) {
  const params = new URL(request.url).searchParams;
  const id = params.get("id") || "allMembers";

  if(!injectedConfig.membersAllowedSquads[id]) {
    return respondStatus(404);
  }

  const allowedSquads = injectedConfig.membersAllowedSquads[id];
  const squad = allowedSquads[(await hash(new Date().toDateString() + "-" + id)) % BigInt(allowedSquads.length)];

  context.cookies.set({name: COOKIE_NAME, value: squad});
  return new URL(`/xml3/${squad}/squad.xml`, request.url);
}

// Return the SHA-256 hash of a string as a BigInt
async function hash(s) {
  const hexString = "0x" + new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
  return BigInt(hexString);
}

// \/\/\/ Config from squad.yaml will be injected here at build time as injectedConfig \/\/\/
