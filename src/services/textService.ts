const API_URL = "http://localhost:8080/text"

type EndpointResponse = {
  words: string[]
}

interface Params {
  lang: string
  n: string
}

export async function getText({ lang, n }: Params) {
  const res = await fetch(`${API_URL}?lang=${lang}&n=${n}`)
  const json: EndpointResponse = await res.json()

  return json
}

