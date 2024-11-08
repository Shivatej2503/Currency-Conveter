const dropdown = document.querySelectorAll(".dropdown select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropdown.length; i++) {
    for(currency_code in countryList) {
        //console.log(currency_code) for see countryList 
        let optionTag = `<option value="${currency_code}">${currency_code}</option>`; //creating option tag with passing currency code as text
        dropdown[i].insertAdjacentHTML("beforeend",optionTag); //inserting option tag inside select tag
    }
    dropdown[i].addEventListener("change", e =>{
        loadFlag(e.target);  //calling loadflag with passing target element as an argument
    });
}

function loadFlag(element){
    for(code in countryList){
        if(code == element.value){    //if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img");//selecting img tag of particular dropdown 
            imgTag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png` //passing country code of selected currency code in flagimg url

        }
    }
}

window.addEventListener("load", () =>{
    getExachangeRate();

});

getButton.addEventListener("click", e =>{
    e.preventDefault();//preventing form from submiting
    getExachangeRate();

});
// direct exchange the FROM to TO with flag 
/**const exchangeIcon = document.querySelector(".dropdown .icon") ;
exchangeIcon.addEventListener("click", () =>{
    let tempCode = fromCurrency.value;   //temporary currency code of from dropdown
    fromCurrency.value = toCurrency.value;  //passing To currency code to  from currency code
    toCurrency.value = tempCode;  //passing tamporary currency code to To currency code
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExachangeRate();
});**/

function getExachangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTXT = document.querySelector(".exchangerate");
    let amountVal = amount.value;
    //if user didn't enter any value or enter zero that time defautl value one(1) will asign in input
    if(amountVal == ""  || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;

    }
    exchangeRateTXT.innerText = " Getting Exchange Rate...";

    let url = `https://v6.exchangerate-api.com/v6/27b6611b618f0fed6a9960f5/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receving that obj
    fetch(url).then(response => response.json()).then(result =>{
        let exchangerate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangerate).toFixed(2);
        exchangeRateTXT.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
}