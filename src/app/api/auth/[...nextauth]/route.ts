// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth" // <--- Importa desde donde inicializaste auth

export const { GET, POST } = handlers
