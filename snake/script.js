let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let btn_left = document.getElementById("left");
let btn_right = document.getElementById("right");
let btn_up = document.getElementById("up");
let btn_down = document.getElementById("down");

canvas.width  = window.innerHeight/2;
canvas.height = window.innerHeight/2;


let go = true;
let v = [[10,10],[10,90]];
let w = canvas.width;
let h = canvas.height;
let s = 11;
let D = "D";
let new_D = "D";
let X = 100;
let Y = 100;
let um = {
          "U" : [0,-1],
          "D" : [0,1],
          "L" : [-1,0],
          "R" : [1,0]
         };
       
function restart()
{
  v = [[10,10],[10,90]];
  X = 100;
  Y = 100;
  s=11;
  D = "D";
  new_D = "D";
  go=true;
}         

function is_over()
{
  let hx = v[v.length-1][0];
  let hy = v[v.length-1][1];
  if(Math.min(hx,hy)==-1 || hx==w || hy==h) return true;
  for(let i = 1; i+1<v.length; ++i)
  {
      let mx = Math.min(v[i-1][0], v[i][0]);
      let Mx = Math.max(v[i-1][0], v[i][0]);
      let my = Math.min(v[i-1][1], v[i][1]);
      let My = Math.max(v[i-1][1], v[i][1]);
      if(hx>=mx && hx<=Mx && hy>=my && hy<=My) return true;
  }
  return false;
}

function generate_apple()
{
    X = Math.random()*w;
    Y = Math.random()*h;
}

function no_food()
{
  if(Math.abs((X-v[v.length-1][0])*(X-v[v.length-1][0])+ (Y-v[v.length-1][1])*(Y-v[v.length-1][1]))<100) 
  {
      s++;
      generate_apple();
      return false;
  }
  return true;
}
    
function move_head()
{
  v[v.length-1][0] += um[D][0];
  v[v.length-1][1] += um[D][1];
}
    
function move_tail()
{
  let dx = v[1][0] - v[0][0];
  let dy = v[1][1] - v[0][1];
  if(dx) dx /= Math.abs(dx);
  if(dy) dy /= Math.abs(dy);

  v[0][0] += dx;
  v[0][1] += dy;
  if(s && v[0][0]===v[1][0] && v[0][1]===v[1][1]) v.shift();
}
    
function move() 
{
  if(s && D!=new_D) v.push([...v[v.length-1]]);
  D = new_D;
  move_head();
  if(no_food()) move_tail();

  if(is_over())
  {
    go=false;
    context.fillStyle = "lightgreen";
    context.font = "25px courier";
    context.fillText("敗北です!", canvas.width/3, canvas.width/2);
  }
}

function update()
{
  requestAnimationFrame(update);
  if(go)
  {
  updateSnake();
  update_apple();
  update_text();
  }
}

function update_text()
{
  context.fillStyle = 'lightgreen';
  context.font = "16px courier";
  context.fillText("スコア:"+ s.toString(), 15, 20);
}

function update_apple()
{
  context.beginPath();
  context.fillStyle = 'lightgreen';
  context.arc(X, Y, 8, 0, 6);
  context.fill();
  context.closePath();
}

function updateSnake()
{
    canvas.style.backgroundColor = "black";

    context.clearRect(0,0, canvas.width, canvas.height);
    context.strokeStyle = "lightgreen";
    context.lineWidth = 3;
    context.beginPath();
 
    context.moveTo(v[0][0], v[0][1]);
    move();
    for(let i=1; i<v.length; ++i)
       context.lineTo(v[i][0], v[i][1]);
    context.stroke();
    context.closePath();
}

update();

document.addEventListener('keydown', function(event) 
{
  if (event.code === 'KeyA') new_D="L";
  if (event.code === 'KeyD') new_D="R";
  if (event.code === 'KeyW') new_D="U";
  if (event.code === 'KeyS') new_D="D";
  if (event.code === 'Enter') restart();
 });



btn_left.addEventListener('click', function(event) { new_D="L"; });
btn_right.addEventListener('click', function(event) { new_D="R"; });
btn_up.addEventListener('click', function(event) { new_D="U"; });
btn_down.addEventListener('click', function(event) { new_D="D"; });
