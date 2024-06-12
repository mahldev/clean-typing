export interface TestStats {
  wpm: number
  accuracy: number
  timeTaken: number
  errors: number
  words: number
  wpmData: number[]
  errorTimestamps: number[]
  confetti?: boolean
}
