import Letter from "./Letter";

interface Props {
  word: string
  idWord: number
}

export default function Word({ word, idWord }: Props) {
  return (
    <div className="flex px-1">
      {word.split("").map((letter, i) => <Letter key={i} idWord={idWord} idLetter={i} letter={letter} />)}
    </div>
  )
}
