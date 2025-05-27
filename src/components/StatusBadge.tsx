
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "issues" | "complete";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          className: "bg-amber-100 text-amber-800 border-amber-200"
        };
      case "issues":
        return {
          label: "Issues",
          className: "bg-red-100 text-red-800 border-red-200"
        };
      case "complete":
        return {
          label: "Complete",
          className: "bg-green-100 text-green-800 border-green-200"
        };
      default:
        return {
          label: "Unknown",
          className: "bg-gray-100 text-gray-800 border-gray-200"
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
