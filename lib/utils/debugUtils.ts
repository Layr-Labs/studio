import fs from 'fs/promises';
import path from 'path';

/**
 * Logs a given string content to a specified file path within a .debug directory,
 * only during development mode. Creates the directory if it doesn't exist.
 *
 * @param content The string content to log.
 * @param filename The name of the file to log to (e.g., 'system-prompt-log.txt').
 * @param callerInfo Optional string to identify the caller in log messages.
 */
export async function logContentForDebug(
  content: string,
  filename: string,
  callerInfo: string = 'Debug Log'
): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    try {
      const debugDir = path.join(process.cwd(), '.debug');
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
      const timestampedFilename = `${timeStr}_${filename}`;
      const logFilePath = path.join(debugDir, timestampedFilename);
      await fs.mkdir(debugDir, { recursive: true }); // Ensure directory exists
      await fs.writeFile(logFilePath, content, 'utf8');
      //console.log(`${callerInfo} Content logged to: ${logFilePath}`);
    } catch (logError) {
      console.error(`${callerInfo} Failed to write debug log to ${filename}:`, logError);
    }
  }
}

// Helper to convert a ReadableStream into an AsyncIterable
async function* toAsyncIterable<T>(readable: ReadableStream<T>): AsyncGenerator<T, void, unknown> {
  const reader = readable.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      yield value as unknown as T;
    }
  } finally {
    reader.releaseLock();
  }
}

// New helper to log chunks from a streaming ReadableStream
export async function logStreamForDebug<T>(
  stream: ReadableStream<T>,
  filename: string,
  callerInfo: string = 'Debug Stream'
): Promise<void> {
  // Check if we're in development mode - only log in dev
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const debugDir = path.join(process.cwd(), '.debug');
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  const timestampedFilename = `${timeStr}_${filename}`;
  const logFilePath = path.join(debugDir, timestampedFilename);

  // Ensure the debug directory exists
  try {
    await fs.mkdir(debugDir, { recursive: true });
  } catch (err) {
    console.error(`${callerInfo} Failed to create debug directory:`, err);
    return; // Exit if we can't create the directory
  }

  // Process the stream without blocking the caller
  (async () => {
    try {
      // Convert ReadableStream to AsyncIterable for consumption
      const iterable = toAsyncIterable(stream);
      
      // Consume and log each chunk
      for await (const chunk of iterable) {
        try {
          // Extract just the content from AIMessageChunk objects
          let chunkStr = '';
          
          if (typeof chunk === 'string') {
            // Handle string chunks directly
            chunkStr = chunk;
          } else if (chunk && typeof chunk === 'object') {
            // Handle AIMessageChunk structure where content is in kwargs.content
            const chunkObj = chunk as any;
            
            if (chunkObj.kwargs && typeof chunkObj.kwargs === 'object' && 'content' in chunkObj.kwargs) {
              // Most likely an AIMessageChunk with content in kwargs.content
              chunkStr = chunkObj.kwargs.content || '';
            } else if ('content' in chunkObj) {
              // Direct content property
              chunkStr = chunkObj.content || '';
            } else {
              // Fallback to JSON if structure doesn't match expected
              chunkStr = `[Unparseable chunk: ${JSON.stringify(chunk).substring(0, 100)}...]`;
            }
          }
          
          await fs.appendFile(logFilePath, chunkStr + '\n', 'utf8');
        } catch (logErr) {
          console.error(`${callerInfo} Failed to write chunk to ${filename}:`, logErr);
        }
      }
      
      console.log(`${callerInfo} Stream logging completed to: ${logFilePath}`);
    } catch (streamErr) {
      console.error(`${callerInfo} Error processing stream:`, streamErr);
    }
  })();
}

/**
 * Consumes a ReadableStream and returns all chunks combined as a single string.
 * Uses the same chunk parsing logic as logStreamForDebug.
 *
 * @param stream The ReadableStream to consume
 * @return Promise resolving to the full text content from the stream
 */
export async function consumeStreamToText<T>(
  stream: ReadableStream<T>
): Promise<string> {
  let fullText = '';
  
  try {
    // Convert ReadableStream to AsyncIterable for consumption
    const iterable = toAsyncIterable(stream);
    
    // Consume and accumulate each chunk
    for await (const chunk of iterable) {
      let chunkStr = '';
      
      if (typeof chunk === 'string') {
        // Handle string chunks directly
        chunkStr = chunk;
      } else if (chunk && typeof chunk === 'object') {
        // Handle AIMessageChunk structure where content is in kwargs.content
        const chunkObj = chunk as any;
        
        if (chunkObj.kwargs && typeof chunkObj.kwargs === 'object' && 'content' in chunkObj.kwargs) {
          // Most likely an AIMessageChunk with content in kwargs.content
          chunkStr = chunkObj.kwargs.content || '';
        } else if ('content' in chunkObj) {
          // Direct content property
          chunkStr = chunkObj.content || '';
        } else {
          // Fallback to JSON if structure doesn't match expected
          chunkStr = `[Unparseable chunk: ${JSON.stringify(chunk).substring(0, 100)}...]`;
        }
      }
      
      fullText += chunkStr;
    }
    
    return fullText;
  } catch (error) {
    console.error(`debugUtils.ts: consumeStreamToText: Error consuming stream:`, error);
    throw error;
  }
}