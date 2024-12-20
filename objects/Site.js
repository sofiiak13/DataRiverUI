// Data River UI v1.0 
// Made by: Sofiia Khutorna
import {deviceType} from './Device.js';

export class Site {
    constructor(name, data) {
         this.name = name;
         this.siteCode = data["location code"];
         this.latLng = data["lat lng"];  
         this.address = data["address"]; 
         this.deviceNames = data["device_name"];
         this.deviceCounts = data["device_type"];
         this.devices = this.categorise(this.deviceNames) 
    }

    categorise(deviceNames) {
        let devices = {};
        for (let devName in deviceNames) {
            let devType = deviceType(devName); 
            if (!(devType in devices)) {
                devices[devType] = [devName];   // create a new list for the type
            } else {
                devices[devType].push(devName); // add to existing list
            }
        }
        return devices;
    }
}

export function standardize(name) {
    let site_name = name.toUpperCase();

    let match = site_name.match(/(SITE)/);
    if (match) {
        return match[1];
    }

    return null;
}