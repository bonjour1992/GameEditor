


export function NavHead(props: any) {

    return (
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 print:hidden">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
                <div>
                    <a>Acceuil</a>
                    {props.jeu ? (<><span>  &gt;  </span><a>{props.jeu}</a></>) : ""}
                </div>
            </div>
        </nav>
    );
}
