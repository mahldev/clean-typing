import { TestStats } from "@/models";
import { UserState } from "@/stores/userStore";

const API_URL = "http://localhost:8080/restricted/teststats";

export type TestsResponse = {
  tests: TestStats[]
}

type LevelUpResponse = {
  levelUp: boolean
}

function getUserState() {
  const userStorage = localStorage.getItem("user-storage")
  if (userStorage === null) return

  const userState = JSON.parse(userStorage)["state"] as UserState;
  return userState
}

export async function sendStats(stats: TestStats) {

  const userState = getUserState()
  if (userState === undefined) return

  const token = userState.user.token
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(stats),
  };

  const res = await fetch(API_URL, options)
  const json = await res.json() as LevelUpResponse

  return json.levelUp;
}

export async function sendStatsLevelUp(stats: TestStats) {
  const userState = getUserState()
  if (userState === undefined) return

  const token = userState.user.token
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(stats),
  };

  const res = await fetch(`${API_URL}/levelup`, options)

  return res.status === 200
}

export async function getTestStats() {

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

  const json = await res.json() as TestsResponse

  return json;
}
