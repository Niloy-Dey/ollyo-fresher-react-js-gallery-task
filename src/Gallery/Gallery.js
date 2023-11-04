import React, { useEffect, useState } from 'react';
import Header from './Header';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from './SortableItem';

const Gallery = () => {
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
    const [isChecked, setIsChecked] = useState(false);

    const toggleImageSelection = (index) => {
        console.log('click image')
        const updatedSelection = [...selectedImages];
        if (updatedSelection.includes(index)) {
            updatedSelection.splice(updatedSelection.indexOf(index), 1);
        } else {
            updatedSelection.push(index);
        }
        setSelectedImages(updatedSelection);
        setIsChecked(updatedSelection.length === images.length);
    };

    const toggleAllImages = () => {
        if (selectedImages.length < images.length) {
            setSelectedImages([...Array(images.length).keys()]);
            setIsChecked(true);
        } else {
            setSelectedImages([]);
            setIsChecked(false);
        }
    };

    const deleteSelectedImages = () => {
        const updatedImages = images.filter((_, index) => !selectedImages.includes(index));
        setImages(updatedImages);
        setSelectedImages([]);
        setIsChecked(false);
    };

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

    useEffect(() => {
        setIsChecked(totalNumber > 0);
    }, [totalNumber]);

    return (
        <div>
            <div className="container mx-auto p-8 rounded bg-white">
                <Header
                    totalNumber={totalNumber}
                    deleteImage={deleteSelectedImages}
                />
                
                <hr className="flex-grow my-5" />

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
                                    toggleAllImages={toggleAllImages}
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
