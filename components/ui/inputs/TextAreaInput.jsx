const TextAreaInput = ({ label, value, onChange, type, placeholder }) => {
	return (
		<div>
			<div className=" text-xl font-Jaldi ">{label}</div>
			<textarea
				className="h-40 w-full text-lg font-Jaldi px-4 py-2 border border-gray-200 drop-shadow-md focus:outline-none focus:border-green-500  bg-white rounded-lg"
				rows={8}
				type={type}
				value={value}
				onChange={onChange}
				required
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TextAreaInput;
