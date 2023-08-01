// const express = require("express");
// const app = express();
// app.use(express.json());
var removeDuplicates = function (nums) {
  let index = 0;

  while (index < nums.length) {
    // Find the index of the next occurrence of the current element
    const nextIndex = nums.indexOf(nums[index], index + 1);

    // If there is no next occurrence, move on to the next element
    if (nextIndex === -1) {
      index++;
    } else {
      // If the next occurrence exists, remove it from the array
      nums.splice(nextIndex, 1);
    }
  }
};

let nums = [0, 0, 1, 1];
debugger;
removeDuplicates(nums);
console.log(nums, "she"); // Output: [0, 1, 2, 3, 4]

// const notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// app.get("/", (req, res) => {
//   res.send("<h1>hellow world</h1>");
// });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// app.get("/api/notes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const note = notes.find((note) => note.id === id);
//   if (note) {
//     res.json(note);
//   } else {
//     res.status(404).end();
//   }
// });

// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   console.log(typeof id, "from id");
//   notes = notes.filter((note) => note.id !== id);
//   console.log(notes, "from code");

//   response.status(204).end();
// });

// app.post("/api/notes", (request, response) => {
//   const note = request.body;
//   note.id = notes.length + 1;
//   notes.push(note);
//   response.status(201).json(note);
// });

// const PORT = 3003;
// app.listen(PORT, () => {
//   console.log(`Server listening on the port${PORT}`);
// });
