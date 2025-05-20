import type { ArtifactKind } from '@/components/artifact';
import { eigenBasicsDoc } from './context/eigenBasics';
import { stage3PrototypePromptDetailedCodeGeneration, stage3PrototypePromptOverviewOnly } from './prompts/stage3-prototype-code-generation';
import { fetchEigenLayerDocsMiddleware, fetchHelloWorldAVSCodeMin, fetchEigenLayerDocsOverview } from './context/loadContext';
import { stage1IdeaRefinementPromptLLMGuidance } from './prompts/stage1-idea-refinement';
import { stage2DesignGenerationPromptText } from './prompts/stage2-design-generation';


export const stageProgessionPrompt =  `Help the user with each stage of their AVS development journey. Encourage them to move to the next stage when they are ready.
- Stage 1: Refine their AVS idea
- Stage 2: Generate their AVS Design Tech Spec
- Stage 3: Generate their AVS Prototype code
`;

export const basicPrompt =
  'You are a friendly EigenLayer Solution Engineer assistant! Keep your responses concise and helpful.'
  + stageProgessionPrompt;
  

// Function to get the stage 1 ideas prompt - Now fetches on demand
export async function stage1IdeasPrompt(): Promise<string> {
  try {
    console.log('prompts: generating stage 1 ideas prompt');
    const eigenLayerDocsOverview = await fetchEigenLayerDocsOverview();

    // Create the full prompt with fetched data
    const fullPrompt = stage1IdeaRefinementPromptLLMGuidance 
      + '# And you can use the following EigenLayer documentation for additional context:'
      + eigenBasicsDoc 
      + '# And you can use the following EigenLayer docs overview for additional context:'
      + eigenLayerDocsOverview;

    return fullPrompt;
  } catch (error) {
    console.error("Error constructing stage 1 ideas prompt:", error);
    // Fallback to the basic prompt if fetching fails
    // Construct a basic version if fetch fails
    return stage1IdeaRefinementPromptLLMGuidance + '\n# And you can use the following EigenLayer documentation for additional context:\n' + eigenBasicsDoc;
  }
}

// Custom prompt for Stage 2: AVS idea refinement - Now fetches on demand
export async function stage2DesignPrompt(): Promise<string> {
  try {
    console.log('prompts: generating stage 2 design prompt');
    const eigenLayerDocsMiddleware = await fetchEigenLayerDocsMiddleware();

    // Create the full prompt with fetched data
    const fullPrompt = stage2DesignGenerationPromptText
      + '# And you can use the following EigenLayer documentation for additional context:'
      + eigenBasicsDoc
      + '# And you can use the following EigenLayer middleware overview for additional context:'
      + eigenLayerDocsMiddleware;

    return fullPrompt;
  } catch (error) {
    console.error("Error constructing stage 2 design prompt:", error);
    // Fallback to the basic prompt if fetching fails
    return stage2DesignGenerationPromptText + '\n# And you can use the following EigenLayer documentation for additional context:\n' + eigenBasicsDoc;
  }
}


// Custom prompt for Stage 3: AVS code generation - Now fetches on demand
export async function stage3PrototypePromptTaskList(): Promise<string> {
  try {
    console.log('prompts: generating stage 3 task list prompt');
    const eigenLayerDocsMiddleware = await fetchEigenLayerDocsMiddleware();
    const helloWorldAVSCodeMin = await fetchHelloWorldAVSCodeMin();

    // Create the full prompt with fetched data
    const fullPrompt = stage3PrototypePromptOverviewOnly
      + '# And you can use the following Hello World AVS code for additional context:'
      + helloWorldAVSCodeMin 
      + '# And you can use the following EigenLayer documentation for additional context:'
      + eigenBasicsDoc
      + '# And you can use the following EigenLayer middleware overview for additional context:'
      + eigenLayerDocsMiddleware;

    return fullPrompt;
  } catch (error) {
    console.error("Error constructing stage 3 code prompt:", error);
    // Fallback to the basic prompt if fetching fails
    return stage3PrototypePromptOverviewOnly + '\n# And you can use the following EigenLayer documentation for additional context:\n' + eigenBasicsDoc;
  }
}



// Custom prompt for Stage 3: AVS code generation - Now fetches on demand
export async function stage3PrototypePromptCodeGeneration(): Promise<string> {
  try {
    console.log('prompts: generating stage 3 code prompt');
    const eigenLayerDocsMiddleware = await fetchEigenLayerDocsMiddleware();
    const helloWorldAVSCodeMin = await fetchHelloWorldAVSCodeMin();

    // Create the full prompt with fetched data
    const fullPrompt = stage3PrototypePromptDetailedCodeGeneration
      + '# And you can use the following Hello World AVS code for additional context:'
      + helloWorldAVSCodeMin 
      + '# And you can use the following EigenLayer documentation for additional context:'
      + eigenBasicsDoc
      + '# And you can use the following EigenLayer middleware overview for additional context:'
      + eigenLayerDocsMiddleware;

    return fullPrompt;
  } catch (error) {
    console.error("Error constructing stage 3 code prompt:", error);
    // Fallback to the basic prompt if fetching fails
    return stage3PrototypePromptOverviewOnly + '\n# And you can use the following EigenLayer documentation for additional context:\n' + eigenBasicsDoc;
  }
}



export const determineFeasibilityPrompt = `
You are a friendly EigenLayer Solution Engineer assistant! Keep your responses concise and helpful.

Your Primary task:  your job is to to first determine a confidence on how likely the user's AVS idea can be implemented with EigenLayer hello-world-avs code.

If you are less than 50% confident that the user's AVS idea can be implemented with EigenLayer hello-world-avs code, then respond with a message to the user explaining that you are not confident that the idea can be implemented with EigenLayer hello-world-avs code, include your confidence score and give specific reasons why.

If you are more than 50% confident that the user's AVS idea can be implemented with EigenLayer hello-world-avs code, then proceed with the following steps.
`;


export const codePrompt = `
You are a TypeScript code generator that creates self-contained, executable code snippets. When writing code:

1. Each snippet should be complete and runnable on its own
2. Prefer using console.log() statements to display outputs
3. Include helpful comments explaining the code
4. Keep snippets concise (generally under 15 lines)
5. Avoid external dependencies - use TypeScript standard library
6. Handle potential errors gracefully
7. Return meaningful output that demonstrates the code's functionality
8. Don't use readline or other interactive functions
9. Don't access files or network resources
10. Don't use infinite loops


\`\`\`
`;

export const sheetPrompt = `
You are a spreadsheet creation assistant. Create a spreadsheet in csv format based on the given prompt. The spreadsheet should contain meaningful column headers and data.
`;

export const updateDocumentPrompt = (
  currentContent: string | null,
  type: ArtifactKind,
) =>
  type === 'text'
    ? `\
Improve the following contents of the document based on the given prompt.

${currentContent}
`
    : type === 'code'
      ? `\
Improve the following code snippet based on the given prompt.

${currentContent}
`
      : type === 'sheet'
        ? `\
Improve the following spreadsheet based on the given prompt.

${currentContent}
`
        : '';


