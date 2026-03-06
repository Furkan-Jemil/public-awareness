import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    const classes = `block text-sm font-medium text-gray-700 ${className}`;

    return (
      <label
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

export { Label };