import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS, smallpo } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";
import { NumberInput } from "../input/NumberInput";
import Image from "next/image";





class Classe extends ElementContent {

    usage: string = ""
    coutAnc: number = 0
    coutMil: number = 0
    coutSpa: number = 0
    coutCiv: number = 0
}

function Display({ data, dep, className }: { data: Classe, dep: Map<string, Array<ElementJeu>>, className?: string }) {


    return (
        <div className={smallpo + "border-4 text-center text-white border-gray-600 rounded-2xl relative z-5  bg-black  " + className}>
            <div className={"border-b-4 py-1 border-gray-600 w-full px-2 text-lg  font-bold leading-none"}>
                <span className="ml-1"> {nameAff(data?.name)}</span> </div>
            <div className={" text-sm text-left leading-none pl-1 pb-1 "}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.usage) }}></span></div>
            <div className="bottom-0 w-full absolute pb-1">
                {(new Array(data.coutAnc).fill(1)).map((a, i) => <Image className="inline" key={i} src="/ti/relic/relicAnc.png" alt="relique Ancienne" width={20} height={20} />)}
                {(new Array(data.coutMil).fill(1)).map((a, i) => <Image className="inline" key={i} src="/ti/relic/relicMil.png" alt="relique militaire" width={20} height={20} />)}
                {(new Array(data.coutSpa).fill(1)).map((a, i) => <Image className="inline" key={i} src="/ti/relic/relicSpa.png" alt="relique spatiale" width={20} height={20} />)}
                {(new Array(data.coutCiv).fill(1)).map((a, i) => <Image className="inline" key={i} src="/ti/relic/relicCiv.png" alt="relique civile" width={20} height={20} />)}
            </div>

        </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EditorInput onChange={onChange} name="usage" value={content} />
                <br />
                <p>Fragemnts:</p>
                <NumberInput onChange={onChange} name={"coutAnc"} value={content} min={0} max={9} label="Ancien" />
                <NumberInput onChange={onChange} name={"coutMil"} value={content} min={0} max={9} label="Militaire" />
                <NumberInput onChange={onChange} name={"coutSpa"} value={content} min={0} max={9} label="Spatial" />
                <NumberInput onChange={onChange} name={"coutCiv"} value={content} min={0} max={9} label="Civil" />
                <br />
                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Relique", classe: Classe, form: Form, display: Display, dep: Array<string>() }