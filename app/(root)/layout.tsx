import MobileNav from '@/components/MobileNav';
import Sidebar from "@/components/Sidebar";
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loggedIn = { firstName: 'Stephanie', lastName: 'JSM' };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex size-full flex-col">
        <div className="root-layout">
           <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div> <MobileNav /></div>
        </div>
        {children}
      </div>
    </main>
  );
}
