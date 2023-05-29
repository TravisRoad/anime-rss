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
