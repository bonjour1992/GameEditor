

'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createElement, deleteElement, getElement, getListElement } from "@/lib/fetchAPI"
import { Main } from "@/component/main";
import { NavHead } from "@/component/NavHead";
import { SideBar } from "@/component/SideBar";

import { ElementJeu } from "@/lib/datatype";
import { empty, imp, SpecificDisplayer } from "@/lib/imp"
import { buttonCSS } from "@/component/classCSS";


export default function DisplayElement() {
    let { type, jeu, id } = useParams<{ type: string, jeu: string, id: string }>();
    let [element, setElement] = useState(empty(type))
    let [dep, setDep] = useState(new Map<string, Array<ElementJeu>>)

    useEffect(() => { const f = async () => setElement(await getElement(jeu, type, parseInt(id))); f() }, [])




    //load dependencie
    useEffect(() => {
        imp.get(type)?.dep.map(async (t) => {
            var res = await getListElement(jeu, t)
            setDep(new Map<string, Array<ElementJeu>>(dep.set(t, res.element)))
        })
    }, [])

    function dupliquer(e: any) {
        let f = async () => {
            let res = await createElement(jeu, type, element.content)
            window.location.assign("/" + jeu + "/" + type + "/" + res.id + "/edit")
        }
        f()
        e.preventDefault()
    }

    function supprimer(e: any) {
        let f = async () => {
            let res = await deleteElement(jeu, type,parseInt(id))
            window.location.assign("/" + jeu + "/" + type + "/" + res.id + "/edit")
        }
        f()
        e.preventDefault()
    }


    return (
        <>
            <NavHead jeu={jeu} element={type} />
            <div className="flex">
                <Main titre={type} >
                    <SpecificDisplayer content={element.content} type={type} dep={dep} />

                </Main>
                <SideBar >
                    {/*TODO: handle delete and version*/}
                    <button disabled={false} onClick={b => window.location.assign("./" + id + "/edit")} className={buttonCSS}>Editer</button>
                    <button disabled={false} onClick={supprimer} className={buttonCSS}>Delete</button>
                    <button disabled={false} onClick={dupliquer} className={buttonCSS}>Dupliquer</button>
                    <span>auteur:{element.meta?.author}</span>
                    <br />
                    <span>Modifié le:{(new Date(element.meta?.created || 0)).toDateString()}</span>

                </SideBar>
            </div>
        </>
    );
}


