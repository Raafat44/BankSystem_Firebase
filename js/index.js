import {initializeApp} from 'firebase/app'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAjsLbxbEL7c7xHiRMygtgQzjG8EUi9sW8",
    authDomain: "banksystem-4c2eb.firebaseapp.com",
    projectId: "banksystem-4c2eb",
    storageBucket: "banksystem-4c2eb.appspot.com",
    messagingSenderId: "922171350091",
    appId: "1:922171350091:web:eaa3d8995ba982325541ce"
  };
initializeApp(firebaseConfig)
const db = getFirestore();
const col = collection(db,'customers');
const singleDoc = doc(db,'index',"kFBd8ZUOhWV5Q1rIS7iU")
var transaction = collection(db,'transaction');
var customers =[];
var cusTable = document.querySelector(".custable");
var cusData = document.querySelector(".cusdata");
var tr = document.getElementsByClassName("sptr");
var sender = document.querySelector(".sender");
var reciever = document.querySelector(".reciever");
var amount = document.querySelector(".amount");
var req ;

onSnapshot(col,(snapshot)=>{
   
})
getDocs(col).then((snapshot)=>{
    customers = snapshot.docs.map((element)=>{
        return {
            id : element.id,
            ...element.data()
        }
    }) 
}).then(()=>{
    customers.forEach((el,index)=>{
        var row = 
        `<tr class="sptr" data-id="${index}">
        <td>${index+1}</td>
        <td>${el.name}</td>
        <td>${el.email}</td>
        <td>${el.balance}$</td>
        </tr>`        
        cusTable.innerHTML += row;     
    })
    
}).then(()=>{
    for(var i=0;i<customers.length;i++)
    {    
        tr[i].addEventListener("click", function(e){
            req = e.target.parentElement.attributes[1].value;
            const docref = doc(db ,'index',"kFBd8ZUOhWV5Q1rIS7iU");
            updateDoc(docref,{
                usid:parseInt(req)
            }).then(()=>{
                console.log(req);
                window.location.href = 'Customerdata.html';
            })
           }); 
    }   

}).catch(()=>{
})
/* var updateform = document.querySelector('.update')

 updateform.addEventListener('click',function(e)
{
    customers.forEach((el)=>{
        console.log(el)
    })
})  */
var arr;
getDoc(singleDoc).then((snapshot)=>{
   arr = {id:snapshot.id,...snapshot.data()}
   var row = 
   `<tr class="sptr" data-id="${customers[arr['usid']].id}">
   <td>${customers[arr['usid']].id}</td>
   <td>${customers[arr['usid']].name}</td>
   <td>${customers[arr['usid']].email}</td>
   <td>${customers[arr['usid']].balance}$</td>
   </tr>`        
   cusData.innerHTML += row;  
}).catch(()=>{})
try
{

    var btn = document.querySelector(".transfer");
    btn.onclick = function()
    {   
       let sendval = sender.value.toLowerCase()
       let recval = reciever.value.toLowerCase()
       let sid =0,rid=0;
       customers.forEach(el =>{
          if(el.name == sendval)
          {
            sid = el.id;
          }else if(el.name == recval)
          {
            rid = el.id
          }
       })
       if(!rid || !sid )
       {
           alert("invalid Sender or Reciever Names")
       }else
       {
           console.log(sid + " " + rid);
           let sdoc = doc(db,'customers',sid);
           let rdoc = doc(db,'customers',rid);
           let sBalance,rBalance;
           var valid = true;
           getDoc(sdoc).then(el =>{
            sBalance = el.data()['balance'];
            if(amount.value >sBalance )
            {
                valid = false;
                alert("The Entered Amount is less than the sender balance!! ")
            }else
            {
                updateDoc(sdoc,{
                    balance: (parseInt(sBalance) - parseInt(amount.value))
                }).then(()=>{
                    addDoc(transaction,{
                        sendername:sendval,
                        recievername:recval,
                        amount:amount.value 
                    })
                }).then(()=>{
                    document.location.reload(true);
                })
            }
           })
           if(valid)
           {
               getDoc(rdoc).then(el =>{
                rBalance = el.data()['balance'];
                updateDoc(rdoc,{
                    balance: (parseInt(rBalance) + parseInt(amount.value))
                })
               })
           }
       }
    }
}catch(error)
{

}
try
{
    var transTable = document.querySelector(".transTable");
    var transactions = [];
    getDocs(transaction).then(el=>{
        transactions = el.docs.map(dta =>{
            return{
                id : dta.id,
                ...dta.data()
            }
        })
    }).then(()=>{
        transactions.forEach((el,index)=>{
            var row = 
            `<tr >
            <td>${index+1}</td>
            <td>${el.sendername}</td>
            <td>${el.recievername}</td>
            <td>${el.amount}$</td>
            </tr>`        
            transTable.innerHTML += row;     
        })})
}catch(error)
{
    
}




    

