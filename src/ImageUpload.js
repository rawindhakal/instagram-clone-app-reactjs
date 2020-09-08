import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { db, storage } from './firebase'
import firebase from 'firebase';
import './imageupload.css'



function ImageUpload( {username} ) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage]= useState(null);

    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            console.log("image selected",caption)
        }
    }

    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                    setProgress(0);
                    setImage(null);
                    setCaption('');
                })
            }


        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption....." onChange={event => setCaption(event.target.value)} value={caption}>
            </input>
            <input type="file" onChange={handleChange}></input>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
