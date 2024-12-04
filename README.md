# Project LeetCode Note Taker Extension

## Members
- [Thai Nguyen](https://www.linkedin.com/in/qthainguyen/) 
- [Van Hoang](https://www.linkedin.com/in/zawnh/)
- [Truong Dang](https://www.linkedin.com/in/2dt/)
- [Uyen Nguyen](https://www.linkedin.com/in/uyennguyen2001/)

## Inspiration

LeetCode has long been a cornerstone for improving programming skills, fostering critical thinking, and practicing techincal interviews. However, many students struggle to approach LeetCode organizationally or effectively take notes. To address this challenge, we developed the **LeetCode Note Taker Extension**—a tool designed to simplify the note-taking process and help learners structure their study efforts more efficiently.

Handwriting notes can be time-consuming, and typing them manually often leads to inconsistency and disorganization. To address this demand, we designed our solution to save notes to Google Drive naturally, ensuring both efficiency and structure.

## What it does

The **LeetCode Note Taker Extension** conducts the process of capturing and organizing notes from LeetCode lectures ([Explore](https://leetcode.com/explore/)):

- <ins>Note Generator</ins>: Generate neat notes automatically from LeetCode lectures, including definitions, explanations, examples, and code snippets.
- <ins>Google Docs Integration</ins>: Save notes directly to your Google Docs, in one folder.
- <ins>Customized Formatting</ins>: Convert content into well-structured, readable documents with bullet points, headings, and emphasis where needed.

## How we built it

We built the **LeetCode Note Taker Extension** with a strong emphasis on ease of use, minimalism, and natural thinking process. These goals were achieved with the help of the Prompt API, which played a crucial role in preprocessing raw HTML data.

## Challenges we ran into

- In our team, only one member initially knew how to use Git. It took us a while to learn and collaborate smoothly.
- We struggled to setup Prompt API at first but with teamwork, we were able to integrate it shortly.
- We initially hit the Prompt API's limit due to the lengthy content of most lectures. However, we resolved this by breaking the content into chunks.

## Accomplishments that we're proud of

- Our product is exclusive as of now _(at least to our research)_.
- We created a custom set of styling rules to transform HTML code into professional document formats.

## What we learned

- My team includes 2 college sophomores who experienced collaborative teamwork for the first time. By breaking project into independent tasks, we minimized delays and kept the workflow efficient. Working closely together allowed us to achieve new goals in a short amount of time.
- We also learned how to use Gemini Nano APIs for the first time.

## What is next

Current application focuses on learning from [LeetCode Explore](https://leetcode.com/explore/). In future work, **LeetCode Note Taker Extension** will help students better understand and retain LeetCode problems. 
- By leveraging Write API, we will add comments directly to coding submissions, enabling them to reflect on their thought processes and improve their problem-solving skills. 
- We will transform these problems to Github for future review and practice.

## How to use Extension locally
- Clone repo `git clone https://github.com/truongd3/LeetCodeNoteTakerExtension`.
- Type `npm run build` on terminal. It should create a new (or update) directory named `dist`.
- Open Google Chrome. Click the three-dot icon to the top right then click `Extensions > Manage Extensions`.
- Toggle `Developer mode` to the top right of the popup tab
- Click `Load unpacked` and upload **folder `dist`**. Click OK.
- When you update the code locally, run `npm run build` and re-load the extension. No more re-uploading needed.

## Built with
- JavaScript
- React
- HTML/CSS
- Chrome
- Gemini Nano
- Prompt API
- Google Docs API
- Draft.js