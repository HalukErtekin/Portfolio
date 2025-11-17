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
    <div className="bg-gradient-to-b from-black via-zinc-900/60 to-black text-zinc-100">
      <Navigation />
      <main className="px-6 py-24 mx-auto max-w-4xl space-y-12 lg:px-8">
        <section className="space-y-6">
          <p className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">
            About
          </p>
          <h1 className="text-4xl font-display font-bold">
            About Haluk Ertekin
          </h1>
          <p className="text-lg leading-relaxed text-zinc-300">
            Bilgisayar Mühendisliği öğrencisi olarak AWS, Linux, Nginx, Oracle
            SQL &amp; PL/SQL, C programlama ve siber güvenlik alanlarında üretken
            kalıyorum. Karanlık tema portföyümü tamamen kendi yönettiğim AWS EC2
            altyapısında barındırıyor, sistemd servisleriyle deploy sürecini
            otomatize ediyorum.
          </p>
          <p className="text-lg leading-relaxed text-zinc-300">
            Derslerde öğrendiğim kavramları gerçek projelere dönüştürmek için
            Contentlayer, Next.js ve Tailwind kombinasyonunu kullanıyor, aynı
            zamanda Türkçe ve İngilizce notlar tutarak toplulukla bilgi paylaşıyorum.
            Ağ yönetiminden makine öğrenmesine uzanan bu yolculukta güvenlik
            denetimleri, loglama, otomasyon ve dokümantasyon disiplinini önceliklendiriyorum.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Bağlantılar</h2>
          <ul className="grid gap-4 text-base text-zinc-300 sm:grid-cols-2">
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
                İletişim &mdash; halukertekin1907@gmail.com
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
