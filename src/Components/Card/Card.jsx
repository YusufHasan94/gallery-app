import React, { useRef } from 'react';
import {useDrag, useDrop} from "react-dnd";

//Creating image card with sorting options

const Card = ({id, src, index, moveImage}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: "image",
        hover: (item, monitor)=>{
            if(!ref.current){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex){
                return;
            }
            const hoverBoundingReact = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingReact.bottom-hoverBoundingReact.top)/2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y-hoverBoundingReact.top;
            if(dragIndex<hoverIndex && hoverClientY<hoverMiddleY){
                return;
            }
            if(dragIndex>hoverIndex && hoverClientY>hoverMiddleY){
                return;
            }
            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{isDragging}, drag] = useDrag({
        type: "image",
        item: ()=>{
            return {id, index};
        },
        collect: (monitor)=>{
            return{
                isDragging: monitor.isDragging()
            }
        }
    });
    const opacity = isDragging?0:1;
    drag(drop(ref));
    return (
        <div ref={ref} style={{opacity}} className='card'>
            <img src={src} alt="" />
        </div>
    );
};

export default Card;