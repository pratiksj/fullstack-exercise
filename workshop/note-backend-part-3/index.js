const express = require("express");
const app = express();
// var removeDuplicates = function (nums) {
//   let index = 0;

//   while (index < nums.length) {
//     // Find the index of the next occurrence of the current element
//     const nextIndex = nums.indexOf(nums[index], index + 1);

//     // If there is no next occurrence, move on to the next element
//     if (nextIndex === -1) {
//       index++;
//     } else {
//       // If the next occurrence exists, remove it from the array
//       nums.splice(nextIndex, 1);
//     }
//   }
// };

// let nums = [0, 0, 1, 1, 2, 3, 3, 4];
// debugger;
// removeDuplicates(nums);
// console.log(nums, "she"); // Output: [0, 1, 2, 3, 4]

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>hellow world</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server listening on the port${PORT}`);
});
