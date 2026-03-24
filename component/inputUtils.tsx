'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { EditorContent, useEditor, EditorContext, UseEditorStateOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Editor, generateHTML } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { ElementJeu, ElementContent, Link } from "@/lib/datatype";
import { imp, SpecificEditor, SpecificDisplayer } from "@/lib/imp"
import { buttonCSS, dialogCSS, h2CSS, modalCSS } from "./classCSS";
import { getImageTree } from "@/lib/fetchAPI";
import Image from "next/image";

export function handleInputChange(formData: {}, setFormData: Dispatch<SetStateAction<any>>) {
    return (event: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
}


function Label({ name = "Label missing" }: { name: string }): ReactNode {

    return (<label htmlFor={name}>{name}</label>)

}

export function EditorInput({ onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true }: { onChange: any, name: string, label?: boolean, value: string }): ReactNode {
    const extensions = [StarterKit]
    const editor = useEditor({
        extensions: extensions,
        editorProps: {
            attributes: {
                class: " bg-gray-100 prose prose-sm m-1 focus:outline-none",
            },
        },
        content: value || "loading",
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        onUpdate: () => onChange({ target: { name: name, value: generateHTML(editor.getJSON(), extensions) } }),
    }) as Editor

    //pas compris mais nécessaire pour initialiser l'éditeur
    useEffect(() => { if (editor && value != generateHTML(editor?.getJSON(), extensions)) editor?.commands.setContent(value) }, [value, editor])

    function ButtonClass(active?: boolean): string {
        let res: string
        res = "bg-blue-500 hover:bg-blue-400 text-white font-boldpy-0 border-blue-700 hover:border-blue-500 rounded"
        return res + (active ? " py-0 px-1 border-4" : " py-1 px-2")
    }
    const editorState = useEditorState({
        editor,
        // the selector function is used to select the state you want to react to
        selector: ({ editor }) => {
            if (!editor) return null;
            return {
                isEditable: editor.isEditable,
                currentSelection: editor.state.selection,
                currentContent: editor.getJSON(),
                isBold: editor.isActive('bold'),
            };
        },
    })

    return (
        <div className="border-2 rounded-lg">
            {label && (<Label name={name} />)}
            <EditorContext.Provider value={{ editor }} >
                <div className="control-group overflow-hidden antialiased  ">
                    <div className="button-group px-3 py-1 flex items-center gap-0.5">
                        <button
                            onClick={(e) => {
                                editor.chain().focus().toggleBold().run()
                                e.preventDefault()
                            }}
                            className={ButtonClass(editorState?.isBold)}>
                            B
                        </button>
                    </div>
                </div>
                <EditorContent editor={editor} />
            </EditorContext.Provider>
        </div>
    )
}

export function TextInput({ onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value = "", label = true }): ReactNode {


    return (
        <span>
            {label && (<Label name={name} />)}
            <input
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onChange} />
        </span>
    )
}

export function NumberInput({ onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true, min = -1000000, max = 1000000 }: { onChange: any, name: string, label?: boolean, value: number | undefined, min: number, max: number }): ReactNode {


    return (
        <span>
            {label && (<Label name={name} />)}
            <input
                type="number"
                name={name}
                id={name}
                value={value || ""}
                min={min}
                max={max}
                onChange={onChange} />
        </span>
    )
}

export function EnumInput({ onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true, enumClass }: { onChange: any, name: string, label?: boolean, value: any | undefined, enumClass: any }): ReactNode {
    return (
        <span>
            {label && (<Label name={name} />)}
            <select name={name}
                id={name}
                value={value || ""}
                onChange={onChange}
            >

                {Object.keys(enumClass).map((k: any) => {

                    return (<option value={k} key={k}>{enumClass[k]}</option>)
                })}
            </select>
        </span>
    )
}

export function TagInput({ onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true, tagClass }: { onChange: any, name: string, label?: boolean, value: any | undefined, tagClass: any }): ReactNode {

    return (
        <span>
            {label && (<Label name={name} />)}
            {Object.keys(tagClass).map((k: any) => {
                return (<span key={k}>
                    <input type="checkbox" id={k} name={k} checked={value.includes(k)} onChange={
                        (e) => {
                            let res = value
                            if (e.target.checked) res = Object.keys(tagClass).filter((elem: string) => res.includes(elem) || elem === e.target.name)
                            else res = res.filter((elem: string) => elem != e.target.name)
                            onChange({ target: { name: name, value: res } })
                        }
                    } />
                    <label htmlFor={k}>{tagClass[k]}</label>
                </span>
                )
            })}
        </span>
    )
}

export function ModalPickerInput(
    { onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true, type, dep, className = "", index }:
        { onChange: any, name: string, label?: boolean, value: any | undefined, type: string, dep: Array<ElementJeu>, className?: string, index?: number })
    : ReactNode {

    let k = -1
    let val
    if (index!== undefined) {
        val = value[index]
    }
    else {
        val = value
    }
    dep.map((e, i) => {
        if (e.id === val.id) k = i
    })


    let [selected, setSelected] = useState(k)


    function close(e?: any) {
        document.getElementById("modal" + name+index)?.classList.add("hidden")
        setSelected(k)
        e && e.preventDefault()
    }

    return (<div className={className}>
        {label && (<Label name={name} />)}
        <button onClick={(e) => { document.getElementById("modal" + name+index)?.classList.remove("hidden"); e.preventDefault() }}
            className={buttonCSS}> {dep[k]?.content.name || "Aucun"} </button>
        <div id={"modal" + name+index} className={modalCSS + " hidden"}>
            <div id="dialog"
                className={dialogCSS}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialogTitle">
                <div className="border-b-2 pb-2">
                    <button onClick={close} className={buttonCSS + " float-right "} >Fermer</button>
                    <h2 className={h2CSS}>Selection de {type}</h2>
                </div>
                <div className="w-full border-b-2 pt-1 pb-1">
                    <select value={selected} onChange={(e) => { setSelected(parseInt(e.target.value) || 0) }}>
                        <option key={-1} value={-1}>Aucun</option>
                        {dep.map((e, i) => {
                            return (<option key={i} value={i}>{e.content.name}</option>)
                        })}
                    </select>
                    <button className={buttonCSS} onClick={
                        (e) => {
                            let l = new Link
                            l.id = (dep[selected] || { id: -1 }).id
                            l.content = (dep[selected] || { content: new (imp.get(type)?.classe || ElementContent) }).content
                            l.type = type
                            onChange({ target: { name: name, index: index, value: l } })
                            close(e)
                        }
                    }>Valider</button>
                </div>
                <SpecificDisplayer content={(dep[selected] || { content: new (imp.get(type)?.classe || ElementContent) }).content} type={type} />

            </div>

        </div>
    </div>)
}

export function ImagePicker({ onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true }: { onChange: any, name: string, label?: boolean, value: any | undefined }): ReactNode {
    let folder: any[]
    let [image, setImage] = useState({ name: "loading", children: [] })
    let [selected, setSelected] = useState(value || "")
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
        setSelected(value || "")
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
        {label && (<Label name={name} />)}
        <Image src={value} alt={value} width="50" height="50" />
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

                            folder ? folder.filter((e) => e.type === "file").map((e, i) => (<div key={i} onClick={() => { setSelected("/"+e.relativePath) }} className="clear-both w-48 px-1 truncate overflow-hidden"><Image src={"/" + e.relativePath} alt={value} width="20" height="20" className="float-left" />{e.name}</div>)) : ""

                        }
                    </div>
                    <div className="absolute  left-32 top-64 size-32 ">
                        <Image src={ selected} alt={selected} width="100" height="100" className="object-scale-down size-30 p-1" />
                    </div>
                    <div className="absolute  left-64 top-64 size-32 ">
                        {selected}
                        <button className={buttonCSS} onClick={(e)=>{onChange({ target: { name: name, value: selected }}) ; e.preventDefault()}}>Valider</button>
                    </div>
                </div>

            </div>

        </div>
    </div>)
}