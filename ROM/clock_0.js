/**
 * Created by Administrator on 2017/3/28 0028.
 */
var Dom = document.getElementById('clock');
var ctx = Dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width /200;
function drawBackground()
{   ctx.save();
    ctx.translate(r,r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0,0,r - ctx.lineWidth /2,0,2*Math.PI,false)
    ctx.stroke();//进行曲线制作

    var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font = 18* rem+' Arial';
    ctx.textAlign = 'center';//水平居中
    ctx.textBaseline = 'middle'//垂直居中
    hourNumber.forEach(function (number,i)    {
        var rad = 2 * Math.PI / 12*i;
        var x = Math.cos(rad) * (r-30 * rem);
        var y = Math.sin(rad) * (r-30 * rem);
        ctx.fillText(number,x,y);
    });
    for(var i=0;i<60;i++)
    {   var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if(i % 5 === 0)
        {   ctx.fillStyle = '#000';
            ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);
            //console.log(1);
        }
        else
        {   ctx.fillStyle = '#ccc';
            ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);}
            ctx.fill();
    }

}
function drawHour(hour,minute)
{   ctx.save();//保存之前画画的状态
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * (hour + minute / 60);
    ctx.rotate(rad);
    ctx.lineWidth = 6 * rem;
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0,- r / 2 );
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();//还原以前的状态
}
function drawMinute(minute,second)
{
    ctx.save();//保存之前画画的状态
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * (minute + second/60);
    ctx.rotate(rad);
    ctx.lineWidth = 3 * rem;
    ctx.moveTo(0,15 * rem);
    ctx.lineTo(0,- r / 2 - 18 * rem);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();//还原以前的状态
}
function drawSecond(second)
{
    ctx.save();//保存之前画画的状态
    ctx.beginPath();
    ctx.fillStyle = '#c14543';
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2,20* rem);
    ctx.lineTo(2,20* rem);
    ctx.lineTo(1, -r + 18* rem);
    ctx.lineTo(-1, -r + 18* rem);
    ctx.fill();
    ctx.restore();//还原以前的状态
}
function drawDot()
{
    ctx.beginPath();
    ctx.fillStyle = '999';
    ctx.arc(0,0,3 * rem,0,2*Math.PI,false);
    ctx.fill();
}
function flash()
{   ctx.clearRect(0,0,width,height);
    drawBackground();
    var now_date = new Date();
    var hour = now_date.getHours();
    var minute = now_date.getMinutes();
    var second = now_date.getSeconds();
    drawHour(hour,minute);
    drawMinute(minute,second);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
flash();
setInterval(flash,1000);

