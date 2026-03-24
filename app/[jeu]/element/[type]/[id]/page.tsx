

'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createElement, getElement } from "@/lib/fetchAPI"
import { NavHead, Main, SideBar } from "@/component/main";

import { ElementJeu } from "@/lib/datatype";
import { empty, SpecificDisplayer } from "@/lib/imp"
import { buttonCSS } from "@/component/classCSS";


export default function DisplayElement() {
    let { type, jeu, id } = useParams<{ type: string, jeu: string, id: string }>();

    let [element, setElement] = useState(empty(type))

    useEffect(() => { const f = async () => setElement(await getElement(jeu, type, parseInt(id))); f() }, [])

  function dupliquer(e: any) {
    let f = async () => {
      let res = await createElement(jeu, type, element.content)
      window.location.assign("/" + jeu + "/element/" + type + "/" + res.id+"/edit")
    }
    f()
    e.preventDefault()
  }



    return (
        <>
            <NavHead jeu={jeu} />
            <div className="flex">
                <Main titre={type} >
                    <SpecificDisplayer content={element.content} type={type} />

                </Main>
                <SideBar >
                    <button disabled={false} onClick={b => window.location.assign("./" + id + "/edit")} className={buttonCSS}>Editer</button>
                    <button disabled={true} className={buttonCSS}>Delete</button>
                    <button disabled={false} onClick={dupliquer} className={buttonCSS}>Dupliquer</button>
                    <span>auteur:{element.meta?.author}</span>
                    <br />
                    <span>Modifié le:{(new Date(element.meta?.created || 0)).toDateString()}</span>

                </SideBar>
            </div>
        </>
    );
}


