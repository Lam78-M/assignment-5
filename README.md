 - 1️⃣ What is the difference between var, let, and const?

Here is the difference between var, let and cosnt : 

1) Var was used in old javascript
   scope: function scoped it's mean, we can declare var  before the variable, hoisted (initialized), re declare: same scope, udate possible

   example:   ```console.log(name);  
                 var name = "Ayat";
                 var name = "Rahim"; ```

2) let was introduced javascript ES6
   It is a block-scoped, it works only inside ({ }) 
   no re declare, we can update values, hoisting possible (Temporal Dead Zone) TDZ , variable can chage.
    
   example:   ``` let b = 20;
                 let b = 25;        // error, cannot re-declare
                 b = 30;            // update allowed
                 console.log(b); ``` 
   
3) cosnt it's also block scoped.
   no re-declaration, update: value can not change,
   hoisted: yes it's possibble Yes (but in Temporal Dead Zone until declared) TDZ, It is a constant value

   example:   ```const c = 50;
                 const c = 60;      // error, cannot re-declare
                 c = 70;            // error, cannot update
                 console.log(c);  ```

Quick conclusion : 🎗️ let use when variable value will change.
                   🎗️ const use for constants / values that never change.
                   🎗️ var it should be avoided in modern JS  so, safe option we have to use let and const


- 2️⃣ What is the spread operator (...)?

... Spread operation is a method where it is represented there self by three dots. It allows an iterable (like an array and object) to be expand individualy with elements. It introduce in Javascript ES6

   example: ```  let fruits = ["apple", "banana", "mango"];

                 // Copying array using spread
                 let newFruits = [...fruits];
    
                 console.log(newFruits); 
                 // Output: ["apple", "banana", "mango"]
    
                 // Adding more items while copying
                 let allFruits = ["orange", ...fruits, "grapes"];
                 console.log(allFruits); 
                 // Output: ["orange", "apple", "banana", "mango", "grapes"] ```


- 3️⃣ What is the difference between map(), filter(), and forEach()?

 Difference betwen map(), filter(), and forEach()

 1) map() method : Create a new array by applying a fuction to each
                   element of the original array.
                 . Ruturn: new array of the same length
                 . it does not modify the original array

    example :    ```let numbers = [1, 2, 3, 4];
                 let squares = numbers.map(num => num * num);

                 console.log(squares);  // [1, 4, 9, 16]
                 console.log(numbers);  // [1, 2, 3, 4] (original array unchanged) ```   

2) filter() method: Creates a new array containing elements that pass a certain condition.
                    Returns:  new array with filtered elements.
                    Does not modify the original array.    

    examples: ```let numbers = [1, 2, 3, 4];
                 let evenNumbers = numbers.filter(num => num % 2 === 0);
                 console.log(evenNumbers); // [2, 4]
                 console.log(numbers);     // [1, 2, 3, 4] (original array unchanged)```

3) forEach() method: Executes a function for each element of the array.
                     Returns: undefined (does not create a new array).
                     It can modify original array if we have need.

                     examples: ```let numbers = [1, 2, 3];
                     numbers.forEach(num => console.log(num * 2));
                     // Output:
                     // 2
                     // 4
                     // 6         ```            
                              

- 4️⃣ What is an arrow function?      

Here is the explaination of an arrow function:
                     An arrow function is a method where it's have a short function,
                     which is use for writing function in javascript (It's introduced in ES6)

   ``` example:    // General  function
                     function greet(name) {
                     return "Hello " + name;
                     }
                     
                     // Arrow function
                     const greet = (name) => {
                     return "Hello " + name;
                     }
                     
                     // Shorter version (single line)
                     const greet = name => "Hello " + name; 
                       ``` 

Good signs: ```🎗️shorter and clean syntax, 
               🎗️does not have it's own this value ,
               🎗️it use this from surrounding scope.  ```


  - 5️⃣ What are template literals?       

  Template litrals are a new way to write strigns in javascript
  It introduced in ES6 and it's allowed expressions, multi-line strings, and easier string formatting.    