function parseCSV(file) {
  const reader = new FileReader();
  reader.readAsText(file[0]);
  reader.onload = e => {
    console.warn(csvToJSON(e.target.result));
  };
}

function csvToJSON(file) {
  const json = {
    Kids: [],
  };
  const listOfMembers = file.match(/.{1,10}/g);
  json.Kids = listOfMembers;
  return json;
}
export { parseCSV };
