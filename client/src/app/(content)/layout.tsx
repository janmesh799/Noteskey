import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen">
      <aside className={`w-64`}>
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col">
        <nav>
          <Navbar />
        </nav>
        <div className="flex-1 p-4">{children}</div>
        <footer className={`p-4`}>
          <Footer />
        </footer>
      </main>
    </div>
  );
}
