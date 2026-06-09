import { generateHTML, Editor } from "@tiptap/core";
import { useEditor, useEditorState, EditorContext, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactNode, useEffect } from "react";
import { Label } from "../inputUtils";

export function EditorInput({className,index, onChange , name = "name", value, label }:
    {
        className?:string
        index?:number
        onChange:  ( name: string, value: string,index?:number) => { },
        name: string,
        label?: string,
        value: any
    }): ReactNode {
const val= index !== undefined ? value[name][index] : value[name]
    const extensions = [StarterKit]
    const editor = useEditor({
        extensions: extensions,
        editorProps: {
            attributes: {
                class: " bg-gray-100 prose prose-sm m-1 focus:outline-none "+className,
            },
        },
        content: val || "loading",
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        onUpdate: () => onChange(name,  generateHTML(editor.getJSON(), extensions),index ),
    }) as Editor

    //pas compris mais nécessaire pour initialiser l'éditeur
    useEffect(() => { if (editor && val != generateHTML(editor?.getJSON(), extensions)) editor?.commands.setContent(val) }, [val, editor])

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
            {label && (<Label name={label} />)}
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
