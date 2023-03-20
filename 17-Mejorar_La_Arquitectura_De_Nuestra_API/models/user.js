import mongoose from 'mongoose'

const usersCollection = 'users';
const userSchema = new mongoose.Schema({
	username: {type: String, require: true},
	password: {type: String, require: true},
});

export const model = mongoose.model(usersCollection, userSchema);