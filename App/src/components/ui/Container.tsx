import React from 'react';
import { cn } from '../../utils/cn';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl", className)}>
      {children}
    </div>
  );
};

export default Container;