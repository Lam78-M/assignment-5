// json section ---------------------------

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data)
})