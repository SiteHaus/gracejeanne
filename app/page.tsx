import { Banner } from "@/components/shared/banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bolt } from "lucide-react";
import { HomeHeroButtons } from "@/components/home-hero-buttons";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-[70vh] min-h-[480px] bg-[url('/office.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative w-full bg-linear-to-r from-black/40 via-black/20 to-transparent">
          <div className="flex items-center h-full px-6">
            <div className="flex flex-col text-background w-full max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Care you <span className="text-subtext">can count on</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-white/85">
                From same-day sick visits to long-term wellness plans, OneHealth
                provides warm, personalized healthcare for every member of your
                family — right here in Southern Utah.
              </p>

              <HomeHeroButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Section BELOW hero */}
      <section>
        <Banner
          className="text-sm lg:text-base bg-muted text-primary font-medium text-center py-3"
          content="Dixie Primary Care is now OneHealth Clinics — same trusted team, expanded care."
        />
      </section>

      <div className="bg-white">
        <section className="w-full py-24">
          <div className="flex flex-col max-w-6xl mx-auto gap-6 px-6">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Est. 2006 · St. George, Utah
            </p>
            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl">
              An Evolution of Care, Two Decades in the Making
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 mt-2 text-muted-foreground text-lg">
              <p>
                Since 2006, our mission has been to provide a unique blend of
                internal medicine and personalized attention. For 20 years,
                we've had the privilege of being your medical home as Dixie
                Primary Care. As our community grew, so did our scope. We've
                evolved far beyond a traditional primary care office — managing
                complex chronic conditions, performing specialized procedures,
                and offering wellness care for every stage of life.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 w-full py-24">
          <div className="flex flex-col max-w-6xl mx-auto gap-12 px-6">
            <div className="w-full text-center">
              <h2 className="text-sm font-semibold text-primary">
                OUR PHILOSOPHY
              </h2>
              <h1 className="font-bold mt-4 text-4xl md:text-5xl lg:text-6xl">
                Why OneHealth?
              </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center lg:items-stretch gap-8">
              <Card className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    All-in-one care
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Primary care, specialized wellness, and functional medicine
                    — integrated in one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    Your medical home
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Primary care, specialized wellness, and functional medicine
                    — integrated in one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    Built for growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Evolved to meet the complexity of modern health needs across
                    every stage of life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
