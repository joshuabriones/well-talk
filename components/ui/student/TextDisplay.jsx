const TextDisplay = ({ label, value }) => {
	return (
		<div>
			<div className="py-2.5 text-xl font-Jaldi ">{label}</div>
			<input
				className="h-14 w-full text-lg font-Jaldi px-4 py-2 border border-gray-200 drop-shadow-md outline-none bg-white rounded-lg"
				type="text"
				value={value}
				readOnly
			/>
		</div>
	);
};

export default TextDisplay;
