function CodeEditor({ code, onChange, language }) {
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.target;
      const newValue = value.substring(0, selectionStart) + "  " + value.substring(selectionEnd);
      onChange(newValue);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
      });
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--secondary)]">
      <div className="bg-[var(--text)] text-white text-xs px-4 py-2 flex justify-between items-center">
        <span>{language}</span>
        <span className="text-gray-400">Editor</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="w-full h-80 md:h-96 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 resize-none focus:outline-none"
        style={{ tabSize: 2 }}
      />
    </div>
  );
}

export default CodeEditor;