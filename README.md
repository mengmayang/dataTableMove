# dataTableMove
JS 实现一个表格滚动，首行左右滚动，首列上下滚动，其他单元格均可

### 第一版

###### 20181029

### 使用方法

html:

	<div id="divId">	
		<div id="tableId">
		</div>
	</div>
	<div style="position:relative;clear:both;"></div>

js:
	dataTableMove("divId","tableId",width,height,top,left);
