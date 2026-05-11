'use client';
import { JSX, ReactNode, useState } from "react";
import { Label } from "../inputUtils";
import { buttonCSS } from "../classCSS";


export function TableInput({ Line, header, label, className, max ,name,value,index,onChange}:
    {
        max?: number,
        className?: string,
        header?: string[],
        onChange:   ( name: string, value: number,index?:number) => { },
        Line: (x: number) => ReactNode[],
        label?: string,
        name:string,
        value:any,
        index?:number
    })
    : ReactNode {

    const val= index !==undefined ? value[name][index] : value[name]

    function addLine(event: React.MouseEvent<HTMLButtonElement>) {
        onChange(name,val+1,index)
        event.preventDefault()
    }
    var rows: ReactNode[] = []
    for (let i = 0; i < val; i++) {
        rows[i] = (<tr key={i}>
            {Line(i).map((l, j) => (<td key={j}>{l}</td>))}
        </tr>)
    }
    return (
        <span className={className}>
            {label && (<Label name={label} />)}
            <table>
                {header && <thead><tr><td>test</td></tr></thead>}
                <tbody>
                    {rows}
                </tbody>
            </table>
            <button onClick={addLine} className={buttonCSS+" "+((max && max === val) ? " hidden" : "")}>+ Ajouter</button>
        </span>
    );
}
