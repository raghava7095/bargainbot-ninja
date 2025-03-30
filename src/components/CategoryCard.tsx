
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  href: string;
  count?: number;
  className?: string;
}

const CategoryCard = ({ 
  title, 
  icon, 
  color, 
  bgColor, 
  href, 
  count,
  className 
}: CategoryCardProps) => {
  return (
    <Link 
      to={href}
      className={cn(
        "block rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-105",
        bgColor,
        className
      )}
    >
      <div className={cn("rounded-full w-12 h-12 flex items-center justify-center mb-4", color)}>
        {icon}
      </div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      {count !== undefined && (
        <p className="text-gray-600 text-sm">{count} products</p>
      )}
    </Link>
  );
};

export default CategoryCard;
