'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CustomWebcam } from '@/components/customWebcam/CustomWebcam'
import { FacialRecognition } from '@/components/facialRecognition/FacialRecognition'
import { UploadPhoto } from '@/components/uploadPhoto/UploadPhoto'

export default function Home() {
  const [photos, setPhotos] = useState([])
  const [addPhoto, setAddPhoto] = useState(false)

  function fetchData() {
    fetch("http://localhost:5273/photos")
      .then(response => response.json())
      .then(data => setPhotos(data))
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <main className="container mx-auto">
      <h1 className="text-5xl">Melos Facial Recognition</h1>

      {photos && photos.map(photo => (
        <div key={photo.id}>
          <Image src={`data:image/jpeg;base64,${photo.imageData}`} width={200} height={200} alt={photo.name} />
        </div>
      ))}
      <div>
        <UploadPhoto />
        <FacialRecognition />
      </div>
      <div>
        <button onClick={() => setAddPhoto(!addPhoto)}>Add Photo</button>
      </div>
      {addPhoto && <CustomWebcam />}
    </main>
  )
}
