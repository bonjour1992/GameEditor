'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function TextInput({ className, index, onChange, name, value, label }:
    {
        className?: string,
        index?: number,
        onChange: (name: string, value: string, index?: number ) => {},
        name: string,
        value: any,
        label?: string
    }): ReactNode {


    return (
        <span className={className}>
            {label && (<Label name={label} />)}
            <input
                type="text"
                name={name}
                id={name}
                value={index !== undefined ? value[name][index] : value[name]|| ""}
                onChange={e => onChange(name, e.target.value, index)}
                className="border" />
        </span>
    )
}
