const FullButton = ({ disabled, children, onClick }) => {
	return (
	  <button
		className="w-full bg-gray border-2 font-Merriweather border-gray text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
		onClick={onClick}
		disabled={disabled}
	  >
		{children}
	  </button>
	);
  };

export default FullButton;
