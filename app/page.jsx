import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Features from "@/components/layout/Features";
import HowItWorks from "@/components/layout/HowItWorks";
import Pricing from "@/components/layout/Pricing";
import About from "@/components/layout/About";
import Faq from "@/components/layout/Faq";
import InquiryForm from "@/components/forms/InquiryForm";
import AppDownload from "@/components/layout/AppDownload";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-full bg-cream text-ink">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <About />
        <Faq />
        <InquiryForm />
        <AppDownload />
      </main>
      <Footer />
    </div>
  );
}
