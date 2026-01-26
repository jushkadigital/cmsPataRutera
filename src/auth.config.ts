import { NextAuthConfig } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { PayloadAuthjsUser } from "payload-authjs";
import type { User as PayloadUser } from "./payload-types";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends PayloadAuthjsUser<PayloadUser> { }
}

async function refreshAccessToken(token) {
  try {
    const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    const payload = {
      client_id: process.env.AUTH_KEYCLOAK_ID,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken, // Enviamos el token ACTUAL
    };

    if (process.env.AUTH_KEYCLOAK_SECRET) {
      payload.client_secret = process.env.AUTH_KEYCLOAK_SECRET;
    }

    const response = await fetch(url, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: new URLSearchParams(payload as any),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.error("❌ Error en Keycloak Refresh:", refreshedTokens);
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in * 1000),
      // Keycloak devuelve un nuevo refresh token si tienes habilitada la rotación, sino usa el viejo
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log("Error refrescando token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_KEYCLOAK_SECRET,
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {


    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirige a login
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      // ---------------------------------------------------------------
      // FASE 1: Primer inicio de sesión (account existe)
      // ---------------------------------------------------------------
      if (account && profile) {
        return {
          accessToken: account.access_token,
          // Guardamos el refresh token para usarlo después
          refreshToken: account.refresh_token,
          // Calculamos cuándo expira en milisegundos absolutos
          accessTokenExpires: Date.now() + (account.expires_in! * 1000),

          // Datos del usuario
          name: profile.name,
          email: profile.email,
          picture: profile.picture, // o token.picture
          sub: profile.sub
        };
      }

      // ---------------------------------------------------------------
      // FASE 2: Llamadas subsiguientes (account es undefined)
      // ---------------------------------------------------------------

      // Verificamos si el token aún es válido (con un margen de error de 10 seg)
      if (Date.now() < (token.accessTokenExpires - 10000)) {
        return token;
      }

      // ---------------------------------------------------------------
      // FASE 3: El token expiró -> Intentamos renovarlo
      // ---------------------------------------------------------------
      console.log("Token expirado, renovando...");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        // @ts-ignore
        session.user.image = token.picture;

        // Pasamos el token fresco a la sesión
        // @ts-ignore
        session.accessToken = token.accessToken;

        // Pasamos el error al cliente si falló la renovación
        // @ts-ignore
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin",
  },
  debug: process.env.NODE_ENV === "development",
};

