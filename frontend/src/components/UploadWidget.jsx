import React, { useEffect, useRef } from 'react'

function UploadWidget() {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        console.log("cloudinaryRef", cloudinaryRef.current);
        // widgetRef.current = cloudinaryRef.current.createUploadWidget({
        //     cloudName: 'your-cloud-name',
        //     uploadPreset: 'your-upload'
        // }, function(error,result) {
        //     console.log(result);
        // })
    },[])

  return (
    <button onClick={() => widgetRef.current.open()} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
    </button>
  )
}

export default UploadWidget