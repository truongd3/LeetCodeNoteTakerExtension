import React, { useEffect, useState } from "react";
import "./App.css";
import ButtonGenerateNote from "./components/ButtonGenerateNote";
import { generateNote } from "./helper/geminiprompt";
import HtmlConvert from "./toDocs/htmlConvert.jsx";
import Spinner from "./components/Spinner.jsx";

function App() {
  const [tab, setTab] = useState(null);
  const [content, setContent] = useState({ title: null, finalHTML: null });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const generatedNote = await generateNote(tab);
    setContent(generatedNote);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>LeetCode<br></br>Note Taker</h1>
      <ButtonGenerateNote
        onClick={handleGenerateNote}
        buttonText="Generate Note"/>
  
      {loading && <Spinner />}
      {content.finalHTML && (<div><HtmlConvert htmlContent={content.finalHTML} title={content.title}/></div>)}
    </div>
  );
}

export default App;
