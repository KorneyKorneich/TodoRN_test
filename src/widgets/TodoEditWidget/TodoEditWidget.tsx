import styles from "./TodoEditWidget.styles.ts";
import { TaskConfigWithId } from "src/shared/types/taskTypes/taskConfigWithId.ts";
import { ActivityIndicator, View } from "react-native";
import { TodoInput } from "src/shared/ui/Inputs/TodoInput/TodoInput.tsx";
import { InputType } from "src/shared/types/uiConst/uiConst.ts";
import { DateInput } from "src/shared/ui/Inputs/DateInput/DateInput.tsx";
import { ImageInput } from "src/shared/ui/Inputs/ImageInput/ImageInput.tsx";
import { useSelector } from "react-redux";
import { getIsTasksLoading } from "src/shared/slices/TodoSlice/selectors/getIsTasksLoading.ts";
import { ColorGuide } from "src/shared/types/styles/styleConstants.ts";

interface TodoEditWidget {
    taskToEdit: TaskConfigWithId;
    setTaskToEdit: (task: TaskConfigWithId) => void;
}

export const TodoEditWidget = (props: TodoEditWidget) => {
    const { taskToEdit, setTaskToEdit } = props;

    const handleChange = (field: keyof TaskConfigWithId["data"], value: string | number) => {
        setTaskToEdit({ ...taskToEdit, data: { ...taskToEdit.data, [field]: value } });
    };

    const isTodosLoading = useSelector(getIsTasksLoading);

    return (
        <View style={styles.widgetContainer}>
            {isTodosLoading ? (
                <ActivityIndicator size={"large"} color={ColorGuide.WHITE} style={styles.loader} />
            ) : (
                <>
                    <TodoInput
                        inputType={InputType.TITLE}
                        value={taskToEdit.data.title}
                        onChange={(text) => handleChange("title", text)}
                    />
                    <TodoInput
                        inputType={InputType.DESCRIPTION}
                        value={taskToEdit.data.description}
                        onChange={(text) => handleChange("description", text)}
                    />
                    <DateInput
                        onDateChange={(date) => handleChange("deadline", date)}
                        taskDate={taskToEdit.data.deadline ?? undefined}
                    />
                    <ImageInput
                        onImageChange={(img) => handleChange("img", img)}
                        taskImg={taskToEdit.data.img ?? undefined}
                    />
                </>
            )}
        </View>
    );
};
