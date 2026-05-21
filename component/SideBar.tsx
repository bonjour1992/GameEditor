
export function SideBar(props: any) {

    return (
        <div className="w-80 h-min-screen bg-gray-200 sticky top-0 p-4 print:hidden">
            {props.children}
        </div>
    );
}
