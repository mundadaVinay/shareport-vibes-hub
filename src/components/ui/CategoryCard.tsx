
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Category } from "@/services/mockData";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  const Icon = category.icon;
  const path = `/${category.type}?category=${category.id}`;

  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center p-4 rounded-xl glass-card hover:shadow-md hover:bg-white/90 transition-all duration-300 animate-slide-up",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white mb-3">
        <Icon size={20} />
      </div>
      <span className="font-medium text-center">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
