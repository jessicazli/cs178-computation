import React from 'react';
import * as CheckboxOriginal from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

const Checkbox = React.forwardRef(({ className, ...props }, forwardedRef) => (
  <CheckboxOriginal.Root 
    className={`CheckboxRoot ${className}`} 
    {...props} 
    ref={forwardedRef}
  >
    <CheckboxOriginal.Indicator className="CheckboxIndicator">
      <CheckIcon />
    </CheckboxOriginal.Indicator>
  </CheckboxOriginal.Root>
));

export default Checkbox;