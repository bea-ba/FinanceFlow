import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText, File } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PremiumBadge } from "@/components/profile/PremiumBadge";

export const ExportReports = () => {
  const handleExport = (format: string) => {
    toast.success(`Preparing ${format.toUpperCase()} export...`, {
      description: "Your download will start shortly"
    });
  };

  const handleAutoExport = () => {
    toast.info("Premium Feature", {
      description: "Auto-export to Google Sheets is available with Premium"
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport("excel")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export to Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("pdf")}>
            <FileText className="mr-2 h-4 w-4" />
            Export to PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("csv")}>
            <File className="mr-2 h-4 w-4" />
            Export to CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={handleAutoExport} disabled className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Auto-Export
              <PremiumBadge className="scale-90" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Unlock Auto-Export to Google Sheets with Premium</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
