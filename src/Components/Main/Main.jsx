import React, { useCallback, useEffect, useState } from 'react';
import GalleryHeader from '../GalleryHeader/GalleryHeader';
import ImageCard from '../ImageCard/ImageCard';
import ImageUpload from '../ImageUpload/ImageUpload';
import { Hourglass } from 'react-loader-spinner';

const Main = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        fetch('/gallery.json') //fetch image from json
            .then(res => res.json())
            .then(data => {
                setImages(data);
                setLoader(!loader);
            });
    }, []);

    const handleDelete = () => {
        const remainingImages = images.filter((image) => {
            return !selectedImages.includes(image);
        })
        setImages(remainingImages);
        setSelectedImages([]);
    }

    const handleNewFile = (event) => {
        const newFile = event.target.files;
        console.log(newFile);
        const newImg = Array.from(newFile).map((file, index) => {
            const id = images.length + index + 1;
            const url = URL.createObjectURL(file);
            return { id, url };
        })
        console.log(newImg);
        setImages([...images, ...newImg]);
        console.log(images);
    }

    const moveImage = useCallback((dragIndex, hoverIndex) => {
        setImages((prevCards) => {
            const cloneCards = [...prevCards];
            const removedItems = cloneCards.splice(dragIndex, 1)[0];
            cloneCards.splice(hoverIndex, 0, removedItems);
            return cloneCards;
        });
    }, [])

    return (
        <div className='py-20 max-w-screen-xl mx-auto '>
            <div className='bg-slate-50 mt-10 p-10 rounded-xl'>
                <GalleryHeader
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    handleDelete={handleDelete}
                />
                {
                    loader ?
                        <div className='flex justify-center items-center py-10'>
                            <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#F87171', '#72a1ed']}
                            />
                        </div> :
                        <div className='grid grid-cols-1 md:grid-cols-5 gap-5 mt-10'>
                            {
                                images.map((image, index) => (
                                    <ImageCard
                                        key={index}
                                        id={image.id}
                                        index={index}
                                        image={image}
                                        selectedImages={selectedImages}
                                        setSelectedImages={setSelectedImages}
                                        moveImage={moveImage}
                                    />
                                ))
                            }
                            <ImageUpload handleNewFile={handleNewFile} />
                        </div>
                }
            </div>
        </div>
    );
};

export default Main;