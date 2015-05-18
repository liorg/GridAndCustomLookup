function getInitActionQueue() {
    if (window.top.initActionQueue) return window.top.initActionQueue;
    return window.initActionQueue
} function isActionQueueActive() {
    return getInitActionQueue() != null
}
function executeActionQueue() {
    if (window.initActionQueue && window.initActionQueue.length > 0) {
        var action = window.initActionQueue.shift(), actionParams = window.initActionQueueParams[action];
        if (actionParams && actionParams.doNotUseSetTimeout) { executeAction(action); executeActionQueue() }
        else window.setTimeout(function () { executeAction(action); executeActionQueue() }, 0)
    }
    else {
        window.initActionQueue = null;
        window.initActionQueueParams = null;
        window.InitActionQueueCompletedTime = (new Date).getTime()
    }
}
var _actionQueuePerfMarkers = [];
function executeAction(action) {
    var actionName = getFuncName(action);
    if (actionName == "") actionName = "anonymous";
    var st = (new Date).getTime(); try {
        action()
    } catch (e) {
        if (e.number != -2146823277) throw e
    } var et = (new Date).getTime();
    _actionQueuePerfMarkers.push({ name: actionName, startTime: st, endTime: et })
} var numberOfChildRetries = 0;
function applyActionQueue(actionQueue) {
    var actionQueueWnd = window.top, childWindow = actionQueueWnd != window, needsToStartActionQueue = false;
    if (!actionQueueWnd.initActionQueue) actionQueueWnd = window;
    if (!actionQueueWnd.initActionQueue) { actionQueueWnd.initActionQueue = []; needsToStartActionQueue = true }
    var insertAtIdx = -1; if (childWindow) for (var i = 0; i < actionQueueWnd.initActionQueue.length; i++)
        if (actionQueueWnd.initActionQueue[i] == actionQueueWnd.WaitForContents) { insertAtIdx = i; break }
if (insertAtIdx >= 0) insertAtIdx++; else insertAtIdx = actionQueueWnd.initActionQueue.length;
for (var i = 0; i < actionQueue.length; i++) {
    actionQueueWnd.initActionQueue.splice(insertAtIdx, 0, actionQueue[i]); insertAtIdx++
}
if (childWindow) window.actionQueueInitializationComplete = true;
needsToStartActionQueue && actionQueueWnd.executeActionQueue()
} function executeFunctionDeferred(func, isHighPriority, fallbackToApplicationAddLoad) {
    var actionQueue = getInitActionQueue();
    if (actionQueue)
        if (isHighPriority) Array.insert(actionQueue, 0, func);
        else actionQueue.push(func);
else
    if (fallbackToApplicationAddLoad && window.Sys && window.Sys.Application)
        window.Sys.Application.add_load(func);
    else window.setTimeout(func, 0)
} function getFuncName(func) {
    var funcStr = func.toString(); funcStr = funcStr.substring(0, funcStr.indexOf("("));
    return funcStr.replace(" ", "").replace("function", "").replace("(", "").replace(")", "")
}
var _isIE = navigator.appName == "Microsoft Internet Explorer";
function loadScriptAdv(sScriptSrc, sId, preloaderOutlookCookies) {
    if (preloaderOutlookCookies) {
        var oXmlHttpRequest = new XMLHttpRequest;
        oXmlHttpRequest.open("GET", sUrl, false);
        oXmlHttpRequest.send()
    } 
    var oScript = document.createElement("script");
    oScript.id = sId;
    oScript.type = "text/javascript"; 
    oScript.src = sScriptSrc;
    oScript.async = true;
     if (!_isIE) {
        oScript.onload = setAttributeForLoad;
        oScript.setAttribute("dynamic", "true")
    }
    function setAttributeForLoad() {
        var state = oScript.readyState; 
        (!state || /loaded|complete/.test(state)) && oScript.setAttribute("loaded", "true")
    }
    document.body.appendChild(oScript)
}
function waitForJScriptsToLoad() {
    for (var arrScripts = document.getElementsByTagName("script"), i = 0; i < arrScripts.length; i++) {
        var script = arrScripts[i];
        if (_isIE) {
            if (!/loaded|complete/.test(script.readyState)) {
                getInitActionQueue().unshift(arguments.callee);
                return
            }
        } else if (script.getAttribute("dynamic") == "true")
            if (script.getAttribute("loaded") != "true" && !/loaded|complete/.test(script.readyState)) {
                getInitActionQueue().unshift(arguments.callee); return
            } else script.onload = null
        }
    }
    function waitForContentToStartLoading() {
        var contentIframeElement = document.getElementById("contentIFrame"); (!contentIframeElement || contentIframeElement.contentWindow.document.readyState != "complete" && contentIframeElement.contentWindow.document.readyState != "loaded" || !contentIframeElement.contentWindow.location.pathname.endsWith("edit.aspx") || !contentIframeElement.contentWindow.actionQueueInitializationComplete) && getInitActionQueue().unshift(arguments.callee)
    }
    function registerEvents(element, eventName, handler) {
        if (element.addEventListener)
            element.addEventListener(eventName, handler, false);
        else element.attachEvent && element.attachEvent("on" + eventName, handler)
    } var _preloadStartTime = (new Date).getTime();
    function startLoadContent() {
        loadCachedPage(document.getElementById("contentIFrame").getAttribute("contentSrc"));
        window.StartLoadContentPanel = (new Date).getTime()
    } var _preloadTimeout = 1500;
    function loadCachedPage(contentUrl) {
        try {
            var currentContentIframeSrc = document.getElementById("contentIFrame").getAttribute("src");
            if (currentContentIframeSrc !== "/_static/loading.htm")
                return;
            var wndToCheckForPreload = window.opener ? window.opener : window.top;
            if (wndToCheckForPreload) {
                wndToCheckForPreload = wndToCheckForPreload.masterWindow();
                var cUrl = wndToCheckForPreload.isPreloadComplete(contentUrl);
                if (!cUrl) {
                    var timeNow = (new Date).getTime();
                    if (timeNow - _preloadStartTime < _preloadTimeout) {
                        window.setTimeout(function () { loadCachedPage(contentUrl) }, 50); return
                    }
                    window.PreLoadContentPageWaitTimeout = (new Date).getTime()
                } else contentUrl = cUrl
            }
        } catch (e) { }
        window.InnerIFrameSrcChangeTimestamp = (new Date).getTime();
        document.getElementById("contentIFrame").setAttribute("src", contentUrl);
        document.getElementById("crmContentPanel").setAttribute("currentContentId", "contentIFrame")
    }