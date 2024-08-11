import { Router } from 'express';
import multer from 'multer';
import { uploadDocuments, getDocuments, fetchAllDocuments, searchDocuments, updateDocumentPrivacy } from '../controllers/controller';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.array('documents'), uploadDocuments);
router.get('/search', searchDocuments);
router.patch('/update-privacy', updateDocumentPrivacy);

export default router;
