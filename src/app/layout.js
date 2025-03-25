// "use client"

import "./globals.css";
import UiProvider from "./components/UiProvider";

import StoreProvider from "./components/StoreProvider";
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UiProvider>
          <StoreProvider>{children}</StoreProvider>
          <Toaster/>
          
        </UiProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
