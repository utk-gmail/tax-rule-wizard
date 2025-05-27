import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface ValidationRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
  existingRules: string[];
}

const ValidationRuleModal = ({
  isOpen,
  onClose,
  categoryId,
  existingRules
}: ValidationRuleModalProps) => {
  const [newRule, setNewRule] = useState("");
  const [rules, setRules] = useState(existingRules);

  const handleAddRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule("");
      toast({
        title: "Validation rule added",
        description: "The new validation rule has been added successfully.",
      });
    }
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
    toast({
      title: "Validation rule deleted",
      description: "The validation rule has been removed.",
    });
  };

  const handleSave = () => {
    console.log(`Saving rules for category ${categoryId}:`, rules);
    toast({
      title: "Rules saved",
      description: "All validation rules have been saved successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Manage Validation Rules
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Existing Rules */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Existing Rules
            </h3>
            <div className="space-y-3">
              {rules.length === 0 ? (
                <Card className="p-4 text-center text-gray-500">
                  No validation rules defined yet
                </Card>
              ) : (
                rules.map((rule, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-700 flex-1 mr-3">
                        {rule}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRule(index)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Add New Rule */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Add New Rule
            </h3>
            <div className="space-y-3">
              <Textarea
                placeholder="Describe your validation rule in natural language (e.g., 'All documents must be from the last 2 years')"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                className="min-h-[100px]"
              />
              <Button
                onClick={handleAddRule}
                disabled={!newRule.trim()}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
          </div>

          {/* Example Rules */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Example Rules:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• All tax returns must be from the last 3 years</li>
              <li>• Financial statements must include both P&L and Balance Sheet</li>
              <li>• Documents must be in PDF format and under 10MB</li>
              <li>• All signatures must be clearly visible and not digitally generated</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValidationRuleModal;
