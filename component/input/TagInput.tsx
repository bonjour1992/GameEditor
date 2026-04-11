'use client';
import { ReactNode } from "react";
import { Label } from "../inputUtils";


export function TagInput({ onChange = (event: { target: { name: any; value: any; }; }) => { }, name = "name", value, label = true, tagClass }: { onChange: any; name: string; label?: boolean; value: any | undefined; tagClass: any; }): ReactNode {

    return (
        <span>
            {label && (<Label name={name} />)}
            {Object.keys(tagClass).map((k: any) => {
                return (<span key={k}>
                    <input type="checkbox" id={k} name={k} checked={value.includes(k)} onChange={(e) => {
                        let res = value;
                        if (e.target.checked) res = Object.keys(tagClass).filter((elem: string) => res.includes(elem) || elem === e.target.name);
                        else res = res.filter((elem: string) => elem != e.target.name);
                        onChange({ target: { name: name, value: res } });
                    }} />
                    <label htmlFor={k}>{tagClass[k]}</label>
                </span>
                );
            })}
        </span>
    );
}
