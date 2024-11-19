import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./TaskList.styles.ts";
import { Task } from "src/entities/Task";
import { useAppDispatch, useAppSelector } from "src/shared/hooks/reduxHooks.ts";
import { getTasksList } from "src/shared/firebase/cloud/api/todos/getTaskList/getTasksList.ts";
import { ArticleBar } from "src/shared/ui/ArticleTitle/ArticleTitle.tsx";
import { Filter } from "src/shared/assets/icons/filter.tsx";
import { ColorGuide } from "src/shared/types/styles/styleConstants.ts";
import { Dropdown } from "src/shared/ui/Dropdown/Dropdown.tsx";
import { getTasks } from "src/shared/slices/TodoSlice/selectors/getTasks.ts";
import { getIsTasksLoading } from "src/shared/slices/TodoSlice/selectors/getIsTasksLoading.ts";

export const TaskList = () => {
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("all");
    const tasks = useSelector(getTasks);
    const isLoading = useAppSelector(getIsTasksLoading);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksList());
    }, [dispatch]);

    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return !task.data.done;
        if (filter === "deadline") return !task.data.done;
        if (filter === "done") return task.data.done;

        return false;
    });

    const sortedTaskList = filteredTasks.sort((a, b) => {
        if (filter === "all") {
            return b.data.timeStamp - a.data.timeStamp;
        } else if (filter === "deadline") {
            const deadlineA = a.data.deadline ? new Date(a.data.deadline).getTime() : Infinity;
            const deadlineB = b.data.deadline ? new Date(b.data.deadline).getTime() : Infinity;
            return deadlineA - deadlineB;
        } else if (filter === "done") {
            return b.data.timeStamp - a.data.timeStamp;
        }
        return 0;
    });

    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    const handleFilterSelect = (selectedFilter: string) => {
        setFilter(selectedFilter);
        setFilterVisible(false);
    };

    return (
        <View style={styles.taskListContainer}>
            <ArticleBar
                text={"LIST OF TODO"}
                buttons={[
                    <TouchableOpacity
                        style={styles.filterIcon}
                        key={"filter"}
                        onPress={toggleFilter}
                    >
                        <Filter color={ColorGuide.ACCENT_COLOR} />
                    </TouchableOpacity>,
                ]}
            />
            {filterVisible && <Dropdown filter={filter} handleFilterSelect={handleFilterSelect} />}
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color={ColorGuide.PRIMARY_COLOR}
                    style={styles.loader}
                />
            ) : sortedTaskList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTextTitle}>There are no todos here.</Text>
                    <Text style={styles.emptyText}>Click the button to add new ones.</Text>
                </View>
            ) : (
                <FlatList data={sortedTaskList} renderItem={({ item }) => <Task task={item} />} />
            )}
        </View>
    );
};
