import express from 'express';
import Faculty from '../models/Faculty.js';
import { authRequired } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get list (with optional search q) and default 12 cards if no query
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    let docs;
    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), 'i');
      docs = await Faculty.find({
        $or: [
          { name: regex },
          { subjects: regex },
          { researchAreas: regex }
        ]
      }).limit(50);
    } else {
      docs = await Faculty.find().limit(12);
    }
    // Remove heavy photo field list view
    const clean = docs.map(d => ({
      _id: d._id,
      name: d.name,
      about: d.about,
      roomNo: d.roomNo,
      cabinNo: d.cabinNo,
      subjects: d.subjects,
      awards: d.awards,
      researchAreas: d.researchAreas
    }));
    res.json(clean);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Autocomplete suggestions
router.get('/suggest', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) return res.json([]);
    const regex = new RegExp('^' + q.trim(), 'i');
    const results = await Faculty.find({ name: regex }).select('name').limit(10);
    res.json(results.map(r => ({ id: r._id, name: r.name })));
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single faculty (includes photo meta flag)
router.get('/:id', async (req, res) => {
  try {
    const doc = await Faculty.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    const { photo, ...plain } = doc.toObject();
    res.json({ ...plain, hasPhoto: !!(photo && photo.data) });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve photo
router.get('/:id/photo', async (req, res) => {
  try {
    const doc = await Faculty.findById(req.params.id).select('photo');
    if (!doc || !doc.photo || !doc.photo.data) {
      return res.status(404).send('No photo');
    }
    res.set('Content-Type', doc.photo.contentType || 'image/jpeg');
    res.send(doc.photo.data);
  } catch (e) {
    res.status(500).send('Server error');
  }
});

// Update own profile (name, about, etc.). Auth required.
router.put('/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    // Only the owner (matching facultyId) or admin may edit
    if (String(req.user.facultyId) !== String(id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const allowed = ['about','roomNo','cabinNo','subjects','certificates','awards','email','phone','officeHours','researchAreas','social','projects','publications'];
    const update = {};
    for (const key of allowed) if (key in req.body) update[key] = req.body[key];
    const doc = await Faculty.findByIdAndUpdate(id, update, { new: true });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload/replace profile photo
router.post('/:id/photo', authRequired, upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    if (String(req.user.facultyId) !== String(id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const updated = await Faculty.findByIdAndUpdate(id, {
      photo: { data: req.file.buffer, contentType: req.file.mimetype }
    }, { new: true });
    res.json({ success: true, id: updated._id });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
