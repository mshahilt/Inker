import { FC } from 'react'
import Cropper from 'react-easy-crop';

interface ImageModalProps {
    image: string | null;
    crop: { x: number; y: number };
    setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    onCropComplete: (croppedArea: any, croppedAreaPixels: { width: number; height: number; x: number; y: number }) => void;
    handleSave: () => void;
    closeModal: () => void;
  }

const ImageModal:FC<ImageModalProps>= ({ 
    image, 
    crop, 
    setCrop, 
    zoom, 
    setZoom, 
    onCropComplete, 
    handleSave, 
    closeModal
 }) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col gap-5
        items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96 h-96 relative">
        <Cropper
          image={image ?? undefined}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
        
      </div>
      <div className="flex justify-between gap-7">
        <button onClick={() => handleSave()} className="bg-blue-800 text-white hover:bg-neutral-300 dark:bg-blue-800 
                    hover:text-gray-700 dark:text-gray-200 rounded-full p-1 dark:hover:bg-gray-800
                     px-4 py-2 cursor-pointer">Save</button>
        <button onClick={() => closeModal()} className="bg-red-800 text-white hover:bg-neutral-300 dark:bg-red-800 
                    hover:text-gray-700 dark:text-gray-200 rounded-full p-1 dark:hover:bg-gray-800 
                     px-4 py-2 cursor-pointer">Cancel</button>
      </div>
    </div>
  )
}

export default ImageModal;