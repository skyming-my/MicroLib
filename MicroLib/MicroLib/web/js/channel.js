//追加列表
function appendListTable(data){
    var html = '';
    html += '   <tr>';
    html += '      <td>';
    html += '        <input type="checkbox" class="hui-checkbox checkbox" name="checked" />';
    html += '        <div class="hui-content">';
    html += '          <img class="hui-file-type" src='+data.fileIcon+' />';
    html += '          <div class="hui-popup">';
    html += '            <input type="text" class="hui-rename" />';
    html += '            <button class="hui-btn btn-sure"><img src="img/success.png" /></button>';
    html += '            <button class="hui-btn btn-cancel"><img src="img/close.png" /></button>';
    html += '          </div>';
    html += '          <p class="hui-ellipsis check">';
    html += '            <span class="fileName" onclick=openDir('+data.id+')>'+data.fileName+'</span>';
    html += '          </p>';
    html += '          <div class="hui-table-operate">';
    html += '            <a href="###">下载</a>';
    html += '            <a href="###">发送</a>';
    html += '            <a href="###" class="more">更多</a>';
    html += '            <ul class="hui-moreBox">';
    html += '              <li class="btn-delete">删除</li>';
    html += '              <li class="btn-rename">重命名</li>';
    html += '            </ul>';
    html += '          </div>';
    html += '        </div>';
    html += '      </td>';
    html += '      <td class="check">'+data.ownerName+'</td>';
    html += '      <td class="check">'+data.fileSize+'</td>';
    html += '      <td class="check">'+data.createTime+'</td>';
    html += '    </tr>';

    $("#tbody").append(html);
}
//追加视图显示
function appendViewTable(table){
    var html = '';
    html += '   <li class="listBox-item">';
    html += '          <div class="listWrap">';
    html += '              <img src='+table.fileIcon+' class="filetype" />';
    html += '              <input type="checkbox" class="list-checkbox" name="selected" />';
    html += '          </div>';
    html += '          <div class="listTitle">'+table.fileName+'</div>';
    html += '          <div class="popup">';
    html += '            <input type="text" class="rename" />';
    html += '            <button class="hui-btn btn-sure"><img src="img/success.png" /></button>';
    html += '            <button class="hui-btn btn-cancel"><img src="img/close.png" /></button>';
    html += '          </div>';
    html += '        </li>';

    $("#vbody").append(html);
}

//追加列表头
function appendTableHeader(obj){
    var html = '';
    html += '<span>';
    html += '    <span> ＞ </span>';
    html += '    <a class="hui-step" href="###" id='+obj.id+' onclick=gotoFile(this,'+obj.id+')>'+obj.fileName+'</a>';
    html += '</span>';

    $('#tablebar').append(html);
} 

//清空表格内容
function clearListTable(){
    $("#tbody").html('');
}

//显示列表
function showListTable(data){
    $.each(data,function(index,value){
        appendListTable(value);
    })
}
//通过id值获取信息
function getInfoById(data,id,callback){
    for(var i=0; i<data.length; i++){
        var value = data[i];
        if(value.isDir){
            if(value.id == id){
                callback(value);
                return false;
            }
            getInfoById(value.children,id,callback);
        }
    }
}
function getInfoByName(data,fileName){
    for(var i=0; i<data.length; i++){
        var value = data[i]
        if(value.fileName == fileName){
            return i
        }
    }
}
//打开文件夹
function openDir(id,addHeader=true){
    getInfoById(listData,id,function(obj){
        if(obj.isDir){
            clearListTable();
            if(addHeader){
                appendTableHeader(obj);
            }
            currListData = obj.children;
            tablesort.sort(currListData,"fileName",curSort)
            showListTable(obj.children);
        }
    });

    // oauth2.getFileById(id,{
    //     success:function(data){
    //       fileListData = data
    //       clearListTable();
    //       showListTable(data.children);  
    //     },error:function(xhr,type,errorThrown){
    //       console.log(xhr);
    //     }
    // })
}
//点击表头跳转到相应的文件夹
function gotoFile(obj,id){
    openDir(id,false)
    var data = $(obj).parent().nextAll(); 
    for(var i=0; i<data.length; i++){
        data[i].remove();
    }
}

function renameFile(data,oldName,newName){
    $.each(data,function(index,value){
        if(value.fileName == oldName){
            value.fileName = newName
        }
    })
}