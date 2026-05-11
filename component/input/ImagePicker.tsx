import { getImageTree } from "@/lib/fetchAPI";
import { ReactNode, useState, useEffect } from "react";
import { buttonCSS, modalCSS, dialogCSS, h2CSS } from "../classCSS";
import { Label } from "../inputUtils";
import Image from "next/image";


export function ImagePicker({ index, className, onChange, name, value, label }:
    {
        index?: number,
        className?: string,
        onChange: (name: string, value: string, index?: number) => {},
        name: string,
        label?: string,
        value: any
    }): ReactNode {
    const val= index !== undefined ? value[name][index] : value[name]

    let folder: any[]
    let [image, setImage] = useState({ name: "loading", children: [] })
    let [selected, setSelected] = useState(val || "")
    let [selectedFolder, setSelectedFolder] = useState<number[]>([])
    
    useEffect(() => {
        let f = async () => {
            let res = await getImageTree()
            setImage(res)
        }
        f()
    }, [])

    function close(e?: any) {
        document.getElementById("modal" + name)?.classList.add("hidden")
        setSelected(val || "")
        e && e.preventDefault()
    }

    let Loop = ({ p, chs }: { p: any[], chs: any }) => {

        let nextArray = (elem: any) => { let r = p.slice(); r.push(elem); return r }
        return (<div>
            {chs.map((ch: any, k: any) => {
                if (ch.type === "directory")
                    return (<div key={k} ><span onClick={() => setSelectedFolder(nextArray(k))}>{"-".repeat(p.length)}{ch.name}</span>
                        <Loop p={nextArray(k)} chs={ch.children} /></div>)
                else
                    return ("")
            })}
        </div>)
    }
    folder = image?.children
    selectedFolder.map((e) => folder = folder[e].children)

    return (<div>
        {label && (<Label name={label} />)}
        <Image src={val || "/404.jpeg"} alt={val} width="50" height="50" />
        <button onClick={(e) => { document.getElementById("modal" + name)?.classList.remove("hidden"); e.preventDefault() }}
            className={buttonCSS}> {selected || "Aucune image"} </button>
        <div id={"modal" + name} className={modalCSS + " hidden"}>
            <div id="dialog"
                className={dialogCSS}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialogTitle">
                <div className="border-b-2 pb-2">
                    <button onClick={close} className={buttonCSS + " float-right "} >Fermer</button>
                    <h2 className={h2CSS}>Selection d'image</h2>
                </div>
                <div className="border-b-2 pt-1 pb-1 relative h-96 w-lg">
                    <div className="absolute inset-y-0 left 0 w-32 ">
                        <Loop p={[]} chs={image?.children} />
                    </div>
                    <div className="absolute inset-x-32 top-0 h-64 flex flex-wrap w-96 overflow-y-auto">
                        {
                            folder ? folder.filter((e) => e.type === "file").map((e, i) => (<div key={i} onClick={() => { setSelected("/" + e.relativePath) }} className="clear-both w-48 px-1 truncate overflow-hidden"><Image src={"/" + e.relativePath} alt={val} width="20" height="20" className="float-left" />{e.name}</div>)) : ""
                        }
                    </div>
                    <div className="absolute  left-32 top-64 size-32 ">
                        <Image src={selected || "/404.jpeg"} alt={selected|| "/404.jpeg"} width="100" height="100" className="object-scale-down size-30 p-1" />
                    </div>
                    <div className="absolute  left-64 top-64 size-32 ">
                        {selected}
                        <button className={buttonCSS} onClick={(e) => { onChange( name, selected,index ); document.getElementById("modal" + name)?.classList.add("hidden"); e.preventDefault() }}>Valider</button>
                    </div>
                </div>

            </div>

        </div>
    </div>)
}