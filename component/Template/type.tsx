import { ElementContent, ElementJeu } from "@/lib/datatype";
import { TextInput } from "../input/TextInput";
import { buttonCSS } from "../classCSS";



class Classe extends ElementContent {


}

function Display({ data, dep }: { data: Classe, dep: Map<string, Array<ElementJeu>> }) {


    return (<div >

             <span className="ml-1"> {data?.name}</span>

            
    </div>)
}

function Form({ content, onChange, onSubmit, id, dep }: { content: any, onChange: any, onSubmit: any, id?: number, dep: Map<string, Array<ElementJeu>> }) {

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput onChange={onChange} name="name" value={content?.name} />

                <button className={buttonCSS} onClick={onSubmit}> Sauvegarder</button>
            </form>
        </>
    )
}


export default { name: "PlaceHolder",classe: Classe, form: Form, display: Display, dep: Array<string>() }