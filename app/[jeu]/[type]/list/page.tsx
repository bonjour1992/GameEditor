'use client'


import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createElement, getListElement } from "@/lib/fetchAPI"
import { Main } from "@/component/main";
import { NavHead } from "@/component/NavHead";

import { imp, SpecificDisplayer } from "@/lib/imp";
import { ElementJeu } from "@/lib/datatype";
import { loadDep } from "@/component/Utils";




export default function Home() {
  let { type, jeu } = useParams<{ type: string, jeu: string }>();
  let [dep, setDep] = useState(new Map<string, Array<ElementJeu>>)


  //load dependencie
  useEffect(loadDep(jeu, type, dep, setDep), [])

  const [list, setList] = useState([ElementJeu.prototype])
  useEffect(() => {
    const req = async () => {
      let req = await getListElement(jeu, type)

      setList(req.element)
    }
    req()
  }, [])

  function dupliquer(e: any) {

  }

  return (
    <>
      <NavHead jeu={jeu} />
      <Main titre={"Liste des " + imp.get(type)?.name + "s (" + (list.length || 0) + ")"} >
        <a className="print:hidden" href={"/" + jeu + "/" + type + "/new"}>Créer nouveau</a>
        <div className="flex flex-wrap ">

          {
            list.map((e, k) => {
              return (<div key={k} className="p-2 ">
                <div className="w-full">
                  <p><a className="print:hidden" href={"./" + e["id"] } >{e.content?.name}</a></p>
                  <a className="print:hidden" href={"./" + e["id"] + "/edit"} >Edit</a>
                  <button onClick={(event) => {
                    let f = async () => {
                      let res = await createElement(jeu, type, e.content)
                      window.location.assign("/" + jeu + "/" + type + "/" + res.id + "/edit")
                    }
                    f()
                    event.preventDefault()
                  }}>Dupliquer</button>
                </div>
                <SpecificDisplayer content={e.content} type={type} dep={dep} />
              </div>)
            })}
        </div>
      </Main>
    </>
  );
}
