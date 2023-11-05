import React, { useCallback, useEffect, useState } from 'react';
import Gallery from '../gallery/gallery';

const Main = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    useEffect(()=>{
        fetch('/gallery.json') //fetch image from json
        .then(res=>res.json())
        .then(data=>setImages(data));
    },[]);
    
    const handleDelete = ()=>{
        const remainingImages = images.filter((image)=>{
            return !selectedImages.includes(image.id);
        })
        setSelectedImages([]);
        setImages(remainingImages);
    }

    const moveImage = useCallback((dragIndex, hoverIndex)=>{
        setImages((prevCards)=>{
            const cloneCards = [...prevCards];
            const removedItems = cloneCards.splice(dragIndex, 1)[0];
            cloneCards.splice(hoverIndex, 0, removedItems);
            return cloneCards;
        });
    },[])

    return (
        <div className='py-20 max-w-screen-xl mx-auto '>
            <div className='bg-slate-50 mt-10 p-10 rounded-xl'>
                <div className='md:flex justify-between'>
                    <div className='md:flex gap-5'>
                        {
                            selectedImages.length ===0?
                            <h1 className='text-4xl font-semibold'>Gallery</h1>:
                            <div className='flex items-center gap-5 text-2xl'>
                                <input type="checkbox" name="" checked id=""/>
                                <h1>{`${selectedImages.length} File selected`}</h1>
                            </div>
                        }                            
                    </div>
                    <div>
                        <button onClick={handleDelete} className='text-red-600 font-semibold text-xl hover:text-red-400'>
                            Delete Files
                        </button>
                    </div>
                </div>
                <div>
                    <Gallery setSelectedImages={setSelectedImages} images={images} moveImage={moveImage}/>
                </div>
            </div>
        </div>
    );
};

export default Main;