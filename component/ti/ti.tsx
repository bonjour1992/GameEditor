import ShipHandler  from "@/component/ti/ship";
import FactionHandler from "@/component/ti/faction"
import TechHandler from "@/component/ti/tech"
import HabiliteHandler from "@/component/ti/habilite"
import AgentHandler from "@/component/ti/agent"
import PlanetHandler from "@/component/ti/planet"
import SystemHandler from "@/component/ti/systeme"

import ReactDOMServer from "react-dom/server";


export const  turnNumber = 10

export const techType = { gen: "Génétique", spa: "Spatial", mil: "Militaire", soc: "Social" }
export const techIcon = new Map ([[ "gen", "/ti/tech/G.png"],['spa', "/ti/tech/B.png"],[ "mil", "/ti/tech/R.png"], ["soc", "/ti/tech/Y.png" ]])
export const planeteIcon = new Map ([[ "mil", "/ti/icon/mil.png"],['civ', "/ti/icon/cult.png"],[ "sauv", "/ti/icon/sauv.png"]])

export const element = new Array <[string,any]>(
    ["ship",ShipHandler],
    ["faction",FactionHandler],
    ["tech",TechHandler],
    ["habilite",HabiliteHandler],
    ["agent",AgentHandler],
    ["planet",PlanetHandler],
    ["system",SystemHandler],

)


export const strDiese = new Map<string,{code:string,rule:string}>([
["amiral",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-red-800">Amiral</span>),rule:"Sont les agents qui permettent d'effectuer les actions militaires en particuliers les déplacements"}],
["use",{code:ReactDOMServer.renderToStaticMarkup(<span >&#x25A1;</span>),rule:"Utiliser votre agent pour ce tour"}],
["spend",{code:ReactDOMServer.renderToStaticMarkup(<span >&#x25A0;</span>),rule:"Sacrifier votre agent pour toujours"}],
["log",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-green-800">Logisticien</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],
["scien",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-blue-800">Scientifique</span>),rule:"Sont les agents qui permettent de rechercher des technologies ou de faire de l'archéologie"}],
["indes",{code:ReactDOMServer.renderToStaticMarkup(<span >Indestructible</span>),rule:"Cette unité n'est pas détruite si elle est réduite a 0 PV mais désactivé jusqu'a réparation"}],
["can",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Canon spatial</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["fragmil",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Fragment de Relique militaire</span>),rule:"Fragment de relique militaire(rouge)"}],
["decomp",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de decompte</span>),rule:"Phase de calcul de score a la fin du tour 10"}],
["pv",{code:ReactDOMServer.renderToStaticMarkup(<span className="">PV </span>),rule:"Point de victoire"}],
["depl",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de déplacement</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["diplo",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-pink-800">Diplomate</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],
["pcan",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de canon spatial</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pscience",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de Science</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pprod",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de Production</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pdiplo",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de Diplomatie</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["ptreve",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de déclaration de trêve</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pvote",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de Vote</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["prop",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de Proposition</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["bomb",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Bombardement</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["comm",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Commerce</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["pill",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Pillage</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["prod",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Production</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["rep",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Réparation</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["ravit",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de Ravitaillement</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["res",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">ressources</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["inf",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">influences</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["com",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Commerces</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["comp",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Comptoir commercial</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["point",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Point</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["infa",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Point d'infamie</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["precru",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Phase de recrutement</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["pol",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-amber-700">Politicien</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],
["fav",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">faveur</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["aggre",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Aggressive</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["def",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Defensif</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["neg",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-shadow-amber-200">Negociant</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],
["prevote",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Phase de Prevote</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["livr",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">livraisons commercialles</span>),rule:"Phase de déplacement de tout type de vaisseau"}],


])