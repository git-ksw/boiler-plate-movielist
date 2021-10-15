import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import {Row} from 'antd'
import GridCards from '../commons/GridCards';
import LoginPage from '../LoginPage/LoginPage';

function LandingPage() {

    const [movies,setMovies] =useState([])
    const [mainMovieImg,setMainMovieImg] =useState(null)
    const [currentPage, setuCrrentPage] = useState(0)
    useEffect(()=>{
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchData(endpoint)
    },[])


    
    const LoadMoreItem =()=>{
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`;
        fetchData(endpoint)
    }
    const fetchData=(data)=>{
        fetch(data)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setMovies([...movies,...res.results])
            if(!mainMovieImg){
                setMainMovieImg(res.results[0])
            }
            setuCrrentPage(res.page)
        })
    }
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
                <div>
                <Row gutter={[16,16]} className="mt-3">
                    {
                        movies && movies.map((item,idx)=>
                        (
                            <React.Fragment key={idx}>
                                <GridCards
                                    image={item.poster_path?
                                    `${IMAGE_BASE_URL}w500${item.poster_path}`:null}
                                    movieId={item.id}
                                    movieName={item.original_title}
                                />
                            </React.Fragment>
                        )
                        )
                        }

                </Row>
                </div>
                <div style={{ textAlign:"center" }}>
                    <button onClick={LoadMoreItem}>Load more</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
