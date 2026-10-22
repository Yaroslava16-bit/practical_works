// ==========================================
// ЧАСТЬ 2: РЕАЛИЗАЦИЯ БАЗОВЫХ АЛГОРИТМОВ
// ==========================================

// Временная сложность: O(sqrt(n))
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
}

// Временная сложность: O(n)
function factorial(n) {
    if (n < 0) return -1;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Временная сложность: O(n)
function fibonacci(n) {
    const result = [];
    if (n <= 0) return result;
    result.push(0);
    if (n === 1) return result;
    result.push(1);
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}

// Временная сложность: O(log(min(a, b)))
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// ==========================================
// ЧАСТЬ 3: ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРОКАМИ
// ==========================================

// Временная сложность: O(n)
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Временная сложность: O(n)
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiouy';
    const cleanStr = str.toLowerCase();
    let count = 0;
    for (let char of cleanStr) {
        if (vowels.includes(char)) count++;
    }
    return count;
}

// Временная сложность: O(n)
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Временная сложность: O(n)
function findLongestWord(sentence) {
    const words = sentence.split(' ');
    let longest = '';
    for (let word of words) {
        const cleanWord = word.replace(/[^а-яёa-z]/gi, '');
        if (cleanWord.length > longest.length) {
            longest = cleanWord;
        }
    }
    return longest;
}

// ==========================================
// ЧАСТЬ 4: ФУНКЦИИ ДЛЯ РАБОТЫ С МАССИВАМИ
// ==========================================

// Временная сложность: O(n) - линейная
function findMax(arr) {
    if (!arr || arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Временная сложность: O(n)
function removeDuplicates(arr) {
    const unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (!unique.includes(arr[i])) {
            unique.push(arr[i]);
        }
    }
    return unique;
}

// Временная сложность: O(n^2) - квадратичная
function bubbleSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                let temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }
    return sorted;
}

// Временная сложность: O(log n) - логарифмическая
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedArr[mid] === target) return mid;
        if (sortedArr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// ==========================================
// ЧАСТЬ 5: УТИЛИТАРНЫЕ ФУНКЦИИ
// ==========================================

// Временная сложность: O(1)
function formatCurrency(amount, currency = '₽') {
    const fixed = amount.toFixed(2);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.') + ' ' + currency;
}

// Временная сложность: O(n)
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Временная сложность: O(n)
function generatePassword(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}
