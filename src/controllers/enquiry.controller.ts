import { NextRequest, NextResponse } from 'next/server';

import {
  createEnquiry,
  deleteEnquiryById,
  getAllEnquiries,
  getEnquiryById,
  getWeeklyEnquiryTrend,
} from '@/services/enquiry.service';

// Create Enquiry
export async function createEnquiryHandler(req: NextRequest) {
  try {
    const body = await req.json();

    const enquiry = await createEnquiry(body);
    return NextResponse.json(
      { data: enquiry, message: 'Enquiry created successfully', success: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error('Enquiry creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get All Enquiries
export async function getAllEnquiriesHandler() {
  try {
    const enquiries = await getAllEnquiries();
    return NextResponse.json(
      { data: enquiries, success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get Enquiry by ID
export async function getEnquiryByIdHandler(id: string) {
  try {
    const enquiry = await getEnquiryById(id);
    if (!enquiry)
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    return NextResponse.json({ data: enquiry, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// deleteEnquiryById
export async function deleteEnquiryByIdHandler(id: string) {
  try {
    await deleteEnquiryById(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function getWeeklyEnquiryTrendHandler() {
  try {
    const weeklyEnquiryTrend = await getWeeklyEnquiryTrend();
    return NextResponse.json(
      { data: weeklyEnquiryTrend, success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
