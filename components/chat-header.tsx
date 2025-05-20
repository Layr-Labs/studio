'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useWindowSize } from 'usehooks-ts';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, InfoIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import type { VisibilityType } from './visibility-selector';
import { ModelSelector } from './model-selector';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import type { User } from 'next-auth';
import { EIGEN_LAYER_AVS_FORM_URL } from '@/lib/constants';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  user,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  user?: User;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-[20px] md:px-[20px] gap-2 justify-between">
      {/* Right-aligned items (moved to the left) */}
      <div className="flex items-center gap-2">
        {(!open || windowWidth < 768) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
                onClick={() => {
                  router.push('/');
                  router.refresh();
                }}
              >
                <PlusIcon />
                <span className="md:sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        )}
        {!isReadonly && (
          <ModelSelector
            selectedModelId={selectedModelId}
            className="order-5 md:order-4"
          />
        )}
      </div>

      {/* Left-aligned items (moved to the right) */}
      <div className="flex items-center gap-2">
       
        {/* <SidebarToggle /> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-3 md:order-2 p-2"
              onClick={() => window.open('https://github.com/wesfloyd/vibe-avs-builder?tab=readme-ov-file#instructions', '_blank')}
              aria-label="Help / Documentation"
            >
              <InfoIcon size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            How To Guide
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-4 md:order-3 p-2"
              onClick={() => window.open(EIGEN_LAYER_AVS_FORM_URL, '_blank')}
            >
              <Image
                src="/images/eigenlayer-logo-simplified.png"
                alt="EigenLayer Logo"
                className="h-6 w-auto"
                width={24}
                height={24}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Contact EigenLayer</TooltipContent>
        </Tooltip>
        {user && (
          <div className="order-5 md:order-5 mr-2">
            <SidebarUserNav user={user} />
          </div>
        )}
      </div>
      {/* 
      // Commenting out until we want to add this functionality in the future: private/public visibility
      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          className="order-1 md:order-3"
        />
      )} */}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.selectedModelId === nextProps.selectedModelId &&
    prevProps.user === nextProps.user
  );
});
