import React from 'react';
import * as DialogOriginal from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const Dialog = DialogOriginal.Root;

const DialogTrigger = DialogOriginal.Trigger;

const DialogPortal = DialogOriginal.Portal;

const DialogOverlay = React.forwardRef(({ className, ...props }, forwardedRef) => (
  <DialogOriginal.Overlay
    className={`DialogOverlay ${className}`}
    {...props}
    ref={forwardedRef}
  />
));
DialogOverlay.displayName = DialogOriginal.Overlay.displayName;

const DialogContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <DialogOriginal.Content
    className={`DialogContent ${className}`}
    {...props}
    ref={forwardedRef}
  > 
    {children}
  </DialogOriginal.Content>
));
DialogContent.displayName = DialogOriginal.Content.displayName;

const DialogCloseButton = React.forwardRef(({ className, ...props }, forwardedRef) => (
  <DialogOriginal.Close className={`IconButton ${className}`} {...props} ref={forwardedRef}>
    <Cross2Icon />
  </DialogOriginal.Close>
));
DialogCloseButton.displayName = DialogOriginal.Close.displayName;

export { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogCloseButton };