function dataTableMove(divId,TableId,width,height,top,left){
    var divTable=document.getElementById(divId);
    var mytable=document.getElementById(TableId);
    var myTdCells=divTable.getElementsByTagName("td");
    var thCells=divTable.getElementsByTagName("th");
    var colNum=thCells.length;
    var rowNum=myTdCells.length/colNum;
    dataTableMoveInit(divTable,mytable,myTdCells,thCells,colNum,rowNum,500,300,120,70);
}

function dataTableMoveInit(divTable,mytable,myTdCells,thCells,colNum,rowNum,width,height,top,left){
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
    var new_width=Number(currentCellWidth)+15;
    var new_height=Number(currentCellHeight)+5;
    var new_top=currentCellTop-new_height;
    thCells[0].innerHTML="<div style=\"width:"+new_width+"px;text-align:left\">"+currentCellContent+"</div>";
    currentCellLeft=currentCellLeft+thCells[0].offsetWidth;
    thCells[0].style.top=new_top+"px";
    thCells[0].style.left=divTable.offsetLeft+"px";

    for(var i=1;i<thCells.length;i++){
        currentCellWidth=thCells[i].offsetWidth;  
        currentCellContent=thCells[i].innerHTML; 
        new_width=Number(currentCellWidth)+15;
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
    for(var i=0;i<rowNum;i++){
        var firstTd=myTdCells[i*colNum];
        var secondTd=myTdCells[i*colNum+1];
        var CellHeightSet;
        if(firstTd.offsetHeight<secondTd.offsetHeight){
            CellHeightSet=secondTd.offsetHeight;
            firstTd.children[0].style.height=CellHeightSet+"px";
            firstTd.children[0].style.cssText +="line-height:"+CellHeightSet+"px";

            //误差调整
            var err=firstTd.offsetHeight-secondTd.offsetHeight;
            firstTd.children[0].style.height=CellHeightSet-err+"px";

        }else{
            CellHeightSet=firstTd.offsetHeight;
            for(var j=1;j<colNum;j++){
                myTdCells[i*colNum+j].children[0];
            }
            myTdCells[i*colNum].children[0].style.height=CellHeightSet+"px";
            myTdCells[i*colNum].children[0].style.cssText +="line-height:"+CellHeightSet+"px";
        }
    }
    //单元格宽度调整
    for(var i=0;i<colNum;i++){
        if(thCells[i].offsetWidth<myTdCells[0*colNum+i].offsetWidth){
            thCells[i].children[0].style.width=myTdCells[0*colNum+i].offsetWidth+"px";
        }else{
            for(var j=0;j<rowNum;j++){
                myTdCells[j*colNum+i].children[0].style.width=thCells[i].offsetWidth+"px";
            }
        }
    }
    //标题行th位置调整
    currentCellLeft=thCells[0].offsetLeft+thCells[0].offsetWidth;
    for(var i=1;i<thCells.length;i++){
        thCells[i].style.left=currentCellLeft+"px";
        currentCellLeft=thCells[i].offsetLeft+thCells[i].offsetWidth;
    }
    //第一列位置固定
    var myTdCelldiv;
    var currentCellTop=thCells[0].offsetTop+thCells[0].offsetHeight+5;
    var currentCellLeft=thCells[0].offsetLeft-thCells[0].offsetWidth;
    for(var i=0;i<rowNum;i++){
        myTdCelldiv=myTdCells[i*colNum].children[0];
        myTdCelldiv.style.width=thCells[0].offsetWidth+"px";
        var cssTop="top:"+currentCellTop+"px";
        myTdCells[i*colNum].setAttribute("style",cssTop);
        currentCellTop=currentCellTop+myTdCells[i*colNum].offsetHeight;
        myTdCells[i*colNum].style.left=thCells[0].offsetLeft+"px";
    }
    //除第一列之后的cell位置
    mytable.style.left=thCells[1].offsetLeft-mytable.offsetLeft+"px";
    // mytable.style.left=thCells[1].offsetLeft-thCells[1].offsetWidth+"px";
    mytable.style.top=myTdCells[0].offsetTop-mytable.offsetTop+"px";
    //超出边界的隐藏
    hiddenOverside(thCells,myTdCells,rowNum,colNum);
    //添加事件监听
    var mytableScollTop=this.scrollTop;
    var mytableScollLeft=this.scrollLeft;
    divTable.addEventListener('scroll',function(){

        if(this.scrollTop != mytableScollTop){
            //垂直拉滚动条
            //第一列myCell的top随之改变
            scollChange=this.scrollTop-mytableScollTop;
            for(var i=0;i<rowNum;i++){
                myTdCells[i*colNum].style.top=myTdCells[i*colNum+1].getBoundingClientRect().top+"px";
                if(myTdCells[i*colNum].offsetTop<thCells[0].offsetTop){
                    myTdCells[i*colNum].style.visibility="hidden";
                    for(var j=0;j<colNum;j++){
                        myTdCells[i*colNum+j].style.visibility="hidden";
                    }
                }else if(myTdCells[i*colNum].offsetTop+myTdCells[i*colNum].offsetHeight>divTable.offsetTop+divTable.offsetHeight){
                    myTdCells[i*colNum].style.visibility="hidden";
                    for(var j=0;j<colNum;j++){
                        myTdCells[i*colNum+j].style.visibility="hidden";
                    }
                }else if(myTdCells[i*colNum].offsetTop>=thCells[0].offsetTop){
                    myTdCells[i*colNum].style.visibility="visible";
                    for(var j=0;j<colNum;j++){
                        myTdCells[i*colNum+j].style.visibility="visible";
                    }
                }else{
                    myTdCells[i*colNum].style.visibility="visible";
                    for(var j=0;j<colNum;j++){
                        myTdCells[i*colNum+j].style.visibility="visible";
                    }
                }
            }

           
            mytableScollTop=this.scrollTop;




        }
        if(this.scrollLeft != mytableScollLeft){
            //垂直拉滚动条
            //第一列myCell的top随之改变
            scollChange=this.scrollLeft-mytableScollLeft;
            for(var i=1;i<colNum;i++){
                thCells[i].style.left=myTdCells[i].getBoundingClientRect().left+"px";
                if(thCells[i].offsetLeft+thCells[i].offsetWidth>divTable.offsetWidth+divTable.offsetLeft){
                    thCells[i].style.visibility="hidden";
                }else if(thCells[i].offsetLeft<thCells[0].offsetLeft+thCells[0].offsetWidth){
                    thCells[i].style.visibility="hidden";
                }else{
                    thCells[i].style.visibility="visible";
                }
                
            }

            mytableScollLeft=this.scrollLeft;
        }

    },false);
}


function hiddenOverside(thCells,myTdCells,rowNum,colNum){
    
    for(var i=0;i<thCells.length;i++){
        if(thCells[i].offsetLeft+thCells[i].offsetWidth>divTable.offsetLeft+divTable.offsetWidth){
            thCells[i].style.visibility="hidden";
        }else{
            thCells[i].style.visibility="visible";
        }
    }
    // var rowNum=myTdCells.length/thCells.length;
    for(var i=0;i<rowNum;i++){
        if(myTdCells[i*colNum].offsetTop+myTdCells[i*colNum].offsetHeight>divTable.offsetTop+divTable.offsetHeight){
            myTdCells[i*colNum].style.visibility="hidden";
        }else{
            myTdCells[i*colNum].style.visibility="visible";
        }
    }
}

