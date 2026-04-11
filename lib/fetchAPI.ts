export async function fetchAPI(url: string, method: string, body?: any): Promise<any> {

  const res = await fetch("/api/"  + url, { method: method, headers: { "Content-Type": "application/json", Authorization: 'GRANT', }, body: JSON.stringify(body) });
  if (res.status === 200) {
    return await res.json()
  }
  else {
    return { err: res.status, data: await res.json() }
  }

}

export async function getListElement(jeu: string, type: string) {
  let res = await fetchAPI(jeu+ "/"+type, "GET")
  return res
}

export async function getElement(jeu: string, type: string, id: Number): Promise<any> {
  return await fetchAPI(jeu+ "/" + type + "/" + id, 'GET')
}

export async function updateElement(jeu: string, type: string, id: Number, content: any): Promise<any> {
  return await fetchAPI(jeu+ "/" + type + "/" + id, 'POST', content)
}

export async function createElement(jeu: string, type: string, content: any): Promise<any> {
  return await fetchAPI(jeu+ "/" + type, 'POST', content)
}

export async function getImageTree()
{
 return await fetchAPI("image",'GET')
}