import TextInput from "@/components/ui/inputs/TextInput";

const TitleInput = ({ title, setTitle }) => {
	return (
		<div className="w-full">
			<TextInput
				label="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				type="text"
			/>
		</div>
	);
};

export default TitleInput;
