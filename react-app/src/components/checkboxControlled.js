import React from 'react';
import * as CheckboxOriginal from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

const CheckboxControlled = React.forwardRef(({ className, checked, ...props }, forwardedRef) => (
  <CheckboxOriginal.Root 
    className={`CheckboxRoot ${className}`} 
    checked={checked}
    {...props} 
    ref={forwardedRef}
  >
    <CheckboxOriginal.Indicator className="CheckboxIndicator">
        {checked === true && <CheckIcon />}
    </CheckboxOriginal.Indicator>
  </CheckboxOriginal.Root>
));

export default CheckboxControlled;