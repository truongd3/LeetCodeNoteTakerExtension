import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from 'html-to-draftjs';
import PromptAPI from './PromptAPI';
import processInlineStyleRanges from './processInlineStyle'
import styleObject from './styleObject';

function HtmlConvert({ htmlContent }) {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const requests = [];
  let currentIndex = 0;

  useEffect(() => {
    if (htmlContent) {
      const html = `<div id="readability-page-1" class="page"><div><div><p><span><span> &nbsp;</span>Insertion in Trie</span><a href="github.com/LeetCode-Feedback/LeetCode-Feedback/issues" target="_blank" rel="noopener noreferrer">Report Issue</a></p></div><div>
      <h1>We have talked about insertion in a BST in another card (<a href="leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/">Introduction to Data Structure - Binary Search Tree</a>).</h1>
      <blockquote>
      <p>Question:</p>
      <p>Do you remember how to insert a new node in a binary search tree? </p>
      </blockquote>
      <p>When we insert a target value into a BST, in each node, we need to decide which child node to go according to the relationship between <code>the value of the node</code> and <code>the target value</code>. Similarly, when we insert a target value into a Trie, we will also decide which path to go depending on <code>the target value</code> we insert.</p>
      <p>To be more specific, if we insert a string <code>S</code> into Trie, we start with the <code>root</code> node. We will choose a child or add a new child node depending on <code>S[0]</code>, the first character in S. Then we go down to the second node and we will make a choice according to <code>S[1]</code>. Then we go down to the third node, so on and so for. Finally, we traverse all characters in S sequentially and reach the end. The end node will be the node which represents the string S.</p>
      <p>Here is an example:</p>
      <center>
      <div><p><img alt="Current" src="blob:leetcode.com/665eacec-41a7-4eb3-8cde-3b2dd9c2529e"></p><div><p>1 / 5</p></div></div>
      </center>
      <p>Let's summarize the strategy using pseudo-code:</p>
      <div><pre><span></span>1. Initialize: cur = root
      2. for each char c in target string S:
      3.      if cur does not have a child c:
      4.          cur.children[c] = new Trie node
      5.      cur = cur.children[c]
      6. cur is the node which represents the string S
      </pre></div>
      
      <p>Usually, you will need to build the trie by yourself. Building a trie is actually to call the insertion function several times. But remember to <code>initialize a root node</code> before you insert the strings.</p></div></div></div>`;
      const blocksFromHTML = htmlToDraft(html);
      if (blocksFromHTML) {
        const { contentBlocks, entityMap } = blocksFromHTML;
        if (contentBlocks) {
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          const newEditorState = EditorState.createWithContent(contentState);
          const rawContent = convertToRaw(newEditorState.getCurrentContent());

          rawContent.blocks.forEach(async (block) => {
            const { text, type, inlineStyleRanges, entityRanges } = block;

            requests.push({
              "insertText": {
                "text": text,
                "location":{
                  "index": currentIndex, 
                },
              }
            }),

            currentIndex += text.length + 1;
            const blockStyle =  await processInlineStyleRanges(inlineStyleRanges, currentIndex - text.length - 1)
            if (blockStyle.length > 0){
              requests.push(
                blockStyle,
              );
            }
          });
          console.log(requests);
        }
      }
    }
  }, [htmlContent]);

  // Handle editor state change
  // const onChange = async (newEditorState) => {
  //   await setEditorState(newEditorState);
  // };

  return (
    <div>
      <h1>HTML to Draft.js Editor</h1>
      {/* <Editor
        editorState={editorState}
        readOnly={true} // Makes the editor read-only
        toolbarHidden={true} // Hides the toolbar
      /> */}
    </div>
  );
}

export default HtmlConvert;
