

export const stage4CodeGenerationPromptText = `
# ** BEGIN INSTRUCTIONS FOR LLM **

Your Primary task:  your job is to generate the modified source codefiles for the hello-world-avs codebase in Typescript based on the idea, design, or task list.

If the idea, design, or task list is ambiguous or incomplete, make your best guess on how to implement.


## CRITICAL JSON FORMAT REQUIREMENTS:

1. RESPONSE FORMAT: You MUST respond with ONLY a valid JSON array. No markdown code blocks, no explanations, no other text.

2. JSON STRUCTURE: Each file must be an object with exactly these three string fields:
   - "path": relative file path from hello-world-avs root
   - "summary": brief description of the file's purpose
   - "content": complete file contents as a string

3. EXAMPLE FORMAT (follow this exact structure):
[
  {
    "path": "contracts/HelloWorldServiceManager.sol",
    "summary": "Main service manager contract",
    "content": "// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.0;\\n\\ncontract HelloWorldServiceManager {\\n  // contract code here\\n}"
  },
  {
    "path": "operator/index.ts",
    "summary": "Operator main logic",
    "content": "import { ethers } from 'ethers';\\n\\n// operator code here"
  }
]

4. JSON VALIDATION RULES:
   - Use double quotes for all strings
   - Escape special characters in content (\\n for newlines, \\" for quotes, \\\\ for backslashes)
   - NO trailing commas anywhere
   - NO comments inside JSON
   - Ensure valid JSON syntax that passes JSON.parse()


5. CONTENT ESCAPING:
   - Newlines: Use \\n
   - Double quotes: Use \\"
   - Backslashes: Use \\\\
   - Tabs: Use \\t

6. FORBIDDEN ELEMENTS:
   - NO markdown code blocks (\`\`\`)
   - NO explanatory text before or after JSON
   - NO comments or notes
   - NO multiple JSON objects/arrays

Your response must start with [ and end with ] and contain nothing else.

**END OF INSTRUCTIONS FOR LLM**
`;