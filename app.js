document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks=JSON.parse(localStorage.getItem("tasks"))
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTasksList();
        updateStats();
    }
});
let tasks=[];
const saveTasks=()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
};
const addtask=()=>{
    const taskinput=document.getElementById('taskinput')
    const text=taskinput.value.trim()
    if(text){
        tasks.push({text:text,completed: false});
        taskinput.value="";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete=(index) =>{
    tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};
const editTask=(index)=>{
    const taskinput=document.getElementById("taskinput")
    taskinput.value=tasks[index].text
    tasks.splice(index,1)
    updateTasksList();
    updateStats();
    saveTasks();
};
const updateStats=()=>{
    const completedTasks=tasks.filter((task)=>task.completed).length;
    const totalTasks=tasks.length;
    const progress=(completedTasks/totalTasks)*100;
    const progressBar=document.getElementById("progress");
    progressBar.style.width=`${progress}%`;
    document.getElementById("numbers").innerText=`${completedTasks}/${totalTasks}`;
    if(tasks.length && completedTasks === totalTasks){
        blastConfetti();
    }
};

const updateTasksList=()=>{
    const taskList=document.getElementById('task-list');
    taskList.innerHTML="";

    tasks.forEach((task,index)=>{
        const listItem =document.createElement("li");

        listItem.innerHTML =`
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" :""}">
                <input type="checkbox" class="checkbox" ${task.completed ?"checked":""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./assets/edit.png" onclick="editTask(${index})" />
                <img src="./assets/bin.png" onclick="deleteTask(${index})" />
            </div>
        </div>
        `;
       listItem.addEventListener("change",()=> toggleTaskComplete(index));
       taskList.append(listItem);
    });

};
document.getElementById("newtask").addEventListener('click',function(e){
 e.preventDefault()
 addtask();
});
const blastConfetti = ()=>{
    const end = Date.now() + 1 * 1000;


const colors = ["#24feee", "#9932cc"];


(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
    
};