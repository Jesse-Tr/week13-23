// import fs from 'fs';
// import path from 'path';

//BEFORE USE got MUST DO: npm install got@9.6.0 
import got from "got";


// get filepath to data directory
// const dataDir = path.join (process.cwd(), 'data');


//define URL for rest endpoint
const dataURL =
  "https://dev-cs55-13-2023.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

//function returns ids for all json objects in array
export async function getAllIds() {

  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');
  // load json file contents
   
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    //next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body)
  } catch(error) {
    jsonString.body = [];
    console.log(error)
  }
  // convert string from file into json array object
  // const jsonObj2 = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body)
  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString(),
      }
    }
  });



}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
  //const filePath = path.join(dataDir, 'persons.json');

  //const jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  let jsonString;
  try {
    //next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body)
  } catch(error) {
    jsonString.body = [];
    console.log(error)
  }

  //const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);
  
  //sort json array by name property
  jsonObj.sort(function (a, b) {
    return a.post_title.localeCompare(b.post_title);
  });

  return jsonObj.map(item => {
    return {

      id: item.ID.toString(),
      name: item.post_title,
      route: item.guid

    }
  });




}

// async function to get the complete data for just one person
// used by getStaticProps() in  [id].js
export async function getData(idRequested) {
  // get filepath to json file
 // const filePath = path.join(dataDir, 'info.json');

  // load json file contents
  //const jsonString = fs.readFileSync(filePath, 'utf8');

  let jsonString;
  try {
    //next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body)
  } catch(error) {
    jsonString.body = [];
    console.log(error)
  }
  // convert string from file into json array object
 // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // find object value in array that has matching id, returns an array with one element
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  }
  );

  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }

  return objReturned;

}
