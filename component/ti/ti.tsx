import ShipHandler  from "@/component/ti/ship";
import FactionHandler from "@/component/ti/faction"
import TechHandler from "@/component/ti/tech"
import HabiliteHandler from "@/component/ti/habilite"
import AgentHandler from "@/component/ti/agent"
import PlanetHandler from "@/component/ti/planet"
import SystemHandler from "@/component/ti/systeme"
import TechSheetHandler from "@/component/ti/techSheet"
import MercenaireHandler from "@/component/ti/mercenaire"
import AgendaHandler from "@/component/ti/agenda"
import ReliqueHandler from "@/component/ti/relique"
import PromesseHandler from "@/component/ti/promesse"
import FullFactionHandler from "@/component/ti/fullFaction"

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
    ["techsheet",TechSheetHandler],
    ["mercenaire",MercenaireHandler],
    ["Agenda",AgendaHandler],
    ["relique",ReliqueHandler],
    ["Promesse",PromesseHandler],
    ["fullfaction",FullFactionHandler],

)

const CSSPhase= " font-bold underline "
const CSSCap= " font-bold  "
const CSSAgent= " font-bold text-shadow-xs text-shadow-gray-200 "

export const strDiese = new Map<string,{code:string,rule:string}>([

//agent

["amiral",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSAgent+"text-red-400 "}>Amiral</span>),rule:"Sont les agents qui permettent d'effectuer les actions militaires en particuliers les déplacements"}],
["scien",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSAgent+"text-blue-800"}>Scientifique</span>),rule:"Sont les agents qui permettent de rechercher des technologies ou de faire de l'archéologie"}],
["log",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSAgent+"text-green-400"}>Logisticien</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],
["diplo",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSAgent+"text-pink-400"}>Diplomate</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],
["neg",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSAgent+"text-amber-200"}>Negociant</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],
["pol",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSAgent+"text-amber-600"}>Politicien</span>),rule:"Sont les agents qui permettent d'effectuer les actions de production et construction"}],

//phase

["ravit",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de Ravitaillement</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["precru",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de recrutement</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["depl",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de déplacement</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pscience",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de Science</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pdiplo",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de Diplomatie</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pcan",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de canon spatial</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pcom",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de combat spatial</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pdeb",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de debarquement</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pbomb",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de Bombardement</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pcter",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de combat terrestre</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pprod",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de Production</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pcons",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de construction</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["prev",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de revendication</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pman",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de mandat</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["prevote",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de Prevote</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pvote",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de Vote</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pprop",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de proposition</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["ptreve",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de déclaration de trêve</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["pevent",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de d'évenement</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["decomp",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSPhase}>Phase de decompte</span>),rule:"Phase de calcul de score a la fin du tour 10"}],


["use",{code:ReactDOMServer.renderToStaticMarkup(<span  >&#x25A1;</span>),rule:"Utiliser votre agent pour ce tour"}],
["spend",{code:ReactDOMServer.renderToStaticMarkup(<span >&#x25A0;</span>),rule:"Sacrifier votre agent pour toujours"}],

//capacité

["can",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Canon spatial</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["bomb",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Bombardement</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["pill",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Pillage</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["prod",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Production</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["rep",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Réparation</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["aggre",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Aggressive</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["def",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Defensif</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["livr",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>livraisons commercialles</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["raid",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Raid</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["fpre",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Frappe en premier</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["indes",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Indestructible</span>),rule:"Cette unité n'est pas détruite si elle est réduite a 0 PV mais désactivé jusqu'a réparation"}],
["comp",{code:ReactDOMServer.renderToStaticMarkup(<span className={CSSCap}>Comptoir commercial</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],


//ressource

["fragmil",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Fragment de Relique militaire</span>),rule:"Fragment de relique militaire(rouge)"}],
["pv",{code:ReactDOMServer.renderToStaticMarkup(<span className="">PV </span>),rule:"Point de victoire"}],
["res",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">ressources</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["inf",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">influences</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["com",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Commerces</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["point",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Point</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["infa",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Point d'infamie</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],
["fav",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">faveur</span>),rule:"Capacité de combat avec une portée de base de 0-1"}],

//autres

["pleg",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold text-amber-300 ">Planéte légendaire</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["con",{code:ReactDOMServer.renderToStaticMarkup(<span className="font-bold">Contrôle</span>),rule:"Phase de déplacement de tout type de vaisseau"}],
["tva",{code:ReactDOMServer.renderToStaticMarkup(<span className="">Trou de verre alpha</span>),rule:"Phase de déplacement de tout type de vaisseau"}],


])