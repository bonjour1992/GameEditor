import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS, smallpo } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentBorderColor, componentCSS, componentName, componentText } from "./ticss";
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
    point: number = 1
    move?: number
    combat?: number
    combat_touche: number = 1
    capacite?: number
    PV?: number
}

function Display({ data, dep, className }: { data: Classe, dep: Map<string, Array<ElementJeu>>, className?: string }) {

    const div_numb = "border-2 h-7 w-10.5 text-center absolute  bottom-7 " + componentBorderColor
    const CSS_numb = "text-lg align-top leading-0 absolute bottom-2.5 w-10.5 text-center font-extrabold"

    return (
        <div className={smallpo + "border-4 text-center text-white border-gray-600 rounded-2xl relative z-5  bg-black  " + className}>
            <div className={" w-full  text-lg  font-bold leading-none"}>
                <div className="w-34 border-r-2 border-b-4 border-gray-600 float-left">
                    <span className="ml-1"> {nameAff(data?.name)}</span>
                </div>
                <div className="float-left border-b-4 w-6.5 text-3xl border-gray-600 ">
                    <span className="ml-1"> {data.point}</span>
                </div>
            </div>
            <div className={" text-sm text-left leading-none pl-1 pb-1 "}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.usage) }}></span></div>
            {data.move&&data.move!==0 && (<div className={"  -left-0.5 " + div_numb}><span className="text-tiny align-top ">Mouvemen</span><div className={CSS_numb}>{data.move}</div></div>)}
            {data.combat&&data.combat!==0 && (<div className={" left-9.75 " + div_numb}><span className="text-tiny align-top ">Attaque</span><div className={CSS_numb}>{data.combat}{data.combat_touche > 1 ? "*"+data.combat_touche : ""}</div></div>)}
            {data.capacite&&data.capacite!==0 && (<div className={"  left-20.25 " + div_numb}><span className="text-tiny align-top ">Capacité</span><div className={CSS_numb}>{data.capacite}</div></div>)}
            {data.PV&&data.PV!==0 && (<div className={" left-30.5 " + div_numb}><span className="text-tiny align-top ">Résistance</span><div className={CSS_numb}>{data.PV}</div></div>)}

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
                <NumberInput onChange={onChange} name={"point"} value={content} min={0} max={9} label="Point" />
                <EditorInput onChange={onChange} name="usage" value={content} />
                <br />
                <p>Fragemnts:</p>
                <NumberInput onChange={onChange} name={"coutAnc"} value={content} min={0} max={9} label="Ancien" />
                <NumberInput onChange={onChange} name={"coutMil"} value={content} min={0} max={9} label="Militaire" />
                <NumberInput onChange={onChange} name={"coutSpa"} value={content} min={0} max={9} label="Spatial" />
                <NumberInput onChange={onChange} name={"coutCiv"} value={content} min={0} max={9} label="Civil" />
                <br />
                <NumberInput onChange={onChange} name="move" value={content} min={0} max={9} label="Mouvement" />
                <NumberInput onChange={onChange} name="combat" value={content} min={0} max={9} label="Combat" />
                <NumberInput onChange={onChange} name="combat_touche" value={content} min={1} max={9} label="touche" />
                <NumberInput onChange={onChange} name="capacite" value={content} min={0} max={99} label="Capacité" />
                <NumberInput onChange={onChange} name="PV" value={content} min={0} max={9} label="Résistance" />
                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Relique", classe: Classe, form: Form, display: Display, dep: Array<string>(),print:"grid-cols-6" }