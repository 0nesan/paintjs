const canvas = document.querySelector("#jsCanvas");
//canvas 위에 커서 있으면 인식하게 해줌
const ctx = canvas.getContext("2d");

const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

// canvas 크기 지정.
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// canvas 기본 배경을 그려줌.
ctx.fillStyle = "#fff";
ctx.fillRect(0,0,canvas.width,canvas.height);

// 기본 배경, 선 굵기 선,면 색상.
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

// 페인팅 모드인지 필링 모드 기본값.
let painting = false;
let filling = false;

// 페인팅 모드 전환 이벤트.
const stopPainting = () => {
    painting = false;
};
const startPainting = () => {
    painting = true;
};

// 마우스 이동시 이벤트.
const onMouseMove = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    };
};

// 스트로크 색상,필 색상 변경 이벤트
const handleColorClick = (e) => {
    let colorStyle = window.getComputedStyle(e.target).backgroundColor; 
    ctx.strokeStyle =  colorStyle;
    ctx.fillStyle =  colorStyle;
};

// 스트로크 굵기 변경 이벤트
const handleRangeChange = (e) => {
    ctx.lineWidth = e.target.value;
};

// 모드 확인 및 변경 이벤트
const handleModeClick = () => {
    if(filling === true){
        filling = false;
        mode.innerText ="Fill";
        canvas.style = "cursor:auto" 
    } else {
        filling = true;
        mode.innerText ="paint";
        canvas.style = "cursor:pointer"
    }
};

// 색 체우기 이벤트
const handleFillChange = () => {
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
};

// 우클릭 이벤트 막기
const handleMenuDefend = (e) => {
    e.preventDefault();
}

// 다운로드 이벤트
const handleSaveClick = () => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "내가그린기린그림";
    link.click();
};

// 켄버스 관련 이벤트 리스너
if (canvas){
    canvas.addEventListener("mousemove" ,onMouseMove);
    canvas.addEventListener("mousedown" ,startPainting);
    canvas.addEventListener("mouseup" ,stopPainting);
    canvas.addEventListener("mouseleave" ,stopPainting);
    canvas.addEventListener("click" ,handleFillChange);
    canvas.addEventListener("contextmenu", handleMenuDefend);
};

// 컬러 변경 이벤트 리스너
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)  
);

// 굵기 변경 이벤트 리스너
if(range){
    range.addEventListener("input", handleRangeChange)
};

// 모드 확인 이벤트 리스너
if(mode){
    mode.addEventListener("click",handleModeClick)
};

// 세이브 이벤트 리스너
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick)
};