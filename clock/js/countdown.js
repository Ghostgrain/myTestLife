/**
 * Created by xiaochaochao on 2017/4/17.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var endTime = new Date();//实例化一个时间
endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSecond = 0;

var balls = [];
const  colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","669900","FFBB33","red","green","grey"]
window.onload = function()
{
    WINDOW_HEIGHT = document.documentElement.clientHeight-20;
    WINDOW_WIDTH = document.documentElement.clientWidth-20;
    //console.log();
    MARGIN_LEFT  = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH *4 /5 / 108) -1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");//绘图环境

    canvas.width = WINDOW_WIDTH;//画布宽度
    canvas.height = WINDOW_HEIGHT;//画布高度

    curShowTimeSecond = getCurrentShowTimeSeconds();
    setInterval(function(){
        render(context);
        update();
    },50);

}
function update()
{
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours *3600)/60);
    var nextSeconds = nextShowTimeSeconds  % 60 ;

    var curHours = parseInt(curShowTimeSecond / 3600);
    var curMinutes = parseInt((curShowTimeSecond - curHours *3600)/60);
    var curSeconds = curShowTimeSecond  % 60 ;

if(nextShowTimeSeconds!=curShowTimeSecond)
{
    if(parseInt(curHours/10) != parseInt(nextHours/10))
    {
        addBalls(MARGIN_LEFT + 0,MARGIN_TOP,parseInt(curHours/10));
    }
    if(parseInt(curHours%10) != parseInt(nextHours%10))
    {
        addBalls(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
    }
    if(parseInt(curMinutes/10) != parseInt(nextMinutes/10))
    {
        addBalls(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));
    }
    if(parseInt(curMinutes%10) != parseInt(nextMinutes%10))
    {
        addBalls(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes%10));
    }
    if(parseInt(curSeconds/10) != parseInt(nextSeconds/10))
    {
        addBalls(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));
    }
    if(parseInt(curSeconds%10) != parseInt(nextSeconds%10))
    {
        addBalls(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
    }
    curShowTimeSecond = nextShowTimeSeconds;
}
    updateBalls();
}
function updateBalls()//小球参数更新
{
    for(var i = 0;i<balls.length;i++)
    {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y>=WINDOW_HEIGHT-RADIUS)
        {
            balls[i].y = WINDOW_HEIGHT -RADIUS;
            balls[i].vy = -balls[i].vy*0.66;
        }
        //if(balls[i].x>=WINDOW_WIDTH - RADIUS)
        //{
        //    balls[i].x=WINDOW_WIDTH -RADIUS;
        //    balls[i].vx = -balls[i].vx;
        //}
    }
    var cnt = 0;
    for( var i = 0; i< balls.length ; i ++)
        if(balls[i].x + RADIUS > 0 && balls[i].x -RADIUS <WINDOW_WIDTH)
            balls[cnt++] = balls[i];

    while(balls.length > cnt)
    {balls.pop()}
}
function addBalls( x, y, num)//小球参数初始化
{
    for(var i =0; i<digit[num].length ;i++)
        for(var j =0; j<digit[num][i].length ;j++)
            if(digit[num][i][j] == 1)
            {
                var aBall  = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5 + Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000)) * 7,
                    vy : -5,
                    color : colors[Math.floor((Math.random()*colors.length))]
                }

                balls.push (aBall);
            }
}
function getCurrentShowTimeSeconds()
{
    var curTime = new Date();
    var ret =curTime.getHours() *3600 + curTime.getMinutes()*60 +curTime.getSeconds();
    //ret = Math.round((ret/1000));
    //
    //return ret >0 ? ret : 0;

    return ret;
}
function render (ctx)
{
    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//对页面进行刷新
    var hours = parseInt(curShowTimeSecond / 3600);
    var minutes = parseInt((curShowTimeSecond - hours *3600)/60);
    var seconds = curShowTimeSecond  % 60 ;
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);

    for(var i = 0;i<balls.length ;i++)
    {
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y, RADIUS,0,2*Math.PI,true);
        ctx.closePath();

        ctx.fill();
    }
}

function renderDigit(x,y,num,ctx)
{
    ctx.fillStyle = "rgb(0,102,153)";

    for( var i=0;i<digit[num].length;i++)
    {
        for(var j = 0;j<digit[num][i].length;j++)
        {
            if(digit[num][i][j] == 1)
            {
                ctx.beginPath();
                ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0 ,2*Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }

}