'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const currentImage = images[selectedImage] || '';

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-2 lg:pb-0 lg:w-24 flex-shrink-0">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative flex-shrink-0 aspect-[3/4] w-20 lg:w-full rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === idx
                ? 'border-accent shadow-md'
                : 'border-transparent hover:border-accent/50'
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="h-full w-full object-cover"
            />
            {selectedImage !== idx && (
              <div className="absolute inset-0 bg-white/40 dark:bg-black/40 hover:bg-transparent transition-colors" />
            )}
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark cursor-crosshair">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={currentImage}
              alt={productName}
              className={`h-full w-full object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={{
                transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : 'center center',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {images.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            No Images Available
          </div>
        )}
      </div>
    </div>
  );
}
