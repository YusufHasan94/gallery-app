import React from 'react';
import { FaImage } from "react-icons/fa6";

const ImageUpload = ({ handleNewFile }) => {
    return (
        <div className='w-56 h-56 border-gray-300 border-2 border-dashed rounded-xl flex justify-center items-center'>
            <div className=''>
                <div className='flex flex-col justify-center items-center'>
                    <FaImage className='text-2xl' />
                    <h1 className='text-xl mt-2'>Add Images</h1>
                    <input type="file" name="" id="" className='opacity-0 cursor-pointer' onChange={handleNewFile} />
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;