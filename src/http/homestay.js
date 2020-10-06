import instance from '@/http/http.js'
// import {SUCCESS} from '@/libs/base.js';


function homestayRead(sid){
   
   
    return new Promise((resolve,reject)=>{
        instance.get("/api/stayhome?sid="+sid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
    
}

function homestayDelete(){

}

export {homestayDelete,homestayRead}