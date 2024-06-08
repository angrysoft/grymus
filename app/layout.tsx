import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grymuś",
  description: "Przedszkole Miejskie nr 16 Grymuś w Otwocku",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      style={{
        scrollBehavior: "smooth",
      }}
    >
      <body
        style={{
          backgroundImage: "url(/images/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </body>
    </html>
  );
}
