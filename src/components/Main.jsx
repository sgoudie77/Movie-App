import axios from 'axios'
import React, { useEffect, useState } from 'react'
import requests from '../Requests' 
// import Modal from './Modal'
// import { CgDetailsMore } from 'react-icons/cg'
import moment from 'moment';

const Main = () => {
    const [movies, setMovies] = useState([]);
  
    const movie = movies[Math.floor(Math.random() * movies.length)]

    // const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results)
        })
    }, [])
    // console.log(movie)

    const truncateString = (str, num) => {
        if(str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    return (
    <div className='w-full h-screen text-white'>
        <div className='w-full h-full'>
            <div className='absolute w-full h-full bg-gradient-to-r from-black'></div>
            <img 
                className='w-full h-full object-cover' 
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
                alt={movie?.title} 
            />
            <div className='absolute w-full top-[35%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
                {/* <div className='my-4 flex'>
                    <h2 className='text-3xl md:text:4xl font-bold'>More Info: </h2>
                    <button className='border text-white border-gray-300 py-2 px-4 ml-2'>
                        <CgDetailsMore
                            className='openModalBtn text-xl'  
                            onClick={(e) => {
                                e.preventDefault({movie});
                                setOpenModal(true);
                            }}
                        />
                        {openModal && <Modal closeModal={setOpenModal} item={movie} />}
                    </button>
                    <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
                        Watch Later
                    </button>
                </div> */}
                <p className='text-gray-400 text-sm pb-2 pt-2'>
                    Released: {moment(movie?.release_date).format('MMM DD, YYYY')}
                </p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                    {truncateString(movie?.overview, 150)}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main