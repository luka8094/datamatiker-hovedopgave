import fs from 'fs'
import AWS from "aws-sdk"
const {
    AWS_A, 
    AWS_K, 
    AWS_BUCKET, 
    AWS_REGION
} = process.env

AWS.config.update({
    accessKeyId: AWS_A,
    secretAccessKey: AWS_K
})

const s3 = new AWS.S3({region: AWS_REGION})

export const uploadFile = async (filename, filenameAlias) => {

    const localFile = fs.readFileSync(filename)

    const params = {
        Bucket: AWS_BUCKET,
        Key: filenameAlias,
        Body: localFile
    }

    const upload = await s3.putObject(params).promise()

    if(upload) return true
}