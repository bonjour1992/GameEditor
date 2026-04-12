import { buildElement, getElement, save } from "@/app/api/Controller/element"
import { User } from "@/app/api/lib/Auth";

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

    save(await buildElement(content,jeu,type,parseInt(id),new User,"UPDATED"))

  return Response.json({ message: "Element updated with id:" + id ,id:id,action:"UPDATE"});
}

//suppr element
export async function DELETE(request: any, {params}:{ params:Promise<{ jeu: string,type:string,id:string }>} ) {
 let {jeu,id,type}=await params 

    save(await buildElement(undefined,jeu,type,parseInt(id),new User,"DELETED"))

  return Response.json({ message: "Element updated with id:" + id ,id:id,action:"DELETE"});
}



