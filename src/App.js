import React from "react";
import TypewriterComponent from "typewriter-effect";


function App() {
  const data = require("./words_dictionary.json");
  let wordArr = Object.keys(data);
  let easyWords = wordArr.filter(x => x.length<=5);
  let mediumWords = wordArr.filter(x => x.length<=8)
  let hardWords = wordArr.filter(x => x.length>=10);
  
  function selectWords(wordArr){
      let returnArr =[];
      let indTracker = new  Set();
      while (returnArr.length<50){
          let indVal = Math.floor(Math.random()*wordArr.length);
          if (!indTracker.has(indVal)){
              returnArr.push(wordArr[indVal]);
          }
          indTracker.add(indVal);
      }
      return returnArr;
  }  
  
  function arrToString(arr){
      return arr.join(" ");
  }

  let tempString= arrToString(selectWords(easyWords));

  return (
    <div>
      <p>{tempString}</p>
      <textarea></textarea>
      <TypewriterComponent/>
    </div>
  )
}

export default App;
