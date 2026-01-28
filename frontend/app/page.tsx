"use client";
import { Navbar } from "@/components/shared/Navbar";
import { useEffect } from "react";
import { fetchWithAuth } from "@/lib/api";

export default function Home() {
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const { user } = await fetchWithAuth(
          "https://api.sitehaus.dev/auth/me",
        ).then((r) => r.json());
        console.log(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

<<<<<<< Updated upstream
    fetch();
  }, []);
=======
    fetchUser();
  }, [setUser]);

  console.log(user);
>>>>>>> Stashed changes
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/landing.jpg')",
          }}
        ></div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>

        {/* Subtle vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div
            className="text-7xl md:text-9xl mb-4 tracking-tight"
            style={{
              animation: "fadeInUp 1.2s ease-out forwards",
              opacity: 0,
              animationDelay: "0.2s",
              fontFamily: "'Alex Brush'",
            }}
          >
            Grace Jeanne
          </div>

          <div
            className="text-xl md:text-2xl tracking-[0.3em] font-light uppercase mb-12"
            style={{
              animation: "fadeInUp 1.2s ease-out forwards",
              opacity: 0,
              animationDelay: "0.5s",
            }}
          >
            Photography
          </div>

          <div
            className="w-24 h-[1px] bg-white/40 mx-auto mb-12"
            style={{
              animation: "expandWidth 1s ease-out forwards",
              width: 0,
              animationDelay: "0.8s",
            }}
          ></div>

          <p
            className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed mb-12 font-light"
            style={{
              animation: "fadeInUp 1.2s ease-out forwards",
              opacity: 0,
              animationDelay: "1s",
            }}
          >
            Capturing moments that tell stories. Specializing in portrait,
            lifestyle, and editorial photography with a timeless aesthetic.
          </p>
        </div>
      </section>

      <section className="bg-black py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
                A Fresh Approach To Photography
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We believe great photography goes beyond technical perfection.
                It's about capturing authentic moments, telling compelling
                stories, and creating images that resonate long after the
                shutter clicks.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                  <p className="text-gray-300">
                    Candid, unposed moments that feel natural
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                  <p className="text-gray-300">
                    Creative direction that honors your vision
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
                  <p className="text-gray-300">
                    Timeless editing that enhances without overpowering
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                [Your featured image here]
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Product
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Bring beautiful photography into your everyday life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Calendar Preview */}
            <div className="relative">
              <div className="bg-gray-100 rounded-lg p-8 shadow-lg">
                <div className="bg-white rounded-md overflow-hidden">
                  {/* Calendar Header */}
                  <div className="bg-black text-white text-center py-6">
                    <div className="text-3xl font-bold">JANUARY</div>
                    <div className="text-sm mt-1">2026</div>
                  </div>
                  {/* Calendar Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-xs font-semibold text-gray-500"
                          >
                            {day}
                          </div>
                        ),
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 31 }, (_, i) => (
                        <div
                          key={i}
                          className="aspect-square flex items-center justify-center text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500">
                    [Featured Photo]
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-3xl font-bold mb-4">
                2026 Photography Calendar
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Twelve months of stunning photography to brighten your space.
                Each month features a carefully curated image that captures the
                beauty of the moment.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700">
                    12 premium quality prints
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700">
                    11" x 17" size when open
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700">
                    Spiral bound for easy hanging
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">$29.99</div>
                <div className="text-gray-500">
                  Free shipping on orders over $50
                </div>
              </div>

              <button className="w-full md:w-auto bg-gray-800 text-white px-12 py-4 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
