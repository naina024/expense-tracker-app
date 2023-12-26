import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SCREEN } from './constants';
import { GlobalStyles } from './styles';

import ExpensesContextProvider from './screens/store/context/expenses.context';

import AddEditExpense from './screens/AddEditExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import IconButton from './components/UI/IconButton';

export default function App() {

  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function BottomTabsNavigator(){
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate(SCREEN.ADD_EDIT_EXPENSE);
              }}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name={SCREEN.RECENT_EXPENSES}
          component={RecentExpenses}
          options={{
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name={SCREEN.ALL_EXPENSES}
          component={AllExpenses}
          options={{
            tabBarLabel: "All",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  }

  return (
    <>
      <StatusBar style='light'/>
      <ExpensesContextProvider>
        <NavigationContainer>

          <Stack.Navigator 
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name='Expenses Overview'
              component={BottomTabsNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={SCREEN.ADD_EDIT_EXPENSE}
              component={AddEditExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>

        </NavigationContainer>
      </ExpensesContextProvider>
    </>
    
  );
}

const styles = StyleSheet.create({
});
