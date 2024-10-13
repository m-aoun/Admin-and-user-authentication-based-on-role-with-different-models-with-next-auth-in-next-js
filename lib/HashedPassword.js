const bcrypt = require("bcryptjs");

export const HashedPassword = async (password) => {
    const salt = 12 ;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const ComparePassword = async (password, hashedPassword) => {
   
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch);
    return isMatch;
}