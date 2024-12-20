// Data River UI v0.0 
// Made by: Sofiia Khutorna

import {Site, standardize} from './objects/Site.js';
import { darkMode, applySavedTheme } from './darkMode.js';
 
document.addEventListener("keypress", (e) => {  // when enter is pressed, execute siteSearch()
    if (e.key == "Enter") {
        siteSearch();
    }
});

const urlParams = new URLSearchParams(window.location.search);
const siteCode = urlParams.get('site_code');
if (siteCode) {
    siteSearch(siteCode);
}

// grabs the input from a search field, checks name's format, 
// creates a new body and displays it on the webpage
export function siteSearch(siteCode=null) {
    if (!siteCode){
        siteCode = document.getElementById("site_code").value;
    }
    
    let name = standardize(siteCode);
    console.log(name);
    if (!name){
        alert(`Can't accept site ${siteCode}.`);
        return;
    }

    let content = document.getElementById("siteSearch");
    (async () => {
        let body = await displaySiteInfo(name);
        content.innerHTML = body;
    })(); 
} 
window.siteSearch = siteSearch;     // to ensure global scope

// toggles between showing/hiding devices list
function showDevices(devType) {
    let devList = document.getElementById(devType);

    if (devList.style.display === "" || devList.style.display === "none") {
        devList.style.display = "block";
    } else {
        devList.style.display = "none";
    }
}
window.showDevices = showDevices;     // to ensure global scope

// creates a device list for a site 
function deviceList(site) {
    let deviceList = `<div id="deviceLists">`;                          // start writing list (paragraphs) with device types
    for (let devType in site.deviceCounts) {                             
        deviceList += `<p class="expandType">${devType} (${site.deviceCounts[devType]})
            <button class="arrowDown" onclick="showDevices('${devType}List')">↓</button></p>  
            <div id="${devType}List" style="display: none;"> <ul>`;
        for (let i = 0; i < site.devices[devType].length; i++) {         // start writing hidden inner list with device names
            deviceList += `<li><a href="./devSearch.html?device=${site.devices[devType][i]}" target="_blank"); return false;">${site.devices[devType][i]}</a></li>`;
        }
        deviceList += `</div>`;
    }
    deviceList += `</div>`;
    return deviceList;
}

// displays all information available about 'name'
async function displaySiteInfo(name) {
    let siteInfo = await fetchJSONData(name);
    let header = `<h2>Information about ${name}</h2>`;
    if (!siteInfo){
       return `<h2>Could not find any information about ${name}.</h2>`;
    } 

    let body = `<table class="Site">
                    <tr>
                        <td>Address:</td>
                        <td>${siteInfo["address"]}</td>
                    </tr>
                    <tr>
                        <td>Lat Lng:</td>
                        <td>${siteInfo["lat lng"]}</td>
                    </tr>
                </table>`;

    let site = new Site(name, siteInfo);
    body += deviceList(site);
    
    return header+body;
}

window.onload = applySavedTheme;
window.darkMode = darkMode;

async function fetchJSONData(name) {
    let filepath = "test_sites/" + name + ".json";
    try {
        let res = await fetch(filepath);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        return data; 
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null; 
    }
}