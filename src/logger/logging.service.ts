import 'dotenv/config';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { access, appendFile } from 'fs/promises';
import { sep } from 'path';
import { cwd } from 'process';
import { statSync } from 'fs';

@Injectable()
export class LoggingService extends ConsoleLogger {
  log(message: string): void {
    super.log(message);
    this.writeToFile(message, 'log');
  }

  error(message: string): void {
    super.error(message);
    this.writeToFile(message, 'error');
  }

  private async writeToFile(message: string, method: string): Promise<void> {
    const currentTime = Date.now();
    const log = `'\n'${currentTime} ${message}'\n'`;
    const logFolder = `${cwd()}${sep}loges`;

    if (!process.env.CURRENT_LOGIN_FILE) {
      const newLogFile = `${currentTime}.log`;
      process.env.CURRENT_LOGIN_FILE = newLogFile;
    }

    if (!process.env.CURRENT_ERROR_LOGIN_FILE) {
      const newLogFile = `${currentTime}.errors.log`;
      process.env.CURRENT_ERROR_LOGIN_FILE = newLogFile;
    }

    let newLogFile: string;

    if (method === 'log') {
      newLogFile = process.env.CURRENT_LOGIN_FILE;

      const pathToLogFile = `${logFolder}${sep}${newLogFile}`;

      let fileSize = 0;

      try {
        await access(pathToLogFile);
        fileSize = statSync(pathToLogFile).size;
      } catch {}

      if (fileSize >= +process.env.LOGIN_FILE_SIZE) {
        newLogFile = `${currentTime}.log`;
        process.env.CURRENT_LOGIN_FILE = newLogFile;
      }
    } else if (method === 'error') {
      newLogFile = process.env.CURRENT_ERROR_LOGIN_FILE;

      const pathToLogFile = `${logFolder}${sep}${newLogFile}`;

      let fileSize = 0;

      try {
        await access(pathToLogFile);
        fileSize = statSync(pathToLogFile).size;
      } catch {}

      if (fileSize >= +process.env.LOGIN_FILE_SIZE) {
        newLogFile = `${currentTime}.errors.log`;
        process.env.CURRENT_ERROR_LOGIN_FILE = newLogFile;
      }
    }

    const pathToLogFile = `${logFolder}${sep}${newLogFile}`;
    appendFile(pathToLogFile, log, 'utf8');
  }
}
