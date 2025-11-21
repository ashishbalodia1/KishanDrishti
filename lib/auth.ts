import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Simple in-memory user store (will be replaced with real database later)
const users = new Map<string, { id: string; email: string; name: string; password: string; role: string }>()

// Demo users
users.set("farmer@demo.com", { 
  id: "1", 
  email: "farmer@demo.com", 
  name: "Demo Farmer", 
  password: "demo123", 
  role: "user" 
})
users.set("admin@demo.com", { 
  id: "2", 
  email: "admin@demo.com", 
  name: "Demo Admin", 
  password: "admin123", 
  role: "admin" 
})
users.set("dev@demo.com", { 
  id: "3", 
  email: "dev@demo.com", 
  name: "Demo Developer", 
  password: "dev123", 
  role: "developer" 
})

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.get(credentials.email)

        if (!user || user.password !== credentials.password) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}

// Helper function to add users (for signup)
export function addUser(email: string, password: string, name: string, role: string) {
  if (users.has(email)) {
    return { success: false, error: "User already exists" }
  }
  
  const id = Date.now().toString()
  users.set(email, { id, email, name, password, role })
  return { success: true, user: { id, email, name, role } }
}
