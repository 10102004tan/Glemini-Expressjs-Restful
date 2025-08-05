/**
 * @file v2/util/index.js
 * @description This file contains utility functions for the v2 API.
 */

/**
 * sort random array
 * @param {Array} arr - The array to be sorted.
 */
function sortRandomArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function isPairInCorrectAnswers(inputPair, correctAnswerGroups) {
  return correctAnswerGroups.some(
    group =>
      group.length === inputPair.length &&
      group.every((id) => inputPair.includes(id))
  );
}

/**
 * convert array to [[], []]
 * input [1,2,3,4,5,6]
 * output [[1,2],[4,5]] if size = 2
 * output [[1,2,3],[4,5,6]] if size = 3
 */
function convertArrayToGroups(arr, size) {
    const groups = [];
    for (let i = 0; i < arr.length; i += size) {
        groups.push(arr.slice(i, i + size));
    }
    return groups;
}


module.exports = {
    sortRandomArray,
    isPairInCorrectAnswers,
    convertArrayToGroups
};

