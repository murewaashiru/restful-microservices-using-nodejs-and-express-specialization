const config ={
    PORT: process.env.PORT ||3000,
    AUTH_SECRET: process.env.AUTH_SECRET || "secret",
    CLIENT_ID: process.env.CLIENT_ID || "client_id",
    CLIENT_SECRET: process.env.CLIENT_SECRET || "client_secret"
}

module.exports = config