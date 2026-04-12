import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { NumberInput } from "../input/NumberInput";
import { EnumInput } from "../input/EnumInput";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { imp, SpecificDisplayer } from "@/lib/imp";
import Image from "next/image";
import { turnNumber } from "./ti";
import { componentCSS, componentName, componentText } from "./ticss";
import { EditorInput } from "../input/EditorInput";

const techType = { gen: "Génétique", spa: "Spatial", mil: "Militaire", soc: "Social" }

const techCSS = new Map([

    ["gen", " border-green-800 bg-green-400"],
    ["spa", " border-blue-800 bg-blue-400"],
    ["mil", " border-red-800 bg-red-400"],
    ["soc", " border-yellow-800 bg-yellow-400"],
    ["vide", " border-gray-500 bg-gray-200"]
])

class Tech extends ElementContent {
    techType = "spa";
    tier = 3;
    cout = 5;
    effet = ""
}

function Display({ data, dep }: { data: Tech, dep: Map<string, Array<ElementJeu>> }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)


    return (<div className={componentCSS}>
        <div className={componentName}>
            {Array.from(Array((data?.tier|| 1) - 1).keys()).map(e => {
                return (<div key={e} className={" m-0.5 float-left size-4 border-4 rounded-md" + techCSS.get(data.techType)}></div>)
            })}
            <span className="ml-1"> {data?.name}</span> </div>
        <div className={"h-31.75 "+componentText}> <span dangerouslySetInnerHTML={{ __html: data?.effet }}></span></div>
        <div className="grid grid-cols-16 w-68.5">
            <div className={"size-5 border-4 rounded-bl-lg" + techCSS.get(data?.techType)}></div>
            {Array.from(Array(14).keys()).map((e,i) => {
                return (<div key={i} className={"size-5 border-4 " + techCSS.get(e + 1 < data?.cout ? data?.techType : "vide")}></div>)
            })}
            <div className={"size-5 border-4 rounded-br-lg " + techCSS.get(data?.cout == 16 ? data?.techType : "vide")}></div>
        </div>

    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content.name} />
                <EnumInput onChange={onChange} name="techType" value={content.techType} enumClass={techType} />
                <NumberInput onChange={onChange} name="tier" value={content.tier} min={1} max={5} />
                <NumberInput onChange={onChange} name="cout" value={content.cout} min={1} max={16} />
                <EditorInput onChange={onChange} name="effet" value={content.effet} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default {name:"Technologie", classe: Tech, form: Form, display: Display, dep: Array<string>() }