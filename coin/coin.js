
const price = document.querySelectorAll(".price");

for(i of price) {
    i.innerHTML = parseInt(i.innerHTML).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
}

const bit = document.querySelector("#bit");
const ether = document.querySelector("#ether");
const riple = document.querySelector("#riple");
const binan = document.querySelector("#binan");
const sol = document.querySelector("#sol");

const tradeArr = [];

bit.addEventListener("click", (e) => {
    const coinname = document.querySelector("#bit > .coinname");
    const price = document.querySelector("#bit > .price");
    const cnt = document.querySelector("input[name=bitcnt]");
    const bs = e.target.innerHTML;
    const print = document.querySelector(".print");

    if(bs == '구매' || bs == '판매') {
    const bank = {
        coinname : coinname.innerHTML,
        price : price.innerHTML,
        cnt : cnt.value,
        buyorsell : bs
        ,tradevalue : null
    }
    // 거래금액에 대해서 객체필드 할당 안대있음 (replace 함수 /,/g 모든 콤마 선택)
    const x = bank.price.slice(1).replace(/,/g, "");
    bank.tradevalue = x * cnt.value;


    console.log(bank.tradevalue);
    console.log(bank);
    print.innerHTML = bank.coinname + "을(를) " + bank.cnt +"개 "+bank.buyorsell +"하셨습니다.";
    
    tradeArr.push(bank);
    
    localStorage.setItem('거래 내역', JSON.stringify(tradeArr));

    cnt.value = "";

    //거래내역 표기 (버튼 눌리면 기존 tradelog에서 )

    const tradelog = document.querySelector(".tradelog");

    const getArr = localStorage.getItem('거래 내역');
    const JSArr = JSON.parse(getArr);

    tradelog.innerHTML = "";

    for(i of JSArr) {
        const list = document.createElement("li");
        list.innerText = "[" + i.buyorsell + "] " + "[코인명 : " + i.coinname + "] " + "[개수 : " + i.cnt + "]" + "[거래금액 : " + i.tradevalue + "]" ;
        tradelog.appendChild(list);
    }
    
    }   
    
})

ether.addEventListener("click", (e) => {
    const coinname = document.querySelector("#ether > .coinname");
    const price = document.querySelector("#ether > .price");
    const cnt = document.querySelector("input[name=ethercnt]");
    const bs = e.target.innerHTML;
    const print = document.querySelector(".print");

    if(bs == '구매' || bs == '판매') {
        const bank = {
        coinname : coinname.innerHTML,
        price : price.innerHTML,
        cnt : cnt.value,
        buyorsell : bs
        ,tradevalue : null
    }
    // 거래금액에 대해서 객체필드 할당 안대있음 (replace 함수 /,/g 모든 콤마 선택)
    const x = bank.price.slice(1).replace(/,/g, "");
    bank.tradevalue = x * cnt.value;
    print.innerHTML = bank.coinname + "을(를) " + bank.cnt +"개 "+bank.buyorsell +"하셨습니다.";
    
    tradeArr.push(bank);
    
    localStorage.setItem('거래 내역', JSON.stringify(tradeArr));

    cnt.value = "";

    //거래내역 표기 (버튼 눌리면 기존 tradelog에서 )

    const tradelog = document.querySelector(".tradelog");

    const getArr = localStorage.getItem('거래 내역');
    const JSArr = JSON.parse(getArr);

    tradelog.innerHTML = "";

    for(i of JSArr) {
        const list = document.createElement("li");
        list.innerText = "[" + i.buyorsell + "] " + "[코인명 : " + i.coinname + "] " + "[개수 : " + i.cnt + "]" + "[거래금액 : " + i.tradevalue + "]" ;
        tradelog.appendChild(list);
    }
    
    }   
    
})

riple.addEventListener("click", (e) => {
    const coinname = document.querySelector("#riple > .coinname");
    const price = document.querySelector("#riple > .price");
    const cnt = document.querySelector("input[name=riplecnt]");
    const bs = e.target.innerHTML;
    const print = document.querySelector(".print");

    if(bs == '구매' || bs == '판매') {
        const bank = {
        coinname : coinname.innerHTML,
        price : price.innerHTML,
        cnt : cnt.value,
        buyorsell : bs
        ,tradevalue : null
    }
    // 거래금액에 대해서 객체필드 할당 안대있음 (replace 함수 /,/g 모든 콤마 선택)
    const x = bank.price.slice(1).replace(/,/g, "");
    bank.tradevalue = x * cnt.value;
    print.innerHTML = bank.coinname + "을(를) " + bank.cnt +"개 "+bank.buyorsell +"하셨습니다.";
    
    tradeArr.push(bank);
    
    localStorage.setItem('거래 내역', JSON.stringify(tradeArr));

    cnt.value = "";

    //거래내역 표기 (버튼 눌리면 기존 tradelog에서 )

    const tradelog = document.querySelector(".tradelog");

    const getArr = localStorage.getItem('거래 내역');
    const JSArr = JSON.parse(getArr);

    tradelog.innerHTML = "";

    for(i of JSArr) {
        const list = document.createElement("li");
        list.innerText = "[" + i.buyorsell + "] " + "[코인명 : " + i.coinname + "] " + "[개수 : " + i.cnt + "]" + "[거래금액 : " + i.tradevalue + "]" ;
        tradelog.appendChild(list);
    }
    
    }   
    
})

binan.addEventListener("click", (e) => {
    const coinname = document.querySelector("#binan > .coinname");
    const price = document.querySelector("#binan > .price");
    const cnt = document.querySelector("input[name=binancnt]");
    const bs = e.target.innerHTML;
    const print = document.querySelector(".print");

    if(bs == '구매' || bs == '판매') {
        const bank = {
        coinname : coinname.innerHTML,
        price : price.innerHTML,
        cnt : cnt.value,
        buyorsell : bs
        ,tradevalue : null
    }
    // 거래금액에 대해서 객체필드 할당 안대있음 (replace 함수 /,/g 모든 콤마 선택)
    const x = bank.price.slice(1).replace(/,/g, "");
    bank.tradevalue = x * cnt.value;
    print.innerHTML = bank.coinname + "을(를) " + bank.cnt +"개 "+bank.buyorsell +"하셨습니다.";
    
    tradeArr.push(bank);
    
    localStorage.setItem('거래 내역', JSON.stringify(tradeArr));

    cnt.value = "";

    //거래내역 표기 (버튼 눌리면 기존 tradelog에서 )

    const tradelog = document.querySelector(".tradelog");

    const getArr = localStorage.getItem('거래 내역');
    const JSArr = JSON.parse(getArr);

    tradelog.innerHTML = "";

    for(i of JSArr) {
        const list = document.createElement("li");
        list.innerText = "[" + i.buyorsell + "] " + "[코인명 : " + i.coinname + "] " + "[개수 : " + i.cnt + "]" + "[거래금액 : " + i.tradevalue + "]" ;
        tradelog.appendChild(list);
    }
    
    }   
    
})

sol.addEventListener("click", (e) => {
    const coinname = document.querySelector("#sol> .coinname");
    const price = document.querySelector("#sol > .price");
    const cnt = document.querySelector("input[name = solcnt]");
    const bs = e.target.innerHTML;
    const print = document.querySelector(".print");

    if(bs == '구매' || bs == '판매') {
        const bank = {
        coinname : coinname.innerHTML,
        price : price.innerHTML,
        cnt : cnt.value,
        buyorsell : bs
        ,tradevalue : null
    }
    // 거래금액에 대해서 객체필드 할당 안대있음 (replace 함수 /,/g 모든 콤마 선택)
    const x = bank.price.slice(1).replace(/,/g, "");
    bank.tradevalue = x * cnt.value;
    print.innerHTML = bank.coinname + "을(를) " + bank.cnt +"개 "+bank.buyorsell +"하셨습니다.";
    
    tradeArr.push(bank);
    
    localStorage.setItem('거래 내역', JSON.stringify(tradeArr));

    cnt.value = "";

    //거래내역 표기 (버튼 눌리면 기존 tradelog에서 )

    const tradelog = document.querySelector(".tradelog");

    const getArr = localStorage.getItem('거래 내역');
    const JSArr = JSON.parse(getArr);

    tradelog.innerHTML = "";

    for(i of JSArr) {
        const list = document.createElement("li");
        list.innerText = "[" + i.buyorsell + "] " + "[코인명 : " + i.coinname + "] " + "[개수 : " + i.cnt + "]" + "[거래금액 : " + i.tradevalue + "]" ;
        tradelog.appendChild(list);
    }
    
    }   
    
})

