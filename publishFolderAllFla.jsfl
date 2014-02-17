var flaPath 	= "file:///E:/workspace/yitongjianghu/fla_zh/"

fl.trace("start");

publishFolder(flaPath);

fl.trace("finish");

//发布一个文件夹下的所有文件
function publishFolder(path)
{
	var file;
	var fileList;
	var doc;
	
	fileList	= FLfile.listFolder(path);
	for (var i = 0; i < fileList.length; i++)
	{
		file	= fileList[i];
		if(isFoler(file))
		{
			publishFolder(path + file + "/");
			
		}
		else
		{
			if(file.split(".")[1] == "fla")
			{
				doc = fl.openDocument(path + file);
				doc.publish();
				doc.close();
			}
		}
	}
}

//根据文件名判断是否为文件夹
function isFoler(fileName)
{
	var arr;
	arr = fileName.split(".");
	
	if(arr[1] == undefined)
	{
		return true;
	}
	else
	{
		return false;
	}
}

