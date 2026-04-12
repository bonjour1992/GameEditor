import  ShipHandler  from "@/component/ti/ship";
import FactionHandler from "@/component/ti/faction"
import TechHandler from "@/component/ti/tech"
import HabiliteHandler from "@/component/ti/habilite"
import AgentHandler from "@/component/ti/agent"

import ReactDOMServer from "react-dom/server";


export const  turnNumber = 10

export const element = new Array <[string,any]>(
    ["ship",ShipHandler],
    ["faction",FactionHandler],
    ["tech",TechHandler],
    ["habilite",HabiliteHandler],
    ["agent",AgentHandler])


export const strDiese = new Map<string,{code:string,rule:string}>([
["amiral",{code:ReactDOMServer.renderToStaticMarkup(<span className="text-red-800">Amiral</span>),rule:"Sont les agents qui permettent d'effectuer les actions militaires en particuliers les déplacements"}],
["use",{code:ReactDOMServer.renderToStaticMarkup(<span >&#x25A1;</span>),rule:"Utiliser votre agent pour ce tour"}],
["spend",{code:ReactDOMServer.renderToStaticMarkup(<span >&#x25A0;</span>),rule:"Sacrifier votre agent pour toujours"}],


])