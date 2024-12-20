// Data River UI v1.0 
// Made by: Sofiia Khutorna

export class Device {
    constructor(name, data) {
        this.name = name;
        this.data = data;           // generalized property becase we don't know what data each device has 
    }
}

export function standardize(name) {
    console.log(name);

    let match = name.match(/(device\d{1})/);     // checks testing standard
    if (match) {
        return match[1];
    } 
    return null;
}

export function deviceType(name) {

    if (name.search(/device/) != -1) {
        return "Test";
    }

    return null;
}