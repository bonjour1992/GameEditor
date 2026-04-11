

export class ElementContent {
  name: string = ""
}

export class ElementJeu {
  id: number = 0
  meta: {
    author: number;
    jeu: "string";
    type: "string";
    created: number;
  } | undefined
  content: any
}

export class Link {
  type: string = ""
  id: number = -1
  __link = true
  constructor(type: string = "", id: number = -1) {
    this.type = type
    this.id = id

  }
  fromString(s:string)
  {
    const words = s.split("#")
    this.type=words[0]
    this.id=parseInt(words[1])
    return this
  }
  toString() {
    return this.type + "#" + this.id
  }
}
