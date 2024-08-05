const {cydom} = require("cbb");
// const webcrypto = require('webcrypto').webcrypto;
// global.webcrypto = webcrypto
global.webcrypto = crypto
window = {
    cydom: cydom,
    cbb_function: {},
}

global.proxy = function (obj, objname, type) {
    return obj

    function isSymbol(value) {
        const type = typeof value
        return type === 'symbol' || type === 'object'
    }

    function isSymbol2(value) {
        const type = typeof value
        return type == 'symbol' || (type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]')
    }

    function getMethodHandler(WatchName) {
        let methodhandler = {
            apply(target, thisArg, argArray) {
                let result = Reflect.apply(target, thisArg, argArray)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}]`)
                } else {
                    // if (argArray+''.length > 60) {
                    //     console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}], result is [${result}].`)
                    // }


                }
                return result
            },
            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                if (isSymbol(result)) {

                    console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}]`)
                } else {
                    // if (argArray+''.length > 60) {
                    //     console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}], result is [${result}].`)
                    // }
                    //
                }
                return result;
            }
        }
        return methodhandler
    }

    function getObjhandler(WatchName) {
        let handler = {
            get(target, propKey, receiver) {
                if (propKey === "setTimeout") {
                    // debugger;
                    console.log()
                }
                let result = Reflect.get(target, propKey, receiver)
                if (result instanceof Object && propKey !== 'cbb_id') {
                    if (typeof result === "function") {
                        if (isSymbol(propKey)) {
                            console.log(`[${WatchName}] getting propKey is [symbol] , it is function`)

                        } else {
                            if (propKey !== 'cbb_id') {
                                console.log(`[${WatchName}] getting propKey is [${propKey}] , it is function`)
                            }

                        }
                        return new Proxy(result, getMethodHandler(WatchName))
                    } else {
                        if (isSymbol(propKey)) {
                            console.log(`[${WatchName}] getting propKey is [msybol], result is [${(result)}]`);

                        } else {
                            if (propKey !== 'cbb_id') {
                                try {
                                    console.log(`[${WatchName}] getting propKey is [${propKey}], result is [${(result)}]`);

                                } catch (e) {

                                }
                            }

                        }
                    }
                    let paic = ["Function", "Array"]
                    if (paic.indexOf(propKey) != -1 || paic.indexOf(target) != -1 || isSymbol2(propKey)) {
                        return result

                    }
                    return new Proxy(result, getObjhandler(`${WatchName}.${propKey}`))
                    // return result
                }
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}]`)
                    }

                } else {
                    if (propKey !== 'cbb_id') {

                        console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}], result is [${result}]`);
                    }

                }
                return result;
            },
            set(target, propKey, value, receiver) {
                if (value instanceof Object) {
                    if (typeof value === "function") {
                        if (isSymbol(WatchName)) {
                            if (propKey !== 'cbb_id') {
                                console.log(`[symbolName] setting propKey is [${propKey}] , it is function`)
                            }

                        } else {
                            if (isSymbol(propKey)) {
                                console.log(`[${WatchName}] setting propKey is [symbolpropKey] , it is function`)

                            } else {
                                if (propKey !== 'cbb_id') {
                                    console.log(`[${WatchName}] setting propKey is [${propKey}] , it is function`)
                                }

                            }

                        }
                    } else if (isSymbol(value)) {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}]`)
                        }
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${(value)}]`);
                        }
                    }
                } else {
                    if (isSymbol(value)) {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}]`);
                        }
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
                        }
                    }
                }
                return Reflect.set(target, propKey, value, receiver);
            },
            has(target, propKey) {
                var result = Reflect.has(target, propKey);
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] has propKey [${propKey}]`)
                    }
                } else {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] has propKey [${propKey}], result is [${result}]`)
                    }
                }
                return result;
            },
            deleteProperty(target, propKey) {
                var result = Reflect.deleteProperty(target, propKey);
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] delete propKey [${propKey}]`)
                    }

                } else {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] delete propKey [${propKey}], result is [${result}]`)
                    }

                }

                return result;
            },
            getOwnPropertyDescriptor(target, propKey) {

                if (propKey == 'MediaStream') {
                    debugger
                }

                var result = Reflect.getOwnPropertyDescriptor(target, propKey);
                if (isSymbol(result)) {
                    if (isSymbol2(propKey)) {
                        console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [symbol] result is [${(result)}]`)
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey}] result is [${(result)}]`)
                        }
                    }
                } else {
                    if (isSymbol(propKey)) {
                        console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey `)
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey}]`)
                        }
                    }
                }
                return result;
            },
            defineProperty(target, propKey, attributes) {
                var result = Reflect.defineProperty(target, propKey, attributes);
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${(attributes)}], result is [${result}]`)
                    }
                } else {
                    if (isSymbol(propKey)) {
                        console.log(`[${WatchName}] defineProperty propKey [symbolpropKey] attributes is [${(attributes)}]`)
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${(attributes)}]`)
                        }
                    }
                }
                return result
            },
            getPrototypeOf(target) {
                var result = Reflect.getPrototypeOf(target)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] getPrototypeOf result is [${(result)}]`)

                } else {
                    console.log(`[${WatchName}] getPrototypeOf `)
                }
                return result;
            },
            setPrototypeOf(target, proto) {
                console.log(`[${WatchName}] setPrototypeOf proto is [${(proto)}]`)
                return Reflect.setPrototypeOf(target, proto);
            },
            preventExtensions(target) {
                console.log(`[${WatchName}] preventExtensions`)
                return Reflect.preventExtensions(target);
            },
            isExtensible(target) {
                var result = Reflect.isExtensible(target)
                console.log(`[${WatchName}] isExtensible, result is [${result}]`)
                return result;
            },
            ownKeys(target) {
                var result = Reflect.ownKeys(target)
                if ("fetch" == WatchName) {

                }

                console.log(`[${WatchName}] invoke ownkeys, result is [${(JSON.stringify(result))}]`)
                if (typeof result === typeof []) {
                    let fo = result.indexOf("globalMy")
                    if (fo !== -1) {
                        result.splice(fo, 1)
                    }
                }

                return result
            },
            apply(target, thisArg, argArray) {
                let result = Reflect.apply(target, thisArg, argArray)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] apply function name is [${target.name}]`)

                } else {
                    // if (argArray+''.length > 60) {
                    //     console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${result}].`)
                    // }

                }
                return result
            },

            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] construct function name is [${target.name}]`)
                } else {
                    // if (argArray+''.length > 60) {
                    //    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.slice(0, 60)}], result is [${result}].`)
                    // }
                    //
                }
                return result;
            }
        }
        return handler;
    }

    if (type === "method") {
        return new Proxy(obj, getMethodHandler(objname));
    }
    return new Proxy(obj, getObjhandler(objname));
}


global.proxy2 = function (obj, objname, type) {
    // return obj

    function isSymbol(value) {
        const type = typeof value
        return type === 'symbol' || type === 'object'
    }

    function isSymbol2(value) {
        const type = typeof value
        return type == 'symbol' || (type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]')
    }

    function getMethodHandler(WatchName) {
        let methodhandler = {
            apply(target, thisArg, argArray) {
                let result = Reflect.apply(target, thisArg, argArray)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}]`)
                } else {
                    // if (argArray+''.length > 60) {
                    //     console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}], result is [${result}].`)
                    // }


                }
                return result
            },
            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                if (isSymbol(result)) {

                    console.log(`[${WatchName}] construct function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}]`)
                } else {
                    // if (argArray+''.length > 60) {
                    //     console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.toString().slice(0, 60)}], result is [${result}].`)
                    // }
                    //
                }
                return result;
            }
        }
        return methodhandler
    }

    function getObjhandler(WatchName) {
        let handler = {
            get(target, propKey, receiver) {
                if (propKey === "setTimeout") {
                    // debugger;
                    console.log()
                }
                let result = Reflect.get(target, propKey, receiver)
                if (result instanceof Object && propKey !== 'cbb_id') {
                    if (typeof result === "function") {
                        if (isSymbol(propKey)) {
                            console.log(`[${WatchName}] getting propKey is [symbol] , it is function`)

                        } else {
                            if (propKey !== 'cbb_id') {
                                console.log(`[${WatchName}] getting propKey is [${propKey}] , it is function`)
                            }

                        }
                        return new Proxy(result, getMethodHandler(WatchName))
                    } else {
                        if (isSymbol(propKey)) {
                            console.log(`[${WatchName}] getting propKey is [msybol], result is [${(result)}]`);

                        } else {
                            if (propKey !== 'cbb_id') {
                                try {
                                    console.log(`[${WatchName}] getting propKey is [${propKey}], result is [${(result)}]`);

                                } catch (e) {

                                }
                            }

                        }
                    }
                    let paic = ["Function", "Array"]
                    if (paic.indexOf(propKey) != -1 || paic.indexOf(target) != -1 || isSymbol2(propKey)) {
                        return result

                    }
                    return new Proxy(result, getObjhandler(`${WatchName}.${propKey}`))
                    // return result
                }
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}]`)
                    }

                } else {
                    if (propKey !== 'cbb_id') {

                        console.log(`[${WatchName}] getting propKey is [${propKey?.description ?? propKey}], result is [${result}]`);
                    }

                }
                return result;
            },
            set(target, propKey, value, receiver) {
                if (value instanceof Object) {
                    if (typeof value === "function") {
                        if (isSymbol(WatchName)) {
                            if (propKey !== 'cbb_id') {
                                console.log(`[symbolName] setting propKey is [${propKey}] , it is function`)
                            }

                        } else {
                            if (isSymbol(propKey)) {
                                console.log(`[${WatchName}] setting propKey is [symbolpropKey] , it is function`)

                            } else {
                                if (propKey !== 'cbb_id') {
                                    console.log(`[${WatchName}] setting propKey is [${propKey}] , it is function`)
                                }

                            }

                        }
                    } else if (isSymbol(value)) {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}]`)
                        }
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${(value)}]`);
                        }
                    }
                } else {
                    if (isSymbol(value)) {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}]`);
                        }
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] setting propKey is [${propKey}], value is [${value}]`);
                        }
                    }
                }
                return Reflect.set(target, propKey, value, receiver);
            },
            has(target, propKey) {
                var result = Reflect.has(target, propKey);
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] has propKey [${propKey}]`)
                    }
                } else {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] has propKey [${propKey}], result is [${result}]`)
                    }
                }
                return result;
            },
            deleteProperty(target, propKey) {
                var result = Reflect.deleteProperty(target, propKey);
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] delete propKey [${propKey}]`)
                    }

                } else {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] delete propKey [${propKey}], result is [${result}]`)
                    }

                }

                return result;
            },
            getOwnPropertyDescriptor(target, propKey) {

                if (propKey == 'MediaStream') {
                    debugger
                }

                var result = Reflect.getOwnPropertyDescriptor(target, propKey);
                if (isSymbol(result)) {
                    if (isSymbol2(propKey)) {
                        console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [symbol] result is [${(result)}]`)
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey}] result is [${(result)}]`)
                        }
                    }
                } else {
                    if (isSymbol(propKey)) {
                        console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey `)
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] getOwnPropertyDescriptor  propKey [${propKey}]`)
                        }
                    }
                }
                return result;
            },
            defineProperty(target, propKey, attributes) {
                var result = Reflect.defineProperty(target, propKey, attributes);
                if (isSymbol(result)) {
                    if (propKey !== 'cbb_id') {
                        console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${(attributes)}], result is [${result}]`)
                    }
                } else {
                    if (isSymbol(propKey)) {
                        console.log(`[${WatchName}] defineProperty propKey [symbolpropKey] attributes is [${(attributes)}]`)
                    } else {
                        if (propKey !== 'cbb_id') {
                            console.log(`[${WatchName}] defineProperty propKey [${propKey}] attributes is [${(attributes)}]`)
                        }
                    }
                }
                return result
            },
            getPrototypeOf(target) {
                var result = Reflect.getPrototypeOf(target)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] getPrototypeOf result is [${(result)}]`)

                } else {
                    console.log(`[${WatchName}] getPrototypeOf `)
                }
                return result;
            },
            setPrototypeOf(target, proto) {
                console.log(`[${WatchName}] setPrototypeOf proto is [${(proto)}]`)
                return Reflect.setPrototypeOf(target, proto);
            },
            preventExtensions(target) {
                console.log(`[${WatchName}] preventExtensions`)
                return Reflect.preventExtensions(target);
            },
            isExtensible(target) {
                var result = Reflect.isExtensible(target)
                console.log(`[${WatchName}] isExtensible, result is [${result}]`)
                return result;
            },
            ownKeys(target) {
                var result = Reflect.ownKeys(target)
                if ("fetch" == WatchName) {

                }

                console.log(`[${WatchName}] invoke ownkeys, result is [${(JSON.stringify(result))}]`)
                if (typeof result === typeof []) {
                    let fo = result.indexOf("globalMy")
                    if (fo !== -1) {
                        result.splice(fo, 1)
                    }
                }

                return result
            },
            apply(target, thisArg, argArray) {
                let result = Reflect.apply(target, thisArg, argArray)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] apply function name is [${target.name}]`)

                } else {
                    // if (argArray+''.length > 60) {
                    //     console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray}], result is [${result}].`)
                    // }

                }
                return result
            },

            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                if (isSymbol(result)) {
                    console.log(`[${WatchName}] construct function name is [${target.name}]`)
                } else {
                    // if (argArray+''.length > 60) {
                    //    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [function], result is [${result}].`)
                    // }else{
                    console.log(`[${WatchName}] apply function name is [${target.name}], argArray is [${argArray.slice(0, 60)}], result is [${result}].`)
                    // }
                    //
                }
                return result;
            }
        }
        return handler;
    }

    if (type === "method") {
        return new Proxy(obj, getMethodHandler(objname));
    }
    return new Proxy(obj, getObjhandler(objname));
}


global.cydata = {}
global.cydata.imageload = []
global.cydata.emjwgl1 = [
    {"emoji": "😎", "image_data": {"0": 0, "1": 0, "2": 0, "3": 0}}, {
        "emoji": "6️⃣",
        "image_data": {"0": 0, "1": 166, "2": 237, "3": 255}
    }, {"emoji": "🍼", "image_data": {"0": 227, "1": 157, "2": 137, "3": 255}}, {
        "emoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "image_data": {"0": 155, "1": 155, "2": 155, "3": 255}
    }, {"emoji": "📊", "image_data": {"0": 0, "1": 210, "2": 106, "3": 255}}, {
        "emoji": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "image_data": {"0": 0, "1": 0, "2": 0, "3": 0}
    }, {"emoji": "㊗️", "image_data": {"0": 0, "1": 0, "2": 0, "3": 0}}, {
        "emoji": "⛎",
        "image_data": {"0": 141, "1": 101, "2": 197, "3": 255}
    },


    {"emoji": "👨‍🚀", "position": "53,46", "image_data": {"0": 255, "1": 200, "2": 61, "3": 255}}, {
        "emoji": "👨‍🚀",
        "position": "55,42",
        "image_data": {"0": 165, "1": 127, "2": 115, "3": 255}
    }, {"emoji": "👨‍🚀", "position": "53,54", "image_data": {"0": 255, "1": 200, "2": 61, "3": 255}}, {
        "emoji": "👨‍🚀",
        "position": "55,41",
        "image_data": {"0": 255, "1": 241, "2": 206, "3": 255}
    }, {"emoji": "🚵", "position": "55,52", "image_data": {"0": 255, "1": 200, "2": 61, "3": 255}}, {
        "emoji": "🚵",
        "position": "44,54",
        "image_data": {"0": 255, "1": 200, "2": 61, "3": 255}
    }, {"emoji": "🚵‍", "position": "56,39", "image_data": {"0": 78, "1": 67, "2": 103, "3": 255}}, {
        "emoji": "🚵‍",
        "position": "55,52",
        "image_data": {"0": 255, "1": 200, "2": 61, "3": 255}
    }, {
        "emoji": "👩‍👩‍👧",
        "position": "44,40",
        "image_data": {"0": 222, "1": 208, "2": 203, "3": 255}
    }, {"emoji": "👩‍👩‍👧", "position": "45,54", "image_data": {"0": 255, "1": 200, "2": 61, "3": 255}}, {
        "emoji": "🥘",
        "position": "53,46",
        "image_data": {"0": 252, "1": 213, "2": 63, "3": 255}
    }, {"emoji": "🥘", "position": "55,42", "image_data": {"0": 252, "1": 213, "2": 63, "3": 255}},
    {
        "emoji": "🗺️",
        "position": "42,49",
        "image_data": {"0": 0, "1": 198, "2": 116, "3": 255}
    }, {"emoji": "🗺️", "position": "45,54", "image_data": {"0": 0, "1": 210, "2": 106, "3": 255}},
    {
        "emoji": "🧭",
        "position": "58,53",
        "image_data": {"0": 199, "1": 153, "2": 168, "3": 255}
    }, {"emoji": "🧭", "position": "55,52", "image_data": {"0": 230, "1": 63, "2": 118, "3": 255}}, {
        "emoji": "🥙",
        "position": "38,38",
        "image_data": {"0": 68, "1": 145, "2": 27, "3": 255}
    }, {"emoji": "🥙", "position": "56,39", "image_data": {"0": 249, "1": 194, "2": 60, "3": 255}}, {
        "emoji": "🦪",
        "position": "44,40",
        "image_data": {"0": 211, "1": 211, "2": 211, "3": 255}
    }, {"emoji": "🦪", "position": "53,54", "image_data": {"0": 244, "1": 244, "2": 244, "3": 255}}, {
        "emoji": "🧶",
        "position": "56,39",
        "image_data": {"0": 0, "1": 116, "2": 186, "3": 255}
    }, {"emoji": "🧶", "position": "53,46", "image_data": {"0": 0, "1": 166, "2": 237, "3": 255}}, {
        "emoji": "🪔",
        "position": "58,53",
        "image_data": {"0": 255, "1": 244, "2": 120, "3": 255}
    }, {"emoji": "🪔", "position": "53,46", "image_data": {"0": 255, "1": 244, "2": 120, "3": 255}}, {
        "emoji": "🦚",
        "position": "40,51",
        "image_data": {"0": 0, "1": 210, "2": 106, "3": 255}
    }, {"emoji": "🦚", "position": "55,52", "image_data": {"0": 0, "1": 166, "2": 237, "3": 255}}, {
        "emoji": "👹",
        "position": "52,51",
        "image_data": {"0": 202, "1": 11, "2": 74, "3": 255}
    }, {"emoji": "👹", "position": "42,49", "image_data": {"0": 192, "1": 11, "2": 73, "3": 255}}, {
        "emoji": "🌌",
        "position": "53,54",
        "image_data": {"0": 0, "1": 116, "2": 186, "3": 255}
    }, {"emoji": "🌌", "position": "42,49", "image_data": {"0": 0, "1": 116, "2": 186, "3": 255}}, {
        "emoji": "☕",
        "position": "40,51",
        "image_data": {"0": 125, "1": 69, "2": 51, "3": 255}
    }, {"emoji": "☕", "position": "52,57", "image_data": {"0": 125, "1": 69, "2": 51, "3": 255}}, {
        "emoji": "🌞",
        "position": "44,40",
        "image_data": {"0": 125, "1": 95, "2": 63, "3": 255}
    }, {"emoji": "🌞", "position": "39,47", "image_data": {"0": 252, "1": 213, "2": 63, "3": 255}}, {
        "emoji": "🐻‍❄️",
        "position": "52,57",
        "image_data": {"0": 244, "1": 244, "2": 244, "3": 255}
    }, {"emoji": "🐻‍❄️", "position": "40,51", "image_data": {"0": 244, "1": 244, "2": 244, "3": 255}}, {
        "emoji": "👰‍",
        "position": "58,39",
        "image_data": {"0": 255, "1": 200, "2": 61, "3": 255}
    }, {"emoji": "👰‍", "position": "42,52", "image_data": {"0": 230, "1": 230, "2": 230, "3": 255}}

]
global.cydata.document = {
    visibilityState: 'visible',
    readyState: 'loading',
    referrer: "",
    currentScript: {"src": "/assets/app/scripts/swa-common.js", "nonce": ""}
}

global.cydata.location = {
    href: "https://www.southwest.com/",
    hostname: 'www.southwest.com',
    protocol: 'https:',
    port: "",
    pathname: "/",
}

// global.cydata.htmljg=[{"tagName":"HTML","children":{"length":5}},{"tagName":"HEAD","children":{"length":68}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"TITLE","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"META","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"NOSCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"LINK","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"IFRAME","children":{"length":0}},{"tagName":"BODY","childElementCount":38,"children":{"0":{"id":"IEWebfontHook"},"length":38}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":0}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":3}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"svg","children":{"length":1}},{"tagName":"image","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SECTION","children":{"length":2}},{"tagName":"H1","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":3}},{"tagName":"DIV","children":{"length":3}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SECTION","children":{"length":7}},{"tagName":"H2","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"UL","children":{"length":2}},{"tagName":"LI","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":1}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":3}},{"tagName":"DIV","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"UL","children":{"length":5}},{"tagName":"LI","children":{"length":1}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"LI","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"LI","children":{"length":1}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"LI","children":{"length":1}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"LI","children":{"length":1}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":6}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":3}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"BR","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"STRONG","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":2}},{"tagName":"INPUT","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"FIELDSET","children":{"length":2}},{"tagName":"LEGEND","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":2}},{"tagName":"INPUT","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":3}},{"tagName":"H3","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":5}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":3}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"UL","children":{"length":12}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"LI","children":{"length":7}},{"tagName":"DIV","children":{"length":3}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":4}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":3}},{"tagName":"DIV","children":{"length":3}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"STRONG","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":25}},{"tagName":"P","children":{"length":2}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"SUP","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":1}},{"tagName":"STRONG","children":{"length":2}},{"tagName":"SUP","children":{"length":0}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":1}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":1}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":5}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"STRONG","children":{"length":0}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"BR","children":{"length":0}},{"tagName":"A","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":1}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":2}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"A","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":1}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":1}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":3}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"SUP","children":{"length":0}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"A","children":{"length":0}},{"tagName":"P","children":{"length":0}},{"tagName":"P","children":{"length":1}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SUP","children":{"length":1}},{"tagName":"BR","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":16}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"STRONG","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"STRONG","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":3}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"STRONG","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"IMG","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":2}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"IMG","children":{"length":0}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"A","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"SPAN","children":{"length":1}},{"tagName":"SPAN","children":{"length":5}},{"tagName":"STYLE","children":{"length":0}},{"tagName":"A","children":{"length":0}},{"tagName":"A","children":{"length":0}},{"tagName":"A","children":{"length":0}},{"tagName":"A","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"IFRAME","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"STYLE","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"DIV","children":{"length":1}},{"tagName":"DIV","children":{"length":2}},{"tagName":"BUTTON","children":{"length":1}},{"tagName":"IMG","children":{"length":0}},{"tagName":"DIV","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"IMG","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"SCRIPT","children":{"length":0}},{"tagName":"IFRAME","children":{"length":0}},{"tagName":"DIV","children":{"length":0}}]
global.cydata.htmljg = [{"tagName": "HTML", "children": {"length": 2}}, {
    "tagName": "HEAD",
    "children": {"length": 1}
}, {"tagName": "META", "children": {"length": 0}}, {
    "tagName": "BODY",
    "childElementCount": 1,
    "children": {"0": {"id": ""}, "length": 1}
}, {"tagName": "PRE", "children": {"length": 0}}]

global.cydata.veidodata = {
    "audio/aac; codecs=\"flac\"": "",
    "audio/flac": "probably",
    "audio/mpeg; codecs=\"mp3\"": "probably",
    "audio/mpeg; codecs=\"vp9\"": "",
    "audio/webm; codecs=\"vp8\"": "",
    "audio/webz": "",
    "audio/x-m4a; codecs=\"mp3\"": "",
    "audio/x-m4a; codecs=\"vp8, mp4a.40\"": "",
    "audio/x-m4a; codecs=\"vp9, mp4a.40.2\"": "",
    "video/mp4": "maybe",
    "video/mp4; codecs=\"ac-3\"": "",
    "video/mp4; codecs=\"avc1.42011E\"": "",
    "video/mp4; codecs=\"avc1.42E009\"": "maybe",
    "video/mp4; codecs=\"avc1.42E034\"": "probably",
    "video/mp4; codecs=\"avc1.42F01E\"": "probably",
    "video/mp4; codecs=\"avc1.4D001E\"": "probably",
    "video/mp4; codecs=\"avc3.42001E\"": "probably",
    "video/mp4; codecs=\"avc3.42E01E, mp4a.40.29\"": "probably",
    "video/mp4; codecs=\"flac\"": "probably",
    "video/mp4; codecs=\"hev1\"": "",
    "video/mp4; codecs=\"hvc1x\"": "",
    "video/mp4; codecs=\"lavc1337\"": "",
    "video/mp4; codecs=\"mp4a.40.02\"": "probably",
    "video/mp4; codecs=\"mp4a.40.5\"": "probably",
    "video/mp4; codecs=\"mp4a.67\"": "probably",
    "video/mp4; codecs=\"opus\"": "probably",
    "video/ogg; codecs=\"flac\"": "probably",
    "video/ogg; codecs=\"opus\"": "probably",
    "video/ogg; codecs=\"vp8\"": "probably",
    "video/webm": "maybe",
    "video/webm; codecs=\"av01.0.04M.08\"": "probably",
    "video/webm; codecs=\"vp09.02.10.08\"": "probably",
    "video/x-dv": "",
    "video/x-m4v; codecs=\"avc1.42AC23\"": "maybe"
}

global.cydata.screen = {availWidth: 2560, availHeight: 1595, width: 2560, height: 1241, colorDepth: 24, pixelDepth: 24}
// global.cydata.screen ={
// 			width: 1920,
// 			height: 1080,
// 			availHeight: 1040,
// 			availLeft: -1920,
// 			availTop: 0,
// 			availWidth: 1920,
// 			pixelDepth: 24,
// 			orientation: {
// 				angle: 0,
// 				onchange: null,
// 				type: "landscape-primary"
// 			}
// 		};
global.cydata.features = ["geolocation", "storage-access", "gamepad", "ch-ect", "midi", "display-capture", "usb", "browsing-topics", "picture-in-picture", "join-ad-interest-group", "publickey-credentials-get", "local-fonts", "otp-credentials", "ch-ua-form-factor", "encrypted-media", "ch-save-data", "ch-ua-full-version-list", "ch-ua-wow64", "shared-storage", "ch-downlink", "ch-prefers-color-scheme", "sync-xhr", "ch-ua-model", "ch-prefers-reduced-transparency", "serial", "camera", "ch-prefers-reduced-motion", "private-state-token-issuance", "bluetooth", "identity-credentials-get", "ch-ua-full-version", "fullscreen", "ch-dpr", "unload", "keyboard-map", "ch-ua-platform", "shared-storage-select-url", "gyroscope", "interest-cohort", "ch-ua-mobile", "window-management", "ch-ua", "run-ad-auction", "publickey-credentials-create", "magnetometer", "accelerometer", "private-state-token-redemption", "ch-ua-arch", "xr-spatial-tracking", "idle-detection", "ch-ua-platform-version", "ch-width", "clipboard-read", "ch-viewport-width", "payment", "ch-viewport-height", "ch-rtt", "autoplay", "cross-origin-isolated", "hid", "ch-ua-bitness", "screen-wake-lock", "private-aggregation", "clipboard-write", "attribution-reporting", "ch-device-memory", "microphone"]
global.cydata.allowedFeatures = ["geolocation", "storage-access", "gamepad", "ch-ect", "midi", "display-capture", "usb", "browsing-topics", "picture-in-picture", "join-ad-interest-group", "publickey-credentials-get", "local-fonts", "otp-credentials", "ch-ua-form-factor", "encrypted-media", "ch-save-data", "ch-ua-full-version-list", "ch-ua-wow64", "shared-storage", "ch-downlink", "ch-prefers-color-scheme", "sync-xhr", "ch-ua-model", "ch-prefers-reduced-transparency", "serial", "camera", "ch-prefers-reduced-motion", "private-state-token-issuance", "bluetooth", "identity-credentials-get", "ch-ua-full-version", "fullscreen", "ch-dpr", "unload", "keyboard-map", "ch-ua-platform", "shared-storage-select-url", "gyroscope", "interest-cohort", "ch-ua-mobile", "window-management", "ch-ua", "run-ad-auction", "publickey-credentials-create", "magnetometer", "accelerometer", "private-state-token-redemption", "ch-ua-arch", "xr-spatial-tracking", "idle-detection", "ch-ua-platform-version", "ch-width", "clipboard-read", "ch-viewport-width", "payment", "ch-viewport-height", "ch-rtt", "autoplay", "cross-origin-isolated", "hid", "ch-ua-bitness", "screen-wake-lock", "private-aggregation", "clipboard-write", "attribution-reporting", "ch-device-memory", "microphone"]

global.cydata.canuser = {
    "geolocation": ["https://www.southwest.com"],
    "storage-access": ["*"],
    "gamepad": ["*"],
    "ch-ect": ["https://www.southwest.com"],
    "midi": ["https://www.southwest.com"],
    "display-capture": ["https://www.southwest.com"],
    "usb": ["https://www.southwest.com"],
    "browsing-topics": ["*"],
    "picture-in-picture": ["*"],
    "join-ad-interest-group": ["*"],
    "publickey-credentials-get": ["https://www.southwest.com"],
    "local-fonts": ["https://www.southwest.com"],
    "otp-credentials": ["https://www.southwest.com"],
    "ch-ua-form-factor": ["https://www.southwest.com"],
    "encrypted-media": ["https://www.southwest.com"],
    "ch-save-data": ["*"],
    "ch-ua-full-version-list": ["https://www.southwest.com"],
    "ch-ua-wow64": ["https://www.southwest.com"],
    "shared-storage": ["*"],
    "ch-downlink": ["https://www.southwest.com"],
    "ch-prefers-color-scheme": ["https://www.southwest.com"],
    "sync-xhr": ["*"],
    "ch-ua-model": ["https://www.southwest.com"],
    "ch-prefers-reduced-transparency": ["https://www.southwest.com"],
    "serial": ["https://www.southwest.com"],
    "camera": ["https://www.southwest.com"],
    "ch-prefers-reduced-motion": ["https://www.southwest.com"],
    "private-state-token-issuance": ["https://www.southwest.com"],
    "bluetooth": ["https://www.southwest.com"],
    "identity-credentials-get": ["https://www.southwest.com"],
    "ch-ua-full-version": ["https://www.southwest.com"],
    "fullscreen": ["https://www.southwest.com"],
    "ch-dpr": ["https://www.southwest.com"],
    "unload": ["*"],
    "keyboard-map": ["https://www.southwest.com"],
    "ch-ua-platform": ["*"],
    "shared-storage-select-url": ["*"],
    "gyroscope": ["https://www.southwest.com"],
    "interest-cohort": ["*"],
    "ch-ua-mobile": ["*"],
    "window-management": ["https://www.southwest.com"],
    "ch-ua": ["*"],
    "run-ad-auction": ["*"],
    "publickey-credentials-create": ["https://www.southwest.com"],
    "magnetometer": ["https://www.southwest.com"],
    "accelerometer": ["https://www.southwest.com"],
    "private-state-token-redemption": ["https://www.southwest.com"],
    "ch-ua-arch": ["https://www.southwest.com"],
    "xr-spatial-tracking": ["https://www.southwest.com"],
    "idle-detection": ["https://www.southwest.com"],
    "ch-ua-platform-version": ["https://www.southwest.com"],
    "ch-width": ["https://www.southwest.com"],
    "clipboard-read": ["https://www.southwest.com"],
    "ch-viewport-width": ["https://www.southwest.com"],
    "payment": ["https://www.southwest.com"],
    "ch-viewport-height": ["https://www.southwest.com"],
    "ch-rtt": ["https://www.southwest.com"],
    "autoplay": ["https://www.southwest.com"],
    "cross-origin-isolated": ["https://www.southwest.com"],
    "hid": ["https://www.southwest.com"],
    "ch-ua-bitness": ["https://www.southwest.com"],
    "screen-wake-lock": ["https://www.southwest.com"],
    "private-aggregation": ["*"],
    "clipboard-write": ["https://www.southwest.com"],
    "attribution-reporting": ["*"],
    "ch-device-memory": ["https://www.southwest.com"],
    "microphone": ["https://www.southwest.com"]
}

global.cydata.canvasdata = {
    'Hel$&?6%){mZ+#@': 'data:image/png;base64,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',
    "Hel$&?6%){mZ+#@\uD83D\uDC7A": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAABNJREFUGFdjZGBg+M+ABhhpIAgAJ4wFAdoS1GgAAAAASUVORK5CYII=',
    'kg5': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAACNbyblAAAAAdasXNSR0IArs4c6QAAABNJREFUGFdjZGBg+M+ABhhpIAgAJ4wFAdoS1GgAAAAASUVORK5CYII='
}
var uas = [
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.119 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'


        ];
var random = Math.floor(Math.random() * uas.length);
var _ua = uas[random];



global.cydata.navigator = {
    userAgent: _ua,
    plugins: {},
    mimeTypes: {},
    appVersion: _ua.replace('Mozilla/',''),
    hardwareConcurrency: 20,
    appCodeName: 'Mozilla',
    appName: 'Netscape',
    maxTouchPoints: 256,
    platform: 'Win32',
    product: 'Gecko',
    productSub: '20030107',
    vendor: 'Google Inc.',
    vendorSub: '',
    doNotTrack: null,
    webdriver: false,

}
global.cydata.navigator.getHighEntropyValues = function () {
    if (arguments[0][0][0] == 'architecture') {
        return Promise.resolve({
            "architecture": "x86",
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}],
            "mobile": false,
            "platform": "Windows"
        })
    }
    if (arguments[0][0][0] == 'bitness') {
        return Promise.resolve({
            "bitness": "64",
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}],
            "mobile": false,
            "platform": "Windows"
        })
    }
    if (arguments[0][0][0] == 'brands') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}], "mobile": false, "platform": "Windows"
        })
    }
    if (arguments[0][0][0] == 'mobile') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}], "mobile": false, "platform": "Windows"
        })
    }
    if (arguments[0][0][0] == 'model') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}], "mobile": false, "model": "", "platform": "Windows"
        })
    }
    if (arguments[0][0][0] == 'platform') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}], "mobile": false, "platform": "Windows"
        })
    }
    if (arguments[0][0][0] == 'platformVersion') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}],
            "mobile": false,
            "platform": "Windows",
            "platformVersion": "15.0.0"
        })
    }
    if (arguments[0][0][0] == 'uaFullVersion') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}],
            "mobile": false,
            "platform": "Windows",
            "uaFullVersion": "123.0.6312.106"
        })
    }
    if (arguments[0][0][0] == 'wow64') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}], "mobile": false, "platform": "Windows", "wow64": false
        })
    }
    if (arguments[0][0][0] == 'fullVersionList') {
        return Promise.resolve({
            "brands": [{"brand": "Google Chrome", "version": "123"}, {
                "brand": "Not:A-Brand",
                "version": "8"
            }, {"brand": "Chromium", "version": "123"}],
            "fullVersionList": [{"brand": "Google Chrome", "version": "123.0.6312.106"}, {
                "brand": "Not:A-Brand",
                "version": "8.0.0.0"
            }, {"brand": "Chromium", "version": "123.0.6312.106"}],
            "mobile": false,
            "platform": "Windows"
        })
    }

}

global.cydata.navigator.matchMedia = function (a) {
    let dt = {
        cydataInfo: {
            media: arguments[0],
            onchange: null,
            matches: false
        }
    }
    let kk = {
        "(max-aspect-ratio: 1/1)": false,
        "(max-aspect-ratio: 2/1)": true,
        "(max-aspect-ratio: 3/1)": true,
        "(max-aspect-ratio: 5/2)": true,
        "(max-aspect-ratio: 9/4)": true,
        "(max-aspect-ratio: 17/8)": true,
        "(max-aspect-ratio: 35/16)": true,
        "(max-aspect-ratio: 71/32)": true,
        "(max-aspect-ratio: 101/2)": true,
        "(max-aspect-ratio: 141/64)": true,
        "(max-aspect-ratio: 281/128)": true,
        "(max-aspect-ratio: 561/256)": true,
        "(max-aspect-ratio: 1121/512)": true,
        "(max-aspect-ratio: 2243/1024)": true,
        "(max-aspect-ratio: 4487/2048)": true,
        "(max-aspect-ratio: 8975/4096)": true,
        "(max-aspect-ratio: 17949/8192)": true,
        "(max-aspect-ratio: 35899/16384)": true,
        "(max-aspect-ratio: 71799/32768)": true,
        "(max-aspect-ratio: 143599/65536)": true,
        "(max-aspect-ratio: 287199/131072)": true,
        "(max-aspect-ratio: 574399/262144)": true,
        "(max-aspect-ratio: 1148797/524288)": true,
        "(max-aspect-ratio: 2297593/1048576)": true,
        "(max-aspect-ratio: 4595187/2097152)": true,
        "(max-aspect-ratio: 9190373/4194304)": true,
        "(max-aspect-ratio: 18380745/8388608)": true,
        "(max-aspect-ratio: 36761489/16777216)": true,
        "(max-aspect-ratio: 73522977/33554432)": true,
        "(max-aspect-ratio: 147045955/67108864)": true,
        "(max-aspect-ratio: 294091911/134217728)": true,
        "(max-aspect-ratio: 588183823/268435456)": true,
        "(max-aspect-ratio: 1176367647/536870912)": true,
        "(max-aspect-ratio: 2352735295/1073741824)": true,
        "(max-aspect-ratio: 4294967295/2147483648)": true,
        "(max-aspect-ratio: 4294967295/4294967295)": false,
        "(min-resolution: 0.0001dpi)": true,
        "(max-resolution: 24dpi)": false,
        "(max-resolution: 48dpi)": false,
        "(max-resolution: 96dpi)": true,
        "(max-resolution: 192dpi)": true,
        "(max-resolution: 144dpi)": true,
        "(max-resolution: 120dpi)": true,
        "(max-resolution: 108dpi)": true,
        "(max-resolution: 114dpi)": true,
        "(max-resolution: 117dpi)": true,
        "(max-resolution: 119dpi)": true,
        "(any-hover: none)": false,
        "(any-hover: hover)": true,
        "(any-pointer: none)": false,
        "(any-pointer: coarse)": true,
        "(any-pointer: fine)": true,
        "(max-color: 8)": true,
        "(max-color: 4)": false,
        "(max-color: 6)": false,
        "(max-color: 7)": false,
        "(color-gamut: srgb)": true,
        "(color-gamut: p3)": false,
        "(color-gamut: rec2020)": false,
        "(max-color-index: 1000)": true,
        "(max-color-index: 500)": true,
        "(max-color-index: 250)": true,
        "(max-color-index: 125)": true,
        "(max-color-index: 62)": true,
        "(max-color-index: 31)": true,
        "(max-color-index: 15)": true,
        "(max-color-index: 7)": true,
        "(max-color-index: 3)": true,
        "(max-color-index: 1)": true,
        "(max-color-index: 0)": true,
        "(display-mode: fullscreen)": false,
        "(display-mode: standalone)": false,
        "(display-mode: minimal-ui)": false,
        "(display-mode: browser)": true,
        "(forced-colors: none)": true,
        "(forced-colors: active)": false,
        "(grid: 0)": true,
        "(grid: 1)": false,
        "(max-height: 600px)": false,
        "(max-height: 1200px)": true,
        "(max-height: 900px)": true,
        "(max-height: 750px)": true,
        "(max-height: 675px)": true,
        "(max-height: 713px)": true,
        "(max-height: 694px)": true,
        "(max-height: 704px)": true,
        "(max-height: 699px)": true,
        "(max-height: 702px)": true,
        "(max-height: 701px)": true,
        "(hover: none)": false,
        "(hover: hover)": true,
        "(inverted-colors: none)": false,
        "(inverted-colors: inverted)": false,
        "(light-level: normal)": false,
        "(light-level: dim)": false,
        "(light-level: washed)": false,
        "(max-monochrome: 1)": true,
        "(max-monochrome: 0)": true,
        "(orientation: landscape)": true,
        "(orientation: portrait)": false,
        "(max-width: 600px)": false,
        "(max-width: 1200px)": true,
        "(max-width: 2400px)": true,
        "(max-width: 1800px)": true,
        "(max-width: 1500px)": true,
        "(max-width: 1650px)": true,
        "(max-width: 1575px)": true,
        "(max-width: 1538px)": true,
        "(max-width: 1519px)": true,
        "(max-width: 1529px)": true,
        "(max-width: 1534px)": true,
        "(max-width: 1536px)": true,
        "(max-width: 1535px)": true,
        "(update: none)": false,
        "(update: slow)": false,
        "(update: fast)": true,
        "(scan: interlace)": false,
        "(scan: progressive)": false,
        "(overflow-block: none)": false,
        "(overflow-block: scroll)": true,
        "(overflow-block: optional-paged)": false,
        "(overflow-block: paged)": false,
        "(prefers-contrast: no-preference)": true,
        "(prefers-contrast: high)": false,
        "(prefers-contrast: low)": false,
        "(pointer: none)": false,
        "(pointer: coarse)": false,
        "(pointer: fine)": true,
        "(prefers-reduced-motion: no-preference)": false,
        "(prefers-reduced-motion: reduce)": true,
        "(scripting: none)": false,
        "(scripting: initial-only)": false,
        "(scripting: enabled)": true,
        "(prefers-reduced-transparency: no-preference)": true,
        "(prefers-reduced-transparency: reduce)": false,
        "(prefers-color-scheme: no-preference)": false,
        "(prefers-color-scheme: light)": false,
        "(prefers-color-scheme: dark)": true,
        "(overflow-inline: none)": false,
        "(overflow-inline: scroll)": true,
        "(q: 1)": false
    }

    if (kk[a]) {
        dt.cydataInfo.matches = kk[a]
    }


    dt.__proto__ = window.MediaQueryList.prototype
    return dt

}

global.cydata.getParameter = function () {
    if (arguments[0] == 37445) {
        return 'Google Inc. (NVIDIA)'
    }
    if (arguments[0] == 37446) {
        return 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 Direct3D11 vs_5_0 ps_5_0, D3D11)'
    }
    if (arguments[0] == 33901) {
        return new Float32Array([1, 1024])
    }
    if (arguments[0] == 3413) {
        return 8
    }
    if (arguments[0] == 3412) {
        return 8
    }
    if (arguments[0] == 3414) {
        return 24
    }
    if (arguments[0] == 3411) {
        return 8
    }
    if (arguments[0] == 34047) {
        return 16
    }
    if (arguments[0] == 35661) {
        return 32
    }
    if (arguments[0] == 34076) {
        return 16384
    }
    if (arguments[0] == 36349) {
        return 1024
    }
    if (arguments[0] == 34024) {
        return 16384
    }
    if (arguments[0] == 34930) {
        return 16
    }
    if (arguments[0] == 3379) {
        return 16384
    }
    if (arguments[0] == 36348) {
        return 30
    }
    if (arguments[0] == 34921) {
        return 16
    }
    if (arguments[0] == 35660) {
        return 16
    }
    if (arguments[0] == 36347) {
        return 4095
    }
    if (arguments[0] == 3386) {
        return new Float32Array([32767, 32767])
    }
    if (arguments[0] == 3410) {
        return 8
    }
    if (arguments[0] == 7937) {
        return "WebKit WebGL"
    }
    if (arguments[0] == 35724) {
        return "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)"
    }
    if (arguments[0] == 3415) {
        return 0
    }
    if (arguments[0] == 7936) {
        return "WebKit"
    }
    if (arguments[0] == 7938) {
        return "WebGL 1.0 (OpenGL ES 2.0 Chromium)"
    }
}


window.innerHeight = 1167
window.innerWidth = 1549
window.outerHeight = 890
window.outerWidth = 1265
window.screenX = 21
window.screenY = 19
window.devicePixelRatio = 1
window['undefined'] = undefined
window.isSecureContext = true
window.toolbar = {visible: true}
window.locationbar = {visible: true}


window.datInfo = {}
window.screen = {}
window.unescape = unescape
global.documentListenerList = {};
window.document = {}
window.navigator = {}
window.crypto = {
    getRandomValues: function () {
        console.log("getRandomValues", arguments)
        return global.webcrypto.getRandomValues(...arguments)
    }
}
// window.console = { // 需要补全有检测
//     error: function () {
//         console.log(...arguments)
//     },
//     log: function () {
//         // if (arguments[0].stack){
//         //     throw
//         // }
//         console.log(...arguments, global.newzhilxz)
//     },
//
// }
//
//
// cydom.setNative(window.console,window.console.log,'log', true, 1);
// cydom.setNative(window.console,window.console.error,'error', true, 1);

window.history = {length: 2, scrollRestoration: 'auto', state: null}
window.CSS = {
    supports: function () {
        console.log("window.CSSsupports", arguments)
        return true
    }
}
console._log = console.log
console.log = function () {
}
window.Float64Array = Float64Array
window.Int8Array = Int8Array
window.Uint8ClampedArray = Uint8ClampedArray
window.Int16Array = Int16Array
window.Uint16Array = Uint16Array
window.Uint32Array = Uint32Array

window.Map = Map
window.Set = Set
window.WeakMap = WeakMap
window.Proxy = function () {
    console.log("cyProxy", arguments)
    return new Proxy(...arguments)
}
window.cydom.setNative(window, window['Proxy'], 'Proxy', false, 0, 1);


window.matchMedia = function () {
    console.log("matchMedia call", arguments)
    return global.cydata.navigator.matchMedia(...arguments)
}
window.cydom.setNative(window, window['matchMedia'], 'matchMedia', true, 1);


window.WeakSet = WeakSet
// window.Blob = Blob

window.cbb_xhrList = []
window.cbb_setTimeout = []
window.cbb_setInterval = []

window.gggg = 0
window.setTimeout = function () {
    console.log("setTimeout", arguments)
    let v = arguments[0]
    let b = window.gggg
    window.gggg += 1
    arguments[0] = function () {
        console.log(b)
        v()
    }
    window.cbb_setTimeout.push(setTimeout(...arguments))
}
window.setInterval = function () {
    console.log("setInterval", arguments)
    // window.cbb_setInterval.push([arguments[1], arguments[0]])
    window.cbb_setInterval.push(setInterval(...arguments))
}
// window.setInterval =setInterval
// window.setTimeout =setTimeout
window.cydom.setNative(window, window['setInterval'], 'setInterval', true, 1);
window.cydom.setNative(window, window['setTimeout'], 'setTimeout', true, 1);
window.clearInterval = clearInterval
window.performance = performance
window.Float32Array = Float32Array
window.Int32Array = Int32Array
window.Error = Error
window.ArrayBuffer = ArrayBuffer
window.Object = Object
window.Object = Object
window.cbb_getOwnPropertyNames = Object.getOwnPropertyNames
window.Object.getOwnPropertyNames = function () {
    // console.log(arguments)
    if (arguments[0] == window) {
        let h = []
        for (let g = 0; g < 1170; g++) {
            h.push("Object")
        }
        return h
    }
    return window.cbb_getOwnPropertyNames.apply(Object, arguments)
}
cydom.setNative(window.Object, window.Object.getOwnPropertyNames, 'getOwnPropertyNames', true, 1);
window.Promise = Promise
window.Function = Function
window.TypeError = TypeError
window.Reflect = Reflect
window.Uint8Array = Uint8Array


window.isFinite = isFinite
window.isNaN = isNaN
window.parseFloat = parseFloat
window.parseInt = parseInt
window.encodeURI = encodeURI
window.encodeURIComponent = encodeURIComponent
window.decodeURI = decodeURI
window.decodeURIComponent = decodeURIComponent
window.Number = Number
window.external = {}
window.JSON = JSON
window.pageYOffset = 0

//"A7dHQhuRAQAA4DZJxpBbS8UA_bt3FGZunqpIipyLwac-sIA2H_zWpaAnVyigASvldw2uck0XwH8AAEB3AAAAAA=="
window.localStorage = {
    l_FTzyeq12rr: "17227396569493943208406",
    FTzyeq12rr: "A6ubRhuRAQAAb-6oJ8-yzt6n1QQQ7JNEOrrwuVGAWXVDHRKUZ_Gpd6JP4lAsASvldw2uck0XwH8AAEB3AAAAAA==",
    length: 2
}


window.localStorage.getItem = function () {
    console.log("getItem", arguments)
    if (arguments[0] == 'l_FTzyeq12rr') {
        // debugger
    }
    return window.localStorage[arguments[0]]
}

window.localStorage.setItem = function () {
    console.log("setItem", arguments)
    window.localStorage[arguments[0]] = arguments[1]
}
window.localStorage.removeItem = function () {
    console.log("removeItem", arguments)
    delete window.localStorage[arguments[0]]
}
window.sessionStorage = {}


window.String = String

// window.RegExp = function (){
//     console.log(arguments)
//     return RegExp(...arguments)
// }
window.RegExp = RegExp
window.Date = Date
window.Math = Math
window.Array = Array


let windowListenerList = {}

window.testad = undefined
window.addEventListener = function () {
    console.log("addEventListener", arguments)
    if (arguments[0] == 'deviceorientation') {
        window.testad = arguments[1]
    }
    windowListenerList[arguments[0]] = arguments[1]
}

window.addEventListener = proxy(window.addEventListener, "addEventListener")
window.dispatchEvent = function () {
    console.log("dispatchEvent", arguments)
    if (windowListenerList[arguments[0].type]) {
        windowListenerList[arguments[0].type](arguments[0])
        return true
    }
    return true
}
window.dispatchEvent = proxy(window.dispatchEvent, "dispatchEvent")


window.removeEventListener = function () {
    console.log("removeEventListener", arguments)
    delete windowListenerList[arguments[0]]
    return true
}
window.removeEventListener = proxy(window.removeEventListener, "removeEventListener")

//

window.fetch = function () {
    console.log("fetch", arguments)
    return true
}
cydom.setNative(window, window.fetch, 'fetch', true, 1);
window.fetch = proxy(window.fetch, "fetch")

// //
//
// window.unescape = function (){
//     console.log("unescape", arguments)
//     return true
// }
// cydom.setNative(window,window.unescape,'unescape', true, 1);
// window.unescape = proxy(window.unescape, "unescape")


//postMessage

window.postMessage = function () {
    console.log("postMessage", arguments)
    return true
}
cydom.setNative(window, window.postMessage, 'postMessage', true, 1);


//structuredClone

window.structuredClone = function () {
    console.log("structuredClone", arguments)
    throw new TypeError("Failed to execute 'structuredClone' on 'Window': Navigator object could not be cloned.")
    return true
}
cydom.setNative(window, window.structuredClone, 'structuredClone', true, 1);
window.structuredClone = proxy(window.structuredClone, "structuredClone")


//requestAnimationFrame

window.requestAnimationFrame = function () {
    console.log("requestAnimationFrame", arguments)
    return true
}
cydom.setNative(window, window.requestAnimationFrame, 'requestAnimationFrame', true, 1);
window.requestAnimationFrame = proxy(window.requestAnimationFrame, "requestAnimationFrame")


//
// Animation
function Animation() {
    console.log("Animation");
}

window.Animation = Animation

cydom.setNative(window.Animation, Animation, 'Animation', false, 0, 1);


window.Animation = proxy(window.Animation, "Animation")

// CompressionStream
function CompressionStream() {
    console.log("CompressionStream");
}

window.CompressionStream = CompressionStream

cydom.setNative(window.CompressionStream, CompressionStream, 'CompressionStream', false, 0, 1);


window.CompressionStream = proxy(window.CompressionStream, "CompressionStream")


// webkitRequestAnimationFrame
function webkitRequestAnimationFrame() {
    console.log("webkitRequestAnimationFrame");
}

window.webkitRequestAnimationFrame = webkitRequestAnimationFrame

cydom.setNative(window.webkitRequestAnimationFrame, webkitRequestAnimationFrame, 'webkitRequestAnimationFrame', false, 0, 1);


window.webkitRequestAnimationFrame = proxy(window.webkitRequestAnimationFrame, "webkitRequestAnimationFrame")


// webkitResolveLocalFileSystemURL
function webkitResolveLocalFileSystemURL() {
    console.log("webkitResolveLocalFileSystemURL");
}

window.webkitResolveLocalFileSystemURL = webkitResolveLocalFileSystemURL

cydom.setNative(window.webkitResolveLocalFileSystemURL, webkitResolveLocalFileSystemURL, 'webkitResolveLocalFileSystemURL', false, 0, 1);


window.webkitResolveLocalFileSystemURL = proxy(window.webkitResolveLocalFileSystemURL, "webkitResolveLocalFileSystemURL")


// webkitRTCPeerConnection
function webkitRTCPeerConnection() {
    console.log("webkitRTCPeerConnection");
}

window.webkitRTCPeerConnection = webkitRTCPeerConnection

cydom.setNative(window.webkitRTCPeerConnection, webkitRTCPeerConnection, 'webkitRTCPeerConnection', false, 0, 1);


window.webkitRTCPeerConnection = proxy(window.webkitRTCPeerConnection, "webkitRTCPeerConnection")


// BluetoothUUID
function BluetoothUUID() {
    console.log("BluetoothUUID");
}

window.BluetoothUUID = BluetoothUUID

cydom.setNative(window.BluetoothUUID, BluetoothUUID, 'BluetoothUUID', false, 0, 1);


window.BluetoothUUID = proxy(window.BluetoothUUID, "BluetoothUUID")


// AuthenticatorAttestationResponse
function AuthenticatorAttestationResponse() {
    console.log("AuthenticatorAttestationResponse");
}

window.AuthenticatorAttestationResponse = AuthenticatorAttestationResponse

cydom.setNative(window.AuthenticatorAttestationResponse, AuthenticatorAttestationResponse, 'AuthenticatorAttestationResponse', false, 0, 1);


window.AuthenticatorAttestationResponse = proxy(window.AuthenticatorAttestationResponse, "AuthenticatorAttestationResponse")


// AuthenticatorAssertionResponse
function AuthenticatorAssertionResponse() {
    console.log("AuthenticatorAssertionResponse");
}

window.AuthenticatorAssertionResponse = AuthenticatorAssertionResponse

cydom.setNative(window.AuthenticatorAssertionResponse, AuthenticatorAssertionResponse, 'AuthenticatorAssertionResponse', false, 0, 1);


window.AuthenticatorAssertionResponse = proxy(window.AuthenticatorAssertionResponse, "AuthenticatorAssertionResponse")


// PublicKeyCredential
function PublicKeyCredential() {
    console.log("PublicKeyCredential");
}

window.PublicKeyCredential = PublicKeyCredential

cydom.setNative(window.PublicKeyCredential, PublicKeyCredential, 'PublicKeyCredential', false, 0, 1);


window.PublicKeyCredential = proxy(window.PublicKeyCredential, "PublicKeyCredential")


// Comment
function Comment() {
    console.log("Comment");
}

window.Comment = Comment

cydom.setNative(window.Comment, Comment, 'Comment', false, 0, 1);


window.Comment = proxy(window.Comment, "Comment")

// PushManager
function PushManager() {
    console.log("PushManager");
}

window.PushManager = PushManager

cydom.setNative(window.PushManager, PushManager, 'PushManager', false, 0, 1);


window.PushManager = proxy(window.PushManager, "PushManager")


// DOMException
function DOMException() {
    console.log("DOMException");
}

window.DOMException = DOMException

cydom.setNative(window.DOMException, DOMException, 'DOMException', false, 0, 1);


window.DOMException = proxy(window.DOMException, "DOMException")


// DOMMatrixReadOnly
function DOMMatrixReadOnly() {
    console.log("DOMMatrixReadOnly");
}

window.DOMMatrixReadOnly = DOMMatrixReadOnly

cydom.setNative(window.DOMMatrixReadOnly, DOMMatrixReadOnly, 'DOMMatrixReadOnly', false, 0, 1);


window.DOMMatrixReadOnly = proxy(window.DOMMatrixReadOnly, "DOMMatrixReadOnly")


// FileReader
function FileReader() {
    console.log("FileReader");
}

window.FileReader = FileReader

cydom.setNative(window.FileReader, FileReader, 'FileReader', false, 0, 1);


window.FileReader = proxy(window.FileReader, "FileReader")


// FormData
function FormData() {
    console.log("FormData");
    return proxy({}, "FormData new")
}

window.FormData = FormData

cydom.setNative(window.FormData, FormData, 'FormData', false, 0, 1);


window.FormData = proxy(window.FormData, "FormData")


// Audio
function Audio() {
    console.log("Audio");
}

window.Audio = Audio

cydom.setNative(window.Audio, Audio, 'Audio', false, 0, 1);


window.Audio = proxy(window.Audio, "Audio")


// Image
function Image() {
    console.log("Image");
    this.cbb_dt = {}
    return this
}

window.Image = Image

cydom.setNative(window.Image, Image, 'Image', false, 0, 1);


window.Image = proxy(window.Image, "Image")

// Option
function Option() {
    console.log("Option");
    return proxy({}, "Option new")
}

window.Option = Option

cydom.setNative(window.Option, Option, 'Option', false, 0, 1);


window.Option = proxy(window.Option, "Option")


// IntersectionObserver
function IntersectionObserver() {
    console.log("IntersectionObserver");
}

window.IntersectionObserver = IntersectionObserver

cydom.setNative(window.IntersectionObserver, IntersectionObserver, 'IntersectionObserver', false, 0, 1);


window.IntersectionObserver = proxy(window.IntersectionObserver, "IntersectionObserver")

// MediaStream
function MediaStream() {
    console.log("MediaStream");
}

window.MediaStream = MediaStream

cydom.setNative(window.MediaStream, MediaStream, 'MediaStream', false, 0, 1);


window.MediaStream = proxy(window.MediaStream, "MediaStream")


// MessageChannel
function MessageChannel() {
    console.log("MessageChannel");
    return proxy({}, "MessageChannel new")
}

window.MessageChannel = MessageChannel

cydom.setNative(window.MessageChannel, MessageChannel, 'MessageChannel', false, 0, 1);


window.MessageChannel = proxy(window.MessageChannel, "MessageChannel")


// Path2D
function Path2D() {
    console.log("Path2D");
}

window.Path2D = Path2D

cydom.setNative(window.Path2D, Path2D, 'Path2D', false, 0, 1);


window.Path2D = proxy(window.Path2D, "Path2D")


// PerformanceObserver
function PerformanceObserver() {
    console.log("PerformanceObserver");
}

window.PerformanceObserver = PerformanceObserver

cydom.setNative(window.PerformanceObserver, PerformanceObserver, 'PerformanceObserver', false, 0, 1);


window.PerformanceObserver = proxy(window.PerformanceObserver, "PerformanceObserver")


// ReadableStream
function ReadableStream() {
    console.log("ReadableStream");
}

window.ReadableStream = ReadableStream

cydom.setNative(window.ReadableStream, ReadableStream, 'ReadableStream', false, 0, 1);


window.ReadableStream = proxy(window.ReadableStream, "ReadableStream")


// Text
function Text() {
    console.log("Text");
}

window.Text = Text

cydom.setNative(window.Text, Text, 'Text', false, 0, 1);


window.Text = proxy(window.Text, "Text")


// TextDecoderStream
function TextDecoderStream() {
    console.log("TextDecoderStream");
}

window.TextDecoderStream = TextDecoderStream

cydom.setNative(window.TextDecoderStream, TextDecoderStream, 'TextDecoderStream', false, 0, 1);


window.TextDecoderStream = proxy(window.TextDecoderStream, "TextDecoderStream")


// TransformStream
function TransformStream() {
    console.log("TransformStream");
}

window.TransformStream = TransformStream

cydom.setNative(window.TransformStream, TransformStream, 'TransformStream', false, 0, 1);


window.TransformStream = proxy(window.TransformStream, "TransformStream")


// URLSearchParams
function URLSearchParams() {
    console.log("URLSearchParams");
    return proxy({}, "URLSearchParams new")
}

window.URLSearchParams = URLSearchParams

cydom.setNative(window.URLSearchParams, URLSearchParams, 'URLSearchParams', false, 0, 1);


window.URLSearchParams = proxy(window.URLSearchParams, "URLSearchParams")


// DOMPointReadOnly
function DOMPointReadOnly() {
    console.log("DOMPointReadOnly");
}

window.DOMPointReadOnly = DOMPointReadOnly

cydom.setNative(window.DOMPointReadOnly, DOMPointReadOnly, 'DOMPointReadOnly', false, 0, 1);


window.DOMPointReadOnly = proxy(window.DOMPointReadOnly, "DOMPointReadOnly")


// XMLSerializer
function XMLSerializer() {
    console.log("XMLSerializer");
}

window.XMLSerializer = XMLSerializer

cydom.setNative(window.XMLSerializer, XMLSerializer, 'XMLSerializer', false, 0, 1);


window.XMLSerializer = proxy(window.XMLSerializer, "XMLSerializer")


// DOMPoint
function DOMPoint() {
    console.log("DOMPoint");
    return proxy({}, "DOMPoint new")
}

window.DOMPoint = DOMPoint

cydom.setNative(window.DOMPoint, DOMPoint, 'DOMPoint', false, 0, 1);


window.DOMPoint = proxy(window.DOMPoint, "DOMPoint")


// DOMParser
function DOMParser() {
    console.log("DOMParser");
    return proxy({}, "DOMParser new")
}

window.DOMParser = DOMParser

cydom.setNative(window.DOMParser, DOMParser, 'DOMParser', false, 0, 1);


window.DOMParser = proxy(window.DOMParser, "DOMParser")

window.window = window
window.self = window  // == 的问题需要解决

window = proxy(window, "window")

module.exports = window;