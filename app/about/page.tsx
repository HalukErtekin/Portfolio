import Link from "next/link";
import Script from "next/script";
import { Navigation } from "../components/nav";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Haluk Ertekin",
  jobTitle: "Software Developer",
  url: "https://halukertekin.com",
  image: "https://halukertekin.com/og.png",
  sameAs: [
    "https://github.com/HalukErtekin",
    "https://twitter.com/haluk_ertekin",
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 text-zinc-100">
      <Navigation />
      <main className="px-6 py-24 mx-auto max-w-4xl space-y-12 lg:px-8">
        <section className="space-y-6">
          <h1 className="text-4xl font-display font-bold">About Me</h1>
          <div className="mt-4 space-y-4 text-base leading-7 text-zinc-400">
            <p>
              Bilgisayar Muhendisligi ogrencisi olarak yapay zeka, backend
              gelistirme, veri bilimi, veritabani tasarimi ve gomulu sistemler
              alanlarinda projeler uretiyorum. El yazisi tanima ve yazar kimlik
              dogrulama sistemi, AES-256 sifrelemeli guvenli mesajlasma
              uygulamasi, lityum-iyon batarya yaslanma analizi, robotik yilan
              kontrol sistemi ve kurumsal vize basvuru veritabani gibi farkli
              disiplinlerde calismalar gelistirdim.
            </p>
            <p>
              Akademik projelerimin yaninda web altyapisi, otomasyon ve sunucu
              yonetimi tarafinda da aktif olarak calisiyorum. Kendi portfoy
              sitemi AWS EC2 uzerinde yonettigim Linux ortaminda barindiriyor;
              Nginx, GitHub Actions ve basit otomasyon scriptleriyle dagitim
              surecini yonetiyorum. Oracle SQL &amp; PL/SQL, Python, Next.js, Go,
              Flutter, sensor tabanli gomulu sistemler ve veri analitigi
              araclariyla uretken kalmaya ozen gosteriyorum.
            </p>
            <p>
              Hedefim, yapay zeka, guvenlik, veri analizi ve backend alanlarini
              birlestirerek olceklenebilir ve teknik olarak saglam cozumler
              ureten bir muhendislik cizgisi olusturmak.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Baglantilar</h2>
          <ul className="grid gap-4 text-base text-zinc-400 sm:grid-cols-2">
            <li>
              <Link
                href="https://github.com/HalukErtekin"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-zinc-600 hover:decoration-white"
              >
                GitHub &mdash; HalukErtekin
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/haluk_ertekin"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-zinc-600 hover:decoration-white"
              >
                Twitter &mdash; @haluk_ertekin
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="underline decoration-zinc-600 hover:decoration-white"
              >
                Iletisim &mdash; halukertekin1907@gmail.com
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Script
        id="person-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
