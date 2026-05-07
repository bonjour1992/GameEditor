import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS, smallpo } from "../classCSS";
import { EnumInput } from "../input/EnumInput";
import { NumberInput } from "../input/NumberInput";
import { TagInput } from "../input/TagInput";
import { planeteIcon, techIcon, techType } from "./ti";
import { BooleanInput } from "../input/BooleanInput";
import { ImagePicker } from "../input/ImagePicker";
import Image from "next/image";
import { EditorInput } from "../input/EditorInput";
import { componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";


const objectType = {
    pla: "Planete",
    sat: "Sattelite",
    spe: "Special"

}
const ruineType={
    normal:"Normal",
    mil:"militaire",
    ancien:"ancien",
    civ:"civile"
}
const planetType={
    civ:"Civile",
    mil:"Militaire",
    sauv:"Sauvage"
}

class Classe extends ElementContent {
    img: string = ""
    planetType:string=""
    res?: number
    inf?: number
    type: string = "pla"
    techSpe: string[] = []
    legendary: boolean = false
    ruine: boolean = false
    ruineType:string="normal"
    habilite: string = ""
    unitName: string = ""
    nativeUnit:boolean=false
    unitEffect: string = ""
    unitQuantity: number = 1
    unitCombat: number = 5
    unitPV: number = 1
    unitCombatTouche: number = 1
}

export default { name: "Planet", classe: Classe, form: Form, display: Display, dep: Array<string>() }


function Display({ data, dep }: { data: Classe, dep: Map<string, Array<ElementJeu>> }) {

    return (<div className={smallpo + " bg-[url(/ti/bg.png)] bg-cover relative  text-white border-2 rounded-xl"}>

        <Image src={data.img || "/404.jpeg"} alt="data.img" width="230" height="230" className="px-4 pt-2" />
        <div className={"text-center absolute top-2 z-10 text-2xl font-bold w-full text-shadow-lg " + (data.legendary ? "text-amber-300" : "")}>
           {data.planetType?<Image className="inline" src={planeteIcon.get(data.planetType)||"/404.jpeg"} alt={data.planetType} width={30} height={30} />:""}
            {data.name}
            </div>
        <div className="w-full absolute top-27 z-10 ">
            <div className="w-full flex items-center justify-center gap-x-1">
                {data.inf ? <Hexagone color="blue">{data.inf}</Hexagone> : ""}
                {data.res ? <Hexagone color="yellow">{data.res}</Hexagone> : ""}
                {data.ruine ?<Ruine type={data.ruineType}/>:""} 
                {data.techSpe.map(e=><Image src={techIcon.get(e)||"/404.jpeg"} alt={techIcon.get(e)||"/404.jpeg"}  width={20} height={20}/>)}
            </div>
        </div>
        <div className={"h-30 m-1 p-1 rounded-lg bg-black/70 relative " + componentText}><span dangerouslySetInnerHTML={{ __html: replaceDiese(data.habilite) }}></span>
        {data.nativeUnit?<>
        <div className="absolute w-full border-2 rounded-t-sm left-0 font-bold  border-white top-15 px-1">{data.unitName}</div>
        <div className="absolute w-full border-x-2  h-7.5 left-0 border-white top-18.5 px-1 pt-0.5"><span dangerouslySetInnerHTML={{ __html: replaceDiese(data.unitEffect) }}></span></div>
        <div className="absolute w-9 border-2 h-4 rounded-bl-sm left-0 font-bold  border-white top-26 pl-1">#: {data.unitQuantity}</div>
        <div className="absolute w-23 border-y-2 h-4  left-9 font-bold  border-white top-26 pl-1">Combat: {data.unitCombat}{"*".repeat(data.unitCombatTouche)}</div>
        <div className="absolute w-10 border-2 h-4 rounded-br-sm left-32 font-bold  border-white top-26 pl-1">PV: {data.unitPV}</div>

        </>:""}
        </div>
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content?.name} />
                <EnumInput onChange={onChange} name="planetType" value={content.planetType} enumClass={planetType} aucun={true} />
                <EnumInput onChange={onChange} name="type" value={content.type} enumClass={objectType} />
                <BooleanInput onChange={onChange} name="legendary" value={content?.legendary} />
                <ImagePicker onChange={onChange} name={"img"} value={content.img} />
                <NumberInput onChange={onChange} name="res" value={content.res} min={0} max={9} />
                <NumberInput onChange={onChange} name="inf" value={content.inf} min={0} max={9} />
                <TagInput onChange={onChange} name="techSpe" value={content.techSpe} tagClass={techType} />
                <BooleanInput onChange={onChange} name="ruine" value={content?.ruine} />
                <EnumInput onChange={onChange} name="ruineType" value={content.ruineType} enumClass={ruineType} className={content.ruine?"":"hidden"}/>
                <br />
                <EditorInput onChange={onChange} name="habilite" value={content.habilite} />
                <br />
                <BooleanInput onChange={onChange} name="nativeUnit" value={content?.nativeUnit} />
                <div className={content.nativeUnit?"":"hidden"}>
                <TextInput onChange={onChange} name="unitName" value={content?.unitName} />
                <EditorInput onChange={onChange} name="unitEffect" value={content.unitEffect} />
                <NumberInput onChange={onChange} name="unitQuantity" value={content.unitQuantity} min={0} max={99} />
                <NumberInput onChange={onChange} name="unitCombat" value={content.unitCombat} min={0} max={9} />
                <NumberInput onChange={onChange} name="unitCombatTouche" value={content.unitCombatTouche} min={0} max={9} />
                <NumberInput onChange={onChange} name="unitPV" value={content.unitPV} min={0} max={9} />
                </div>
                <br />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}

//svg des ruine colorisé
function Ruine({type}:{type:string}){
    return (<svg
   width="20px"
   height="20px"
   viewBox="0 0 16.270361 15.88821"
   version="1.1"
   id="svg1"
   xmlSpace="preserve"
   xmlns="http://www.w3.org/2000/svg"><g
     id="layer1"
     transform="translate(-114.52802,-118.86361)"><path
       fill={{normal:"#FFFFFF",mil:"#FF0000",ancien:"#8800FF",civ:"#AAAA00"}[type]}
       d="m 114.52808,133.36352 v -1.38834 l 0.44097,-0.14737 0.44097,-0.14737 -0.004,-6.40842 -0.004,-6.40841 h 3.09077 3.09078 v 1.41111 1.41111 h -0.35278 -0.35278 v 4.03612 4.03613 l 0.35278,0.21803 0.35278,0.21803 v 0.86112 0.86112 h 1.05833 1.05833 v -1.05833 -1.05833 h 0.35278 0.35278 v -4.05695 -4.05694 h 1.40205 1.40205 l 0.58602,1.14653 0.58602,1.14652 0.48138,0.28212 0.48137,0.28211 v 2.6283 2.62831 h 0.35278 0.35277 v 1.05833 1.05833 h 0.37408 0.37407 l -0.10949,1.32292 -0.10949,1.32292 -8.02569,0.0948 -8.02569,0.0948 z m 14.81667,-0.036 v -0.35278 h -6.87917 -6.87917 v 0.35278 0.35277 h 6.87917 6.87917 z m -9.16411,-1.94028 v -0.35278 l -1.94433,-0.1058 -1.94434,-0.1058 v 0.56438 0.56437 l 1.94434,-0.1058 1.94433,-0.10579 z m 8.72466,0.0882 -0.14546,-0.44097 -2.0006,-0.1058 -2.0006,-0.1058 v 0.54677 0.54677 h 2.14606 2.14607 z m -11.20222,-5.73264 v -4.05694 h -0.52917 -0.52916 v 4.05694 4.05695 h 0.52916 0.52917 z m 2.11667,0 v -4.05694 h -0.52917 -0.52916 v 4.05694 4.05695 h 0.52916 0.52917 z m 6.35,0.52917 v -3.52778 h -0.35278 -0.35278 v 3.52778 3.52778 h 0.35278 0.35278 z m 2.04459,1.17464 -0.10431,-2.35313 -0.35278,-0.11719 -0.35278,-0.1172 0.11714,2.47033 0.11715,2.47033 h 0.33994 0.33995 z m -7.68904,-7.17186 v -0.35278 h -2.11666 -2.11667 v 0.35278 0.35278 h 2.11667 2.11666 z"
       id="path1" /></g></svg>)
}

//Hexagone de couleur pour l'influence et les ressources
function Hexagone(props: { color: string, children: React.ReactNode }) {


    return (
        <div className={"relative h-6 w-7.5 " + { blue: "bg-blue-500", yellow: "bg-amber-300" }[props.color] + " text-center text-white leading-none text-xl font-bold"}>
            <div className={"absolute bottom-full border-r-15 border-b-6 border-l-15 border-transparent " + { blue: "border-b-blue-500", yellow: "border-b-amber-300" }[props.color]}></div>
            <div className=" m-auto top-0.5 relative h-5 w-6 bg-black text-center  leading-none text-xl font-bold z-20">
                <div className="absolute bottom-full border-r-12 border-b-5 border-l-12 border-transparent border-b-black"></div>
                {props.children}
                <div className="absolute top-full border-t-5 border-r-12 border-l-12 border-transparent border-t-black"></div>
            </div>
            <div className={"absolute top-full border-t-6 border-r-15 border-l-15 border-transparent " + { blue: "border-t-blue-500", yellow: "border-t-amber-300" }[props.color]}></div>
        </div>)
}


