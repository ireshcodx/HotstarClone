// import React from 'react';
// // import Moana from '../../Assets/Movies/Moana.png'
// import './Movie.css'
// import OverlayerCard from '../OverlayCard/OverlayerCard';
// function Movies({ movie }) {
//     // console.log(movie);
//     return (
//         <div key={movie.id} className='ImgDiv'>
//             <img className="images" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
//             <div className="overlay">
//                 <OverlayerCard  movie={movie}/>
//             </div>
//         </div>
//     )
// }

// export default Movies;

import React, { useState, useEffect, useRef } from 'react';
import './Movie.css';
import OverlayerCard from '../OverlayCard/OverlayerCard';

function Movies({ movie }) {

    const [isVisible, setIsVisible] = useState(false);

    const imgRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log(`Image with ID ${movie.id} is now in the viewport!`);
                        setIsVisible(true);  
                        observer.disconnect(); 
                    }
                });
            },
            {
                rootMargin: '100px', 
            }
        );
        if (imgRef.current) {
            observer.observe(imgRef.current);  
        }
        // Cleanup the observer when the component unmounts
        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [movie.id]);

    return (
        <div key={movie.id} className='ImgDiv' id='movies'>
            <img
                ref={imgRef}
                className="images"
                src={isVisible ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Loading...'}
                alt={movie.title}
            />
            <div className="overlay">
                <OverlayerCard movie={movie} />
            </div>
        </div>
    );
}
export default Movies;