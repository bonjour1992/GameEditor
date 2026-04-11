'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function TextInput({ onChange = (event: { target: { name: any; value: any; }; }) => { }, name = "name", value = "", label = true }): ReactNode {


    return (
        <span>
            {label && (<Label name={name} />)}
            <input
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onChange} />
        </span>
    );
}
