'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function TagInput({ index,className , onChange , name = "name", value, label , tagClass }: 
{
    index?:number,
     className?:string, 
     onChange:  ( name: string, value: string[],index?:number) => { }, 
     name: string,
     label?: string,
     value: any ,
     tagClass: any
     }): ReactNode {
const val =index !== undefined ? value[name][index] : value[name]
    return (
        <span className={className}>
            {label && (<Label name={label} />)}
            {Object.keys(tagClass).map((k: any) => {
                return (<span key={k}>
                    <input type="checkbox" id={k} name={k} checked={val.includes(k)} onChange={(e) => {
                        let res = val
                        if (e.target.checked) res = Object.keys(tagClass).filter((elem: string) => res.includes(elem) || elem === e.target.name)
                        else res = res.filter((elem: string) => elem != e.target.name)
                        onChange(name, res ,index)
                    }} />
                    <label htmlFor={k}>{tagClass[k]}</label>
                </span>
                );
            })}
        </span>
    );
}
