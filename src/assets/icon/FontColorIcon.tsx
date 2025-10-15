const FontColorIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-baseline-icon lucide-baseline"
    >
      <path d="M4 20h16" style={{ color: color , marginTop: '5px'}}/>
      <path d="m6 16 6-12 6 12"/>
      <path d="M8 12h8" />
    </svg>
  );
};

export default FontColorIcon;
