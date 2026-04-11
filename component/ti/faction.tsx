import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { imp, SpecificDisplayer, SpecificDisplayerFromDep } from "@/lib/imp";
import Image from "next/image";
import { turnNumber } from "./ti";
import { ModalPickerInput } from "../input/ModalPickerInput";
import { ImagePicker } from "../input/ImagePicker";


class Faction extends ElementContent {
    logo: string = "/404.jpeg"
    ships: Array<Link> = new Array(20).fill(new Link("ship"))
}

function Display({ data, dep }: { data: Faction, dep: Map<string, Array<ElementJeu>> }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)


    return (<div>
        <div className="grid grid-cols-10 w-500">
            {turn.map((e) => {
                return (<div key={e} className="border-x-6 border-b-12  h-20 border-gray-400 text-center text-gray-400"> <span className="text-7xl">{e}</span></div>)
            })}
        </div>
        <h1 className="text-5xl m-8"><Image src={data?.logo||"/404.jpeg"} loading="eager" alt="Logo manquant" width="80" height="80" className="inline" />   <b>{data?.name}</b></h1>
        <div className="grid grid-cols-4 w-360 h-160 gap-4 overflow auto">
            {Array.from((new Faction).ships.keys()).map((i) => {
                return (<div key={i} className=" w-88 h-56">{data?.ships && data?.ships[i].id!==-1 && <SpecificDisplayerFromDep link={data.ships[i]} dep={dep}/>}</div>)
            })}
        </div>
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content.name} />
                <ImagePicker onChange={onChange} name={"logo"} value={content.logo} />
                <h2>Ship</h2>
                <div className="grid grid-cols-4">
                    {Array.from((new Faction).ships.keys()).map((i) => {
                        return (<div key={i} className="p-2" ><ModalPickerInput onChange={onChange} label={false} name={"ships"} value={content.ships} index={i} type={["ship","tech"]} dep={dep || []} /></div>)
                    })}

                </div>
                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Faction",classe: Faction, form: Form, display: Display, dep: Array<string>("ship","tech") }