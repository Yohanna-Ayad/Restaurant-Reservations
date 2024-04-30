const ftp = require("basic-ftp");
const { v4: uuidv4 } = require("uuid");
const { Readable } = require("stream");



const Sirv = {
    uploadImage: async (image) => {
        try {
            const img = image;
            const client = new ftp.Client()
            await client.access({
                host: process.env.SIRV_HOST,
                user: process.env.SIRV_USER,
                password: process.env.SIRV_PASSWORD,
            })
    
            const uuid = uuidv4();
    
            await client.upload(Readable.from(img), uuid )
            await client.close()
            return "https://johan22.sirv.com/"+uuid;
        } catch (e) {
            console.error(e);
        }
    },
     replaceImage: async (oldImageUrl, newImage) => {
        try {
            // Remove the existing image
            const oldImageName = oldImageUrl.split('/').pop();
            const client = new ftp.Client();
            await client.access({
                host: process.env.SIRV_HOST,
                user: process.env.SIRV_USER,
                password: process.env.SIRV_PASSWORD,
            });
            await client.remove(oldImageName);
            await client.close();
    
            // Upload the new image
            const client2 = new ftp.Client();
            await client2.access({
                host: process.env.SIRV_HOST,
                user: process.env.SIRV_USER,
                password: process.env.SIRV_PASSWORD,
            });
            const uuid = uuidv4();
            await client2.upload(Readable.from(newImage), uuid);
            await client2.close();
            
            // Return the reference link of the new image
            return "https://johan22.sirv.com/" + uuid;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to replace image");
        }
    }
}


module.exports = Sirv;
