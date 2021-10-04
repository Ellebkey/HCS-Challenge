import csv from 'csv-parse';
import fs from 'fs';
import { resolve } from 'path';
import { addDays, format } from 'date-fns';
import { logger } from '@utils/logger';
import { Patient, PatientRaw, PatientModel } from '@interfaces/patient.interface';
import { Email } from '@interfaces/email.interface';
import PatientService from '@services/patient.service';

const currentPath = resolve(__dirname, './');

class CSVController {
  public patientService1 = new PatientService();

  public readAndSaveCSVData = async (): Promise<any> => {
    try {
      // only for demo purposes
      await this.patientService1.deleteAllPatients();
      await this.patientService1.deleteAllEmails();
      // only for demo purposes
      const arrayData = [];

      fs.createReadStream(`${currentPath}/test.csv`)
        .pipe(
          csv({
            delimiter: '|',
            trim: true,
            columns: true,
          }),
        )
        .on('data', row => {
          // console.log(row);
          arrayData.push(row);
        })
        .on('error', err => {
          logger.error(err);
          logger.error('Error reading CSV file');
        })
        .on('end', async () => {
          logger.info('CSV file successfully processed');
          await this.saveCSVToDB(arrayData);
          logger.info('CSV data successfully saved');
        });
    } catch (error) {
      logger.error('Something went wrong while reading csv file');
      logger.error(error);
      throw new Error('Something went wrong while reading csv file');
    }
  };

  private saveCSVToDB = async (arrayData: PatientRaw[]): Promise<void> => {
    const mappedData = this.mapCSVData(arrayData);
    const createdPatientData = await this.patientService1.createPatient(mappedData);
    const mappedEmailData = this.mapEmailData(createdPatientData);
    await this.patientService1.createEmail(mappedEmailData);
  };

  public mapCSVData = (csvPatients: PatientRaw[]): Patient[] => {
    return csvPatients.map(row => ({
      programIdentifier: row['Program Identifier'],
      dataSource: row['Data Source'],
      cardNumber: row['Card Number'],
      memberID: row['Member ID'],
      firstName: row['First Name'] ? row['First Name'] : null,
      lastName: row['Last Name'],
      dateOfBirth: row['Date of Birth'],
      address1: row['Address 1'],
      address2: row['Address 2'],
      city: row.City,
      state: row.State,
      zipCode: row['Zip code'],
      telephoneNumber: row['Telephone number'],
      emailAddress: row['Email Address'] ? row['Email Address'] : null,
      consent: row.CONSENT && row.CONSENT === 'Y',
      mobilePhone: row['Mobile Phone'],
    }));
  };

  private mapEmailData = (savedPatients: PatientModel[] | any): Email[] => {
    const emails: Email[] = [];
    const days = {
      1: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      2: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      3: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      4: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
    };

    savedPatients.forEach(row => {
      if (row.consent && row.emailAddress) {
        for (let i = 1; i < 5; i++) {
          const email = {
            name: `Day ${i}`,
            scheduledDate: days[i],
            patientId: row._id,
          };
          emails.push(email);
        }
      }
    });

    return emails;
  };
}

export default CSVController;
