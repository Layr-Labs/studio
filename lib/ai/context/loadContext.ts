// URL constants for fetching context data
const EIGENLAYER_DOCS_OVERVIEW_URL = 'https://af52o4jcdfzphbst.public.blob.vercel-storage.com/context/repomix-output-eigenlayer-docs-overview-min-wtABuLj3MuRM9JklyGY2tt8v6gPJNY.md';
const EIGENLAYER_MIDDLEWARE_DOCS_URL = 'https://af52o4jcdfzphbst.public.blob.vercel-storage.com/context/repomix-output-eigenlayer-middleware-docs-Hz9TpntXTCiddC0ilxAJq2ztglt8DI.md';
const HELLO_WORLD_AVS_CODE_MIN_URL = 'https://af52o4jcdfzphbst.public.blob.vercel-storage.com/context/repomix-output-Layr-Labs-hello-world-avs-minified-GA9JC545l89gNAYte8iDADNteNBqXj.txt';
const HELLO_WORLD_AVS_CODE_MIN_JSON_URL = 'https://af52o4jcdfzphbst.public.blob.vercel-storage.com/context/hello-world-avs-json-dtPpmbxgQIDvlw8yxAJDuLQsI0B81E.txt';

// Cache variables to store fetched data
let eigenLayerDocsCache: string | null = null;
let eigenLayerDocsMiddlewareCache: string | null = null;
let helloWorldAVSCodeMinCache: string | null = null;
let helloWorldAVSCodeMinJSONCache: string | null = null;

/**
 * Fetches the Hello World AVS code, using a cached version if available.
 */
export async function fetchHelloWorldAVSCodeMinJSON(): Promise<string> {
  // Return cached code if available
  if (helloWorldAVSCodeMinJSONCache) {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchHelloWorldAVSCodeMinJSON: returning cached code');
    }
    return helloWorldAVSCodeMinJSONCache;
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchHelloWorldAVSCodeMinJSON: fetching new code');
    }
  }

  try {
    const response = await fetch(HELLO_WORLD_AVS_CODE_MIN_JSON_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch Hello World AVS code JSON: ${response.statusText}`);
    }
    const helloWorldAVSCodeJSON = await response.text();

    // Cache the code for future use
    helloWorldAVSCodeMinJSONCache = helloWorldAVSCodeJSON;

    return helloWorldAVSCodeJSON;
  } catch (error) {
    console.error("Error fetching Hello World AVS code JSON:", error);
    // Return a descriptive error message or rethrow
    return 'Error loading Hello World AVS code JSON.';
  }
} 

/**
 * Fetches the EigenLayer docs overview, using a cached version if available.
 */
export async function fetchEigenLayerDocsOverview(): Promise<string> {
  // Return cached docs if available
  if (eigenLayerDocsCache) {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchEigenLayerDocsOverview: returning cached docs');
    }
    return eigenLayerDocsCache;
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchEigenLayerDocsOverview: fetching new docs');
    }
  }

  try {
    const response = await fetch(EIGENLAYER_DOCS_OVERVIEW_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch EigenLayer docs: ${response.statusText}`);
    }
    const eigenLayerDocsOverview = await response.text();
      
    // Cache the docs for future use
    eigenLayerDocsCache = eigenLayerDocsOverview;
    
    return eigenLayerDocsOverview;
  } catch (error) {
    console.error("Error fetching EigenLayer docs:", error);
    // Return a descriptive error message or rethrow, depending on desired error handling
    return 'Error loading EigenLayer documentation.'; 
  }
}

/**
 * Fetches the EigenLayer middleware docs, using a cached version if available.
 */
export async function fetchEigenLayerDocsMiddleware(): Promise<string> {
  // Return cached docs if available
  if (eigenLayerDocsMiddlewareCache) {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchEigenLayerDocsMiddleware: returning cached docs');
    }
    return eigenLayerDocsMiddlewareCache;
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchEigenLayerDocsMiddleware: fetching new docs');
    }
  }

  try {
    const response = await fetch(EIGENLAYER_MIDDLEWARE_DOCS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch EigenLayer middleware docs: ${response.statusText}`);
    }
    const eigenLayerDocsMiddleware = await response.text();

    // Cache the docs for future use
    eigenLayerDocsMiddlewareCache = eigenLayerDocsMiddleware;

    return eigenLayerDocsMiddleware;
  } catch (error) {
    console.error("Error fetching EigenLayer middleware docs:", error);
    // Return a descriptive error message or rethrow
    return 'Error loading EigenLayer middleware documentation.'; 
  }
}

/**
 * Fetches the Hello World AVS code, using a cached version if available.
 */
export async function fetchHelloWorldAVSCodeMin(): Promise<string> {
  // Return cached code if available
  if (helloWorldAVSCodeMinCache) {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchHelloWorldAVSCodeMin: returning cached code');
    }
    return helloWorldAVSCodeMinCache;
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log('loadContext: fetchHelloWorldAVSCodeMin: fetching new code');
    }
  }

  try {
    const response = await fetch(HELLO_WORLD_AVS_CODE_MIN_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch Hello World AVS code: ${response.statusText}`);
    }
    const helloWorldAVSCode = await response.text();

    // Cache the code for future use
    helloWorldAVSCodeMinCache = helloWorldAVSCode;

    return helloWorldAVSCode;
  } catch (error) {
    console.error("Error fetching Hello World AVS code:", error);
    // Return a descriptive error message or rethrow
    return 'Error loading Hello World AVS code.';
  }
} 