import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, position, contact, salary } = body;
    const employee = await prisma.employee.create({
      data: {
        name,
        position,
        contact,
        salary: salary !== undefined ? parseFloat(salary) : undefined,
      },
    });
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
