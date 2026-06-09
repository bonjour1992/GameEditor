import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";
import { ModalPickerInput } from "../input/ModalPickerInput";





class Classe extends ElementContent {

    usage: string = ""
        special: string = ""


}

function Display({ data, dep, className }: { data: Classe, dep: Map<string, Array<ElementJeu>>, className?: string }) {


    return (
        <div className={"border-4 rounded-xl relative z-5 w-190 " + className}>
            <div className={"border-b-2 text-center w-full text-3xl font-bold leading-none"}>
                <span className=" "> {nameAff(data?.name)}</span> </div>
            <div className={" text-base border-b-2 pl-1 pb-1 list-disc "}>
                 <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.usage) }}></span>
                 </div>
            <div className={" text-base pl-1 pb-1 list-disc "}>
                 <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.special) }}></span>
                 </div>

        </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EditorInput onChange={onChange} name="usage" value={content} className=" w-190 min-h-80" label="Regles" />
                <EditorInput onChange={onChange} name="special" value={content} className=" w-190 min-h-40" label="Spécialité des factions" />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Phase de jeu", classe: Classe, form: Form, display: Display, dep: Array<string>("phase") }