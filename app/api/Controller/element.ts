import { Access, User, checkLogin, checkGrant } from "@/app/api/lib/Auth"
import clientPromise from "@/app/api/lib/mongodb";
import { nextId } from "@/app/api/lib/dbUtils";

export async function getElement(id: Number) {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const element = await db.collection("element").find({ id: id }).sort({ "meta.created": -1 }).limit(1).toArray();

    return element[0]
}


export async function getListElement(jeu: string, type: string) {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    let element = await db.collection("element").aggregate([{ "$match": { "meta.type": { "$eq": type } } }, { "$sort": { "meta.created": 1 } }, { $group: { _id: "$id", "doc": { "$last": "$$ROOT" } } }]).toArray();
    element = element.map((e: { doc: any; }) => e.doc)
    element=element.filter((e: any)=>e.meta.status!=="DELETED")
    return element
}

export async function getSearch(jeu: string) {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    let element = await db.collection("element").aggregate([ { "$sort": { "meta.created": 1 } }, { $group: { _id: "$id", "doc": { "$last": "$$ROOT" } } }]).toArray();
    element = element.map((e: { doc: any; }) => {let r= e.doc.meta;r.id=e.doc?.id;r.name=e.doc.content?.name;return r})
    element=element.filter((e: any)=>e.status!=="DELETED")
    return element
}


function purgeLien(content: any) {
    if (!content){
        return
    }
    else if (content?.__link) {
        delete content.content
    }
    else if (typeof content.map === "function") {
        content.map((e: any) => purgeLien(e))
    }
    else if (typeof content === "object") {
        Object.entries(content).map(e => purgeLien(e[1]))
    }
}

export async function buildElement(content: any, jeu: string, type: string, id: number, u: User, status: string) {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    let nid: number
    if (id === 0)
        nid = await nextId(db, "element")
    else
        nid = id

    purgeLien(content)

    let data: { id: number, content: any, meta: any } = { id: nid, content: content, meta: {} }

    data.meta.author = u.id
    data.meta.jeu = jeu
    data.meta.type = type
    data.meta.created = Date.now()
    data.meta.status=status

    return data
}

export async function save(data: any) {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);

    await db.collection("element").insertOne(data);

    return data.id
}
