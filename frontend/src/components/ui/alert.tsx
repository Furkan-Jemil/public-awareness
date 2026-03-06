import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variantClasses = 
      variant === 'destructive' 
        ? 'bg-red-50 border-red-200 text-red-800' 
        : 'bg-blue-50 border-blue-200 text-blue-800';
    
    const classes = `p-4 border rounded-md ${variantClasses} ${className}`;

    return (
      <div
        ref={ref}
        className={classes}
        role="alert"
        {...props}
      />
    );
  }
);

Alert.displayName = 'Alert';

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className = '', ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm ${className}`}
      {...props}
    />
  )
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription };