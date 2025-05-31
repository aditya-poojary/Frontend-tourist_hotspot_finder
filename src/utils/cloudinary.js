const CLOUDINARY_CLOUD_NAME = "dopkk3ykv";

// Helper function to format image URLs to ensure they're properly displayed
export function getImageUrl(image) {
  if (!image) return "";

  // If the image is already a Cloudinary URL, return it
  if (typeof image === "string" && image.includes("cloudinary.com")) {
    return image;
  }

  // If the image is an object with a URL property, return the URL
  if (image.url) return image.url;

  // If the image is an object with a src property
  if (image.src) {
    // Check if it's already a full URL (Cloudinary or other)
    if (image.src.startsWith("http")) {
      return image.src;
    }

    // Otherwise, assume it's a file name and construct a Cloudinary URL
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1748600592/${image.src}`;
  }

  return "";
}
