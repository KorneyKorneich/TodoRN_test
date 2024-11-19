import { TaskConfig } from "src/shared/types/taskTypes/taskConfigWithId.ts";
import { AppDispatch } from "src/shared/store/store.ts";
import { addTaskWithImage } from "src/shared/firebase/cloud/api/todos/addTaskWithImage/addTaskWithImage.ts";

export const handleTodoAdd = async (
    taskToAdd: TaskConfig,
    setTaskToAdd: (task: TaskConfig) => void,
    dispatch: AppDispatch,
) => {
    await addTaskWithImage(taskToAdd, dispatch);
    setTaskToAdd({
        description: "",
        title: "",
        img: null,
        deadline: null,
        timeStamp: 0,
        userId: null,
        done: false,
    });
};
