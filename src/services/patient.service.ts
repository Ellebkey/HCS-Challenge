import { Patient, PatientModel } from '@interfaces/patient.interface';
import { Email } from '@interfaces/email.interface';
import patientModel from '../models/patient.model';
import emailModel from '../models/email.model';

class PatientService {
  public patients = patientModel;
  public emails = emailModel;

  public async findAllPatient(filter = {}): Promise<Patient[]> {
    return this.patients.find(filter);
  }

  public async findAllEmails(filter = {}): Promise<Email[]> {
    return this.emails.find(filter);
  }

  public async createPatient(patientData: Patient[]): Promise<PatientModel[] | unknown> {
    return this.patients.insertMany(patientData);
  }

  public async deleteAllPatients(): Promise<void> {
    await this.patients.remove();
  }

  public async createEmail(emailData: Email[]): Promise<unknown> {
    return this.emails.insertMany(emailData);
  }

  public async deleteAllEmails(): Promise<void> {
    await this.emails.remove();
  }
}

export default PatientService;
