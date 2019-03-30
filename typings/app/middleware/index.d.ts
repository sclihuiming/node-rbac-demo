// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthentication from '../../../app/middleware/authentication';

declare module 'egg' {
  interface IMiddleware {
    authentication: typeof ExportAuthentication;
  }
}
