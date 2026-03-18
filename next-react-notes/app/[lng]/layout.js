import "./style.css";
import Sidebar from "@/components/Sidebar";
import { locales } from "@/config.js";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

export default async function RootLayout({ children, params }) {
  const { lng } = await params;
  return (
    <html lang={lng}>
      <body>
        <Providers>
          <div className="container">
            <div className="main">
              <Sidebar lng={lng} />
              <section className="col note-viewer">{children}</section>
            </div>
            <Footer lng={lng} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
