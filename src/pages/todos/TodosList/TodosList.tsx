import React, { useEffect, useState } from 'react';
import { getTodos, Todo , deleteTodo} from '../../../services/todos';
import { useNotifications } from '../../../contexts/notifications';
import { Button,Spinner,Table } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import { NS } from '../../../types/utils';
import { useNavigate } from 'react-router-dom';

const TodosList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    const {addNotification} = useNotifications();

    const refreshTodos = async() => {
        try {
            const todos = await getTodos();
            setTodos(todos);
            toast("Error");
        }catch(error) {
            toast("successful");
            addNotification({
                variant: "danger",
                autohide : true,
                header:<strong className="me-auto">Error!</strong>,
                body: (
                    <span className="text-light">
                        {(error as Error).message}

                    </span>
                )
            });
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        refreshTodos();
    },[]);

    const navigate = useNavigate();

    const addTodoClicked = () => {
        navigate(`/todos/-1`)
    }
    const updateTodoClicked = (id:NS) => {
        navigate(`/todos/${id}`);
    }
    const deleteTodoClicked = async (id: NS) => {
 if (!window.confirm("Are you sure you want to proceed?")) {
 return;
 }
 try {
 await deleteTodo(id);
 toast('Successfully deleted the todo')
//  addNotification({
//  variant: "success",
//  autohide: true,
//  header: <strong className="me-auto">Success!</strong>,
//  body: (
//  <span className="text-light">
//  Successfully deleted the todo
//  </span>
//  ),
//  });
 refreshTodos();
 } catch (error) {
    toast((error as Error).message);
//  addNotification({
//  variant: "danger",
//  autohide: true,
//  header: <strong className="me-auto">Error!</strong>,
//  body: (
//  <span className="text-light">{(error as Error).message}</span>
//  ),
//  });
 }
 };
    
  return (
    <>
     <h1 className="d-flex justify-content-between align-items-center">
 Todos
 <Button variant="primary" onClick={addTodoClicked}>Add</Button>
 </h1>
 <hr />
 {loading && (
 <div className="text-center my-5">
 <Spinner />
 </div>
 )}
<Table striped bordered hover>
 <thead>
 <tr>
 <th>Description</th>
 <th>Target Date</th>
 <th>Update</th>
 <th>Delete</th>
 </tr>
 </thead>
 <tbody>
 {todos.map((todo) => (
 <tr key={todo.id}>
 <td>{todo.description}</td>
 <td>
 {moment(todo.targetDate).format("YYYY-MM-DD")}
 </td>
 <td>
 <Button variant="primary" onClick={() => updateTodoClicked(todo.id as NS)}>Update</Button>
 </td>
 <td>
 <Button variant="warning" onClick={() => deleteTodoClicked(todo.id as NS) }>Delete</Button>
 </td>
 </tr>
 ))}
 </tbody>
 </Table>
    </>
  )
}

export default TodosList;
export {};