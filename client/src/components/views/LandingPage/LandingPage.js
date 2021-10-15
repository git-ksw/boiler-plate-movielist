import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {

    const [movies,setMovies] =useState([])
    const [mainMovieImg,setMainMovieImg] =useState(null)
    useEffect(()=>{
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setMovies([res.results])
            setMainMovieImg(res.results[0])
        })
    },[])
    return (
        <>
            <div className="">
                {
                    mainMovieImg&&
                    <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${mainMovieImg.backdrop_path}`}
                    title={mainMovieImg.original_title}
                    text={mainMovieImg.overview}
                    />
                }
            </div>
        </>
    )
}

export default LandingPage
