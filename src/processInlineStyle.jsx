import PromptAPI from "./PromptAPI";
import styleObject from "./styleObject";

async function processInlineStyleRanges(ranges, index){
    const stylelist = []
    for (const range of ranges){
        const { offset, length, style } = range;
        // await PromptAPI();
        console.log(style);

        if(!styleObject[style]){
        //use gemini to create format for new type
        //add new setting into the style
        // PromptAPI();
        // console.log(1);
        }

        if (styleObject[style]) {
            stylelist.push({
                "updateTextStyle": {
                "textStyle": styleObject[style],
                "fields": Object.keys(styleObject[style]).join(','),
                "range": {
                    "startIndex": index + offset,
                    "endIndex": index+ offset + length,
                },
                }
            });
        }
    }
    console.log("Processed requests:", stylelist);
    return stylelist;
}

export default processInlineStyleRanges;