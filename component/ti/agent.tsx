import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";



class Classe extends ElementContent {

    usage: string = ""
    color: string = "#fff"
}

function Display({ data, dep }: { data: Classe, dep: Map<string, Array<ElementJeu>> }) {


    return (<div className={"border-4 rounded-xl relative z-5 text-amber-50 h-30 w-50"}>
            <div className={componentName}>
                 <span className="ml-1"> {data?.name}</span> </div>
        <div className={"h-38"+componentText}> <span dangerouslySetInnerHTML={{ __html:replaceDiese( data?.usage) }}></span></div>


    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content?.name} />
                <EditorInput onChange={onChange} name="usage" value={content?.usage} />
                <ColorInput onChange={onChange} name={"color"} value={content.color} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Agent", classe: Classe, form: Form, display: Display, dep: Array<string>() }