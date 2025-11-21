import type { SVGProps } from 'react';

export function CoffeeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      {/* Icon from Streamline by Streamline - https://creativecommons.org/licenses/by/4.0/ */}
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.5 3h-9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m0 0l-1-2.5h-7L2.5 3m9 4l-1 6.5h-7L2.5 7"
      />
    </svg>
  );
}
