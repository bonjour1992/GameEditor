'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function EnumInput({ onChange = (event: { target: { name: any; value: any; }; }) => { }, name = "name", value, label = true, enumClass }: { onChange: any; name: string; label?: boolean; value: any | undefined; enumClass: any; }): ReactNode {
    return (
        <span>
            {label && (<Label name={name} />)}
            <select name={name}
                id={name}
                value={value || ""}
                onChange={onChange}
            >

                {Object.keys(enumClass).map((k: any) => {

                    return (<option value={k} key={k}>{enumClass[k]}</option>);
                })}
            </select>
        </span>
    );
}
