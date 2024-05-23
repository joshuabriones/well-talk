import TextInput from "@/components/ui/inputs/TextInput";

const ShortDecriptionInput = ({ shortDescription, setShortDescription }) => {
	return (
		<div className="w-full">
			<TextInput
				label="Short Description"
				value={shortDescription}
				onChange={(e) => setShortDescription(e.target.value)}
				type="textfield"
			/>
		</div>
	);
};

export default ShortDecriptionInput;
