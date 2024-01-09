#!/usr/bin/env node
import {basicFunctions} from './funcs/basic_functions.mjs';


init();
/**
 * program starts here
 * @date 1/9/2024 - 8:30:11 PM
 *
 * @async
 * @return {*}
 */
async function init() {
  const args = process.argv.slice(2);

  // Check if both -c and -p parameters are provided
  if (args.length === 0) {
    console.error('Usage: node cliApp.js <functionName> <parameters>');
    process.exit(1);
  }

  const functionName = args[0];

  // Check if command is alphanumeric
  if (!/^[a-zA-Z0-9]+$/.test(functionName)) {
    console.error('Error: value should only be alphanumeric');
    process.exit(1);
  }


  // Execute the specified function with the provided parameter
  if (basicFunctions[functionName]) {
    const result = await basicFunctions[functionName](...args.slice(1));
    console.log(result);
  } else {
    console.error(`Error: Function ${functionName} not found`);
    process.exit(1);
  }
}

