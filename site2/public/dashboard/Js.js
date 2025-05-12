var tempSensorA7 = 50;
var umidSensorA7 = 60;

var umidAviso = 40;
var tempAviso = 34;

var umidAlerta = 20;
var tempAlerta = 38;


var tempSA6 = tempSensorA7 - 3;
var umidSA6 = umidSensorA7 + 3;

var tempSA8 = tempSensorA7 - 3;
var umidSA8 = umidSensorA7 + 3;



var tempSA5 = tempSensorA7 - 6;
var umidSA5 = umidSensorA7 + 6;

var tempSA9 = tempSensorA7 - 6;
var umidSA9 = umidSensorA7 + 6;


tempMedia = (28 + 29 + 27 + 30 + tempSA5 + tempSA6 + tempSensorA7 + tempSA8 + tempSA9 +
27 + 30 + 26 + 29 + 27 + 30 + 27 + 30 + 27 + 30 + 27 + 30 + 27 + 30 + 28 + 29 + 27 + 30 + 26 + 25 + 27 + 28 + 29) /32;



umidMedia = (70 + 72 + 68 + 75 + umidSA5 + umidSA6 + umidSensorA7 + umidSA8 + umidSA9 + 68
+ 75 + 68 + 75 + 68 + 75 + 68 + 75 + 68 + 75 + 68 + 75 + 68 + 75 + 70 + 72 + 68 + 75 + 65 + 63 + 63 + 70 + 72) / 32;