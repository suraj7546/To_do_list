let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const btn=document.getElementById('btn');
const tasksCounter = document.getElementById('tasks-counter');

const leftCounter = document.getElementById('left-counter');

//creat li tag and upend to the UI
function addTaskToDOM(task){
    const li=document.createElement('li');
    li.innerHTML=`
        <input type="checkbox" id="${task.id}" ${task.done?'checked':''} data-id="12" class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <i class="fa fa-trash-o" data-id="${task.id}"  style="font-size:25px;color:red;cursor: pointer;"  ></i>
          
    `;
    tasksList.append(li);
}

function renderList () {
   tasksList.innerHTML='';
   for(let i=0;i<tasks.length;i++){
    addTaskToDOM(tasks[i]);
   }
   taskLeftCount();
   tasksCounter.innerHTML=tasks.length;
}
// function to mark task completed or not the task 
function markTaskAsComplete (taskId) {
    const task=tasks.filter(task=>task.id==taskId )

   if(task.length>0){
    const currentTask=task[0];
    currentTask.done= !currentTask.done;
    renderList();
    return;
   }

}
// function to delete the task 
function deleteTask (taskId) {
    tasks=tasks.filter(                     //task=>task.id!==taskId ES6
        (task)=>{return task.id!==taskId}
    );
    renderList();
    showNotification('Task deleted successfully');
}
// function to add the task 
function addTask (task) {
    tasks.push(task);
    renderList();
    showNotification('Task added successfully');
    return;
}
// function show notefication the task 
function showNotification(text) {
    alert(text);
}
function handleBtnKeypress(){
    if(addTaskInput.value===''){
        showNotification('Task text can not be empty');
        return;
    }
    const text=addTaskInput.value;
    console.log(text);
    const task={
                text,
                id : Date.now().toString(),
                done: false
            
            }
            addTaskInput.value= ''; // Clear the input field
            addTask(task);

}


function handleClickListner(e){
    const target=e.target;
   
    if(target.className==='fa fa-trash-o'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
    }else if(target.className==='custom-checkbox'){
        const taskId=target.id;
        markTaskAsComplete(taskId);
    }
}
function taskLeftCount(){
  const  count=tasks.filter(                   
    (task)=>{return task.done===true}
    
);
leftCounter.innerHTML=tasks.length-count.length;

}


btn.addEventListener('click',handleBtnKeypress);
document.addEventListener('click',handleClickListner);
