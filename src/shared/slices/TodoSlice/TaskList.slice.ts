import { createSlice } from "@reduxjs/toolkit";
import { TasksStoreConfig } from "./config/TasksStore.config.ts";
import { addTaskToDB } from "src/shared/firebase/cloud/api/todos/addTask/addTask.ts";
import { getTasksList } from "src/shared/firebase/cloud/api/todos/getTaskList/getTasksList.ts";
import { TaskConfigWithId } from "src/shared/types/taskTypes/taskConfigWithId.ts";
import { deleteTask } from "src/shared/firebase/cloud/api/todos/deleteTask/deleteTask.ts";
import { editTask } from "src/shared/firebase/cloud/api/todos/editTask/editTask.ts";

const initialState: TasksStoreConfig = {
    tasks: [],
    isLoading: false,
    isError: false,
};

export const taskListSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setIsTaskLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTaskToDB.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })

            .addCase(addTaskToDB.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;

                const task = {
                    ...payload,
                    data: {
                        ...payload.data,
                        deadline: payload.data.deadline || null,
                        img: payload.data.img || null,
                    },
                };
                state.tasks.push(task);
            })

            .addCase(addTaskToDB.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });

        builder
            .addCase(getTasksList.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })

            .addCase(getTasksList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload as TaskConfigWithId[];
            })

            .addCase(getTasksList.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });

        builder
            .addCase(deleteTask.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })

            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })

            .addCase(deleteTask.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });

        builder
            .addCase(editTask.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })

            .addCase(editTask.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;

                const updatedTask = {
                    ...payload,
                    data: {
                        ...payload.data,
                        deadline: payload.data.deadline || null,
                        img: payload.data.img || null,
                    },
                };

                const taskIndex = state.tasks.findIndex((el) => el.id === action.payload.id);

                if (taskIndex !== -1) {
                    state.tasks[taskIndex] = updatedTask;
                } else {
                    state.tasks.push(updatedTask);
                }
            })

            .addCase(editTask.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});
export const { setIsTaskLoading } = taskListSlice.actions;
export default taskListSlice.reducer;
