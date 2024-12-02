import { openGoogleDoc } from "./helper/openTab.js";

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

async function FetchDocs(requests) {
  const token = await getAuthToken();
  console.log(token);
  const fetch_url = `https://docs.googleapis.com/v1/documents`;

  let fetch_options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Example of a generated Docs",
    }),
  };

  fetch(fetch_url, fetch_options)
    .then((res) => res.json())
    .then((res) => {
      const documentID = res.documentId;

      let fetch_url = `https://docs.googleapis.com/v1/documents/${documentID}:batchUpdate`;

      let fetch_options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: requests,
        }),
      };

      fetch(fetch_url, fetch_options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          openGoogleDoc(res.documentId);
        });
    });
}

export default FetchDocs;
