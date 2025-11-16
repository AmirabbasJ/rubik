import type { SVGProps } from 'react';

export function PaletteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      {/* Icon from Streamline by Streamline - https://creativecommons.org/licenses/by/4.0/ */}
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 13a4 4 0 1 0 0-8a4 4 0 0 0 0 8" />
        <path d="M9.5 13a4 4 0 1 0 0-8a4 4 0 0 0 0 8" />
        <path d="M7 9a4 4 0 1 0 0-8a4 4 0 0 0 0 8" />
      </g>
    </svg>
  );
}
