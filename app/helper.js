import { RNS3 } from 'react-native-aws3';

import config from './config';

export const prepareAct = (data) => {
    return new Promise((resolve, reject) => {
        if(data.audio_path) {
            var filename = data.audio_path.replace(/^.*[\\\/]/, '')
            uploadFileS3(data.audio_path, 'audios/', filename).then(url => {
                data.audio_url = url
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        } else {
            resolve(data);
        }
    })
}

export const uploadFileS3 = (uri, targetPath, filename) => {
    return RNS3.put({
        uri,
        name: filename,
        type: 'application/octet-stream'
    }, {
        ...config.s3,
        keyPrefix: targetPath
    }).then(response => {
        if (response.status !== 201)
            throw new Error("Failed to upload image to s3");
        console.log(response.body);
        return response.body.postResponse.location
    })
}
