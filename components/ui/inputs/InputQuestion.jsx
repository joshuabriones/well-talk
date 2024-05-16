import TextAreaInput from "./TextAreaInput";

const QuestionInput = ({ question, setQuestion }) => {
	return (
		<div className="w-full mb-6">
			<TextAreaInput
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				type="text"
				placeholder={"Type your question here"}
			/>
		</div>
	);
};

export default QuestionInput;
