import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Goal from "@/models/Goal";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDb();

    const body = await req.json();
    const goal = await Goal.create({
      ...body,
    });

    return NextResponse.json({ id: goal._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}
