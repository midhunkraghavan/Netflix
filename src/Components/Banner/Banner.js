import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../Constants/constant'

function Banner() {
    const [movie, setMovie] = useState({})

    useEffect(() => {
        axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
            setMovie(response.data.results[Math.floor(Math.random() * (20 - 1 + 1)) + 1]);
        })
    }, []);

    return (
        <div style={{ backgroundImage: `url(${imageUrl + movie.backdrop_path})` }}
            className='banner'>
            <div className='content'>
                <h1 className='title'>{movie.original_title}</h1>
                <div className='banner-buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>My List</button>
                </div>
                <h1 className='description'>
                    {movie.overview}
                </h1>
                <div className="fade"></div>
            </div>

        </div>
    )
}

export default Banner