const tabContent = document.getElementsByClassName('rounds-container');
const tabLinks = document.getElementsByClassName('tab');

import { displayList, displayAvailableDefenses } from './lists.js';
import { rankings } from './position-rankings.js';

function hideAllTabs() {
    for (let i=0; i < tabContent.length; i++) {
        // console.log(tabContent[i]);
        tabContent[i].style.display = "none";
    }
}

function resetSelectedTab() {
    for (let i=0; i < tabLinks.length; i++){
        tabLinks[i].className = 'tab';
    }
}

function changeTab(e, position) {
    hideAllTabs();
    resetSelectedTab();
    const currentTab = document.getElementById(`${position}-tab`);
    currentTab.style = "";
    e.currentTarget.className += " selected-tab";
    (position !== 'def') ? displayList(position, rankings[position]) : displayAvailableDefenses();
}

export { changeTab };
