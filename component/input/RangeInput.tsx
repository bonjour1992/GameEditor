'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function RangeInput({ className, index, onChange , name = "name", value, label, min = -1000000, max = 1000000 }:
    {
        index?: number,
        className?: string,
        onChange:   ( name: string, value: number,index?:number) => { },
        name: string,
        label?: string,
        value: any,
        min: number,
        max: number
    }): ReactNode {


    return (
        <span className={className}>
            {label && (<Label name={label} />)}
            <input
                type="range"
                name={name}
                id={name}
                value={index !== undefined ? value[name][index] : value[name]|| ""}
                min={min}
                max={max}
                onChange={e => onChange(name , parseInt(e.target.value) ,index)} />
        </span>
    );
}

//value={index !== undefined ? (value as number[])[index] : value as number || ""}