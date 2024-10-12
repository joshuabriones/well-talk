import React from "react";

const AccountIcon = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_503_7007)">
        <path
          d="M9 0C6.753 2.24625 3.3855 3 0.75 3C0.75 9.43725 4.55025 15.0728 9 18C13.449 15.0728 17.25 9.43725 17.25 3C14.6137 3 11.2455 2.24625 9 0ZM9 12C8.58525 12 8.25 11.664 8.25 11.25C8.25 10.836 8.58525 10.5 9 10.5C9.41475 10.5 9.75 10.836 9.75 11.25C9.75 11.664 9.41475 12 9 12ZM9.75 9.75H8.25V5.25H9.75V9.75Z"
          className="group-hover:fill-white fill-navlight dark:fill-navgray"
        />
      </g>
      <defs>
        <clipPath id="clip0_503_7007">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AccountIcon;
