import { JSX } from "react";
import { ElementContent, ElementJeu } from "./datatype";
import { element as Ti5 } from "@/component/ti/ti";
import { getDep } from "@/component/inputUtils";

export const exp_Ti5=Ti5

export const imp = new Map<string, {
    name:string
    classe: typeof ElementContent
    form: ({ content, onChange, onSubmit, id }: {
        content: ElementContent;
        onChange: any;
        onSubmit: any;
        id?: number;
        dep: Map<string, Array<ElementJeu>>
    }) => JSX.Element;
    display: ({ data }: {
        data: any,
        dep: any
    }) => JSX.Element;
    dep: Array<string>
}>(Ti5)

export function SpecificDisplayer(params: any) {
    let display = imp.get(params.type)?.display

    return display && display({ data: params.content|| new (imp.get(params.type)?.classe || ElementContent ), dep: params.dep })
}

export function SpecificDisplayerFromDep(params: any) {

    let display = imp.get(params.link.type)?.display
    let k = -1
    if (!params.link.id || params.link.id===-1)
    {
        return display && display({ data: new (imp.get(params.link.type)?.classe || ElementContent ), dep: params.dep })
    }
    let element= getDep(params.dep,params.link)
    return display && display({ data: element.content, dep: params.dep })
}

export function SpecificEditor(params: any) {
    let form = imp.get(params.type)?.form

    return form && form(params)
}

export function empty(type: string) {
    let content = new (imp.get(type)?.classe || ElementContent)
    let res = new ElementJeu
    res.content = content
    return res

}

export const jeu = [
    { name: "Twiligth Imperium 5", pict: "/ti5.jpg", logo: "/ti/Color/General Icons/Relic.png", slug: "ti5" },
    { name: "test", slug: "test" }
]