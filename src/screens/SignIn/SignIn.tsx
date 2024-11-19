import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "./SignIn.styles.ts";
import Union from "src/shared/assets/icons/Union.svg";
import { PasswordInput } from "src/shared/ui/Inputs/PasswordInput/PasswordInput.tsx";
import { useState } from "react";
import { AppInput } from "src/shared/ui/Inputs/AppInput/AppInput.tsx";
import { UserSignInConfig } from "src/shared/types/user/userConfig.ts";
import { AuthButton } from "src/shared/ui/Buttons/AuthButton/AuthButton.tsx";
import { NavigationProps } from "src/shared/types/navigationTypes/navigationTypes.ts";
import { signIn } from "src/shared/firebase/cloud/api/user/signIn/signIn.ts";
import { useSelector } from "react-redux";
import { getIsUserLoading } from "src/shared/slices/UserSlice/selectors/getIsUserLoading.ts";
import { ColorGuide } from "src/shared/types/styles/styleConstants.ts";
import { useAppDispatch } from "src/shared/hooks/reduxHooks.ts";

interface ErrorConfig {
    password?: string;
    email?: string;
    noErrors: boolean;
    firebaseError?: string;
}

export const SignIn = ({ navigation }: NavigationProps) => {
    const [userInfo, setUserInfo] = useState<UserSignInConfig>({
        password: null,
        email: null,
    });
    const [errors, setErrors] = useState<ErrorConfig>({ noErrors: false });
    const isUserLoading = useSelector(getIsUserLoading);
    const dispatch = useAppDispatch();
    const handleEmailChange = (email: string) => {
        setErrors({ ...errors, email: undefined });
        setUserInfo({ ...userInfo, email: email });
    };

    const handlePasswordChange = (password: string) => {
        setErrors({ ...errors, password: undefined });
        setUserInfo({ ...userInfo, password: password });
    };

    const validate = (): boolean => {
        const newErrors: ErrorConfig = { noErrors: true };

        const requiredFields: Partial<Record<keyof UserSignInConfig, string>> = {
            email: "Email is required",
            password: "Password is required",
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        Object.keys(requiredFields).forEach((field) => {
            const key = field as keyof UserSignInConfig;
            if (!userInfo[key]) {
                newErrors[key] = requiredFields[key]!;
                newErrors.noErrors = false;
            }
        });

        if (userInfo.password && userInfo.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
            newErrors.noErrors = false;
        }

        if (userInfo.email && !emailRegex.test(userInfo.email)) {
            newErrors.email = "Invalid email format";
            newErrors.noErrors = false;
        }

        setErrors(newErrors);
        return newErrors.noErrors;
    };

    const handleSignIn = async () => {
        const isValid = validate();
        if (isValid) {
            try {
                await signIn(dispatch, {
                    email: userInfo.email!,
                    password: userInfo.password!,
                });
            } catch (err) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    firebaseError: typeof err === "string" ? err : "An error occurred",
                }));
            }
        }
    };

    const handleToSignUp = () => {
        navigation.navigate("SignUp");
    };

    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.container}>
                <View style={styles.content}>
                    {isUserLoading ? (
                        <ActivityIndicator
                            color={ColorGuide.PRIMARY_COLOR}
                            size={"large"}
                            style={styles.loader}
                        />
                    ) : (
                        <>
                            <View style={styles.logo}>
                                <Union />
                            </View>
                            <View style={styles.signInForm}>
                                {errors.firebaseError && (
                                    <Text style={styles.invalidInput}>{errors.firebaseError}</Text>
                                )}
                                <AppInput
                                    placeholder="Email"
                                    value={userInfo.email}
                                    setValue={handleEmailChange}
                                />
                                {errors.email && (
                                    <Text style={styles.invalidInput}>{errors.email}</Text>
                                )}
                                <PasswordInput
                                    placeholder="Password"
                                    value={userInfo.password}
                                    setValue={handlePasswordChange}
                                />
                                {errors.password && (
                                    <Text style={styles.invalidInput}>{errors.password}</Text>
                                )}
                            </View>
                            <AuthButton onPress={handleSignIn} buttonTitle="SIGN IN" />
                            <View style={styles.toSignUpContainer}>
                                <Text style={styles.text}>Don&apos;t have an account?</Text>
                                <TouchableOpacity onPress={handleToSignUp}>
                                    <Text style={styles.toSignUp}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
