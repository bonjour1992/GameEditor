"use client"


import { replaceDiese } from '@/component/inputUtils'
import { NumberInput } from "../input/NumberInput";
import { TagInput } from "../input/TagInput";
import { EnumInput } from "../input/EnumInput";
import { TextInput } from "../input/TextInput";
import { ElementContent } from "@/lib/datatype";
import { buttonCSS } from '../classCSS';
import { componentBorderColor, componentCSS, componentName, componentText } from './ticss';
import { EditorInput } from '../input/EditorInput';
import { nameAff } from '../Utils';



//TODO: gestion image  
const shipClasse = {
    fs: "Vaisseau amiral",
    cruiser: "Croiseur",
    dn: "Cuirassé",
    dest: "Destroyeur",
    mech: "Mecha",
    pds: "Systéme de défense",
    com: "Commerce",
    fact: "Usine",
    dock: "Dock",
    sun: "Soleil de geurre",
    inf: "Infanterie",
    mon: "Monument",
    trans: "Transport"

}

const tag: any = {
    ship: "Vaisseau",
    struc: "Structure",
    mil: "Militaire",
    civ: "Civil",
    com: "Commercial",
    trans: "Transport",
    terre: "Terrestre",
    space: "Spatiale",
    bio: "Biologique",
    transportable: "Transportable",


}

const tagColor: any = {
    mil: "text-red-700",
}

class Ship extends ElementContent {
    type: string = "inf"
    habilite: string = ""
    move?: number
    combat?: number
    combat_touche: number = 1
    cout?: number
    prod: number = 1
    capacite?: number
    PV: number = 1
    mot_cle: string[] = []

}



//TODO: bug affichage sur 4 + touche
function Display({ data }: { data: Ship }) {

    const CSS_numb = "text-xl leading-0  w-11 text-center font-extrabold absolute bottom-2.5 "
    const div_numb = "border-2 h-8 w-11.25 text-center absolute " + componentBorderColor
    const CSS_label ="text-[6px] align-top pt-1 pl-0.5"
    return data !== undefined ? (
        <div className={"border-4 bg-indigo-950/60 rounded-2xl relative z-5 text-amber-50 border-gray-500 w-58 h-37"}>
            <div className={componentName}>{nameAff(data?.name)}</div>
            <div className={"pl-1 py-0.25 text-[10px] leading-none w-full border-b-2 font-bold" + componentBorderColor}>{data.mot_cle?.map((e, k, { length }) => {
                return (<span key={e} className={"" + (tagColor[e] === undefined ? "" : (tagColor[e]))}>{tag[e] + (k === length - 1 ? "" : ", ")}</span>)
            })}</div>
            <div className={"h-24 text-[10px] " + componentText}><span dangerouslySetInnerHTML={{ __html: replaceDiese(data.habilite) }}></span></div>
            {data.cout && (<div className={"rounded-tr-lg rounded-bl-xl  bottom-0 left-0 " + div_numb}><span className={CSS_label}>Coût</span><div className={CSS_numb}>{data.cout}{data.prod > 1 ? "*".repeat(data.prod) : ""}</div></div>)}
            {data.move && (<div className={"rounded-t-lg  bottom-0 left-11.25 " + div_numb}><span className={CSS_label}>Mouvement</span><div className={CSS_numb}>{data.move}</div></div>)}
            {data.combat && (<div className={"rounded-t-lg  bottom-0 left-22.5 " + div_numb}><span className={CSS_label}>Attaque</span><div className={CSS_numb}>{data.combat}{data.combat_touche > 1 ? "*"+data.combat_touche+" ": ""}</div></div>)}
            {data.capacite && (<div className={"rounded-t-lg  bottom-0 left-33.75 " + div_numb}><span className={CSS_label}>Capacité</span><div className={CSS_numb}>{data.capacite}</div></div>)}
            {data.PV && (<div className={"rounded-tl-lg rounded-br-xl  bottom-0 left-45 " + div_numb}><span className={CSS_label}>Résistance</span><div className={CSS_numb}>{data.PV}</div></div>)}
        </div>
    ) : (<></>)
}



function Form({ content, onChange, onSubmit, id }: { content: any, onChange: any, onSubmit: any, id?: number }) {
    return (
        <div className="flex">

            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EnumInput onChange={onChange} name="type" value={content} enumClass={shipClasse} />

                <br />
                <TagInput onChange={onChange} name="mot_cle" value={content} tagClass={tag} />
                <br />
                <EditorInput onChange={onChange} name="habilite" value={content} />
                <br />
                <NumberInput onChange={onChange} name="cout" value={content} min={0} max={99} label="Cout" />
                <NumberInput onChange={onChange} name="prod" value={content} min={1} max={9} label="Production" />
                <NumberInput onChange={onChange} name="move" value={content} min={0} max={9} label="Mouvement" />
                <NumberInput onChange={onChange} name="combat" value={content} min={0} max={9} label="Combat" />
                <NumberInput onChange={onChange} name="combat_touche" value={content} min={1} max={9} label="touche" />
                <NumberInput onChange={onChange} name="capacite" value={content} min={0} max={99} label="Capacité" />
                <NumberInput onChange={onChange} name="PV" value={content} min={0} max={9} label="Résistance" />
                <br />
                <button className={buttonCSS} type="submit">Submit</button>
            </form>
        </div>

    )
}

export default { name: "Vaisseau", classe: Ship, form: Form, display: Display, dep: Array<string>() }




