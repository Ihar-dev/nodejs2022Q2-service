import 'dotenv/config';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendFile } from 'fs/promises';
import { sep } from 'path';
import { cwd } from 'process';

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
    const log = `${currentTime} ${message}'\n'`;
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

    if (method === 'log') newLogFile = process.env.CURRENT_LOGIN_FILE;
    else if (method === 'error')
      newLogFile = process.env.CURRENT_ERROR_LOGIN_FILE;

    const pathToLogFile = `${logFolder}${sep}${newLogFile}`;

    appendFile(pathToLogFile, log);
  }
}
