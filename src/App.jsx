import React, { useState, useEffect } from 'react';
import './App.css'
import ButtonGenerateNote from './components/ButtonGenerateNote';
import getWebpageContent from './helper/getWebpageContent.js';

function App() {
  const [tab, setTab] = useState(null);
  useEffect(() => {
    const fetchTab = async () => {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      setTab(activeTab);
    };
    fetchTab();
  }, []);

  const handleGenerateNote = async () => {
    const content = await getWebpageContent(tab);
    console.log("Title:", content.title);
    console.log("Content:", content.content);
    console.log("HTML code:", content.html);
    console.log("Note generated!");
  };

  return (
    <div className="App">
      <h1>LeetCode Note Taker</h1>
      <ButtonGenerateNote onClick={handleGenerateNote} buttonText="Generate Note" />
    </div>
  )
}

export default App
