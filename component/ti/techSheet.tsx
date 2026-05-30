import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { A4pa, buttonCSS, small, w_A4pa } from "../classCSS";
import { SpecificDisplayerFromDep } from "@/lib/imp";
import Image from "next/image";
import { techType, turnNumber } from "./ti";
import { ModalPickerInput } from "../input/ModalPickerInput";
import { ImagePicker } from "../input/ImagePicker";
import { ColorInput } from "../input/ColorInput";
import { TableInput } from "../input/TableInput";
import { componentName, componentText, techCSS, techTextCSS } from "./ticss";
import { replaceDiese } from "../inputUtils";
import { EnumInput } from "../input/EnumInput";
import { BooleanInput } from "../input/BooleanInput";


class TechSheet extends ElementContent {
    logo: string = "/404.jpeg"
    techType = "spa";
    techs: Array<Link> = new Array(18).fill(new Link("ship"))
    unlocked: Array<boolean> = new Array(18).fill(false)
    connaissance: string = "<p>#pscience<br />Obtenir une tech de ce type vous fait gagner 2 de recherches en connaissance.<br /><br />La connaissance est nécessaire pour rechercher les technologies qui ont un prérequis.<br /><br /></p><p>#decomp:<br />Chaque niveau de connaissance rapporte un #point</p><p>Si aucune faction n'a plus de connaissance que vous gagnez 2 #point</p>"
}

function Display({ data, dep }: { data: TechSheet, dep: Map<string, Array<ElementJeu>> }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)

    return (<div className={"bg-[url(/ti/bg%20star.jpg)] overflow-hidden" + A4pa}>
<div className="w-full h-40 ">
    <div  className={" h-36 w-58 float-right"}>{data?.techs && data?.techs[16].id !== -1 && <SpecificDisplayerFromDep link={data.techs[16]} dep={dep} context={{unlocked:data.unlocked[16]}} />}</div>
    <div  className={" h-36 w-58 float-right"}>{data?.techs && data?.techs[17].id !== -1 && <SpecificDisplayerFromDep link={data.techs[17]} dep={dep} context={{unlocked:data.unlocked[17]}} />}</div>

        <h1 className={"text-6xl mx-8 mt-4 w-160"+(techTextCSS.get(data.techType)||" vide ")} ><Image src={data?.logo || "/404.jpeg"} loading="eager" alt="Logo manquant" width="80" height="80" className="inline" />   <b>{data?.name}</b></h1>
</div>
        <div className="grid grid-cols-4 w-240 gap-2 overflow auto float-left">
            {Array.from(new Array(16).keys()).map((i) => {
                return (<div key={i} className={" h-36 w-58"}>{data?.techs && data?.techs[i].id !== -1 && <SpecificDisplayerFromDep link={data.techs[i]} dep={dep} context={{unlocked:data.unlocked[i]}} />}</div>)
            })}
        </div>

        <div className={"border-4 bg-indigo-950/60 rounded-2xl relative z-5 text-amber-50  border-gray-500  w-36.75 h-150 ml-2.5 float-left"}>
            <div className={componentName}>

                <span className="ml-1"> Connaissance</span> </div>
            <div className={"h-71.5 " + componentText}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.connaissance) }}></span></div>
            <div className="grid grid-cols-10 w-35">
                {Array.from(Array(190).keys()).map((e, i) => {
                    return (<div key={i} className={"size-3.5 border-2 " + techCSS.get(data?.techType)}></div>)
                })}
                <div className={"size-3.5 border-2 rounded-bl-2xl" + techCSS.get(data?.techType)}></div>
                {Array.from(Array(8).keys()).map((e, i) => {
                    return (<div key={i} className={"size-3.5 border-2 " + techCSS.get(data?.techType)}></div>)
                })}
                <div className={"size-3.5 border-2 rounded-br-2xl " + techCSS.get(data?.techType)}></div>
            </div>

        </div>

    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {


    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <TextInput onChange={onChange} name="name" value={content} />
                    <ImagePicker onChange={onChange} name={"logo"} value={content} />
                    <EnumInput onChange={onChange} name="techType" value={content} enumClass={techType} />

                </div>

                <h2>Ship</h2>
                <div className="grid grid-cols-4">
                    {Array.from((new TechSheet).techs.keys()).map((i) => {
                        return (<div key={i} className="p-2" >
                            <ModalPickerInput onChange={onChange} name={"techs"} value={content} index={i} type={["tech"]} dep={dep || []} />
                        <BooleanInput onChange={onChange} name={"unlocked"} value={content}  index={i}/></div>)
                    })}

                </div>

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}




export default { name: "Feuille de technologie", classe: TechSheet, form: Form, display: Display, dep: Array<string>("tech"), print: "grid-cols-1" }
