import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS, smallpo } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";
import { EnumInput } from "../input/EnumInput";
import { BooleanInput } from "../input/BooleanInput";
import { NumberInput } from "../input/NumberInput";


const typeLoi: { [char: string]: string } = {
    loi: "Loi",
    dir: "Directive",
    mand: "Mandat",
    trai: "Traité"
}


class Classe extends ElementContent {
    type: string = "loi"

    usage: string = ""
    habilite: string = ""
    unitName: string = ""
    nativeUnit: boolean = false
        unitQuantity: number = 1

    unitEffect: string = ""
    unitCombat: number = 5
    unitPV: number = 1
    unitCombatTouche: number = 1
}

function Display({ data, dep, className }: { data: Classe, dep: Map<string, Array<ElementJeu>>, className?: string }) {


    return (
        <div className={smallpo + "border-6 text-center border-blue-600 rounded-2xl relative z-5  bg-gray-200  " + className}>
            <div className={"border-b-4 py-1  border-blue-600 w-full px-1 text-lg  font-bold leading-none"}>
                <span className=""> {nameAff(data?.name)}</span> </div>
            <div className={"border-b-2   border-blue-600 w-full px-1 text-sm  font-bold leading-none"}>
                <span className="">{typeLoi[data.type as keyof Classe]}</span> </div>
            <div className={" text-sm text-left leading-none pl-1 pb-1 "}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.usage) }}></span></div>
            {data.nativeUnit ? <div className="absolute bottom-0 w-full h-20  ">
                <div className=" w-full border-2 border-blue-600 font-bold text-xs  px-1">{data.unitName}</div>
                <div className=" w-full  text-left text-[9px] h-7.5 "><span dangerouslySetInnerHTML={{ __html: replaceDiese(data.unitEffect) }}></span></div>
                <div className="absolute w-8 border-2 h-4 rounded-bl-lg left-0 font-bold text-xs bottom-0 pb-0.5 border-blue-600 ">#: {data.unitQuantity}</div>
                <div className="absolute w-21.75 border-y-2 h-4 text-xs left-8 font-bold bottom-0 pb-0.5 border-blue-600 ">{data.unitCombat ? "Combat:" + data.unitCombat + "*".repeat(data.unitCombatTouche) : ""}</div>
                <div className="absolute w-10 border-2 h-4 rounded-br-lg left-29.75 font-bold text-xs bottom-0 pb-0.5 border-blue-600 ">PR: {data.unitPV}</div>
            </div> : ""}

        </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EnumInput onChange={onChange} name="type" value={content} enumClass={typeLoi} />

                <EditorInput onChange={onChange} name="usage" value={content} />
                <br />
                <BooleanInput onChange={onChange} name="nativeUnit" value={content} label="Unité" />
                <div className={content.nativeUnit ? "" : "hidden"}>
                    <TextInput onChange={onChange} name="unitName" value={content} />
                    <EditorInput onChange={onChange} name="unitEffect" value={content} />
                    <NumberInput onChange={onChange} name="unitQuantity" value={content} min={0} max={99} />
                    <NumberInput onChange={onChange} name="unitCombat" value={content} min={0} max={9} />
                    <NumberInput onChange={onChange} name="unitCombatTouche" value={content} min={0} max={9} />
                    <NumberInput onChange={onChange} name="unitPV" value={content} min={0} max={9} />
                </div>
                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Agenda", classe: Classe, form: Form, display: Display, dep: Array<string>() ,print:"grid-cols-6" }