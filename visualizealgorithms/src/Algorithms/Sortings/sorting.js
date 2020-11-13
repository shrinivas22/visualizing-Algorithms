import React from "react";
import "../../styles/scss/App.css";
import "./SortingVisualizer.css";
import { getMergeAnimations } from "./sortingAlgos.js";
import { bubbleSortAnimations } from "./bubbleSort.js";
import { quickSortAnimations} from "./quickSort.js"
import { render } from "react-dom";
import {Modal,Button,Grid,Row,Col,PageHeader} from 'react-bootstrap';

const ANIMATION_SPEED_MS = 10;
const NUMBER_OF_ARRAY_BARS = 60;
const NormalColor = "turquoise";
const RED = "red";

function mergeSort(arr1, sz) {
  console.log(arr1);

  console.log(sz);

  const animations = getMergeAnimations(arr1, sz);

  console.log(animations);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    const isColorChange = i % 3 !== 2;

    if (isColorChange) {
      console.log("isColorChange:", isColorChange, animations[i]);
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      // checking if it is the first element
      const color = i % 3 === 0 ? RED : NormalColor;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      console.log("isColorChange else:", isColorChange, animations[i]);
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}



function bubbleSort (arr) {
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
        }, i * ANIMATION_SPEED_MS);
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
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  const PRIMARY_COLOR = "#ffbe31";
  const SECONDARY_COLOR = "#3172ff";
  const PIVOT_COLOR = "#ff5631";
  const COMPLETED_COLOR = "#72ff31";

  const quickSort = (arr) => {
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
        }, i * ANIMATION_SPEED_MS);
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
        }, i * ANIMATION_SPEED_MS);
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

  function resetArray(arr) {
    arr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      arr.push(randomIntFromInterval(5, 730));
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
      <div>
      <div className="array-container">
      {arr.map((value, idx) => (
        <div
          className="array-bar"
          title={value /2}
          key={idx}
          style={{
            backgroundColor: NormalColor,
            height: `${value }px`,
          }}
        ></div>
      ))}
    </div>

    <div style={{display:'flex'}} /*class="tab-content"*/>
    <Button onClick={() => resetArray(arr)}>Generate New Array</Button>
     <ul class="nav nav-tabs">
    <li class="nav-item">       
      <Button onClick={() => mergeSort({ arr, sizeofArr })} >Merge Sort</Button>
    </li>  
    <li class="nav-item">
      <Button onClick={() => quickSort({ arr })}>Quick Sort</Button>
    </li> 
    <li class="nav-item">  
      <Button onClick={() => this.heapSort()} >Heap Sort</Button>
    </li>
    <li class="nav-item">
      <Button onClick={() => bubbleSort({ arr })}>Bubble Sort</Button>
    </li>
    </ul>   
    </div>
    </div>
    </React.Fragment>
    
  );
}

export default Sorting;
