import "./Letter.css"

interface Props {
  letter: string
  idWord: number
  idLetter: number
}

export default function Letter({ letter, idWord, idLetter }: Props) {
  return (
    <p
      className={`text-3xl relative ${(idWord === 0 && idLetter === 0) ? "active" : ""} letter`}
      id={`${idWord}${idLetter}`}
    >
      {letter}
    </ p>
  )
}
