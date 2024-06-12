import { ThemeProvider } from "@/components/theme-provider";
import MainPage from "@/routes/Main-Page";
import LastTestResults from "@/routes/TestStats-Page";
import HistoryPage from "@/routes/History-Page";
import ProfilePage from "@/routes/Profile-Page"
import { Toaster } from "@/components/ui/sonner"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LevelUpTest from "./routes/LevelUp-Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "result",
    element: <LastTestResults />
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "history",
    element: <HistoryPage />,
  },
  {
    path: "levelup",
    element: <LevelUpTest />,
  }
])

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}
