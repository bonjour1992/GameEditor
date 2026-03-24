import { createElement, getElement } from "@/app/api/Controller/element"

// voir element
export async function GET( request:any ,{params} : { params: Promise<{ jeu: string ,id:string}> }) {
let jeu=  (await params).jeu
let id= parseInt((await params).id)
  let carte = await getElement(id)
  if (carte) {
    return Response.json(carte);
  }
  else {
    return Response.json("element non trouvé",{status:404})
  }
}

//mise a jour element
export async function POST(request: any, {params}:{ params:Promise<{ jeu: string,type:string,id:string }>} ) {
  let content = await request.json();
 let {jeu,id,type}=await params 

 id = (await createElement(content, jeu,type, parseInt(id))).toString()

  return Response.json({ message: "Element updated with id:" + id ,id:id,action:"UPDATE"});
}


