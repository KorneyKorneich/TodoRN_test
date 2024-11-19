import Svg, { Path } from "react-native-svg";

interface CheckedProps {
    color: string;
}

export const Checked = ({ color }: CheckedProps) => {
    return (
        <Svg viewBox="0 0 30 30" width="30px" height="30px">
            <Path
                fill={color}
                d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
            />
        </Svg>
    );
};