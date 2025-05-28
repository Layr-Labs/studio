

export const stage3PrototypeTaskList = `
# ** BEGIN INSTRUCTIONS FOR LLM **


Generate a high level task list of the changes to be made to the hello-world-avs codebase to implement the user's AVS idea or design.

Try to limit your results to 5 tasks or less.

The following components are recommended to be modified at a minimum:
- ServiceManager contract and deployment code.
- Operator code and add Operator code files as needed for execution or validation.
- README.md file including project overview, installation instructions, and how to run the operator binaries.

Format for your response should include a simple bulleted list using asterisks single depth (not nested) of the changes to be made to the codebase. 
Do Not use backticks in the response for any reason. Backticks are not allowed.

Do not use a numbered list.
Do not use a nested list.

Do not include changes for Slashing or Rewards payments.
Use italics instead of backticks for filenames in your response. 

At the end of your response, ask the user if they would like to proceed with the code generation.

**END OF INSTRUCTIONS FOR LLM**
`;


