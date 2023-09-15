import { useState } from "react";

export const UploadPhoto = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [photoName, setPhotoName] = useState("");
    const [uploadedPhotoId, setUploadedPhotoId] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (e) => {
        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("photoName", photoName);

        e.preventDefault();
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
            <form action="" encType="multipart/form-data">
                <label htmlFor="photoName">Name</label>
                <input type="text" onChange={(e) => setPhotoName(e.target.value)} />
                <input type="file" onChange={handleFileChange} />
                <button onClick={e => handleUpload(e)}>Upload Photo</button>
            </form>
            {uploadedPhotoId && <p>Uploaded Photo ID: {uploadedPhotoId}</p>}
        </div>
    );
};