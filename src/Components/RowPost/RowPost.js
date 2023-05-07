import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl, API_KEY } from '../../Constants/constant'
import Youtube from 'react-youtube'

function RowPost(props) {
    let [original, setOriginal] = useState([])
    let [urlId, setUrlId] = useState({})

    useEffect(() => {
        axios.get(props.url)
            .then((response) => {
                setOriginal(response.data.results)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleMovieTrailer = (movieId) => {
        console.log(movieId);
        axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
            .then((response) => {
                if (response.data.results.length !== 0) {
                    setUrlId(response.data.results[0])
                }
            })
    }

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {
                    original.map((obj, index) => {
                        return (
                            <img onClick={() => handleMovieTrailer(obj.id)} key={index} className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="" />
                        )
                    })
                }
            </div>
            {
                urlId &&  <  Youtube videoId={urlId.key} opts={opts} />
            }
           
        </div>
    )
}

export default RowPost


