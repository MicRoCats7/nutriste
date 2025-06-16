import Sidebar from '@/components/shared/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[1500px] mx-auto p-3.5">
      <section className="flex items-start gap-8 w-full">
        <Sidebar />
        <section className="bg-white w-full rounded-[40px] p-8 overflow-x-hidden mb-10 min-h-screen">
          {children}
        </section>
      </section>
    </main>
  );
}
