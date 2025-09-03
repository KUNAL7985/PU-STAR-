import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  year: Number
}, { _id: false });

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true, index: 'text' },
  about: String,
  roomNo: String,
  cabinNo: String,
  subjects: [String],
  certificates: [CertificateSchema],
  awards: [String],
  email: String,
  phone: String,
  officeHours: String,
  researchAreas: [String],
  social: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String
  },
  projects: [String],
  publications: [String],
  photo: { data: Buffer, contentType: String } // stored in DB
}, { timestamps: true });

export default mongoose.model('Faculty', FacultySchema);
