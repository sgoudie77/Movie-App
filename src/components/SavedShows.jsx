// import { updateDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'

import Modal from './Modal'
import { CgDetailsMore } from 'react-icons/cg'

const SavedShows = ({item}) => {
    const [movies, setMovies] = useState([]);
    const {user} = UserAuth();

    const [openModal, setOpenModal] = useState(false);

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500; 
    };
    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500; 
    };

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMovies(doc.data()?.savedShows);
        });
      }, [user?.email]);
  
    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID);
            await updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft 
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
                    size={40} 
                />
                <div 
                    id={'slider'} 
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
                >
                    {movies.map((item) => (
                        
                        <div key={item.id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center w-full h-full px-4 text-center'>
                                    {item?.title}
                                </p>
                                {/* <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center w-full h-full px-4 text-center'>
                                    {item?.release_date}
                                </p> */}
                                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 left-4'><AiOutlineClose /></p>

                                    {console.log(item)}
                                <div className='absolute top-3 right-4 text-2xl text-gray-300'> 
                                    <CgDetailsMore
                                        className='openModalBtn'  
                                        onClick={() => {
                                            setOpenModal(true);
                                        }}
                                    />
                                    {openModal && <Modal closeModal={setOpenModal} item={item} />}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <MdChevronRight 
                    onClick={slideRight}
                    className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
                    size={40} 
                />
            </div>
        </>
    )
}

export default SavedShows