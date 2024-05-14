import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import Home from './components/Home';
import SearchPage from './components/Search';
import BookShelf from './components/BookShelf';
import Book from './components/Book';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { auth } from './firebase/Firebase';
import Registration from './components/Registration';
import Feather from '@expo/vector-icons/Feather';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

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
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Home') {
                return <Feather name='home' size={size} color={color} />
              } else if (route.name === 'Search') {
                return <Feather name="search" size={size} color={color} />
              } else if (route.name === 'BookShelf') {
                return <Feather name="book-open" size={size} color={color} />
              }
            },
            tabBarActiveTintColor: '#3D2B24',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="Home"
            options={{ headerShown: false }}
          >
            {props => <Home {...props} user={user} />}
          </Tab.Screen>
          <Tab.Screen
            name="Search"
            options={{ headerShown: false }}
          >
            {() => <StackNavigator user={user} />}
          </Tab.Screen>
          <Tab.Screen
            name="BookShelf"
            options={{ headerShown: false }}
          >
            {props => <BookShelf {...props} user={user} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
};

const StackNavigator = ({ user }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchPage"
        options={{ headerShown: false }}
      >
        {props => <SearchPage {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="Book"
        component={Book}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
