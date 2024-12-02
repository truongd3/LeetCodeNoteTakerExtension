import styleObject from "./styleObject";

async function processInlineStyleRanges(ranges, index) {
    const styleList = [];

    for (const range of ranges) {
        const { offset, length, style } = range;

        if (!styleObject[style]) {
            console.log(`This style: ${style} is not found in styleObject.`);
            
            if (style === "unordered-list-item") {
                styleList.push({
                    createParagraphBullets: {
                        range: {
                            "startIndex": index + offset,
                            "endIndex": index + offset + length,
                        },
                        bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE',
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
                        bulletPreset: 'NUMBERED_DECIMAL_NESTED',
                    }
                });
            }
        }
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
    }

    return styleList;
}

export default processInlineStyleRanges;
