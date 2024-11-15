import isLeetCodeLectureURL from '../helper/isLeetCodeLectureURL.js';
import React, { useEffect, useState } from 'react';

function ButtonGenerateNote({ onClick, buttonText = "Generate Note" }) {
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && isLeetCodeLectureURL(tabs[0].url)) {
                setIsEnabled(true); // Enable button if the URL matches
            } else {
                setIsEnabled(false); // Disable button otherwise
            }
        });
    }, []);

    return (
        <button onClick={onClick} className="generate-note-button" disabled={!isEnabled}>
            {buttonText}
        </button>
    );
};

export default ButtonGenerateNote;
