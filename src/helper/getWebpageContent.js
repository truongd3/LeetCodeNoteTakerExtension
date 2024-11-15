import { Readability } from "@mozilla/readability";

async function getWebpageContent(tab) {
    // Use Chrome's executeScript API to retrieve the full HTML content of the page
    const [{ result: content }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.documentElement.outerHTML, // Extract HTML content
    });
    if (!content) {
        throw new Error("Failed to get content from the active tab");
    }

    const doc = new DOMParser().parseFromString(content, "text/html");
    const reader = new Readability(doc);
    const article = reader.parse();
    if (!article) {
        throw new Error("Could not extract readable content from the page");
    }

    return {
        title: article.title,
        content: article.textContent,
        html: article.content
    };
}

export default getWebpageContent;
