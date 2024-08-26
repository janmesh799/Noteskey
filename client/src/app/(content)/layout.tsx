import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./Layout.css";  // Import the CSS file

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <nav>
          <Navbar />
        </nav>
        <div className="content">{children}</div>
        <footer className="footer">
          <Footer />
        </footer>
      </main>
    </div>
  );
}
