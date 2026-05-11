'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function BooleanInput({ index, onChange, name, value = false, label, className }:
    {
        index?: number,
        className?: string,
        onChange: (name: string,  value: boolean, index?: number) => {},
        name: string,
        value: any,
        label?: string
    })
    : ReactNode {


    return (
        <span className={className}>
            {label && (<Label name={label} />)}
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={index !== undefined ? value[name][index] : value[name]}
                onChange={(e) => {
                    onChange(name,  e.target.checked,index )
                }

                } />
        </span>
    );
}
