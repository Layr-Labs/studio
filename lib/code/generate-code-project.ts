import express from 'express';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import bodyParser from 'body-parser';
import { PassThrough, Readable } from 'stream';
import { put } from '@vercel/blob';
import Ajv from 'ajv';
import { fetchHelloWorldAVSCodeMinJSON } from '../ai/context/loadContext';

export type CodeFile = {
    path: string;
    summary: string;
    content: string;
  };

// Define a type for the response if not already available
type BlobResponse = {
    url: string;
};


export const codeProjectJSONSchema = `
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["path", "summary", "content"],
    "properties": {
      "path": { "type": "string" },
      "summary": { "type": "string" },
      "content": { "type": "string" }
    }
  }
}
`;




export async function validateCodeProjectJSON(jsonInput: string): Promise<void> {
    // Create a new Ajv instance
    const ajv = new Ajv({ allErrors: true });

    // Parse the schema
    const schema = JSON.parse(codeProjectJSONSchema);

    // Compile the schema
    const validate = ajv.compile(schema);

    // Validate the JSON input against the schema
    let parsedInput;
    try {
        parsedInput = JSON.parse(jsonInput);
        const valid = validate(parsedInput);
        console.log('generateZipFromJSONString: valid', valid);
        if (!valid) {
            const errors = validate.errors || [];
            const errorMessages = errors.map(err => 
                `${err.instancePath} ${err.message}`
            ).join('; ');
            console.error(`generate-zip.ts: JSON validation failed: ${errorMessages}`);
            throw new Error(`JSON validation failed: ${errorMessages}`);
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error(`generate-zip.ts: JSON syntax error: ${error.message}`);
            throw new Error(`Invalid JSON syntax: ${error.message}`);
        }
        throw error;
    }
}

export async function generateZipFromJSONString(jsonInput: string): Promise<string> {
    
    // Validate the JSON input
    validateCodeProjectJSON(jsonInput);
    
    let files: CodeFile[];

    // Parse JSON, write each object to code files array
    try {
        files = JSON.parse(jsonInput);
    } catch (error: any) {
        if (typeof jsonInput === 'string' && error instanceof SyntaxError && error.message.includes('position')) {
            const match = error.message.match(/position (\d+)/);
            if (match) {
                const pos = parseInt(match[1], 10);
                const context = jsonInput.slice(Math.max(0, pos - 20), pos + 20);
                console.error(
                    `JSON parse error at position ${pos}: ...${context}...`
                );
            } else {
                console.error('JSON parse error:', error.message);
            }
        } else {
            console.error('JSON parse error:', error);
        }
        throw new Error("Invalid JSON format: Unable to parse input.");
    }
    
    if (!Array.isArray(files)) {
        throw new Error("Invalid input: Expected an array of files.");
    }

    files.forEach((file, index) => {
        if (!file.path || typeof file.path !== 'string') {
            throw new Error(`Invalid input at index ${index}: Each file must have a valid 'path' property.`);
        }
        if (!file.content || typeof file.content !== 'string') {
            throw new Error(`Invalid input at index ${index}: Each file must have a valid 'content' property.`);
        }
    });

    // Create the zip archive and collect output in a buffer
    const archive = archiver('zip');
    const chunks: Buffer[] = [];

    archive.on('data', (chunk) => chunks.push(chunk));
    archive.on('error', (err) => { throw err; });

    files.forEach(file => {
        archive.append(file.content, { name: file.path });
    });

    await archive.finalize();

    const buffer = Buffer.concat(chunks);

    // Upload to Vercel Blob Storage
    const response: BlobResponse = await put(
        `projectCodeZipArchives/hello-world-avs-custom-project-${Date.now()}.zip`,
        buffer,
        {
            access: 'public',
            contentType: 'application/zip',
        }
    );
    return response.url;
}

// Appends the input JSON array to a new empty array and returns the result.
export async function appendJSONToHelloWorld(jsonArrayInput: string): Promise<string> {
    
    const helloWorldAVSCodeJSON = await fetchHelloWorldAVSCodeMinJSON();
    const helloWorldAVSCodeJSONArray = JSON.parse(helloWorldAVSCodeJSON);
    const jsonArrayInputArray = JSON.parse(jsonArrayInput);

    const resultArray = [ ...jsonArrayInputArray, ...helloWorldAVSCodeJSONArray];

    return JSON.stringify(resultArray);
}
