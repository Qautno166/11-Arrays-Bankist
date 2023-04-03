'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(dep => dep > 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.user = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);
const user = 'Steven Thomas Williams'; // stw
const updateUI = function (acc) {
  displayMovements(acc.movements);

  //Display balance
  calcPrintBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};
//Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.user === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value.split(' ')[0])) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Display movements
    updateUI(currentAccount);
  } else {
    containerApp.style.opacity = 0;
    inputLoginUsername.value = inputLoginPin.value = '';
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(acc => acc.user === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc.user !== currentAccount.user
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);
    alert(`Przelew wykonany do ${reciverAcc.owner} o kwocie ${amount}€`);
  }
  updateUI(currentAccount);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.user &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc.user === currentAccount.user);
    console.log(index);

    //Delete user
    accounts.splice(index, 1);

    //Log out//Hide
    containerApp.style.opacity = 0;
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log('all ok');
    currentAccount.movements.push(amount);
  }
  updateUI(currentAccount);
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
console.log((containerMovements.innerHTML = ''));
// console.log(username.join(''));

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' 
function from the previous challenge,  
but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const ages = [5, 2, 4, 1, 15, 8, 3];
let ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = ages
  .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
  .filter(age => age > 18)
  .reduce((age, curr, i, arr) => age + curr / arr.length, 0);
console.log(calcAverageHumanAge);

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   const adults = humanAge.filter();
//   const avrage = adults.reduce((age, curr) => age + curr / adults.length, 0);
//   console.log(avrage);
// };

// calcAverageHumanAge(ages2);
// calcAverageHumanAge(ages);

// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about 
their dog's age, and stored the data into an array (one array for each). For now, 
they are just interested in knowing whether a dog is an adult or a puppy. A dog is
 an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages
 ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats,
 not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that 
 copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult 
("Dog number 1 is an adult, and is 5 years old") or a puppy 
("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];
// dogsJulia.filter(2);

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, 3);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   dogs.forEach(function (age, num) {
//     if (age > 3) {
//       console.log(`Dog number ${num + 1} is an adult, and is ${age} years old`);
//     } else {
//       console.log(`Dog number ${num + 1} is still a puppy 🐶`);
//     }
//   });
//   console.log(dogs);
//   if (dogs > 3) {
//   }
//   // if()
//   console.log(dogsJuliaCorrected);
// };

// checkDogs(dogsJulia, dogsKate);
// checkDogs();
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

console.log(arr.splice(2, 4));
console.log(arr);

//Reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'k', 'l', 'm', 'n'];
console.log(arr.reverse());
console.log(arr);

const letters = arr.reverse().concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

console.log(letters.join(' - '));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, value] of movements.entries()) {
  if (value > 0) {
    console.log(`Transaction ${i + 1}: You deposit: ${value} PLN`);
  } else {
    console.log(`Transaction ${i + 1}: You withdrew: ${Math.abs(value)} PLN`);
  }
}

console.log('----------forEach--------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Transaction ${i + 1}: You deposit: ${mov} PLN`);
  } else {
    console.log(`Transaction ${i + 1}: You withdrew: ${Math.abs(mov)} PLN`);
  }
});

//Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
console.log(currencies);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
//Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, map) {
  console.log(`${value}: ${value}`);
});

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * euroToUsd);

// const movementsUSD = movements.map(function (mov, i) {
//   return mov * euroToUsd;
// });
// console.log(movements);
// console.log(movementsUSD);
// const newA = [];
// for (const movementsUsd of movements) {
//   newA.push(movementsUsd * euroToUsd);
// console.log(newA);

// const movementsDescription = movements.map(
//   (mov, i) =>
//     `Transaction ${i + 1}: You ${mov > 0 ? 'deposit' : 'withdrew'}:
// ${Math.abs(mov)} PLN`

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositFor = [];
for (const mov of movements) {
  if (mov > 0) depositFor.push(mov);
}
console.log(depositFor);

const withdrawals = movements.filter(move => move < 0);
console.log(withdrawals);

const withD = [];
for (const mov of movements) {
  if (mov < 0) withD.push(mov);
}
console.log(withD);

console.log(movements);
// accumulator jest jest kóla sniezna

const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}:${acc}`);
  return acc + cur;
}, 0);

const balance2 = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance2);

let balance3 = 0;
for (const mov of movements) balance3 = balance3 + mov; //balance3+=mov
console.log(balance3);

//Maximum value
const max = movements.reduce((acc, cur) => {
  if (acc > cur) {
    return acc;
  } else {
    return (acc = cur);
  }
});
console.log(max);
*/

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. 
This time, they want to convert dog ages to human ages 
and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', 
which accepts an arrays of dog's ages ('ages'), 
and does the following things in order:

1. Calculate the dog age in human years using the following formula:

if the dog is <= 2 years old, humanAge = 2 * dogAge. 
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.

2. Exclude all dogs that are less than 18 human years old 
(which is the same as keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs 
(you should already know from other challenges how we calculate averages 😉)

4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const ages = [5, 2, 4, 1, 15, 8, 3];
// const ages2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = ages.map(age =>
//   age <= 2 ? age * 2 : 16 + age * 2
// );
// const nowy = calcAverageHumanAge.filter(age => age > 18);

// const avrage = nowy.reduce((age, curr) => age + curr / nowy.length, 0);

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   console.log(humanAge);
//   const adults = humanAge.filter(age => age > 18);
//   console.log(adults);
//   const avrage = adults.reduce((age, curr) => age + curr / adults.length, 0);
//   console.log(avrage);
// };

// calcAverageHumanAge(ages2);
// calcAverageHumanAge(ages);
// const nowy = calcAverageHumanAge.filter(age => age > 18);

// const avrage = nowy.reduce((age, curr) => age + curr / nowy.length, 0);

// const euroToUsd = 1.1;

// //PIPELINE
// const totalDeposit = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUsd)
//   //////Checkin//////
//   // .map((mov, i, arr) => {
//   //   console.log(arr);
//   //   return mov * euroToUsd;
//   // })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDeposit);
//Find bierze wylacznie pierwszo

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// let foundAccount;

// for (const account of accounts) {
//   if (account.owner === `Jessica Davis`) {
//     foundAccount = account;
//     break;
//   }
// }
// console.log(foundAccount);

// let loginName;
// for (const own of accounts) {
//   if (own.owner === `Steven Thomas Williams`) {
//     loginName = own;
//     break;
//   }
// }
// console.log(loginName);

//   // console.log(newA);
// }
// // console.log(loginName);

// const AAA = loginName.filter(mov => loginName.owner === 'Jessica Davis');

// // console.log(AAA);

// console.log(movements.includes(-130));

// console.log(movements.some(mov => mov === -130));
// const anyDeposit = movements.some(mov => mov > 0);
// console.log(anyDeposit);

// //Every
// console.log(account4.movements.every(mov => mov > 0));

// Separate Callback
// const deposit = mov => mov > 0;

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr);
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep);
// console.log(arrDeep.flat(2));

// const allAccountsMov = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(allAccountsMov);

// const allAccountsMov2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(allAccountsMov2);

// //String
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());

// //Number
// console.log(movements);

// movements.sort((a, b) => a - b);
// console.log(movements);

// movements.sort((a, b) => b - a);
// console.log(movements);

// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// //Empty arrays + dill method
// const x = new Array(7);
// console.log(x);
// // x.fill(1);
// // console.log(x);

// x.fill(1, 3, 5);
// console.log(x);
// arr.fill(23, 2, 6);
// console.log(arr);

// //Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 100 }, (cur, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI);
// });

// console.log(Match.trunc(20.2), 49);

//Practice
//1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, i) => acc + i, 0);
console.log(bankDepositSum);
//2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000)
  .reduce((c, s, array) => array + 1);
console.log(numDeposits1000);
const numDeposits1000a = accounts
  .flatMap(acc => acc.movements)
  .reduce((sum, cur) => (cur >= 1000 ? ++sum : sum), 0);
console.log(numDeposits1000a);

//3
// const newObject = { deposit: [], withdrawals: [] };
// // cosnt;
// newObject.deposit = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, i) => acc + i, 0);
// newObject.withdrawals = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov < 0)
//   .reduce((acc, i) => acc + i, 0);
// console.log(newObject);

//4
// const sum = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, curr) => {
//       curr > 0;
//       // ? (sums.deposit = sums.deposit + curr)
//       // : (sums.withdrawals = sums.withdrawals + curr);
//       sums[curr > 0 ? 'deposit' : 'withdrawals'] =
//         sums[curr > 0 ? 'deposit' : 'withdrawals'] + curr;
//       return sums;
//     },
//     { deposit: 0, withdrawals: 0 }
//   );
// console.log(sum);

// //5
// const convertTitleCase = function (title) {
//   const capitzalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
//     .join(' ');
//   return capitzalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

/* 

Julia and Kate are still studying dogs, and this time they are studying if dogs are 
eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended 
portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above 
and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the 
recommended food portion and add it to the object as a new property. Do NOT create a 
new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28.
 (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little.

 HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array,
  and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch')
 and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice
 and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is 
recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or
   false)

7. Create an array containing the dogs that are eating an OKAY amount of food 
(try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion 
in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary 
lecture to choose between them 😉

HINT 2: Being within a range 10% above and below the recommended 
portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
// TEST DATA:

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2

const SarahDogs = dogs.find(dog => dog.owners.includes('Sarah'));
SarahDogs.curFood > SarahDogs.recFood
  ? console.log('Piesek Sary je za duzo')
  : console.log('Piesek Sary je za mało');

//3 & 4
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners)
  .join(' and ');

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners)
  .join(' and ');
//4
console.log(`${ownersEatTooMuch} dog's eating to much`);
console.log(`${ownersEatTooLittle} dog's eating not enought`);

//5

const EXACTLY = dogs.some(eat => eat.curFood === eat.recFood);
console.log(EXACTLY);
//6
// current > (recFood * 0.90) && current < (recommended * 1.10)
const healthyEat = eat =>
  eat.curFood > eat.recFood * 0.9 && eat.curFood < eat.recFood * 1.1;

const recommendedFood = dogs.some(healthyEat);

console.log(recommendedFood);

//7
const recommendedDogs = dogs.filter(healthyEat);
console.log(recommendedDogs);
const recFod = dogs.map(rec => rec.recFood);
const sort = recFod.sort((a, b) => a - b);
console.log(sort);

const dogSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);

console.log(dogSorted);
