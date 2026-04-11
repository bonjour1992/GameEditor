const dree = require('dree');
const options = {
    depth: 10,                        // To stop after 5 directory levels
    // exclude: "",       // To exclude some pahts with a regexp
    extensions: ['svg', 'jpg', 'png','jpeg'] ,    // To include only some extensions
    stat:false,
      size: false,
};



export async function GET(request: any) {
    let tree;
    tree = await dree.scanAsync('./public', options);
    return Response.json(tree)
}