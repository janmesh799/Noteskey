import { Providers } from "@/components/Providers";
import "./globals.css";
import AuthInIt from "@/components/AuthInIt/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>
          <AuthInIt/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
