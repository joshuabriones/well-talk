import TextInput from "@/components/ui/inputs/TextInput";

const BlogURLInput = ({ blogURL, setBlogURL }) => {
	return (
		<div className="w-full">
			<TextInput
				label="Blog URL"
				value={blogURL}
				onChange={(e) => setBlogURL(e.target.value)}
				type="text"
			/>
		</div>
	);
};

export default BlogURLInput;
