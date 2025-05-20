import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/app/lib/prisma';
import { authOptions } from '@/app/lib/auth';

// Blog yazısı detayı
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        slug: true,
        imageUrl: true,
        published: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true
          }
        },
        author: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    if (!post) {
      return new NextResponse('Blog yazısı bulunamadı', { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Blog yazısı getirme hatası:', error);
    return new NextResponse('Sunucu hatası', { status: 500 });
  }
}

// Blog yazısı güncelleme (Sadece admin)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Bu işlem için admin yetkisi gerekiyor', { status: 403 });
    }

    const { title, content, excerpt, slug, imageUrl, categoryId, published } = await request.json();

    // Validasyonlar
    if (!title || !content || !slug || !categoryId) {
      return new NextResponse('Gerekli alanlar eksik', { status: 400 });
    }

    // Slug kontrolü (kendi ID'si hariç)
    const existingPost = await prisma.blogPost.findFirst({
      where: {
        slug,
        NOT: {
          id: params.id
        }
      }
    });

    if (existingPost) {
      return new NextResponse('Bu URL adresi zaten kullanımda', { status: 400 });
    }

    // Blog yazısını güncelle
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title,
        content,
        excerpt,
        slug,
        imageUrl,
        categoryId,
        published,
        updatedAt: new Date()
      },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        slug: true,
        imageUrl: true,
        published: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true
          }
        },
        author: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Blog yazısı güncelleme hatası:', error);
    return new NextResponse('Sunucu hatası', { status: 500 });
  }
}

// Blog yazısı silme (Sadece admin)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Bu işlem için admin yetkisi gerekiyor', { status: 403 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: params.id }
    });

    if (!post) {
      return new NextResponse('Blog yazısı bulunamadı', { status: 404 });
    }

    await prisma.blogPost.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Blog yazısı silme hatası:', error);
    return new NextResponse('Sunucu hatası', { status: 500 });
  }
} 