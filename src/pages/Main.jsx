import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Login';
import Register from './Register';
import Dependientes from './Dependientes';
import authController from '../controllers/authController';
import { Button } from 'react-native';

const Tab = createBottomTabNavigator();

function Main() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getAuth = async()=>{
            const userAuth = await authController.authUser();
            setUser(userAuth)
        }
        getAuth();
    },[])

    function authLogout(){
        authController.authLogout();
        setUser(null)
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Login') {
                            iconName = focused
                                ? 'log-in-outline'
                                : 'log-in-outline';
                        } else if (route.name === 'Register')
                            iconName = focused ? 'person-add-outline' : 'person-add-outline'; 
                        else if(route.name === 'Dependientes')
                            iconName = focused ? 'people-outline' : 'people-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                {!user ?
                    <>
                        <Tab.Screen
                            name="Login"
                            children={()=>
                            <Login setUser={setUser}/>}
                            options={{ title: 'Login' }}
                        />
                        <Tab.Screen
                            name="Register"
                            component={Register}
                            options={{ title: 'Register' }}
                        /></>
                    :
                    <Tab.Screen
                        name="Dependientes"
                        children={()=>
                            <Dependientes authUser={user}/>}
                        options={{ title: 'Dependientes',
                        headerRight: () => (
                            <Button title="Logout" onPress={() => authLogout()}
                            />
                        ),}
                    }
                        
                    />
                }

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Main