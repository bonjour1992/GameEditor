import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS, smallpo } from "../classCSS";
import { EditorInput } from "../input/EditorInput";
import { ColorInput } from "../input/ColorInput";
import { componentCSS, componentName, componentText } from "./ticss";
import { replaceDiese } from "../inputUtils";
import { nameAff } from "../Utils";
import { turnNumber } from "./ti";





class Classe extends ElementContent {

    usage: string = ""

}

function Display({ data, dep, className }: { data: Classe, dep: Map<string, Array<ElementJeu>>, className?: string }) {
    let turn = Array.from(Array(turnNumber)).map((e, i) => i + 1)
    let td = Array.from(Array(12)).map((e, i) => i + 1)
    let point1 = Array.from(Array(50)).map((e, i) => i + 1)
    let point2 = point1.map((e, i) => i + 51)
    let infa = [4, 7, 10, 12, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30]
    let siege = [0, 0, 2, 0, 2, 2, 3, 3, 3, 4, 4]
    let ministere = [2, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    let mecatol = [1, 1, 1, 1, 1, 2, 2, 2, 2, 4]
    let recrutement = ["3,4,5,6,7,8,9", "3,5,7", "4,5,6", "4,5,7", "4,6,8", "5,6,7", "5,7,9", "6,7,8", "6,8,9", "7,8,9", ""]
    let objectif = ["", "", "Militaire", "Faveur", "Faveur", "Militaire", "Faveur", "Militaire", "", "Militaire", "Faveur deux fois"]
    return (
        <div className={" relative z-5 h-281.25 w-595.5  " + className} >
            <table>
                <tbody>
                    <tr>
                        <td className="w-50" w->Point</td>
                        {point1.map((e) => {
                            return (<td key={e} className="w-10 border-2"> <span className="text-lg">    {e}</span></td>)
                        })}
                    </tr><tr>
                        <td></td>
                        {point2.map((e) => {
                            return (<td key={e} className="w-10  border-2"> <span className="text-lg">    {e}</span></td>)
                        })}
                    </tr>

                    <tr>
                        <td>Siege au conseil</td>
                        {point1.map((e) => {
                            return (<td key={e} className="w-10  border-2"> <span className="text-lg">    {e}</span></td>)
                        })}
                    </tr>
                    <tr>
                        <td>Infamie</td>
                        {infa.map((e, i) => {
                            return (<td key={i} className="w-10  border-2"> <span className="text-lg">    -{e}</span></td>)
                        })}
                    </tr>
                </tbody>
            </table>
            <table className="border-x-4 border-black">
                <thead>
                    <tr className="h-20 text-3xl">

                        <th className="w-49 border-8">Tour</th>
                        {turn.map((e) => {
                            return (<th key={e} className={(e === 10 ? "w-98" : "w-49") + " border-8 break-after-all " } colSpan={e === 10 ? 2 : 1}> <span className="text-5xl font-extrabold">    {e}</span></th>)
                        })}

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Recrutement disponible</td>
                        {recrutement.map((e, i) => {
                            return (<td key={i} className=" text-3xl font-bold text-center  border-4"> <span className="text-lg">    {e}</span></td>)
                        })}
                    </tr>
                    <tr className="h-110 border-4"><td>Evenement</td>
                        <td></td>
                        <td colSpan={2} className="border-4  text-4xl font-bold">Evenement mineur</td>
                        <td colSpan={2} className="border-4  text-4xl font-bold">Evenement mineur</td>
                        <td colSpan={2} className="border-4  text-4xl font-bold">Evenement mineur</td>
                        <td colSpan={4} className="border-4  text-4xl font-bold text-center">Evenement majeur</td>
                    </tr>
                    <tr className="h-66 border-4"><td>Objectif</td>

                        {objectif.map((e, i) => {
                            return (<td key={i} className=" text-3xl font-bold text-center w-59 border-4"> <span className="text-lg">    {e}</span></td>)
                        })}
                    </tr>
                    <tr>
                        <td className="border-4">Point pour mecatol</td>
                        {mecatol.map((e, i) => {
                            return (<td key={i} className=" text-3xl font-bold text-center  border-4"> <span className="text-lg">    {e}</span></td>)
                        })}
                    </tr>
                    <tr>
                        <td className="border-4">Siege en jeu</td>
                        {siege.map((e, i) => {
                            return (<td key={i} className="text-3xl text-center font-bold border-4"> <span className="text-lg">    {e === 0 ? "" : e}</span></td>)
                        })}
                    </tr>
                    <tr>
                        <td className="border-4">Ministere en jeu</td>
                        {ministere.map((e, i) => {
                            return (<td key={i} className="text-3xl text-center font-bold border-4"> <span className="text-lg">    {e === 0 ? "" : e}</span></td>)
                        })}
                    </tr>
                    <tr>
                        <td className="h-5"></td>
                        {td.map((e, i) => {
                            return (<td key={i} className="border-x-4 "> <span className="text-lg">    </span></td>)
                        })}
                    </tr>
                </tbody>
            </table>

        </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content} />
                <EditorInput onChange={onChange} name="usage" value={content} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "Deroule", classe: Classe, form: Form, display: Display, dep: Array<string>() }