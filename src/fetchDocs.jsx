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
    const fetch_url = `https://docs.googleapis.com/v1/documents`;

    // get current date
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const dateAndTitle = '[' + month + '/' + day + '/' + year + '] ' + title;
    
    let fetch_options = {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        title: dateAndTitle,
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
            "requests": requests,
      }),
    };

    fetch(fetch_url, fetch_options)
      .then((res) => res.json())
      .then((res) => {
      });
    }); 
}

export default FetchDocs;