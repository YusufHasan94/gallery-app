import React, { useEffect, useState } from 'react';
import "./Gallery.css";
import { FaImage } from "react-icons/fa6";

const Gallery = () => {
    const [images, setImages] = useState([]);
    useEffect(()=>{
        fetch('/gallery.json')
        .then(res=>res.json())
        .then(data=>setImages(data));
    },[]);
    return (
        <div >
            <div className='grid grid-cols-5 col gap-5 py-10'>
                {
                    images.map((image, index) => (
                        <div key={image.id} className={"rounded-xl overflow-hidden relative hover:z-10 hover:opacity-50 border-gray-300 border-2"+
                                        (index === 0? " featureImage": "")}>
                            <input type="checkbox" className='absolute top-4 left-4 opacity-0 hover:opacity-100 z-50' name="" id="" />
                            <img src={image.url} alt="" className=''/>
                        </div>
                    ))
                }
                {
                    <div className='w-full border-gray-300 border-2 border-dashed rounded-xl flex justify-center items-center'>
                        <div className=''>
                            <input type="file" name="" id="" className='opacity-0' />
                            <div className='flex flex-col justify-center items-center'>
                                <FaImage className='text-2xl'/>
                                <h1 className='text-xl mt-2'>Add Images</h1>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Gallery;