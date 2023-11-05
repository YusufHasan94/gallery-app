import { useState } from "react";
import "./Gallery.css";
import { FaImage } from "react-icons/fa6";
import Card from "../Card/Card";

//creating image gallery 

const Gallery = ({ setSelectedImages, images, moveImage }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelected = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(imgId => {
                imgId !== id
            }));
        }
        else {
            setSelectedItems([...selectedItems, id]);
        }
    }
    setSelectedImages(selectedItems);

    return (
        <div >
            <div className='grid grid-cols-5 col gap-5 py-10'>
                {
                    images.map((image, index) => (
                            <div key={image.id} className={"rounded-xl overflow-hidden relative hover:z-10 hover:opacity-50 border-gray-300 border-2" +
                                (index === 0 ? " featureImage" : "")}>
                                <input
                                    type="checkbox"
                                    className='absolute top-4 left-4 z-50'
                                    name=""
                                    id=""
                                    onChange={() => handleSelected(image.id)}
                                />
                                <Card
                                    id={image.id}
                                    src={image.url}
                                    index={index}
                                    moveImage={moveImage}
                                />
                            </div>
                    ))
                }
                {
                    <div className='w-full border-gray-300 border-2 border-dashed rounded-xl flex justify-center items-center'>
                        <div className=''>
                            <input type="file" name="" id="" className='opacity-0' />
                            <div className='flex flex-col justify-center items-center'>
                                <FaImage className='text-2xl' />
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