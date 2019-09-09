/*global process*/
/**
 * Script to test jstz.
 *
 * Check for current timezone:
 * $ node test.js
 * 'Europe/Berlin'
 *
 * Check for specific timezone:
 * $node test.js America/Denver
 *
 * @type {exports.jstz|*}
 */
var jstz = require("../dist/jstz.js");

var expected_tz = process.argv[2];
var actual_tz = null;

if (typeof expected_tz === 'undefined') {
    actual_tz = jstz.determine().name();
    console.log(actual_tz);
} else {
    process.env.TZ = expected_tz;
    actual_tz = jstz.determine(false);
    tz_name = actual_tz.name();

    if (expected_tz === tz_name) {
        console.log("Successfully validated ", expected_tz, "===", tz_name);
    } else {
        console.log("Assertion failed ", expected_tz, "!==", tz_name, '(Needle:', actual_tz.needle, 'Offsets:', actual_tz.offsets, ')');
    }
}
