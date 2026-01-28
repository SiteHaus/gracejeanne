async function generatePKCE() {
  const verifier = crypto.randomUUID() + crypto.randomUUID();
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return { verifier, challenge };
}

export async function login() {
  if (typeof window === "undefined") return;

  const clientId = process.env.NEXT_PUBLIC_IAM_CLIENT_ID;
  const iamUrl = process.env.NEXT_PUBLIC_IAM_URL;

  if (!clientId || !iamUrl) {
    console.error("Missing IAM configuration");
    alert("Missing IAM configuration - check console"); // Visual feedback
    return;
  }

  const { verifier, challenge } = await generatePKCE();
  const state = crypto.randomUUID();

  sessionStorage.setItem("pkce_verifier", verifier);
  sessionStorage.setItem("oauth_state", state);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${window.location.origin}/auth/callback`,
    response_type: "code",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
    scope: "openid profile email",
  });

  window.location.href = `${iamUrl}/auth/authorize?${params}`;
}
