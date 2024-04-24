import TextInput from "@/components/ui/inputs/TextInput";

const AuthorInput = ({ author, setAuthor }) => {
	return (
		<div className="w-full">
			<TextInput
				label="Author"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				type="text"
			/>
		</div>
	);
};

export default AuthorInput;
