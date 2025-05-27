
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import FileUpload from "@/components/FileUpload";

interface DocumentCategoryProps {
  category: {
    id: string;
    title: string;
    description: string;
    required: number;
    uploaded: number;
    status: "pending" | "issues" | "complete";
    files: Array<{ name: string; type: string }>;
    validationRules: string[];
  };
  onAddValidationRule: () => void;
}

const DocumentCategory = ({ category, onAddValidationRule }: DocumentCategoryProps) => {
  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            checked={category.status === "complete"}
            readOnly
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {category.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {category.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {category.uploaded}/{category.required} required
          </span>
          <StatusBadge status={category.status} />
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {category.files.map((file, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">PDF</span>
              </div>
              <span className="text-sm text-gray-700">{file.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <span className="text-gray-400">×</span>
            </Button>
          </div>
        ))}
      </div>

      <FileUpload />

      <Button
        variant="ghost"
        size="sm"
        onClick={onAddValidationRule}
        className="mt-3 text-blue-600 hover:text-blue-700"
      >
        + Add Validation Rule
      </Button>
    </Card>
  );
};

export default DocumentCategory;
