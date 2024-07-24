// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/app/header";
import ClientWrapper from "./ClientWrapper";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brain Quiz",
  description: "Website to refresh your brain and learn at the same time",
};

export default function RootLayout({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <ClientWrapper defaultContent={children} quizContent={quiz} />
        </ThemeProvider>
      </body>
    </html>
  );
}
