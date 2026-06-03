import clientPromise from "@/app/api/lib/mongodb";
import { buildElement, getListElement, getSearch, save } from "@/app/api/Controller/element"
import { User } from "../lib/Auth";



// voir liste search
export async function GET(request: any, params: any) {
let {jeu,type} = await params.params
  return Response.json({ element:await getSearch(jeu) });
}