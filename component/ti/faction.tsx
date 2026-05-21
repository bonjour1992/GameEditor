import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { A4pa, buttonCSS, small, w_A4pa } from "../classCSS";
import { SpecificDisplayerFromDep } from "@/lib/imp";
import Image from "next/image";
import { turnNumber } from "./ti";
import { ModalPickerInput } from "../input/ModalPickerInput";
import { ImagePicker } from "../input/ImagePicker";
import { ColorInput } from "../input/ColorInput";
import { TableInput } from "../input/TableInput";


class Faction extends ElementContent {
    logo: string = "/404.jpeg"
    color: string = "#FFFFFF"
    ships: Array<Link> = new Array(12).fill(new Link("ship"))
    agents: Array<Link> = new Array(7).fill(new Link("agent"))
    rules: Array<Link> = new Array(5).fill(new Link("habilite"))
    agentNum:number=0
    ruleNum:number=0
}

function Display({ data, dep }: { data: Faction, dep: Map<string, Array<ElementJeu>> }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)

    return (<div className={"bg-[url(/ti/bg%20star.jpg)] overflow-hidden" + A4pa}>
        <div className={"grid grid-cols-10 " + w_A4pa}>
            {turn.map((e) => {
                return (<div key={e} className="border-x-6 border-b-12  h-15 border-gray-400 text-center text-gray-400"> <span className="text-5xl">    {e}</span></div>)
            })}
        </div>
        <h1 className="text-6xl mx-8 mt-4" style={{ color: data?.color }}><Image src={data?.logo || "/404.jpeg"} loading="eager" alt="Logo manquant" width="80" height="80" className="inline" />   <b>{data?.name}</b></h1>
        <div className="w-42 h-159 float-left flex flex-col gap-2 p-2">
            {Array.from((new Faction).agents.keys()).map((i) => {
                return  data?.agents && data.agentNum>i && data?.agents[i].id !== -1 && <SpecificDisplayerFromDep key={i} link={data.agents[i]} dep={dep} className=" flex-auto "/>
            })}
        </div>
        <div className="grid grid-cols-3 w-186 gap-2 overflow auto float-left">
            {Array.from((new Faction).ships.keys()).map((i) => {
                return (<div key={i} className={" h-37 w-62 p-2"}>{data?.ships && data?.ships[i].id !== -1 && <SpecificDisplayerFromDep link={data.ships[i]} dep={dep} />}</div>)
            })}
        </div>
         <div className="w-52 h-159 float-left ">
            {Array.from((new Faction).rules.keys()).map((i) => {
                return data?.rules && data?.rules[i].id !== -1 && <SpecificDisplayerFromDep  key={i} link={data.rules[i]} dep={dep} />
            })}
        </div>
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    if ( !content.rules)
    {
        content.rules= new Array(5).fill(new Link("habilite"))
        content.ruleNum=0
    }
    function agentLine(x: number) {
        return [(<ModalPickerInput onChange={onChange} name={"agents"} value={content} index={x} type={["agent"]} dep={dep || []} />)]
    }

    function ruleLine(x: number) {
        return [(<ModalPickerInput onChange={onChange} name={"rules"} value={content} index={x} type={["habilite"]} dep={dep || []} />)]
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <TextInput onChange={onChange} name="name" value={content} />
                    <ImagePicker onChange={onChange} name={"logo"} value={content} />
                    <ColorInput onChange={onChange} name={"color"} value={content} />
                </div>
                <h2>Agent</h2>
                <TableInput onChange={onChange} Line={agentLine} max={7} name="agentNum" value={content}/>
                <h2>Ship</h2>
                <div className="grid grid-cols-4">
                    {Array.from((new Faction).ships.keys()).map((i) => {
                        return (<div key={i} className="p-2" ><ModalPickerInput onChange={onChange} name={"ships"} value={content} index={i} type={["ship"]} dep={dep || []} /></div>)
                    })}

                </div>
                <h2>Rule</h2>
                <TableInput onChange={onChange} Line={ruleLine} max={5} name="ruleNum" value={content}/>
                <br />
                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}




export default { name: "Faction", classe: Faction, form: Form, display: Display, dep: Array<string>("ship", "tech", "habilite", "agent"),print:"grid-cols-1" }