
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileUpload = () => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
      <p className="text-sm text-gray-600 mb-2">
        Drag and drop files here, or click to select
      </p>
      <Button variant="outline" size="sm">
        Choose Files
      </Button>
    </div>
  );
};

export default FileUpload;
