import { useState } from "react";

export const UploadPhoto = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedPhotoId, setUploadedPhotoId] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("photo", selectedFile);

        try {
            const response = await fetch("http://localhost:5273/upload-photo", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setUploadedPhotoId(data.photoId);
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error during photo upload: ", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Photo</button>
            {uploadedPhotoId && <p>Uploaded Photo ID: {uploadedPhotoId}</p>}
        </div>
    );
};