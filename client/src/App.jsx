import { useState } from 'react';

function App() {
  const [imageFiles, setImageFiles] = useState();

  // For using multiple images
  //   const handleFileUpload = (event) => {
  //     const files = Array.from(event.target.files);
  //     setImageFiles(files);
  //   };
    const handleFileUpload = (event) => {
      setImageFiles(event.target.files[0]);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };
  
    return (
      <div className="form-container">
        <h2>Register Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="avatar">Avatar</label>
            {/* <input type="file" id="avatar" onChange={handleFileUpload} accept="image/*" multiple /> */}
            <input type="file" id="avatar" onChange={handleFileUpload} accept="image/*" />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="uploaded-images">
        {imageFiles && (
            <div className="image-preview">
              <img src={URL.createObjectURL(imageFiles)} alt="Uploaded Image" />
            </div>
          )}
  
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


export default App
