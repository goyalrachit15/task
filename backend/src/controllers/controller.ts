import { Request, Response } from 'express';
import Document from '../models/document';

export const uploadDocuments = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const userId = req.body.userId;

    const documents = await Promise.all(
      files.map(file => {
        const newDoc = new Document({
          name: file.originalname,
          url: `http://localhost:5000/uploads/${file.filename}`,
          isPublic: req.body.isPublic,
          owner: userId,
        });
        return newDoc.save();
      })
    );

    res.json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to upload documents' });
  }
};

export const fetchAllDocuments = async (req: Request, res: Response) => {
  try {
    if (req.body.userId) {
      const documents = await Document.find();
      res.json(documents);
    } else {
      const documents = await Document.find({ isPublic: true });
      res.json(documents);
    }
  } catch (error) {
    console.error('Failed to fetch documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const documents = await Document.find({ $or: [{ owner: userId }, { isPublic: true }] });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export const searchDocuments = async (req: Request, res: Response) => {
  const { query } = req.query;
  
  try {
    // Use a regular expression to perform a case-insensitive search
    const documents = await Document.find({
      name: { $regex: new RegExp(query as string, 'i') }
    }).exec();

    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export const updateDocumentPrivacy = async (req: Request, res: Response) => {
  const { username, isPublic } = req.body;
  console.log(req.body)
  try {
    const document = await Document.findById({owner : username});

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    if (document.owner.toString() !== req.body.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    document.isPublic = isPublic;
    await document.save();

    res.json({ message: 'Document privacy updated successfully' });
  } catch (error) {
    console.error('Failed to update document privacy:', error);
    res.status(500).json({ error: 'Failed to update document privacy' });
  }
};
