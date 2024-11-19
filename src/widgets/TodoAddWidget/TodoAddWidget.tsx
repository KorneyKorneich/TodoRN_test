import styles from "./TodoAddWidget.styles.ts";
import { TaskConfig } from "src/shared/types/taskTypes/taskConfigWithId.ts";
import { ActivityIndicator, View } from "react-native";
import { TodoInput } from "src/shared/ui/Inputs/TodoInput/TodoInput.tsx";
import { InputType } from "src/shared/types/uiConst/uiConst.ts";
import { DateInput } from "src/shared/ui/Inputs/DateInput/DateInput.tsx";
import { ImageInput } from "src/shared/ui/Inputs/ImageInput/ImageInput.tsx";
import { useSelector } from "react-redux";
import { getIsTasksLoading } from "src/shared/slices/TodoSlice/selectors/getIsTasksLoading.ts";
import { ColorGuide } from "src/shared/types/styles/styleConstants.ts";

interface TodoAddWidgetProps {
    taskToAdd: TaskConfig;
    setTaskToAdd: (task: TaskConfig) => void;
}

export const TodoAddWidget = (props: TodoAddWidgetProps) => {
    const { taskToAdd, setTaskToAdd } = props;

    const handleChange = (field: keyof TaskConfig, value: string | number) => {
        setTaskToAdd({ ...taskToAdd, [field]: value });
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
                        value={taskToAdd.title}
                        onChange={(text) => handleChange("title", text)}
                    />
                    <TodoInput
                        inputType={InputType.DESCRIPTION}
                        value={taskToAdd.description}
                        onChange={(text) => handleChange("description", text)}
                    />
                    <DateInput onDateChange={(date) => handleChange("deadline", date)} />
                    <ImageInput onImageChange={(img) => handleChange("img", img)} />
                </>
            )}
        </View>
    );
};
