let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async=true, data=null){
    return new Promise(function (resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log("State Change Called. Ready State: "+ xhr.readyState + " Status : "+ xhr.status);
        if(xhr.status.toString().match("^[2][0-9]{2}$")){
            resolve(xhr.responseText);
        }else if(xhr.status.toString().match("^[4,5][0-9]{2}$")){
            reject({
               status: xhr.status,
               statusText: xhr.statusText
            }); 
        console.log("XHR Failed");
        }
    }
    xhr.open(methodType, url, async);
    if(data){
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log("Request sent to server");
});
}

const getURL = "http://localhost:3000/employees/4";
makePromiseCall("GET", getURL, true)
               .then(responseText => {
                    console.log("User details are : "+ responseText)
                })
               .catch(error => console.log("get error status : "+ JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/33";
makePromiseCall("DELETE", deleteURL, false)
            .then(responseText => {
                console.log("User deleted : "+ responseText)
            })
            .catch(error => console.log("delete error status : "+ JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const empData = {"name":"Jackson","salary":"9000000"};
makePromiseCall("POST", postURL, true, empData)
               .then(responseText => {
                   console.log("User added : "+ responseText)
               })
            .catch(error => console.log("post error status : "+ JSON.stringify(error)));