import React from 'react';
import images from './importImages';

const YourComponent: React.FC = () => {
    return (
        <div>
            {images.map((image, index) => (
                <img key={index} src={image} alt="" />
            ))}
        </div>
    );
};

export default YourComponent;

