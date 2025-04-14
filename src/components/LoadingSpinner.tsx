import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "animate-spin rounded-full border-4 border-primary border-t-transparent",
        sizeClasses[size]
      )} />
      <div className={cn(
        "absolute top-0 left-0 animate-ping rounded-full border-4 border-primary/20",
        sizeClasses[size]
      )} />
    </div>
  );
};

export default LoadingSpinner; 