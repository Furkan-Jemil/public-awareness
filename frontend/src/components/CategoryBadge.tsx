import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryBadgeProps {
  name: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ name }) => {
  return (
    <Badge variant="secondary">
      {name}
    </Badge>
  );
};

export default CategoryBadge;