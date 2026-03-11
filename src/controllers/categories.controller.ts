import { NextResponse } from 'next/server';

import { getAllCategories } from '@/services/category.service';

export async function getAllCategoriesHandler() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(
      { data: categories, success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
