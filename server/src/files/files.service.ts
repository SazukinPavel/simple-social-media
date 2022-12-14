import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { v4 } from 'uuid';
import { FileType } from '../types/FileType';
import { promises } from 'fs';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async saveFile(type: FileType, file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = v4() + '.' + fileExtension;
      const filePath = this.getDirectoryPath(type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      await promises.writeFile(filePath + '/' + fileName, file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFile(fileName:string):Promise<boolean>{
    try {
      await promises.unlink(this.getDirectoryPath() + '/' + fileName);
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private getDirectoryPath(type?:FileType){
    if(type){
      return resolve(__dirname, '..', 'static', type);
    }
    return resolve(__dirname, '..', 'static');
  }
}
