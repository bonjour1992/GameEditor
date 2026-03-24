"use client"


import {  TextInput, NumberInput, EditorInput, EnumInput, TagInput } from '@/component/inputUtils'
import { ElementContent } from "@/lib/datatype";
import { buttonCSS } from '../classCSS';
import { componentCSS, componentName } from './ticss';



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

    return data!==undefined?(
        <div className={componentCSS}>
            <div className={componentName}>{data?.name}</div>
            <div className="pl-1 text-sm w-full border-b-2">{data.mot_cle?.map((e, k, { length }) => {
                return (<span key={e} className={"" + (tagColor[e] === undefined ? "" : (tagColor[e]))}>{tag[e] + (k === length - 1 ? "" : ", ")}</span>)
            })}</div>
             <div className="h-24 text-sm pl-1"><span dangerouslySetInnerHTML={{ __html: data.habilite }}></span></div>
             {data.cout&&(<div className="border-2 rounded-tr-xl rounded-bl-xl absolute -bottom-0.5 -left-1 h-12 w-16 text-center"><span className="text-tiny align-top ">Coût</span><br /><span className="text-3xl leading-0">{data.cout}</span></div>)}
             {data.move&&(<div className="border-2 rounded-t-xl absolute -bottom-0.5 left-15 h-12 w-16 text-center"><span className="text-tiny align-top ">Mouvement</span><br /><span className="text-3xl leading-0">{data.move}</span></div>)}
             {data.combat&&(<div className="border-2 rounded-t-xl absolute -bottom-0.5 left-31 h-12 w-16 text-center"><span className="text-tiny align-top ">Attaque</span><br /><span className="text-3xl leading-0">{data.combat}{"*".repeat(data.combat_touche)}</span></div>)}
            {data.capacite&&(<div className="border-2 rounded-t-xl absolute -bottom-0.5 left-47 h-12 w-16 text-center"><span className="text-tiny align-top ">Capacité</span><br /><span className="text-3xl leading-0">{data.capacite}</span></div>)}
             {data.PV&&(<div className="border-2 rounded-tl-xl rounded-br-xl absolute -bottom-0.5 left-63 h-12 w-16 text-center"><span className="text-tiny align-top ">Résistance</span><br /><span className="text-3xl leading-0">{data.PV}</span></div>)}
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

export default {classe:Ship,form:Form,display:Display,dep:Array<string>()}




