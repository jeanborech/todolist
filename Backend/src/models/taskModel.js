const connection = require('./connection');

const getAll = async() => {
 const [task] = await connection.execute('SELECT * FROM task');
return task;
};

const createTask = async(task) => {
const { title } = task;
const dateUTC = new Date(Date.now()).toUTCString();

const query = 'INSERT INTO task(title, status, created_at) VALUES(?,?,?)';
const [createdTask] = await connection.execute(query,[title, 'pendente',dateUTC]);

return {insertId: createdTask.insertId};
};

const deleteTask = async (id) => {
const removeTask = await connection.execute('DELETE FROM task WHERE id = ?', [id]);
return removeTask;

};

const updateTask = async (id, task) => {
    const {title, status} = task;
    const query = 'UPDATE task SET title = ?, status = ? WHERE ID = ?';
    const updatedTask = await connection.execute(query, [title, status, id]);
    return updatedTask;
    
    };
module.exports = { 
    getAll,
     createTask,
     deleteTask,
     updateTask,
     };