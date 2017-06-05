/**
 * Created by Administrator on 2016/6/18 0018.
 */
//window.setInterval('showTime()',1000)
function showTime()
{
    var enabled = 0;
    today = new Date();
    var day;
    var date;
    if(today.getDay()==0) day = "Sunday"
    if(today.getDay()==1) day = "Monday"
    if(today.getDay()==2) day = "Tuesday"
    if(today.getDay()==3) day = "Wednesday"
    if(today.getDay()==4) day = "Thursday"
    if(today.getDay()==5) day = "Friday"
    if(today.getDay()==6) day = "Saturday"
    var h = today.getHours();
    var seconds = today.getSeconds();

    date =(today.getMonth() + 1 ) + "/" + today.getDate() + "/" +
        day+h+":"+today.getMinutes()+":"+ seconds;
    document.getElementById("time").innerHTML=date;
}
