import { ContentState, convertToRaw, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect, useState } from "react";
import FetchDocs from "./fetchDocs";
import processInlineStyleRanges from "./processInlineStyle";
import styleObject from "./styleObject";

function HtmlConvert({ htmlContent, title }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const processHtmlContent = async () => {
      if (!htmlContent) {
        console.error("No HTML content received!");
        return;
      } else {
        const blocksFromHTML = htmlToDraft(htmlContent);
        if (blocksFromHTML) {
          const { contentBlocks, entityMap } = blocksFromHTML;
          if (contentBlocks) {
            const contentState = ContentState.createFromBlockArray(
              contentBlocks,
              entityMap
            );
            const newEditorState = EditorState.createWithContent(contentState);
            const rawContent = convertToRaw(newEditorState.getCurrentContent());

            const newRequests = [];
            let localIndex = 1;
            for (const block of rawContent.blocks) {
              const { text, type, inlineStyleRanges } = block;

              const formattedText = text.endsWith("\n") ? text : `${text}\n`;

              newRequests.push({
                insertText: {
                  text: formattedText,
                  location: { index: localIndex },
                },
              });

              if (!styleObject[type]) {
                const bulletPresetValue = type === "unordered-list-item" ? "BULLET_DISC_CIRCLE_SQUARE"
                                          : type === "list-item" ? "NUMBERED_DECIMAL_NESTED"
                                          : null;
                if (bulletPresetValue != null) {
                  newRequests.push({
                    createParagraphBullets: {
                      range: {
                        startIndex: localIndex,
                        endIndex: localIndex + formattedText.length - 1,
                      },
                      bulletPreset: bulletPresetValue,
                    },
                  });
                }
              }
              if (styleObject[type]) {
                newRequests.push({
                  updateTextStyle: {
                    textStyle: styleObject[type],
                    fields: Object.keys(styleObject[type]).join(","),
                    range: {
                      startIndex: localIndex,
                      endIndex: localIndex + formattedText.length - 1,
                    },
                  },
                });
              }

              const blockStyle = await processInlineStyleRanges(
                inlineStyleRanges,
                localIndex
              );
              if (blockStyle.length > 0) {
                newRequests.push(...blockStyle);
              }

              localIndex += formattedText.length;
            }

            setRequests(newRequests);
          }
        }
      }
    };
    processHtmlContent();
  }, [htmlContent]);

  useEffect(() => {
    if (requests.length > 0) {
      FetchDocs(requests, title);
    }
  }, [requests]);

  return (
    <div>
      <p>Generate sucessful!</p>
    </div>
  );
}

export default HtmlConvert;