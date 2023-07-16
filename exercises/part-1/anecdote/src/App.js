import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const initialVotes = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(initialVotes);
  console.log(vote, "state");

  const generateRandom = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    //console.log(randomNum, "she");
    setSelected(randomNum);
  };

  const handleVote = () => {
    const newVote = [...vote];
    newVote[selected] += 1;
    setVote(newVote);
  };

  const maxVoteIndex = vote.indexOf(Math.max(...vote));

  return (
    <div>
      {anecdotes[selected]}
      <div>has{vote[selected]}votes</div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={generateRandom}>next anecdote</button>
      </div>
      <h2>Anecdote with the most vote</h2>
      <div>{anecdotes[maxVoteIndex]}</div>
      <div>has {vote[maxVoteIndex]} votes</div>
    </div>
  );
};

export default App;
