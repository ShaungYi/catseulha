import { useEffect } from 'react';

const ImagePreloader = ({ images }) => {
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        console.log('Images preloaded successfully!');
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, [images]);

  return null;
};

export default ImagePreloader;