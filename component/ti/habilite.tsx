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


class Habilite extends ElementContent {

    effet = ""
}

function Display({ data, dep }: { data: Habilite, dep: Map<string, Array<ElementJeu>> }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)


    return (<div className={componentCSS}>
        <div className={componentName}>
             <span className="ml-1"> {data?.name}</span> </div>
        <div className={"h-38"+componentText}> <span dangerouslySetInnerHTML={{ __html: data?.effet }}></span></div>

            
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content?.name} />
                <EditorInput onChange={onChange} name="effet" value={content?.effet} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Habilité",classe: Habilite, form: Form, display: Display, dep: Array<string>() }