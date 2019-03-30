// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGroup from '../../../app/model/group';
import ExportResource from '../../../app/model/resource';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Group: ReturnType<typeof ExportGroup>;
    Resource: ReturnType<typeof ExportResource>;
    User: ReturnType<typeof ExportUser>;
  }
}
