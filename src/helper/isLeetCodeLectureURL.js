export default function isLeetCodeLectureURL(url) {
    const regex1 = /^https?:\/\/leetcode\.com\/explore\/featured\/card\/[^\/]+\/\d+\/[^\/]+\/\d+\/?$/;
    const regex2 = /^https?:\/\/leetcode\.com\/explore\/learn\/card\/[^\/]+\/\d+\/[^\/]+\/\d+\/?$/;
    return regex1.test(url) || regex2.test(url);
}

// // Test cases
// console.log(isLeetCodeLectureURL("https://leetcode.com/explore/featured/card/some-String-here/123/anotherString/456")); // true
// console.log(isLeetCodeLectureURL("https://leetcode.com/explore/featured/card/someString/123/anotherString/")); // false
// console.log(isLeetCodeLectureURL("https://leetcode.com/explore/featured/card/someString/abc/anotherString/456")); // false
// console.log(isLeetCodeLectureURL("http://leetcode.com/explore/featured/card/someString/123/anotherString/456")); // true

// console.log(isLeetCodeLectureURL("https://leetcode.com/explore/learn/card/binary-search/125/template-i/938/"));
