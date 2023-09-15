import { useState, useEffect } from "react"
import { useStore } from "../../store/store"

export const FacialRecognition = () => {
    const [recognizedName, setRecognizedName] = useState('')
    const imageData = useStore(state => state.imageData)

    
    const handleRecognition = async imageData => {
        try {
            const response = await fetch("http://localhost:5273/recognize", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imageData })
            })
            if (response.ok) {
                const data = await response.json()
                setRecognizedName(data.name)
            } else {
                console.error("Recognition failed");
            }
        }
        catch (error) {
            console.error("Error during facial recognition: ", error)
        }
    }   

    return (
        <div>
            <button onClick={() => handleRecognition(imageData)}>Recognize</button>
            {recognizedName && <h1>Recognized: {recognizedName}</h1>}
        </div>
    )
}