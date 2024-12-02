import styleObject from "./styleObject";

async function processInlineStyleRanges(ranges, index) {
    const styleList = [];

    for (const range of ranges) {
        const { offset, length, style } = range;

        // Debugging: Check if the style is valid
        if (!styleObject[style]) {
            console.log(`This style: ${style} is not found in styleObject.`);
            
            // Optional handling for missing styles can go here
            // You may want to handle special cases like unordered-list-item or list-item
            // Example handling (uncomment if needed):
            /*
            if (style === "unordered-list-item") {
                styleList.push({
                    createParagraphBullets: {
                        range: {
                            "startIndex": index + offset,
                            "endIndex": index + offset + length,
                        },
                        bulletPreset: 'DISC',
                    }
                });
            }
            if (style === "list-item") {
                styleList.push({
                    createParagraphBullets: {
                        range: {
                            "startIndex": index + offset,
                            "endIndex": index + offset + length,
                        },
                        bulletPreset: 'DECIMAL',
                    }
                });
            }
            */
        }

        // Apply the style if it exists in the styleObject
        if (styleObject[style]) {
            console.log(`Applying style: ${style}`);
            console.log(`Length: ${length}`);

            styleList.push({
                "updateTextStyle": {
                    "textStyle": styleObject[style],
                    "fields": Object.keys(styleObject[style]).join(','),
                    "range": {
                        "startIndex": index + offset,
                        "endIndex": index + offset + length,
                    },
                }
            });
        }

        // Update the index to the next position after the current range
    }

    return styleList;
}

export default processInlineStyleRanges;
