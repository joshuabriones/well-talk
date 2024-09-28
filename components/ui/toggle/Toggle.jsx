import "@/css/toggle.css";

const Toggle = ({ isPublic, setIsPublic }) => {
  const handlePubJournal = () => {
    setIsPublic((prev) => !prev);
  };

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
