import { TextInput } from "react-native";
const MyTextInput = ({ value, name, type, onChange }) => {
  return (
    <TextInput
      value={value}
      onChangeText={(text) => onChange({ name, type, text })}
    />
  );
};
export default MyTextInput;
