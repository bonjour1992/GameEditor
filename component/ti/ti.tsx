import  ShipHandler  from "@/component/ti/ship";
import FactionHandler from "@/component/ti/faction"
import TechHandler from "@/component/ti/tech"
import HabiliteHandler from "@/component/ti/habilite"
import AgentHandler from "@/component/ti/agent"
import PlanetHandler from "@/component/ti/planet"
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
    ["planet",PlanetHandler]
)


export const strDiese = new Map<string,{code:string,rule:string}>([
["amiral",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-red-800">Amiral</span>),rule:"Sont les agents qui permettent d'effectuer les actions militaires en particuliers les déplacements"}],
["use",{code:ReactDOMServer.renderToStaticMarkup(<span >&#x25A1;</span>),rule:"Utiliser votre agent pour ce tour"}],
["spend",{code:ReactDOMServer.renderToStaticMarkup(<span >&#x25A0;</span>),rule:"Sacrifier votre agent pour toujours"}],


])