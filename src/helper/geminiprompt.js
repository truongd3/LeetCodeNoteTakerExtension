import getWebpageContent from "./getWebpageContent.js";

export async function generateNote(tab) {
    const capabilities = await ai.languageModel.capabilities();
    if (capabilities.available === "no") {
        console.error("Gemini model not available.");
        return;
    }
    const session = await ai.languageModel.create({
        systemPrompt: "You are an assistant specialized in generating lecture notes."
    });
    try {
        const content = await getWebpageContent(tab);

        const prompt = `
        Generate lecture notes from the following content in a structured HTML format. 
        Use proper semantic HTML tags, including headings, paragraphs, and code blocks where pseudocode exists. 
        Follow this structure:
    
        <html>
          <head>
            <title>Descriptive Title</title>
          </head>
          <body>
            <h1>Descriptive Title</h1>
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
            <footer>
              <p>Conclusion summarizing the key points or outcomes.</p>
            </footer>
          </body>
        </html>
    
        Content retrieved from webpage:
        ${content.content}
    `;
        const result = await session.prompt(prompt);
        return result;
    }
    finally {
        session.destroy()
    }
}