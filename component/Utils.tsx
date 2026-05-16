import { ElementJeu } from "@/lib/datatype"
import { getListElement } from "@/lib/fetchAPI"
import { imp, jeu } from "@/lib/imp"

export function loadDep(jeu: string, type: string, dep: any, setDep: Function) {
  return () => {
    imp.get(type)?.dep.map(async (t) => {
      var res = await getListElement(jeu, t)
      setDep(new Map<string, Array<ElementJeu>>(dep.set(t, res.element)))
    })
  }
}

export function nameAff(name: string) {
  return name.lastIndexOf(":") === -1 ? name : name.substring(name.lastIndexOf(":") + 1)
}