'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function NumberInput({ index, className, onChange, name = "name", value, label, min = -1000000, max = 1000000 }:
    {
        index?: number,
        className?: string,
        onChange: (name: string, value: number, index?: number) => {},
        name: string,
        label?: string,
        value: any,
        min?: number,
        max?: number
    }): ReactNode {


    return (
        <span>
            {label && (<Label name={label} />)}
            <input
                type="number"
                name={name}
                id={name}
                value={index !== undefined ? value[name][index] : value[name] || ""}
                min={min}
                max={max}
                onChange={e => onChange(name , parseInt(e.target.value) ,index)} />
        </span>
    );
}
