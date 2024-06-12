import { TestsResponse, getTestStats } from "@/services"
import { GeneralStats, TestStats } from "@/models"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownProfile } from "@/components"
import { ModeToggle } from "@/components/mode-toggle"
import { getStats } from "@/services/generalStatsService"
import { Logo } from "@/components/Logo"

export default function TestHistory() {
  const [tests, setTests] = useState<TestsResponse | undefined>()
  const [stats, setStats] = useState<GeneralStats | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getAllTests() {
      try {
        const tests = await getTestStats()
        const stats = await getStats()
        setStats(stats)
        setTests(tests)
        setError(null)
      } catch (err) {
        setError("Failed to fetch test data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    getAllTests()
  }, [])

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl font-bold">Loading...</h1>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl font-bold text-red-600">Error</h1>
        <p className="text-xl">{error}</p>
      </main>
    )
  }

  if (!tests || tests.tests.length === 0) {
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
        <section className="flex justify-center flex-1">
          <h1 className="text-3xl font-bold mt-[300px]">No Data Available</h1>
        </section>
      </main>
    )
  }

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
      <section className="mt-[80px]">
        {stats && (
          <div>
            <div className="flex gap-4 justify-between w-full h-full">
              <div className="flex flex-col gap-2">
                <p className="font-bold text-4xl metric-tittle">Level</p>
                <p className="font-semibold text-2xl metric">{stats.level}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-4xl metric-tittle">Total Tests</p>
                <p className="font-semibold text-2xl metric">{stats.totalTests}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-4xl metric-tittle">Total Words Written</p>
                <p className="font-semibold text-2xl metric">{stats.totalWordsWritten}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-4xl metric-tittle">Total Errors</p>
                <p className="font-semibold text-2xl metric">{stats.totalErrors}</p>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="mt-[50px] overflow-y-scroll scroll mb-16">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">WPM</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Time Taken</TableHead>
              <TableHead>Errors</TableHead>
              <TableHead className="text-right">Words</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.tests.reverse().map((test: TestStats) => (
              <TableRow key={`${test.wpm}-${test.accuracy}-${test.timeTaken}`}>
                <TableCell className="font-medium">{test.wpm.toFixed(2)}</TableCell>
                <TableCell>{test.accuracy.toFixed(2)}%</TableCell>
                <TableCell>{test.timeTaken.toFixed(2)}s</TableCell>
                <TableCell>{test.errors}</TableCell>
                <TableCell className="text-right">{test.words}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main >
  )
}

