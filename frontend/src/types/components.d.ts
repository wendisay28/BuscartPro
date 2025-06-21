declare module '@/components/ui/badge' {
  import { ComponentType, HTMLAttributes } from 'react';
  
  interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
  
  const Badge: ComponentType<BadgeProps>;
  export default Badge;
}

declare module '@/components/ui/button' {
  import { ComponentType, ButtonHTMLAttributes } from 'react';
  
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }
  
  const Button: ComponentType<ButtonProps>;
  export default Button;
}
