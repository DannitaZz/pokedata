export const getLocalStorageObj = (key, defaultVal) => {
    try{    
        const item = JSON.parse(localStorage.getItem(key))
        if (item===null){
            localStorage.setItem(key, JSON.stringify(defaultVal))
            return [defaultVal, false]
        }else{
            return [item, true]
        }
    } catch(error) {
        localStorage.setItem(key, JSON.stringify(defaultVal))
        console.log(`error getting item ${key} setting to ${defaultVal}`)
        return [defaultVal, false]
    }
}

export const checkValue = (key, expectedVal) => {
    try{    
        const item = localStorage.getItem(key)
        if (item===expectedVal){
        }else{
            localStorage.clear();
        }
    } catch(error) {
        localStorage.clear();
    }
}