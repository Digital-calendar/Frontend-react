import axios from "axios";

export async function downloadFiles(fileName) {

    console.log(fileName);

    const url = '/api/files/download/' + fileName;
    const method = 'GET';

    axios.request({
        url,
        method,
        responseType: 'blob'
    })
        .then(({data}) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
}
