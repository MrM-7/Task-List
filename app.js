// UI VARIABLES

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listener
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create the link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

        // storeTaskInLocalStorage(taskInput.value);

        // clear input
        // taskInput.value = '';       
    })    
}

function addTask(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Add a task');
    }

    else{
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create the link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';
    }
}

// localStorage.clear();

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
            e.target.parentElement.parentElement.remove();
    }
    
    // remove from ls
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}


function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function clearTasks(e){
    //taskList.innerHTML = '';

    if(taskList.innerHTML != ''){
        if(confirm('Are you sure?')){
            while(taskList.firstChild){
                taskList.removeChild(taskList.firstChild);
            }

            clearTasksFromLocalStorage();
        }
    }
    else{
        alert('No Task Found');
    }

}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}


function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}