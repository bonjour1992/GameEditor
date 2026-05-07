'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function EnumInput({ className, onChange = (event: { target: { name: any; value: any; }; }) => { }, name = "name", value, label = true, enumClass, aucun = false }: { aucun?: boolean, className?: string, onChange: any; name: string; label?: boolean; value: any | undefined; enumClass: any; }): ReactNode {
    return (
        <span className={className}>
            {label && (<Label name={name} />)}
            <select name={name}
                id={name}
                value={value || ""}
                onChange={onChange}
            >
                {aucun && <option value="" key="aucun" >Aucun</option> }
                {Object.keys(enumClass).map((k: any) => {

                    return (<option value={k} key={k}>{enumClass[k]}</option>);
                })}
            </select>
        </span>
    );
}
