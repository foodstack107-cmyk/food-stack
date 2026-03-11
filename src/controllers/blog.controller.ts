import { NextRequest, NextResponse } from 'next/server';

import { saveFileToVercelBlob } from '@/lib/helper';

import { authenticate } from '@/middleware/auth';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogTypePercentages,
  updateBlog,
} from '@/services/blog.service';
import { sendEmail } from '@/services/email.service';
import { getSubscribers } from '@/services/subscriber.service';
import { generateBlogEmailTemplate } from '@/templates/blog';

// Create Blog
export async function createBlogHandler(req: NextRequest) {
  try {
    const auth = await authenticate();

    if (auth instanceof NextResponse) return auth;

    const formData = await req.formData();
    const blogDataStr = formData.get('blogData') as string;
    const image = formData.get('image') as File | null;

    const blogData = JSON.parse(blogDataStr);
    let imageUrl = '';

    if (image) {
      imageUrl = await saveFileToVercelBlob(image);
    }
    blogData.image = imageUrl;

    const blog = await createBlog(blogData, auth);
    if (blog) {
      // Send an email to subscribers
      const subscribers = await getSubscribers(); // Get the list of subscribers
      const emails = subscribers.map((subscriber) => subscriber.email); // Extract the emails

      // Loop through each subscriber and send the email
      await Promise.all(
        emails.map(async (email) => {
          const emailContent = generateBlogEmailTemplate({
            recipientName: email,
            blogTitle: blog.title,
            blogDescription: blog.description,
            blogImage: blog.image,
            blogType: blog.blogType,
            blogLink:
              blog.blogType === 'Food'
                ? `${process.env.HOSTED_URL}/food-tips/${blog._id}`
                : `${process.env.HOSTED_URL}/latest-news/${blog._id}`,
          });

          await sendEmail(
            email,
            'New Blog Post',
            emailContent,
            [], // Add attachments or any other options if necessary
          );
        }),
      );
    }
    return NextResponse.json(
      { data: blog, message: 'Blog created successfully', success: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get All Blogs
export async function getAllBlogsHandler() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({ data: blogs, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Get Blog by ID
export async function getBlogByIdHandler(id: string) {
  try {
    const blog = await getBlogById(id);
    if (!blog)
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

    return NextResponse.json({ data: blog, success: true }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Update Blog by ID
export async function updateBlogHandler(req: NextRequest, id: string) {
  try {
    const auth = await authenticate();
    if (auth instanceof NextResponse) return auth;
    const data = await req.formData();

    const blogDataStr = data.get('blogData') as string;
    const image = data.get('image') as File | null;
    const updateData = JSON.parse(blogDataStr);
    let imageUrl = '';
    if (image) {
      imageUrl = await saveFileToVercelBlob(image);
    }
    updateData.image = imageUrl;

    if (!id)
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 },
      );

    const updatedBlog = await updateBlog(id, updateData, auth);
    if (!updatedBlog)
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

    if (updatedBlog) {
      // Send an email to subscribers
      const subscribers = await getSubscribers(); // Get the list of subscribers
      const emails = subscribers.map((subscriber) => subscriber.email); // Extract the emails

      // Loop through each subscriber and send the email
      await Promise.all(
        emails.map(async (email) => {
          const emailContent = generateBlogEmailTemplate({
            recipientName: email,
            blogTitle: updatedBlog.title,
            blogDescription: updatedBlog.description,
            blogImage: updatedBlog.image,
            blogType: updatedBlog.blogType,
            blogLink:
              updatedBlog.blogType === 'Food'
                ? `${process.env.HOSTED_URL}/food-tips/${updatedBlog._id}`
                : `${process.env.HOSTED_URL}/latest-news/${updatedBlog._id}`,
          });

          await sendEmail(email, 'New Blog Post', emailContent, []);
        }),
      );
    }

    return NextResponse.json(
      {
        data: updatedBlog,
        message: 'Blog updated successfully',
        success: true,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// Delete Blog by ID
export async function deleteBlogHandler(id: string) {
  try {
    const deletedBlog = await deleteBlog(id);
    if (!deletedBlog)
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

    return NextResponse.json(
      { message: 'Blog deleted successfully', success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

// get getBlogTypePercentages
export async function getBlogTypePercentagesHandler() {
  try {
    const blogTypePercentages = await getBlogTypePercentages();
    return NextResponse.json(
      { data: blogTypePercentages, success: true },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
