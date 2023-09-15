import { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Webcam from "react-webcam"
import {useStore} from "../../store/store"

export const CustomWebcam = () => {
    const webcamRef = useRef(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [mirrored, setMirrored] = useState(false);
    const setImageData = useStore(state => state.setImageData)
    const imageData = useStore(state => state.imageData)

    const captureImage = useCallback(() => {
        const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc)
    }, [webcamRef]) 
    
      const retakeImage = () => {
    setImgSrc(null);
      };
    
    useEffect(() => {
        if (imgSrc !== null) {
            setImageData(imgSrc)
        }
    }, [imgSrc, setImageData])
    
    useEffect(() => {
        console.log("imgSrc: ", imgSrc)
        console.log("imageData: ", imageData)
    },[imgSrc, imageData])

    return (
        <div>
            {imgSrc ? <Image src={imgSrc} height={600} width={400} alt="captured image" /> : 
                <div>
                <Webcam height={600} width={400} ref={webcamRef} mirrored={mirrored} screenshotFormat="image/jpeg" />
                <div>
          <input
            type="checkbox"
            checked={mirrored}
            onChange={(e) => setMirrored(e.target.checked)}
          />
          <label>Mirror</label>
                    </div>
                    </div>
                }
            <div>
                {!imgSrc ? <button onClick={captureImage}>Capture Photo</button> :
                <button onClick={retakeImage}>Retake Photo</button>}
            </div>
        </div>
    )
}