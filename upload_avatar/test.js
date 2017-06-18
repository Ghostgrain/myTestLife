/**
 * Created by xiaochaochao on 2017/6/18.
 */
define(function(require, exports, module){
   function ClassA(){}
    ClassA.prototype.say = function(){
        console.log("aaaa");
    }
    module.exports = ClassA;
});