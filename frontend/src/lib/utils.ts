import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates an image element from a source URL
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

/**
 * Gets the cropped image as a blob URL
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // Set canvas dimensions
  canvas.width = safeArea;
  canvas.height = safeArea;

  // Translate to center of the canvas
  ctx.translate(safeArea / 2, safeArea / 2);
  
  // Rotate the canvas
  ctx.rotate((rotation * Math.PI) / 180);
  
  // Draw the image centered on the canvas
  ctx.drawImage(
    image,
    -image.width / 2,
    -image.height / 2,
    image.width,
    image.height
  );

  // Get the pixel data from the rotated image
  const data = ctx.getImageData(0, 0, safeArea, safeArea);
  
  // Set canvas dimensions to the desired size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Paste the rotated image at the center of the canvas
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );

  // Return as a blob URL
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/jpeg', 0.9);
  });
}
