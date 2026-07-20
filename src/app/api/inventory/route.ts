import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      include: {
        product: { include: { category: true } },
      },
      orderBy: { product: { name: "asc" } },
    });
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity } = body;
    const inventory = await prisma.inventory.upsert({
      where: { productId: parseInt(productId) },
      update: { quantity: parseFloat(quantity) },
      create: { productId: parseInt(productId), quantity: parseFloat(quantity) },
      include: {
        product: { include: { category: true } },
      },
    });
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  }
}
