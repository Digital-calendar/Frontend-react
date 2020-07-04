import axios from "axios";

export async function uploadFiles(formData) {

    console.log(formData);

    axios.post('/api/files/uploadMultipleFiles', formData, {
        onUploadProgress: progressEvent => {
            console.log('Upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%');
        },
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(res => {
            console.log(res);
        })
        .catch(res => {
            console.log(res);
        });
}
