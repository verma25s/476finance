// import the react library
import React from 'react';
// import the image from images library
import images from './importImages';
// fuctional defination of YourComponent(react component)
const YourComponent: React.FC = () => {
    return (
        <div>
            {images.map((image, index) => (
                <img key={index} src={image} alt="" />
            ))}
        </div>
    );
};
// export the YourComponent 
export default YourComponent;

