import { DropdownProfile } from "@/components";
import { Logo } from "@/components/Logo";
import Text from "@/components/TextLevelUp";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/stores/userStore";
import { IconInfoCircle, IconQuestionMark, IconRotateClockwise } from "@tabler/icons-react";
import { useState } from "react";

type Languages = { [key: string]: string }

const languages: Languages = {
  "es": "Spanish",
  "en": "English",
}

export default function LevelUpTest() {
  const [lang, setLang] = useState("en")
  const [key, setKey] = useState(0)
  const userState = useUserStore(state => state.user)

  function updateLanguage(value: string) {
    setLang(value)
  }

  function reloadText() {
    setKey(prevKey => prevKey + 1)
  }

  if (!userState.pendingToLevelUp) {
    return (
      <main className="flex flex-col h-screen p-4 w-[1200px] m-auto">
        <header className="flex items-center justify-between">
          <section>
            <Logo />
          </section>
          <section className="flex gap-2">
            <ModeToggle />
            <DropdownProfile />
          </section>
        </header>
        <section className="flex justify-center mt-[300px] ">
          <h1 className="text-3xl font-bold text-red-600">Error, the user is not pending to level up</h1>
        </section>
      </main>
    )
  }

  return (
    <main className="relative flex flex-col min-h-screen p-4 w-[1200px] m-auto">
      <header className="flex items-center justify-between">
        <section>
          <Logo />
        </section>
        <section className="flex gap-2 justify-end">
          <Select onValueChange={updateLanguage}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={languages[lang]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
          <ModeToggle />
          <DropdownProfile />
        </section>
      </header>
      <section className="flex flex-col flex-wrap justify-end gap-2 min-h-[300px] mt-[100px]">
        <Text key={key} lang={lang} n={"5"} />
      </section>
      <section className="flex items-center justify-center gap-1">
        <Button className="border-none mt-2" variant="outline" size="icon" onClick={reloadText}>
          <IconRotateClockwise stroke={1.5} />
        </Button>
      </section>
      <footer className="flex absolute bottom-4 right-4 gap-1">
        <Button className="border-none mt-2" variant="outline" size="icon">
          <IconInfoCircle stroke={1.5} />
        </Button>
        <Button className="border-none mt-2" variant="outline" size="icon">
          <IconQuestionMark stroke={1.5} />
        </Button>
      </footer>
    </main>
  )
}
