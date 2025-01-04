const PhotoUpload = ({ onUpload }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      onUpload(file);

    };
  
    return <input type="file" onChange={handleFileChange} />;
  };
  export default PhotoUpload;