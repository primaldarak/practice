let num1, num2, a, b, i, j;

num1 = prompt('Enter first number: ');

num2 = prompt('Enter second number: ');

a = parseInt(num1);
b = parseInt(num2);

if (a > b || isNaN(a) || isNaN(b)) {
  alert('Invalid input data');
}

let outputArray = new Array(0);

for (i = a + 1; i < b; i++) {
  outputArray.push(i);
}

alert('First number: ' + a + '\nSecond number: ' + b + '\nNumbers between: ' + outputArray);