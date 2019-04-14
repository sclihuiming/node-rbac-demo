// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthentication from '../../../app/service/Authentication';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    authentication: ExportAuthentication;
    test: ExportTest;
  }
}
