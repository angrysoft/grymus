export const metadata = {
  title: 'Logowanie',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
