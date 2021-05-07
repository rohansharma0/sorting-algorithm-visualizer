
export const getBubbleSortAnimations = array => {

    const animation = [];

    if(array.length === 1) return array;

    const auxiliaryArray = array.slice();
    bubbleSort(array , auxiliaryArray , animation);

    return animation;
}



function bubbleSort(
    mainArray,
    auxiliaryArray,
    animation,
){
    for(let i = 0 ; i< mainArray.length ; i++){
        for(let j = 0 ; j < mainArray.length - i -1 ; j++){
            if(auxiliaryArray[j] > auxiliaryArray[j+1]){
                let temp = auxiliaryArray[j];
                auxiliaryArray[j] = auxiliaryArray[j+1];
                auxiliaryArray[j+1] = temp;
            }
        }
    }
    
}