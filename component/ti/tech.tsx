import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { NumberInput } from "../input/NumberInput";
import { EnumInput } from "../input/EnumInput";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { imp, SpecificDisplayer } from "@/lib/imp";
import Image from "next/image";
import { techType, turnNumber } from "./ti";
import { componentCSS, componentName, componentText, techCSS } from "./ticss";
import { EditorInput } from "../input/EditorInput";
import { replaceDiese } from "../inputUtils";




class Tech extends ElementContent {
    techType = "spa";
    tier = 3;
    cout = 5;
    effet = ""
}

function Display({ data, dep,context={unlocked:false} }: { data: Tech, dep: Map<string, Array<ElementJeu>> ,context:{unlocked:boolean}}) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)


    return (<div className={ "border-4 bg-indigo-950/60 rounded-2xl relative z-5 text-amber-50  border-gray-500  w-57.75 h-36"}>
        <div className={componentName}>
            {Array.from(Array((data?.tier || 1) - 1).keys()).map(e => {
                return (<div key={e} className={" m-0.25 float-left size-3.5 border-2 rounded-md" + techCSS.get(data.techType)}></div>)
            })}
            <span className="ml-1"> {data?.name}</span> </div>
        <div className={"h-24 " + componentText}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.effet) }}></span></div>
        <div className="grid grid-cols-16 w-56">
            <div className={"size-3.5 border-2 rounded-bl-2xl" + techCSS.get(data?.techType)}>{context.unlocked?"x":""}</div>
            {Array.from(Array(14).keys()).map((e, i) => {
                return (<div key={i} className={"size-3.5 border-2 " + techCSS.get(e + 1 < data?.cout ? data?.techType : "vide")}></div>)
            })}
            <div className={"size-3.5 border-2 rounded-br-2xl " + techCSS.get(data?.cout == 16 ? data?.techType : "vide")}></div>
        </div>

    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EnumInput onChange={onChange} name="techType" value={content} enumClass={techType} />
                <NumberInput onChange={onChange} name="tier" value={content} min={1} max={5} />
                <NumberInput onChange={onChange} name="cout" value={content} min={1} max={16} />
                <EditorInput onChange={onChange} name="effet" value={content} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Technologie", classe: Tech, form: Form, display: Display, dep: Array<string>() }