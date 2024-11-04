'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button';

export const iconVariants = cva(
  'flex justify-center items-center item-center rounded-full',
  {
    variants: {
      variant: {
        ghost: 'bg-transparent',
        default: 'h-12 w-12 bg-slate-300/80 text-slate-600',
        destructive: 'h-12 w-12 bg-destructive/30 text-destructive',
        outline: 'h-12 w-12 border border-input bg-accent',
        secondary: 'h-12 w-12 bg-gray-300 text-gray-600',
        success: 'h-12 w-12 bg-green-200 text-green-600',
        error: 'h-12 w-12 bg-red-300/50 text-red-600',
        warning: 'h-12 w-12 bg-orange-200 text-orange-600',
        info: 'h-12 w-12 bg-blue-300 text-blue-600',
      },
      variantBackground: {
        ghost: 'bg-transparent',
        default: 'h-16 w-16 bg-slate-200/80',
        destructive: 'h-16 w-16 bg-destructive/10',
        outline: 'h-16 w-16 border border-input bg-background',
        secondary: 'h-16 w-16 bg-gray-200/80',
        success: 'h-16 w-16 bg-green-100',
        error: 'h-16 w-16 bg-red-200/50',
        warning: 'h-16 w-16 bg-orange-100',
        info: 'h-16 w-16 bg-blue-200/80',
      },
      size: {
        default: '16px',
        icon: '18px',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  }
);

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> &
    VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />
));
DialogClose.displayName = DialogPrimitive.Close.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    icon?: React.ReactElement;
  } & VariantProps<typeof iconVariants>
>(({ className, children, icon, variant, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-2 border bg-background py-2 px-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-between">
        <div
          className={cn(
            iconVariants({ variantBackground: variant, size, className })
          )}
        >
          <div className={cn(iconVariants({ variant, size, className }))}>
            {icon}
          </div>
        </div>

        <DialogPrimitive.Close className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X size={18} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>

      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogContentNoClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    icon?: React.ReactElement;
  } & VariantProps<typeof iconVariants>
>(({ className, children, icon, variant, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-2 border bg-background py-2 px-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      onInteractOutside={(e) => {
        e?.preventDefault();
      }}
      {...props}
    >
      <div className="relative flex items-center justify-between">
        <div
          className={cn(
            iconVariants({ variantBackground: variant, size, className })
          )}
        >
          <div className={cn(iconVariants({ variant, size, className }))}>
            {icon}
          </div>
        </div>
      </div>

      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContentNoClose.displayName = DialogPrimitive.Content.displayName;

const DialogContentVisualize = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    icon?: React.ReactElement;
  } & VariantProps<typeof iconVariants>
>(({ className, children, icon, variant, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 block w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-2 border bg-background py-2 px-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-between">
        <div
          className={cn(
            iconVariants({ variantBackground: variant, size, className })
          )}
        >
          <div className={cn(iconVariants({ variant, size, className }))}>
            {icon}
          </div>
        </div>

        <DialogPrimitive.Close className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X size={18} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContentVisualize.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-[1rem] text-muted-foreground text-balance', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentNoClose,
  DialogContentVisualize,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
