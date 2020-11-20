import React from "react";
import "../../styles/scss/App.css";
import "./SortingVisualizer.css";
import { getMergeAnimations } from "./sortingAlgos.js";
import { bubbleSortAnimations } from "./bubbleSort.js";
import { quickSortAnimations} from "./quickSort.js"
import { render } from "react-dom";
import {Modal,Button,Grid,Row,Col,PageHeader} from 'react-bootstrap';

const ANIMATION_SPEED_MS = 30;
const NUMBER_OF_ARRAY_BARS = 60;
const NormalColor = "turquoise";
const RED = "red";

function mergeSort(arr1) {
  console.log(arr1);
  let speed= arr1.speed;
  let sz= arr1.sizeofArr;

  const animations = getMergeAnimations(arr1, sz);

  //console.log(animations);
  console.log('speed:',ANIMATION_SPEED_MS, speed);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    
    const isColorChange = i % 3 !== 2;

    if (isColorChange) {
      //console.log("isColorChange:", isColorChange, animations[i]);
      const [barOneIdx, barTwoIdx] = animations[i] ;
      const barOneStyle = arrayBars[barOneIdx].style;
      //console.log('ival:',i, animations[i] );
      const barTwoStyle = arrayBars[barTwoIdx].style;
      // checking if it is the first element
      const color = i % 3 === 0 ? RED : NormalColor;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS*(speed));
    } else {
      //console.log("isColorChange else:", isColorChange, animations[i]);
       const [barOneIdx, newHeight] = animations[i];
         if (barOneIdx === -1) {
                    continue;
                }
        const barOneStyle = arrayBars[barOneIdx].style;
        
      setTimeout(() => {
       barOneStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS*(speed));
    }
  }
}



function bubbleSort (arr, speed) {
  const animations = bubbleSortAnimations(arr);
    for (let i = 0; i < animations.length; i++) {
      const CHANGECOLOR = i % 3 !== 1;
      const BARS = document.getElementsByClassName("array-bar");
      if (CHANGECOLOR) {
        const [barOneId, barTwoId] = animations[i];
        const barOneStyles = BARS[barOneId].style;
        const barTwoStyles = BARS[barTwoId].style;
        const col = i % 3 === 0 ? RED : NormalColor;
        setTimeout(() => {
          barOneStyles.backgroundColor = col;
          barTwoStyles.backgroundColor = col;
        }, i * ANIMATION_SPEED_MS*(speed));
      } else {
        const [barOneId, barTwoId] = animations[i];
        const barOneStyles = BARS[barOneId].style;
        const barTwoStyles = BARS[barTwoId].style;
        setTimeout(() => {
          if (barOneId > barTwoId) {
            [barOneStyles.height, barTwoStyles.height] = [
              barTwoStyles.height,
              barOneStyles.height
            ];
          }
        }, i * ANIMATION_SPEED_MS*(speed));
      }
    }
  }
  const PRIMARY_COLOR = "#ffbe31";
  const SECONDARY_COLOR = "#3172ff";
  const PIVOT_COLOR = "#ff5631";
  const COMPLETED_COLOR = "#72ff31";

  const quickSort = (arr, speed) => {
    const animations = quickSortAnimations(arr);
    let pivotColored = false;
    let j = 0;
    for (let i = 0; i < animations.length; i++) {
      const BARS = document.getElementsByClassName("array-bar");
      if (animations[i].length === 1) {
        const col = pivotColored ? PRIMARY_COLOR : PIVOT_COLOR;
        pivotColored = !pivotColored;
        const [id] = animations[i];
        setTimeout(() => {
          BARS[id].style.backgroundColor = col;
        }, i * ANIMATION_SPEED_MS*(speed));
        continue;
      }
      const [barOneId, barTwoId] = animations[i];
      const CHANGECOLOR = j % 3 !== 1;
      if (CHANGECOLOR) {
        // When swapping the pivot, we differentiate the color
        const col =
          j % 3 === 0
            ? pivotColored
              ? SECONDARY_COLOR
              : PIVOT_COLOR
            : PRIMARY_COLOR;
        const barOneStyles = BARS[barOneId].style;
        const barTwoStyles = BARS[barTwoId].style;
        setTimeout(() => {
          barOneStyles.backgroundColor = col;
          barTwoStyles.backgroundColor = col;
        }, i * ANIMATION_SPEED_MS);
      } else if (barOneId > barTwoId) {
        const barOneStyles = BARS[barOneId].style;
        const barTwoStyles = BARS[barTwoId].style;
        setTimeout(() => {
          [barOneStyles.height, barTwoStyles.height] = [
            barTwoStyles.height,
            barOneStyles.height
          ];
        }, i * ANIMATION_SPEED_MS*(speed));
      }
      j++;
    }
  }


function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Sorting() {
  let [arr, setSorted] = React.useState([]);
  let [speed, setSpeed]= React.useState(0);

    function handleChange(evt) {
    
    let size =Math.floor((parseInt(evt.target.value) + 3) * 1.65);
    console.log(size);
    arr=[]
    for (let i = 0; i < size; i++) {
      arr.push(randomIntFromInterval(5, 600));
    }
    setSorted(arr);
  
  }

  function resetArray(arr) {
    arr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      arr.push(randomIntFromInterval(5, 600));
    }
    setSorted(arr);
  }

  React.useEffect(() => {
    resetArray(arr);
  }, []);

 
  let a = arr;
  let sizeofArr = Object.keys(a).length;

  console.log(Object.keys(a).length, typeof a);
  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
      <div>
      <div className="array-container">
      {arr.map((value, idx) => (
        <div
          className="array-bar"
          title={value}
          key={idx}
          style={{
            backgroundColor: NormalColor,
            height: `${value }px`,
          }}
        ></div>
      ))}
    </div>

    <div style={{display:'flex', position:'relative', left:'150px'}}>
       <Button onClick={() => setSpeed(2)}>0.5X</Button>
      <Button onClick={() => setSpeed(1)}>1X</Button>
      <Button onClick={() => setSpeed(0.5)}>2X</Button>
      <Button onClick={() => setSpeed(0.25)}>4X</Button>
    </div>
    <div>
      <input
          id="changeSize"
          type="range"
          min="0"
          max="40"
          style={{background:'rgba(214, 29, 29, 0.8)', cursor: 'auto'}}
          onChange={e => handleChange(e)}
          />
    </div>
    <br></br>
    <div style={{display:'flex'}} /*class="tab-content"*/>
    <Button onClick={() => resetArray(arr)}>Generate New Array</Button>
     <ul class="nav nav-tabs">
    <li class="nav-item">       
      <Button onClick={() => mergeSort({ arr, sizeofArr, speed })} >Merge Sort</Button>
    </li>  
    <li class="nav-item">
      <Button onClick={() => quickSort({ arr, speed})}>Quick Sort</Button>
    </li> 
    <li class="nav-item">  
      <Button onClick={() => this.heapSort()} >Heap Sort</Button>
    </li>
    <li class="nav-item">
      <Button onClick={() => bubbleSort({ arr, speed })}>Bubble Sort</Button>
    </li>
    </ul>   
    </div>
    
    </div>
    </div>
    <div style={{display:'flex'}}>
      <h1>stats</h1>
      <ul>
        <li>
          Best case:
        </li>
        <li>
          Worst case:
        </li>
        <li>
          Average case:
        </li>
      </ul>

    </div>
    </React.Fragment>
    
  );
}

export default Sorting;
