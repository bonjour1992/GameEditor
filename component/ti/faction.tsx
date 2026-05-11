import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { A3pa, buttonCSS, small, w_A3pa } from "../classCSS";
import { SpecificDisplayerFromDep } from "@/lib/imp";
import Image from "next/image";
import { turnNumber } from "./ti";
import { ModalPickerInput } from "../input/ModalPickerInput";
import { ImagePicker } from "../input/ImagePicker";
import { ColorInput } from "../input/ColorInput";
import { TableInput } from "../input/TableInput";
import { ReactNode } from "react";


class Faction extends ElementContent {
    logo: string = "/404.jpeg"
    color: string = "#FFFFFF"
    ships: Array<Link> = new Array(20).fill(new Link("ship"))
    agents: Array<Link> = new Array(7).fill(new Link("agent"))
    agentNum:number=0
}

function Display({ data, dep }: { data: Faction, dep: Map<string, Array<ElementJeu>> }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)

    return (<div className={"bg-[url(/ti/bg%20star.jpg)] " + A3pa}>
        <div className={"grid grid-cols-10 " + w_A3pa}>
            {turn.map((e) => {
                return (<div key={e} className="border-x-6 border-b-12  h-15 border-gray-400 text-center text-gray-400"> <span className="text-5xl">    {e}</span></div>)
            })}
        </div>
        <h1 className="text-7xl mx-8 my-4" style={{ color: data?.color }}><Image src={data?.logo || "/404.jpeg"} loading="eager" alt="Logo manquant" width="80" height="80" className="inline" />   <b>{data?.name}</b></h1>
        <div className="w-58 h-235 float-left ">
            {Array.from((new Faction).agents.keys()).map((i) => {
                return (<div key={i} className=" h-34 w-54 p-2">{data?.agents && data?.agents[i].id !== -1 && <SpecificDisplayerFromDep link={data.agents[i]} dep={dep} />}</div>)
            })}
        </div>
        <div className="grid grid-cols-4 w-318 gap-2 overflow auto float-left">
            {Array.from((new Faction).ships.keys()).map((i) => {
                return (<div key={i} className={small}>{data?.ships && data?.ships[i].id !== -1 && <SpecificDisplayerFromDep link={data.ships[i]} dep={dep} />}</div>)
            })}
        </div>
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    function agentLine(x: number) {
        return [(<ModalPickerInput onChange={onChange} name={"agents"} value={content} index={x} type={["agent"]} dep={dep || []} />)]
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
                        return (<div key={i} className="p-2" ><ModalPickerInput onChange={onChange} name={"ships"} value={content} index={i} type={["ship", "tech", "habilite"]} dep={dep || []} /></div>)
                    })}

                </div>

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}




export default { name: "Faction", classe: Faction, form: Form, display: Display, dep: Array<string>("ship", "tech", "habilite", "agent") }