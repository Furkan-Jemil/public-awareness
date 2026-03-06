import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getUrgencyColor } from '@/utils';

interface UrgencyBadgeProps {
  level: string;
}

const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ level }) => {
  return (
    <Badge className={`${getUrgencyColor(level)} border`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </Badge>
  );
};

export default UrgencyBadge;