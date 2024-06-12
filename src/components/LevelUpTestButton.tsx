import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { IconChartArrowsVertical } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LevelUpTestButton() {
  const navigate = useNavigate()

  function goLevelUpTest() {
    navigate("/levelup")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" className="animate-alert" onClick={goLevelUpTest}>
            <IconChartArrowsVertical stroke={1.4} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This button will take you to a special test. If you pass it, you will level up.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
