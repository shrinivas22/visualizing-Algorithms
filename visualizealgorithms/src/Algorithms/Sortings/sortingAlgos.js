export function getMergeAnimations({ arr, sizeofArr }) {
  let sz = sizeofArr;
  console.log(arr, sz);
  let animations = [];
  console.log(sz);
  if (sz <= 1) {
    return arr;
  }
  let tempArr = arr;
  console.log(tempArr);
  mergeSort(arr, 0, sz - 1, tempArr, animations);
  return animations;
}

function mergeSort(arr, start, end, tempArr, animations) {
  // dividing untill a single element is left
  if (start === end) {
    return;
  }
  const mid = parseInt((start + end) / 2);
  console.log("mid:", mid, start, end);
  mergeSort(arr, start, mid, tempArr, animations);
  mergeSort(arr, mid + 1, end, tempArr, animations);
  mergeArrays(arr, start, mid, end, tempArr, animations);
}

function mergeArrays(arr, start, mid, end, tempArr, animations) {
  let i = start,
    j = start,
    k = mid + 1;
  while (j <= mid && k <= end) {
    //push the 2 elements in comparirsion into the animations array
    // We do this twice to show a difference while and after sorting
    animations.push([j, k]);
    animations.push([j, k]);
    if (tempArr[j] <= tempArr[k]) {
      animations.push([i, tempArr[j]]);
      arr[i++] = tempArr[j++];
    } else {
      //overwriting every 3rd element to idicate index and the number(height of the bar)
      animations.push([i, tempArr[k]]);
      arr[i++] = tempArr[k++];
    }
  }
  while (j <= mid) {
    animations.push([j, j]);

    animations.push([j, j]);

    animations.push([i, tempArr[j]]);
    arr[i++] = tempArr[j++];
  }
  while (k <= end) {
    animations.push([k, k]);

    animations.push([k, k]);

    animations.push([i, tempArr[k]]);

    arr[i++] = tempArr[k++];
  }
}
