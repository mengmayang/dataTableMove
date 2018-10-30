# dataTableMove
JS 实现一个表格滚动，首行左右滚动，前n列上下滚动，其他单元格均可

### 第二版

JS 实现一个表格滚动，首行左右滚动，前n列上下滚动，其他单元格均可

###### 20181030

### 使用方法

只需引入dataTableMove_v2.js文件，不需要css文件，调用方法：

	dataTableMove(divId,TableId,width,height,top,left,colFixedNum)

	*colFixedNum:前colFixedNum列固定

html:dataTableMove.html

	<div id="divId">	
		<div id="tableId">
		</div>
	</div>
	<div style="position:relative;clear:both;"></div
	<script type="text/javascript" src="dataTableMove_v2.js"></script>
	<script type="text/javascript">
		colFixedNum=3;
        	dataTableMove("divTable","mytable",600,300,120,70,colFixedNum);
	</script>

js:dataTableMove_v2.js


### 第一版

JS 实现一个表格滚动，首行左右滚动，首列上下滚动，其他单元格均可

###### 20181029

### 使用方法

html:dataTableMove.html

	<div id="divId">	
		<div id="tableId">
		</div>
	</div>
	<div style="position:relative;clear:both;"></div>

js:dataTableMove.js

	dataTableMove("divId","tableId",width,height,top,left);

css:dataTableMove.css
