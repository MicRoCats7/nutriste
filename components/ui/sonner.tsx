"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      className="toaster group"
      style={{
        "--normal-bg": "#ffffff",
        "--normal-text": "#000000",
        "--normal-border": "#e5e7eb",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
