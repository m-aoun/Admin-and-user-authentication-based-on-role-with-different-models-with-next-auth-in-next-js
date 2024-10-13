const { auth } = require("@/auth");


export const role= async() =>{
    const session = await auth();
    return session.user.role;
} 