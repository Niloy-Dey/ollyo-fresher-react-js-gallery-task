import React from 'react';

const Header = ({ totalNumber, deleteImage, isChecked, toggleAllImages }) => {
    console.log("totalNumber", totalNumber)
    return (
        <div>
            <section>
                {totalNumber > 0 ? 
                    <div className='flex justify-between items-center'>
                        <div>
                            <label className='font-bold text-xl '>
                                <input
                                    className='mr-2 w-4 h-4'
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={toggleAllImages}
                                />
                                {totalNumber} File Selected
                            </label>
                        </div>

                        <div>
                            <button onClick={deleteImage} className='text-red-500 font-bold'>Delete Files</button>
                        </div>
                    </div>
                 : 
                    <h3 className='text-xl font-bold'>Gallery</h3>
                }
            </section>
        </div>
    );
};

export default Header;
