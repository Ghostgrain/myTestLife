/**
 * Created by xiaochaochao on 2017/6/18.
 */
var $ = function(id){
    return document.getElementById(id);
}
var avatarContainer = $('avatarContainer')
var avatarMask = $('avatar-mask');
addEvent(avatarMask, "click",function(){
    var index = 0;
    for(;index < avatarContainer.childNodes.length; index++){
        if(avatarContainer.childNodes[index].tagName == "INPUT")
            avatarContainer.childNodes[index].click();
    }
});

function addEvent(ele, event, callback)//监听事件
{
    if(ele.addEventListener)
    {ele.addEventListener(event,callback,false);
    }else if(el.attachEvent)
    {
        ele.attachEvent('on'+event,callback);
    }
}
function T(target){
    require(['./upload_avatar'],function(UploadAvatar){
        var uploadAvatar = new UploadAvatar();
        uploadAvatar.mkAvatar(target);
    });
}