import React from "react";
import TypewriterComponent from "typewriter-effect";


function App() {
  const data = require("./words_dictionary.json");
  let wordArr = Object.keys(data);
  let easyWords = wordArr.filter(x => x.length <= 5);
  let mediumWords = wordArr.filter(x => x.length <= 8)
  let hardWords = wordArr.filter(x => x.length >= 10);

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

  let index = 0;

  function handleKeyPress(e) {
    let key = e.key;
    let corKey = tempString.charAt(index);
    if (key === " " && corKey !== " ") {
      return;
    }
    console.log(key);
    console.log(corKey === key);
    console.log("keyPress: " + index);
    index = index+1;
  }

  function handleKeyDown(e) {
    if (e.key === 'Backspace' && index > 0) {
      index = index-1;
      console.log("keyDown: " + index)
    }
  }

  function arrToString(arr) {
    return arr.join(" ");
  }

  let tempString = arrToString(selectWords(easyWords));

  return (
    <div>
      <h1><TypewriterComponent
        onInit={(typewriter) =>
          typewriter.typeString("funkytype").start()
        }
      />
      </h1>
      <p>{tempString}</p>
      <p>{"" + index + "/" + 50}</p>
      <input type="text" onKeyPress={(e) => handleKeyPress(e)} onKeyDown={(e) => handleKeyDown(e)}/>
    </div>
  )
}

export default App;
