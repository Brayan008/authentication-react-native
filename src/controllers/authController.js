
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL_BACKEND from '../config/baseUrl.js'

const authLogin = async (username, password) => {
    console.log("Entrando a auth login " + username + " " + password);

    try {
        const res = await fetch(BASE_URL_BACKEND + "api/auth/login", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const data = await res.json();
        await AsyncStorage.setItem('user', JSON.stringify(data));
        return data
    } catch (err) {
        return err
    }
}


const authLogout = async () => {
    console.log("Entrando a auth logout ");
    try {
        await AsyncStorage.removeItem('user');
    } catch (error) {
        console.log(error);
    }
};

const authUser = async () => {
    console.log("Entrando a authUser");
    try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            return JSON.parse(value)
        }
        return null
    } catch (error) {
        console.log(error);
    }
}

const authController = {
    authLogout,
    authLogin,
    authUser
}

export default authController
