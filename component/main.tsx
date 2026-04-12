
import { ReactNode, } from "react";



export  function Main(props: {
    titre: string,
    children: React.ReactNode
}): ReactNode {
    return (
        <main className="flex min-h-screen w-full flex-col bg-white dark:bg-black sm:items-start">
            <title>{props.titre}</title>
            <h1 className="text-3xl print:hidden">{props.titre}</h1>
            {props.children}
        </main>

    )
}

