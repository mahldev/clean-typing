import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconHistory, IconLogout, IconUser } from "@tabler/icons-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

export function DropdownProfile() {
  const navigate = useNavigate()
  const logoutState = useUserStore(state => state.logout)
  const username = useUserStore(state => state.user.username)

  function goToProfile() {
    navigate("/profile")
  }

  function logtOut() {
    navigate("/")
    logoutState()
  }

  function goToHistory() {
    navigate("/history")
  }

  function profileLetters() {
    return username.slice(0, 2).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{profileLetters()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={goToProfile}>
          <IconUser className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={goToHistory}>
          <IconHistory className="mr-2 h-4 w-4" />
          <span>History & Stats</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={logtOut}>
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
