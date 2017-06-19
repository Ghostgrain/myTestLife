define(function(require, exports, module){
    var avatarSize = {
        sx:0,
        sy:0,
        width:160,
        height:160,
        x:0,
        y:0,
        imgWidth:320,
        imgHeight:160
    }//存放切割后的位矢
    var options = {
        url :"",
    }
    /*UploadAvatar类*/
    function UploadAvatar(){

    }
    UploadAvatar.prototype.mkAvatar = fileChange();
    UploadAvatar.prototype.addEvent = addEvent;
    /*图片预览函数*/
    function preview(file, preMask)
    {
        var prevDiv = document.getElementById('UserAvatarEditor-container');
        if (file.files && file.files[0])
        {
            var reader = new FileReader();
            reader.onload = function(evt){
                var oImg = new Image();
                oImg.src = evt.target.result;
                oImg.style.cssText = "position:absolute;"
                oImg.onload = function(){
                    var flag = oImg.offsetWidth/oImg.offsetHeight;
//                    console.log(flag);
                    var container = preMask.parentNode;

                    /*确定图片是横放还是竖放,*/
                    if(flag >1 ){
                        oImg.style.cssText += "height: 160px;";
                    }else if(flag == 1)
                    {
                        oImg.style.cssText += "height: 160px";
                    }
                    else{
                        oImg.style.cssText += "width: 160px;"
                    }
                    oImg.style.cssText += "left: 50%;top: 50%;margin-left: " + -oImg.offsetWidth/2+"px;margin-top:" + -oImg.offsetHeight/2+"px;";
                    drag(container, oImg);
                };

//                console.log(oImg.offsetWidth);
//                prevDiv.innerHTML = '<img src="' + evt.target.result + '" style="width:256px"/>';
                prevDiv.appendChild(oImg);

                console.log(1111);
            };
            reader.readAsDataURL(file.files[0]);
        }
        else
        {
//            prevDiv.appendChild(oImg);
            prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
        }
    }
    /*文件大小检测*/
    function fileChange(target ,url){
        /*检测上传文件的类型*/
        options.url = url;
        var btn = document.getElementById('submit_upload');
        var imgName = document.getElementById('avatar').value;
        var ext,idx;

        if (imgName == ''){
            btn.disabled=true;
            alert("请选择需要上传的文件!");
            return;
        } else {
            idx = imgName.lastIndexOf(".");
            if (idx != -1){
                ext = imgName.substr(idx+1).toUpperCase();
                ext = ext.toLowerCase( );
                // alert("ext="+ext);
                if (ext != 'jpg' && ext != 'png' && ext != 'jpeg' && ext != 'gif'){
                    btn.disabled=true;
                    alert("只能上传.jpg  .png  .jpeg  .gif类型的文件!");
                    return;
                }
            } else {
                btn.disabled=true;
                alert("只能上传.jpg  .png  .jpeg  .gif类型的文件!");
                return;
            }
        }

        /*检测上传文件的大小*/
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        var fileSize = 0;
        if (isIE && !target.files){
            var filePath = target.value;
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            var file = fileSystem.GetFile (filePath);
            fileSize = file.Size;
        } else {
            fileSize = target.files[0].size;
        }

        var size = fileSize ;
        if(size>(1024*1024*3)){
            btn.disabled=true;
            alert("文件大小不能超过3M");
        }else{
            /*所有验证都通过了,开始弹层*/
            doMask(target);
        }
    }
    function addEvent(ele, event, callback)//监听事件
    {
        if(ele.addEventListener)
        {ele.addEventListener(event,callback,false);
        }else if(el.attachEvent)
        {
            ele.attachEvent('on'+event,callback);
        }
    }
    /*元素拖拽函数*/
    function drag(elem, avatar)
    {
        elem.onmousedown = function(e){
            var left = 48 - parseInt(avatar.style.marginLeft);
            var top = 48 - parseInt(avatar.style.marginTop);
            /*边界检测*/
            var boundary = {left:left,right: left - (avatar.offsetWidth - 160),top: top, bottom: top - (avatar.offsetHeight - 160)};
            e = e || window.event;
            var disX = e.clientX - (avatar.offsetLeft - parseInt(avatar.style.marginLeft));
            var disY = e.clientY - (avatar.offsetTop  - parseInt(avatar.style.marginTop)) ;
            document.onmousemove = function(e){
                e = e || window.event;

                avatar.left = e.clientX - disX;
                avatar.top = e.clientY - disY;
                if(avatar.left > boundary.left)
                {
                    avatar.left = boundary.left;
                }else if(avatar.left <= boundary.right){
                    avatar.left = boundary.right;
                }
                if(avatar.top > boundary.top)
                {
                    avatar.top = boundary.top;
                }else if(avatar.top <= boundary.bottom){
                    avatar.top = boundary.bottom;
                }
                avatar.style.left = avatar.left +"px";
                avatar.style.top = avatar.top + "px";
                //
                //avatarSize.sx = 48 - avatar.offsetLeft ;
                //avatarSize.sy = 48 - avatar.offsetTop ;
                //clipImg(avatar, avatarSize);
                return false;
            };
            //clipImg(avatar, avatarSize);
            /*解决按键抬起无法释放的BUG*/
            window.onmouseup = function(){
                document.onmousemove = null;//取消事件
            }
        };
    }
    /*图片检测弹层*/
    function doMask(target){
        var mask = document.createElement('div');
        mask.id = "mask";


        /*弹层内容模块*/
        var setAvatar = document.createElement('div');
        setAvatar.id = "setAvatar";
        var h3 = document.createElement('h3');
        h3.className = "Modal-title";
        h3.innerHTML = "编辑头像";

        /*content区*/
        var avatarContainer = document.createElement('div');
        avatarContainer.id = "UserAvatarEditor-container";

        /*关闭小按钮*/
        var closeAll = document.createElement('span');
        closeAll.style.cssText = "width:16px;height:16px;line-height:16px;" +
            ";position:absolute;right:-56px;top:0;padding:14px;background:url(close.png);cursor: pointer ";
        addEvent(closeAll, "click", function(){
            document.body.removeChild(mask);
            document.body.removeChild(setAvatar);
        });

        /*保存按钮*/
        var oInput = document.createElement('input');
        oInput.type = "button";
        oInput.value = "保存";
        oInput.style.cssText = "display: block;width: 220px;background: #0f88eb;border: 1px solid #0f88eb;" +
            "height: 32px;border-radius: 3px;margin: 108px auto;color: white;font-weight: bold";
        addEvent(oInput, "mouseover", function(){
            oInput.style.background = "#0d79d1";
            oInput.style.cursor = "pointer";
        });
        addEvent(oInput, "mouseout", function(){
            oInput.style.background = "#0f88eb";
        });
        addEvent(oInput, "click", function(){
            var img = $("UserAvatarEditor-container").childNodes[1];
            avatarSize.sx = 48 - img.offsetLeft;
            avatarSize.sy = 48 - img.offsetTop;
            clipImg(options.url, img, avatarSize);
        })
        /*聚焦框*/
        var preMask = document.createElement("div");
        preMask.style.cssText = "width: 160px;height: 160px;background: transparent;position: absolute;" +
            "left: 0;top: 0;";
        preMask.style.zIndex = 2;
        preMask.style.border = "48px solid rgba(255, 255, 255, .8)";

        /*放大滑块*/
        var slider = document.createElement('input');
        slider.type = "range";
        slider.step = "0.01";
        slider.min = "1";
        slider.max = "2";
        slider.className = "RangeInput";
        slider.value = "1";
        addEvent(slider, "mousemove", function(){
            var oImg = slider.parentNode.childNodes[1].childNodes[1];
            if(oImg.style.width){
                oImg.style.width = slider.value * 160 + "px";
            }else{
                oImg.style.height = slider.value * 160 + "px";
            }
            oImg.style.marginTop = -oImg.offsetHeight/2 + "px";
            oImg.style.marginLeft = -oImg.offsetWidth/2 + "px";

        });

        /*进行模块的拼接*/
        document.body.appendChild(mask);
        document.body.appendChild(setAvatar);
        avatarContainer.appendChild(preMask);
        setAvatar.appendChild(h3);
        setAvatar.appendChild(avatarContainer);
        setAvatar.appendChild(closeAll);
        setAvatar.appendChild(oInput);
        setAvatar.appendChild(slider);
        preview(target,preMask);
    }
    function clipImg(img, options, url){
        /*Canvas切割部分*/
        var realSize = realImgSize(img);
        var scaleWidth = realSize.width / img.width;
        var scaleHeight = realSize.height / img.height;

        var clipImgCanvas = document.createElement("canvas");
        clipImgCanvas.style.width = 160 + "px";
        clipImgCanvas.style.height = 160 + "px";
        var ctx = clipImgCanvas.getContext("2d");
        ctx.drawImage(img, options.sx * scaleWidth, options.sy * scaleHeight, options.width * scaleWidth, options.height * scaleHeight,
        options.x, options.y, options.imgWidth, options.imgHeight);
        var fullQuality = clipImgCanvas.toDataURL("image/jpeg", 1.0);
        var avatar = getByTag(getById('avatarContainer').childNodes, "img");
        avatar[0].src = fullQuality;
        avatar[0].style.width = 160 + "px";
        avatar[0].style.height = 160 + "px";
        ajaxPost(url ,fullQuality);
        //img.style.zIndex = 999;
        //document.body.appendChild(clipImgCanvas);
        //return fullQuality;
    }
    function realImgSize(img){
        var real_width,
            real_height,
            im          = document.createElement('img');
            im.src      = img.src,
            real_width  = im.width,
            real_height = im.height;
        return {width: real_width,height: real_height};
    }
    function ajaxPost(url, dataFile, callback)//ajax原生兼容
    {   var fd = new FormData();
        fd.append("upfile", dataFile);
        var xele = null;
        if(window.XMLHttpRequest)
        {xele = new window.XMLHttpRequest();}
        else if(window.ActiveXObject)
        {
            xele = new window.ActiveXObject("Msxml2.XMLHTTP");
        }
        xele.onreadystatechange = function()
        {
            if(xele.readyState == 4&& xele.status ==200)
            {
                callback (JSON.parse(xele.responseText));
            }
            xele.open('post', url, true);
            xele.send(fd);
        }
    }
    function getById(id){
        return document.getElementById(id);
    }
    function getByTag(parent, tagName){
        var arr = [];
        tagName = tagName.toUpperCase();
        for(var index in parent){
            if(parent[index].tagName === tagName){
                arr.push(parent[index]);
            }
        }
        return arr;
    }

    module.exports=UploadAvatar;
});
