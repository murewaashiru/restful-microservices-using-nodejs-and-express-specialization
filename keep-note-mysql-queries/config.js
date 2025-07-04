const config ={
    PORT: process.env.PORT ||3000,
    AUTH_SECRET: process.env.AUTH_SECRET || "secret",
    DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
    DATABASE_USER: process.env.DATABASE_USER || "root",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "Password1!",
    DATABASE_NAME: process.env.DATABASE_NAME || "polyglot_persistence",
}

module.exports = config