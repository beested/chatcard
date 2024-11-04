import { cn } from '@/lib/utils';
import * as React from 'react';

export interface TypographyProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

const TypographyLarge = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-lg font-semibold', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TypographyLarge.displayName = 'TypographyLarge';

const TypographyLead = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-xl text-muted-foreground', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
TypographyLead.displayName = 'TypographyLead';

const TypographyMuted = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
TypographyMuted.displayName = 'TypographyMuted';

const TypographySmall = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <small
        ref={ref}
        className={cn(
          'text-sm text-pretty font-medium leading-none',
          className
        )}
        {...props}
      >
        {children}
      </small>
    );
  }
);
TypographySmall.displayName = 'TypographySmall';

const TypographyH1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
TypographyH1.displayName = 'TypographyH1';

const TypographyH2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
TypographyH2.displayName = 'TypographyH2';

const TypographyH3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
TypographyH3.displayName = 'TypographyH3';

const TypographyH4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </h4>
    );
  }
);
TypographyH4.displayName = 'TypographyH4';

const TypographyH5 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn(
          'scroll-m-20 text-[16px] py-1 font-medium tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </h5>
    );
  }
);
TypographyH5.displayName = 'TypographyH5';

const TypographyP = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('leading-2 ', className)} {...props}>
        {children}
      </p>
    );
  }
);
TypographyP.displayName = 'TypographyP';

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyLarge,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
};
