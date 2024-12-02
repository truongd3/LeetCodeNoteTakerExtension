import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import processInlineStyleRanges from "./processInlineStyle";
import styleObject from "./styleObject";
import FetchDocs from "./fetchDocs";

function HtmlConvert({ htmlContent }) {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const processHtmlContent = async () => {
      if (htmlContent) {
        const html = `<html>
        <head>
          <title>Introduction to Two Pointers in Array and String Problems</title>
        </head>
        <body>
          <h1>Introduction to Two Pointers in Array and String Problems</h1>
          <section>
            <h2>What are Two Pointers?</h2>
            <p>Two pointers are a fundamental technique in algorithms, especially when dealing with arrays and strings. They involve having two integer variables, usually named <code>i</code> and <code>j</code>, or <code>left</code> and <code>right</code>, that move along an iterable (e.g., an array or a string) simultaneously. This allows us to efficiently traverse the data and compare elements.</p>
      
            <h3>Example: Finding a Pair of Numbers in a Sorted Array that Sum to a Target</h3>
            <p>
              Given an array of unique integers <code>nums</code> and a target integer <code>target</code>, return <code>true</code> if there exists a pair of numbers in the array that sum to <code>target</code>, and <code>false</code> otherwise.
            </p>
      
            <pre><code>
            function findPairSum(nums, target) {
                let left = 0;
                let right = nums.length - 1;
      
                while (left < right) {
                    if (nums[left] + nums[right] === target) {
                        return true;
                    } else if (nums[left] + nums[right] < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
      
                return false;
            }
            </code></pre>
      
            <h3>Example: Determining if a String is a Palindrome</h3>
            <p>
              Given a string <code>s</code>, return <code>true</code> if it is a palindrome, <code>false</code> otherwise. A palindrome is a string that reads the same forward as backward. For example: <code>"abcdcba"</code> or <code>"racecar"</code>
            </p>
      
            <pre><code>
            function isPalindrome(s) {
                let left = 0;
                let right = s.length - 1;
      
                while (left < right) {
                    if (s[left] !== s[right]) {
                        return false;
                    }
                    left++;
                    right--;
                }
      
                return true;
            }
            </code></pre>
      
            <h3>Advantages of Two Pointers</h3>
            <ul>
              <li><strong>Linear Time Complexity (O(n))</strong>: The two pointers move towards each other, and the number of iterations is bounded by the size of the input. This is often the best possible time complexity for certain problems.</li>
              <li><strong>Constant Space Complexity (O(1))</strong>: The algorithm uses only a constant number of variables, regardless of the input size.</li>
            </ul>
          </section>
      
          <footer>
            <p>This lecture provides a basic introduction to the two pointers technique in algorithms. Two pointers is a versatile tool with many applications, and it's important to understand its underlying principles and how it can be used effectively to solve problems efficiently.</p>
          </footer>
        </body>
      </html>`;
        const blocksFromHTML = htmlToDraft(html);
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

              const formattedText = text.endsWith('\n') ? text : `${text}\n`;

              // Add insertText request
              newRequests.push({
                "insertText": {
                  "text": formattedText,
                  "location": { "index": localIndex },
                },
              });

              if (!styleObject[type]) {
                console.log(`This style: ${type} is not found in styleObject.`);
                
                if (type === "unordered-list-item") {
                    newRequests.push({
                        createParagraphBullets: {
                            range: {
                              "startIndex": localIndex,
                              "endIndex": localIndex + formattedText.length - 1,
                            },
                            bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE',
                        }
                    });
                }
                if (type === "list-item") {
                    newRequests.push({
                        createParagraphBullets: {
                            range: {
                              "startIndex": localIndex,
                              "endIndex": localIndex + formattedText.length - 1,
                            },
                            bulletPreset: 'NUMBERED_DECIMAL_NESTED',
                        }
                    });
                }
              }

              // Add style requests for block type
              if (styleObject[type]) {
                newRequests.push({
                  "updateTextStyle": {
                    "textStyle": styleObject[type],
                    "fields": Object.keys(styleObject[type]).join(','),
                    "range": {
                      "startIndex": localIndex,
                      "endIndex": localIndex + formattedText.length - 1,
                    },
                  },
                });
              }

              // Process inline styles
              const blockStyle = await processInlineStyleRanges(inlineStyleRanges, localIndex);
              if (blockStyle.length > 0) {
                newRequests.push(...blockStyle);
              }

              localIndex += formattedText.length; // Update index
            }

            // After all requests are collected, update the state
            setRequests(newRequests);
          }
        }
      }
    }
    processHtmlContent();
  }, [htmlContent]);

  // Effect to send the requests once they are updated
  useEffect(() => {
    if (requests.length > 0) {
      console.log(requests);
      FetchDocs(requests);
    }
  }, [requests]);

  return (
    <div>
      <h1>HTML to Draft.js Editor</h1>
    </div>
  );
}

export default HtmlConvert;
