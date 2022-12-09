import { getTodos, createTodo, updateTodo, deleteTodo } from 'api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';


const TodoPage = () => {
  const [inputValue, setInputValue] = useState()
  const [todos, setTodos] = useState([])

  const handleChange = (value) => {
    setInputValue(value)
  }

  const handleAddTodo = async () => {
    if (inputValue.length <= 0) {
      return
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [...prevTodos, {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false
        }]
      })
      setInputValue('')
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyDown = async () => {
    if (inputValue.length <= 0) {
      return
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [...prevTodos, {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false
        }]
      })
      setInputValue('')
    } catch (err) {
      console.log(err);
    }
  }

  const handleToggleDown = async (id) => {
    const currentTodo = todos.find(o => o.id === id);
    try {
      await updateTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodos((prevTodos) => {
        return prevTodos.map(todo => {
          if (todo.id === id) {
            return { ...todo, isDone: !todo.isDone }
          }
          return todo
        })
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isEdit }
        }
        return { ...todo, isEdit: false }
      })
    })
  }

  const handleSave = async ({ id, title }) => {
    try {
      await updateTodo({
        id,
        title,
      });
      setTodos(prevTodos => {
        return prevTodos.map(todo => {
          if (todo.id === id) {
            console.log({ ...todo, title, isEdit: false })
            return { ...todo, title, isEdit: false }
          }
          return todo
        })
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map(todo => ({ ...todo, isEdit: false })));
      } catch (err) {
        console.log(err)
      }
    }
    getTodosAsync();
  }, []);

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue || ''}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDown={handleToggleDown}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todosNumber={todos.length} />
    </div>
  );
};

export default TodoPage;
