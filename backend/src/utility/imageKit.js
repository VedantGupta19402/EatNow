const ImageKit = require("imagekit");//cloud storage he tu file upload krega or url dega
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
async function uploadFile(file, file_name) {
    const data = await imagekit.upload({
        file: file,
        fileName: file_name,
    })
    return data.url;
}
module.exports = {
    uploadFile
}