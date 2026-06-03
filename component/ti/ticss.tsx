import { small } from "../classCSS"

export const componentBorderColor=" border-gray-500 "
export const componentCSS=" border-4 bg-indigo-950/60 rounded-2xl relative z-5 text-amber-50"+small+componentBorderColor
export const componentName=" border-b-4  py-0.5 w-full px-1 text-base font-bold leading-none "+componentBorderColor
export const componentText=" text-[10px] leading-none pl-1 "

function useautocomplete()
{
    return (<span className="border-b-gray-500 text-amber-50 bg-tr"></span>)
}

export const techCSS = new Map([

    ["gen", " border-green-800 bg-green-400"],
    ["spa", " border-blue-800 bg-blue-400"],
    ["mil", " border-red-800 bg-red-400"],
    ["soc", " border-yellow-800 bg-yellow-400"],
    ["vide", " border-gray-500 bg-gray-200"]
])

export const techTextCSS = new Map([

    ["gen", " text-green-800 "],
    ["spa", " text-blue-800 "],
    ["mil", " text-red-800 "],
    ["soc", " text-yellow-800 "],
    ["vide", " text-gray-500 "]
])