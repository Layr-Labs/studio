import fs from 'fs';
import path from 'path';
import { generateZipFromJSONString, validateCodeProjectJSON, appendJSONToHelloWorld } from '../../lib/code/generate-code-project';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Read the input JSON from the file
const inputFilePath1 = path.join(__dirname, 'example-code-project-json.txt');
const exampleCodeJson = fs.readFileSync(inputFilePath1, 'utf8');

const inputFilePath2 = path.join(__dirname, 'valid-code-project.json');
const validCodeJson = fs.readFileSync(inputFilePath2, 'utf8');

// // Test the generateZipFromJSON function
// describe('generateZipFromJSON1', () => {
//   it('should create a zip file with the expected content', async () => {
//     // Call the function
//     const url = await generateZipFromJSONString(exampleCodeJson);

//     console.log(url);

//     // Check if the zip file exists
//     expect(url).toBeDefined();

//     const response = await fetch(url);
//     expect(response.status).toBe(200);
//   });
// }); 

// describe('generateZipFromJSON2', () => {
//   it('should create a zip file with the expected content', async () => {
//     // Call the function
//     const url = await generateZipFromJSONString(validCodeJson);

//     console.log(url);

//     // Check if the zip file exists
//     expect(url).toBeDefined();
    
//   });
// });

describe('generateZipFromAppendJSONToHelloWorld', () => {
  it('should create a zip file with the expected content', async () => {
    const appendedJson = await appendJSONToHelloWorld(exampleCodeJson);
    // Call the function
    const url = await generateZipFromJSONString(appendedJson);

    console.log(url);

    // Check if the zip file exists
    expect(url).toBeDefined();
    
  });
});



describe('validateCodeProjectJSON with hello-world-avs-json.txt', () => {
  it('should validate the JSON without throwing', async () => {
    const inputFilePath = path.join(__dirname, 'hello-world-avs-json.txt');
    const jsonInput = fs.readFileSync(inputFilePath, 'utf8');
    await expect(validateCodeProjectJSON(jsonInput)).resolves.not.toThrow();
  });
});




