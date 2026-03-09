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
    
   example:   ```let b = 20;
                 let b = 25;        // error, cannot re-declare
                 b = 30;            // update allowed
                 console.log(b);``` 
   
3) cosnt it's also block scoped.
   no re-declaration, update: value can not change,
   hoisted: yes it's possibble Yes (but in Temporal Dead Zone until declared) TDZ, It is a constant value

   example:   ```const c = 50;
                 const c = 60;      // error, cannot re-declare
                 c = 70;            // error, cannot update
                 console.log(c);  

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