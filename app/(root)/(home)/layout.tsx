
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wule",
  description: "Wule",
}


const RootLayout = ({ children }: { children: ReactNode }) => {
    // rgb: 32, 32, 32
    return (
        <div className="h-screen bg-[#202020]">
            {children}
        </div>
    )
}

export default RootLayout;