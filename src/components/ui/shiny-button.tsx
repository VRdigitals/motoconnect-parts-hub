"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ShinyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ShinyButton({ children, onClick, className = "" }: ShinyButtonProps) {
  return (
    <button 
      className={cn("shiny-cta-button group relative", className)} 
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Red animated border & shimmer effect using Tailwind and inline CSS variables for the custom properties */}
      <div className="absolute inset-0 rounded-full border border-gray-200 bg-white p-[1px] transition-all duration-500 group-hover:border-[#ff0000]/50 overflow-hidden">
        <div 
          className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #ff0000 20%, white 40%, #ff0000 60%, transparent 80%)'
          } as React.CSSProperties}
        />
        <div className="absolute inset-[1px] rounded-full bg-white z-[1]" />
      </div>

      <style>{`
        .shiny-cta-button {
          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 1.25rem 2.5rem;
          font-family: "Inter", sans-serif;
          font-size: 1.125rem;
          line-height: 1.2;
          font-weight: 500;
          border-radius: 9999px;
          color: #000000;
          transition: all 800ms cubic-bezier(0.25, 1, 0.5, 1);
          background: white;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.05);
        }

        .shiny-cta-button:active {
          transform: translateY(1px);
        }

        .shiny-cta-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 2px 2px,
            rgba(255, 0, 0, 0.1) 0.5px,
            transparent 0
          );
          background-size: 4px 4px;
          opacity: 0;
          transition: opacity 0.5s;
          z-index: 2;
          pointer-events: none;
        }

        .shiny-cta-button:hover::before {
          opacity: 1;
        }
      `}</style>
    </button>
  )
}
