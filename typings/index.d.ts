import 'egg';
import { Interface } from 'readline';
import * as acl from 'acl';


declare module 'egg' {
  interface Application {
    acl: acl
  }
}