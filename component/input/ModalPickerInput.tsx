import { ElementJeu, Link } from "@/lib/datatype";
import { SpecificDisplayerFromDep } from "@/lib/imp";

import { ReactNode, useState } from "react";
import { buttonCSS, modalCSS, dialogCSS, h2CSS } from "../classCSS";
import { getDep, Label } from "../inputUtils";


export function ModalPickerInput(
    { onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true, type, dep, className = "", index }:
        { onChange: any, name: string, label?: boolean, value: any | undefined, type: string[], dep: any, className?: string, index?: number })
    : ReactNode {



    let [selected, setSelected] = useState(new Link(type[0]))
    
    let depe: ElementJeu[] = []
    type.map(e => { dep.get(e) && dep.get(e).map((f: ElementJeu) => depe.push(f)) })

    console.log(depe)
    function close(e?: any) {
        document.getElementById("modal" + name + index)?.classList.add("hidden")
        setSelected(index !== undefined ? value[index] : value)
        e && e.preventDefault()
    }



    return (<div className={className}>
        {label && (<Label name={name} />)}
        <button onClick={(e) => { e.preventDefault();  setSelected(index !== undefined ? new Link(value[index].type,value[index].id ): value); document.getElementById("modal" + name + index)?.classList.remove("hidden"); }}
            className={buttonCSS}> {getDep(dep, index !== undefined ? value[index] : value).content.name || "Aucun"} </button>

        <div id={"modal" + name + index} className={modalCSS + " hidden"}>
            <div id="dialog"
                className={dialogCSS}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialogTitle">
                <div className="border-b-2 pb-2">
                    <button onClick={close} className={buttonCSS + " float-right "} >Fermer</button>
                    <h2 className={h2CSS} >Selection de {type}</h2>
                </div>
                <div className="w-full border-b-2 pt-1 pb-1">
                    <select id={"select"+name + index} value={selected.toString()} onChange={(e) => { setSelected((new Link).fromString(e.target.value)) }} >
                        <option key={-1} value={type[0] + "#-1"} >Aucun</option>
                        {depe.map((e: ElementJeu, i: number) => {
                            return (<option key={i} value={(new Link(e.meta?.type, e.id)).toString()} >{e.content.name}</option>)
                        })}
                    </select>
 
                    <button className={buttonCSS} onClick={
                        (e) => {
                            onChange({ target: { name: name, index: index, value: selected } })
                            close(e)
                            e && e.preventDefault()
                        }
                    }>Valider</button>
                </div>
                <SpecificDisplayerFromDep link={selected} dep={dep} />

            </div>

        </div>
    </div>)
}