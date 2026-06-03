import { ElementContent, ElementJeu, Link } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { getDep, replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";
import { ModalPickerInput } from "../input/ModalPickerInput";
import planet from "./planet";
import { TableInput } from "../input/TableInput";
import { SpecificDisplayerFromDep } from "@/lib/imp";
import { NumberInput } from "../input/NumberInput";





class FullFaction extends ElementContent {

    sheet: Link = new Link("faction")
    techSheet: Array<Link> = new Array(4).fill(new Link("techSheet"))
    system: Link = new Link("system")
    agentNum: Array<number> = new Array(7).fill(0)
    unitNum: Array<number> = new Array(12).fill(0)
    setup: string = ""
    special: Array<Link> = new Array(10).fill(new Link("agent"))
    specialNum: number = 0

}

function Display({ data, dep, className }: { data: FullFaction, dep: Map<string, Array<ElementJeu>>, className?: string }) {


    return (
        <div >
            <SpecificDisplayerFromDep link={data.sheet} dep={dep} />
            <div className="float-left p-5">
                <h2>Agent de départ</h2>
                <table><tbody>
                    {
                        getDep(dep, data.sheet).content.agents?.map((e: any, i: any) => e.id !== -1 ? <tr key={i} >
                            <td><span style={{ color: getDep(dep, e).content.color }}>{nameAff(getDep(dep, e).content.name)}</span></td>
                            <td>{data.agentNum[i]}</td></tr> : "")
                    }
                </tbody></table>
            </div>
            <div className="float-left p-5">
                <h2>Unité de départ</h2>
                <table><tbody>
                    {
                        getDep(dep, data.sheet).content.ships?.map((e: any, i: any) => e.id !== -1 && data.unitNum[i] ? <tr key={i} >
                            <td>{nameAff(getDep(dep, e).content.name)}</td>
                            <td>{data.unitNum[i]}</td></tr> : "")
                    }
                </tbody></table>
            </div>
            <div className="float-left p-5">
                <h2>Mise en place</h2>
                <div > <span dangerouslySetInnerHTML={{ __html: replaceDiese(data?.setup || "") }}></span></div>
            </div>
            <h2 className="clear-both ">Systeme et planete</h2>
            <SpecificDisplayerFromDep link={data.system} dep={dep} className="float-left" />
            {
                getDep(dep, data.system)?.content?.elems?.map((e: any, i: any) => e.id !== -1 ? <SpecificDisplayerFromDep className="float-left" key={i} link={e} dep={dep} /> : "")
            }
            <h2 className="clear-both "> Element supplémentaire</h2>
            <div className="flex">
                {Array.from((new FullFaction).special.keys()).map((i) => {
                    return data?.special && data?.special[i].id !== -1 && <SpecificDisplayerFromDep key={i} link={data.special[i]} dep={dep} />
                })}
            </div>
            <h2 className="clear-both ">Technologies</h2>
            {Array.from((new FullFaction).techSheet.keys()).map((i) => <SpecificDisplayerFromDep key={i} link={data.techSheet[i]} dep={dep} className=" flex-auto " />)}
        </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {
    if (content.setup === undefined) content.setup = ""

    function specialLine(x: number) {
        return [(<ModalPickerInput onChange={onChange} name={"special"} value={content} index={x} type={["ship", "Promesse"]} dep={dep || []} />)]
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <ModalPickerInput onChange={onChange} name={"sheet"} value={content} type={["faction"]} dep={dep || []} />

                <div className="grid grid-cols-4">
                    {Array.from((new FullFaction).techSheet.keys()).map((i) => {
                        return (<div key={i} className="p-2" ><ModalPickerInput onChange={onChange} name={"techSheet"} value={content} index={i} type={["techsheet"]} dep={dep || []} /></div>)
                    })}
                </div>
                <ModalPickerInput onChange={onChange} name={"system"} value={content} type={["system"]} dep={dep || []} />
                <h2>Agent de départ</h2>
                <table><tbody>
                    {
                        getDep(dep, content.sheet).content.agents?.map((e: any, i: any) => e.id !== -1 ? <tr key={i} >
                            <td><span style={{ color: getDep(dep, e).content.color }}>{getDep(dep, e).content.name}</span></td>
                            <td><NumberInput onChange={onChange} index={i} name={"agentNum"} value={content} /></td></tr> : "")
                    }
                </tbody></table>
                <h2>Unité de départ</h2>
                <table><tbody>
                    {
                        getDep(dep, content.sheet).content.ships?.map((e: any, i: any) => e.id !== -1 ? <tr key={i} >
                            <td>{getDep(dep, e).content.name}</td>
                            <td><NumberInput onChange={onChange} index={i} name={"unitNum"} value={content} /></td></tr> : "")
                    }
                </tbody></table>
                <h2>Mise en place</h2>
                <EditorInput onChange={onChange} name="setup" value={content} />
                <h2>Element supplémentaire</h2>
                <TableInput onChange={onChange} Line={specialLine} max={10} name="specialNum" value={content} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}

export default { name: "Faction compléte", classe: FullFaction, form: Form, display: Display, dep: Array<string>("faction", "techsheet", "system", "planet", "ship", "tech", "agent", "habilite", "planet","Promesse") }