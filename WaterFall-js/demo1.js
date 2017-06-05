/**
 * Created by Administrator on 2016/11/6 0006.
 */
window.onload=function()
{
    waterFall('wrap','wbox');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}
        ,{'src':'5.jpg'},{'src':'6.jpg'},{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'},{'src':'11.jpg'},{'src':'12.jpg'},{'src':'13.jpg'}
        ,{'src':'14.jpg'},{'src':'15.jpg'},{'src':'16.jpg'},{'src':'17.jpg'},{'src':'18.jpg'}]};
    window.onscroll= function () {
        if(checkH())
        {
            var myParent = document.getElementById("wrap");
            for(var i= 0;i<dataInt.data.length;i++)
            {    var wbox = document.createElement('div');
                wbox.className='wbox';
                    myParent.appendChild(wbox);
                var box = document.createElement('div');
                box.className = 'box';
                wbox.appendChild(box);
                var myimg = document.createElement('img');
                myimg.className='im';
                myimg.src='images/'+dataInt.data[i].src;
                console.log(i);
                box.appendChild(myimg);}
            waterFall('wrap','wbox');

     }
    }
}
function checkH()
{
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    var clientTop = document.documentElement.clientHeight;
    var boxs = getElementByClassName("wrap","wbox");
    var lastbox = boxs[boxs.length-1].offsetTop+Math.floor(boxs[boxs.length-1].offsetHeight/2);
    return (lastbox<scrollTop+clientTop)?true:false;
}
function waterFall(parent,box)//将下一列的图片放在最窄的那个地方
{
    var boxs = getElementByClassName(parent,box);
    var boxsH = new Array();
    for(var i=0;i<boxs.length;i++)
    {   var boxH = boxs[i].offsetHeight;
        if(i<4)
        {
            boxsH[i]=boxH;
        }
        else{
            var minH = Math.min.apply(null,boxsH)//找到数组中最小的值
            var minIndex = getIndex(minH,boxsH);
            boxs[i].style.position = 'absolute';
            boxs[i].style.top = boxsH[minIndex]+'px';
            boxs[i].style.left = boxs[minIndex].offsetLeft+'px';
            boxsH[minIndex] += boxs[i].offsetHeight;
        }
    }
    //console.log(boxsH);
}
function getIndex(val,arr)
{
    for(var i=0;i<arr.length;i++)
    {
        if(val==arr[i])return i;
    }
}
function getElementByClassName(id,className)
{
    var parent = document.getElementById(id);
    var arr = new Array();
    var obj = parent.getElementsByTagName("*");
    for(var i=0;i<obj.length;i++)
    if(obj[i].className==className)
    arr.push(obj[i]);
    return arr;//将需要处理的BOX丢出去
}
