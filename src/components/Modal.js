import React from 'react'
import moment from 'moment';

const Modal = ({ closeModal, item }) => {
    return (
        <div className='bg-black/70 fixed top-0 left-0 w-full h-full p-4 z-[9999] flex justify-center items-center text-left'>
            <div className='modalContainer bg-black/80 w-[500px] h-auto relative'>
                <div className='w-[500px] h-[300px]'>
                    <button className='absolute top-0 right-0 text-white pl-2 pr-2 bg-red-600' onClick={()=> closeModal(false)}> X </button>
                    <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path || item?.img}`} />
                </div>
                <div className='w-[500px] h-auto block whitespace-normal'>
                    <h1 className='text-white px-4'>{item?.title}</h1>
                </div>
                <div className='w-[500px] h-auto block whitespace-normal'>
                    <p className='text-gray-400 text-sm px-4 pt-1'>Released: {moment(item?.release_date).format('MMM DD, YYYY')}</p>
                </div>
                <div className='w-[500px] h-auto block whitespace-normal overflow-y-auto'>
                    <p className='text-white text-sm px-4 py-2'>{item?.overview || item?.overivew }</p>
                </div>
            </div>
        </div>
    )
}

export default Modal