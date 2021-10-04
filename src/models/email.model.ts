import { model, Schema, Document } from 'mongoose';
import { Email } from '@interfaces/email.interface';

const emailSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
});

const emailModel = model<Email & Document>('Email', emailSchema);

export default emailModel;
