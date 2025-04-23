import CryptoJS from 'crypto-js'

const secretKey = import.meta.env.VITE_SECRET_KEY

// Encrypt a value
export const encrypt = (value) => {
    return CryptoJS.AES.encrypt(value, secretKey).toString()
}

// Decrypt a value
export const decrypt = (encryptedValue) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey)
    return bytes.toString(CryptoJS.enc.Utf8)
}
