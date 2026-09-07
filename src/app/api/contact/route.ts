import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Lütfen zorunlu alanları doldurunuz.' },
        { status: 400 }
      );
    }

    const newMessage = {
      id: 'msg-' + Date.now(),
      name,
      phone,
      email: body.email || '',
      service: body.service || 'Genel',
      estimatedAmount: body.estimatedAmount || '',
      message,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    return NextResponse.json({
      success: true,
      message: 'İletişim talebiniz başarıyla alındı.',
      data: newMessage,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'İşlem sırasında bir hata oluştu.' },
      { status: 500 }
    );
  }
}
