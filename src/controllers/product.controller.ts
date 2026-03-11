// app/api/product/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { saveFileToVercelBlob } from '@/lib/helper';

import { authenticate } from '@/middleware/auth';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductCategoryPercentages,
  updateProductById,
} from '@/services/product.service';

export async function createProductHandler(req: NextRequest) {
  try {
    const auth = await authenticate();
    if (auth instanceof NextResponse) return auth;

    const formData = await req.formData();

    // Parse product JSON
    const productDataJson = formData.get('productData') as string | null;
    if (!productDataJson) {
      return NextResponse.json(
        { success: false, error: 'No product data provided' },
        { status: 400 },
      );
    }
    const productData = JSON.parse(productDataJson);

    // Handle file
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 },
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files are allowed' },
        { status: 400 },
      );
    }

    // Save the file to Vercel Blob and get the public URL
    const imageUrl = await saveFileToVercelBlob(file);

    const finalProductData = {
      ...productData,
      image: imageUrl, // Use the public URL from Vercel Blob
    };

    const product = await createProduct(finalProductData, auth);

    return NextResponse.json(
      { data: product, message: 'Product created successfully', success: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function getAllProductsHandler() {
  try {
    const { products, total } = await getAllProducts();
    return NextResponse.json(
      { data: products, success: true, total },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function getProductByIdHandler(id: string) {
  try {
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ data: product, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function updateProductHandler(req: NextRequest, id: string) {
  try {
    // Authenticate the request
    const auth = await authenticate();
    if (auth instanceof NextResponse) return auth;

    // Get the product ID from params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 },
      );
    }

    const formData = await req.formData();

    const productDataJson = formData.get('productData') as string | null;
    if (!productDataJson) {
      return NextResponse.json(
        { success: false, error: 'No product data provided' },
        { status: 400 },
      );
    }

    let productData;
    try {
      productData = JSON.parse(productDataJson);
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in productData' },
        { status: 400 },
      );
    }

    // Handle file (optional for updates, unlike create)
    let imagePath: string | undefined;
    const file = formData.get('image') as File | null;
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, error: 'Only image files are allowed' },
          { status: 400 },
        );
      }
      // Save the image file
      imagePath = await saveFileToVercelBlob(file);
    }

    // Prepare final data for update
    const finalProductData = {
      ...productData,
      image: imagePath || productData.image, // Keep existing image if no new file
    };

    // Update the product
    const updatedProduct = await updateProductById(id, finalProductData, auth);

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        data: updatedProduct,
        message: 'Product updated successfully',
        success: true,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Error in updateProductHandler:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function deleteProductHandler(id: string) {
  try {
    const deletedProduct = await deleteProductById(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Product deleted successfully', success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function getCategoryPercentagesHandler() {
  try {
    const productCategoryPercentages = await getProductCategoryPercentages();
    return NextResponse.json(
      { data: productCategoryPercentages, success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
