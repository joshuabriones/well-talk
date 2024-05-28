const JournalModal = ({
  title,
  entry,
  setTitle,
  setEntry,
  setShowModal,
  handleSaveEntry,
}) => {
  return (
    <div className="modal-box bg-white max-w-4xl flex flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <h3 className="p-5 border-b-2 font-light text-black text-2xl text-center">
        Create new entry
      </h3>
      <input
        type="text"
        placeholder="Journal title..."
        className="input input-bordered input-md w-full max-w-4xl bg-white mt-10"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Share your thoughts..."
        className="textarea textarea-bordered textarea-md w-full max-w-4xl bg-white mt-5"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      ></textarea>

      <div className="mt-10">
        <div className="flex gap-2">
          {/* if there is a button, it will close the modal */}
          <button
            className="btn btn-outline"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="btn" onClick={handleSaveEntry}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
