import { JSX } from "react";
import { ElementContent,ElementJeu } from "./datatype";
import  ShipHandler  from "@/component/ti/ship";
import FactionHandler from "@/component/ti/faction"
import TechHandler from "@/component/ti/tech"
import HabiliteHandler from "@/component/ti/habilite"

export const imp = new Map<string, {
    classe: typeof ElementContent
    form: ({ content, onChange, onSubmit, id }: {
        content: ElementContent;
        onChange: any;
        onSubmit: any;
        id?: number;
        dep:Map<string,Array<ElementJeu>>
    }) => JSX.Element;
    display: ({ data }: {
        data: any,
        dep:any
    }) => JSX.Element;
    dep:Array<string>
}
>([["ship",ShipHandler],["faction",FactionHandler],["tech",TechHandler],["habilite",HabiliteHandler]])


export function SpecificDisplayer(params: any) {
    let display = imp.get(params.type)?.display

    return display && display({ data: params.content,dep:params.dep })
}

export function SpecificEditor(params: any) {
    let form = imp.get(params.type)?.form

    return form && form(params)
}

export function empty(type:string)
{
    let content =new (imp.get(type)?.classe|| ElementContent)
    let res = new ElementJeu
    res.content=content
    return res

}

export const jeu= [
    {name:"Twiligth Imperium 5",pict:"/ti5.jpg",logo:"/ti/Color/General Icons/Relic.png"},
    {name:"test"}
]