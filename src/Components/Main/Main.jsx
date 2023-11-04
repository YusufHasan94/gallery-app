import React from 'react';
import Gallery from '../gallery/gallery';

const Main = () => {
    return (
        <div className='py-20 max-w-screen-xl mx-auto '>
            <h1 className='text-4xl text-center font-semibold mb-10'>
                Gallery 
            </h1>
            <div className='bg-slate-50 mt-10 p-10 rounded-xl'>
                <div className='md:flex justify-between'>
                    <div className='md:flex gap-5'>
                        <input type="checkbox" name="" id="" />
                        <h1 className='text-xl'>0 File selected</h1>
                    </div>
                    <div>
                        <button className='text-red-600 font-semibold text-xl hover:text-red-400'>
                            Delete Files
                        </button>
                    </div>
                </div>
                <div>
                    <Gallery/>
                </div>
            </div>
        </div>
    );
};

export default Main;