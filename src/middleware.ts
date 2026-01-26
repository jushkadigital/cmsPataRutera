
import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // <--- Importa la config ligera
import { NextResponse } from "next/server";

// Inicializamos una instancia separada SOLO para el middleware
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  // Aquí puedes poner tu lógica extra si la necesitas, 
  // pero la lógica de 'authorized' en auth.config.ts ya maneja la protección básica.

  // Ejemplo: Redirección de logout si es necesaria
  if (nextUrl.pathname === "/admin/logout") {
    return NextResponse.redirect(new URL("/api/auth/signout", nextUrl.origin));
  }
});

export const config = {
  // El matcher excluye rutas estáticas y API para no bloquearlas
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
