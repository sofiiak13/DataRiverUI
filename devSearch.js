// Data River UI v0.0 
// Made by: Sofiia Khutorna

import {standardize} from './objects/Device.js';
import { darkMode, applySavedTheme } from './darkMode.js';

document.addEventListener("keypress", (e) => {      // when enter is pressed, execute deviceSearch()
    if (e.key === "Enter") {
        deviceSearch(); 
    }
});

const urlParams = new URLSearchParams(window.location.search);
const devName = urlParams.get('device');
if (devName) {
    deviceSearch(devName);
}

// grabs the input from a search fields (name and type), checks name's format, 
// creates a new body and displays it on the webpage
export function deviceSearch(devName=null) {
    if (!devName){
        devName = document.getElementById("devName").value;
    }
    let devType = document.getElementById("devType").value;  
    
    let name = standardize(devName);
    if (!name){
        alert(`Can't accept name ${devName}`);
        return;
    }

    let content = document.getElementById("devSearch");
    (async () => {
        let body = await displayDeviceInfo(name);
        content.innerHTML = body;
    })();
} 
window.deviceSearch = deviceSearch;     // ensures global scope

// from a json dict creates an html table with a random colour in background 
function createTable(jsonData, i) {
    let r = Math.floor(Math.random() * 256); 
    let g = Math.floor(Math.random() * 256); 
    let b = Math.floor(Math.random() * 256); 
    let table = `<table class="${name}"
        style="grid-column: ${i} / ${i+2}; grid-row: 3 / 4;
                background-color: rgba(${r}, ${g}, ${b}, 0.3); margin: 3px;">`;
    for (const field in jsonData) {
        let rowEnd = ``;
        if (field === "site_code") {
            rowEnd = `<td><a href="./siteSearch.html?site_code=${jsonData[field]}" target="_blank"); return false;">${jsonData[field]}</a></td>`      // attach a link to a site
        } else {
            rowEnd = `<td>${jsonData[field]}</td>`;
        }
        table += `<tr>
                    <td>${field}:</td>
                    ${rowEnd}
                </tr>`;
    }
    table += `</table>`;
    return table;
}

// displays all information available about 'name'
async function displayDeviceInfo(name) {
    let deviceInfo = await fetchJSONData(name);
    let header = `<h2>Information about ${name}</h2>`;
    if (!deviceInfo){
       return `<h2>Could not find any information about ${name}.</h2>`;
    } 

    let body = "";
    let i = 1
    for (const source in deviceInfo) {
        body += `<h4 class="sourceTable" style="grid-column:${i}; grid-row: 2;">${source}</h4>`;
        let table = createTable(deviceInfo[source], i);
        body += table;
        i += 2;
    } 
     
    return header+body;
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});

window.onload = applySavedTheme;
window.darkMode = darkMode;

// later change to take two arguments name and device type 
// to constuct an actual path from datariver not from test_directory
async function fetchJSONData(name) {
    let filepath = "test_devices/" + name + ".json";
    try {
        const res = await fetch(filepath);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data; 
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null; 
    }
}