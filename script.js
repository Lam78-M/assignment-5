// login section--------------------


   document.getElementById('login-btn')
   .addEventListener('click',function(){
 
    const userInput = document.getElementById('input-user');
    const userName = userInput.value
    console.log(userName);

    const inputPin = document.getElementById('input-pin');
    const pin =inputPin.value;
    console.log(pin)

    if(userName == 'admin' && pin== 'admin123' ){
        alert('Login Success');
        window.location.href('/home.html');
    }
    else{
        alert('Wrong username or password');
        return;
    }
});


