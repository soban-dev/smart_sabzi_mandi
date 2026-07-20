import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        supplier: true,
        items: { include: { product: true } },
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(purchases);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { supplierId, date, notes, items } = body;

    const itemsWithTotals = items.map(
      (item: { productId: number; quantity: number; unitPrice: number }) => ({
        productId: parseInt(item.productId as unknown as string),
        quantity: parseFloat(item.quantity as unknown as string),
        unitPrice: parseFloat(item.unitPrice as unknown as string),
        totalPrice:
          parseFloat(item.quantity as unknown as string) *
          parseFloat(item.unitPrice as unknown as string),
      })
    );

    const totalAmount = itemsWithTotals.reduce(
      (sum: number, item: { totalPrice: number }) => sum + item.totalPrice,
      0
    );

    const purchase = await prisma.purchase.create({
      data: {
        supplierId: parseInt(supplierId),
        date: date ? new Date(date) : undefined,
        notes,
        totalAmount,
        items: {
          create: itemsWithTotals,
        },
      },
      include: {
        supplier: true,
        items: { include: { product: true } },
      },
    });

    for (const item of itemsWithTotals) {
      await prisma.inventory.upsert({
        where: { productId: item.productId },
        update: { quantity: { increment: item.quantity } },
        create: { productId: item.productId, quantity: item.quantity },
      });
    }

    return NextResponse.json(purchase, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create purchase" },
      { status: 500 }
    );
  }
}
