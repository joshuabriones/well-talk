const Birthdate = ({ value }) => {
	return (
		<div>
			<div className="py-2.5 text-xl font-Jaldi ">Birthdate</div>
			<input
				className="h-14 w-full text-lg font-Jaldi px-4 py-2 border border-gray-200 drop-shadow-md outline-none bg-white rounded-lg"
				type="date"
				value={value}
				readOnly
			/>
		</div>
	);
};

export default Birthdate;
