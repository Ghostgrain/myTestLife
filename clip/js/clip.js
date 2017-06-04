/**
 * Created by Administrator on 2016/12/4 0004.
 */
window.onload=function(){
    document.onselectstart=new Function('event.returnValue=false;');
    var rightDiv = document.getElementById('right');
    var mainDiv = document.getElementById("main");
    var upDiv = document.getElementById('up');
    var leftDiv = document.getElementById('left');
    var downDiv = document.getElementById('down');
    var right_upDiv = document.getElementById('right-up');
    var right_downDiv = document.getElementById('right-down');
    var left_downDiv = document.getElementById('left-down');
    var left_upDiv = document.getElementById('left-up');
    var contact = '';//标记被按下的是哪个键
    var ifKeyDown = false;//标记按下状态
    var ifMove = false;
    var x0,y0,tL,tT;
    rightDiv.onmousedown = function(e)
    {
        e.stopPropagation();
        ifKeyDown = true;
        contact = 'right';
    }
    upDiv.onmousedown = function(e)
    {
        e.stopPropagation();
        ifKeyDown = true;
        contact = 'up'
    }
    leftDiv.onmousedown = function(e)
    {   e.stopPropagation();
        ifKeyDown = true;
        contact = 'left';
    }
    downDiv.onmousedown = function(e)
    {   e.stopPropagation();
        ifKeyDown = true;
        contact = 'down'
        }
    right_upDiv.onmousedown = function(e)
    {
        e.stopPropagation();
        ifKeyDown = true;
        contact = 'right_upDiv'
    }
    right_downDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = 'right_downDiv';
    }
    left_downDiv.onmousedown = function(e){
        e.stopPropagation();
        ifKeyDown = true;
        contact = 'left_downDiv';
    }
    left_upDiv.onmousedown = function(e)
    {
        e.stopPropagation();
        ifKeyDown = true;
        contact = 'left_upDiv'
    }
    window.onmouseup = function(){
        ifKeyDown = false;//鼠标全屏松开状态
        ifMove = false;
    }
    window.onmousemove = function(e)
    {    if(ifKeyDown == true) {
        switch (contact)
        {
            case 'right' :
                moveRight(e);
                break;
            case 'up' :
                moveUp(e);
                break;
            case 'left' :
                moveLeft(e);
                break;
            case 'down' :
                moveDown(e);
                break;
            case 'right_upDiv' :
                moveRight(e);
                moveUp(e);
                break;
            case 'right_downDiv' :
                moveRight(e);
                moveDown(e);
                break;
            case 'left_downDiv' :
                moveLeft(e);
                moveDown(e);
                break;
            case 'left_upDiv' :
                moveLeft(e);
                moveUp(e);
                break;
        }

    }
        moveBox(e,x0,y0,tL,tT);
        setChoice();preview();

    }

    mainDiv.onmousedown = function(e)
    {   x0 = e.clientX;
        y0 = e.clientY;
        tL = mainDiv.offsetLeft;
        tT = mainDiv.offsetTop;
        ifMove = true;
    }

    function moveRight(e)//移动right边框
    {var x = e.clientX;
        var addWidth = 0;
        var widthBefore = mainDiv.offsetWidth -2;
        addWidth = x - getPosition(mainDiv).left - widthBefore;
        mainDiv.style.width = addWidth + widthBefore + "px";}
    function moveUp(e)//上边框
    {
        var y = e.clientY;
        var addHeight = 0;
        var heightBefore = mainDiv.offsetHeight - 2;
        addHeight = getPosition(mainDiv).top - y;
        if(heightBefore>8||addHeight>0)//减少DOM下移发生的可能
        {
            mainDiv.style.height = addHeight + heightBefore + "px";
            mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";}
    }
    function moveLeft(e)
    {var x = e.clientX;
        var addWidth = 0;
        var widthBefore = mainDiv.offsetWidth -2;
        addWidth = getPosition(mainDiv).left - x;
        if(widthBefore>8||addWidth>0)//减少DOM右移发生的可能
        {    mainDiv.style.width = widthBefore + addWidth + "px";
            mainDiv.style.left = mainDiv.offsetLeft - addWidth + "px"
        }}
    function moveDown(e)
    {var y = e.clientY;
        var addHeight = 0;
        var heightBefore = mainDiv.offsetHeight -2;
        addHeight = y- getPosition(mainDiv).top - heightBefore;
        mainDiv.style.height = addHeight + heightBefore + "px";
    }
    //设置高亮可见
    function setChoice()
    {
        var top = mainDiv.offsetTop;
        var right = mainDiv.offsetLeft+mainDiv.offsetWidth;
        var bottom = mainDiv.offsetTop+mainDiv.offsetHeight;
        var left = mainDiv.offsetLeft;
        var imag2 = document.getElementById('img2');
        imag2.style.clip = "rect("+top+"px "+ right+"px " +bottom+"px "+left+"px)"
    return {"top":top,"right":right,"bottom":bottom,"left":left}
    }
    //预览函数
    function preview()
    {
        var e = setChoice();
        var imag3 = document.getElementById('img3');
        imag3.style.top = -e.top+'px';
        imag3.style.left = -e.left+'px';
        imag3.style.clip = "rect("+ e.top+"px "+ e.right+"px " + e.bottom+"px "+ e.left+"px)"
    }
    function moveBox(e,x0,y0,ofl,oft)
    {   var x1 = e.clientX;
        var y1 = e.clientY;
        var moveX = x1 - x0 + ofl;
        var moveY = y1 - y0 + oft;
        moveX = prevent(moveX,moveY,mainDiv).x;
        moveY = prevent(moveX,moveY,mainDiv).y;
        if(ifMove)
        {
            mainDiv.style.left = moveX + 'px';
            mainDiv.style.top  = moveY + 'px';
        //    console.log(mainDiv.offsetLeft);
            }
    }
}

function getPosition(node){
    var left = node.offsetLeft;
    var top = node.offsetTop;
    var parent = node.offsetParent;
    while(parent != null){
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent=parent.offsetParent;
    }
    return {"left":left,"top":top};
}
function prevent(x,y,ele)
{
    if(x<0)
        x=0;
    else if(x+ele.offsetWidth>ele.parentNode.offsetWidth)
        x = ele.parentNode.offsetWidth-ele.offsetWidth;
    if(y<0)
        y=0;
    else if(y+ele.offsetHeight>ele.parentNode.offsetHeight)
        y = ele.parentNode.offsetHeight-ele.offsetHeight;
return {"x":x,"y":y}
}
