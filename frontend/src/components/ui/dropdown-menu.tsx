import React from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <>{children}</>;
};

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const DropdownMenuTrigger = ({ children }: DropdownMenuTriggerProps) => {
  return <>{children}</>;
};

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
}

const DropdownMenuContent = ({ children, align = 'start' }: DropdownMenuContentProps) => {
  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div className={`absolute z-50 mt-1 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${alignmentClasses[align]}`}>
      {children}
    </div>
  );
};

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DropdownMenuItem = ({ children, onClick }: DropdownMenuItemProps) => {
  return (
    <div 
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
export { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };