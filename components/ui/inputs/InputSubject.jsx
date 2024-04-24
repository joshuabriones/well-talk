import TextInput from "@/components/ui/inputs/TextInput";

const SubjectInput = ({ subject, setSubject }) => {
	return (
		<div className="w-full">
			<TextInput
				value={subject}
				onChange={(e) => setSubject(e.target.value)}
				type="text"
                placeholder={"Subject"}
			/>
		</div>
	);
};

export default SubjectInput;