import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/shell/TopBar";
import MobileTabBar from "@/components/shell/MobileTabBar";
import CommandPalette from "@/components/shell/CommandPalette";
import CloudSync from "@/components/CloudSync";
import PageFrame from "@/components/shell/PageFrame";
import { THEME_INIT_SCRIPT } from "@/components/shell/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata = {
  title: "PrepHub — Interview Prep",
  description: "Learn, practise and track your interview loop — Full-Stack (Go + Next.js)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Static string, no user input: sets data-theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main className="flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-16 md:pt-8">
              <PageFrame>{children}</PageFrame>
            </main>
          </div>
        </div>
        <MobileTabBar />
        <CommandPalette />
        <CloudSync />
      </body>
    </html>
  );
}
