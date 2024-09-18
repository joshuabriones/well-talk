const HollowButton = ({ disabled, children, onClick }) => {
  return (
    <button
      className="w-full bg-white border-2 border-gray text-sm font-Merriweather text-black font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default HollowButton;
