import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";

// ADD BLOG
export const addBlog = async (data) => {
  await connectDB();

  const { addBlogTitle, addBlogParagraph, imageBlogURL, promotionPercentage } =
    data;

  if (!addBlogTitle || !addBlogParagraph || !imageBlogURL) {
    throw new Error("All fields are required");
  }

  const blog = await Blog.create({
    addBlogTitle,
    addBlogParagraph,
    imageBlogURL,
    promotionPercentage: promotionPercentage || 0,
  });

  return blog;
};

// GET ALL BLOGS
export const getAllBlogs = async () => {
  await connectDB();
  return await Blog.find();
};

// UPDATE BLOG
export const updateBlog = async (id, data) => {
  await connectDB();

  const updatedBlog = await Blog.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedBlog;
};

// DELETE BLOG
export const deleteBlog = async (id) => {
  await connectDB();
  return await Blog.findByIdAndDelete(id);
};

// UPDATE PROMOTION ONLY
export const updateBlogPromotion = async (blogId, promotion) => {
  await connectDB();

  const blog = await Blog.findById(blogId);
  if (!blog) return null;

  blog.promotionPercentage = promotion;
  await blog.save();

  return blog;
};
