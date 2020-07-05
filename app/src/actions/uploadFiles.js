import axios from "axios";
import {eventModel} from "../models/EventModel";

export async function uploadFiles(formData) {

    console.log(formData);
    eventModel.progressUploadFiles = '0%';

    axios.post('/api/files/uploadMultipleFiles', formData, {
        onUploadProgress: progressEvent => {
            eventModel.progressUploadFiles = Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%';
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(res => {
            console.log(res);
        })
        .catch(res => {
            console.log(res);
        });
}
