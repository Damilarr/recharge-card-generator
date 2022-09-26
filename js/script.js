let cardAmt,randPin,getPin,fullPin,savepin;
let details = []
generateBtn.addEventListener('click',generatePin)
function generatePin(){
    cardAmt = cardAmount.value
    if (cardAmt !== '' && (cardAmt.length >= 3 && Number(cardAmt) <= 10000)) {
        randPin = (Math.floor(100000+Math.random()*90000000000000));
        if (cardType.value=='mtn'){
            fullPin=`*555*${randPin}#`
        } else if(cardType.value=='airtel'){
            fullPin=`*126*${randPin}#`
        } else if(cardType.value=='9-mobile'){
            fullPin=`*232*${randPin}#`
        } else if(cardType.value=='glo'){
            fullPin=`*123*${randPin}#`
        }
        let data = {amount:cardAmt,pin:fullPin ,status:false}
        details.push(data)
        cardAmount.value =''
        display()
    } else if (Number(cardAmt) > 10000 || cardAmt.length < 3){
       alert('Amount can only range from 100 - 10000')
    } else{
        alert('please enter a valid Amount')
    }
}


function display(){
    tBody.innerHTML =''
    details.forEach((element,i)=>{
        tBody.innerHTML +=`<tr>
        <td>${i+1}</td>
        <td>${element.amount}</td>
        <td>${element.pin}</td>
        <td>${element.status==false?`<span class="text-success bold">UNUSED<span>`:`<span class="pr-3 text-warning">USED</span>`} <button class="btn btn-info" onclick="del(${i})"><strong class="text-dark">Delete pin</strong></button></td>
        </tr>`
    });
    savepin = localStorage.setItem('pinDetails',JSON.stringify(details)) 
}
getPin = localStorage.getItem('pinDetails')
function checkPins(){
    if(getPin){
        details=JSON.parse(getPin)
        display()
    } else{
        details= details
    }
}
checkPins()
loadBtn.onclick = function loadCard() {
    if (loadInp.value !== ''){
        let onames = details.find(function (element) {
            return element.pin == loadInp.value 
          });
          if (typeof onames =='object') {
            if(onames.status == false){
                onames.status = true
                alert('recharge successful')
                display()
                // savepin = localStorage.setItem('pinDetails',JSON.stringify(details))
            } else {
                alert('recharge unsuccessful--Pin already Used')
            }
          } else {
            alert('Invalid Pin-->Check the pin and try again')
          }
    } else{
        alert('Enter a pin to load')
    }
}
function del(i){
    details.splice(i,1)
    display()
}