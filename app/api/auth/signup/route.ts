import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { PrismaClient } from "@prisma/client"

export async function POST(req: Request) {
  const prisma = new PrismaClient()
  
  try {
    const { email, password, name, role } = await req.json()

    // Validate input
    if (!email || !password || !role) {
      await prisma.$disconnect()
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      await prisma.$disconnect()
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split("@")[0],
        role,
      },
    })

    await prisma.$disconnect()

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    await prisma.$disconnect()
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
