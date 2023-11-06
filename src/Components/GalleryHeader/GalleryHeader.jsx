import React from 'react';

const GalleryHeader = ({selectedImages, setSelectedImages, handleDelete}) => {
    return (
        <div className='flex flex-col md:flex-row gap-5 justify-between'>
            <div className='md:flex gap-5'>
                {
                    selectedImages.length === 0 ?
                        <h1 className='text-3xl font-semibold'>Gallery</h1> :
                        <div className='flex items-center gap-5 text-3xl'>
                            <input
                                type="checkbox"
                                name=""
                                id="" 
                                className='h-5 w-5'
                                checked={selectedImages.length > 0}
                                onChange={() => setSelectedImages([])}
                            />
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
    );
};

export default GalleryHeader;