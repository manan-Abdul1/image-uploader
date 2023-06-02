import axios from 'axios';
import { useEffect, useState } from 'react';

const ImagePreview = ({ email, isFormSubmitted }) => {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/image/${email}`, {
          responseType: 'arraybuffer', // Set the response type to 'arraybuffer' to receive binary data
        });
        
        // Convert the binary data to a Base64-encoded string
        const base64Data = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        
        // Create the data URL
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        
        setImageData(dataUrl);
      } catch (error) {
        console.log(error);
      }
    };

    if (isFormSubmitted && email) {
      fetchImage();
    }
  }, [email, isFormSubmitted]);

  return (
    <div className="image-preview">
      {imageData && <img src={imageData} alt="Uploaded Image" />}
    </div>
  );
};

export default ImagePreview;
