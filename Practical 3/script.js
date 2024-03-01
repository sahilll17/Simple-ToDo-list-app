// Constants for input box and list elements
const INPUT_BOX_El = document.getElementById('inputBox');
const LIST_EL = document.getElementById('list');

// Constant for storing the task list in local storage
const STORE_NAME = 'tasklist';

// Retrieve the task list from local storage
const taskList = getTasklistFromMemory();


// INPUT_BOX_El.addEventListener('keydown', function (event) {
//     if (event.keyCode === 13) {
//         taskList.unshift(INPUT_BOX_El.value);
//         INPUT_BOX_El.value = '';
//         updateDisplay();
//     }
// })

// Event listener for input box to add new tasks on pressing Enter
INPUT_BOX_El.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 && INPUT_BOX_El.value.trim() !== '') {
        taskList.unshift(INPUT_BOX_El.value);
        INPUT_BOX_El.value = '';
        updateDisplay();
    }
})

// Function to update the display with the current task list
function updateDisplay() {
    LIST_EL.innerHTML = '';
    //
    taskList.forEach(function (item, index) {
        const EL = createListItem(item, index);
        LIST_EL.append(EL);
    })
    storeInMemory();
}

// Function to create a new list item element for a task
function createListItem(value, index) {
    //<li> Buy Food <span>&times;</span></li>
    const LI_EL = document.createElement('li');
    // <li> </li>
    const SPAN_EL = document.createElement('span');
    // <span> </span>
    SPAN_EL.innerHTML = '&times;';
    // <span>&times;</span>
    SPAN_EL.style.cursor = 'pointer';
    // <span style="cursor:pointer">&times;</span>
    LI_EL.innerText = value;
    // <li> value </li>
    LI_EL.append(SPAN_EL);
    //<li> Buy Food <span>&times;</span></li>
    SPAN_EL.onclick = removeItem.bind(null,index);
    return LI_EL;
}
// Function to remove a task from the list
function removeItem(index) {
    taskList.splice(index, 1);
    updateDisplay();
}
// Function to store the current task list in local storage
function storeInMemory() {
    localStorage.setItem(STORE_NAME,taskList);
}

// function getTasklistFromMemory() {
//     return localStorage.getItem(STORE_NAME).split(',');
// }

// Function to retrieve the task list from local storage
function getTasklistFromMemory() {
    const storedValue = localStorage.getItem(STORE_NAME);
    return storedValue ? storedValue.split(',') : [];
}

// Initial display update with the retrieved task list
updateDisplay();