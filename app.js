'use strict';


let allGoats = [];

let leftImageIndex;
let centerImageIndex;
let rightImageIndex;

let leftImage = document.getElementById('left-image');
let rightImage = document.getElementById('right-image');
let centerImage = document.getElementById('center-image');
let divImage = document.getElementById('image-div');

let maxAttempts = 25;
let userAttemptsCounter = 0;

let imageName= [];
let goatVotes=[];
let shown=[];
let previousIndexs= [];

let previousLeftIndex = -1;
let previousRightIndex = -1;
let previousCenterIndex = -1;


let btnSubmit= document.getElementById('sumbit-btn');
btnSubmit.addEventListener('click', submitForm);


let showResult= document.getElementById('show-btn');
showResult.addEventListener('click', showFinalResult);


function ImageBus(name, source) {
    this.name = name;
    this.source = source;
    this.imageShownNum = 0;
    this.productClicked = 0;
    this.userInput= 0;

    allGoats.push(this);
    imageName.push(name);
}

new ImageBus('bag', 'images/bag.jpg');
new ImageBus('banana', 'images/banana.jpg');
new ImageBus('bathroom', 'images/bathroom.jpg');
new ImageBus('boots', 'images/boots.jpg');
new ImageBus('breakfast', 'images/breakfast.jpg');
new ImageBus('bubblegum', 'images/bubblegum.jpg');
new ImageBus('chair', 'images/chair.jpg');
new ImageBus('cthulhu', 'images/cthulhu.jpg');
new ImageBus('dog-duck', 'images/dog-duck.jpg');
new ImageBus('dragon', 'images/dragon.jpg');
new ImageBus('pen', 'images/pen.jpg');
new ImageBus('pet-sweep', 'images/pet-sweep.jpg');
new ImageBus('scissors', 'images/scissors.jpg');
new ImageBus('shark', 'images/shark.jpg');
new ImageBus('sweep', 'images/sweep.jpg');
new ImageBus('tauntaun', 'images/tauntaun.jpg');
new ImageBus('unicorn', 'images/unicorn.jpg');
new ImageBus('water-can', 'images/water-can.jpg');
new ImageBus('wine-glass', 'images/wine-glass.jpg');


// Calling render function
renderImages();
// Adding event Listener
divImage.addEventListener('click', imageListener);


// Declaration of functions

function generateRandomIndex() {
   return  Math.floor(Math.random() * (allGoats.length));
}

function renderImages() {
    previousIndexs = [previousLeftIndex, previousRightIndex, previousCenterIndex];

    previous();

    console.log('Array: ',previousIndexs);

    allGoats[leftImageIndex].imageShownNum++;
    allGoats[rightImageIndex].imageShownNum++;
    allGoats[centerImageIndex].imageShownNum++;

    leftImage.src = allGoats[leftImageIndex].source;
    centerImage.src = allGoats[centerImageIndex].source;
    rightImage.src = allGoats[rightImageIndex].source;

}

function previous(){
    do {
        leftImageIndex = generateRandomIndex();
    }while(previousIndexs.includes(leftImageIndex));

    previousLeftIndex = leftImageIndex;
    previousIndexs.push(leftImageIndex);

    do {
        rightImageIndex = generateRandomIndex();
    }while(previousIndexs.includes(rightImageIndex));

    previousRightIndex = rightImageIndex;
    previousIndexs.push(rightImageIndex);
    

    do {
        centerImageIndex = generateRandomIndex();
    }while(previousIndexs.includes(centerImageIndex));

    previousCenterIndex = centerImageIndex;
}

function submitForm(){
    maxAttempts= document.getElementById('userInput').value;
    console.log(maxAttempts);
    getData();
    return maxAttempts;
}

function saveData(){
    let insertedRounds = JSON.stringify(allGoats);
    localStorage.setItem('rounds', insertedRounds);
}

function getData(){
    let list = localStorage.getItem('rounds');
    let listJS = JSON.parse(list);
    if (listJS){
        allGoats= listJS;
    }
    
    renderImages();
    console.log(listJS);
  //  return listJs;
}

function imageListener(event) {
    console.log(userAttemptsCounter);

    if (userAttemptsCounter < maxAttempts ) {
        if (event.target.id === 'left-image') {
            allGoats[leftImageIndex].productClicked++;
            userAttemptsCounter++;
            renderImages();
        } else if (event.target.id === 'right-image') {
            allGoats[rightImageIndex].productClicked++;
            userAttemptsCounter++;
            renderImages();
        } else if(event.target.id === 'center-image') {
            allGoats[centerImageIndex].productClicked++;
            userAttemptsCounter++;
            renderImages();
        }else{
            console.log('after if is finished');
        }
            
        

     }//else{
    // showResult.disabled = false;
    // }
    saveData();
}

function showFinalResult(){

    let resultsList = document.getElementById('result-list');
        let finalResult;
        getData();
        for (let i = 0; i < allGoats.length; i++) {
            finalResult = document.createElement('li');
            finalResult.textContent = allGoats[i].name + ' has been shown ' +
            allGoats[i].imageShownNum + ' times and has been clicked ' +
            allGoats[i].productClicked + ' times.';
            resultsList.appendChild(finalResult);

        }
        divImage.removeEventListener('click', imageListener);
        
        showChart();
        
}

function showChart(){
    //getData();
    for (let i=0; i< allGoats.length; i++){
        goatVotes.push(allGoats[i].productClicked);
        shown.push(allGoats[i].imageShownNum);
    }
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: imageName,
        datasets: [{
            label: 'Votes',
            backgroundColor: 'black',
            borderColor: 'black',
            data: goatVotes
        },
        {
            label: 'Views',
            backgroundColor: '#4b7c74',
            borderColor: '#4b7c74',
            data: shown
        }
    ]
    },

    // Configuration options go here
    options: {
        legend: {
        fontColor: "white"},
        scales: {
            yAxes: [{
                fontColor: "brown",
                fontSize: 12,
                ticks: {
                    max: 10,
                    min: 0,
                    beginAtZero: 0,
                    stepSize: 2,
                }
        }],

    }}
});

    chart.config.data.datasets[0].data = goatVotes;
    chart.canvas.parentNode.style.color = 'black';
}
