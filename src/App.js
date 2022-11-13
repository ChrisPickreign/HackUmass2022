import React, { useState } from "react";
import TypewriterComponent from "typewriter-effect";
import "./App.css";


function App() {
  const data = require("./words_dictionary.json");
  let wordArr = Object.keys(data);
  let easyWords = wordArr.filter((x) => x.length <= 5);
  let mediumWords = wordArr.filter((x) => x.length <= 8);
  let hardWords = wordArr.filter((x) => x.length >= 10);
  let inputArr = new Array(50).fill("");
  let pause = 1000;
  let ezWords = selectWords(easyWords);
  let words = populateArray(ezWords);
  const [tempString, setTempString] = useState(arrToString(ezWords));
  const [index, setIndex] = useState(0);

  function selectWords(wordArr) {
    let returnArr = [];
    let indTracker = new Set();
    while (returnArr.length < 50) {
      let indVal = Math.floor(Math.random() * wordArr.length);
      if (!indTracker.has(indVal)) {
        returnArr.push(wordArr[indVal]);
      }
      indTracker.add(indVal);
    }
    return returnArr;
  }

  function populateArray(arr) {
    return arr.map(wordObj);
  }

  function wordObj(x) {
    return { word: x, isCorrect: false, k: 0 };
  }

  function handleKeyPress(e) {
    let key = e.key;
    if (key === "Enter") {
      return;
    }
    let obj = words[index];
    let corKey = obj.word.charAt(obj.k);
    if (key === " " && obj.k >= 0) {
      document.getElementById("form1").reset();
      if (obj.k === 0) {
        return;
      }
      if (
        valUntilK(obj.k, index) &&
        inputArr[index].length === words[index].word
      ) {
        // if true, whole word has been completed correctly
      } else {
      }
      setIndex(index + 1);
      return;
    }
    inputArr[index] = inputArr[index].concat(key);
    console.log(key);
    console.log(valUntilK(obj.k, index));
    if (valUntilK(obj.k, index)) {
      // if true, word up until this point is correct
    } else {

    }
    console.log("keyPress: " + index);
    console.log(inputArr);
    obj.k += 1;
  }

  function handleKeyDown(e) {
    let obj = words[index];
    if (e.key === "Backspace" && obj.k > 0) {
      --obj.k;
      inputArr[index] = inputArr[index].slice(0, -1);
      if (valUntilK(obj.k, index)) {
        // if true, word up until this point is correct
      } else {
      }
      console.log("keyDown: " + index);

      console.log(inputArr);
    }
  }

  function arrToString(arr) {
    return arr.join(" ");
  }

  function valUntilK(k, index) {
    let returnVal = true;
    for (let i = 0; i <= k; ++i) {
      if (inputArr[index].charAt(i) !== words[index].word.charAt(i)) {
        returnVal = false;
      }
    }
    return returnVal;
  }

  function resetValues() {
    let inputArr = new Array(50).fill("");
    let ezWords = selectWords(easyWords);
    let words = populateArray(ezWords);
    setTempString(arrToString(ezWords));
    setIndex(0);
    document.getElementById("form1").reset();
  }

  return (
    <div>
      <h1><TypewriterComponent
        onInit={(typewriter) =>
          typewriter.typeString('funkytype').start().pauseFor(pause).deleteAll()
            .typeString("finkytpye").start().pauseFor(pause).deleteAll()
            .typeString('flimsytype').start().pauseFor(pause).deleteAll()
            .typeString('flimdtype').start().pauseFor(pause).deleteAll()
            .typeString('flankytype').start().pauseFor(pause).deleteAll()
            .typeString('flirtytype').start().pauseFor(pause).deleteAll()
            .typeString('fliarsytype').start().pauseFor(pause).deleteAll()
            .typeString('flaetytype').start().pauseFor(pause).deleteAll()
            .typeString('flintytype').start().pauseFor(pause).deleteAll()
            .typeString('flype').start().pauseFor(pause).deleteAll()
            .typeString('funkytype').start()
        }
      />
      </h1>
      <div>
        <p>{tempString}</p>
        {/* <p>{index}</p> */}
        <form id="form1">
          <input
            className="text-box"
            type="text"
            onKeyPress={(e) => handleKeyPress(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            autoFocus
          ></input>
        </form>
      </div>
      <div>
        <p className="counter">{"" + index + "/" + 50}</p>
      </div>
      <div>
        <p className="acc-wpm">{"acc: " + " | " + "   " + "wpm: "}</p>
      </div>
      <div>
        <button className="restart_btn"
          onClick={(e) => resetValues()}>
          restart
        </button>
      </div>
    </div>
  );
}

export default App;
