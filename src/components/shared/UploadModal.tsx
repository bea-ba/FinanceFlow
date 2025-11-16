import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, Check, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  acceptedFileTypes?: string;
  onUploadComplete?: (file: File, extractedData?: ExtractedData) => void;
}

interface ExtractedData {
  merchant?: string;
  amount?: number;
  date?: string;
  category?: string;
  confidence?: number; // 0-100
}

export const UploadModal = ({
  open,
  onOpenChange,
  title = "Upload Document",
  description = "Drag and drop your receipt or bill, or click to browse",
  acceptedFileTypes = "image/*,.pdf",
  onUploadComplete,
}: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [step, setStep] = useState<"upload" | "review" | "success">("upload");

  // Simulate OCR extraction (UI only - backend integration needed)
  const simulateExtraction = (uploadedFile: File): ExtractedData => {
    // This is a UI simulation - replace with actual OCR API call
    return {
      merchant: "Sample Merchant",
      amount: 49.99,
      date: new Date().toISOString().split("T")[0],
      category: "groceries",
      confidence: 85,
    };
  };

  const handleFileChange = useCallback((selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);

      // Generate preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }

      // Simulate processing
      setIsProcessing(true);
      setTimeout(() => {
        const extracted = simulateExtraction(selectedFile);
        setExtractedData(extracted);
        setIsProcessing(false);
        setStep("review");
        toast.success("Document processed successfully!");
      }, 1500);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileChange(droppedFile);
      }
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (field: keyof ExtractedData, value: string | number) => {
    if (extractedData) {
      setExtractedData({ ...extractedData, [field]: value });
    }
  };

  const handleConfirm = () => {
    if (file && extractedData) {
      onUploadComplete?.(file, extractedData);
      setStep("success");
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setExtractedData(null);
    setStep("upload");
    setIsProcessing(false);
    onOpenChange(false);
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "text-muted-foreground";
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-alert";
    return "text-warning";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Step */}
          {step === "upload" && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={cn(
                "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
                isDragging
                  ? "border-primary bg-mint-tint"
                  : "border-border hover:border-primary/50 hover:bg-mint-tint/30"
              )}
            >
              <input
                type="file"
                accept={acceptedFileTypes}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) handleFileChange(selectedFile);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>

                <div>
                  <p className="text-lg font-medium text-foreground mb-1">
                    Drop your file here, or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports: JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Review Step */}
          {step === "review" && file && extractedData && (
            <div className="space-y-6">
              {/* File Preview */}
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-border"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-card rounded-lg border border-border">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Confidence:</span>
                    <span className={cn("text-xs font-medium", getConfidenceColor(extractedData.confidence))}>
                      {extractedData.confidence}%
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setExtractedData(null);
                    setStep("upload");
                  }}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Extracted Data Form */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Extracted Information</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="merchant">Merchant / Description</Label>
                    <Input
                      id="merchant"
                      value={extractedData.merchant || ""}
                      onChange={(e) => handleInputChange("merchant", e.target.value)}
                      placeholder="Enter merchant name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={extractedData.amount || ""}
                      onChange={(e) => handleInputChange("amount", parseFloat(e.target.value))}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={extractedData.date || ""}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={extractedData.category || ""}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      placeholder="e.g., groceries"
                    />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Review and edit the extracted information before saving.
                </p>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === "success" && (
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Upload Successful!</h3>
              <p className="text-muted-foreground">
                Your document has been processed and saved.
              </p>
            </div>
          )}

          {/* Actions */}
          {step === "review" && (
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleClose}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Confirm & Save"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
