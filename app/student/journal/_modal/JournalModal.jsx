const JournalModal = ({
  title,
  entry,
  setTitle,
  setEntry,
  setShowModal,
  handleSaveEntry,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50"
      role="dialog"
    >
      <div className="relative w-4/12 mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200">
        <div className="flex justify-between items-center bg-maroon p-4 border-b-2 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"
              onClick={() => console.log("Minimize")}
            ></div>
            <div
              className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"
              onClick={() => console.log("Maximize")}
            ></div>
            <div
              className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"
              onClick={() => setShowModal(false)}
            ></div>
          </div>
        </div>
        
        <div className="p-5">
          
          <input
            type="text"
            placeholder="Journal title..."
            className="input input-bordered input-md w-full bg-white mt-10"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Share your thoughts..."
            className="textarea textarea-bordered textarea-md w-full bg-white mt-5"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          ></textarea>

          <div className="mt-10 flex gap-2">
            <button
              className="w-full bg-white border-2 border-maroon text-sm font-Merriweather text-maroon font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="w-full bg-maroon border-2 font-Merriweather border-gray text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
             onClick={handleSaveEntry}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
