import { GeneralStats } from "@/models";
import { UserState } from "@/stores/userStore";

const API_URL = "http://localhost:8080/restricted/stats";

function getUserState() {
  const userStorage = localStorage.getItem("user-storage")
  if (userStorage === null) return

  const userState = JSON.parse(userStorage)["state"] as UserState;
  return userState
}

export async function getStats() {
  const userState = getUserState()
  if (userState === undefined) return

  const token = userState.user.token
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };


  const res = await fetch(API_URL, options)

  const json = await res.json() as GeneralStats

  return json;
}
