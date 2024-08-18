const addtask = document.querySelector('#addtask');
const newtask = document.querySelector('#newtask');
const taskList = document.querySelector('.taskList');

function addToDom(todos){
    taskList.innerText= '';
    todos.forEach(element =>{
        let li = document.createElement('li');
        // li.innerText = element.name
        li.innerHTML = `
        <span class="taskname">${element.name}</span>
        <button atrid=${element.id} class="upBtn">⬆️</button>
        <button atrid=${element.id} class="dwnBtn">⬇️</button>
        <button atrid=${element.id} class="delBtn">❌</button>
        `
        taskList.appendChild(li);
    });
}

axios.get('./gettodos')
    .then((res)=>{
        let todos = res.data;
        addToDom(todos);
    })
    .catch((err)=>{
        console.log(err);
    })

addtask.addEventListener('click',(ev)=>{
    ev.preventDefault();
    // console.log("you tried to dubmit the form");
    axios.post('/addtodos',{
        name:newtask.value
    })
    .then((res)=>{
        let todos = res.data;
        newtask.value = '';
        console.log(todos)
        addToDom(todos);
    })
    .catch((err)=>{
        console.log(err);
    })
})

function deleteTodo(atrid){
    axios.post('/deletetodos',{id: atrid})
            .then((res)=>{
                let todos = res.data;
                console.log(todos)
                addToDom(todos);
            })
            .catch(err=>{
                console.log(err)
            })
}

taskList.addEventListener('click',(ev)=>{
    // console.log(ev);
    // console.log(ev.target);
    let atrid = ev.target.getAttribute('atrid');
    let btnName = ev.target.className;
    console.log(atrid);
    console.log(btnName);
    if(btnName  === 'delBtn'){
        deleteTodo(atrid);
    }
    else if(btnName == 'upBtn'){
        //Increase priority
        axios.get(`/increasepriority?id=${atrid}`)
        .then((res)=>{
            let todos = res.data;
            addToDom(todos);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else if(btnName == 'dwnBtn'){
        axios.get(`/decreasepriority?id=${atrid}`)
        .then((res)=>{
            let todos = res.data;
            addToDom(todos);
        })
        .catch((err)=>{
            console.log(err);
        })

    }
})
