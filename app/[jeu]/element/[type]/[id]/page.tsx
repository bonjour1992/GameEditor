

'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getElement } from "@/lib/fetchAPI"
import {NavHead,Main} from "@/component/main";

import { ElementJeu } from "@/lib/datatype";
import { empty, SpecificDisplayer } from "@/lib/imp"


export default function DisplayElement() {
  let { type, jeu, id } = useParams<{ type: string, jeu: string, id: string }>();

    let [element, setElement] = useState(empty(type))

        useEffect(() => { const f = async () => setElement(await getElement(jeu,type, parseInt(id))); f() }, [])

//TODO: add meta info
    return (
        <>
            <NavHead jeu={jeu} />
            <Main titre={type} >
                <SpecificDisplayer content={element.content} type={type} />

            </Main>
        </>
    );
}


