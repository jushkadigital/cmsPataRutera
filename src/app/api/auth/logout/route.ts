import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Build Keycloak logout URL
  const keycloakIssuer = process.env.AUTH_KEYCLOAK_ISSUER;
  const keycloakClientId = process.env.AUTH_KEYCLOAK_ID;
  const postLogoutRedirectUri =
    process.env.NEXT_PUBLIC_AUTH_URL || request.nextUrl.origin;

  // Build the Keycloak logout URL with client_id (works without id_token_hint)
  let logoutUrl = postLogoutRedirectUri;

  if (keycloakIssuer && keycloakClientId) {
    const params = new URLSearchParams({
      client_id: keycloakClientId,
      post_logout_redirect_uri: postLogoutRedirectUri + "/admin",
    });
    logoutUrl = `${keycloakIssuer}/protocol/openid-connect/logout?${params.toString()}`;
  }

  const response = NextResponse.redirect(logoutUrl);

  // Clear all auth-related cookies
  const cookiesToClear = [
    "authjs.session-token",
    "__Secure-authjs.session-token",
    "authjs.callback-url",
    "__Secure-authjs.callback-url",
    "authjs.csrf-token",
    "__Secure-authjs.csrf-token",
    "payload-token",
  ];

  for (const cookieName of cookiesToClear) {
    response.cookies.set(cookieName, "", {
      expires: new Date(0),
      path: "/",
    });
  }

  return response;
}
