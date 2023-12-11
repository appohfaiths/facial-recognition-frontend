'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CustomWebcam } from '@/components/customWebcam/CustomWebcam'
import { FacialRecognition } from '@/components/facialRecognition/FacialRecognition'
import { UploadPhoto } from '@/components/uploadPhoto/UploadPhoto'

export default function Home() {
  const [photos, setPhotos] = useState([])
  const [addPhoto, setAddPhoto] = useState(false)
  const [error, setError] = useState(null)

  function fetchData() {
    fetch("http://localhost:5273/photos")
      .then(response => {
        if (!response.ok) {
          throw new Error("Unable to fetch data. Please try again later.")
        }
        return response.json()
      })
      .then(data => setPhotos(data), setError(null))
      .catch(error => setError(error), console.log(error))
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <main className="container mx-auto">
      <h1 className="text-5xl">Melos Facial Recognition</h1>

      {error && (
        <div className="text-red-500">
          <h2>Error</h2>
          <p>Please try again later.</p>
        </div>
      )}

      {photos && photos.map(photo => (
        <div key={photo.id}>
          <Image src={`data:image/jpeg;base64,${photo.imageData}`} width={200} height={200} alt={photo.name} />
          <h3>Name: ${photo.name}</h3>
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
