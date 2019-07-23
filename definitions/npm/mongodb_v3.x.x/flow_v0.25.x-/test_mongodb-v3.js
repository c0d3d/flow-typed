/* @flow */
import mongodb from "mongodb";

// Admin

const admin = mongodb.Admin();
// $ExpectError
admin.addUser("", "", "")
// $ExpectError
admin.addUser("", "", function() {})
