'use client'


import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { getListElement } from "@/lib/fetchAPI"
import { Main } from "@/component/main";
import { NavHead } from "@/component/NavHead";

import { imp, SpecificDisplayer } from "@/lib/imp";
import { ElementJeu } from "@/lib/datatype";
import { loadDep } from "@/component/Utils";
import { SideBar } from "@/component/SideBar";
import { NumberInput } from "@/component/input/NumberInput";
import { buttonCSS } from "@/component/classCSS";




export default function Home() {
    let { type, jeu } = useParams<{ type: string, jeu: string }>();
    let [dep, setDep] = useState(new Map<string, Array<ElementJeu>>)
    let [print, setPrint] = useState(Array<number>)
    const [list, setList] = useState([ElementJeu.prototype])

    //load dependencie
    useEffect(loadDep(jeu, type, dep, setDep), [])

    useEffect(() => {
        const req = async () => {
            let req = await getListElement(jeu, type)

            setList(req.element)
            let p: Array<number> = []
            req.element.map((e, k) => p.push(0))
            setPrint(p)
        }
        req()
    }, [])


    return (
        <>
            <NavHead jeu={jeu} />
            <div className="flex">
                <Main titre={ imp.get(type)?.name + " a imprimmer (" + (print.reduce((s: number, a: number) => s + a, 0)|| 0) + ")"} >
         <div className={"grid  gap-0 "+imp.get(type)?.print}>

 {
            list.map((e, k) => {
              return (
<>
                {
                [...Array(print[k])].map((f, i)=><SpecificDisplayer key={k*10000+i}  content={e.content} type={type} dep={dep} />)
            
            }
</>
              )
            })}
            </div>
                </Main>
                <SideBar >
                    <button className={buttonCSS} onClick={()=>{
                        let p=print
                        
                        setPrint([...p.map(()=>1)])
                    }} > Imprimmer tout</button>
                    <br />
                    <table><tbody>
                        {
                            list.map((e, k) => {
                                return (<tr key={k}>
                                    <td>
                                        {e.content?.name || "erreur"}
                                    </td>
                                    <td>
                                        <NumberInput
                                            onChange={ (name: string, value: number, index?: number): void => {
                                                let p = print
                                                p[index || 0] = value
                                                setPrint([...p])
                                                
                                            }} name={"p"} index={k} value={{ p: print }} />
                                    </td>
                                </tr>)
                            })}
                    </tbody></table>
                </SideBar>
            </div>

        </>
    );
}
