export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}
export const formatAndValidatePrice = (price: string | number) => {
  const formattedPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(formattedPrice)) {
    throw new Error('Invalid price value.');
  }
  return formattedPrice;
};

// export async function saveFileToVercelBlob(file: File, ): Promise<string> {
//   try {
//     const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${file.name}`;

//     // Get the token from environment variables
//     const token = process.env.BLOB_READ_WRITE_TOKEN;

//     if (!token) {
//       throw new Error('Vercel Blob token is missing');
//     }

//     const blob = await put(uniqueName, file.stream(), {
//       access: 'public',
//       token: token,
//     });

//     // Return the public URL of the uploaded file
//     return blob.url;
//   } catch (error) {
//     console.error('Error uploading file to Vercel Blob:', error);
//     throw new Error('Failed to upload file');
//   }
// }

import { put } from '@vercel/blob';
import sharp from 'sharp';
import { Readable } from 'stream';

export async function saveFileToVercelBlob(file: File): Promise<string> {
  try {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}-${file.name.split('.').slice(0, -1).join('.')}.webp`;

    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      throw new Error('Vercel Blob token is missing');
    }

    // Convert the image to WebP using sharp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const webpBuffer = await sharp(buffer).webp({ quality: 100 }).toBuffer();

    const webpStream = Readable.from(webpBuffer);

    const blob = await put(uniqueName, webpStream, {
      access: 'public',
      token: token,
    });

    return blob.url;
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    throw new Error('Failed to upload file');
  }
}
