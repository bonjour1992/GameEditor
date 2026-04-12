'use client'


import { useParams } from "next/navigation";
import { Main } from "@/component/main";
import { NavHead } from "@/component/NavHead";
import { exp_Ti5 } from "@/lib/imp";




export default function Home() {
    let { jeu } = useParams<{ jeu: string }>();


    return (
        <>
            <NavHead jeu={jeu} />
            <Main titre={jeu} >
                {exp_Ti5.map((e, i) => {
                    return <a href={jeu+"/"+e[0]+"/list"} key={i}>{e[1].name}</a>
                })}
            </Main>
        </>
    );
}
