import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";




//TODO: WIP
class Classe extends ElementContent {

    usage: string = ""
    color: string = "#000000"
}

function Display({ data, dep }: { data: Classe, dep: Map<string, Array<ElementJeu>> }) {


    return (
        <div className={"border-4 rounded-xl relative z-5  h-30 w-50"} style={{ color: data.color, borderColor: data.color }}>
            <div className={"border-b-4  py-0.5 w-full pl-2 text-lg font-bold leading-none"}>
                <span className="ml-1"> {data?.name}</span> </div>
            <div className={"h-20 text-[8px] leading-none pl-1"}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.usage) }}></span></div>


        </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EditorInput onChange={onChange} name="usage" value={content} />
                <ColorInput onChange={onChange} name="color" value={content} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Agent", classe: Classe, form: Form, display: Display, dep: Array<string>() }