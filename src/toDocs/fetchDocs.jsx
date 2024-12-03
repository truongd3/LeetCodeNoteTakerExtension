import getOrCreateFolder from "./createFolder";
import openGoogleDoc from "../helper/openTab"

async function getAuthToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) {
                reject(`Error fetching token: ${chrome.runtime.lastError.message}`);
                return;
            }
            resolve(token);
        });
    });
}

async function FetchDocs(requests, title) {

  const token = await getAuthToken();
  console.log("oath2 token: ", token);
  
  const folderId = await getOrCreateFolder(token, "LeetCode Notes");

  // get current date
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const dateAndTitle = '[' + year + '/' + month + '/' + day + '] ' + title;

  const createUrl = `https://www.googleapis.com/drive/v3/files`;
  const fileMetadata = {
      name: dateAndTitle,
      mimeType: "application/vnd.google-apps.document",
      parents: [folderId],
  };

  const createResponse = await fetch(createUrl, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(fileMetadata),
  });
  if (!createResponse.ok) {
    throw new Error("Failed to create document");
  }

  const createData = await createResponse.json();
  const documentID = createData.id;
  const fetchUrl = `https://docs.googleapis.com/v1/documents/${documentID}:batchUpdate`;
  const fetchOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
  };

  await fetch(fetchUrl, fetchOptions)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    openGoogleDoc(res.documentId);
  }); 
}

export default FetchDocs;