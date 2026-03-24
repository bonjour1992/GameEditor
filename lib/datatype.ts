

export class ElementContent{
 name:string=""
}

export class ElementJeu {
  id:number=0
  meta:{
    author: number;
    jeu: "string";
    type: "string";
    created: number;
  } |undefined
  content: any
}

export class Link{
  type : string=""
  content : any
 id: number =-1
}
