// <!--GAMFC-->version base on commit 43fad05dcdae3b723c53c226f8181fc5bd47223e, time is 2023-06-22 15:20:02 UTC<!--GAMFC-END-->.
// @ts-ignore
import { connect } from "cloudflare:sockets";

// How to generate your own UUID:
// [Windows] Press "Win + R", input cmd and run:  Powershell -NoExit -Command "[guid]::NewGuid()"
let userID = "86c50e3a-5b87-49dd-bd20-03c7f2735e40";

const proxyIPs = ["\u0074\u0073\u002e\u0068\u0070\u0063\u002e\u0074\u0077"]; 
const cn_hostnames = [''];
let CDNIP = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d\u002e\u0073\u0067'
// http_ip
let IP1 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d'
let IP2 = '\u0063\u0069\u0073\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d'
let IP3 = '\u0061\u0066\u0072\u0069\u0063\u0061\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d'
let IP4 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d\u002e\u0073\u0067'
let IP5 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u0065\u0075\u0072\u006f\u0070\u0065\u002e\u0061\u0074'
let IP6 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d\u002e\u006d\u0074'
let IP7 = '\u0071\u0061\u002e\u0076\u0069\u0073\u0061\u006d\u0069\u0064\u0064\u006c\u0065\u0065\u0061\u0073\u0074\u002e\u0063\u006f\u006d'

// https_ip
let IP8 = '\u0075\u0073\u0061\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d'
let IP9 = '\u006d\u0079\u0061\u006e\u006d\u0061\u0072\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d'
let IP10 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d\u002e\u0074\u0077'
let IP11 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u0065\u0075\u0072\u006f\u0070\u0065\u002e\u0063\u0068'
let IP12 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u002e\u0063\u006f\u006d\u002e\u0062\u0072'
let IP13 = '\u0077\u0077\u0077\u002e\u0076\u0069\u0073\u0061\u0073\u006f\u0075\u0074\u0068\u0065\u0061\u0073\u0074\u0065\u0075\u0072\u006f\u0070\u0065\u002e\u0063\u006f\u006d'

// http_port
let PT1 = '80'
let PT2 = '8080'
let PT3 = '8880'
let PT4 = '2052'
let PT5 = '2082'
let PT6 = '2086'
let PT7 = '2095'

// https_port
let PT8 = '443'
let PT9 = '8443'
let PT10 = '2053'
let PT11 = '2083'
let PT12 = '2087'
let PT13 = '2096'

let proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
let proxyPort = proxyIP.includes(':') ? proxyIP.split(':')[1] : '443';

if (!isValidUUID(userID)) {
  throw new Error("uuid is not valid");
}

export default {
  /**
   * @param {import("@cloudflare/workers-types").Request} request
   * @param {uuid: string, proxyip: string, cdnip: string, ip1: string, ip2: string, ip3: string, ip4: string, ip5: string, ip6: string, ip7: string, ip8: string, ip9: string, ip10: string, ip11: string, ip12: string, ip13: string, pt1: string, pt2: string, pt3: string, pt4: string, pt5: string, pt6: string, pt7: string, pt8: string, pt9: string, pt10: string, pt11: string, pt12: string, pt13: string} env
   * @param {import("@cloudflare/workers-types").ExecutionContext} ctx
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    try {
      const { proxyip } = env;
      userID = env.uuid || userID;
			if (proxyip) {
				if (proxyip.includes(']:')) {
					let lastColonIndex = proxyip.lastIndexOf(':');
					proxyPort = proxyip.slice(lastColonIndex + 1);
					proxyIP = proxyip.slice(0, lastColonIndex);
					
				} else if (!proxyip.includes(']:') && !proxyip.includes(']')) {
					[proxyIP, proxyPort = '443'] = proxyip.split(':');
				} else {
					proxyPort = '443';
					proxyIP = proxyip;
				}				
			} else {
				if (proxyIP.includes(']:')) {
					let lastColonIndex = proxyIP.lastIndexOf(':');
					proxyPort = proxyIP.slice(lastColonIndex + 1);
					proxyIP = proxyIP.slice(0, lastColonIndex);	
				} else if (!proxyIP.includes(']:') && !proxyIP.includes(']')) {
					[proxyIP, proxyPort = '443'] = proxyIP.split(':');
				} else {
					proxyPort = '443';
				}	
			}
			console.log('ProxyIP:', proxyIP);
			console.log('ProxyPort:', proxyPort);
      CDNIP = env.cdnip || CDNIP;
	  IP1 = env.ip1 || IP1;
	  IP2 = env.ip2 || IP2;
	  IP3 = env.ip3 || IP3;
	  IP4 = env.ip4 || IP4;
	  IP5 = env.ip5 || IP5;
	  IP6 = env.ip6 || IP6;
	  IP7 = env.ip7 || IP7;
	  IP8 = env.ip8 || IP8;
	  IP9 = env.ip9 || IP9;
	  IP10 = env.ip10 || IP10;
	  IP11 = env.ip11 || IP11;
	  IP12 = env.ip12 || IP12;
	  IP13 = env.ip13 || IP13;
	  PT1 = env.pt1 || PT1;
	  PT2 = env.pt2 || PT2;
	  PT3 = env.pt3 || PT3;
	  PT4 = env.pt4 || PT4;
	  PT5 = env.pt5 || PT5;
	  PT6 = env.pt6 || PT6;
	  PT7 = env.pt7 || PT7;
	  PT8 = env.pt8 || PT8;
	  PT9 = env.pt9 || PT9;
	  PT10 = env.pt10 || PT10;
	  PT11 = env.pt11 || PT11;
	  PT12 = env.pt12 || PT12;
	  PT13 = env.pt13 || PT13;
      const upgradeHeader = request.headers.get("Upgrade");
      const url = new URL(request.url);
      if (!upgradeHeader || upgradeHeader !== "websocket") {
        const url = new URL(request.url);
        switch (url.pathname) {
          case `/${userID}`: {
            const vlessConfig = getVLESSConfig(userID, request.headers.get("Host"));
            return new Response(`${vlessConfig}`, {
              status: 200,
              headers: {
                "Content-Type": "text/html;charset=utf-8",
              },
            });
          }
		  case `/${userID}/ty`: {
			const tyConfig = gettyConfig(userID, request.headers.get('Host'));
			return new Response(`${tyConfig}`, {
				status: 200,
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
				}
			});
		}
		case `/${userID}/cl`: {
			const clConfig = getclConfig(userID, request.headers.get('Host'));
			return new Response(`${clConfig}`, {
				status: 200,
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
				}
			});
		}
		case `/${userID}/sb`: {
			const sbConfig = getsbConfig(userID, request.headers.get('Host'));
			return new Response(`${sbConfig}`, {
				status: 200,
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				}
			});
		}
		case `/${userID}/pty`: {
			const ptyConfig = getptyConfig(userID, request.headers.get('Host'));
			return new Response(`${ptyConfig}`, {
				status: 200,
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
				}
			});
		}
		case `/${userID}/pcl`: {
			const pclConfig = getpclConfig(userID, request.headers.get('Host'));
			return new Response(`${pclConfig}`, {
				status: 200,
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
				}
			});
		}
		case `/${userID}/psb`: {
			const psbConfig = getpsbConfig(userID, request.headers.get('Host'));
			return new Response(`${psbConfig}`, {
				status: 200,
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				}
			});
		}
          default:
            // return new Response('Not found', { status: 404 });
            // For any other path, reverse proxy to 'ramdom website' and return the original response, caching it in the process
            if (cn_hostnames.includes('')) {
            return new Response(JSON.stringify(request.cf, null, 4), {
              status: 200,
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
            });
            }
            const randomHostname = cn_hostnames[Math.floor(Math.random() * cn_hostnames.length)];
            const newHeaders = new Headers(request.headers);
            newHeaders.set("cf-connecting-ip", "1.2.3.4");
            newHeaders.set("x-forwarded-for", "1.2.3.4");
            newHeaders.set("x-real-ip", "1.2.3.4");
            newHeaders.set("referer", "https://www.google.com/search?q=edtunnel");
            // Use fetch to proxy the request to 15 different domains
            const proxyUrl = "https://" + randomHostname + url.pathname + url.search;
            let modifiedRequest = new Request(proxyUrl, {
              method: request.method,
              headers: newHeaders,
              body: request.body,
              redirect: "manual",
            });
            const proxyResponse = await fetch(modifiedRequest, { redirect: "manual" });
            // Check for 302 or 301 redirect status and return an error response
            if ([301, 302].includes(proxyResponse.status)) {
              return new Response(`Redirects to ${randomHostname} are not allowed.`, {
                status: 403,
                statusText: "Forbidden",
              });
            }
            // Return the response from the proxy server
            return proxyResponse;
        }
      } else {
			if(url.pathname.includes('/pyip='))
			{
				const tmp_ip=url.pathname.split("=")[1];
				if(isValidIP(tmp_ip))
				{
					proxyIP=tmp_ip;
					if (proxyIP.includes(']:')) {
						let lastColonIndex = proxyIP.lastIndexOf(':');
						proxyPort = proxyIP.slice(lastColonIndex + 1);
						proxyIP = proxyIP.slice(0, lastColonIndex);	
					} else if (!proxyIP.includes(']:') && !proxyIP.includes(']')) {
						[proxyIP, proxyPort = '443'] = proxyIP.split(':');
					} else {
						proxyPort = '443';
					}
				}	
			}
        return await vlessOverWSHandler(request);
		}
    } catch (err) {
      /** @type {Error} */ let e = err;
      return new Response(e.toString());
    }
  },
};

function isValidIP(ip) {
    var reg = /^[\s\S]*$/;
    return reg.test(ip);
}

/**
 *
 * @param {import("@cloudflare/workers-types").Request} request
 */
async function vlessOverWSHandler(request) {
  /** @type {import("@cloudflare/workers-types").WebSocket[]} */
  // @ts-ignore
  const webSocketPair = new WebSocketPair();
  const [client, webSocket] = Object.values(webSocketPair);

  webSocket.accept();

  let address = "";
  let portWithRandomLog = "";
  const log = (/** @type {string} */ info, /** @type {string | undefined} */ event) => {
    console.log(`[${address}:${portWithRandomLog}] ${info}`, event || "");
  };
  const earlyDataHeader = request.headers.get("sec-websocket-protocol") || "";

  const readable
