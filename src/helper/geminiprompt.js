import getWebpageContent from "./getWebpageContent.js";

function divideIntoChunks(content, maxChunkSize = 4096) {
    const chunks = [];
    while (content.length > 0) {
        chunks.push(content.slice(0, maxChunkSize));
        content = content.slice(maxChunkSize);
    }
    return chunks;
}

async function analyzeAndSummarizeChunk(chunk) {
    const prompt = `
    Generate lecture notes from the following content in a structured HTML format. 
    Use proper semantic HTML tags, including headings, paragraphs, and code blocks where pseudocode exists.
    Don't include any !DOCTYPE tag, html tags, CSS syntax, styling formats, HTML comments, class, or id.
    Generate note that is as neat as possible.
    Follow strictly this structure:
    <div>
        <section>
            <h2>Section Name 1</h2>
            <p>Brief summary of the section.</p>
            <pre><code>Include any pseudocode exactly as it appears, if present. Leave empty if no pseudocode exists.</code></pre>
        </section>
        <section>
            <h2>Section Name 2</h2>
            <p>Brief summary of the section.</p>
            <pre><code>Include any pseudocode exactly as it appears, if present. Leave empty if no pseudocode exists.</code></pre>
        </section>
        ...
    </div>

    Content retrieved from webpage:
    ${chunk}
    `;

    const session = await ai.languageModel.create({
        systemPrompt: "You are an assistant specialized in generating LeetCode lecture notes.",
    });

    try {
        const result = await session.prompt(prompt);
        return result.replace(/^```html\s*/i, '').replace(/```$/i, '').trim();
    } catch (error) {
        console.error("Error in analyzeChunkWithPromptAPI:", error);
        return [];
    } finally {
        session.destroy();
    }
}

function combineSectionsIntoHTML(sectionsArray, title) {
    const sections = sectionsArray.join("\n");
    return `
        <h1>${title}</h1>
        ${sections}
`;
}

export async function generateNote(tab, maxChunkSize = 4000) {
    try {
        const content = await getWebpageContent(tab);
        console.log("Title:", content.title);
        console.log("HTML code:", content.html);

        const chunks = divideIntoChunks(content.content, maxChunkSize);
        let allSections = [];
        for (const chunk of chunks) {
            const sectionHTML = await analyzeAndSummarizeChunk(chunk);

            if (sectionHTML && typeof sectionHTML === "string") {
                allSections.push(sectionHTML.trim());
            }
        }
        const finalHTML = combineSectionsIntoHTML(allSections, content.title);
        return { finalHTML: finalHTML, title: content.title };
    } catch (error) {
        console.error("Failed to generate lecture notes:", error);
        return null;
    }
}