'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function NumberInput({ onChange = (event: { target: { name: any; value: any; }; }) => { }, name = "name", value, label = true, min = -1000000, max = 1000000 }: { onChange: any; name: string; label?: boolean; value: number | undefined; min: number; max: number; }): ReactNode {


    return (
        <span>
            {label && (<Label name={name} />)}
            <input
                type="number"
                name={name}
                id={name}
                value={value || ""}
                min={min}
                max={max}
                onChange={onChange} />
        </span>
    );
}
