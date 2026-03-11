import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middleware/auth';
import {
  createFaq,
  deleteFaq,
  getFaqById,
  getFaqs,
  updateFaq,
} from '@/services/faq.service';

// Create FAQ
export async function createFaqHandler(req: NextRequest) {
  try {
    const auth = await authenticate();
    if (auth instanceof NextResponse) return auth;
    const body = await req.json();
    const faq = await createFaq(body, auth);
    return NextResponse.json(
      { data: faq, message: 'FAQ created successfully', success: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get All FAQs
export async function getAllFaqsHandler() {
  try {
    const faqs = await getFaqs();
    return NextResponse.json({ data: faqs, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get FAQ by ID
export async function getFaqByIdHandler(id: string) {
  try {
    const faq = await getFaqById(id);
    if (!faq)
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    return NextResponse.json({ data: faq, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Update FAQ by ID
export async function updateFaqHandler(req: NextRequest, id: string) {
  try {
    const auth = await authenticate();
    if (auth instanceof NextResponse) return auth;
    const body = await req.json();
    const faq = await updateFaq(id, body, auth);
    if (!faq)
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    return NextResponse.json(
      { data: faq, message: 'FAQ updated successfully', success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Delete FAQ by ID
export async function deleteFaqHandler(id: string) {
  try {
    await deleteFaq(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
