import PatientService from '../src/services/patient.service';
import { logger } from '../src/utils/logger';
import { dbConnection } from '../src/configs/mongoose';
import data from './mockData.json';
import { connect } from 'mongoose';
import { expect } from 'chai';
import 'mocha';

let patientService1;

before(async () => {
  await connect(dbConnection.url, dbConnection.options);
  patientService1 = new PatientService();
});

describe('Testing patients data match the same from data base', () => {
  it('Verify the data in flat file matches the data in Patients collection', async () => {
    const savedPatients = await patientService1.findAllPatient();
    expect(savedPatients).to.be.have.lengthOf(18);

    const lastNameArray = savedPatients.map(row => row.lastName);
    const lastNameArrayMock = data.map(row => row.lastName);
    expect(lastNameArray).to.be.eql(lastNameArrayMock);
  });

  it('Print out all Patient IDs where the first name is missing', async () => {
    const savedPatients = await patientService1.findAllPatient({ firstName: null });
    expect(savedPatients).to.be.have.lengthOf(2);
    logger.info(savedPatients);
  });

  it('Print out all Patient IDs where the email address is missing, but consent is "Y"', async () => {
    const savedPatients = await patientService1.findAllPatient({ emailAddress: null, consent: true });
    expect(savedPatients).to.be.have.lengthOf(1);
    logger.info(savedPatients);
  });

  it('Verify Emails were created in Emails Collection for patients who have CONSENT as Y', async () => {
    const numberOfPatientsYes = 7;
    const numberOfDefaultEmails = 4;
    const savedPatients = await patientService1.findAllPatient({ consent: true });
    expect(savedPatients).to.be.have.lengthOf(8);

    const patientsID = savedPatients.map(row => row._id);
    const emails = await patientService1.findAllEmails({ patient_id: { $in: patientsID } });

    expect(emails).to.be.have.lengthOf(numberOfPatientsYes * numberOfDefaultEmails);
    logger.info(emails);
  });
});

afterEach(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
