import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to merge class names
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Card Component
const Card = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('div', {
    ref: ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  })
))
Card.displayName = "Card"

// CardHeader Component
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('div', {
    ref: ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  })
))
CardHeader.displayName = "CardHeader"

// CardTitle Component
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('h3', {
    ref: ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  })
))
CardTitle.displayName = "CardTitle"

// CardDescription Component
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('p', {
    ref: ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  })
))
CardDescription.displayName = "CardDescription"

// CardContent Component
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('div', {
    ref: ref,
    className: cn("p-6 pt-0", className),
    ...props
  })
))
CardContent.displayName = "CardContent"

// CardFooter Component
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  React.createElement('div', {
    ref: ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  })
))
CardFooter.displayName = "CardFooter"

// Export all components
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
}