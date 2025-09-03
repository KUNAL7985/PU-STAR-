import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Faculty from '../models/Faculty.js';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/faculty_galaxy';

const facultyData = [
  {
    name: 'Dr. Alice Verma',
    about: 'Expert in Distributed Systems and Cloud Computing. Loves mentoring hackathon teams.',
    roomNo: 'B-302',
    cabinNo: 'C-12',
    subjects: ['Distributed Systems', 'Cloud Computing'],
    certificates: [{ title: 'AWS Educator', issuer: 'Amazon', year: 2023 }],
    awards: ['Best Teacher 2024'],
    email: 'alice.verma@univ.edu',
    phone: '+91-90000-00001',
    officeHours: 'Mon/Wed 2-4 PM',
    researchAreas: ['Microservices', 'Kubernetes'],
    social: { linkedin: 'https://linkedin.com/in/aliceverma', github: 'https://github.com/alicev' },
    projects: ['K8s Cost Optimizer'],
    publications: ['Verma A. "Scaling Microservices" 2024']
  },
  {
    name: 'Prof. Bharat Singh',
    about: 'Database systems and optimization.',
    roomNo: 'A-110',
    cabinNo: 'A-2',
    subjects: ['DBMS', 'SQL', 'NoSQL'],
    certificates: [{ title: 'MongoDB Associate', issuer: 'MongoDB', year: 2022 }],
    awards: ['Data Ninja Award'],
    email: 'bharat.singh@univ.edu',
    phone: '+91-90000-00002',
    officeHours: 'Tue/Thu 11-1 PM',
    researchAreas: ['Query Optimization', 'Storage Engines'],
    social: { linkedin: 'https://linkedin.com/in/bharats' },
    projects: ['Adaptive Indexing'],
    publications: []
  },
  {
    name: 'Dr. Charu Nair',
    about: 'AI/ML researcher focusing on trustworthy AI.',
    roomNo: 'C-221',
    cabinNo: 'C-5',
    subjects: ['Machine Learning', 'Deep Learning', 'AI Ethics'],
    certificates: [{ title: 'TensorFlow Developer', issuer: 'Google', year: 2023 }],
    awards: ['AI Ethics Grant'],
    email: 'charu.nair@univ.edu',
    phone: '+91-90000-00003',
    officeHours: 'Fri 10-12 AM',
    researchAreas: ['Explainability', 'Robustness'],
    social: { twitter: 'https://twitter.com/charu_ai' },
    projects: ['XAI Toolkit'],
    publications: []
  },
  {
    name: 'Prof. Dev Kapoor',
    about: 'Frontend wizard and UI/UX enthusiast.',
    roomNo: 'D-105', cabinNo: 'D-1',
    subjects: ['Web Dev', 'React', 'UX'],
    certificates: [{ title: 'Meta Front-End Cert', issuer: 'Meta', year: 2024 }],
    awards: ['Design Excellence'],
    email: 'dev.kapoor@univ.edu', phone: '+91-90000-00004',
    officeHours: 'Mon 3-5 PM',
    researchAreas: ['Design Systems', 'Accessibility'],
    social: { github: 'https://github.com/devk' },
    projects: ['Color-Contrast Auditor'],
    publications: []
  },
  {
    name: 'Dr. Eva Thomas',
    about: 'Cybersecurity and networks.',
    roomNo: 'E-410', cabinNo: 'E-9',
    subjects: ['Network Security','Cryptography'],
    certificates: [{ title: 'CEH', issuer: 'EC-Council', year: 2022 }],
    awards: ['Cyber Shield'],
    email: 'eva.thomas@univ.edu', phone: '+91-90000-00005',
    officeHours: 'Wed 9-11 AM',
    researchAreas: ['Zero Trust', 'SDN'],
    social: {}, projects: ['IDS using eBPF'], publications: []
  },
  { name: 'Prof. Farhan Ali', about: 'Operating systems.' , roomNo:'F-101', cabinNo:'F-2', subjects:['OS','C'], certificates:[], awards:[], email:'farhan.ali@univ.edu', phone:'+91-90000-00006', officeHours:'Tue 2-4 PM', researchAreas:['Schedulers'], social:{}, projects:[], publications:[] },
  { name: 'Dr. Gita Rao', about: 'Data Science and Visualization', roomNo:'G-207', cabinNo:'G-3', subjects:['Python','Data Viz'], certificates:[], awards:['Teacher of the Year'], email:'gita.rao@univ.edu', phone:'+91-90000-00007', officeHours:'Thu 1-3 PM', researchAreas:['Visualization'], social:{}, projects:['VizLab'], publications:[] },
  { name: 'Prof. Hari Menon', about: 'Compilers and PL', roomNo:'H-312', cabinNo:'H-6', subjects:['Compilers','Java'], certificates:[], awards:[], email:'hari.menon@univ.edu', phone:'+91-90000-00008', officeHours:'Mon 10-12 AM', researchAreas:['Type Systems'], social:{}, projects:[], publications:[] },
  { name: 'Dr. Ishita Bose', about: 'Software Engineering', roomNo:'I-220', cabinNo:'I-4', subjects:['SE','Agile'], certificates:[], awards:[], email:'ishita.bose@univ.edu', phone:'+91-90000-00009', officeHours:'Fri 2-4 PM', researchAreas:['DevOps'], social:{}, projects:[], publications:[] },
  { name: 'Prof. Jatin Shah', about: 'Networks', roomNo:'J-118', cabinNo:'J-1', subjects:['CN','SDN'], certificates:[], awards:[], email:'jatin.shah@univ.edu', phone:'+91-90000-00010', officeHours:'Wed 3-5 PM', researchAreas:['Routing'], social:{}, projects:[], publications:[] },
  { name: 'Dr. Kavya Iyer', about: 'HCI', roomNo:'K-205', cabinNo:'K-2', subjects:['HCI','UX'], certificates:[], awards:[], email:'kavya.iyer@univ.edu', phone:'+91-90000-00011', officeHours:'Tue 10-12 AM', researchAreas:['AR/VR'], social:{}, projects:[], publications:[] },
  { name: 'Prof. Lakshya Jain', about: 'AI Systems', roomNo:'L-411', cabinNo:'L-7', subjects:['AI','DSA'], certificates:[], awards:[], email:'lakshya.jain@univ.edu', phone:'+91-90000-00012', officeHours:'Thu 10-12 AM', researchAreas:['Accelerators'], social:{}, projects:[], publications:[] }
];

async function run() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({});
  await Faculty.deleteMany({});
  const facs = await Faculty.insertMany(facultyData);

  // Map first two users to first two faculty
  const [f1, f2] = facs;

  const users = [
    { username: 'alice', password: 'Passw0rd!', role: 'faculty', facultyId: f1._id },
    { username: 'bharat', password: 'Passw0rd!', role: 'faculty', facultyId: f2._id },
    { username: 'viewer01', password: 'Passw0rd!', role: 'viewer', facultyId: null },
    { username: 'admin', password: 'Admin@123', role: 'admin', facultyId: null }
  ];

  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    await User.create({ username: u.username, passwordHash: hash, role: u.role, facultyId: u.facultyId });
  }

  console.log('Seeded faculty:', facs.length, 'users:', users.length);
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
