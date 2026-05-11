'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { EditorContent, useEditor, EditorContext, UseEditorStateOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Editor, generateHTML } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { buttonCSS, dialogCSS, h2CSS, modalCSS } from "./classCSS";
import { getImageTree } from "@/lib/fetchAPI";
import Image from "next/image";
import { strDiese } from "./ti/ti";
import { ElementContent, Link } from "@/lib/datatype";
import { imp } from "@/lib/imp";
import { getImageProps } from 'next/image'
 
export function getBackgroundImage(srcSet = '') {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ')
      return `url("${url}") ${dpi}`
    })
    .join(', ')
  return `image-set(${imageSet})`
}


export function handleInputChange(formData: {}, setFormData: Dispatch<SetStateAction<any>>) {
    return (event: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
}

export function replaceDiese(content:string)
{
    const regex =/#\w+/g
    function replace(str:string)
    {
        return strDiese.get(str.substring(1))?.code||"erreur remplacement"
    }
    var res= content.replaceAll(regex,replace)

    return res
}

export function getDep(dep:any,link:Link)
{
    if (link===undefined) return undefined
    let depe = dep.get(link?.type || new Link) || [{ content: new (imp.get(link?.type)?.classe || ElementContent), id: -1 }]
    let res = depe.filter((e: { id: number; })=>e.id===link.id) || [{ content: new (imp.get(link.type)?.classe || ElementContent), id: -1 }]
    if (res.length < 1 ) res=[{ content: new (imp.get(link.type)?.classe || ElementContent), id: -1 }]
    
    return res[0]
}


export function Label({ name = "Label missing" }: { name: string }): ReactNode {

    return (<label htmlFor={name}>{name}: </label>)

}


