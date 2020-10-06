import  instance from "./http"
import {SUCCESS} from "../lib/base"
function categorySave(){
  
}
function categoryIndex(){
  return  Promise((resolve,reject)=>{
    instance('/admin/category/indexall').then(res=>{
        if(res.code==SUCCESS){
             resolve(res);
        }
  } ).catch(error=>{
     reject(error)
})
})

}function categoryUpdate(){

}

export {categorySave,categoryIndex,categoryUpdate}