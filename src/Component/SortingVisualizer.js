import React , {useState , useEffect} from 'react';

import {getMergeSortAnimations} from "../SortingAlgorithm/MergeSort" ;
import {getBubbleSortAnimations} from "../SortingAlgorithm/BubbleSort" ;
import {getHeapSortAnimations} from "../SortingAlgorithm/HeapSort" ;
import {getInsertionSortAnimations} from "../SortingAlgorithm/InsertionSort" ;
import {getQuickSortAnimations} from "../SortingAlgorithm/QuickSort" ;

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Max number of bars (value) in the array.
const MAX_BARS = 200;

// Default no of bars in the array;
const DEF_NO_BAR = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SortingVisualizer = () => {

    const [array , setArray] = useState([]);
    const [noOfBar , setNoOfBar] = useState(DEF_NO_BAR);

    const resetArray = (no) => {
      const arr = [];

      for(let i = 0 ; i < no ; i++){
        arr.push(randomNumberFromInterval(30,800));
      }
      setArray(arr);
    }

    const randomNumberFromInterval = (min , max) =>{
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const animate = animations =>{
      for(let i = 0; i< animations.length ; i++){
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if(isColorChange){
          const [barOneIdx , barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        }else{
          setTimeout(() => {
            const [barOneIdx , newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            if(noOfBar < 16){
              arrayBars[barOneIdx].firstChild.innerHTML = newHeight;
            }
          } , i * ANIMATION_SPEED_MS);
        }
      }

    }


    //bubble Sort
    const bubbleSort = () => {
      const animations = getBubbleSortAnimations(array);
      animate(animations);
    }


    //insertion Sort
    const insertionSort = () => {
      const animations = getInsertionSortAnimations(array);
      animate(animations);
    }

    
    //merge Sort
    const mergeSort = () => {
      const animations = getMergeSortAnimations(array);
      animate(animations);
    }

    //Quick Sort
    const quickSort = () => {
      const animations = getQuickSortAnimations(array);
      animate(animations);
    }

    
    //heap Sort
    const heapSort = () => {
      const animations = getHeapSortAnimations(array);
      animate(animations);
    }
    
  
    const arrayAreEqual = ( arrayOne , arrayTwo) => {
      if(arrayOne.length !== arrayTwo.length) return false;
      for(let i = 0 ; i< arrayOne.length ; i++){
        if(arrayOne[i] !== arrayTwo[i]){
          return false;
        }
      }
      return true;
    }

  
    const testSortingAlog = () => {
      for(let i = 0 ; i<100 ; i++){
        const array = [];
        const length = randomNumberFromInterval(1 , 1000);
        for(let i = 0 ; i < length ;i++){
          array.push(randomNumberFromInterval(-1000 , 1000));
        }

      const javaScriptSortedArray = array.slice().sort((a , b) => a-b);
      const sortedArray = getMergeSortAnimations(array.slice());
      console.log(arrayAreEqual(javaScriptSortedArray,sortedArray));
      }
    }

    //onchange no of bar from range

    const changeBarNo = val => {
      setNoOfBar(val);
      resetArray(noOfBar);
    }

    //reset array at begining ;
    useEffect(() => {
      resetArray(DEF_NO_BAR);
    }, [])

    return (
        <div>
          <div class="top-bar"></div>
          <div class="main-section">
            <div class="content">
              {array.map((value , i ) => (
                <div className="array-bar" key={i} style={{height:`${value}px` , width : `${(1/noOfBar)*1000}px`}}>
                  {noOfBar <= 15 ? <p>{value}</p>: null}
                </div>
              ))}

            </div>
            <div class="side-navbar">
              <h1>Sorting Algorithm Visualizer</h1>
              <p>Change Array Size {noOfBar}</p>

              <div class="slider-container">
                <input type="range" class="slider" min="10" max={MAX_BARS} value={noOfBar} onChange={({ target: { value: radius } }) => {
                    changeBarNo(radius);
                  }} />
              </div>
              <p>Select Sorting Algorithm</p>
              <form>
                <label>
                  <input type="radio" name="bubbleSort" />Bubble Sort
                </label>
                <label>
                  <input type="radio" name="insertionSort" />Insertion Sort
                </label>
                <label>
                  <input type="radio" name="MergeSort" />Merge Sort
                </label>
                <label>
                  <input type="radio" name="QuickSort" />Ouick Sort
                </label>
                <label>
                  <input type="radio" name="heapSort" />Heap Sort
                </label>
              </form>
              
              <button class="sort-btn"onClick={bubbleSort}>Bubble Sort</button>
              <button class="sort-btn"onClick={insertionSort}>Insertion Sort</button>
              <button class="sort-btn" onClick={mergeSort}>Merge Sort</button>
              <button class="sort-btn"onClick={quickSort}>Ouick Sort</button>
              <button class="sort-btn"onClick={heapSort}>Heap Sort</button>
              <button class="sort-btn" onClick={testSortingAlog}>Test Sort</button>
            </div>
          </div>
          <div class="bottom-bar"></div>
        </div>
      
    )

}

export default SortingVisualizer
