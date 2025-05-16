
// Check if a number is even or odd
function isEven(n) {
    console.log(n % 2 === 0)
    if (n % 2 === 0) {
        return "even"
    }
    return "odd"
}

// Calculate factorial of a number
function factorial(n) {
    let num = 1
    for (let i = 2; i <= n; i++) {
        console.log(i)
        num *= i;
    }
    return num
}

// Find the sum of an array
function sumArr(n) {
    let num = 0
    for (let i = 0; i < n.length; i++) {
        console.log(n[i])
        num += n[i];
    }
    return num
}

// Find the smallest number in an array
function smallestNum(n) {
    const sortNum = n.sort((a, b) => a - b);
    console.log(sortNum)
    return sortNum[0]
}

// Check if a character is a vowel
function isVowel(n) {
    const vowel = ['a', 'e', 'i', 'o', 'u'];
    let result = vowel.includes(n);
    return result
}

// Convert Celsius to Fahrenheit
function celsiustoFahrenheit(n) {
    return 9 / 5 * n + 32
}

// Print multiplication table of a number
function multiplication(n) {
    let num = []
    for (let i = 1; i <= 10; i++) {
        num.push(n * i)
    }
    return num;
}

// Swap two variables
function swap(a, b) {
    return `a = ${b}, b = ${a}`
}

// Find the second largest number
function secondLargest(arr) {
    return arr.sort((a, b) => b - a)[1]
}

// Count vowels in a string
function countVowels(str) {
    const vowel = ['a', 'e', 'i', 'o', 'u'];
    const newstr = str.split('');
    let count = 0
    for (let i = 0; i < newstr.length; i++) {
        const element = newstr[i];
        if (vowel.includes(element)) {
            count++
        }

    }

    return count
}

// Check if string is palindrome
function isPalindrome(str) {
    return str.split('').reverse().join('') === str
}

// Find all even numbers up to N

function Evennumbers(n) {
    const arr = []
    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            arr.push(i)
        }
    }
    return arr
}

// Sum of digits
function sumOfDigits(num) {
    const arr = num.toString().split('')
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        count += Number(arr[i]);

    }
    return count
}

// Check Armstrong number
function armstrongNumber(num) {
    const arr = num.toString().split('')
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        count += Number(arr[i]) ** arr.length;
    }
    if (count === num) {
        return true
    }
    return false
}
console.log(armstrongNumber(54748))