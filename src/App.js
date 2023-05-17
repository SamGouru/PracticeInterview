import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  let [pageNumber, setPageNumber] = useState(1);
  let [disableNextBtn, setDisableNextBtn] = useState(false);
  let [disablePrevBtn, setDisablePrevBtn] = useState(false);

  async function getPeople() {
    let promise = await axios.get(
      "https://swapi.dev/api/people/?page=" + pageNumber
    );

    if (promise.data.previous === null) {
      setDisablePrevBtn(true);
    } else {
      setDisablePrevBtn(false);
    }
    if (promise.data.next === null) {
      setDisableNextBtn(true);
    } else {
      setDisableNextBtn(false);
    }
    let listOfPeople = promise.data.results;
    let charaterNames = [];
    let characterHeight = [];
    let characterMass = [];
    listOfPeople.forEach((element) => {
      charaterNames.push(element.name);
      characterHeight.push(element.height);
      characterMass.push(element.mass);
    });
    let returnObj = {
      charaterNames: charaterNames,
      characterHeight: characterHeight,
      characterMass: characterMass
    };
    return returnObj;
  }
  useEffect(() => {
    getPeople().then((returnObj) => {
      document.getElementById("names").innerText = returnObj.charaterNames;
      document.getElementById("height").innerText = returnObj.characterHeight;
      document.getElementById("mass").innerText = returnObj.characterMass;
    });
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div id="names"></div>
      <div id="height"></div>
      <div id="mass"></div>
      <button
        id="prev"
        disabled={disablePrevBtn}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        PREV
      </button>
      <button
        id="next"
        disabled={disableNextBtn}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        NEXT
      </button>
    </div>
  );
}
