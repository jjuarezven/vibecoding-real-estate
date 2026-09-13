import React from "react";

interface FlagIconProps {
  country: string; // "en" | "es" | "fr" | "gb"
  className?: string;
}

export default function FlagIcon({ country, className = "w-5 h-3.5" }: FlagIconProps) {
  const c = country.toLowerCase();

  switch (c) {
    case "en":
    case "gb":
    case "uk":
      return (
        <svg
          className={`${className} rounded-[2px] shadow-xs inline-block overflow-hidden flex-shrink-0 border border-black/10`}
          viewBox="0 0 60 40"
          aria-hidden="true"
        >
          {/* Blue background */}
          <rect width="60" height="40" fill="#012169" />
          {/* White diagonals */}
          <line x1="0" y1="0" x2="60" y2="40" stroke="#FFFFFF" strokeWidth="7" />
          <line x1="60" y1="0" x2="0" y2="40" stroke="#FFFFFF" strokeWidth="7" />
          {/* Red diagonals */}
          <line x1="0" y1="0" x2="60" y2="40" stroke="#C8102E" strokeWidth="3.5" />
          <line x1="60" y1="0" x2="0" y2="40" stroke="#C8102E" strokeWidth="3.5" />
          {/* White cross */}
          <path d="M30,0 v40 M0,20 h60" stroke="#FFFFFF" strokeWidth="11" />
          {/* Red cross */}
          <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="6.5" />
        </svg>
      );

    case "es":
      return (
        <svg
          className={`${className} rounded-[2px] shadow-xs inline-block overflow-hidden flex-shrink-0 border border-black/10`}
          viewBox="0 0 60 40"
          aria-hidden="true"
        >
          {/* Spanish Flag: Red - Yellow - Red (1:2:1) */}
          <rect width="60" height="10" fill="#AA151B" />
          <rect y="10" width="60" height="20" fill="#F1BF00" />
          <rect y="30" width="60" height="10" fill="#AA151B" />
          {/* Simplified Crown / Shield Emblem */}
          <g transform="translate(14, 20)">
            <rect x="-4" y="-5" width="8" height="10" rx="1.5" fill="#AA151B" stroke="#900" strokeWidth="0.5" />
            <circle cx="0" cy="-6.5" r="2" fill="#F1BF00" />
            <rect x="-2" y="-3" width="4" height="6" fill="#F1BF00" />
          </g>
        </svg>
      );

    case "fr":
      return (
        <svg
          className={`${className} rounded-[2px] shadow-xs inline-block overflow-hidden flex-shrink-0 border border-black/10`}
          viewBox="0 0 60 40"
          aria-hidden="true"
        >
          {/* French Tricolour: Blue - White - Red */}
          <rect width="20" height="40" fill="#002654" />
          <rect x="20" width="20" height="40" fill="#FFFFFF" />
          <rect x="40" width="20" height="40" fill="#CE1126" />
        </svg>
      );

    default:
      return null;
  }
}
