import { LoginButton, DropdownProfile, SignUpButton } from "@/components";
import { IconInfoCircle } from '@tabler/icons-react';
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconQuestionMark, IconRotateClockwise } from "@tabler/icons-react";

import Text from "@/components/Text";
import LevelUpTestButton from "@/components/LevelUpTestButton";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { Logo } from "@/components/Logo";

type Languages = { [key: string]: string }

const languages: Languages = {
  "es": "Spanish",
  "en": "English",
}

const numbersOfWords: { [key: string]: string } = {
  "10": "10",
  "25": "25",
  "50": "10"
}

export default function() {
  const [key, setKey] = useState(0)
  const [lang, setLang] = useState("en")
  const [n, setN] = useState("10")
  const userState = useUserStore(state => state.user)

  function reloadText() {
    setKey(prevKey => prevKey + 1)
  }

  function updateLanguage(value: string) {
    setLang(value)
  }

  function updateN(value: string) {
    setN(value)
  }

  return (
    <main className="flex flex-col min-h-screen p-4 w-[1200px] m-auto relative">
      <header className="flex items-center justify-between">
        <section>
          <Logo />
        </section>
        <section className="flex gap-2 justify-end">
          {userState.pendingToLevelUp && <LevelUpTestButton />}
          <Select onValueChange={updateLanguage}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={languages[lang]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={updateN}>
            <SelectTrigger className="w-[60px]">
              <SelectValue placeholder={numbersOfWords[n]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <ModeToggle />
          {userState.username ?
            <DropdownProfile />
            : (
              <>
                <LoginButton />
                <SignUpButton />
              </>
            )
          }
        </section>
      </header>
      <section className="flex flex-col flex-wrap justify-end gap-2 min-h-[300px] mt-[100px]">
        <Text key={key} lang={lang} n={n} />
      </section>
      <section className="flex items-center justify-center gap-1">
        <Button className="border-none mt-2" variant="outline" size="icon" onClick={reloadText}>
          <IconRotateClockwise stroke={1.5} />
        </Button>
      </section>
      <footer className="flex absolute bottom-4 right-4 gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button className="border-none mt-2" variant="outline" size="icon">
                <IconInfoCircle stroke={1.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pending</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button className="border-none mt-2" variant="outline" size="icon">
          <IconQuestionMark stroke={1.5} />
        </Button>
      </footer>
    </main >
  )
}
