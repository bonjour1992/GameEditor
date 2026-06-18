import { ElementJeu, Link } from "@/lib/datatype";
import { imp, SpecificDisplayerFromDep } from "@/lib/imp";

import { ReactNode, useState } from "react";
import { buttonCSS, modalCSS, dialogCSS, h2CSS } from "../classCSS";
import { getDep, Label } from "../inputUtils";


export function ModalPickerInput(
    { onChange, name = "name", value, label, type, dep, className = "", index }:
        {
            onChange: (name: any, value: any, index?: number) => {},
            name: string,
            label?: string,
            value: any,
            type: string[],
            dep: any,
            className?: string,
            index?: number
        })
    : ReactNode {
console.log(dep)

    const val = index !== undefined ? value[name][index] : value[name]

    let [selected, setSelected] = useState(new Link(type[0]))

    let depe: ElementJeu[] = []
    type.map(e => { dep.get(e) && dep.get(e).map((f: ElementJeu) => depe.push(f)) })

    function close(e?: any) {
        document.getElementById("modal" + name + index)?.classList.add("hidden")
        setSelected(val)
        e && e.preventDefault()
    }

    return (<div className={className}>
        {label && (<Label name={label} />)}
        <button onClick={(e) => { e.preventDefault(); setSelected(val); document.getElementById("modal" + name + index)?.classList.remove("hidden"); }}
            className={buttonCSS}> {getDep(dep, val)?.content?.name || "Aucun"} </button>

        <div id={"modal" + name + index} className={modalCSS + " hidden"}>
            <div id="dialog"
                className={dialogCSS+""}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialogTitle">
                <div className="border-b-2 pb-2">
                    <button onClick={close} className={buttonCSS + " float-right "} >Fermer</button>
                    <h2 className={h2CSS} >Selection de {type.map(e=>imp.get(e)?.name+"/")}</h2>
                </div>
                <div className="w-full border-b-2 pt-1 pb-1">
                    <select id={"select" + name + index} value={selected.toString()} onChange={(e) => { setSelected((new Link).fromString(e.target.value)) }} >
                        <option key={-1} value={type[0] + "#-1"} >Aucun</option>
                        {depe.map((e: ElementJeu, i: number) => {
                            return (<option key={i} value={(new Link(e.meta?.type, e.id)).toString()} >{e.content.name}</option>)
                        })}
                    </select>

                    <button className={buttonCSS} onClick={
                        (e) => {
                            onChange(name, selected, index)
                            close(e)
                            e && e.preventDefault()
                        }
                    }>Valider</button>
                </div>
                <div className=" m-2  w-140 h-72 rounded-lg  overflow-scroll ">
                <SpecificDisplayerFromDep link={selected} dep={dep} />
</div>
            </div>

        </div>
    </div>)
}