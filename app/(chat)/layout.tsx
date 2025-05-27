import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
// COMMENTED OUT FOR NON-AUTH MODE - RESTORE FOR AUTHENTICATION
// import { auth } from '../(auth)/auth';
import Script from 'next/script';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // COMMENTED OUT FOR NON-AUTH MODE - RESTORE FOR AUTHENTICATION
  // const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={undefined /* session?.user */} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
