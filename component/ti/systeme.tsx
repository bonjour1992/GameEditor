import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { ModalPickerInput } from "../input/ModalPickerInput";
import { PlanetPict } from "./planet";
import { getDep } from "../inputUtils";
import { NumberInput } from "../input/NumberInput";
import { RangeInput } from "../input/RangeInput";
import { EnumInput } from "../input/EnumInput";
import Image from "next/image";

const anomaly = {
    ast: "Champ d'astéroïde",
    sup: "Supernova",
    rift: "Rupture gravitationelle",
    neb: "Nébuleuse"
}

const anomalyPict = new Map([["ast", "/ti/system/asteroide.png"],
["sup", "/ti/system/supernova.png"],
["rift", "/ti/system/gravit.png"],
["neb", "/ti/system/nebuleuse.png"]])

class Classe extends ElementContent {
    anomaly: string = ""
    elems: Array<Link> = new Array(3).fill(new Link("planet"))
    elemsX: Array<number> = new Array(3).fill(115)
    elemsY: Array<number> = new Array(3).fill(100)
    elemsSize: Array<number> = new Array(3).fill(120)
}

function Display({ data, dep }: { data: Classe, dep: Map<string, Array<ElementJeu>> }) {


    return (<div className="w-98 h-85 bg-[url(/ti/system/bgSystem.png)] bg-cover relative overflow-hidden" >
        {data.anomaly && <Image src={anomalyPict.get(data.anomaly) || "/404.jpeg"} alt={data.anomaly} width={392} height={340} />}
        {data.anomaly && <Image src="/ti/system/anomalie.png" alt="contient anomalie" width={392} height={340} className="absolute left-0 top-0" />}

        {[0, 1, 2].map(e => <div key={e} className="absolute" style={{ top: data.elemsY[e] + "px", left: data.elemsX[e] + "px", transform: "scale(" + (data.elemsSize[e] / 100) + ")" }}>
            {data.elems[e].id !== -1 && <PlanetPict data={getDep(dep, data.elems[e])?.content} dep={dep}/>}
        </div>)}

    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EnumInput onChange={onChange} name="anomaly" value={content} enumClass={anomaly} aucun={true} />
                {[0, 1, 2].map(e => <div key={e}>
                    <ModalPickerInput onChange={onChange} label={"Element " + (e + 1)} name={"elems"} index={e} value={content} type={["planet"]} dep={dep || []} />
                    <RangeInput onChange={onChange} name="elemsX" index={e} value={content} min={0} max={250} label="X" className={content.elems[e].id === -1 ? "hidden" : ""} />
                    <RangeInput onChange={onChange} name="elemsY" index={e} value={content} min={0} max={200} label="Y" className={content.elems[e].id === -1 ? "hidden" : ""} />
                    <RangeInput onChange={onChange} name="elemsSize" index={e} value={content} min={10} max={300} label="Scale" className={content.elems[e].id === -1 ? "hidden" : ""} />

                </div>)}

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Systéme", classe: Classe, form: Form, display: Display, dep: Array<string>("planet","faction") }