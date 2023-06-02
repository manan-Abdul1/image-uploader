import { useState } from 'react';
import axios from 'axios';
import ImagePreview from './components/ImagePreview';

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: null
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileUpload = (event) => {
    setFormData({
      ...formData,
      avatar: event.target.files[0]
    });
  };
  // For using multiple images
  //   const handleFileUpload = (event) => {
  //     const files = Array.from(event.target.files);
  //     setImageFiles(files);
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send the form data and image file
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('avatar', formData.avatar);

    try {
      // Send the form data to the backend server
      const response = await axios.post('http://localhost:5500/api/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsFormSubmitted(true);
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };


  return (
    <div className="form-container">
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" autoComplete='off' name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" autoComplete='off' name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Profile</label>
          <input type="file" id="avatar" name="avatar" onChange={handleFileUpload} accept="image/*" />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="uploaded-images">
        <ImagePreview email={formData.email} isFormSubmitted={isFormSubmitted}/>
        {/* Just to show Single Image Without using api calling */}
        {/* {formData.avatar && (
          <div className="image-preview">
            <img src={URL.createObjectURL(formData.avatar)} alt="Uploaded Image" />
          </div>
        )} */}
      {/* For Displaying more files */}
        {/* {imageFiles.map((file, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(file)} alt={`Image ${index}`} />
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default App;


