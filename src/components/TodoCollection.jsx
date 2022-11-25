import TodoItem from './TodoItem';

const TodoCollection = ({ todos, onToggleDown, onSave, onDelete, onChangeMode }) => {
  return (
    <div>
      TodoCollection
      {todos.map(todo =>
        <TodoItem
          key={todo.id}
          todo={todo}
          onSave={({ id, title }) => { onSave?.({ id, title }) }}
          onToggleDown={(id) => { onToggleDown?.(id) }}
          onChangeMode={({ id, isEdit }) => onChangeMode({ id, isEdit })}
        />
      )}
    </div>
  );
};

export default TodoCollection;
