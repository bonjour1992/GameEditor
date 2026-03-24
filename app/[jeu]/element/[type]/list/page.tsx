'use client'


import { useParams } from "next/navigation";
import {  useEffect, useState } from "react";
import { getListElement } from "@/lib/fetchAPI"
import {NavHead,Main} from "@/component/main";

import { SpecificDisplayer } from "@/lib/imp";
import { ElementJeu } from "@/lib/datatype";




export default function Home() {
  let { type, jeu } = useParams<{ type: string, jeu: string }>();
const [list,setList]=useState([ElementJeu.prototype])
  useEffect(() => {
    const req = async () => {
      let req = await getListElement(jeu, type)
      console.log(req)
      setList(req.element)
      console.log(list)
    }
    req()
  },[])


  return (
    <>
      <NavHead jeu={jeu} />
      <Main titre={"Voir les:" + type} >
        <div className="flex flex-wrap">
          
        {
        list.map((e,k)=> {
          console.log(e)
          return (<div key={k} className="p-2">
            <div className="w-full">
            <a href={"./"+e["id"]+"/edit"} >Edit</a>
            </div>
            <SpecificDisplayer content={e.content} type={type} />
            </div> )})}
          </div>
      </Main>
    </>
  );
}
