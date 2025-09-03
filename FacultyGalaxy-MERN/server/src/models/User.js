import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['viewer', 'faculty', 'admin'], default: 'viewer' },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
