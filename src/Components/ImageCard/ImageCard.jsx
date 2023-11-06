import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import "../../App.css";

const ImageCard = (props) => {
    const {index, id, image, selectedImages, setSelectedImages, moveImage} = props;
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: "image",
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingReact = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingReact.bottom - hoverBoundingReact.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingReact.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag] = useDrag({
        type: "image",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });
    drag(drop(ref));
    return (
        <div 
            ref={ref} 
            className={
                (index===0?"featured":"")+
                " group relative before:content-[''] before:absolute before:rounded-lg before:transition-colors before:cursor-move"+
                (selectedImages.find(img=>img.id===image.id)?" opacity-100":" hover:opacity-50")
            }
        >
            <img 
                src={image.url} 
                alt="" 
                className={"rounded-xl object-contain border-2 "+ (selectedImages.find((img)=> img.id===image.id) && "opacity-50")}

            />
            <input 
                type="checkbox" 
                name={image.id} 
                id={image.id}
                className={"absolute top-5 left-5 h-5 w-5 group-hover:opacity-100 cursor-pointer "+(selectedImages.find((img)=>img.id === image.id)?"opacity-100":"opacity-0")}
                checked={selectedImages.find((img)=>img.id === image.id)?true:false}
                onChange={()=>{
                    if(selectedImages.find((img)=>img.id === image.id)){
                        setSelectedImages(selectedImages.filter((img)=>img.id!== image.id));
                    }
                    else{
                        setSelectedImages([...selectedImages, image])
                    }
                }}
            />
        </div>
    );
};

export default ImageCard;