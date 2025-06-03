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


module.exports = {
    sortRandomArray
};

