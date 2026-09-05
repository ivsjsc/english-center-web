import { NextRequest, NextResponse } from "next/server";
import { courseRecommendationService } from "@/lib/recommendation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const results = await courseRecommendationService({
      age: body.age ? parseInt(body.age, 10) : undefined,
      currentLevel: body.currentLevel,
      learningGoal: body.learningGoal,
      learningFormat: body.learningFormat,
      province: body.province,
    });

    return NextResponse.json({ courses: results.slice(0, 4) });
  } catch (error) {
    console.error("Recommendation API error:", error);
    return NextResponse.json(
      { error: "Failed to compute recommendations" },
      { status: 500 }
    );
  }
}
