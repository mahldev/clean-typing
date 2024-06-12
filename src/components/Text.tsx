import { useText } from "../hooks"
import { Skeleton } from "@/components/ui/skeleton"
import Word from "./Word"
import { useState, useEffect, KeyboardEvent } from "react"
import { sendStats } from "@/services"
import { TestStats } from "@/models"
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore"

interface Props {
  lang: string
  n: string
}

function isNormalKey(key: string) {
  return /^[a-z]$/i.test(key);
};

function isFinished(word: number, letter: number, text: any) {
  return word === text.words.length - 1 && letter === text.words[word].length;
}

export default function Text({ lang, n }: Props) {
  const { text } = useText({ lang, n })
  const [letter, setLetter] = useState(0)
  const [word, setWord] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [errors, setErrors] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [wpmData, setWpmData] = useState<number[]>([])
  const [errorTimestamps, setErrorTimestamps] = useState<number[]>([])
  const input = document.getElementById("input") as HTMLInputElement
  const setUserPendingToLevelUp = useUserStore(state => state.setUserPendingToLevelUp)
  const navigate = useNavigate()

  useEffect(() => {
    async function saveData() {
      if (text && completed && startTime && endTime) {
        const timeTaken = (endTime - startTime) / 1000;
        const totalWords = text.words.length;
        const totalChars = text.words.reduce((sum, word) => sum + word.length, 0);
        const wpm = (totalWords / timeTaken) * 60;
        const accuracy = ((totalChars - errors) / totalChars) * 100;
        const stats: TestStats = {
          wpm,
          accuracy,
          timeTaken,
          errors,
          words: Number(n),
          wpmData,
          errorTimestamps
        }
        const levelUpRes = await sendStats(stats)
        if (levelUpRes) {
          setUserPendingToLevelUp()
        }
        navigate("/result", { state: stats })
      }
    }
    saveData()
  }, [completed]);

  function captureInput(event: KeyboardEvent<HTMLInputElement>) {
    if (text === null) return
    if (input !== null) input.value = ""
    let classToAdd

    const { key } = event
    if (!isNormalKey(key)) return
    const currChar = text.words[word][letter]

    if (key === currChar) {
      classToAdd = "correct"
    } else {
      classToAdd = "incorrect"
      setErrors(errors => errors + 1)
      setErrorTimestamps(errorTimestamps => [...errorTimestamps, Date.now() - (startTime || Date.now())])
    }

    const curr = document.getElementById(`${word}${letter}`)
    if (curr === null) return

    const next = document.getElementById(`${word}${letter + 1}`)

    next?.classList.add("active")
    curr.classList.add(classToAdd)

    if (isFinished(word, letter + 1, text)) {
      setEndTime(Date.now())
      setCompleted(true)
    } else {
      setLetter(letter + 1)
    }

    if (next === null) return
    curr.classList.remove("active")
  }

  function captureSpecialKey(event: KeyboardEvent<HTMLInputElement>) {
    if (text === null) return
    const { key } = event
    const wordLen = text.words[word].length

    const wl = wordLen === letter ? letter - 1 : letter

    const curr = document.getElementById(`${word}${wl}`)
    const next = document.getElementById(`${word + 1}${0}`)

    if (key === " ") {
      const now = Date.now();
      if (!startTime) {
        setStartTime(now);
        setWpmData([0]);
      } else {
        const timeElapsed = (now - startTime) / 1000;
        const currentWpm = ((word + 1) / timeElapsed) * 60;
        setWpmData(wpmData => [...wpmData, currentWpm]);
      }
      curr?.classList.remove("active")
      next?.classList.add("active")
      setLetter(0)
      setWord(word => word + 1)
    }
  }

  return (
    <label className="flex flex-wrap items-center justify-center min-h-[100px]">
      {text
        ? (
          <>
            {text.words.map((word, i) => <Word key={i} word={word} idWord={i} />)}
            <input
              type="text"
              id="input"
              className="absolute top-0 border border-black opacity-0"
              maxLength={1}
              autoFocus
              onKeyUp={(e) => captureInput(e)}
              onKeyDown={(e) => captureSpecialKey(e)} />
          </>
        )
        : (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {Array.from({ length: Number(n) }).map((_, i) => <Skeleton key={i} className="h-4 w-[60px] p-1" />)}
          </div>
        )
      }
    </label>
  )
}
