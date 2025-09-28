import React, { useState } from "react";
// import styled from "styled-components";
import "../App.css";

const Interview = () => {
  const [timesToRoll, setTimesToRoll] = useState(1);
  const [percentage, setPercentage] = useState(0);

  const rollDice = (sides = 6) => {
    return Math.floor(Math.random() * sides) + 1;
  };

  const roll = (rollTimes) => {
    let numOfSeven = 0;

    for (let i = 1; i <= rollTimes; i++) {
      const di1 = rollDice();
      const di2 = rollDice();
      const sum = di1 + di2;

      if (sum === 7) {
        numOfSeven += 1;
      }
    }
    setPercentage((numOfSeven / rollTimes) * 100);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Number of times to roll"
          value={timesToRoll}
          onChange={(e) => setTimesToRoll(e.target.value)}
        ></input>
      </form>
      <button onClick={() => roll(timesToRoll)}>Roll di</button>
      <div>{`${percentage.toFixed(2)} % of times that 7 was rolled`}</div>
      {percentage === 0.0 && <div>No 7 Hit</div>}
    </div>
  );
};

export default Interview;

//input for number of roles
//button to role
//show how many times the number 7 shows up
