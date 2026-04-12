import clientPromise from "@/app/api/lib/mongodb";
import { buildElement, getListElement, save } from "@/app/api/Controller/element"
import { User } from "../../lib/Auth";


//TODO: user et authorisation

// voir liste element type
export async function GET(request: any, params: any) {
let {jeu,type} = await params.params
  return Response.json({ element:await getListElement(jeu,type) });
}

//creer element
export async function POST(request: any, params: any) {
  let content = await request.json();
  let {jeu,type} = await params.params
  
  let id = await save(await buildElement(content,jeu,type,0,new User,"CREATED"))

  return Response.json({ message: "Element created with id:" + id ,id:id,action:"CREATE"});
}


