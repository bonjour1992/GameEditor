import { Access, User, checkLogin, checkGrant } from "@/app/api/lib/Auth"
import clientPromise from "@/app/api/lib/mongodb";
import { nextId } from "@/app/api/lib/dbUtils";

export async function getElement(id:Number)
{
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const element = await db.collection("element").find({ id:id }).sort({"meta.created":-1}).limit(1).toArray();

    return element[0]
}


export async function getListElement()
{
      const client = await clientPromise;
  const db = client.db("mydatabase");
  let element = await db.collection("element").aggregate([{"$sort":{"meta.created":1}},{$group:{_id:"$id","doc":{"$last":"$$ROOT"}}}]).toArray();
 element=element.map((e: { doc: any; })=>e.doc)
 
 return element
}

export async function createNewElement(content: any, jeu: string,type:string){
        const client = await clientPromise;
  const db = client.db("mydatabase");
    let id = await nextId(db, "element")
    return await createElement(content,jeu,type,id)
}
export async function createElement(content: any, jeu: string,type:string, id: number) {

    //chech auth
    const client = await clientPromise;
    const u = await checkLogin("GRANT")

    if (!checkGrant(u, Access.Write)) {
        return Response.json({ message: "non authorisé niveau WRITE requis" });
    }
    //connect to db
    const db = client.db("mydatabase");
    //create data
    let data: { id: number, content: any, meta: any } = { id:id,content:content,meta: {} }

    data.meta.author = u.id
    data.meta.jeu = jeu
    data.meta.type = type
    data.meta.created = Date.now()




    await db.collection("element").insertOne(data);

    return data.id
}
