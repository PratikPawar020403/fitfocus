
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipToContentProps {
  contentId: string;
  className?: string;
}

const SkipToContent: React.FC<SkipToContentProps> = ({ contentId, className }) => {
  return (
    <a 
      href={`#${contentId}`}
      className={cn(
        "skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded",
        className
      )}
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
