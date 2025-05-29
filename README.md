# EigenLayer Studio

**Live App:** [studio.eigenlayer.xyz](https://studio.eigenlayer.xyz) 

## Table of Contents
- [Overview](#overview)
- [Instructions](#instructions)
- [Demo](#demo)
- [Running Locally](#running-locally)
- [Appendix](#appendix)




## Overview

EigenLayer Studio is an AI-powered tool that enables developers to go from idea to working AVS (Actively Validated Service) prototype in minutes. Whether you're experimenting or preparing for production, Studio accelerates AVS development using guided workflows and generative AI tooling.

### Project Goals
- "**Anyone** can build an [AVS on EigenLayer](https://docs.eigenlayer.xyz/developers/Concepts/avs-developer-guide) leveraging the power of AI first tooling"
- "Idea to Design to AVS in under 10 minutes"





## Instructions
**How to Use The App**
- Choose whichever AI model you prefer for your testing from the dropdown.
- Click one of the suggested example actions or begin chatting free form with the app about your AVS idea.
- You will be guided through 3 stages: idea refinement, design tech spec generation, and prototype code generation.
    - Idea refinement: the app will provide a refined AVS idea, provide feedback on how well your idea fits as an AVS on EigenLayer, and suggest enhancements to get more value from your idea on EigenLayer.
    - Design generation: the app will generate a complete Design Tech Spec for your AVS idea.
    - Prototype code generation: the app will generate a fully function prototype for your AVS idea based on the [hello-world-avs](https://github.com/Layr-Labs/hello-world-avs) example.
- Feel free to click one of the suggested actions to test its operation or skip through the three stages as you like.


## Feedback

**Submitting Feedback**
Any and all feedback are welcome! Please share your feedback via either:
- Raising a new Issue [here](https://github.com/Layr-Labs/studio/issues). Tag the issue with either label "bug" or "enhancement".
- Start a new conversation in our [Discussions](https://github.com/Layr-Labs/studio/discussions) page with any free form feedback you care to share.



## Demo




https://github.com/user-attachments/assets/c5a2e2f4-24ff-4b03-aec7-250ab46fa63c








## Running locally

### Prerequisites
- Node.js ≥ 18.x
- [pnpm](https://pnpm.io/installation)
- Vercel account

# Instructions

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Set local environment variables
``` bash
cp .env.example  .env.local
#fill in each variable with your personal environment keys as needed
```
4. Install node dependencies and run the application
```bash
rm -rf node_modules
rm -rf .next/
pnpm install
pnpm next build

pnpm dev 
#or
pnpm next start
```

Your app template should now be running on [localhost:3000](http://localhost:3000).



# Appendix
Note: this app was forked from [Vercel Next.js AI Chatbot](https://vercel.com/templates/next.js/nextjs-ai-chatbot)



## Testing

Tests:
```
npx jest tests/codeGen/generateZipFromJSON.test.ts
```

