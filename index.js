import {tools} from './canvas_tools.js'
let t = new tools

//------------------ initial setup -------------------------

const canvas = document.getElementsByTagName("canvas")[0]
const clusters = document.getElementById("n")
const start_button = document.getElementById("start_button")
const reset = document.getElementById("reset")
const next = document.getElementById("next")
canvas.width = 800
canvas.height = 600
let ctx = canvas.getContext("2d")
let dot_radius = 5
let dots = []
let selected = []
let colors = []
let groups = []
let n = parseInt(clusters.value)
next.disabled = true

//------------------- tools ---------------------------------

function caldist(pos1,pos2){
    return Math.sqrt(Math.pow(pos1.x-pos2.x,2)+Math.pow(pos1.y-pos2.y,2))
}

function avg(arr){
    let xsum = 0
    let ysum = 0
    for(let i=0;i<arr.length;i++){
        xsum+= arr[i].x
        ysum+= arr[i].y
    }
    return {x:xsum/arr.length,y:ysum/arr.length}
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x,y}
}

function getRandom(arr){
    let i = Math.floor(Math.random()*arr.length)
    return arr[i];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    if(color=="#FFFFFF")
        getRandomColor()
    return color;
}

function clear_board(){
    t.draw_Rect(ctx,{x:0,y:0},canvas.width,canvas.height,"rgb(62, 62, 62)")
}

function draw_board(coords,rad,color="white"){
    t.draw_Ellipse(ctx,coords,rad,rad,color)
    t.draw_Stroke_Ellipse(ctx,coords,rad,rad,"black")
}

//------------------- event listeners -----------------------

canvas.addEventListener("click",(e)=>{
    let coords = getMousePosition(canvas,e)
    draw_board(coords,dot_radius,"white")
    dots.push(coords)
})

clusters.addEventListener("change",()=>{
    n = parseInt(clusters.value)
    if(n<=0) n=1
    clusters.value = n
})

start_button.addEventListener("click",()=>{
    while(selected.length<n && dots.length>=n){
        let ele = getRandom(dots)
        if(selected.indexOf(ele) == -1){
            selected.push(ele)
        }
    }
    for(let i=0;i<n;i++){
        colors.push(getRandomColor())
    }
    for(let i=0;i<n;i++){
        groups.push([])
    }
    for(let i=0;i<selected.length;i++){
        draw_board(selected[i],dot_radius,colors[i])
    }

    start_button.disabled = true
    next.disabled = false
})

reset.addEventListener("click",()=>{
    clear_board()
    start_button.disabled = false
    next.disabled = true

    dots = []
    selected = []
    colors = []
    groups = []
})

next.addEventListener("click",()=>{

    //distance calculation

    let distances =[]
    for(let i=0;i<dots.length;i++){
        distances.push([])
    }

    for(let i=0;i<dots.length;i++){
        for(let j=0;j<selected.length;j++){
            let dist = caldist(dots[i],selected[j]) //sus, may cause problem due to shallow copying
            distances[i].push(dist)
        }
    }

    //grouping

    for(let i=0;i<dots.length;i++){
        let min = Math.min(...distances[i])
        let select = distances[i].indexOf(min)
        groups[select].push(dots[i])
    }

    //averaging

    for(let i=0;i<groups.length;i++){
        selected[i] = avg(groups[i])
    }

    //drawing the new board
    
    clear_board()
    for(let i=0;i<groups.length;i++){
        for(let j=0;j<groups[i].length;j++){
            draw_board(groups[i][j],dot_radius,colors[i])
        }
    }
    for(let i=0;i<selected.length;i++){
        draw_board(selected[i],dot_radius)
    }
})