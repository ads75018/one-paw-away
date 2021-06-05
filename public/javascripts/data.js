const ctx = document.getElementById("myChart").getContext("2d");
const $btn = document.getElementById("btn");
$btn.onclick =function(){
    axios
  .get("localhost:27017/one-paw-away",{params: {
      username:document.getElementById("username").value,
      name:document.getElementById("name").value,
      pets:document.getElementById("pets").value,
      birthday:document.getElementById("birthday").value,
      location:document.getElementById("location").value,
      important:document.getElementById("important").value,
      bio:document.getElementById("bio").value,
  }})
  .then((result) => {
    // let Data = result.data.api;
      console.log(result.data);
    printTheData(result.data);
  })
  .catch((err) => {
    console.log(err);
  }); 
};

