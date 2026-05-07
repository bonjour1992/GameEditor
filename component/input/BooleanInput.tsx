'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function BooleanInput({ onChange = (event: { target: { name: any; value: any; }; }) => { }, name = "name", value = false, label = true }): ReactNode {


    return (
        <span>
            {label && (<Label name={name} />)}
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={value}
                onChange={(e) => {
                    onChange({ target: { name: name, value: e.target.checked } })
                }

                } />
        </span>
    );
}
