import React, { useState, useEffect, useRef } from 'react';
import './Movie.css';
import OverlayerCard from '../OverlayCard/OverlayerCard';

function Movies({ movie }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {  // entries parameter is passed by the browser's IntersectionObserver implementation
        // console.log('Enteries ',entries); 
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log(`Image with ID ${movie.id} is now in the viewport!`);
            setIsVisible(true);
            // observerInstance.disconnect(entry.target); 
          }
        });
      },
      {
        rootMargin: '100px', // Preload images slightly before they enter the viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect(imgRef.current); // Clean up(Stop observing once it's Visible)
      }
    };
  }, [movie.id]);

  return (
    <div key={movie.id} className="ImgDiv" id="movies">
      <img
        ref={imgRef}
        className="images"
        src={
          isVisible
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'https://placehold.co/500x750/EEE/31343C?font=playfair-display&text=Loading'
        }
        alt={movie.title || 'Movie'}
        onLoad={()=> console.log('Image Loaded')}
      />
      <div className="overlay">
        <OverlayerCard movie={movie} />
      </div>
    </div>
  );
}

export default Movies;
