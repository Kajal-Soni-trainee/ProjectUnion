
 const sql_func =async function(query, conn){
     conn.query(query,(err,result)=>{
         if(err){
             return err;
         }
         else{
            return `${result}`;
         }
     });
 }


const fieldOption = async function(query,conn){
    let result =await sql_func(query,conn); 
    console.log(result);
    let keys=Object.keys(result);

    let element = '<div id="fields">'+
    '<label for="fields">Select field</label>'+
    '<select name="field" id="field">'+
    keys.forEach((item)=>{
        '<option id="'+item+'" value="'+item+'">'+item+'</option>' 
    });
   +'</select>'
'</div>';

console.log(element);
    return element;
}
module.exports.fieldOption=fieldOption;