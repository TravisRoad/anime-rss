import "./globals.css";

export const metadata = {
  title: "Anime Rss",
  description: "Anime Rss",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
