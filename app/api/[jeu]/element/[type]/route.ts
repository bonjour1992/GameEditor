import clientPromise from "@/app/api/lib/mongodb";
import { createNewElement, getListElement } from "@/app/api/Controller/element"

// voir liste element type
//TODO: filtrer par type
export async function GET() {

  return Response.json({ element:await getListElement() });
}

//creer element
export async function POST(request: any, params: any) {
  let content = await request.json();
  let {jeu,type} = await params.params
  let id = await createNewElement(content, jeu,type)

  return Response.json({ message: "Element created with id:" + id ,id:id,action:"CREATE"});
}


