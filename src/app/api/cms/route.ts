import { NextResponse } from 'next/server';
import { initialCmsData } from '@/data/initialCmsData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialCmsData,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'CMS verisi başarıyla güncellendi.',
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Geçersiz veri gönderildi.' },
      { status: 400 }
    );
  }
}
