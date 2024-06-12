import { IconWriting } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export function Logo() {
  return <Link to={"/"}>
    <p className="flex font-ruda text-xl items-center">
      CleanTyp
      <IconWriting stroke={1.5} />
      ng
    </p>
  </Link>
}
