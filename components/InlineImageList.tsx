'use client'

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineImage } from './ChatComponent';

interface InlineImageListProps {
  images: InlineImage[];
  onImageClick?: (image: InlineImage) => void;
}

const InlineImageList = ({ images, onImageClick }: InlineImageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imgErrors, setImgErrors] = useState<{[key: number]: boolean}>({});

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleImageError = (index: number) => {
    setImgErrors(prev => ({ ...prev, [index]: true }));
    console.error(`Failed to load image at index ${index}`);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="min-w-[260px] h-[150px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer relative"
            onClick={() => onImageClick?.(image)}
          >
            {!imgErrors[index] ? (
              <Image
                src={image.thumbnail || image.original}
                alt={image.title}
                fill
                sizes="260px"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-110"
                onError={() => handleImageError(index)}
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <p className="text-white text-sm p-4 text-center">图片加载失败</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white text-sm font-medium line-clamp-2">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      {images.length > 3 && (
        <>
          <button 
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 w-8 h-8 rounded-full flex items-center justify-center text-white z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 w-8 h-8 rounded-full flex items-center justify-center text-white z-10"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default InlineImageList;
