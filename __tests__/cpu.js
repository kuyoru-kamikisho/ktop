function f() {
    const promises=[]
    for (let i = 0; i < 3; i++) {
        promises.push(Promise.resolve(f1(i)))
    }
    Promise.all(promises).then(()=>{
        console.log(100)
    })
}
async function f1(v){
    console.log(v)
}
f()