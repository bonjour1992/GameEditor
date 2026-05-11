'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function EnumInput({ index,className, onChange , name = "name", value, label, enumClass, aucun = false }:
    {
        aucun?: boolean,
        index?:number,
        className?: string,
        onChange:  ( name: any,value: any,index?:number  ) => { },
        name: string,
        label?: string,
        value: any ,
        enumClass: any
    }): ReactNode {
    return (
        <span className={className}>
            {label && (<Label name={label} />)}
            <select name={name}
                id={name}
                value={index !== undefined ? value[name][index] : value[name] || ""}
                onChange={e => onChange(  name, e.target.value ,  index )}
            >
                {aucun && <option value="" key="aucun" >Aucun</option>}
                {Object.keys(enumClass).map((k: any) => {

                    return (<option value={k} key={k}>{enumClass[k]}</option>);
                })}
            </select>
        </span>
    );
}
