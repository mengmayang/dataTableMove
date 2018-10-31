function dataTableMove(divId,TableId,width,height,top,left,colFixedNum){
    var divTable=document.getElementById(divId);
    var mytable=document.getElementById(TableId);
    var myTdCells=divTable.getElementsByTagName("td");
    var thCells=divTable.getElementsByTagName("th");
    var colNum=thCells.length;
    var rowNum=myTdCells.length/colNum;
    var noise=1;//固定单元格和移动单元格之间的top误差
    //修改fixed属性
    for(var i=0;i<colNum;i++){
        thCells[i].style.cssText="background-color: white;position: fixed;z-index: 15;";
    }
    for(var i=0;i<rowNum;i++){
        for(var j=0;j<colNum;j++){
            myTdCells[i*colNum+j].style.cssText="background-color: white;vertical-align:middle;";
        }
        for(var p=0;p<colFixedNum;p++){
            var fixedHeight=myTdCells[i*colNum+p].offsetHeight;
            myTdCells[i*colNum+p].style.cssText+="position: fixed;";
        }
    }



    dataTableMoveInit(divTable,mytable,myTdCells,thCells,colNum,rowNum,width,height,top,left,colFixedNum,noise);
}

function dataTableMoveInit(divTable,mytable,myTdCells,thCells,colNum,rowNum,width,height,top,left,colFixedNum,noise){
//function dataTableMoveInit(width,height,top,left){
    //css 初始化
    mytable.setAttribute("style","width:100%;z-index: -1;position: relative;border-collapse:collapse;");
    divTableCss="overflow:auto;margin-left:"+left+"px;margin-top:"+top+"px;width:"+width+"px;height:"+height+"px;";
    divTable.setAttribute("style",divTableCss);

    //首行固定，位置确定,并给每个th添加div
    var currentCellLeft=thCells[0].offsetLeft;
    var currentCellWidth=thCells[0].offsetWidth;
    var currentCellHeight=thCells[0].offsetHeight;
    var currentCellTop=thCells[0].offsetTop;
    var currentCellContent=thCells[0].innerHTML;

    var width_max=Number(currentCellWidth);

    for(var i=0;i<rowNum;i++){
        if(myTdCells[i*colNum].offsetWidth>width_max){
            width_max=myTdCells[i*colNum].offsetWidth;
        }
    }
    var new_width=width_max+15;
    var new_height=Number(currentCellHeight)+5;
    var new_top=currentCellTop-new_height;
    thCells[0].innerHTML="<div style=\"width:"+new_width+"px;height:"+new_height+"px;text-align:left;\">"+currentCellContent+"</div>";
    currentCellLeft=currentCellLeft+thCells[0].offsetWidth;
    thCells[0].style.top=new_top+"px";
    thCells[0].style.left=divTable.offsetLeft+"px";

    for(var i=1;i<thCells.length;i++){
        currentCellWidth=thCells[i].offsetWidth;  
        currentCellContent=thCells[i].innerHTML; 

        var width_max=Number(currentCellWidth);


        for(var j=0;j<rowNum;j++){
            if(myTdCells[j*colNum+i].offsetWidth>width_max){
                width_max=myTdCells[j*colNum+i].offsetWidth;
            }
        }
        var new_width=width_max+15;

        currentCellHeight=thCells[i].offsetHeight;   
        new_height=Number(currentCellHeight)+5;
        currentCellTop=thCells[i].offsetTop;
        new_top=currentCellTop-new_height;
        currentCellLeft=thCells[i].offsetLeft;
        new_left=currentCellLeft-new_width;
        thCells[i].innerHTML="<div style=\"width:"+new_width+"px;height:"+new_height+"px;text-align:left\">"+currentCellContent+"</div>";

        thCells[i].style.left=currentCellLeft+"px";
        thCells[i].style.top=new_top+"px";
        currentCellLeft=thCells[i].offsetLeft+thCells[i].offsetWidth;
    }
    //给每一个单元格增加div
    var colNum=thCells.length;
    var rowNum=myTdCells.length/colNum;
    for(var i=0;i<rowNum;i++){
        for(var j=0;j<colNum;j++){
            var content=myTdCells[i*colNum+j].innerHTML;
            myTdCells[i*colNum+j].innerHTML="<div>"+content+"</div>";
        }
    }
    //单元格高度调整
    var floatErr=parseFloat(myTdCells[colNum+colFixedNum].getBoundingClientRect().top-myTdCells[colFixedNum].getBoundingClientRect().top-myTdCells[colFixedNum].offsetHeight);
    for(var i=0;i<rowNum;i++){
        var colFixedMaxHeight=myTdCells[i*colNum].offsetHeight;
        for(var j=0;j<colFixedNum;j++){
            if(colFixedMaxHeight<myTdCells[i*colNum+j].offsetHeight){
                colFixedMaxHeight=myTdCells[i*colNum+j].offsetHeight;
            }
        }
        var moveTd=myTdCells[i*colNum+colFixedNum];

        var CellHeightSet;

        if(colFixedMaxHeight<moveTd.offsetHeight){
            CellHeightSet=moveTd.offsetHeight;
            for(var j=0;j<colFixedNum;j++){
                myTdCells[i*colNum+j].children[0].style.height=CellHeightSet+"px";
                myTdCells[i*colNum+j].children[0].style.cssText +="line-height:"+CellHeightSet+"px";
                //误差调整
                var err=parseFloat(myTdCells[i*colNum+j].offsetHeight-moveTd.offsetHeight);
                myTdCells[i*colNum+j].children[0].style.height=parseFloat(CellHeightSet-err+floatErr)+"px";
            }
        }else{
            CellHeightSet=colFixedMaxHeight;
            for(var j=colFixedNum;j<colNum;j++){
                myTdCells[i*colNum+j].children[0].style.height=CellHeightSet+"px";
                myTdCells[i*colNum+j].children[0].style.cssText +="line-height:"+CellHeightSet+"px";
                //误差调整
                var err=parseFloat(myTdCells[i*colNum+j].offsetHeight-colFixedMaxHeight);
                myTdCells[i*colNum+j].children[0].style.height=parseFloat(CellHeightSet-err+floatErr)+"px";
            }
           
        }
    }
    //单元格宽度调整
    for(var i=0;i<colNum;i++){
        var width_max=thCells[i].offsetWidth;
        for(var j=0;j<rowNum;j++){
            if(myTdCells[j*colNum+i].offsetWidth>width_max){
                width_max=myTdCells[j*colNum+i].offsetWidth;
            }
        }
        if(thCells[i].offsetWidth<=myTdCells[0*colNum+i].offsetWidth){
            thCells[i].children[0].style.width=myTdCells[0*colNum+i].offsetWidth+"px";
            err=thCells[i].offsetWidth-myTdCells[0*colNum+i].offsetWidth;
            thCells[i].children[0].style.width=myTdCells[0*colNum+i].offsetWidth-err+"px";
            
        }else{
            for(var j=0;j<rowNum;j++){
                myTdCells[j*colNum+i].children[0].style.width=thCells[i].offsetWidth+"px";
                err=myTdCells[j*colNum+i].offsetWidth-thCells[i].offsetWidth;
                myTdCells[j*colNum+i].children[0].style.width=thCells[i].offsetWidth-err+"px";
            }
        }
    }
    //标题行th位置调整
    currentCellLeft=thCells[0].offsetLeft+thCells[0].offsetWidth;
    for(var i=1;i<colFixedNum;i++){
        thCells[i].style.left=currentCellLeft+"px";
        // thCells[i].children[0].style.width=myTdCells[i].offsetWidth+"px";
        currentCellLeft=thCells[i].offsetLeft+thCells[i].offsetWidth;
    }

    for(var i=colFixedNum;i<thCells.length;i++){
        thCells[i].style.left=currentCellLeft+"px";
        currentCellLeft=thCells[i].offsetLeft+thCells[i].offsetWidth;
    }
    //第一列位置固定
    for(var i=0;i<colFixedNum;i++){
        var myTdCelldiv;
        var currentCellTop=parseFloat(thCells[i].offsetTop+thCells[i].offsetHeight);
        var currentCellLeft=parseFloat(thCells[i].offsetLeft-thCells[i].offsetWidth);
        for(var j=0;j<rowNum;j++){
            myTdCelldiv=myTdCells[j*colNum+i].children[0];
            myTdCelldiv.style.width=thCells[i].children[0].offsetWidth+"px";
            var cssTop="top:"+currentCellTop+"px";
            // myTdCells[j*colNum+i].setAttribute("style",cssTop);
            myTdCells[j*colNum+i].top=cssTop;
            currentCellTop=parseFloat(currentCellTop+myTdCells[j*colNum+i].offsetHeight);
            myTdCells[j*colNum+i].style.left=thCells[i].offsetLeft+"px";
        }
    }

    //除第一列之后的cell位置
    mytable.style.left=myTdCells[colFixedNum-1].offsetLeft+myTdCells[colFixedNum-1].offsetWidth-mytable.offsetLeft+"px";
    // mytable.style.left=thCells[colFixedNum].offsetLeft-mytable.offsetLeft+"px";
    // mytable.style.left=thCells[1].offsetLeft-thCells[1].offsetWidth+"px";
    //误差调整
    // var err=parseFloat(myTdCells[colNum+colFixedNum].getBoundingClientRect().top-myTdCells[colNum].getBoundingClientRect().top);

    // console.log(parseFloat(myTdCells[2*colNum].getBoundingClientRect().top));
    // console.log(parseFloat(myTdCells[2*colNum+6].getBoundingClientRect().top));
    // mytable.style.top="8px";
    var floatErr=parseFloat(myTdCells[colNum+3].getBoundingClientRect().top-myTdCells[colNum].getBoundingClientRect().top);
    console.log(floatErr);
    console.log(myTdCells[colNum].children[0].innerHTML);
    console.log(myTdCells[colNum+3].children[0].innerHTML);

    for(var i=0;i<rowNum;i++){
        for(var j=0;j<colFixedNum;j++){
            myTdCells[i*colNum+j].style.top=parseFloat(myTdCells[i*colNum+j].offsetTop+noise)+"px";
        }
    }
    
    //超出边界的隐藏
    hiddenOverside(thCells,myTdCells,rowNum,colNum,colFixedNum);
    //添加事件监听
    var mytableScollTop=this.scrollTop;
    var mytableScollLeft=this.scrollLeft;
    divTable.addEventListener('scroll',function(){

        if(this.scrollTop != mytableScollTop){
            //垂直拉滚动条
            //第一列myCell的top随之改变
            scollChange=this.scrollTop-mytableScollTop;
            for(var i=0;i<rowNum;i++){
                for(var p=0;p<colFixedNum;p++){
                    myTdCells[i*colNum+p].style.top=myTdCells[i*colNum+colFixedNum].getBoundingClientRect().top+noise+"px";
                    if(myTdCells[i*colNum+p].offsetTop<thCells[0].offsetTop){
                        myTdCells[i*colNum+p].style.visibility="hidden";
                        for(var j=0;j<colNum;j++){
                            myTdCells[i*colNum+j].style.visibility="hidden";
                        }
                    }else if(myTdCells[i*colNum+p].offsetTop+myTdCells[i*colNum+p].offsetHeight>divTable.offsetTop+divTable.offsetHeight){
                        myTdCells[i*colNum].style.visibility="hidden";
                        for(var j=0;j<colNum;j++){
                            myTdCells[i*colNum+j].style.visibility="hidden";
                        }
                    }else if(myTdCells[i*colNum+p].offsetTop>=thCells[0].offsetTop){
                        myTdCells[i*colNum+p].style.visibility="visible";
                        for(var j=0;j<colNum;j++){
                            myTdCells[i*colNum+j].style.visibility="visible";
                        }
                    }else{
                        myTdCells[i*colNum+p].style.visibility="visible";
                        for(var j=0;j<colNum;j++){
                            myTdCells[i*colNum+j].style.visibility="visible";
                        }
                    }
                }
                
            }

           
            mytableScollTop=this.scrollTop;




        }
        if(this.scrollLeft != mytableScollLeft){
            //垂直拉滚动条
            //第一列myCell的top随之改变
            scollChange=this.scrollLeft-mytableScollLeft;
            for(var i=colFixedNum;i<colNum;i++){
                thCells[i].style.left=myTdCells[i].getBoundingClientRect().left+"px";
                if(thCells[i].offsetLeft+thCells[i].offsetWidth>divTable.offsetWidth+divTable.offsetLeft){
                    thCells[i].style.visibility="hidden";
                }else if(thCells[i].offsetLeft<thCells[colFixedNum-1].offsetLeft+thCells[colFixedNum-1].offsetWidth){
                    thCells[i].style.visibility="hidden";
                }else{
                    thCells[i].style.visibility="visible";
                }
                
            }

            mytableScollLeft=this.scrollLeft;
        }

    },false);
}


function hiddenOverside(thCells,myTdCells,rowNum,colNum,colFixedNum){
    
    for(var i=0;i<thCells.length;i++){
        if(thCells[i].offsetLeft+thCells[i].offsetWidth>divTable.offsetLeft+divTable.offsetWidth){
            thCells[i].style.visibility="hidden";
        }else{
            thCells[i].style.visibility="visible";
        }
    }
    // var rowNum=myTdCells.length/thCells.length;
    for(var i=0;i<rowNum;i++){
        for(var j=0;j<colFixedNum;j++){
            if(myTdCells[i*colNum+j].offsetTop+myTdCells[i*colNum+j].offsetHeight>divTable.offsetTop+divTable.offsetHeight){
                myTdCells[i*colNum+j].style.visibility="hidden";
            }else{
                myTdCells[i*colNum+j].style.visibility="visible";
            }
        }
    }
}

