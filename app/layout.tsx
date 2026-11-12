import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: { default:"Lagishetty Vigneshwar — Full-Stack Web Developer", template:"%s | Lagishetty Vigneshwar" },
  description: "Portfolio of Lagishetty Vigneshwar, a full-stack web developer in Hyderabad building responsive web applications, business platforms and AI experiences.",
  keywords:["Lagishetty Vigneshwar","Vigneshwar Lagishetty","web developer Hyderabad","full-stack developer","portfolio"],
  authors:[{name:"Lagishetty Vigneshwar"}],
  openGraph:{title:"Lagishetty Vigneshwar — Full-Stack Web Developer",description:"Responsive applications, business platforms and AI experiences.",type:"website",images:["/og.png"]},
  twitter:{card:"summary_large_image",title:"Lagishetty Vigneshwar — Full-Stack Web Developer",description:"Responsive applications, business platforms and AI experiences.",images:["/og.png"]},
  robots:{index:true,follow:true},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
