/* @flow */
import * as mongodb from 'mongodb';

// Admin

const admin = new mongodb.Admin();
// $ExpectError
admin.addUser("", "", "")
admin.addUser("", "", function() {})
