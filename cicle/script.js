/*
    1. 绘制园圈
*/
    var cx=0,cy=0,radio=180;
    var globalId;

    function draw(id){
        globalId=id;
       setInterval(drawNoArg,1000);//每隔1s刷新一次
       // drawNoArg();
    }

function drawNoArg() 
{  
    var canvas = document.getElementById(globalId);  
    if (canvas == null)  
        return false;  
    var context = canvas.getContext('2d');  
    context.save();
    context.fillStyle = "#EEEEFF";  
    context.fillRect(0, 0, 400, 400);  
    context.translate(200,200);

    drawBg(context);
    drawPenal(context);
    drawPointer(context);
    //绘制中心的圆形
    context.beginPath();
    context.arc(cx,cy,13,0,Math.PI*2,true);
    context.closePath();
    context.fillStyle="#000";
    context.fill();//绘制

    context.restore();
}

function drawBg(context){
    context.beginPath();
    context.arc(cx,cy,radio,0,Math.PI*2,true);
    context.closePath();
    context.lineWidth=1;
    context.fillStyle='rgba(255,0,0,0.25)';
    context.stroke();
}

function drawPenal(context){
    // 绘制表盘
    for (var i = 0; i <60; i++) {
        var lineWidth;
        if (i%5==0) {
            lineWidth=30;

            // 绘制刻度
            var text = i%12==0?12:(i/5);
            var it = parseInt(text);
            
                        // 测量文字    
            context.font = "bold 20px Arial";
            context.textAlign = "left";
            context.textBaseline = "bottom";
            // 这样设置是把绘制的中心设置为文字的中心
            var tm=context.measureText(text);
            var twidth=tm.width;//貌似只能获取字的字宽 高度会不会是设置的像素
            context.fillStyle="#f00";
            context.save();
            context.beginPath();
            // 需要把中心移动到文字中心再旋转
            context.translate(-twidth/2,-radio+lineWidth+10+twidth/2);
            context.rotate(-i*(Math.PI/30));//每次旋转是不是只对下次产生影响
            context.fillText(it,-twidth/2,twidth/2);//没有办法获取文字的高度怎么办;假设宽高相等
            context.closePath();
            context.restore();

        }else{
            lineWidth=18;
        }
        context.fillStyle="#000000"
        context.moveTo(0,-radio+9);
        context.lineTo(0,-radio+lineWidth+9);
        context.lineWidth=1;
        context.stroke();//这个方法调用后才算是开始绘制;对于只绘制线 用stroke才有效
        context.rotate(Math.PI/30);
    }
    
}

// 绘制指针
function drawPointer(context){
 // 计算旋转弧度
    // 1.获取当前时间
    var date=new Date();
    var hours=date.getHours();//0-23

    var min=date.getMinutes();//0-59
    var sec=date.getSeconds();

    console.log("时"+hours+":"+min+":"+sec);

    var harc=(hours%12/12+min/60/24+sec/60/60/24)*Math.PI*2;
    var marc=(min/60+sec/60/60)*Math.PI*2;
    var sarc=(sec/60)*Math.PI*2;


    // 绘制指针矩形
    var hourLineW=10;//时针宽度
    var tileLength=30;//尾巴长度
    context.fillStyle="#a23b87";
    context.save();
    context.rotate(harc);
    context.fillRect(-hourLineW/2,30-radio*(3/5),hourLineW,-30+radio*(3/5)+tileLength);
    context.restore();

    // 绘制分针
    var minLineW=7;
    context.fillStyle="#4368bc";
    context.save();
    context.rotate(marc);
    context.fillRect(-minLineW/2,30-radio*(3.5/5),minLineW,-30+radio*(3.5/5)+tileLength);
    context.restore();



    // 绘制秒针
    var secLineW=5;
    context.fillStyle="#fa0000";
    context.save();
    context.rotate(sarc);
    context.fillRect(-secLineW/2,30-radio+10,secLineW,radio-40+tileLength);
    context.restore();
}

