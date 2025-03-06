// Do not change the pre-written code.
// Make the necessary imports here.
import fs from "fs"
export const writeBlog = (filePath, name) => {
// Write your code here.
try{
    fs.appendFileSync(filePath,name)
}catch(err){
    console.log(err)
}
}
export const publishBlog = (filePath) => {
// Write your code here.
const buffer  = fs.readFileSync(filePath,{"encoding":"utf-8"})
return buffer
}