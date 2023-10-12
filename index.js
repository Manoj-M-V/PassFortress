function textCopy(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            // alert("copied "+txt);
            document.getElementById("alert").style.display = "inline";
            setTimeout(() =>{
                document.getElementById("alert").style.display = "none";
            },1000);
        },
        () => {
            // alert("copying failed");
        },
    );
}

function maskPass(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

const deletePasswords = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrUpdated = arr.filter((e) => {
        return e.website != website;
    })
    localStorage.setItem("passwords",JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

//Logic for table
const showPasswords = () => {

    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if(data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data to show!";
    }
    else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
      </tr>`
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str += `<tr>
                        <td>${element.website} <img onClick="textCopy('${element.website}')" src="./copy.png" alt="copy"></td>
                        <td>${element.Username}<img onClick="textCopy('${element.Username}')" src="./copy.png" alt="copy"></td>
                        <td>${maskPass(element.password)}<img onClick="textCopy('${element.password}')" src="./copy.png" alt="copy"></td>
                        <td><button class="btnsm" onClick="deletePasswords('${element.website}')">Delete</button></td>
                    </tr>`
                }
                tb.innerHTML = tb.innerHTML+  str;
    }
}

showPasswords();
document.querySelector(".btn").addEventListener("click",(e) => {
    e.preventDefault();
    // console.log(Username.value,password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);
    if(passwords == null) {
        let json = [];
        json.push({website:website.value,Username:Username.value,password:password.value});
        alert("Password saved");
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    else{
        
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({website:website.value,Username:Username.value,password:password.value});
        alert("Password saved");
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    showPasswords();
    website.value = "";
    Username.value = "";
    password.value = "";
})