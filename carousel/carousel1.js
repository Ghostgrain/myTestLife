/**
 * Created by xiaochaochao on 2017/5/30.
 */
define(function(require,exports,module){
        function Carousel(options){
            var setting ={
                img_src : ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"],//图片加载地址数组
                con:document.body,//图片加载容器
                speed:2500,//默认轮播速度
            }
            for(var key in options)
            {
                setting[key]=options[key];
            }
                var index = 0;
                var flag = 1;//为了解决tab移入同一张图时 再次fadeIn这图,1代表要fadeIn
                var container = document.createElement('div');
                container.setAttribute('class','container');
                var content = document.createElement('div');
                content.setAttribute('class','content');
                var tab = document.createElement('ul');
                tab.setAttribute('class','list');
                var arrows = document.createElement('div');
                arrows.setAttribute('class','arrows');
                var prev = document.createElement('span');
                prev.innerHTML = '<';
                prev.setAttribute('class','prev');
                addEvent(prev,'click',function(){
                    clearInterval(timer);
                    index==0?index=arrImg.length-1:index--;
                    changeImg(index,flag,setting);
                    timer = setInterval(function(){
                        next.click();
                    },setting.speed)
                })
                var next = document.createElement('span');
                next.innerHTML = '>';
                addEvent(next,'click',function(){
                    clearInterval(timer);
                    index==arrImg.length-1?index=0:index++;
                    changeImg(index,flag,setting);
                    timer = setInterval(function(){
                        next.click();
                    },setting.speed)
                })
                next.setAttribute('class','next');
            /*进行content图片填充 tab  进行事件监听*/
            for(var i=0;i<setting.img_src.length;i++){
                var oImg = document.createElement('img');
                var oLi = document.createElement('li');
                addEvent(oLi,'mouseover',function(){
                    clearInterval(timer);
                    index==this.innerHTML-1?flag=0:flag=1;
                    index=(this.innerHTML-1);
                    changeImg(index,flag,setting);
                })
                addEvent(oLi,'mouseout',function(){
                    timer = setInterval(function(){
                        next.click();
                    },setting.speed)
                })
                oImg.setAttribute("src",setting.img_src[i]);
                content.appendChild(oImg);
                oLi.innerHTML=(i+1);
                tab.appendChild(oLi);
            }
            /*进行各项模块的组装*/
            arrows.appendChild(prev);
            arrows.appendChild(next);
            container.appendChild(content);
            container.appendChild(arrows);
            container.appendChild(tab);
            setting.con.appendChild(container);
            /*进行图片预设*/
            var arrImg = document.getElementsByTagName('img');
            changeImg(index,flag,setting);
            /*进行图片自动轮播*/
            var timer = setInterval(function(){
                next.click();
            },setting.speed)
            addEvent(content,'mouseover',function(){
                clearInterval(timer);
            })
            addEvent(content,'mouseout',function(){
                timer = setInterval(function(){
                    next.click();
                },setting.speed)
            })
        }
    function addEvent(ele,event,callback)//兼容性监听事件函数
    {
        if(ele.addEventListener)
        {ele.addEventListener(event,callback,false);
            //stopBubble(ele);
        }else if(el.attachEvent)
        {
            ele.attachEvent('on'+event,callback);
            //stopBubble(ele);
        }
    };
    /*改变轮播图*/
    function changeImg(index,flag,setting){
        flag==0?flag:flag=1;
        var arrImg = document.getElementsByTagName('img');
        for(var i=0;i<arrImg.length;i++){
            arrImg[i].setAttribute('class','');
        }
        arrImg[index].setAttribute('class','selected');

        if(flag==1)fadeIn(arrImg[index],20,0);
        setTimeout(function(){fadeOut(arrImg[index],10,100)},setting.speed-1400);
    };
    /*淡入*/
    function fadeIn(ele,speed,opacity){
        ele.style.filter = 'alpha(opacity='+opacity+')';
        ele.style.opacity = opacity/100;
        if(opacity<100){
            opacity+=speed;
            setTimeout(function(){fadeIn(ele,speed,opacity)},70)
        }else opacity=100;
        //speed<100? speed+=10:speed=100;
        //setTimeout(fadeIn(this,speed),100).bind(this)
    };
    /*淡出*/
    function fadeOut(ele,speed,opacity){
        ele.style.filter = 'alpha(opacity='+opacity+')';
        ele.style.opacity = opacity/100;
        if(opacity<0){
            opacity-=speed;
            setTimeout(function(){fadeOut(ele,speed,opacity)},70)
        }else opacity=0;
    };
        module.exports=Carousel;

})