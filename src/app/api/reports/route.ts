import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as "sales" | "purchases" | "profit" | null;
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (from) dateFilter.gte = new Date(from);
    if (to) dateFilter.lte = new Date(to);

    if (type === "sales") {
      const sales = await prisma.sale.findMany({
        where: Object.keys(dateFilter).length ? { date: dateFilter } : undefined,
        include: {
          customer: true,
          items: { include: { product: true } },
        },
        orderBy: { date: "desc" },
      });
      const total = sales.reduce((sum, s) => sum + s.totalAmount, 0);
      return NextResponse.json({ sales, total });
    }

    if (type === "purchases") {
      const purchases = await prisma.purchase.findMany({
        where: Object.keys(dateFilter).length ? { date: dateFilter } : undefined,
        include: {
          supplier: true,
          items: { include: { product: true } },
        },
        orderBy: { date: "desc" },
      });
      const total = purchases.reduce((sum, p) => sum + p.totalAmount, 0);
      return NextResponse.json({ purchases, total });
    }

    if (type === "profit") {
      const salesAgg = await prisma.sale.aggregate({
        where: Object.keys(dateFilter).length ? { date: dateFilter } : undefined,
        _sum: { totalAmount: true },
        _count: true,
      });
      const purchasesAgg = await prisma.purchase.aggregate({
        where: Object.keys(dateFilter).length
          ? { date: dateFilter }
          : undefined,
        _sum: { totalAmount: true },
        _count: true,
      });
      const totalSales = salesAgg._sum.totalAmount || 0;
      const totalPurchases = purchasesAgg._sum.totalAmount || 0;
      return NextResponse.json({
        sales: { total: totalSales, count: salesAgg._count },
        purchases: { total: totalPurchases, count: purchasesAgg._count },
        profit: totalSales - totalPurchases,
      });
    }

    return NextResponse.json(
      { error: "Invalid report type. Use sales, purchases, or profit." },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
