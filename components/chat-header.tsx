'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useWindowSize } from 'usehooks-ts';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, InfoIcon, GitIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import type { VisibilityType } from './visibility-selector';
import { ModelSelector } from './model-selector';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { HelpCircle, Menu, SquareMenu, Check } from 'lucide-react';
import type { User } from 'next-auth';
import { EIGEN_LAYER_AVS_FORM_URL } from '@/lib/constants';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Github } from 'lucide-react';
import { useTheme } from 'next-themes';

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
  const { setTheme, theme } = useTheme();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-[20px] md:px-[20px] gap-2 justify-between">
      {/* Right-aligned items (moved to the left) */}
      <div className="flex items-center gap-2">
        {/* {!isReadonly && (
          <ModelSelector
            selectedModelId={selectedModelId}
            className="order-5 md:order-4"
          />
        )} */}
         <span className="text-l text-muted-foreground font-large">EigenLayer Studio</span>
         <span className="text-xs text-muted-foreground font-small">(Beta)</span>
         
      </div>

      {/* Centered title */}
      <div className="flex-1 flex justify-center">
       
      </div>

      {/* Left-aligned items (moved to the right) */}
      <div className="flex items-center gap-2">
        {(!open || windowWidth < 768) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className=" md:px-2 px-2 md:h-fit ml-auto md:ml-0"
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
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
        {/* GitHub button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
              onClick={() => window.open('https://github.com/Layr-Labs/studio', '_blank')}
              aria-label="GitHub Repository"
            >
              <GitIcon/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>GitHub Repository</TooltipContent>
        </Tooltip>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
              aria-label="Help / Documentation"
            >
              <Menu size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            
            <DropdownMenuItem onSelect={() => window.open('https://github.com/Layr-Labs/studio?tab=readme-ov-file#instructions', '_blank')}>
              How To Guide
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => window.open('https://github.com/Layr-Labs/studio?tab=readme-ov-file#feedback', '_blank')}>
              Feedback
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Legal</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => window.open('/studio-terms', '_blank')}>
                  EigenLayer Studio Terms of Use
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => window.open('/llm-disclosure', '_blank')}>
                  LLM Disclosure
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => window.open('https://docs.eigenlayer.xyz/eigenlayer/legal/privacy-policy', '_blank')}>
                  EigenLayer Privacy Policy
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => window.open('https://docs.eigenlayer.xyz/eigenlayer/legal/terms-of-service', '_blank')}>
                  EigenLayer Terms of Service
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => setTheme('dark')}>
                  Dark
                  {theme === 'dark' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme('light')}>
                  Light
                  {theme === 'light' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme('system')}>
                  Auto
                  {theme === 'system' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* COMMENTED OUT FOR NON-AUTH MODE - RESTORE FOR AUTHENTICATION */}
        {/* {user && (
          <div className="order-5 md:order-5 mr-2">
            <SidebarUserNav user={user} />
          </div>
        )} */}
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
