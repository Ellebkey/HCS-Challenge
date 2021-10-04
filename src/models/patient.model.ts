import { model, Schema, Document } from 'mongoose';
import { Patient } from '@interfaces/patient.interface';

const patientSchema: Schema = new Schema({
  memberID: {
    type: String,
    required: true,
    unique: true,
  },
  programIdentifier: {
    type: String,
    required: true,
  },
  dataSource: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  telephoneNumber: {
    type: String,
  },
  emailAddress: {
    type: String,
    unique: false,
  },
  consent: {
    type: String,
  },
  mobilePhone: {
    type: String,
  },
});

const patientModel = model<Patient & Document>('Patient', patientSchema);

export default patientModel;
