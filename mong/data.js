const {mongo_username , mongo_password} = process.env;
export const mongoconnect = `mongodb+srv://abhis12321:${mongo_password}@mongo1.fbw8him.mongodb.net/next?retryWrites=true&w=majority`;