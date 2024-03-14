const inputCount= document.getElementById('input-container');
const countdownForm= document.getElementById('countdownForm');
const dateEl= document.getElementById('date-picker');
let countdownEl= document.getElementById('countdown');
let countdownTitleEl= document.getElementById('countdown-title');
let coudownButton= document.getElementById('countdown-button');
let timeEl= document.querySelectorAll('span');
let completeEl= document.getElementById('complete');
let completeInfo= document.getElementById('complete-info');
let completeBtn= document.getElementById('complete-button');

//set date inpyut
const today= new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

let countdownTitle='';
let countdownDate='';
let coundtdwonValue=Date;
const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;
let countdownActive;
let saveCountdown;


function updateDom(){
  countdownActive=setInterval(() => {
    const now = new Date().getTime();
    const distance = coundtdwonValue - now;

  
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);


    // hine inout
    inputCount.hidden=true;
    if(distance<0){
      countdownEl.hidden=true;
      clearInterval(countdownActive);
      completeInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden=false;


    }else{
      countdownTitleEl.textContent=`${countdownTitle}`;
      timeEl[0].textContent=`${days}`;
      timeEl[1].textContent=`${hours}`;
      timeEl[2].textContent=`${minutes}`;
      timeEl[3].textContent=`${seconds}`;
      completeEl.hidden=true;
      countdownEl.hidden=false;


    }
  
  }, second);

}


function updateCountdown(e){
  e.preventDefault();
  countdownTitle=e.srcElement[0].value;
  countdownDate=e.srcElement[1].value;
  saveCountdown={
    title:countdownTitle,
    date:countdownDate

  }
  localStorage.setItem('countdown', JSON.stringify(saveCountdown));
  // get the number version of the date
  coundtdwonValue=new Date(countdownDate).getTime();
  updateDom();

}

function reset(){
  countdownEl.hidden=true;
  completeEl.hidden=true;
  inputCount.hidden=false;
  clearInterval(countdownActive);
  countdownTitleEl='';
  countdownDate='';
  localStorage.removeItem('countdown');
}
function restore(){
  if(localStorage.getItem('countdown')){
    inputCount.hidden=true;
    saveCountdown=JSON.parse(localStorage.getItem('countdown'));
    countdownTitle=saveCountdown.title;
    countdownDate=saveCountdown.date;
    coundtdwonValue=new Date(countdownDate).getTime();
    updateDom();
  }


}

// event linser
countdownForm.addEventListener('submit', updateCountdown);
coudownButton.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
restore();



