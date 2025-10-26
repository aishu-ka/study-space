const PomodoroIcon = ({ size = 64, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tomato stem/leaf */}
      <path
        d="M32 8C32 8 28 6 26 10C24 14 22 12 20 10C18 8 16 12 18 16C20 20 24 18 26 20C28 22 32 20 32 20V8Z"
        fill="var(--color-success)"
        opacity="0.8"
      />

      {/* Main tomato body */}
      <circle
        cx="32"
        cy="36"
        r="22"
        fill="var(--color-primary)"
      />

      {/* Highlight for depth */}
      <ellipse
        cx="26"
        cy="32"
        rx="8"
        ry="10"
        fill="var(--color-primaryHover)"
        opacity="0.4"
      />

      {/* Shadow for depth */}
      <ellipse
        cx="38"
        cy="42"
        rx="6"
        ry="8"
        fill="var(--color-primary)"
        opacity="0.6"
      />
    </svg>
  );
};

export default PomodoroIcon;
