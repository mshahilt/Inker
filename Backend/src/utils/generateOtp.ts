
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 999999) 
}

export default generateOtp