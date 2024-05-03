import styles from "./TaskForm.module.css";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";

// interface
import { ITask } from "../interfaces/Task";

type Props = {
  btnText: string;
  taskList: ITask[];

  // ? -> PODE VIR OU NÃO
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;

  handleUpdate?(id: number, title: string, difficulty: number): void;
};

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  // preenchendo edição com as informações já escritas, executa sempre que a task for alterada
  useEffect(() => {
    // se vir uma task entao pega as informações escritas
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  // função de incluir tarefas no sistema
  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
    } else {
      // criando ID aleatorio
      const id = Math.floor(Math.random() * 1000);

      const newTask: ITask = { id, title, difficulty };

      // unindo todas as tasks com a nova task
      // ! sei que vai vir como argumento opcional
      setTaskList!([...taskList, newTask]);

      // zerando os valores
      setTitle("");
      setDifficulty(0);
    }
  };

  // esta tipando o evento como elemento de HTML
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      // alterando string para numero
      setDifficulty(parseInt(e.target.value));
    }
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.container_input}>
        <label htmlFor="title">Titulo:</label>
        <input
          type="text"
          name="title"
          placeholder="Titulo da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>

      <div className={styles.container_input}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          type="text"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty}
        />
      </div>

      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
