var app = document.getElementById('dmobile');
/* exported vinToast */
var vinToast = 'Vehicle info auto-selected from VIN';
/* exported demoToast */
var demoToast = 'C\'mon man, this is only a demo.';
// kit info
app.kitInfoArr = [
{key: 'Firmware', desc: 'N/A'},
{key: 'Bootloader', desc: '3.17'},
{key: 'Platform', desc: 'DBALL2'},
{key: 'Module ID', desc: '8727481'},
{key: 'Install Type', desc: 'Standard'}
];

app.kitInfoDigital = [
{key: 'Firmware', desc: 'N/A'},
{key: 'Bootloader', desc: '3.18'},
{key: 'Platform', desc: '5X10'},
{key: 'Module ID', desc: '8197174'},
{key: 'Brand', desc: 'Viper'},
{key: 'System Type', desc: 'Hybrid'}
];

// menu options
app.menuOptions = [
{url: 'digital', option: 'Digital Systems'},
{url: 'lookup', option: 'Vehicle Lookup'},
{url: 'bitwriter', option: 'Bitwriter'},
{url: 'prg1000', option: 'PRG-1000'},
{url: 'logging', option: 'Logging'},
{url: 'chat', option: 'Chat'},
{url: 'guides', option: 'Guides'},
{url: 'tips', option: 'Tech Tips'},
{url: 'settings', option: 'Settings'},
{url: 'about', option: 'About'}
];

// d2d options
app.d2dSettings = [
{opt: 'DL-Lock', desc: 'Lock from remote starter'},
{opt: 'DL-Unlock', desc: 'Unlock from remote starter'},
{opt: 'DL-Trunk', desc: 'Trunk from remote starter'},
{opt: 'RS-Request RPM', desc: 'RPM query from remote starter'},
{opt: 'RS-Ground When Running', desc: 'Ground when running from remote starter'},
{opt: 'ST-Driver Door', desc: 'Driver door status to remote starter'},
{opt: 'ST-Other Doors', desc: 'All door statuses to remote starter'},
{opt: 'ST-Hood', desc: 'Hood status to remote starter'},
{opt: 'ST-Trunk', desc: 'Trunk status to remote starter'},
{opt: 'ST-Brake', desc: 'Brake lights status to remote starter'},
{opt: 'ST-Parking Brake', desc: 'Parking brake status to remote starter'},
{opt: 'OEM-Keyless Arm', desc: 'Arm aftermarket security with OEM fob'},
{opt: 'OEM-Keyless Disarm', desc: 'Disarm aftermarket security with OEM fob'}
];
