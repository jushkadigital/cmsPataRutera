"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// 1. Mueve la lógica a un componente interno
function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  useEffect(() => {
    // Automatically trigger Keycloak sign in
    signIn("keycloak", { callbackUrl });
  }, [callbackUrl]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "system-ui, sans-serif"
    }}>
      <p>Redirecting to Keycloak...</p>
    </div>
  );
}

// 2. Tu componente principal (Page) envuelve el contenido en Suspense
export default function SignInPage() {
  return (
    // El fallback se muestra mientras se cargan los searchParams
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
