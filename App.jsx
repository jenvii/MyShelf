import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Home from './components/Home';
import SearchPage from './components/SearchPage';
import BookShelf from './components/BookShelf';
import Book from './components/Book';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { auth } from './firebase/Firebase';
import Registration from './components/Registration';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    });
    return () => unsubscribe();
  }, [])

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={StackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Search"
            component={StackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="BookShelf"
            component={BookShelf}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="RegistrationPage"
            component={Registration}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={Home}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginPage"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
