import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { A3pa, buttonCSS, small, w_A3pa } from "../classCSS";
import { SpecificDisplayerFromDep } from "@/lib/imp";
import Image from "next/image";
import { turnNumber } from "./ti";
import { ModalPickerInput } from "../input/ModalPickerInput";
import { ImagePicker } from "../input/ImagePicker";
import { ColorInput } from "../input/ColorInput";


class Faction extends ElementContent {
    logo: string = "/404.jpeg"
    color:string="#FFFFFF"
    ships: Array<Link> = new Array(20).fill(new Link("ship"))
}

function Display({ data, dep }: { data: Faction, dep: Map<string, Array<ElementJeu>> }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)

    return (<div className={"bg-[url(/ti/bg%20star.jpg)] "+A3pa}>
        <div className={"grid grid-cols-10 "+w_A3pa}>
            {turn.map((e) => {
                return (<div key={e} className="border-x-6 border-b-12  h-15 border-gray-400 text-center text-gray-400"> <span className="text-5xl">    {e}</span></div>)
            })}
        </div>
        <h1 className="text-7xl mx-8 my-4" style={{ color: data?.color }}><Image src={data?.logo || "/404.jpeg"} loading="eager" alt="Logo manquant" width="80" height="80" className="inline" />   <b>{data?.name}</b></h1>
        <div className="grid grid-cols-4 w-318 gap-2 overflow auto">
            {Array.from((new Faction).ships.keys()).map((i) => {
                return (<div key={i} className={small}>{data?.ships && data?.ships[i].id !== -1 && <SpecificDisplayerFromDep link={data.ships[i]} dep={dep} />}</div>)
            })}
        </div>
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                <TextInput onChange={onChange} name="name" value={content.name} />
                <ImagePicker onChange={onChange} name={"logo"} value={content.logo} />
                <ColorInput onChange={onChange} name={"color"} value={content.color} />
               </div>
                <h2>Ship</h2>
                <div className="grid grid-cols-4">
                    {Array.from((new Faction).ships.keys()).map((i) => {
                        return (<div key={i} className="p-2" ><ModalPickerInput onChange={onChange} label={false} name={"ships"} value={content.ships} index={i} type={["ship","tech","habilite"]} dep={dep || []} /></div>)
                    })}

                </div>
                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Faction", classe: Faction, form: Form, display: Display, dep: Array<string>("ship", "tech","habilite") }