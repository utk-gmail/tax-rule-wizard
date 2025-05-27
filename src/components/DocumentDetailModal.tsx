
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DocumentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    id: string;
    title: string;
    validationRules: string[];
    files: Array<{ name: string; type: string }>;
  };
  onAddRule: () => void;
}

const DocumentDetailModal = ({
  isOpen,
  onClose,
  category,
  onAddRule
}: DocumentDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            Documents for {category.title}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Validation Rules Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Validation Rules
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onAddRule}
                className="text-blue-600 border-blue-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>

            <div className="space-y-3">
              {category.validationRules.map((rule, index) => (
                <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Rule: {rule}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Minimum 3 years of business tax returns must be provided
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Analysis Section */}
          {category.files.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {category.files[0].name}
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-3">
                  Document Type Analysis
                </h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Expected Document Type</p>
                    <p className="text-sm font-medium">{category.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Extracted Document Type</p>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-sm font-medium">{category.title}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Document type should match the given document type
                      </h4>
                      <p className="text-sm text-gray-600">
                        The document type must be identified as {category.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailModal;
