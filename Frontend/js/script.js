const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTask = async() => {
const response = await fetch('http://localhost:3333/task');
const task = await response.json();
return task;
}

const addTask = async(event) => {
event.preventDefault();

const task = {title: inputTask.value};

 await fetch('http://localhost:3333/task', { 
    method: 'post',
    headers: { 'Content-type': 'application/json'},
    body: JSON.stringify(task)
 });

 loadTask();
 inputTask.value = '';
};

const deleteTask = async(id) => {
    alert('Deletar Tarefa');
    await fetch(`http://localhost:3333/task/${id}`, {
        method: 'delete'
    });

   loadTask();
};

const updateTask = async({id, title, status}) => {

    await fetch(`http://localhost:3333/task/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({title, status})
});
     loadTask();
};

const formatDate = (dateUTC) => {
    const options = {dateStyle:'long', timeStyle:'short'};
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
};

const createElement =(tag, innerText = '', innerHTML ='') => {
    const element = document.createElement(tag);
    
    if(innerText){
        element.innerText = innerText;
    }
    if(innerHTML){
        element.innerHTML = innerHTML;
    }
    return element;
};

const createSelect = (value) => {
    const options = `
    <option value="em andamento 10mva">em andamento 10MVA</option>
    <option value="em andamento 5mva">em andamento 5MVA</option>
    <option value="pendente 10mva">pendente 10MVA</option>
    <option value="pendente 5mva">pendente 5MVA</option>
    <option value="concluida">concluída</option>
    <option value="inspeção">Inspeção</option>
    `;
    
    const select = createElement('select','', options);
    select.value = value;
    return select;
};

const createRow =(task) => {
    const {id, title, created_at, status} = task;
    
    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);

    select.addEventListener('change', ({target}) => updateTask({id, title,created_at, status: target.value}));

    const editButton = createElement('button','', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button','', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTask({id, title: editInput.value, status});
    })

    editButton.addEventListener('click', () => {
       tdTitle.innerText ='';
       tdTitle.appendChild(editForm);
    });

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
};

const loadTask = async () => {
    const task = await fetchTask();
    
    tbody.innerHTML = '';

    task.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });

};

addForm.addEventListener('submit',addTask);

loadTask();