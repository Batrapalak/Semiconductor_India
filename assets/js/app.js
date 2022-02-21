// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB3065Yl7-CkD1pl4H2AaXpWqPkH2HFZUQ",
    authDomain: "bestloanmart-be659.firebaseapp.com",
    databaseURL: "https://bestloanmart-be659-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bestloanmart-be659",
    storageBucket: "bestloanmart-be659.appspot.com",
    messagingSenderId: "344928627459",
    appId: "1:344928627459:web:a36e64d44d6d51712dd736",
    measurementId: "G-6QLKSGTLLM"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


//firebase.initializeApp(firebaseConfig);
console.log(firebase)

// referance

let contactInfo = firebase.database().ref("user");


document.getElementById("contactform1").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();
    // Get Values
    var name = getInputVal('name');
    var mail = getInputVal('email');
    var msg = getInputVal('Message');
    var sub = getInputVal('subject');
    var phone = getInputVal('phone');
    console.log(name, mail, msg, phone);
    

    saveContactInfo(name, mail,sub, msg, phone);
    


    document.querySelector(".alert").style.display='block';

    setTimeout(function(){
    document.querySelector(".alert").style.display='none';

    },3000);

    document.getElementById('contactform1').reset();

    // sendEmail(name, mail, msg, phone);

    
}

// function to get form values

function getInputVal(id){
    return document.getElementById(id).value;
}

// save infos to firbase

function saveContactInfo(name, mail, msg,sub, phone ){
    let newContactInfo = contactInfo.push();
    newContactInfo.set({
        name: name,
        email: mail,
        message: msg,
        subject: sub,
        Phone : phone,
    });

    retriveInfos();

}


//retrive data
function retriveInfos(){
    let ref = firebase.database().ref("user");
    ref.on("value", gotData);   
}

function gotData(data){
    let info = data.val();
    let keys = Object.keys(info);

    for(let i= 0; i < keys.length; i++){
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let message = info[infoData].message;
        let phone = info[infoData].phone;
        console.log(name,email,message,phone);

    
    }
}


retriveInfos();

// function sendEmail(name, email, message, phone){
//   Email.send({
//       Host: "smtp.gmail.com",
//       Username: 'amanvishen46@gmail.com',
//       Password: "wlokhjypuqavqjhb",
//       To: 'melixsystemssolutions@gmail.com',
//       From:'amanvishen46@gmail.com',
//       Subject: `${name} sent you a message`,
//       Body: `Name: ${name}<br/> Email: ${email} <br/> Message: ${message}<br/> Phone Number: ${phone}`,
//   }).then((message)=>alert("mail sent successfully"))
// }

