import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function IndexRoute() {
  return (
    <Redirect href='/loading' />
  );
}
