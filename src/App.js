import React, { useState } from 'react';
// import logo from './logo.svg';
import styles from './App.module.css';

function App() {
  const [pixelsPerUnit, setPixelsPerUnit] = useState(128);
  const [milesPerUnit, setMilesPerUnit] = useState(60);
  const [yCoordinate, setYCoordinate] = useState(0);
  const [xCoordinate, setXCoordiate] = useState(0);
  const [list, setList] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [textArea, setTextArea] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handlePixelsPerUnitChange(event) {
    return setPixelsPerUnit(parseInt(event.target.value));
  }
  function handleMilesPerUnitChange(event) {
    return setMilesPerUnit(parseInt(event.target.value));
  }
  function handleYCoordinateChange(event) {
      return setYCoordinate(parseInt(event.target.value));
  }
  function handleXCoordinateChange(event) {
    return setXCoordiate(parseInt(event.target.value));
  }
  function handleCoordinateClick() {
    let uuid = Math.floor(Math.random() * 100000000000);
    if(typeof xCoordinate === 'number' || typeof yCoordinate === 'number') {
      return (setList(list.concat({id: uuid, x: xCoordinate, y: yCoordinate})), setYCoordinate(0), setXCoordiate(0));
    } else {
      return (setError(true), setErrorMessage('There is a coordinate type error'));
    }  
  }
  function pixelsPerMile() {
    return pixelsPerUnit/milesPerUnit;
  }
  function pythagorean(pointOne, pointTwo) {
    return Math.sqrt((Math.pow(pointTwo.y-pointOne.y,2)) + (Math.pow(pointTwo.x-pointOne.x, 2)));
  }
  function calculateTotalDistance(list) {
    let totalDistance = 0;
    for(let i = 1; i <= list.length-1; i++ ) {
      totalDistance = totalDistance + (pythagorean(list[i], list[i-1])/pixelsPerMile(pixelsPerUnit, milesPerUnit));
    }
    return totalDistance;
  }
  function handleCalculateTotalDistance(event) {
    return (setTotalDistance(calculateTotalDistance(list)));
  }
  function handleReset() {
    return (setList([]), setTotalDistance(0), setXCoordiate(0), setYCoordinate(0));
  }
  function handleTextAreaChange(event) {
    return (setTextArea(event.target.value));
  }
  function traverseCoordinateString() {
    let text = textArea;
    let splitText = text.split(' ');
    let textList = [];
    for(let i = 0; i < splitText.length; i++) {
      let texts = splitText[i].split(',');
      let coordinates = {
        id: Math.floor(Math.random() * 100000000000),
        x: parseInt(texts[1]),
        y: parseInt(texts[0]),
      }
      if(coordinates.x && coordinates.y) {
        textList = textList.concat(coordinates);
      }
    }
    return setList(list.concat(textList));
  }
  return (
    <div className={styles.App}>
      <h1>Step One</h1>
      <div className={styles.UnitContainer}>
        <div className={styles.UnitItem}>
          <p>Pixels Per Unit</p>
          <input type='number' value={pixelsPerUnit ? pixelsPerUnit : ''} onChange={handlePixelsPerUnitChange} />
        </div>
        <div className={styles.UnitItem}>
          <p>Miles Per Unit</p>
          <input type='number' value={milesPerUnit ? milesPerUnit : ''} onChange={handleMilesPerUnitChange} />
        </div>
      </div>
      <ul className={styles.CoordinateContainer}>
        {list.map(el => (
          <li key={el.id}>{el.y + "," + el.x}</li>
        ))}  
      </ul>
      <div className={styles.CoordinateEntryContainer}>
        <div className={styles.CoordinateEntry}>
          <label className={styles.CoordinateLabel}>Y Coordinate:</label>
          <input type='number' onChange={handleYCoordinateChange} value={yCoordinate ? yCoordinate : ''} />
        </div>
        <div className={styles.CoordinateEntry}>
          <label className={styles.CoordinateLabel}>X Coordinate:</label>
          <input type='number' onChange={handleXCoordinateChange} value={xCoordinate ? xCoordinate : ''} />
        </div>
      </div>

        <button className={styles.Button_Submit} onClick={handleCoordinateClick}>Submit Coordinate</button>
      <div>
        <button className={styles.Button_Reset} onClick={handleReset} >Reset</button>
        <button className={styles.Button_Submit} onClick={handleCalculateTotalDistance}>Calculate Distance</button>
        <p>{Math.round(totalDistance)} Miles</p>
      </div>
      <div>
        <textarea onChange={handleTextAreaChange} value={textArea}>
        </textarea>
      </div>
      <button className={styles.Button_Submit} onClick={traverseCoordinateString}>Submit Mass Corrdinates</button>
    </div>
  );
}

export default App;
