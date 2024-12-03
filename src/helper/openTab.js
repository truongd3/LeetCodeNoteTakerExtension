function openGoogleDoc(documentID) {
    if (!documentID) {
        console.error("Document ID is required to open the Google Doc.");
        return;
    }

    const googleDocsUrl = `https://docs.google.com/document/d/${documentID}/edit`;

    window.open(googleDocsUrl, "_blank");
}

export default openGoogleDoc;