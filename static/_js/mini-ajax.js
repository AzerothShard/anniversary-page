/*Constants*/
is_using_safari = ((navigator.userAgent.toLowerCase().indexOf("safari")!=-1)) ? true : false;
is_using_IE = ((navigator.userAgent.toLowerCase().indexOf("msie")!=-1)) ? true : false;
/*Conctionals*/
startRequest = (is_using_IE) ? 
	function(){			
		return new ActiveXObject("Microsoft.XMLHTTP");
	} :
	function(){		
		return new XMLHttpRequest(); 
	};

/*Shortcuts*/
readySet = function(pReq,pFun)
{
	pReq.onreadystatechange = function()
	{
		if(pReq.readyState==4)
			pFun();
	}
}

mEl = function(someType)
{
	return document.createElement(someType);
}

gId = function(someID)
{
	return document.getElementById(someID);
}

/*Functions*/
function loadData()
{
	xmlDataRequest = startRequest();
	readySet(xmlDataRequest,function(){traverseXML(xmlDataRequest.responseXML)});
	xmlDataRequest.open("GET",xmlDataRetrievalTarget,true);
	xmlDataRequest.send(null);
}

function traverseXML(thisXML)
{
	var nodeModifier = (is_using_IE)?1:0;
	var k = 0;
	shotList = new Array();
	reRoute = new Object();
	for(var i=0;i<thisXML.childNodes[0+nodeModifier].childNodes[1-nodeModifier].childNodes.length;i++)
	{
		if(thisXML.childNodes[0+nodeModifier].childNodes[1-nodeModifier].childNodes[i].nodeName=="img")
		{
			shotList[k] = targetDirectory+thisXML.childNodes[0+nodeModifier].childNodes[1-nodeModifier].childNodes[i].getAttribute("src").replace(".jpg","-l.jpg");
			reRoute[thisXML.childNodes[0+nodeModifier].childNodes[1-nodeModifier].childNodes[i].getAttribute("src")] = k;
			k++;
		}
	}
}

function screenshotReroute(thisShot)
{
	sV.setImageCollection(shotList,reRoute[thisShot]);
}