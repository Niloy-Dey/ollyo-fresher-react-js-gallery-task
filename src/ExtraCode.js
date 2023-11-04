import React from 'react';

const ExtraCode = () => {
    return (
        <div>
            <div className="container mx-auto p-8 rounded bg-white">
                <Header totalNumber={totalNumber} deleteImage={() => deleteImage(selectedImages)} ></Header>








                {/* Main Gallery Section  */}
                <hr className="flex-grow my-5" />
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Mapping the Images */}
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1' } relative group rounded-lg overflow-hidden`}
                        >


                            {/* Add Images Functionality and checking the last image here */}
                            {index === images.length - 1 ? (
                                <div
                                    className="w-full font-bold text-gray-600 border-dashed border-2 border-indigo-300 h-full bg-white flex items-center justify-center cursor-pointer"
                                    onClick={() => {
                                        // Implement your logic to add an image here
                                        // alert('Add Image Logic');
                                    }}
                                >
                                    Add Images
                                </div>
                            ) : (


                                <>
                                    {/* Checkbox functionality for Every image */}
                                    <div className={`absolute inset-0 bg-gray-700 bg-opacity-0 ${selectedImages.includes(index) ? 'bg-opacity-0' : 'group-hover:bg-opacity-75'} transition duration-300 flex items-center justify-center ${selectedImages.includes(index) ? '' : 'opacity-0 group-hover:opacity-100'}`}>
                                        <input
                                            type="checkbox"
                                            className="w-7 h-7 absolute top-2 left-2"
                                            checked={selectedImages.includes(index)}
                                            onChange={() => toggleImageSelection(index)}
                                        />
                                    </div>
                                    <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={`Image ${index + 1}`} className="w-full h-auto" />
                                </>

                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExtraCode;