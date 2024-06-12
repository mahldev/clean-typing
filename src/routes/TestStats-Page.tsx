import { DropdownProfile, LoginButton, SignUpButton } from "@/components";
import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserStore } from "@/stores/userStore";
import { IconChevronRight } from "@tabler/icons-react";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

interface Stats {
  wpm: number
  accuracy: number
  timeTaken: number
  errors: number
  wpmData: number[]
  errorTimestamps: number[]
  confetti: boolean
}

export default function Result() {
  const location = useLocation()
  const stats = location.state as Stats
  const navigate = useNavigate()
  const userState = useUserStore(state => state.user)

  function goToNextTest() {
    navigate("/")
  }

  if (!stats) {
    return <p>No stats available. Please complete the test first.</p>
  }

  const labels = stats.wpmData.map((_, index) => (index + 1).toString())
  const errorData = stats.errorTimestamps.map(timestamp => {
    const timeInSeconds = timestamp / 1000;
    const closestWpmIndex = Math.floor(timeInSeconds / (stats.timeTaken / stats.wpmData.length));
    return {
      x: (closestWpmIndex + 1).toString(),
      y: stats.wpmData[closestWpmIndex]
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'WPM',
        data: stats.wpmData,
        borderColor: 'rgba(66, 153, 225, 1)',
        backgroundColor: 'rgba(66, 153, 225, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Errors',
        data: errorData,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        showLine: false,
        type: 'scatter'
      }
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(66, 153, 225, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  };

  return (
    <main className="flex flex-col min-h-screen p-4 w-[1200px] m-auto">
      {stats.confetti && <Confetti />}
      <header className="flex items-center justify-between">
        <section>
          <Logo />
        </section>
        <section className="flex gap-2 justify-end">
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
      <div className="grid grid-cols-10 mt-[80px]">
        <section className="flex col-span-2 justify-start items-start w-full h-full">
          <div className="flex flex-col gap-4 ml-5 w-full h-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-5xl metric-tittle">wpm</p>
                    <p className="font-semibold text-2xl metric">{stats.wpm.toFixed(2)}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Words per minute: the number of words you typed per minute.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-5xl metric-tittle">acc</p>
                    <p className="font-semibold text-2xl metric">{stats.accuracy.toFixed(2)}%</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Accuracy: the percentage of correct characters typed.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-5xl metric-tittle">time</p>
                    <p className="font-semibold text-2xl metric">{stats.timeTaken.toFixed(2)}s</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Time taken: the total duration of the typing test.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-5xl metric-tittle">errors</p>
                    <p className="font-semibold text-2xl metric">{stats.errors}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Errors: the number of typing mistakes made.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>
        <section className="flex flex-col col-span-8 w-full h-full">
          <Line data={data} options={options} />
        </section>
      </div >
      <section className="flex items-center justify-center gap-4 w-full mt-[50px]">
        <Button onClick={goToNextTest} variant="outline" size="icon" className="border-none mt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IconChevronRight stroke={1.5} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to next test</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </section>
    </main >
  )
}
