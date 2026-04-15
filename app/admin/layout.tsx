import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/app/actions/admin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Premium Store',
};

// Force dynamic so we always check auth via cookie
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdmin();
  
  if (!isAuth) {
    redirect('/?admin_login=true');
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-16">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
