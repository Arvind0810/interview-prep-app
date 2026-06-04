import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Interview Prep Hub — Arvind Sharma",
  description: "Full-Stack Engineer (Go + Next.js) interview preparation hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4 md:p-10 max-w-5xl overflow-x-hidden">
            <div className="prose-section">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
