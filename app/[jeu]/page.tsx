'use client'


import { useParams } from "next/navigation";
import { NavHead, Main } from "@/component/main";

import { element } from "@/component/ti/ti";



export default function Home() {
    let { jeu } = useParams<{ jeu: string }>();


    return (
        <>
            <NavHead jeu={jeu} />
            <Main titre={jeu} >
                {element.map((e, i) => {
                    return <div key={i}>e[0]</div>
                })}
            </Main>
        </>
    );
}
