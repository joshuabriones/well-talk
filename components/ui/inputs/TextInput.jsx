function TextInput({
	value,
	onChange,
	placeholder = "Enter your institutional email",
	label = "Institutional Email Address",
	type = "text", // Default type set to "text"
	id,
	readOnly,
	disabled,
}) {
	return (
		<div className="flex flex-col w-full md:px-0">
			<label
				htmlFor={id}
				className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black">
				<input
					type={type}
					id={id}
					value={value}
					onChange={onChange}
					className="peer border-none bg-white placeholder-transparent focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black p-2 sm:p-3"
					placeholder={placeholder}
					readOnly={readOnly}
					disabled={disabled}
					required
				/>
				<span
					className={`pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 transition-all 
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm 
    peer-focus:top-0 dark:bg-black`}
					style={{ fontSize: "11px" }}
				>
					{label}
				</span>
			</label>
		</div>
	);
}

export default TextInput;
