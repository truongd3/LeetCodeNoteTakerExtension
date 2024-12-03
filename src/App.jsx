import React, { useEffect, useState } from "react";
import "./App.css";
import ButtonGenerateNote from "./components/ButtonGenerateNote";
import { generateNote } from "./helper/geminiprompt";
import HtmlConvert from "./toDocs/htmlConvert.jsx";


function App() {
  const [tab, setTab] = useState(null);
  const [content, setContent] = useState({ title: null, finalHTML: null });

  useEffect(() => {
    const fetchTab = async () => {
      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setTab(activeTab);
    };
    fetchTab();
  }, []);

  const handleGenerateNote = async () => {
    const generatedNote = await generateNote(tab);
    setContent(generatedNote);
  };

  return (
    <div className="App">
      <h1>LeetCode Note Taker</h1>
      <ButtonGenerateNote
        onClick={handleGenerateNote}
        buttonText="Generate Note"
      />
      {content.finalHTML && (<div><HtmlConvert htmlContent={content.finalHTML} title={content.title}/></div>)}
    </div>
  );
}

export default App;
