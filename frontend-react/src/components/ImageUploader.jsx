// import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';


const ImageUploader = ({imageContainers, setImageContainers}) => {
  // const [imageContainers, setImageContainers] = useState([{ id: 1, image: null }]);

  const handleAddImage = () => {
    setImageContainers(prev => [
      ...prev,
      { id: Date.now(), file: null, preview: null } // Using timestamp as unique ID
    ]);
  };

  
  const handleRemoveImage = (id) => {
    if (imageContainers.length > 1) {
      setImageContainers(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    if (/^image/.test(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageContainers(prev =>
          prev.map(item =>
            item.id === id ? { 
              ...item, 
              file,
              preview: reader.result 
            } : item
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(imageContainers);
  

  return (
    <div className="container">
      <div className="row">
        {imageContainers.map((item) => (
          <div key={item.id} className="col-sm-3 imgUp">
            <div
              className="imagePreview"
              style={{
                backgroundImage: item.preview ? `url(${item.preview})` : undefined
              }}
            ></div>
            <label className="btn btn-primary">
              Upload
              <input
                type="file"
                name='gallery'
                className="uploadFile img"
                accept=".png, .jpg, .jpeg"
                style={{ width: 0, height: 0, overflow: 'hidden' }}
                onChange={(e) => handleImageChange(e, item.id)}
              />
            </label>
            {imageContainers.length > 1 && (
              <FaTimes
                className="del"
                onClick={() => handleRemoveImage(item.id)}
              />
            )}
          </div>
        ))}
        <FaPlus className="imgAdd" onClick={handleAddImage} />
      </div>
    </div>
  );
};

export default ImageUploader;