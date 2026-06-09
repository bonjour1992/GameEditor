import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS, smallpo } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";





class Classe extends ElementContent {

    usage: string = ""

}

function Display({ data, dep,className}: { data: Classe, dep: Map<string, Array<ElementJeu>> ,className?: string}) {


    return (
        <div className={smallpo+"border-6 rounded-xl relative z-5    bg-gray-700/60  border-red-900 "+className} >
            <div className={"border-b-4 text-center w-full text-lg font-bold leading-none  bg-red-500 border-red-900"}>
                <span className=" "> {nameAff(data?.name)}</span> </div>
            <div className={" text-sm leading-none pl-1 pb-1 "}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.usage) }}></span></div>


        </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EditorInput onChange={onChange} name="usage" value={content} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Objectif militaire", classe: Classe, form: Form, display: Display, dep: Array<string>() ,print:"grid-cols-6" }