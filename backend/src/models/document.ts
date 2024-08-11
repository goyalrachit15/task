import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

interface IDocument extends MongooseDocument {
  name: string;
  url: string;
  isPublic: boolean;
  owner: String;
}

const documentSchema = new Schema<IDocument>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  owner: { type: String, ref: 'User'},
});

const DocumentModel = mongoose.model<IDocument>('Document', documentSchema);

export default DocumentModel;
