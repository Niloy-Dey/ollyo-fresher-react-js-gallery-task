import React, { useState } from 'react';
import Header from './Header';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from './SortableItem';

const Gallery = () => {

    /* Images from Public folder */
    const [images, setImages] = useState([
        'image-11.jpeg',
        'image-1.webp',
        'image-2.webp',
        'image-3.webp',
        'image-4.webp',
        'image-5.webp',
        'image-6.webp',
        'image-7.webp',
        'image-8.webp',
        'image-9.webp',
        'image-10.jpeg',
        // Add more image URLs as needed
    ]);



    const [selectedImages, setSelectedImages] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    

    /* Multiple images selecting functionality */
    const toggleImageSelection = (index) => {
        const updatedSelection = [...selectedImages];

        if (updatedSelection.includes(index)) {
            updatedSelection.splice(updatedSelection.indexOf(index), 1);
        } else {
            updatedSelection.push(index);
        }
        setSelectedImages(updatedSelection);
        setIsAllSelected(updatedSelection.length === images.length);
    };



/* All images selecting checkbox functionality */
const toggleAllImages = () => {
    if (isAllSelected) {
        setSelectedImages([]);
        setIsAllSelected(false);
    } else {
        setSelectedImages([...Array(images.length).keys()]);
        setIsAllSelected(true);
    }
};



    /* Images deleting Functionality */
    const deleteSelectedImages = () => {
        const updatedImages = images.filter((_, index) => !selectedImages.includes(index));
        setImages(updatedImages);
        setSelectedImages([]);
        setIsAllSelected(false);
    };



    /* Drag and Drop Functionality  */
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setImages((items) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                return arrayMove(items, activeIndex, overIndex);
            });
        }
    };

    const totalNumber = selectedImages.length;


    return (
        <div>
            <div className="container mx-auto p-8 rounded bg-white">

                {/* Header Component Here  */}
                <Header
                    totalNumber={totalNumber}
                    deleteSelectedImages={deleteSelectedImages}
                    toggleAllImages={toggleAllImages}
                    isChecked={isAllSelected}
                />
                <hr className="flex-grow my-5" />



                {/* Implementing DND From react DND kit  */}
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={images}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {images.map((image, index) => (
                                <SortableItem
                                    selectedImages={selectedImages}
                                    toggleImageSelection={toggleImageSelection}
                                    key={image}
                                    id={image}
                                    image={image}
                                    images={images}
                                    setImages={setImages}
                                    index={index}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

export default Gallery;





