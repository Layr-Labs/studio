'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import { STAGE1_TEST_PROMPT1, STAGE2_TEST_PROMPT1, STAGE3_TEST_PROMPT1, STAGE3_TEST_PROMPT2 } from '@/tests/prompts/avs';
import { UserIntent } from '@/lib/ai/types';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    
    
    // {
    //   title: 'Generate code for my AVS prototype',
    //   label: `that I can run locally and demo`,
    //   action: `Generate code for my AVS prototype using Hello World example`,
    //   initialIntent: UserIntent.GenerateTaskList
    // },
    
    
    
    // {
    //   title: 'Generate a Design tech spec',
    //   label: `to help define my AVS idea in detail`,
    //   action: `Generate a Design tech spec based on my AVS idea.`,
    //   initialIntent: UserIntent.GenerateDesign
    // },

    

    // {
    //   title: 'Refine an AVS idea',
    //   label: 'Is this a good idea for an AVS? ..',
    //   action:
    //     'I have an idea for an EigenLayer Autonomously Verified Service, but it needs to be refined. Let me tell you more about it, then get your feedback.',
    //   initialIntent: UserIntent.RefineIdea    
    // },
    {
      title: 'Step 1: Refine an AVS idea',
      label: STAGE1_TEST_PROMPT1.substring(0, 80) + '...',
      action: STAGE1_TEST_PROMPT1,
      initialIntent: UserIntent.RefineIdea
    },
    {
      title: 'Step 2: Generate a Design tech spec',
      label: STAGE2_TEST_PROMPT1.substring(0, 80) + '...',
      action: STAGE2_TEST_PROMPT1,
      initialIntent: UserIntent.GenerateDesign
    },
    {
      title: 'Step 3: Generate task list to build my AVS design prototype',
      label: STAGE3_TEST_PROMPT1.substring(0, 80) + '...',
      action: STAGE3_TEST_PROMPT1,
      initialIntent: UserIntent.GenerateTaskList
    },

    {
      title: 'Step 4: Generate code for my AVS based on task list',
      label: STAGE3_TEST_PROMPT2.substring(0, 80) + '...',
      action: STAGE3_TEST_PROMPT2,
      initialIntent: UserIntent.GenerateCode
    },

  ];

  return (
    <div data-testid="suggested-actions" className="grid sm:grid-cols-1 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append(
                {
                  role: 'user',
                  content: suggestedAction.action,
                },
                {
                  body: {
                    initialIntent: suggestedAction.initialIntent,
                  },
                },
              );
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
