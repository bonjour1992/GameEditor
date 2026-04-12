"use client"


import {  replaceDiese } from '@/component/inputUtils'
import { NumberInput } from "../input/NumberInput";
import { TagInput } from "../input/TagInput";
import { EnumInput } from "../input/EnumInput";
import { TextInput } from "../input/TextInput";
import { ElementContent } from "@/lib/datatype";
import { buttonCSS } from '../classCSS';
import { componentBorderColor, componentCSS, componentName, componentText } from './ticss';
import { EditorInput } from '../input/EditorInput';



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
    sun: "Soleil de guerre",
    inf: "Infanterie",
    mon: "Monument",
    trans:"Transport"

}

const tag: any = {
    ship: "Vaisseau",
    struc: "Structure",
    mil: "Militaire",
    civ: "Civil",
    com: "Commercial",
    trans:"Transport",
    terre: "Terrestre",
    space: "Spatiale",
    bio: "Biologiue",
    transportable: "Transportable",


}

const tagColor: any = {
    mil: "text-red-700",
}

class Ship extends ElementContent{
    type: string = "inf"
    habilite: string = ""
    move?: number
    combat?: number
    combat_touche: number = 1
    cout?: number
    capacite?: number
    PV: number = 1
    mot_cle: string[] = []

}



//TODO: bug affichage sur 4 + touche
 function Display({data}:{data: Ship}) {

    const CSS_numb="text-xl align-top leading-0 absolute bottom-2.5 w-14 text-center font-extrabold"
 const div_numb="border-2 h-8 w-14 text-center absolute "+componentBorderColor

    return data!==undefined?(
        <div className={componentCSS}>
            <div className={componentName}>{data?.name}</div>
            <div className={"pl-1 text-xs leading-none w-full border-b-2 font-bold"+componentBorderColor}>{data.mot_cle?.map((e, k, { length }) => {
                return (<span key={e} className={"" + (tagColor[e] === undefined ? "" : (tagColor[e]))}>{tag[e] + (k === length - 1 ? "" : ", ")}</span>)
            })}</div>
             <div className={"h-24 "+componentText}><span dangerouslySetInnerHTML={{ __html: replaceDiese(data.habilite) }}></span></div>
             {data.cout&&(<div className={"rounded-tr-lg rounded-bl-lg  bottom-0 left-0 "+div_numb}><span className="text-tiny align-top ">Coût</span><div className={CSS_numb}>{data.cout}</div></div>)}
             {data.move&&(<div className={"rounded-t-lg  bottom-0 left-14 "+div_numb}><span className="text-tiny align-top ">Mouvement</span><div className={CSS_numb}>{data.move}</div></div>)}
             {data.combat&&(<div className={"rounded-t-lg  bottom-0 left-28 "+div_numb}><span className="text-tiny align-top ">Attaque</span><div className={CSS_numb}>{data.combat}{"*".repeat(data.combat_touche)}</div></div>)}
            {data.capacite&&(<div className={"rounded-t-lg  bottom-0 left-42 "+div_numb}><span className="text-tiny align-top ">Capacité</span><div className={CSS_numb}>{data.capacite}</div></div>)}
             {data.PV&&(<div className={"rounded-tl-lg rounded-br-lg  bottom-0 left-56 "+div_numb}><span className="text-tiny align-top ">Résistance</span><div className={CSS_numb}>{data.PV}</div></div>)}
        </div>
    ):(<></>)
}



 function Form({content,onChange,onSubmit,id}:{content:any,onChange:any,onSubmit:any,id?:number}) {
    return (
        <div className="flex">

            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content.name} />
                <EnumInput onChange={onChange} name="type" value={content.type} enumClass={shipClasse} />

                <br />
                <TagInput onChange={onChange} name="mot_cle" value={content.mot_cle} tagClass={tag} />
                <br />
                <EditorInput onChange={onChange} name="habilite" value={content.habilite} />
                <br />
                <NumberInput onChange={onChange} name="move" value={content.move} min={1} max={9} />
                <NumberInput onChange={onChange} name="combat" value={content.combat} min={1} max={9} />
                <NumberInput onChange={onChange} name="combat_touche" value={content.combat_touche} min={1} max={9} />
                <NumberInput onChange={onChange} name="cout" value={content.cout} min={1} max={99} />
                <NumberInput onChange={onChange} name="capacite" value={content.capacite} min={1} max={99} />
                <NumberInput onChange={onChange} name="PV" value={content.PV} min={1} max={9} />
                <br />
                <button className={buttonCSS} type="submit">Submit</button>
            </form>
        </div>

    )
}

export default {name:"Vaisseau",classe:Ship,form:Form,display:Display,dep:Array<string>()}




