import React from "react";

export default function Logo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 44C24 44 24 30 24 24C24 14 16 8 6 8C6 8 6 22 16 28C20 30.5 24 32 24 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 24C24 16 30 10 42 10C42 10 43 22 34 27C30 29.2 24 30 24 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
