import Footer from "@/components/Footer";
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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <script
        async
        defer
        data-website-id="02b3fc4e-72fc-4d4b-b728-26040fdf6bd8"
        src="https://umami.lxythan2lxy.cn/umami.js"
      ></script>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
