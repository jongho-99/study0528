
const price = document.querySelectorAll(".price");
const start_bnt = document.querySelector("#start");


const bit = document.querySelector("#bit_bs");
const ether = document.querySelector("#ether_bs");
const riple = document.querySelector("#riple_bs");
const binan = document.querySelector("#binan_bs");
const sol = document.querySelector("#sol_bs");

const tradeArr = [];

const userList = [];
const coinList = [];
const markeyList = [];
const userOwnList = [];

//시작버튼 초기설정
start_bnt.addEventListener("click",() => {
    
    const nick = window.prompt("사용자 닉네임을 입력해주세요 !!");
    if(nick != null) {
        const modal_qs = document.querySelector("#modalTitle");
        modal_qs.innerText = "[" +nick + "님의 보유코인]"
        const market = {
            coinname : "비트코인",
            price : 130000000,
            rate : 0
        }

        const market2 = {
            coinname : "이더리움",
            price : 2600000,
            rate : 0
        }

        const market3 = {
            coinname : "리플",
            price : 3150,
            rate : 0
        }

        const market4 = {
            coinname : "바이낸스",
            price : 870000,
            rate : 0
        }

        const market5 = {
            coinname : "솔라나",
            price : 215000,
            rate : 0
        }

        const owncoin1 = {
            coinName : '비트코인',
            cnt : 0
        };
        const owncoin2 = {
            coinName : '이더리움',
            cnt : 0
        };
        const owncoin3 = {
            coinName : '리플',
            cnt : 0
        };
        const owncoin4 = {
            coinName : '바이낸스',
            cnt : 0
        };
        const owncoin5 = {
            coinName : '솔라나',
            cnt : 0
        };

        const user = {
            name : nick,
            asset : 100000000,
            assetAll : 0
        }

        //유저 객체 배열에 넣어 문자열 변환 후 localstorage 등록
        userList.push(user);
        const userStr = JSON.stringify(userList);
        localStorage.setItem('user', userStr);
        
        //보유코인 객체 배열 ..
        userOwnList.push(owncoin1);
        userOwnList.push(owncoin2);
        userOwnList.push(owncoin3);
        userOwnList.push(owncoin4);
        userOwnList.push(owncoin5);
        const userOwnStr = JSON.stringify(userOwnList);
        localStorage.setItem('userOwncoin', userOwnStr)

        //코인도 동일한 작업 (초기화)
        coinList.push(market);
        coinList.push(market2);
        coinList.push(market3);
        coinList.push(market4);
        coinList.push(market5);
        const coinStr = JSON.stringify(coinList);
        localStorage.setItem('market', coinStr);
        
        
        
        user_updateInfo();
        coin_updateUI();
        user_updateUI();
        startPriceUpdate();
}
else {
    window.alert("닉네임을 정확히 입력해주세요.");
}
})


//코인 객체생성 (코인이름, 가격, 변동률)
// 처음에 초기화 할떄는 변동률 적용된 상태로 시작


//20초마다 해당작업 실행(코인가격변동 및 사용자 정보변경)
function startPriceUpdate() {

    let time = 5;
    setInterval(() => {
            const timer = document.querySelector("#timer");
            const body = document.querySelector("body");

            if(time >= 0 && time <= 3) {
                timer.classList.add("warning");     
            }
            if(time < 0) {
                updateCoinList();
                time = 5;

                timer.classList.remove("warning");
                // 차트 업데이트하기
                chart.data.datasets[0].data = coinData['비트코인'];
                chart.data.datasets[1].data = coinData['이더리움'];
                chart.data.datasets[2].data = coinData['리플'];
                chart.data.datasets[3].data = coinData['바이낸스'];
                chart.data.datasets[4].data = coinData['솔라나'];
                user_updateInfo();
                user_updateUI();
                chart.update();

            }

            timer.innerText = "시장변동까지 남은시간: "+time+"초";
            --time;
        },1000)

}


const coinData = {
    비트코인: [],
    이더리움: [],
    리플: [],
    바이낸스: [],
    솔라나: []
};

//코인 리스트 업데이트
function updateCoinList() {
    const market = JSON.parse(localStorage.getItem('market'));
    
    const Mklist = [];
    for (let key of market) {

        let change = key.price * (Math.random() * 0.2 - 0.1);
        
        const newCoin = {
            coinname : key.coinname,
            price : Math.round(key.price + change),
            rate : Math.round((change/key.price) * 10000) /100
        }

        Mklist.push(newCoin)

        if(coinData[key.coinname].length >= 10) {
            coinData[key.coinname].shift();
        }
        coinData[key.coinname].push(newCoin.price);

    }
    const marketStr = JSON.stringify(Mklist)
    localStorage.setItem('market', marketStr);
    coin_updateUI();
    user_updateInfo();
}

//20초간격으로 차트 업데이트 구현 (코인가격변동함수에서 진행)
//5개의 코인가격 받아놓는 스토리지 구현(코인이름 별 배열로 )
//큐 형식으로 오래된건 쳐내고 새로들어온데이터로 5개 유지 (shift랑 push쓰기)
//5개의 데이터로 차트 업데이트 되도록 구현
const tradeChart = document.getElementById('tradeChart').getContext('2d');
// const tradeChart_bit = document.getElementById('tradeChart').getContext('2d');
// const tradeChart_eth = document.getElementById('tradeChart').getContext('2d');
// const tradeChart_rip = document.getElementById('tradeChart').getContext('2d');
// const tradeChart_bin = document.getElementById('tradeChart').getContext('2d');
// const tradeChart_sol = document.getElementById('tradeChart').getContext('2d');

let chart = new Chart(tradeChart, {
    type: 'line',  // 선 그래프
    data: {
        labels: ['10시간 전', '9시간 전', '8시간 전', '7시간 전', '6시간 전','5시간 전', '4시간 전', '3시간 전', '2시간 전', '1시간 전'],  // 시간 축
        datasets: [
            {
                label: '비트코인',
                data: coinData['비트코인'],  // 비트코인 가격
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            },
            {
                label: '이더리움',
                data: coinData['이더리움'],  // 이더리움 가격
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1
            },
            {
                label: '리플',
                data: coinData['리플'],  // 리플 가격
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            },
            {
                label: '바이낸스',
                data: coinData['바이낸스'],  // 리플 가격
                fill: false,
                borderColor: 'rgba(20,132,55,1)',
                tension: 0.1
            },
            {
                label: '솔라나',
                data: coinData['솔라나'],  // 리플 가격
                fill: false,
                borderColor: 'rgba(0, 12, 192, 1)',
                tension: 0.1
            }
            // 다른 코인들도 추가 가능
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '시간'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '가격 (KRW)'
                }
            }
        }
    }
});

// 선택된 코인만 표시하기
function updateChart(coin) {
    // 각 코인 데이터셋을 확인하고 숨김/표시를 설정
    if(coin) {
        chart.data.datasets.forEach(dataset => {
        if (dataset.label === coin) {
            dataset.hidden = false;  // 선택된 코인은 표시
        } else {
            dataset.hidden = true;   // 나머지 코인은 숨김
        }
    });
    }
    else {
        chart.data.datasets.forEach(dataset => {
            dataset.hidden = false;
        })
    }    
    
    chart.update();  // 차트 업데이트
}



//유저 정보 업데이트 + 모달창 업데이트
function user_updateUI() {
    const qs_id = document.querySelector("#userId");
    const qs_as = document.querySelector("#userAs");
    const qs_as2 = document.querySelector("#userAsAll");

    const qs_mbit = document.querySelector("#bit_modal")
    const qs_meth = document.querySelector("#eth_modal")
    const qs_mrip = document.querySelector("#rip_modal")
    const qs_mbin = document.querySelector("#bin_modal")
    const qs_msol = document.querySelector("#sol_modal")

    const qs_mc = document.querySelectorAll(".modal-content p")

    const userStr = localStorage.getItem('user');
    const userArr = JSON.parse(userStr);

    const OwnStr = localStorage.getItem('userOwncoin');
    const OwnArr = JSON.parse(OwnStr);

    const pre_coinPrice = document.querySelector("#coinprice");

    for(let i of userArr) {
        qs_id.innerText = "닉네임: "+ i.name;
        qs_as.innerText = "현금자산: "+parseInt(i.asset).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
        qs_as2.innerText = "총 자산: "+parseInt(i.assetAll).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
    }

    for (let i = 0; i < qs_mc.length; i++) {
        if (OwnArr[i]) {
            qs_mc[i].innerText = OwnArr[i].coinName + ": " + OwnArr[i].cnt + "개";
        }
    }
    //모달창에 현자 코인가치 표기
    pre_coinPrice.innerText = "현재 코인가치: " + parseInt(Number(userArr[0].assetAll) - Number(userArr[0].asset)).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

    
}


//코인 리스트 
function coin_updateUI() {

    const marketStr = localStorage.getItem('market')
    const marketArr = JSON.parse(marketStr);


    const qs_bit_p = document.querySelector("#bit > .price");
    const qs_bit_r = document.querySelector("#bit > #rate");
    
    qs_bit_p.innerText = marketArr[0].price;
    qs_bit_r.innerText = marketArr[0].rate;

    const qs_eth_p = document.querySelector("#eth > .price");
    const qs_eth_r = document.querySelector("#eth > #rate");
    
    qs_eth_p.innerText = marketArr[1].price;
    qs_eth_r.innerText = marketArr[1].rate;

    const qs_rip_p = document.querySelector("#rip > .price");
    const qs_rip_r = document.querySelector("#rip > #rate");
    
    qs_rip_p.innerText = marketArr[2].price;
    qs_rip_r.innerText = marketArr[2].rate;

    const qs_bin_p = document.querySelector("#bin > .price");
    const qs_bin_r = document.querySelector("#bin > #rate");
    
    qs_bin_p.innerText = marketArr[3].price;
    qs_bin_r.innerText = marketArr[3].rate;

    const qs_sol_p = document.querySelector("#sol > .price");
    const qs_sol_r = document.querySelector("#sol > #rate");

    qs_sol_p.innerText = marketArr[4].price;
    qs_sol_r.innerText = marketArr[4].rate;

    const asd = document.querySelectorAll(".coin-section #rate");
    
    //forEach는 노드리스트(querySelectorAll 반환)을
    //다루기 위한 반복문메서드
    asd.forEach(element => {
        element.classList.remove('up','down');
        const str = element.innerText;
        if(Number(element.innerText) > 0) {
            element.innerText = '+' + str + '%';
            element.classList.add('up');
        }
        else if(Number(element.innerText) == 0) {
            element.innerText = str + '%';
        }
        else {
            element.innerText = str + '%';
            element.classList.add('down');
        }
    })

    for(i of price) {
    i.innerHTML = parseInt(i.innerHTML).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
    }
}

//비트코인 리스트 요소 클릭했을 때 (구매 / 판매 )

const coin_qs = document.querySelectorAll(".coin");
const modal = document.getElementById("coinModal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalRate = document.getElementById("modalRate");

//모달창 출력 업데이트
function modal_updateUI() {
    modalTitle.textContent = coinname;
    modalPrice.textContent = '가격: ' + price;
    modalRate.textContent = '변동률: ' + rate;
}



owncoin.addEventListener('click', (e) => {
// 모달 열기
    modal.style.display = "block";
})


// 모달 밖을 클릭하면 모달 닫기
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


//매수 매도 버튼 리스너

const buy_qs = document.querySelector("#btn_buy");
const sell_qs = document.querySelector("#btn_sell");

const listItems = document.querySelectorAll('.coin');

// 클릭요소 변수
let selectedItem = null;

listItems.forEach(element => {
    element.addEventListener('click', () => {

        if (element.classList.contains('selected')) {
            // 이미 선택된 항목을 다시 클릭했을 때 선택 해제
            element.classList.remove('selected');
            selectedItem = null;

            updateChart(selectedItem); 
        } else {
            // 다른 요소에서 'selected' 클래스 제거
            listItems.forEach(i => i.classList.remove('selected'));

            // 클릭된 요소에 'selected' 클래스 추가
            element.classList.add('selected');
            selectedItem = element;
            const coinName = selectedItem.querySelector('.coinname').innerText;

            updateChart(coinName);
        }

    });
});

//매수버튼 리스너
buy_qs.addEventListener('click',() => {
    
    if(selectedItem) {

        const sel_coin_qs = selectedItem.querySelector('.coinname');
        const sel_coin = sel_coin_qs.innerText;
        const cnt = window.prompt("몇 개 매수하시겠습니까?");
        
        
        if(cnt != null) {
            const OwnStr = localStorage.getItem('userOwncoin');
            const OwnArr = JSON.parse(OwnStr);

            const userStr = localStorage.getItem('user');
            const userArr = JSON.parse(userStr);

            const coinStr = localStorage.getItem('market');
            const coinArr = JSON.parse(coinStr);
            
            let coinPrice  = 0;

            //interval 고려해야함 매수매도 alert창에서 가격변동시
            // 기존가격으로 매수매도
            for(let i in coinArr) {
                if(coinArr[i].coinname == sel_coin)
                    coinPrice = coinArr[i].price;
            }

            if(userArr[0].asset > Number(cnt) * coinPrice) {
                for(let i in OwnArr) {
                    if(OwnArr[i].coinName == sel_coin) {
                        OwnArr[i].cnt += Number(cnt);
                    }  
                }

                userArr[0].asset -= Number(cnt) * coinPrice

                localStorage.setItem('user', JSON.stringify(userArr));
                localStorage.setItem('userOwncoin', JSON.stringify(OwnArr));


                
                window.alert('매수가 완료되었습니다.')
                tradelog_update(sel_coin, coinPrice, cnt, '매수');
                user_updateUI();
            }
            else {
                window.alert('금액이 부족합니다.');
            }
        }
    }
    else {
        window.alert('항목을 선택해주세요');
    }
    //구매에 따라서 사용자 보유코인에 플러스
    
    //사용자 자산 코인시세 맞춰서 차감

    //사용자 정보표기 UI 업데이트
    
})

//매도버튼 리스너에영
sell_qs.addEventListener('click',() => {

    //판매에 따라서 사용자 보유코인에서 마이너스

    //사용자 자산 코인시세 맞춰서 증가

    //사용자 정보표기 UI 업데이트
    
    if(selectedItem) {

        const sel_coin_qs = selectedItem.querySelector('.coinname');
        const sel_coin = sel_coin_qs.innerText;
        const cnt = window.prompt("몇 개 매도하시겠습니까?");
        if(cnt != null) {
            const OwnStr = localStorage.getItem('userOwncoin');
            const OwnArr = JSON.parse(OwnStr);

            const userStr = localStorage.getItem('user');
            const userArr = JSON.parse(userStr);

            const coinStr = localStorage.getItem('market');
            const coinArr = JSON.parse(coinStr);
            
            let coinPrice  = 0;

            //interval 고려해야함 매수매도 alert창에서 가격변동시
            // 기존가격으로 매수매도
            for(let i in coinArr) {
                if(coinArr[i].coinname == sel_coin) 
                    coinPrice = coinArr[i].price;     
            }      

            for(let i in OwnArr) {
                if(OwnArr[i].coinName == sel_coin) {
                    if(OwnArr[i].cnt >= Number(cnt)) {
                        OwnArr[i].cnt -= Number(cnt);
                        userArr[0].asset += Number(cnt) * coinPrice

                        localStorage.setItem('user', JSON.stringify(userArr));
                        localStorage.setItem('userOwncoin', JSON.stringify(OwnArr));                
                        
                        window.alert('매도가 완료되었습니다.')
                        tradelog_update(sel_coin, coinPrice, cnt, '매도');
                        user_updateUI();
                    }
                    else {
                        alert('보유하신 코인 수량이 부족합니다.')
                    }
                }  
            }
        }
    }
    else {
        window.alert('항목을 선택해주세요');
    }
})


function tradelog_update(coinname ,price, cnt, buyorsell) {
    const tl_qs = document.querySelector(".tradelog");
    const list = document.createElement("li");
    // 거래 내역 텍스트 추가
    list.innerHTML = `<span class="trade-log-item-part">[${buyorsell}]</span>
        <span class="trade-log-item-part">[코인명: ${coinname}]</span>
        <span class="trade-log-item-part">[가격: ${price}]</span>
        <span class="trade-log-item-part">[수량: ${cnt}개]</span>`;

    list.classList.add("trade-log-item");

    tl_qs.appendChild(list);
}

function user_updateInfo() {
    const userStr = localStorage.getItem('user');
    const ownStr = localStorage.getItem('userOwncoin');

    const userArr = JSON.parse(userStr);
    const ownArr = JSON.parse(ownStr);

    const coinStr = localStorage.getItem('market');
    const coinArr = JSON.parse(coinStr);

    let allCoinPrice = 0;
    for(let ovo of ownArr) {
        for(let cvo of coinArr) {
            if(ovo.coinName == cvo.coinname) {
                allCoinPrice += ovo.cnt * cvo.price
            }
        }
    }

    userArr[0].assetAll = userArr[0].asset + allCoinPrice;

    localStorage.setItem('user', JSON.stringify(userArr));

    //UI 업데이트
    user_updateUI();


}


