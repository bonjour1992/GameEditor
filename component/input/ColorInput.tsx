import { ReactNode } from "react";
import { SketchPicker } from 'react-color';
export function ColorInput({ onChange = (event: { target: { name: any; value: any; } }) => { }, name = "name", value, label = true }: { onChange: any, name: string, label?: boolean, value: string }): ReactNode {

    
return (<SketchPicker color={value} onChange={(c,e)=>onChange({target:{name:name,value:c.hex}})}/>)
}
