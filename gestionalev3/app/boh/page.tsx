'use client'
import { useState } from 'react';

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('actualFile', selectedFile);

      try {
        const response = await fetch('/api/insert', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Failed to upload file:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
