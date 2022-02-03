export const validUser = 'ash_ketchum'
export const validPass = 'pikachu123'

export const getLocalStorageObj = (key, defaultVal) => {
    try{    
        const item = JSON.parse(localStorage.getItem(key))
        if (item===null){
            localStorage.setItem(key, JSON.stringify(defaultVal))
            console.log(`item ${key} is null, setting to ${defaultVal}`)
            return [defaultVal, false]
        }else{
            console.log(`item ${key} retrieved from localStorage`)
            return [item, true]
        }
    } catch(error) {
        localStorage.setItem(key, JSON.stringify(defaultVal))
        console.log(error)
        console.log(`error getting item ${key} setting to ${defaultVal}`)
        return [defaultVal, false]
    }
}

export const checkValue = (key, expectedVal) => {
    try{    
        const item = localStorage.getItem(key)
        console.log(item)
        if (item===expectedVal){
            console.log(`item ${key} matches the desired ${expectedVal} value`)
        }else{
            // localStorage.clear();
            console.log(`value ${key} did not match, clearing local storage`)
        }
    } catch(error) {
        // localStorage.clear();
        console.log(`value ${key} error, clearing local storage`)
        console.log(error)
    }
}

export const checkLogin = (realUser, realPass) => {
    const user = localStorage.getItem('user')
    const pass = localStorage.getItem('pass')
    if (((user===realUser) && (pass===realPass))){
        return true
    } else{
        return false
    }
}