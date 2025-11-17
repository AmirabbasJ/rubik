import { type SVGProps } from 'react';

export function ResetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Huge Icons by Hugeicons - undefined */}
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M12 21A9 9 0 1 0 4.204 7.5" />
        <path d="M3 3v1.278c0 2.192 0 3.288.707 3.887c.708.6 1.789.42 3.95.059L9 8" />
      </g>
    </svg>
  );
}
