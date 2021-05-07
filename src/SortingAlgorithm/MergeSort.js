
export const getMergeSortAnimations = array => {

    const animation = [];

    if(array.length === 1) return array;

    const auxiliaryArray = array.slice();
    mergerSortHelper(array , 0 , array.length -1 , auxiliaryArray , animation);

    return animation;
}



function mergerSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animation,
){
    if(startIdx === endIdx ) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergerSortHelper(auxiliaryArray , startIdx , middleIdx , mainArray , animation);
    mergerSortHelper(auxiliaryArray , middleIdx + 1 , endIdx , mainArray , animation);
    doMerge(mainArray , startIdx , middleIdx , endIdx , auxiliaryArray , animation);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animation,
){
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1 ;
    while(i <= middleIdx && j <= endIdx){
        
        animation.push([i,j]);
        animation.push([i,j]);

        if(auxiliaryArray[i] <= auxiliaryArray[j]){
            animation.push([k , auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }else{
            animation.push([k , auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while(i <= middleIdx){
        animation.push([i,i]);
        animation.push([i,i]);
        
        animation.push([k , auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];

    }
    while(j <= endIdx){
        animation.push([j,j]);
        animation.push([j,j]);
        
        animation.push([k , auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];

    }
}