import { useEffect, useState } from "react"
import { getText } from "../services"

interface Props {
  lang: string
  n: string
}

type Text = {
  words: string[]
}

export function useText({ lang, n }: Props) {
  const [text, setText] = useState<Text | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true;

    (async function() {
      try {
        setText(null)
        const words = await getText({ lang, n })

        if (isMounted) {
          setText(words)
        }
      } catch (e) {
        if (isMounted) {
          setError("Error fetching text")
        }
      }
    })()

    return () => { isMounted = false }
  }, [lang, n])

  return { text, error }
}
