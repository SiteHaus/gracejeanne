import { Star } from "lucide-react";

interface AuthorAttribution {
  displayName?: string;
  photoUri?: string;
  uri?: string;
}

interface Review {
  rating: number;
  text?: { text: string };
  authorAttribution: AuthorAttribution;
  relativePublishTimeDescription: string;
}

interface PlaceData {
  rating: number;
  userRatingCount: number;
  reviews: Review[];
}

const MOCK_DATA: PlaceData = {
  rating: 4.9,
  userRatingCount: 248,
  reviews: [
    {
      rating: 5,
      text: { text: "Dr. Turner is amazing with my kids. Always patient, thorough, and explains everything clearly. We never feel rushed." },
      authorAttribution: { displayName: "Sarah M." },
      relativePublishTimeDescription: "2 weeks ago",
    },
    {
      rating: 5,
      text: { text: "Same-day appointment saved us a trip to urgent care. The staff was incredibly kind and the doctor was very knowledgeable." },
      authorAttribution: { displayName: "James R." },
      relativePublishTimeDescription: "1 month ago",
    },
    {
      rating: 5,
      text: { text: "Best primary care clinic in Southern Utah. They actually take the time to listen. We've been coming here for years and won't go anywhere else." },
      authorAttribution: { displayName: "Lisa K." },
      relativePublishTimeDescription: "3 weeks ago",
    },
    {
      rating: 5,
      text: { text: "Switched to OneHealth after our last doctor retired and couldn't be happier. Friendly front desk, short wait times, great care." },
      authorAttribution: { displayName: "Tom W." },
      relativePublishTimeDescription: "2 months ago",
    },
    {
      rating: 5,
      text: { text: "They fit my daughter in for a sports physical on short notice before her soccer season. Super grateful for the flexibility." },
      authorAttribution: { displayName: "Rachel N." },
      relativePublishTimeDescription: "1 month ago",
    },
  ],
};

async function fetchReviews(): Promise<PlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const isDev = process.env.NODE_ENV === "development";

  if (!apiKey || !placeId) return isDev ? MOCK_DATA : null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount",
        },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return isDev ? MOCK_DATA : null;
    return res.json();
  } catch {
    return isDev ? MOCK_DATA : null;
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i <= rating ? "#FBBC04" : "none"}
          stroke={i <= rating ? "#FBBC04" : "#6b7280"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

interface GoogleReviewsProps {
  count?: number;
}

export default async function GoogleReviews({ count = 5 }: GoogleReviewsProps) {
  console.log("[GoogleReviews] rendering, NODE_ENV:", process.env.NODE_ENV);
  const data = await fetchReviews();
  console.log("[GoogleReviews] data:", data ? `${data.reviews?.length} reviews` : "null");
  if (!data?.reviews?.length) return null;

  const placeId = process.env.GOOGLE_PLACE_ID;
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  const reviews = data.reviews.filter((r) => r.text?.text).slice(0, count);

  return (
    <section className="bg-hero-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">
              Patient Reviews
            </p>
            <h2 className="font-bold text-4xl md:text-5xl text-white">
              What Our Patients Say
            </h2>
          </div>
          <div className="hidden sm:block text-center bg-white/10 border border-white/15 rounded-xl px-5 py-4">
            <p className="text-4xl font-bold text-white leading-none">
              {data.rating.toFixed(1)}
            </p>
            <div className="flex justify-center mt-2">
              <StarRating rating={Math.round(data.rating)} />
            </div>
            <p className="text-xs text-white/50 mt-1.5">
              {data.userRatingCount.toLocaleString()} reviews
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/15 rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                {review.authorAttribution.photoUri && (
                  <img
                    src={review.authorAttribution.photoUri}
                    alt={review.authorAttribution.displayName ?? "Google Reviewer"}
                    className="w-10 h-10 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm text-white">
                    {review.authorAttribution.displayName ?? "Google Reviewer"}
                  </p>
                  <p className="text-xs text-white/50">
                    {review.relativePublishTimeDescription}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-white/75 leading-relaxed line-clamp-5">
                {review.text?.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors border border-white/20 rounded-full px-5 py-2.5 hover:border-white/40"
          >
            See all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
