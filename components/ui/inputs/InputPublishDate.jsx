import TextInput from "@/components/ui/inputs/TextInput";

const PublishDateInput = ({ publishDate, setPublishDate }) => {
	return (
		<div className="w-full">
			<TextInput
				label="Publish Date"
				value={publishDate}
				onChange={(e) => setPublishDate(e.target.value)}
				type="date"
			/>
		</div>
	);
};

export default PublishDateInput;
