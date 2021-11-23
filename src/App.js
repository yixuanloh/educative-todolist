import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import './styles/output.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [pendingItem, setPendingItem] = useState([]);
  const [todoitem, setToDoItem] = useState();
  const [updatedItem, setUpdatedItem] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState();

  const fetchData = async () => {
    const result = await axios.get('https://educative-todolist.herokuapp.com/api/getAll');
    setPendingItem(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    try {
      const result = await axios.post('https://educative-todolist.herokuapp.com/api/delete/' + id);
      toast.success("Item is deleted");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Item is not deleted");
    }
  }

  const onAdd = async (todoitem) => {
    try {
      const itemObj = {
        itemName: todoitem.todoitem
      }
      const result = await axios.post('https://educative-todolist.herokuapp.com/api/add', itemObj);
      toast.success("Item is added");
      setToDoItem("");
      fetchData();
    } catch (err) {
      toast.error("Item is not added");
    }
  }

  const onUpdate = async (id, todoitem) =>  {
    console.log(id, todoitem);
    try {
      const itemObj = {
        itemName: todoitem
      }
      const result = await axios.post('https://educative-todolist.herokuapp.com/api/update/' + id, itemObj);
      toast.success("Item is updated");
      setUpdatedItem("");
      setIsEdit(false);
      fetchData();
    } catch (err) {
      toast.error("Item is not updated");
    }
  }

  const setBoth = (id) => {
    setIdSelected(id);
    setIsEdit(true);
  }

  return (
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <Toaster />
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
          <h1 class="text-grey-darkest">Todo List</h1>
          <div class="flex mt-4">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" value={todoitem} placeholder="Add Todo" onChange={(e) => setToDoItem(e.target.value)}></input>
            <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-teal" onClick={() => onAdd({ todoitem })}>Add</button>
          </div>
        </div>
        <div>
          {pendingItem.map(item => (
            <React.Fragment>
              <div class="flex mb-4 items-center">
                {isEdit == false ?
                  <React.Fragment>
                    <p class="w-full text-grey-darkest">{item.itemName}</p>
                    <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => setBoth(item._id)}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="green">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg></button>
                  </React.Fragment> :
                  (idSelected == item._id ? 
                    <React.Fragment>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" value={updatedItem} placeholder="Update Todo" onChange={(e) => setUpdatedItem(e.target.value)}></input>
                      <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" id={item._id} onClick={() => onUpdate(item._id, updatedItem)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="green">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => setIsEdit(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="red">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </React.Fragment> :
                    <React.Fragment>
                      <p class="w-full text-grey-darkest">{item.itemName}</p>
                      <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => setBoth(item._id)}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="green">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg></button>
                      <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => onDelete(item._id)}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="red">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg></button>
                    </React.Fragment>
                  )
                }
                {isEdit == false ?
                  <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => onDelete(item._id)}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="red">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg></button> : null
                }


              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
