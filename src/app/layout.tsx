import { SHeaderMain } from "@src/components/compound";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import ReactQueryProvider from "@src/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATPL-Task",
  description: "This is a job task of ATPL",
};
export const fetchCache = "force-no-store";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F8FBFF]`}>
        {/* container class */}
        <header className={`flex justify-center items-center bg-[#7F4D4F]`}>
          <div className={`container`}>
            <SHeaderMain />
          </div>
        </header>
        <main className={`flex justify-center items-center mt-3`}>
          <div className={`container`}>
            <ReactQueryProvider>
              <AntdRegistry>{children}</AntdRegistry>
            </ReactQueryProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
