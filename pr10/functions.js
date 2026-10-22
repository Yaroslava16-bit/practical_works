// ==========================================
// ЧАСТЬ 2: ОСНОВНЫЕ ЗАДАНИЯ
// ==========================================

// 1. Функция с rest parameters
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

// 2. Деструктуризация объекта с параметрами по умолчанию
function createUser({ name, age, email = "не указан" }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

// 3. Замыкание (Closure)
function secretMessage(password, message) {
    return function(inputPassword) {
        return inputPassword === password ? message : "Доступ запрещен";
    };
}

// ==========================================
// ЧАСТЬ 3: РЕКУРСИЯ И ФУНКЦИИ ВЫСШЕГО ПОРЯДКА
// ==========================================

// 4. Композиция функций
function compose(...functions) {
    return function(...args) {
        // Выполняем функции справа налево
        return functions.reduceRight((acc, fn, index) => {
            // Для самой первой (правой) функции передаем все аргументы
            return index === functions.length - 1 ? fn(...args) : fn(acc);
        }, null);
    };
}

// 5. Собственный метод map
function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

// 6. Собственный метод filter
function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

// 7. Собственный метод reduce
function myReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    // Если начальное значение не передано, берем первый элемент массива
    if (accumulator === undefined) {
        if (array.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

// ==========================================
// ЧАСТЬ 4: СЛОЖНО, НО ВАЖНО
// ==========================================

// 8. Каррирование
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...args2) {
            return curried.apply(this, args.concat(args2));
        };
    };
}

// 9. Мемоизация
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(`[memoize] Взято из кэша: ${key}`);
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// 10. Дебаунсинг (откладывает вызов до паузы)
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 11. Троттлинг (ограничивает частоту вызовов)
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// 12. Функция-валидатор (возвращает функцию проверки)
function createValidator(options) {
    return function(str) {
        if (options.minLength && str.length < options.minLength) {
            return false;
        }
        if (options.hasDigit && !/\d/.test(str)) {
            return false;
        }
        if (options.hasUppercase && !/[A-Z]/.test(str)) {
            return false;
        }
        return true;
    };
}
