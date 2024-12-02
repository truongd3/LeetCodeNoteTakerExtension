import getWebpageContent from "./getWebpageContent.js";

// divide the input into smaller chunks
function divideIntoChunks(content, maxChunkSize = 4096) {
    const chunks = [];
    while (content.length > 0) {
        chunks.push(content.slice(0, maxChunkSize));
        content = content.slice(maxChunkSize);
    }
    return chunks;
}

// generate notes for each chunk
async function analyzeAndSummarizeChunk(chunk) {
    const prompt = `
    Generate lecture notes from the following content in a structured HTML format. 
    Use proper semantic HTML tags, including headings, paragraphs, and code blocks where pseudocode exists. 
    Follow this structure:
    <div>
        <section>
            <h2>Section Name 1</h2>
            <p>Brief summary or content of the section.</p>
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
        systemPrompt: "You are an assistant specialized in generating lecture notes.",
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

// helper function to combine all the html chunks to one whole html code for the lecture
function combineSectionsIntoHTML(sectionsArray) {
    const sections = sectionsArray.join("\n");

    return sections;
}

// generate note for the whole lecture
export async function generateNote(tab, maxChunkSize = 4096) {
    try {
        const content = await getWebpageContent(tab); // get the content

        // divide into smaller chunk
        const chunks = divideIntoChunks(content.content, maxChunkSize);

        let allSections = [];
        // iterate through each chunk and add to the section array
        for (const chunk of chunks) {
            const sectionHTML = await analyzeAndSummarizeChunk(chunk);

            if (sectionHTML && typeof sectionHTML === "string") {
                allSections.push(sectionHTML.trim());
            }
        }
        // combine all the html small parts into a whole html for the lecture
        const finalHTML = combineSectionsIntoHTML(allSections);

        console.log("Generated HTML:", finalHTML);
        return finalHTML;
    } catch (error) {
        console.error("Failed to generate lecture notes:", error);
        return null;
    }
}

