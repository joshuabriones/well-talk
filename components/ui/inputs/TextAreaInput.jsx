
function TextAreaInput({ value, onChange, placeholder = "Enter your message", label = "Message", id }) {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
      >
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="peer border-none bg-white placeholder-transparent focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full h-32 resize-none"
          placeholder={placeholder}
          required
        />
        <span className={`pointer-events-none absolute top-8 start-2.5 bg-white p-1 -translate-y-1/2 text-xs transition-all ${value ? 'top-0 text-xs' : 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'}`}>
          {label}
        </span>
      </label>
    </div>
  );
}

export default TextAreaInput;
