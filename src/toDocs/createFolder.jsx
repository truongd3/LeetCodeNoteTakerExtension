async function getOrCreateFolder(token, folderName) {

    const query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}`;

    const searchResponse = await fetch(searchUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!searchResponse.ok) {
        throw new Error(`Failed to search folder: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();
    if (searchData.files && searchData.files.length > 0) {
        return searchData.files[0].id; 
    }

    const createFolderUrl = `https://www.googleapis.com/drive/v3/files`;
    const folderMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
    };

    const createResponse = await fetch(createFolderUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(folderMetadata),
    });

    if (!createResponse.ok) {
        throw new Error(`Failed to create folder: ${createResponse.statusText}`);
    }

    const folderData = await createResponse.json();
    return folderData.id; 
}

export default getOrCreateFolder;