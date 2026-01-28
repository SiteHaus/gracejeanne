"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add this

  useEffect(() => {
    async function handleCallback() {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const savedState = sessionStorage.getItem("oauth_state");
        const verifier = sessionStorage.getItem("pkce_verifier");
        const clientId = process.env.NEXT_PUBLIC_IAM_CLIENT_ID;
        const iamUrl = process.env.NEXT_PUBLIC_IAM_URL;

        if (!code || !state || !verifier || !savedState) {
          throw new Error("Missing required OAuth parameters");
        }
        if (!clientId || !iamUrl) {
          throw new Error("Missing IAM configuration");
        }
        if (state !== savedState) {
          throw new Error("Invalid state parameter");
        }

        const response = await fetch(`${iamUrl}/auth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: `${window.location.origin}/auth/callback`,
            code_verifier: verifier,
            client_id: clientId,
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Token exchange failed: ${error}`);
        }

        const tokens = await response.json();
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem(
          "token_expires",
          String(Date.now() + tokens.expires_in * 1000),
        );

        sessionStorage.removeItem("pkce_verifier");
        sessionStorage.removeItem("oauth_state");

        router.push("/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication failed");
      } finally {
        setLoading(false); // Add this
      }
    }

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Spinner className="size-6 text-primary" />
          <p className="mt-4 text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Authentication Error
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return null; // Component will redirect before showing this
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center">
            <Spinner className="size-6 text-white" />
            <p className="mt-4 text-white">Loading...</p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
