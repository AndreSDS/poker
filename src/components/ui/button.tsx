import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'icon'
}

const variants = {
  default: 'bg-[#19372d] text-[#f6f8f1] hover:bg-[#31543b]',
  outline: 'border border-[#bfcabb] bg-transparent text-[#426344] hover:bg-[#ecf2e3]',
  ghost: 'border border-[#d8ddd4] bg-transparent text-[#344b3d] hover:bg-[#ecf2e3]',
}

export function Button({ className, variant = 'default', size = 'default', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm font-mono text-[9px] tracking-[.055em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71983d] disabled:pointer-events-none disabled:opacity-60',
        size === 'icon' ? 'size-[34px] rounded-full' : 'min-h-[38px] px-3 py-2.5',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
