/**
 * Created by xiaochaochao on 2017/6/18.
 */
//var upload_avatar = require("./upload_avatar");
function T(target){
    require(['./upload_avatar'],function(UploadAvatar){
        console.log('BBBB');
        var test = new UploadAvatar();
        test.mkAvatar(target);
    });
    console.log("ccc");
}

//function mkAvatar(target){
//    var avatar = new upload_avatar();
//    avatar.mkAvatar(target);
//}

