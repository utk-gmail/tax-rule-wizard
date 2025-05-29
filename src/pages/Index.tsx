import { useState } from "react";
import DocumentCategory from "@/components/DocumentCategory";
import ValidationRuleModal from "@/components/ValidationRuleModal";
import DocumentDetailModal from "@/components/DocumentDetailModal";
import TopMenuBar from "@/components/TopMenuBar";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalReadOnly, setModalReadOnly] = useState(false);

  const documentCategories = [
    {
      id: "tax-return",
      title: "Business Tax Return",
      description: "",
      required: 3,
      uploaded: 1,
      status: "pending" as const,
      files: [
        { name: "Tax Return - Collier Group Assoc Fed State 2022.pdf", type: "pdf" }
      ],
      validationRules: ["Last 3 years of business tax returns required"]
    },
    {
      id: "bfs",
      title: "BFS (Business Financial Statement)",
      description: "",
      required: 2,
      uploaded: 1,
      status: "pending" as const,
      files: [
        { name: "Terra Cotta P and L 2024 (1).pdf", type: "pdf" }
      ],
      validationRules: ["Latest profit & Loss and Balance sheet is required"]
    },
    {
      id: "rent-roll",
      title: "Rent Roll",
      description: "",
      required: 1,
      uploaded: 2,
      status: "issues" as const,
      files: [
        { name: "Rent roll 2024 12 31.pdf", type: "pdf" },
        { name: "Terra Cotta P and L 2024 (1).pdf", type: "pdf" }
      ],
      validationRules: ["Last year rent roll is required"]
    }
  ];

  const handleAddValidationRule = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setModalReadOnly(false);
    setIsModalOpen(true);
  };

  const handleViewAllRules = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setModalReadOnly(true);
    setIsModalOpen(true);
  };

  const handleStatusClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDetailModalOpen(true);
  };

  const selectedCategoryData = documentCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopMenuBar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <p className="text-gray-600">
            Track and manage your business documents with automated validation
          </p>
        </div>

        <div className="space-y-6">
          {documentCategories.map((category) => (
            <DocumentCategory
              key={category.id}
              category={category}
              onAddValidationRule={() => handleAddValidationRule(category.id)}
              onViewAllRules={() => handleViewAllRules(category.id)}
              onStatusClick={() => handleStatusClick(category.id)}
            />
          ))}
        </div>
      </div>

      <ValidationRuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={selectedCategory}
        existingRules={
          documentCategories.find(cat => cat.id === selectedCategory)?.validationRules || []
        }
        readOnly={modalReadOnly}
      />

      {selectedCategoryData && (
        <DocumentDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          category={selectedCategoryData}
          onAddRule={() => {
            setIsDetailModalOpen(false);
            handleAddValidationRule(selectedCategory);
          }}
        />
      )}
    </div>
  );
};

export default Index;
