export async function nextId(db:any,id:string):Promise<number>
{
    const val = await db.collection("ids").find({ 'id' : id }).toArray()
    if (!val[0])
    {
        await db.collection("ids").insertOne({'id':id,'val':1});
        return 1
    }
    else{
        await db.collection("ids").updateOne({ 'id' : id}, {'$inc' : { 'val' : 1 } })
        return val[0].val+1
    }
}