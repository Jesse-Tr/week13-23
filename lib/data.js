import fs from 'fs';
import path from 'path';


// get filepath to data directory
const dataDir = path.join (process.cwd(), 'data');


//function returns ids for all json objects in array
export function getAllIds(){

  // get filepath to json file

  const filePath = path.join(dataDir, 'persons.json');

  

  // load json file contents

  const jsonString = fs.readFileSync(filePath, 'utf8');


  // convert string from file into json array object

  const jsonObj2 = JSON.parse(jsonString);


  // use map() on array to extract just id properties into new array of obj values

return jsonObj2.map (item => {
    return {
      params: {
        id: item.id.toString(),
      }
    }
  });


 
}

// function returns names and ids for all json objects in array, sorted by name property
export function getSortedList(){
  const filePath = path.join (dataDir,'persons.json');
  
  const jsonString = fs.readFileSync(filePath, 'utf8');
    // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  jsonObj.sort(function(a,b){
    return a.name.localeCompare(b.name);
  });

  return jsonObj.map (item => {
    return {
    
        id: item.id.toString(),
        name: item.name
      
    }
  });
  



}

// async function to get the complete data for just one person
// used by getStaticProps() in  [id].js
export async function getData (idRequested){
   // get filepath to json file
  const filePath = path.join(dataDir, 'info.json');



  // load json file contents
 
   const jsonString = fs.readFileSync(filePath, 'utf8');

  
  // convert string from file into json array object

  const jsonObj = JSON.parse(jsonString);



  // find object value in array that has matching id, returns an array with one element

const objMatch = jsonObj.filter( obj => {
    return obj.id.toString() === idRequested;
  }
  );

let objReturned;
if (objMatch.length > 0){
  objReturned = objMatch[0];
} else {
  objReturned = {};
}

return objReturned;

}
