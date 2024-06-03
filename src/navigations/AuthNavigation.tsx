import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login";
import { CadastroClienteScreen } from "../screens/CadastroCliente";
import { CadastroPrestadorScreen } from "../screens/CadastroPrestador";

export type AuthStackParamList = {
  Login: undefined;
  CadastroCliente: undefined;
  CadastroPrestador: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CadastroCliente" component={CadastroClienteScreen} />
      <Stack.Screen
        name="CadastroPrestador"
        component={CadastroPrestadorScreen}
      />
    </Stack.Navigator>
  );
}
