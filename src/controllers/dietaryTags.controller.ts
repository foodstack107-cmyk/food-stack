import { NextResponse } from 'next/server';

import { getAllTags } from '@/services/dietary.service';

export async function getAllDietary() {
  try {
    const dietaryTags = await getAllTags();
    return NextResponse.json(
      { data: dietaryTags, success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
