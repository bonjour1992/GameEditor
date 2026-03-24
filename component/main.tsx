
import { ReactNode, } from "react";



export  function NavHead(props:any){

return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 print:hidden">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
            <div>
            <a>Acceuil</a>
            {props.jeu?(<><span>  &gt;  </span><a>{props.jeu}</a></>):""}
            </div>
        </div>
        </nav>
)
}


export  function Main(props: {
    titre: string,
    children: React.ReactNode
}): ReactNode {
    return (




        <main className="flex min-h-screen w-full flex-col bg-white dark:bg-black sm:items-start">
            <title>{props.titre}</title>
            <h1 className="print:hidden">{props.titre}</h1>
            {props.children}
        </main>

    )
}

