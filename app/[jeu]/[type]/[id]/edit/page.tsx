
'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateElement, getElement, getListElement } from "@/lib/fetchAPI"
import {NavHead,Main} from "@/component/main";

import { ElementContent, ElementJeu } from "@/lib/datatype";
import { imp, SpecificEditor, SpecificDisplayer } from "@/lib/imp"
import { loadDep } from "@/component/Utils";





export default function EditorElement() {
  let { type, jeu ,id } = useParams<{ type: string, jeu: string, id: string }>();
  let [meta, setMeta] = useState({})
  let [element, setElement] = useState(new (imp.get(type)?.classe || ElementContent))
  let [dep, setDep] = useState(new Map<string, Array<ElementJeu>>)


  //load element
  useEffect(() => {
    let f = async () => {

      var res = await getElement(jeu, type, parseInt(id))
      setElement(res.content)
      setMeta(res.meta)
    }
    f()
  }
    , [])

  //load dependencie
  useEffect(loadDep(jeu,type,dep,setDep), [])


  function handleInputChange(event: { target: { name: string; index?: number; value: any; }; }) {

    if (event.target.index!== undefined) {

      let table = (element as any)[event.target.name]
      table[event.target.index] = event.target.value
      setElement({ ...element, [event.target.name]: table });

    }
    else {
      setElement({ ...element, [event.target.name]: event.target.value });
    }


  };

  function save(e: Event) {
    let f = async () => {
      let res = await updateElement(jeu, type, parseInt(id),element)
      window.location.assign("/" + jeu + "/" + type + "/" + res.id)
    }
    f()
    e.preventDefault()
  }



  return (
    <>
      <NavHead jeu={jeu} />
      <Main titre={"Editer nouveau " + type} >
        <SpecificEditor content={element} type={type} onChange={handleInputChange} onSubmit={save} dep={dep} />
        <SpecificDisplayer content={element} type={type} dep={dep} />
      </Main>
    </>
  );
}
