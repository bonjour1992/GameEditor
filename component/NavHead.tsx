import { getImp, getJeu, jeu } from "@/lib/imp";
import { buttonCSS } from "./classCSS";
import { ElementJeu } from "@/lib/datatype";
import { getListElement, getSearch } from "@/lib/fetchAPI";
import { type } from "os";
import { useState, useEffect, MouseEventHandler, MouseEvent, InputEvent } from "react";



export function NavHead(props: any) {

    let [searchItem, SetSearchitem] = useState(new Map<string, string>)
    useEffect(() => {
        const req = async () => {
            let req = await getSearch(props.jeu)
            let newSearchItem = new Map<string, string>()
            req.element.forEach((e: { type: string; name: string; id: string; }) => {
                newSearchItem.set(e.type + ":" + e.name, "/" + props.jeu + "/" + e.type + "/" + e.id)
            });
            SetSearchitem(newSearchItem)
        }
        req()
    }, [])



    function search(e: any) {
        let r = searchItem.get(e.target.value)
        if (r)
            window.location.assign(r)
        e.preventDefault()
    }

    function searchEnter(e: any) {

        if (e.key === "Enter") {
            let res: string = ""
            let continu = true
            searchItem.forEach((v, k) => {
                if (continu && k.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) !== -1) {
                    res = v
                    continu = false
                }
            })
            console.log(res)
            if (res !== "") window.location.assign(res)
            e.preventDefault()
        }

    }

    return (
        <nav className="bg-white border-gray-200 border-b-4 px-4 lg:px-6 py-2.5 dark:bg-gray-800 print:hidden">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
                <div >
                    <a href="/">Acceuil</a>
                    {props.jeu ? (<><span>  &gt;  </span><a href={"/" + props.jeu}>{getJeu(props.jeu)}</a></>) : ""}
                    {props.jeu && props.element ? (<><span>  &gt;  </span><a href={"/" + props.jeu + "/" + props.element + "/list"}>{getImp(props.element)}</a></>) : ""}

                </div>
                <div className="relative w-100">
                    <input id="search" onChange={search} onKeyDown={searchEnter} list="searchitem" type="text" placeholder="rechercher" className="w-full" />

                    <datalist id="searchitem">
                        {[...searchItem.keys()].map((e, i) => <option value={e as string} key={i} ></option>)}
                    </datalist>
                </div>
            </div>
        </nav>
    );
}
