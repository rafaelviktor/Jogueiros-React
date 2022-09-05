import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons'

import Home from '../views/home';
import Perfil from '../views/perfil';
import Populares from '../views/populares';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarStyle: { paddingBottom: 10,height: 70, padding: 10 },
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;
                    let iconColor;
                    if(route.name === "Explorar") {
                        iconName = focused ? "search":"search"
                        iconColor = focused ? "#1a9946" : "#828282"
                    } else if (route.name === "Populares") {
                        iconName = focused ? "ios-football" : "ios-football-outline"
                        iconColor = focused ? "#1a9946" : "#828282"
                    } else if (route.name === "Perfil") {
                        iconName = focused ? "person-circle-sharp" : "person-circle-outline"
                        iconColor = focused ? "#1a9946" : "#828282"
                    }
                    return <Ionic name={iconName} size={size} color={iconColor}/>
                },
            })}
            tabBarOptions={{
                activeTintColor: '#1a9946',
                inactiveTintColor: '#828282'
            }}>
            <Tab.Screen name="Explorar" component={Home} />
            <Tab.Screen name="Populares" component={Populares} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
}

export default Tabs;