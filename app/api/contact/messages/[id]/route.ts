import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/app/lib/prisma';
import { authOptions } from '@/app/lib/auth';

// İletişim mesajı detayı
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Bu işlem için admin yetkisi gerekiyor', { status: 403 });
    }

    const message = await prisma.contactMessage.findUnique({
      where: { id: params.id }
    });

    if (!message) {
      return new NextResponse('Mesaj bulunamadı', { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Mesaj detay hatası:', error);
    return new NextResponse('Sunucu hatası', { status: 500 });
  }
}

// Mesaj güncelleme (okundu durumu)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Bu işlem için admin yetkisi gerekiyor', { status: 403 });
    }

    const { read } = await request.json();

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { read }
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Mesaj güncelleme hatası:', error);
    return new NextResponse('Sunucu hatası', { status: 500 });
  }
}

// Mesaj silme
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Bu işlem için admin yetkisi gerekiyor', { status: 403 });
    }

    await prisma.contactMessage.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Mesaj silme hatası:', error);
    return new NextResponse('Sunucu hatası', { status: 500 });
  }
} 