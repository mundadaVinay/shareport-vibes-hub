
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Category } from "@/services/mockData";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  const path = `/${category.type}?category=${category.id}`;

  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center p-4 rounded-xl glass-card hover:shadow-md hover:bg-white/90 transition-all duration-300 animate-slide-up",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden mb-3">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-medium text-center">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
