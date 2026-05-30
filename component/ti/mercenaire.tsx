import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS, small } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { componentBorderColor } from "./ticss";
import { replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";
import { NumberInput } from "../input/NumberInput";




class Classe extends ElementContent {
    sousTitre: string = ""
    usage: string = ""
    move?: number
    combat?: number
    combat_touche: number = 1
    capacite?: number
    PV?: number 
}

function Display({ data, dep, className }: { data: Classe, dep: Map<string, Array<ElementJeu>>, className?: string }) {

        const div_numb = "border-2 h-8 w-16 text-center absolute " + componentBorderColor
        const CSS_numb = "text-xl align-top leading-0 absolute bottom-2.5 w-15.5 text-center font-extrabold"


    return (<div className={small + " border-black bg-gray-700 relative border-4 text-white  rounded-2xl"}>
        <div className={"border-b-4 border-black w-full pl-2 text-xl font-bold leading-none"}>
            <span className="ml-1"> {nameAff(data?.name)}</span> </div>
        <div className={"border-b-2 border-black w-full pl-2 text-sm font-bold leading-none"}>
            <span className="ml-1"> {data.sousTitre}</span> </div>
        <div className={" text-xs leading-none pl-1 pb-1 "}> <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.usage) }}></span></div>

        {data.move && (<div className={"rounded-tr-lg rounded-bl-xl  bottom-0 left-0 " + div_numb}><span className="text-tiny align-top ">Mouvement</span><div className={CSS_numb}>{data.move}</div></div>)}
        {data.combat && (<div className={"rounded-t-lg  bottom-0 left-16 " + div_numb}><span className="text-tiny align-top ">Attaque</span><div className={CSS_numb}>{data.combat}{data.combat_touche > 1 ? "*".repeat(data.combat_touche) : ""}</div></div>)}
        {data.capacite && (<div className={"rounded-t-lg  bottom-0 left-32 " + div_numb}><span className="text-tiny align-top ">Capacité</span><div className={CSS_numb}>{data.capacite}</div></div>)}
        {data.PV && (<div className={"rounded-tl-lg rounded-br-xl  bottom-0 left-48 " + div_numb}><span className="text-tiny align-top ">Résistance</span><div className={CSS_numb}>{data.PV}</div></div>)}

    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <TextInput onChange={onChange} name="sousTitre" value={content} />

                <EditorInput onChange={onChange} name="usage" value={content} />
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


export default { name: "Mercenaire", classe: Classe, form: Form, display: Display, dep: Array<string>() }