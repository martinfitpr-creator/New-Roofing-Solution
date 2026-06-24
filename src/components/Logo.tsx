import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  textColor?: string;
  iconOnly?: boolean;
}

export default function Logo({
  className = '',
  size = 70,
  textColor = 'text-white',
  iconOnly = false,
}: LogoProps) {
  const isDark = textColor.includes('text-white');
  const subtitleColor = isDark ? '#CBD5E1' : '#757575';

  const svgWidth  = iconOnly ? size * 1.7 : size * 2.4;
  const svgHeight = iconOnly ? size        : size * 1.5;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      id="brand-logo-container"
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 1000 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
        id="roofing-logo-svg"
      >
        <defs>
          {/* Roof gradient: golden-yellow → orange → brick-red, left to right */}
          <linearGradient id="roofGrad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#FFB300" />
            <stop offset="38%"  stopColor="#F57322" />
            <stop offset="100%" stopColor="#C62828" />
          </linearGradient>

          {/* Inner secondary gable gradient: bright yellow → gold */}
          <linearGradient id="innerGrad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#FFE000" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>

          {/* NRS text gradient: bright crimson → deep dark red */}
          <linearGradient id="nrsGrad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#D32F2F" />
            <stop offset="55%"  stopColor="#C62828" />
            <stop offset="100%" stopColor="#7B0000" />
          </linearGradient>

          {/* Clip path so brown tile stripes stay inside roof */}
          <clipPath id="roofClip">
            <path d="M 408,52 L 636,150 L 636,52 L 682,52 L 682,168 L 978,268 L 22,290 Z" />
          </clipPath>
        </defs>

        {/* ═══════════════════════════════════════
            MAIN ROOF FILLED SHAPE
            Path: peak → right slope down to chimney base-left
                  → up chimney left side → across chimney top
                  → down chimney right → continue to right eave
                  → across full eave to far-left tip
                  → (auto-close back up left slope to peak)
        ════════════════════════════════════════ */}
        <path
          d="M 408,52
             L 636,150
             L 636,52
             L 682,52
             L 682,168
             L 978,268
             L 22,290
             Z"
          fill="url(#roofGrad)"
        />

        {/* White eave-edge outline for depth/definition */}
        <path
          d="M 408,52
             L 636,150
             L 636,52
             L 682,52
             L 682,168
             L 978,268
             L 22,290
             Z"
          fill="none"
          stroke="white"
          strokeWidth="9"
          strokeLinejoin="round"
        />

        {/* ═══════════════════════════════════════
            THREE BROWN DIAGONAL TILE STRIPES
            (clipped inside the roof area)
        ════════════════════════════════════════ */}
        <g clipPath="url(#roofClip)">
          {/* Stripe 1 – top */}
          <path d="M 175,148 L 520,215 L 502,234 L 157,167 Z" fill="#7B5A47" />
          {/* Stripe 2 – middle */}
          <path d="M 165,186 L 510,253 L 492,272 L 147,205 Z" fill="#7B5A47" />
          {/* Stripe 3 – bottom */}
          <path d="M 155,224 L 500,291 L 482,310 L 137,243 Z" fill="#7B5A47" />
        </g>

        {/* ═══════════════════════════════════════
            INNER SECONDARY GABLE ACCENT
            A smaller double-eave shape below the main left arm,
            in yellow-orange, creating the layered eave look.
        ════════════════════════════════════════ */}
        {/* Thin left arm of inner gable */}
        <path
          d="M 295,195 L 22,298 L 62,298 L 295,213 Z"
          fill="url(#innerGrad)"
        />
        {/* Wider right body of inner gable */}
        <path
          d="M 295,195 L 62,298 L 452,298 L 295,213 Z"
          fill="url(#innerGrad)"
        />

        {/* ═══════════════════════════════════════
            TEXT – only shown when not iconOnly
        ════════════════════════════════════════ */}
        {!iconOnly && (
          <>
            {/* Large "NRS" bold serif text */}
            <text
              x="500"
              y="502"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontWeight="900"
              fontSize="218"
              fill="url(#nrsGrad)"
              textAnchor="middle"
              letterSpacing="6"
              id="logo-text-nrs"
            >
              NRS
            </text>

            {/* "NEW ROOFING SOLUTIONS" subtitle */}
            <text
              x="500"
              y="588"
              fontFamily="'Inter', Arial, Helvetica, sans-serif"
              fontWeight="400"
              fontSize="46"
              fill={subtitleColor}
              textAnchor="middle"
              letterSpacing="16"
              id="logo-text-subtitle"
            >
              NEW ROOFING SOLUTIONS
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
