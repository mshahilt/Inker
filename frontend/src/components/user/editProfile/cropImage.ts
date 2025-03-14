import { Area } from "react-easy-crop";

export const getCroppedImg = async (
    imageSrc: String, 
    croppedAreaPixels: Area
    ):Promise<string> => {
  const image = await createImage(imageSrc as string);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not get canvas context");

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      } else {
        reject(new Error("Canvas toBlob failed"));
      }
    }, "image/jpeg");
  });
};


export function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.src = url;
  
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  }