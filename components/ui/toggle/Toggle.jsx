import "@/css/toggle.css";
import { useState } from "react";

const Toggle = () => {
	const [isPublic, setIsPublic] = useState(false);

	const handlePubJournal = () => {
		setIsPublic((prev) => !prev);
	};

	console.log("isPublic: ", isPublic);

	return (
		<div className="dark_mode">
			<input
				className="dark_mode_input"
				type="checkbox"
				id="darkmode-toggle"
				checked={isPublic}
				onChange={handlePubJournal}
			/>
			<label className="dark_mode_label" for="darkmode-toggle"></label>
		</div>
	);
};

export default Toggle;
