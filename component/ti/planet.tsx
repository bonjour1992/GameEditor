import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
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
import { getDep, replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";
import { ModalPickerInput } from "../input/ModalPickerInput";


const objectType = {
    pla: "Planete",
    sat: "Sattelite",
    spe: "Special"
}
const ruineType = {
    normal: "Normal",
    mil: "Militaire",
    ancien: "Ancien",
    civ: "Civile",
    spa:"Spatiale"
}
const planetType = {
    civ: "Civile",
    mil: "Militaire",
    sauv: "Sauvage"
}

class Classe extends ElementContent {
    img: string = ""
    planetType: string = ""
    res?: number
    inf?: number
    type: string = "pla"
    techSpe: string[] = []
    legendary: boolean = false
    ruine: boolean = false
    ruineType: string = "normal"
    ruine2: boolean = false
    ruineType2: string = "normal"
    habilite: string = ""
    unitName: string = ""
    nativeUnit: boolean = false
    unitEffect: string = ""
    unitQuantity: number = 1
    unitCombat: number = 5
    unitPV: number = 1
    unitCombatTouche: number = 1
    homePlanet: Link = new Link("faction")
}

export default { name: "Planet", classe: Classe, form: Form, display: Display, dep: Array<string>("faction"),print:"grid-cols-6" }

export function PlanetPict({ data,dep }: { data: Classe ,dep:Map<string, Array<ElementJeu>>}) {
    return (<div className=" text-white h-32.5 w-43 flex items-center justify-center">
        <Image src={data.img || "/404.jpeg"} alt="data.img" width="230" height="230" className="px-6 pt-2 my-auto" />
        <div className={"text-center absolute top-0 z-10 " + (data.name.length > 13 || (planetType && data.name.length > 13) ? " text-lg " : " text-xl") + " font-bold w-full text-shadow-lg " + (data.legendary ?   "text-amber-300 " : data.type==="sat"? " text-gray-400 ":"")}>
            {data.planetType ? <Image className="inline" src={planeteIcon.get(data.planetType) || "/404.jpeg"} alt={data.planetType} width={25} height={25} /> : ""}
            {data.homePlanet && data.homePlanet.id!==-1?<Image className="inline" src={getDep(dep,data.homePlanet)?.content?.logo|| "/404.jpeg"} alt={getDep(dep,data.homePlanet)?.content?.logo|| "/404.jpeg"} width={30} height={30}/>:""}
            {nameAff(data.name)}
        </div>
        <div className="w-full absolute top-24 z-10 ">
            <div className="w-full flex items-center justify-center gap-x-1">
                {data.res ? <Hexagone color="yellow">{data.res}</Hexagone> : ""}
                {data.inf ? <Hexagone color="blue">{data.inf}</Hexagone> : ""}
                {data.ruine ? <Ruine type={data.ruineType} /> : ""}
                {data.ruine2 ? <Ruine type={data.ruineType2} /> : ""}
                {data.techSpe.map((e, i) => <Image key={i} src={techIcon.get(e) || "/404.jpeg"} alt={techIcon.get(e) || "/404.jpeg"} width={20} height={20} />)}
            </div>
        </div>
    </div>)
}

function Display({ data, dep,className }: { data: Classe, dep: Map<string, Array<ElementJeu>> ,className:string}) {

    return (<div className={className+" "+smallpo + " bg-[url(/ti/bg.png)] bg-cover relative  text-white  rounded-2xl"}>

        <PlanetPict data={data} dep={dep} />
        <div className={"h-32.5 mx-1 mb-1 p-1 rounded-xl bg-black/70 relative " + componentText}><span dangerouslySetInnerHTML={{ __html: replaceDiese(data.habilite) }}></span>
            {data.nativeUnit ? <>
                <div className="absolute w-full border-2 rounded-t-lg left-0 font-bold  border-white top-17.5 px-1">{data.unitName}</div>
                <div className="absolute w-full border-x-2  h-7.5 left-0 border-white top-21 px-1 pt-0.5"><span dangerouslySetInnerHTML={{ __html: replaceDiese(data.unitEffect) }}></span></div>
                <div className="absolute w-8 border-2 h-4 rounded-bl-lg left-0 font-bold text-xs border-white top-28.5 pb-0.5 ">#: {data.unitQuantity}</div>
                <div className="absolute w-22.5 border-y-2 h-4 text-xs left-8 font-bold  border-white top-28.5 pb-0.5 ">{data.unitCombat ? "Combat:" + data.unitCombat + "*".repeat(data.unitCombatTouche) : ""}</div>
                <div className="absolute w-10 border-2 h-4 rounded-br-lg left-30.5 font-bold text-xs border-white top-28.5 pb-0.5 ">PR: {data.unitPV}</div>
            </> : ""}
        </div>
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    if (!content.homePlanet) content.homePlanet=new Link("faction")

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EnumInput onChange={onChange} name="planetType" value={content} enumClass={planetType} aucun={true} />
                <EnumInput onChange={onChange} name="type" value={content} enumClass={objectType} />
                <BooleanInput onChange={onChange} name="legendary" value={content} />
                <ImagePicker onChange={onChange} name="img" value={content} />
                <NumberInput onChange={onChange} name="res" value={content} min={0} max={9} />
                <NumberInput onChange={onChange} name="inf" value={content} min={0} max={9} />
                <TagInput onChange={onChange} name="techSpe" value={content} tagClass={techType} />
                <BooleanInput onChange={onChange} name="ruine" value={content} />
                <EnumInput onChange={onChange} name="ruineType" value={content} enumClass={ruineType} className={content.ruine ? "" : "hidden"} />
                <BooleanInput onChange={onChange} name="ruine2" value={content} />
                <EnumInput onChange={onChange} name="ruineType2" value={content} enumClass={ruineType} className={content.ruine2 ? "" : "hidden"} />
                <br />
                <EditorInput onChange={onChange} name="habilite" value={content} />
                <br />
                <BooleanInput onChange={onChange} name="nativeUnit" value={content} />
                <div className={content.nativeUnit ? "" : "hidden"}>
                    <TextInput onChange={onChange} name="unitName" value={content} />
                    <EditorInput onChange={onChange} name="unitEffect" value={content} />
                    <NumberInput onChange={onChange} name="unitQuantity" value={content} min={0} max={99} />
                    <NumberInput onChange={onChange} name="unitCombat" value={content} min={0} max={9} />
                    <NumberInput onChange={onChange} name="unitCombatTouche" value={content} min={0} max={9} />
                    <NumberInput onChange={onChange} name="unitPV" value={content} min={0} max={9} />
                </div>
                <br />
                <ModalPickerInput onChange={onChange} name={"homePlanet"} value={content} type={["faction"]} dep={dep || []} />
                <br />
                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}

//svg des ruine colorisé
function Ruine({ type }: { type: string }) {
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
                fill={{ normal: "#FFFFFF", mil: "#FF0000", ancien: "#8800FF", civ: "#AAAA00",spa:"#2222DD" }[type]}
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


