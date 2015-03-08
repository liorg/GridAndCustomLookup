﻿//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjax.js
Function.__typeName = "Function";
Function.__class = true;
Function.createCallback = function (b, a) {
    return function () {
        var e = arguments.length;
        if (e > 0) {
            var d = [];
            for (var c = 0; c < e; c++) d[c] = arguments[c];
            d[e] = a;
            return b.apply(this, d)
        }
        return b.call(this, a)
    }
};
Function.createDelegate = function (a, b) {
    return function () {
        return b.apply(a, arguments)
    }
};
Function.emptyFunction = Function.emptyMethod = function () {};
Function.validateParameters = function (c, b, a) {
    return Function._validateParams(c, b, a)
};
Function._validateParams = function (g, e, c) {
    var a, d = e.length;
    c = c || typeof c === "undefined";
    a = Function._validateParameterCount(g, e, c);
    if (a) {
        a.popStackFrame();
        return a
    }
    for (var b = 0, i = g.length; b < i; b++) {
        var f = e[Math.min(b, d - 1)],
            h = f.name;
        if (f.parameterArray) h += "[" + (b - d + 1) + "]";
        else if (!c && b >= d) break;
        a = Function._validateParameter(g[b], f, h);
        if (a) {
            a.popStackFrame();
            return a
        }
    }
    return null
};
Function._validateParameterCount = function (j, d, i) {
    var a, c, b = d.length,
        e = j.length;
    if (e < b) {
        var f = b;
        for (a = 0; a < b; a++) {
            var g = d[a];
            if (g.optional || g.parameterArray) f--
        }
        if (e < f) c = true
    } else if (i && e > b) {
        c = true;
        for (a = 0; a < b; a++) if (d[a].parameterArray) {
            c = false;
            break
        }
    }
    if (c) {
        var h = Error.parameterCount();
        h.popStackFrame();
        return h
    }
    return null
};
Function._validateParameter = function (c, a, h) {
    var b, g = a.type,
        l = !! a.integer,
        k = !! a.domElement,
        m = !! a.mayBeNull;
    b = Function._validateParameterType(c, g, l, k, m, h);
    if (b) {
        b.popStackFrame();
        return b
    }
    var e = a.elementType,
        f = !! a.elementMayBeNull;
    if (g === Array && typeof c !== "undefined" && c !== null && (e || !f)) {
        var j = !! a.elementInteger,
            i = !! a.elementDomElement;
        for (var d = 0; d < c.length; d++) {
            var n = c[d];
            b = Function._validateParameterType(n, e, j, i, f, h + "[" + d + "]");
            if (b) {
                b.popStackFrame();
                return b
            }
        }
    }
    return null
};
Function._validateParameterType = function (b, c, k, j, h, d) {
    var a, g;
    if (typeof b === "undefined") if (h) return null;
    else {
        a = Error.argumentUndefined(d);
        a.popStackFrame();
        return a
    }
    if (b === null) if (h) return null;
    else {
        a = Error.argumentNull(d);
        a.popStackFrame();
        return a
    }
    if (c && c.__enum) {
        if (typeof b !== "number") {
            a = Error.argumentType(d, Object.getType(b), c);
            a.popStackFrame();
            return a
        }
        if (b % 1 === 0) {
            var e = c.prototype;
            if (!c.__flags || b === 0) {
                for (g in e) if (e[g] === b) return null
            } else {
                var i = b;
                for (g in e) {
                    var f = e[g];
                    if (f === 0) continue;
                    if ((f & b) === f) i -= f;
                    if (i === 0) return null
                }
            }
        }
        a = Error.argumentOutOfRange(d, b, String.format(Sys.Res.enumInvalidValue, b, c.getName()));
        a.popStackFrame();
        return a
    }
    if (j && (!Sys._isDomElement(b) || b.nodeType === 3)) {
        a = Error.argument(d, Sys.Res.argumentDomElement);
        a.popStackFrame();
        return a
    }
    if (c && !Sys._isInstanceOfType(c, b)) {
        a = Error.argumentType(d, Object.getType(b), c);
        a.popStackFrame();
        return a
    }
    if (c === Number && k) if (b % 1 !== 0) {
        a = Error.argumentOutOfRange(d, b, Sys.Res.argumentInteger);
        a.popStackFrame();
        return a
    }
    return null
};
Error.__typeName = "Error";
Error.__class = true;
Error.create = function (d, b) {
    var a = new Error(d);
    a.message = d;
    if (b) for (var c in b) a[c] = b[c];
    a.popStackFrame();
    return a
};
Error.argument = function (a, c) {
    var b = "Sys.ArgumentException: " + (c ? c : Sys.Res.argument);
    if (a) b += "\n" + String.format(Sys.Res.paramName, a);
    var d = Error.create(b, {
        name: "Sys.ArgumentException",
        paramName: a
    });
    d.popStackFrame();
    return d
};
Error.argumentNull = function (a, c) {
    var b = "Sys.ArgumentNullException: " + (c ? c : Sys.Res.argumentNull);
    if (a) b += "\n" + String.format(Sys.Res.paramName, a);
    var d = Error.create(b, {
        name: "Sys.ArgumentNullException",
        paramName: a
    });
    d.popStackFrame();
    return d
};
Error.argumentOutOfRange = function (c, a, d) {
    var b = "Sys.ArgumentOutOfRangeException: " + (d ? d : Sys.Res.argumentOutOfRange);
    if (c) b += "\n" + String.format(Sys.Res.paramName, c);
    if (typeof a !== "undefined" && a !== null) b += "\n" + String.format(Sys.Res.actualValue, a);
    var e = Error.create(b, {
        name: "Sys.ArgumentOutOfRangeException",
        paramName: c,
        actualValue: a
    });
    e.popStackFrame();
    return e
};
Error.argumentType = function (d, c, b, e) {
    var a = "Sys.ArgumentTypeException: ";
    if (e) a += e;
    else if (c && b) a += String.format(Sys.Res.argumentTypeWithTypes, c.getName(), b.getName());
    else a += Sys.Res.argumentType;
    if (d) a += "\n" + String.format(Sys.Res.paramName, d);
    var f = Error.create(a, {
        name: "Sys.ArgumentTypeException",
        paramName: d,
        actualType: c,
        expectedType: b
    });
    f.popStackFrame();
    return f
};
Error.argumentUndefined = function (a, c) {
    var b = "Sys.ArgumentUndefinedException: " + (c ? c : Sys.Res.argumentUndefined);
    if (a) b += "\n" + String.format(Sys.Res.paramName, a);
    var d = Error.create(b, {
        name: "Sys.ArgumentUndefinedException",
        paramName: a
    });
    d.popStackFrame();
    return d
};
Error.format = function (a) {
    var c = "Sys.FormatException: " + (a ? a : Sys.Res.format),
        b = Error.create(c, {
            name: "Sys.FormatException"
        });
    b.popStackFrame();
    return b
};
Error.invalidOperation = function (a) {
    var c = "Sys.InvalidOperationException: " + (a ? a : Sys.Res.invalidOperation),
        b = Error.create(c, {
            name: "Sys.InvalidOperationException"
        });
    b.popStackFrame();
    return b
};
Error.notImplemented = function (a) {
    var c = "Sys.NotImplementedException: " + (a ? a : Sys.Res.notImplemented),
        b = Error.create(c, {
            name: "Sys.NotImplementedException"
        });
    b.popStackFrame();
    return b
};
Error.parameterCount = function (a) {
    var c = "Sys.ParameterCountException: " + (a ? a : Sys.Res.parameterCount),
        b = Error.create(c, {
            name: "Sys.ParameterCountException"
        });
    b.popStackFrame();
    return b
};
Error.prototype.popStackFrame = function () {
    if (typeof this.stack === "undefined" || this.stack === null || typeof this.fileName === "undefined" || this.fileName === null || typeof this.lineNumber === "undefined" || this.lineNumber === null) return;
    var a = this.stack.split("\n"),
        c = a[0],
        e = this.fileName + ":" + this.lineNumber;
    while (typeof c !== "undefined" && c !== null && c.indexOf(e) === -1) {
        a.shift();
        c = a[0]
    }
    var d = a[1];
    if (typeof d === "undefined" || d === null) return;
    var b = d.match(/@(.*):(\d+)$/);
    if (typeof b === "undefined" || b === null) return;
    this.fileName = b[1];
    this.lineNumber = parseInt(b[2]);
    a.shift();
    this.stack = a.join("\n")
};
Object.__typeName = "Object";
Object.__class = true;
Object.getType = function (b) {
    var a = b.constructor;
    if (!a || typeof a !== "function" || !a.__typeName || a.__typeName === "Object") return Object;
    return a
};
Object.getTypeName = function (a) {
    return Object.getType(a).getName()
};
String.__typeName = "String";
String.__class = true;
String.prototype.endsWith = function (a) {
    return this.substr(this.length - a.length) === a
};
String.prototype.startsWith = function (a) {
    return this.substr(0, a.length) === a
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
};
String.prototype.trimEnd = function () {
    return this.replace(/\s+$/, "")
};
String.prototype.trimStart = function () {
    return this.replace(/^\s+/, "")
};
String.format = function () {
    return String._toFormattedString(false, arguments)
};
String._toFormattedString = function (l, j) {
    var c = "",
        e = j[0];
    for (var a = 0; true;) {
        var f = e.indexOf("{", a),
            d = e.indexOf("}", a);
        if (f < 0 && d < 0) {
            c += e.slice(a);
            break
        }
        if (d > 0 && (d < f || f < 0)) {
            c += e.slice(a, d + 1);
            a = d + 2;
            continue
        }
        c += e.slice(a, f);
        a = f + 1;
        if (e.charAt(a) === "{") {
            c += "{";
            a++;
            continue
        }
        if (d < 0) break;
        var h = e.substring(a, d),
            g = h.indexOf(":"),
            k = parseInt(g < 0 ? h : h.substring(0, g), 10) + 1,
            i = g < 0 ? "" : h.substring(g + 1),
            b = j[k];
        if (typeof b === "undefined" || b === null) b = "";
        if (b.toFormattedString) c += b.toFormattedString(i);
        else if (l && b.localeFormat) c += b.localeFormat(i);
        else if (b.format) c += b.format(i);
        else c += b.toString();
        a = d + 1
    }
    return c
};
Boolean.__typeName = "Boolean";
Boolean.__class = true;
Boolean.parse = function (b) {
    var a = b.trim().toLowerCase();
    if (a === "false") return false;
    if (a === "true") return true
};
Date.__typeName = "Date";
Date.__class = true;
Number.__typeName = "Number";
Number.__class = true;
RegExp.__typeName = "RegExp";
RegExp.__class = true;
if (!window) this.window = this;
window.Type = Function;
Type.prototype.callBaseMethod = function (a, d, b) {
    var c = Sys._getBaseMethod(this, a, d);
    if (!b) return c.apply(a);
    else return c.apply(a, b)
};
Type.prototype.getBaseMethod = function (a, b) {
    return Sys._getBaseMethod(this, a, b)
};
Type.prototype.getBaseType = function () {
    return typeof this.__baseType === "undefined" ? null : this.__baseType
};
Type.prototype.getInterfaces = function () {
    var a = [],
        b = this;
    while (b) {
        var c = b.__interfaces;
        if (c) for (var d = 0, f = c.length; d < f; d++) {
            var e = c[d];
            if (!Array.contains(a, e)) a[a.length] = e
        }
        b = b.__baseType
    }
    return a
};
Type.prototype.getName = function () {
    return typeof this.__typeName === "undefined" ? "" : this.__typeName
};
Type.prototype.implementsInterface = function (d) {
    this.resolveInheritance();
    var c = d.getName(),
        a = this.__interfaceCache;
    if (a) {
        var e = a[c];
        if (typeof e !== "undefined") return e
    } else a = this.__interfaceCache = {};
    var b = this;
    while (b) {
        var f = b.__interfaces;
        if (f) if (Array.indexOf(f, d) !== -1) return a[c] = true;
        b = b.__baseType
    }
    return a[c] = false
};
Type.prototype.inheritsFrom = function (b) {
    this.resolveInheritance();
    var a = this.__baseType;
    while (a) {
        if (a === b) return true;
        a = a.__baseType
    }
    return false
};
Type.prototype.initializeBase = function (a, b) {
    this.resolveInheritance();
    if (this.__baseType) if (!b) this.__baseType.apply(a);
    else this.__baseType.apply(a, b);
    return a
};
Type.prototype.isImplementedBy = function (a) {
    if (typeof a === "undefined" || a === null) return false;
    var b = Object.getType(a);
    return !!(b.implementsInterface && b.implementsInterface(this))
};
Type.prototype.isInstanceOfType = function (a) {
    return Sys._isInstanceOfType(this, a)
};
Type.prototype.registerClass = function (c, b, d) {
    this.prototype.constructor = this;
    this.__typeName = c;
    this.__class = true;
    if (b) {
        this.__baseType = b;
        this.__basePrototypePending = true
    }
    Sys.__upperCaseTypes[c.toUpperCase()] = this;
    if (d) {
        this.__interfaces = [];
        for (var a = 2, f = arguments.length; a < f; a++) {
            var e = arguments[a];
            this.__interfaces.push(e)
        }
    }
    return this
};
Type.prototype.registerInterface = function (a) {
    Sys.__upperCaseTypes[a.toUpperCase()] = this;
    this.prototype.constructor = this;
    this.__typeName = a;
    this.__interface = true;
    return this
};
Type.prototype.resolveInheritance = function () {
    if (this.__basePrototypePending) {
        var b = this.__baseType;
        b.resolveInheritance();
        for (var a in b.prototype) {
            var c = b.prototype[a];
            if (!this.prototype[a]) this.prototype[a] = c
        }
        delete this.__basePrototypePending
    }
};
Type.getRootNamespaces = function () {
    return Array.clone(Sys.__rootNamespaces)
};
Type.isClass = function (a) {
    if (typeof a === "undefined" || a === null) return false;
    return !!a.__class
};
Type.isInterface = function (a) {
    if (typeof a === "undefined" || a === null) return false;
    return !!a.__interface
};
Type.isNamespace = function (a) {
    if (typeof a === "undefined" || a === null) return false;
    return !!a.__namespace
};
Type.parse = function (typeName, ns) {
    var fn;
    if (ns) {
        fn = Sys.__upperCaseTypes[ns.getName().toUpperCase() + "." + typeName.toUpperCase()];
        return fn || null
    }
    if (!typeName) return null;
    if (!Type.__htClasses) Type.__htClasses = {};
    fn = Type.__htClasses[typeName];
    if (!fn) {
        fn = eval(typeName);
        Type.__htClasses[typeName] = fn
    }
    return fn
};
Type.registerNamespace = function (e) {
    var d = window,
        c = e.split(".");
    for (var b = 0; b < c.length; b++) {
        var f = c[b],
            a = d[f];
        if (!a) a = d[f] = {};
        if (!a.__namespace) {
            if (b === 0 && e !== "Sys") Sys.__rootNamespaces[Sys.__rootNamespaces.length] = a;
            a.__namespace = true;
            a.__typeName = c.slice(0, b + 1).join(".");
            a.getName = function () {
                return this.__typeName
            }
        }
        d = a
    }
};
Type._checkDependency = function (c, a) {
    var d = Type._registerScript._scripts,
        b = d ? !! d[c] : false;
    if (typeof a !== "undefined" && !b) throw Error.invalidOperation(String.format(Sys.Res.requiredScriptReferenceNotIncluded, a, c));
    return b
};
Type._registerScript = function (a, c) {
    var b = Type._registerScript._scripts;
    if (!b) Type._registerScript._scripts = b = {};
    if (b[a]) throw Error.invalidOperation(String.format(Sys.Res.scriptAlreadyLoaded, a));
    b[a] = true;
    if (c) for (var d = 0, f = c.length; d < f; d++) {
        var e = c[d];
        if (!Type._checkDependency(e)) throw Error.invalidOperation(String.format(Sys.Res.scriptDependencyNotFound, a, e))
    }
};
Type.registerNamespace("Sys");
Sys.__upperCaseTypes = {};
Sys.__rootNamespaces = [Sys];
Sys._isInstanceOfType = function (c, b) {
    if (typeof b === "undefined" || b === null) return false;
    if (b instanceof c) return true;
    var a = Object.getType(b);
    return !!(a === c) || a.inheritsFrom && a.inheritsFrom(c) || a.implementsInterface && a.implementsInterface(c)
};
Sys._getBaseMethod = function (d, e, c) {
    var b = d.getBaseType();
    if (b) {
        var a = b.prototype[c];
        return a instanceof Function ? a : null
    }
    return null
};
Sys._isDomElement = function (a) {
    var c = false;
    if (typeof a.nodeType !== "number") {
        var b = a.ownerDocument || a.document || a;
        if (b != a) {
            var d = b.defaultView || b.parentWindow;
            c = d != a
        } else c = typeof b.body === "undefined"
    }
    return !c
};
Array.__typeName = "Array";
Array.__class = true;
Array.add = Array.enqueue = function (a, b) {
    a[a.length] = b
};
Array.addRange = function (a, b) {
    a.push.apply(a, b)
};
Array.clear = function (a) {
    a.length = 0
};
Array.clone = function (a) {
    if (a.length === 1) return [a[0]];
    else return Array.apply(null, a)
};
Array.contains = function (a, b) {
    return Sys._indexOf(a, b) >= 0
};
Array.dequeue = function (a) {
    return a.shift()
};
Array.forEach = function (b, e, d) {
    for (var a = 0, f = b.length; a < f; a++) {
        var c = b[a];
        if (typeof c !== "undefined") e.call(d, c, a, b)
    }
};
Array.indexOf = function (a, c, b) {
    return Sys._indexOf(a, c, b)
};
Array.insert = function (a, b, c) {
    a.splice(b, 0, c)
};
Array.parse = function (value) {
    if (!value) return [];
    return eval(value)
};
Array.remove = function (b, c) {
    var a = Sys._indexOf(b, c);
    if (a >= 0) b.splice(a, 1);
    return a >= 0
};
Array.removeAt = function (a, b) {
    a.splice(b, 1)
};
Sys._indexOf = function (d, e, a) {
    if (typeof e === "undefined") return -1;
    var c = d.length;
    if (c !== 0) {
        a = a - 0;
        if (isNaN(a)) a = 0;
        else {
            if (isFinite(a)) a = a - a % 1;
            if (a < 0) a = Math.max(0, c + a)
        }
        for (var b = a; b < c; b++) if (typeof d[b] !== "undefined" && d[b] === e) return b
    }
    return -1
};
Type._registerScript._scripts = {
    "MicrosoftAjaxCore.js": true,
    "MicrosoftAjaxGlobalization.js": true,
    "MicrosoftAjaxSerialization.js": true,
    "MicrosoftAjaxComponentModel.js": true,
    "MicrosoftAjaxHistory.js": true,
    "MicrosoftAjaxNetwork.js": true,
    "MicrosoftAjaxWebServices.js": true
};
Sys.IDisposable = function () {};
Sys.IDisposable.prototype = {};
Sys.IDisposable.registerInterface("Sys.IDisposable");
Sys.StringBuilder = function (a) {
    this._parts = typeof a !== "undefined" && a !== null && a !== "" ? [a.toString()] : [];
    this._value = {};
    this._len = 0
};
Sys.StringBuilder.prototype = {
    append: function (a) {
        this._parts[this._parts.length] = a
    },
    appendLine: function (a) {
        this._parts[this._parts.length] = typeof a === "undefined" || a === null || a === "" ? "\r\n" : a + "\r\n"
    },
    clear: function () {
        this._parts = [];
        this._value = {};
        this._len = 0
    },
    isEmpty: function () {
        if (this._parts.length === 0) return true;
        return this.toString() === ""
    },
    toString: function (a) {
        a = a || "";
        var b = this._parts;
        if (this._len !== b.length) {
            this._value = {};
            this._len = b.length
        }
        var d = this._value;
        if (typeof d[a] === "undefined") {
            if (a !== "") for (var c = 0; c < b.length;) if (typeof b[c] === "undefined" || b[c] === "" || b[c] === null) b.splice(c, 1);
            else c++;
            d[a] = this._parts.join(a)
        }
        return d[a]
    }
};
Sys.StringBuilder.registerClass("Sys.StringBuilder");
Sys.Browser = {};
Sys.Browser.InternetExplorer = {};
Sys.Browser.Firefox = {};
Sys.Browser.Safari = {};
Sys.Browser.Opera = {};
Sys.Browser.agent = null;
Sys.Browser.hasDebuggerStatement = false;
Sys.Browser.name = navigator.appName;
Sys.Browser.version = parseFloat(navigator.appVersion);
Sys.Browser.documentMode = 0;
if (navigator.userAgent.indexOf(" MSIE ") > -1) {
    Sys.Browser.agent = Sys.Browser.InternetExplorer;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]);
    if (Sys.Browser.version >= 8) if (document.documentMode >= 7) Sys.Browser.documentMode = document.documentMode;
    Sys.Browser.hasDebuggerStatement = true
} else if (navigator.userAgent.indexOf(" Firefox/") > -1) {
    Sys.Browser.agent = Sys.Browser.Firefox;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/)[1]);
    Sys.Browser.name = "Firefox";
    Sys.Browser.hasDebuggerStatement = true
} else if (navigator.userAgent.indexOf(" AppleWebKit/") > -1) {
    Sys.Browser.agent = Sys.Browser.Safari;
    Sys.Browser.version = parseFloat(navigator.userAgent.match(/AppleWebKit\/(\d+(\.\d+)?)/)[1]);
    Sys.Browser.name = "Safari"
} else if (navigator.userAgent.indexOf("Opera/") > -1) Sys.Browser.agent = Sys.Browser.Opera;
Sys.EventArgs = function () {};
Sys.EventArgs.registerClass("Sys.EventArgs");
Sys.EventArgs.Empty = new Sys.EventArgs;
Sys.CancelEventArgs = function () {
    Sys.CancelEventArgs.initializeBase(this);
    this._cancel = false
};
Sys.CancelEventArgs.prototype = {
    get_cancel: function () {
        return this._cancel
    },
    set_cancel: function (a) {
        this._cancel = a
    }
};
Sys.CancelEventArgs.registerClass("Sys.CancelEventArgs", Sys.EventArgs);
Type.registerNamespace("Sys.UI");
Sys._Debug = function () {};
Sys._Debug.prototype = {
    _appendConsole: function (a) {
        if (typeof Debug !== "undefined" && Debug.writeln) Debug.writeln(a);
        if (window.console && window.console.log) window.console.log(a);
        if (window.opera) window.opera.postError(a);
        if (window.debugService) window.debugService.trace(a)
    },
    _appendTrace: function (b) {
        var a = document.getElementById("TraceConsole");
        if (a && a.tagName.toUpperCase() === "TEXTAREA") a.value += b + "\n"
    },
    assert: function (c, a, b) {
        if (!c) {
            a = b && this.assert.caller ? String.format(Sys.Res.assertFailedCaller, a, this.assert.caller) : String.format(Sys.Res.assertFailed, a);
            if (confirm(String.format(Sys.Res.breakIntoDebugger, a))) this.fail(a)
        }
    },
    clearTrace: function () {
        var a = document.getElementById("TraceConsole");
        if (a && a.tagName.toUpperCase() === "TEXTAREA") a.value = ""
    },
    fail: function (message) {
        this._appendConsole(message);
        if (Sys.Browser.hasDebuggerStatement) eval("debugger")
    },
    trace: function (a) {
        this._appendConsole(a);
        this._appendTrace(a)
    },
    traceDump: function (a, b) {
        var c = this._traceDump(a, b, true)
    },
    _traceDump: function (a, c, f, b, d) {
        c = c ? c : "traceDump";
        b = b ? b : "";
        if (a === null) {
            this.trace(b + c + ": null");
            return
        }
        switch (typeof a) {
            case "undefined":
                this.trace(b + c + ": Undefined");
                break;
            case "number":
            case "string":
            case "boolean":
                this.trace(b + c + ": " + a);
                break;
            default:
                if (Date.isInstanceOfType(a) || RegExp.isInstanceOfType(a)) {
                    this.trace(b + c + ": " + a.toString());
                    break
                }
                if (!d) d = [];
                else if (Array.contains(d, a)) {
                    this.trace(b + c + ": ...");
                    return
                }
                Array.add(d, a);
                if (a == window || a === document || window.HTMLElement && a instanceof HTMLElement || typeof a.nodeName === "string") {
                    var k = a.tagName ? a.tagName : "DomElement";
                    if (a.id) k += " - " + a.id;
                    this.trace(b + c + " {" + k + "}")
                } else {
                    var i = Object.getTypeName(a);
                    this.trace(b + c + (typeof i === "string" ? " {" + i + "}" : ""));
                    if (b === "" || f) {
                        b += "    ";
                        var e, j, l, g, h;
                        if (Array.isInstanceOfType(a)) {
                            j = a.length;
                            for (e = 0; e < j; e++) this._traceDump(a[e], "[" + e + "]", f, b, d)
                        } else for (g in a) {
                            h = a[g];
                            if (!Function.isInstanceOfType(h)) this._traceDump(h, g, f, b, d)
                        }
                    }
                }
                Array.remove(d, a)
        }
    }
};
Sys._Debug.registerClass("Sys._Debug");
Sys.Debug = new Sys._Debug;
Sys.Debug.isDebug = false;

function Sys$Enum$parse(c, e) {
    var a, b, i;
    if (e) {
        a = this.__lowerCaseValues;
        if (!a) {
            this.__lowerCaseValues = a = {};
            var g = this.prototype;
            for (var f in g) a[f.toLowerCase()] = g[f]
        }
    } else a = this.prototype;
    if (!this.__flags) {
        i = e ? c.toLowerCase() : c;
        b = a[i.trim()];
        if (typeof b !== "number") throw Error.argument("value", String.format(Sys.Res.enumInvalidValue, c, this.__typeName));
        return b
    } else {
        var h = (e ? c.toLowerCase() : c).split(","),
            j = 0;
        for (var d = h.length - 1; d >= 0; d--) {
            var k = h[d].trim();
            b = a[k];
            if (typeof b !== "number") throw Error.argument("value", String.format(Sys.Res.enumInvalidValue, c.split(",")[d].trim(), this.__typeName));
            j |= b
        }
        return j
    }
}
function Sys$Enum$toString(c) {
    if (typeof c === "undefined" || c === null) return this.__string;
    var d = this.prototype,
        a;
    if (!this.__flags || c === 0) {
        for (a in d) if (d[a] === c) return a
    } else {
        var b = this.__sortedValues;
        if (!b) {
            b = [];
            for (a in d) b[b.length] = {
                key: a,
                value: d[a]
            };
            b.sort(function (a, b) {
                return a.value - b.value
            });
            this.__sortedValues = b
        }
        var e = [],
            g = c;
        for (a = b.length - 1; a >= 0; a--) {
            var h = b[a],
                f = h.value;
            if (f === 0) continue;
            if ((f & c) === f) {
                e[e.length] = h.key;
                g -= f;
                if (g === 0) break
            }
        }
        if (e.length && g === 0) return e.reverse().join(", ")
    }
    return ""
}
Type.prototype.registerEnum = function (b, c) {
    Sys.__upperCaseTypes[b.toUpperCase()] = this;
    for (var a in this.prototype) this[a] = this.prototype[a];
    this.__typeName = b;
    this.parse = Sys$Enum$parse;
    this.__string = this.toString();
    this.toString = Sys$Enum$toString;
    this.__flags = c;
    this.__enum = true
};
Type.isEnum = function (a) {
    if (typeof a === "undefined" || a === null) return false;
    return !!a.__enum
};
Type.isFlags = function (a) {
    if (typeof a === "undefined" || a === null) return false;
    return !!a.__flags
};
Sys.CollectionChange = function (e, a, c, b, d) {
    this.action = e;
    if (a) if (!(a instanceof Array)) a = [a];
    this.newItems = a || null;
    if (typeof c !== "number") c = -1;
    this.newStartingIndex = c;
    if (b) if (!(b instanceof Array)) b = [b];
    this.oldItems = b || null;
    if (typeof d !== "number") d = -1;
    this.oldStartingIndex = d
};
Sys.CollectionChange.registerClass("Sys.CollectionChange");
Sys.NotifyCollectionChangedAction = function () {
    throw Error.notImplemented()
};
Sys.NotifyCollectionChangedAction.prototype = {
    add: 0,
    remove: 1,
    reset: 2
};
Sys.NotifyCollectionChangedAction.registerEnum("Sys.NotifyCollectionChangedAction");
Sys.NotifyCollectionChangedEventArgs = function (a) {
    this._changes = a;
    Sys.NotifyCollectionChangedEventArgs.initializeBase(this)
};
Sys.NotifyCollectionChangedEventArgs.prototype = {
    get_changes: function () {
        return this._changes || []
    }
};
Sys.NotifyCollectionChangedEventArgs.registerClass("Sys.NotifyCollectionChangedEventArgs", Sys.EventArgs);
Sys.Observer = function () {};
Sys.Observer.registerClass("Sys.Observer");
Sys.Observer.makeObservable = function (a) {
    var c = a instanceof Array,
        b = Sys.Observer;
    if (a.setValue === b._observeMethods.setValue) return a;
    b._addMethods(a, b._observeMethods);
    if (c) b._addMethods(a, b._arrayMethods);
    return a
};
Sys.Observer._addMethods = function (c, b) {
    for (var a in b) c[a] = b[a]
};
Sys.Observer._addEventHandler = function (c, a, b) {
    Sys.Observer._getContext(c, true).events._addHandler(a, b)
};
Sys.Observer.addEventHandler = function (c, a, b) {
    Sys.Observer._addEventHandler(c, a, b)
};
Sys.Observer._removeEventHandler = function (c, a, b) {
    Sys.Observer._getContext(c, true).events._removeHandler(a, b)
};
Sys.Observer.removeEventHandler = function (c, a, b) {
    Sys.Observer._removeEventHandler(c, a, b)
};
Sys.Observer.raiseEvent = function (b, e, d) {
    var c = Sys.Observer._getContext(b);
    if (!c) return;
    var a = c.events.getHandler(e);
    if (a) a(b, d)
};
Sys.Observer.addPropertyChanged = function (b, a) {
    Sys.Observer._addEventHandler(b, "propertyChanged", a)
};
Sys.Observer.removePropertyChanged = function (b, a) {
    Sys.Observer._removeEventHandler(b, "propertyChanged", a)
};
Sys.Observer.beginUpdate = function (a) {
    Sys.Observer._getContext(a, true).updating = true
};
Sys.Observer.endUpdate = function (b) {
    var a = Sys.Observer._getContext(b);
    if (!a || !a.updating) return;
    a.updating = false;
    var d = a.dirty;
    a.dirty = false;
    if (d) {
        if (b instanceof Array) {
            var c = a.changes;
            a.changes = null;
            Sys.Observer.raiseCollectionChanged(b, c)
        }
        Sys.Observer.raisePropertyChanged(b, "")
    }
};
Sys.Observer.isUpdating = function (b) {
    var a = Sys.Observer._getContext(b);
    return a ? a.updating : false
};
Sys.Observer._setValue = function (a, j, g) {
    var b, f, k = a,
        d = j.split(".");
    for (var i = 0, m = d.length - 1; i < m; i++) {
        var l = d[i];
        b = a["get_" + l];
        if (typeof b === "function") a = b.call(a);
        else a = a[l];
        var n = typeof a;
        if (a === null || n === "undefined") throw Error.invalidOperation(String.format(Sys.Res.nullReferenceInPath, j))
    }
    var e, c = d[m];
    b = a["get_" + c];
    f = a["set_" + c];
    if (typeof b === "function") e = b.call(a);
    else e = a[c];
    if (typeof f === "function") f.call(a, g);
    else a[c] = g;
    if (e !== g) {
        var h = Sys.Observer._getContext(k);
        if (h && h.updating) {
            h.dirty = true;
            return
        }
        Sys.Observer.raisePropertyChanged(k, d[0])
    }
};
Sys.Observer.setValue = function (b, a, c) {
    Sys.Observer._setValue(b, a, c)
};
Sys.Observer.raisePropertyChanged = function (b, a) {
    Sys.Observer.raiseEvent(b, "propertyChanged", new Sys.PropertyChangedEventArgs(a))
};
Sys.Observer.addCollectionChanged = function (b, a) {
    Sys.Observer._addEventHandler(b, "collectionChanged", a)
};
Sys.Observer.removeCollectionChanged = function (b, a) {
    Sys.Observer._removeEventHandler(b, "collectionChanged", a)
};
Sys.Observer._collectionChange = function (d, c) {
    var a = Sys.Observer._getContext(d);
    if (a && a.updating) {
        a.dirty = true;
        var b = a.changes;
        if (!b) a.changes = b = [c];
        else b.push(c)
    } else {
        Sys.Observer.raiseCollectionChanged(d, [c]);
        Sys.Observer.raisePropertyChanged(d, "length")
    }
};
Sys.Observer.add = function (a, b) {
    var c = new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.add, [b], a.length);
    Array.add(a, b);
    Sys.Observer._collectionChange(a, c)
};
Sys.Observer.addRange = function (a, b) {
    var c = new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.add, b, a.length);
    Array.addRange(a, b);
    Sys.Observer._collectionChange(a, c)
};
Sys.Observer.clear = function (a) {
    var b = Array.clone(a);
    Array.clear(a);
    Sys.Observer._collectionChange(a, new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.reset, null, -1, b, 0))
};
Sys.Observer.insert = function (a, b, c) {
    Array.insert(a, b, c);
    Sys.Observer._collectionChange(a, new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.add, [c], b))
};
Sys.Observer.remove = function (a, b) {
    var c = Array.indexOf(a, b);
    if (c !== -1) {
        Array.remove(a, b);
        Sys.Observer._collectionChange(a, new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.remove, null, -1, [b], c));
        return true
    }
    return false
};
Sys.Observer.removeAt = function (b, a) {
    if (a > -1 && a < b.length) {
        var c = b[a];
        Array.removeAt(b, a);
        Sys.Observer._collectionChange(b, new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.remove, null, -1, [c], a))
    }
};
Sys.Observer.raiseCollectionChanged = function (b, a) {
    Sys.Observer.raiseEvent(b, "collectionChanged", new Sys.NotifyCollectionChangedEventArgs(a))
};
Sys.Observer._observeMethods = {
    add_propertyChanged: function (a) {
        Sys.Observer._addEventHandler(this, "propertyChanged", a)
    },
    remove_propertyChanged: function (a) {
        Sys.Observer._removeEventHandler(this, "propertyChanged", a)
    },
    addEventHandler: function (a, b) {
        Sys.Observer._addEventHandler(this, a, b)
    },
    removeEventHandler: function (a, b) {
        Sys.Observer._removeEventHandler(this, a, b)
    },
    get_isUpdating: function () {
        return Sys.Observer.isUpdating(this)
    },
    beginUpdate: function () {
        Sys.Observer.beginUpdate(this)
    },
    endUpdate: function () {
        Sys.Observer.endUpdate(this)
    },
    setValue: function (b, a) {
        Sys.Observer._setValue(this, b, a)
    },
    raiseEvent: function (b, a) {
        Sys.Observer.raiseEvent(this, b, a)
    },
    raisePropertyChanged: function (a) {
        Sys.Observer.raiseEvent(this, "propertyChanged", new Sys.PropertyChangedEventArgs(a))
    }
};
Sys.Observer._arrayMethods = {
    add_collectionChanged: function (a) {
        Sys.Observer._addEventHandler(this, "collectionChanged", a)
    },
    remove_collectionChanged: function (a) {
        Sys.Observer._removeEventHandler(this, "collectionChanged", a)
    },
    add: function (a) {
        Sys.Observer.add(this, a)
    },
    addRange: function (a) {
        Sys.Observer.addRange(this, a)
    },
    clear: function () {
        Sys.Observer.clear(this)
    },
    insert: function (a, b) {
        Sys.Observer.insert(this, a, b)
    },
    remove: function (a) {
        return Sys.Observer.remove(this, a)
    },
    removeAt: function (a) {
        Sys.Observer.removeAt(this, a)
    },
    raiseCollectionChanged: function (a) {
        Sys.Observer.raiseEvent(this, "collectionChanged", new Sys.NotifyCollectionChangedEventArgs(a))
    }
};
Sys.Observer._getContext = function (b, c) {
    var a = b._observerContext;
    if (a) return a();
    if (c) return (b._observerContext = Sys.Observer._createContext())();
    return null
};
Sys.Observer._createContext = function () {
    var a = {
        events: new Sys.EventHandlerList
    };
    return function () {
        return a
    }
};
Date._appendPreOrPostMatch = function (e, b) {
    var d = 0,
        a = false;
    for (var c = 0, g = e.length; c < g; c++) {
        var f = e.charAt(c);
        switch (f) {
            case "'":
                if (a) b.append("'");
                else d++;
                a = false;
                break;
            case "\\":
                if (a) b.append("\\");
                a = !a;
                break;
            default:
                b.append(f);
                a = false
        }
    }
    return d
};
Date._expandFormat = function (a, b) {
    if (!b) b = "F";
    var c = b.length;
    if (c === 1) switch (b) {
        case "d":
            return a.ShortDatePattern;
        case "D":
            return a.LongDatePattern;
        case "t":
            return a.ShortTimePattern;
        case "T":
            return a.LongTimePattern;
        case "f":
            return a.LongDatePattern + " " + a.ShortTimePattern;
        case "F":
            return a.FullDateTimePattern;
        case "M":
        case "m":
            return a.MonthDayPattern;
        case "s":
            return a.SortableDateTimePattern;
        case "Y":
        case "y":
            return a.YearMonthPattern;
        default:
            throw Error.format(Sys.Res.formatInvalidString)
    } else if (c === 2 && b.charAt(0) === "%") b = b.charAt(1);
    return b
};
Date._expandYear = function (c, a) {
    var d = new Date,
        e = Date._getEra(d);
    if (a < 100) {
        var b = Date._getEraYear(d, c, e);
        a += b - b % 100;
        if (a > c.Calendar.TwoDigitYearMax) a -= 100
    }
    return a
};
Date._getEra = function (e, c) {
    if (!c) return 0;
    var b, d = e.getTime();
    for (var a = 0, f = c.length; a < f; a += 4) {
        b = c[a + 2];
        if (b === null || d >= b) return a
    }
    return 0
};
Date._getEraYear = function (d, b, e, c) {
    var a = d.getFullYear();
    if (!c && b.eras) a -= b.eras[e + 3];
    return a
};
Date._getParseRegExp = function (b, e) {
    if (!b._parseRegExp) b._parseRegExp = {};
    else if (b._parseRegExp[e]) return b._parseRegExp[e];
    var c = Date._expandFormat(b, e);
    c = c.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1");
    var a = new Sys.StringBuilder("^"),
        j = [],
        f = 0,
        i = 0,
        h = Date._getTokenRegExp(),
        d;
    while ((d = h.exec(c)) !== null) {
        var l = c.slice(f, d.index);
        f = h.lastIndex;
        i += Date._appendPreOrPostMatch(l, a);
        if (i % 2 === 1) {
            a.append(d[0]);
            continue
        }
        switch (d[0]) {
            case "dddd":
            case "ddd":
            case "MMMM":
            case "MMM":
            case "gg":
            case "g":
                a.append("(\\D+)");
                break;
            case "tt":
            case "t":
                a.append("(\\D*)");
                break;
            case "yyyy":
                a.append("(\\d{4})");
                break;
            case "fff":
                a.append("(\\d{3})");
                break;
            case "ff":
                a.append("(\\d{2})");
                break;
            case "f":
                a.append("(\\d)");
                break;
            case "dd":
            case "d":
            case "MM":
            case "M":
            case "yy":
            case "y":
            case "HH":
            case "H":
            case "hh":
            case "h":
            case "mm":
            case "m":
            case "ss":
            case "s":
                a.append("(\\d\\d?)");
                break;
            case "zzz":
                a.append("([+-]?\\d\\d?:\\d{2})");
                break;
            case "zz":
            case "z":
                a.append("([+-]?\\d\\d?)");
                break;
            case "/":
                a.append("(\\" + b.DateSeparator + ")")
        }
        Array.add(j, d[0])
    }
    Date._appendPreOrPostMatch(c.slice(f), a);
    a.append("$");
    var k = a.toString().replace(/\s+/g, "\\s+"),
        g = {
            "regExp": k,
            "groups": j
        };
    b._parseRegExp[e] = g;
    return g
};
Date._getTokenRegExp = function () {
    return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g
};
Date.parseLocale = function (a) {
    return Date._parse(a, Sys.CultureInfo.CurrentCulture, arguments)
};
Date.parseInvariant = function (a) {
    return Date._parse(a, Sys.CultureInfo.InvariantCulture, arguments)
};
Date._parse = function (h, d, i) {
    var a, c, b, f, e, g = false;
    for (a = 1, c = i.length; a < c; a++) {
        f = i[a];
        if (f) {
            g = true;
            b = Date._parseExact(h, f, d);
            if (b) return b
        }
    }
    if (!g) {
        e = d._getDateTimeFormats();
        for (a = 0, c = e.length; a < c; a++) {
            b = Date._parseExact(h, e[a], d);
            if (b) return b
        }
    }
    return null
};
Date._parseExact = function (w, D, k) {
    w = w.trim();
    var g = k.dateTimeFormat,
        A = Date._getParseRegExp(g, D),
        C = (new RegExp(A.regExp)).exec(w);
    if (C === null) return null;
    var B = A.groups,
        x = null,
        e = null,
        c = null,
        j = null,
        i = null,
        d = 0,
        h, p = 0,
        q = 0,
        f = 0,
        l = null,
        v = false;
    for (var s = 0, E = B.length; s < E; s++) {
        var a = C[s + 1];
        if (a) switch (B[s]) {
            case "dd":
            case "d":
                j = parseInt(a, 10);
                if (j < 1 || j > 31) return null;
                break;
            case "MMMM":
                c = k._getMonthIndex(a);
                if (c < 0 || c > 11) return null;
                break;
            case "MMM":
                c = k._getAbbrMonthIndex(a);
                if (c < 0 || c > 11) return null;
                break;
            case "M":
            case "MM":
                c = parseInt(a, 10) - 1;
                if (c < 0 || c > 11) return null;
                break;
            case "y":
            case "yy":
                e = Date._expandYear(g, parseInt(a, 10));
                if (e < 0 || e > 9999) return null;
                break;
            case "yyyy":
                e = parseInt(a, 10);
                if (e < 0 || e > 9999) return null;
                break;
            case "h":
            case "hh":
                d = parseInt(a, 10);
                if (d === 12) d = 0;
                if (d < 0 || d > 11) return null;
                break;
            case "H":
            case "HH":
                d = parseInt(a, 10);
                if (d < 0 || d > 23) return null;
                break;
            case "m":
            case "mm":
                p = parseInt(a, 10);
                if (p < 0 || p > 59) return null;
                break;
            case "s":
            case "ss":
                q = parseInt(a, 10);
                if (q < 0 || q > 59) return null;
                break;
            case "tt":
            case "t":
                var z = a.toUpperCase();
                v = z === g.PMDesignator.toUpperCase();
                if (!v && z !== g.AMDesignator.toUpperCase()) return null;
                break;
            case "f":
                f = parseInt(a, 10) * 100;
                if (f < 0 || f > 999) return null;
                break;
            case "ff":
                f = parseInt(a, 10) * 10;
                if (f < 0 || f > 999) return null;
                break;
            case "fff":
                f = parseInt(a, 10);
                if (f < 0 || f > 999) return null;
                break;
            case "dddd":
                i = k._getDayIndex(a);
                if (i < 0 || i > 6) return null;
                break;
            case "ddd":
                i = k._getAbbrDayIndex(a);
                if (i < 0 || i > 6) return null;
                break;
            case "zzz":
                var u = a.split(/:/);
                if (u.length !== 2) return null;
                h = parseInt(u[0], 10);
                if (h < -12 || h > 13) return null;
                var m = parseInt(u[1], 10);
                if (m < 0 || m > 59) return null;
                l = h * 60 + (a.startsWith("-") ? -m : m);
                break;
            case "z":
            case "zz":
                h = parseInt(a, 10);
                if (h < -12 || h > 13) return null;
                l = h * 60;
                break;
            case "g":
            case "gg":
                var o = a;
                if (!o || !g.eras) return null;
                o = o.toLowerCase().trim();
                for (var r = 0, F = g.eras.length; r < F; r += 4) if (o === g.eras[r + 1].toLowerCase()) {
                    x = r;
                    break
                }
                if (x === null) return null
        }
    }
    var b = new Date,
        t, n = g.Calendar.convert;
    if (n) t = n.fromGregorian(b)[0];
    else t = b.getFullYear();
    if (e === null) e = t;
    else if (g.eras) e += g.eras[(x || 0) + 3];
    if (c === null) c = 0;
    if (j === null) j = 1;
    if (n) {
        b = n.toGregorian(e, c, j);
        if (b === null) return null
    } else {
        b.setFullYear(e, c, j);
        if (b.getDate() !== j) return null;
        if (i !== null && b.getDay() !== i) return null
    }
    if (v && d < 12) d += 12;
    b.setHours(d, p, q, f);
    if (l !== null) {
        var y = b.getMinutes() - (l + b.getTimezoneOffset());
        b.setHours(b.getHours() + parseInt(y / 60, 10), y % 60)
    }
    return b
};
Date.prototype.format = function (a) {
    return this._toFormattedString(a, Sys.CultureInfo.InvariantCulture)
};
Date.prototype.localeFormat = function (a) {
    return this._toFormattedString(a, Sys.CultureInfo.CurrentCulture)
};
Date.prototype._toFormattedString = function (e, j) {
    var b = j.dateTimeFormat,
        n = b.Calendar.convert;
    if (!e || !e.length || e === "i") if (j && j.name.length) if (n) return this._toFormattedString(b.FullDateTimePattern, j);
    else {
        var r = new Date(this.getTime()),
            x = Date._getEra(this, b.eras);
        r.setFullYear(Date._getEraYear(this, b, x));
        return r.toLocaleString()
    } else return this.toString();
    var l = b.eras,
        k = e === "s";
    e = Date._expandFormat(b, e);
    var a = new Sys.StringBuilder,
        c;

    function d(a) {
        if (a < 10) return "0" + a;
        return a.toString()
    }
    function m(a) {
        if (a < 10) return "00" + a;
        if (a < 100) return "0" + a;
        return a.toString()
    }
    function v(a) {
        if (a < 10) return "000" + a;
        else if (a < 100) return "00" + a;
        else if (a < 1000) return "0" + a;
        return a.toString()
    }
    var h, p, t = /([^d]|^)(d|dd)([^d]|$)/g;

    function s() {
        if (h || p) return h;
        h = t.test(e);
        p = true;
        return h
    }
    var q = 0,
        o = Date._getTokenRegExp(),
        f;
    if (!k && n) f = n.fromGregorian(this);
    for (; true;) {
        var w = o.lastIndex,
            i = o.exec(e),
            u = e.slice(w, i ? i.index : e.length);
        q += Date._appendPreOrPostMatch(u, a);
        if (!i) break;
        if (q % 2 === 1) {
            a.append(i[0]);
            continue
        }
        function g(a, b) {
            if (f) return f[b];
            switch (b) {
                case 0:
                    return a.getFullYear();
                case 1:
                    return a.getMonth();
                case 2:
                    return a.getDate()
            }
        }
        switch (i[0]) {
            case "dddd":
                a.append(b.DayNames[this.getDay()]);
                break;
            case "ddd":
                a.append(b.AbbreviatedDayNames[this.getDay()]);
                break;
            case "dd":
                h = true;
                a.append(d(g(this, 2)));
                break;
            case "d":
                h = true;
                a.append(g(this, 2));
                break;
            case "MMMM":
                a.append(b.MonthGenitiveNames && s() ? b.MonthGenitiveNames[g(this, 1)] : b.MonthNames[g(this, 1)]);
                break;
            case "MMM":
                a.append(b.AbbreviatedMonthGenitiveNames && s() ? b.AbbreviatedMonthGenitiveNames[g(this, 1)] : b.AbbreviatedMonthNames[g(this, 1)]);
                break;
            case "MM":
                a.append(d(g(this, 1) + 1));
                break;
            case "M":
                a.append(g(this, 1) + 1);
                break;
            case "yyyy":
                a.append(v(f ? f[0] : Date._getEraYear(this, b, Date._getEra(this, l), k)));
                break;
            case "yy":
                a.append(d((f ? f[0] : Date._getEraYear(this, b, Date._getEra(this, l), k)) % 100));
                break;
            case "y":
                a.append((f ? f[0] : Date._getEraYear(this, b, Date._getEra(this, l), k)) % 100);
                break;
            case "hh":
                c = this.getHours() % 12;
                if (c === 0) c = 12;
                a.append(d(c));
                break;
            case "h":
                c = this.getHours() % 12;
                if (c === 0) c = 12;
                a.append(c);
                break;
            case "HH":
                a.append(d(this.getHours()));
                break;
            case "H":
                a.append(this.getHours());
                break;
            case "mm":
                a.append(d(this.getMinutes()));
                break;
            case "m":
                a.append(this.getMinutes());
                break;
            case "ss":
                a.append(d(this.getSeconds()));
                break;
            case "s":
                a.append(this.getSeconds());
                break;
            case "tt":
                a.append(this.getHours() < 12 ? b.AMDesignator : b.PMDesignator);
                break;
            case "t":
                a.append((this.getHours() < 12 ? b.AMDesignator : b.PMDesignator).charAt(0));
                break;
            case "f":
                a.append(m(this.getMilliseconds()).charAt(0));
                break;
            case "ff":
                a.append(m(this.getMilliseconds()).substr(0, 2));
                break;
            case "fff":
                a.append(m(this.getMilliseconds()));
                break;
            case "z":
                c = this.getTimezoneOffset() / 60;
                a.append((c <= 0 ? "+" : "-") + Math.floor(Math.abs(c)));
                break;
            case "zz":
                c = this.getTimezoneOffset() / 60;
                a.append((c <= 0 ? "+" : "-") + d(Math.floor(Math.abs(c))));
                break;
            case "zzz":
                c = this.getTimezoneOffset() / 60;
                a.append((c <= 0 ? "+" : "-") + d(Math.floor(Math.abs(c))) + ":" + d(Math.abs(this.getTimezoneOffset() % 60)));
                break;
            case "g":
            case "gg":
                if (b.eras) a.append(b.eras[Date._getEra(this, l) + 1]);
                break;
            case "/":
                a.append(b.DateSeparator)
        }
    }
    return a.toString()
};
String.localeFormat = function () {
    return String._toFormattedString(true, arguments)
};
Number.parseLocale = function (a) {
    return Number._parse(a, Sys.CultureInfo.CurrentCulture)
};
Number.parseInvariant = function (a) {
    return Number._parse(a, Sys.CultureInfo.InvariantCulture)
};
Number._parse = function (b, o) {
    b = b.trim();
    if (b.match(/^[+-]?infinity$/i)) return parseFloat(b);
    if (b.match(/^0x[a-f0-9]+$/i)) return parseInt(b);
    var a = o.numberFormat,
        g = Number._parseNumberNegativePattern(b, a, a.NumberNegativePattern),
        h = g[0],
        e = g[1];
    if (h === "" && a.NumberNegativePattern !== 1) {
        g = Number._parseNumberNegativePattern(b, a, 1);
        h = g[0];
        e = g[1]
    }
    if (h === "") h = "+";
    var j, d, f = e.indexOf("e");
    if (f < 0) f = e.indexOf("E");
    if (f < 0) {
        d = e;
        j = null
    } else {
        d = e.substr(0, f);
        j = e.substr(f + 1)
    }
    var c, k, m = d.indexOf(a.NumberDecimalSeparator);
    if (m < 0) {
        c = d;
        k = null
    } else {
        c = d.substr(0, m);
        k = d.substr(m + a.NumberDecimalSeparator.length)
    }
    c = c.split(a.NumberGroupSeparator).join("");
    var n = a.NumberGroupSeparator.replace(/\u00A0/g, " ");
    if (a.NumberGroupSeparator !== n) c = c.split(n).join("");
    var l = h + c;
    if (k !== null) l += "." + k;
    if (j !== null) {
        var i = Number._parseNumberNegativePattern(j, a, 1);
        if (i[0] === "") i[0] = "+";
        l += "e" + i[0] + i[1]
    }
    if (l.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/)) return parseFloat(l);
    return Number.NaN
};
Number._parseNumberNegativePattern = function (a, d, e) {
    var b = d.NegativeSign,
        c = d.PositiveSign;
    switch (e) {
        case 4:
            b = " " + b;
            c = " " + c;
        case 3:
            if (a.endsWith(b)) return ["-", a.substr(0, a.length - b.length)];
            else if (a.endsWith(c)) return ["+", a.substr(0, a.length - c.length)];
            break;
        case 2:
            b += " ";
            c += " ";
        case 1:
            if (a.startsWith(b)) return ["-", a.substr(b.length)];
            else if (a.startsWith(c)) return ["+", a.substr(c.length)];
            break;
        case 0:
            if (a.startsWith("(") && a.endsWith(")")) return ["-", a.substr(1, a.length - 2)]
    }
    return ["", a]
};
Number.prototype.format = function (a) {
    return this._toFormattedString(a, Sys.CultureInfo.InvariantCulture)
};
Number.prototype.localeFormat = function (a) {
    return this._toFormattedString(a, Sys.CultureInfo.CurrentCulture)
};
Number.prototype._toFormattedString = function (e, j) {
    if (!e || e.length === 0 || e === "i") if (j && j.name.length > 0) return this.toLocaleString();
    else return this.toString();
    var o = ["n %", "n%", "%n"],
        n = ["-n %", "-n%", "-%n"],
        p = ["(n)", "-n", "- n", "n-", "n -"],
        m = ["$n", "n$", "$ n", "n $"],
        l = ["($n)", "-$n", "$-n", "$n-", "(n$)", "-n$", "n-$", "n$-", "-n $", "-$ n", "n $-", "$ n-", "$ -n", "n- $", "($ n)", "(n $)"];

    function g(a, c, d) {
        for (var b = a.length; b < c; b++) a = d ? "0" + a : a + "0";
        return a
    }
    function i(j, i, l, n, p) {
        var h = l[0],
            k = 1,
            o = Math.pow(10, i),
            m = Math.round(j * o) / o;
        if (!isFinite(m)) m = j;
        j = m;
        var b = j.toString(),
            a = "",
            c, e = b.split(/e/i);
        b = e[0];
        c = e.length > 1 ? parseInt(e[1]) : 0;
        e = b.split(".");
        b = e[0];
        a = e.length > 1 ? e[1] : "";
        var q;
        if (c > 0) {
            a = g(a, c, false);
            b += a.slice(0, c);
            a = a.substr(c)
        } else if (c < 0) {
            c = -c;
            b = g(b, c + 1, true);
            a = b.slice(-c, b.length) + a;
            b = b.slice(0, -c)
        }
        if (i > 0) {
            if (a.length > i) a = a.slice(0, i);
            else a = g(a, i, false);
            a = p + a
        } else a = "";
        var d = b.length - 1,
            f = "";
        while (d >= 0) {
            if (h === 0 || h > d) if (f.length > 0) return b.slice(0, d + 1) + n + f + a;
            else return b.slice(0, d + 1) + a;
            if (f.length > 0) f = b.slice(d - h + 1, d + 1) + n + f;
            else f = b.slice(d - h + 1, d + 1);
            d -= h;
            if (k < l.length) {
                h = l[k];
                k++
            }
        }
        return b.slice(0, d + 1) + n + f + a
    }
    var a = j.numberFormat,
        d = Math.abs(this);
    if (!e) e = "D";
    var b = -1;
    if (e.length > 1) b = parseInt(e.slice(1), 10);
    var c;
    switch (e.charAt(0)) {
        case "d":
        case "D":
            c = "n";
            if (b !== -1) d = g("" + d, b, true);
            if (this < 0) d = -d;
            break;
        case "c":
        case "C":
            if (this < 0) c = l[a.CurrencyNegativePattern];
            else c = m[a.CurrencyPositivePattern];
            if (b === -1) b = a.CurrencyDecimalDigits;
            d = i(Math.abs(this), b, a.CurrencyGroupSizes, a.CurrencyGroupSeparator, a.CurrencyDecimalSeparator);
            break;
        case "n":
        case "N":
            if (this < 0) c = p[a.NumberNegativePattern];
            else c = "n";
            if (b === -1) b = a.NumberDecimalDigits;
            d = i(Math.abs(this), b, a.NumberGroupSizes, a.NumberGroupSeparator, a.NumberDecimalSeparator);
            break;
        case "p":
        case "P":
            if (this < 0) c = n[a.PercentNegativePattern];
            else c = o[a.PercentPositivePattern];
            if (b === -1) b = a.PercentDecimalDigits;
            d = i(Math.abs(this) * 100, b, a.PercentGroupSizes, a.PercentGroupSeparator, a.PercentDecimalSeparator);
            break;
        default:
            throw Error.format(Sys.Res.formatBadFormatSpecifier)
    }
    var k = /n|\$|-|%/g,
        f = "";
    for (; true;) {
        var q = k.lastIndex,
            h = k.exec(c);
        f += c.slice(q, h ? h.index : c.length);
        if (!h) break;
        switch (h[0]) {
            case "n":
                f += d;
                break;
            case "$":
                f += a.CurrencySymbol;
                break;
            case "-":
                if (/[1-9]/.test(d)) f += a.NegativeSign;
                break;
            case "%":
                f += a.PercentSymbol
        }
    }
    return f
};
Sys.CultureInfo = function (c, b, a) {
    this.name = c;
    this.numberFormat = b;
    this.dateTimeFormat = a
};
Sys.CultureInfo.prototype = {
    _getDateTimeFormats: function () {
        if (!this._dateTimeFormats) {
            var a = this.dateTimeFormat;
            this._dateTimeFormats = [a.MonthDayPattern, a.YearMonthPattern, a.ShortDatePattern, a.ShortTimePattern, a.LongDatePattern, a.LongTimePattern, a.FullDateTimePattern, a.RFC1123Pattern, a.SortableDateTimePattern, a.UniversalSortableDateTimePattern]
        }
        return this._dateTimeFormats
    },
    _getIndex: function (c, d, e) {
        var b = this._toUpper(c),
            a = Array.indexOf(d, b);
        if (a === -1) a = Array.indexOf(e, b);
        return a
    },
    _getMonthIndex: function (a) {
        if (!this._upperMonths) {
            this._upperMonths = this._toUpperArray(this.dateTimeFormat.MonthNames);
            this._upperMonthsGenitive = this._toUpperArray(this.dateTimeFormat.MonthGenitiveNames)
        }
        return this._getIndex(a, this._upperMonths, this._upperMonthsGenitive)
    },
    _getAbbrMonthIndex: function (a) {
        if (!this._upperAbbrMonths) {
            this._upperAbbrMonths = this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthNames);
            this._upperAbbrMonthsGenitive = this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthGenitiveNames)
        }
        return this._getIndex(a, this._upperAbbrMonths, this._upperAbbrMonthsGenitive)
    },
    _getDayIndex: function (a) {
        if (!this._upperDays) this._upperDays = this._toUpperArray(this.dateTimeFormat.DayNames);
        return Array.indexOf(this._upperDays, this._toUpper(a))
    },
    _getAbbrDayIndex: function (a) {
        if (!this._upperAbbrDays) this._upperAbbrDays = this._toUpperArray(this.dateTimeFormat.AbbreviatedDayNames);
        return Array.indexOf(this._upperAbbrDays, this._toUpper(a))
    },
    _toUpperArray: function (c) {
        var b = [];
        for (var a = 0, d = c.length; a < d; a++) b[a] = this._toUpper(c[a]);
        return b
    },
    _toUpper: function (a) {
        return a.split("\u00a0").join(" ").toUpperCase()
    }
};
Sys.CultureInfo.registerClass("Sys.CultureInfo");
Sys.CultureInfo._parse = function (a) {
    var b = a.dateTimeFormat;
    if (b && !b.eras) b.eras = a.eras;
    return new Sys.CultureInfo(a.name, a.numberFormat, b)
};
Sys.CultureInfo.InvariantCulture = Sys.CultureInfo._parse({
    "name": "",
    "numberFormat": {
        "CurrencyDecimalDigits": 2,
        "CurrencyDecimalSeparator": ".",
        "IsReadOnly": true,
        "CurrencyGroupSizes": [3],
        "NumberGroupSizes": [3],
        "PercentGroupSizes": [3],
        "CurrencyGroupSeparator": ",",
        "CurrencySymbol": "\u00a4",
        "NaNSymbol": "NaN",
        "CurrencyNegativePattern": 0,
        "NumberNegativePattern": 1,
        "PercentPositivePattern": 0,
        "PercentNegativePattern": 0,
        "NegativeInfinitySymbol": "-Infinity",
        "NegativeSign": "-",
        "NumberDecimalDigits": 2,
        "NumberDecimalSeparator": ".",
        "NumberGroupSeparator": ",",
        "CurrencyPositivePattern": 0,
        "PositiveInfinitySymbol": "Infinity",
        "PositiveSign": "+",
        "PercentDecimalDigits": 2,
        "PercentDecimalSeparator": ".",
        "PercentGroupSeparator": ",",
        "PercentSymbol": "%",
        "PerMilleSymbol": "\u2030",
        "NativeDigits": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        "DigitSubstitution": 1
    },
    "dateTimeFormat": {
        "AMDesignator": "AM",
        "Calendar": {
            "MinSupportedDateTime": "@-62135568000000@",
            "MaxSupportedDateTime": "@253402300799999@",
            "AlgorithmType": 1,
            "CalendarType": 1,
            "Eras": [1],
            "TwoDigitYearMax": 2029,
            "IsReadOnly": true
        },
        "DateSeparator": "/",
        "FirstDayOfWeek": 0,
        "CalendarWeekRule": 0,
        "FullDateTimePattern": "dddd, dd MMMM yyyy HH:mm:ss",
        "LongDatePattern": "dddd, dd MMMM yyyy",
        "LongTimePattern": "HH:mm:ss",
        "MonthDayPattern": "MMMM dd",
        "PMDesignator": "PM",
        "RFC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        "ShortDatePattern": "MM/dd/yyyy",
        "ShortTimePattern": "HH:mm",
        "SortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        "TimeSeparator": ":",
        "UniversalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        "YearMonthPattern": "yyyy MMMM",
        "AbbreviatedDayNames": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "ShortestDayNames": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        "DayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "AbbreviatedMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
        "MonthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
        "IsReadOnly": true,
        "NativeCalendarName": "Gregorian Calendar",
        "AbbreviatedMonthGenitiveNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
        "MonthGenitiveNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""]
    },
    "eras": [1, "A.D.", null, 0]
});
if (typeof __cultureInfo === "object") {
    Sys.CultureInfo.CurrentCulture = Sys.CultureInfo._parse(__cultureInfo);
    delete __cultureInfo
} else Sys.CultureInfo.CurrentCulture = Sys.CultureInfo._parse({
    "name": "en-US",
    "numberFormat": {
        "CurrencyDecimalDigits": 2,
        "CurrencyDecimalSeparator": ".",
        "IsReadOnly": false,
        "CurrencyGroupSizes": [3],
        "NumberGroupSizes": [3],
        "PercentGroupSizes": [3],
        "CurrencyGroupSeparator": ",",
        "CurrencySymbol": "$",
        "NaNSymbol": "NaN",
        "CurrencyNegativePattern": 0,
        "NumberNegativePattern": 1,
        "PercentPositivePattern": 0,
        "PercentNegativePattern": 0,
        "NegativeInfinitySymbol": "-Infinity",
        "NegativeSign": "-",
        "NumberDecimalDigits": 2,
        "NumberDecimalSeparator": ".",
        "NumberGroupSeparator": ",",
        "CurrencyPositivePattern": 0,
        "PositiveInfinitySymbol": "Infinity",
        "PositiveSign": "+",
        "PercentDecimalDigits": 2,
        "PercentDecimalSeparator": ".",
        "PercentGroupSeparator": ",",
        "PercentSymbol": "%",
        "PerMilleSymbol": "\u2030",
        "NativeDigits": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        "DigitSubstitution": 1
    },
    "dateTimeFormat": {
        "AMDesignator": "AM",
        "Calendar": {
            "MinSupportedDateTime": "@-62135568000000@",
            "MaxSupportedDateTime": "@253402300799999@",
            "AlgorithmType": 1,
            "CalendarType": 1,
            "Eras": [1],
            "TwoDigitYearMax": 2029,
            "IsReadOnly": false
        },
        "DateSeparator": "/",
        "FirstDayOfWeek": 0,
        "CalendarWeekRule": 0,
        "FullDateTimePattern": "dddd, MMMM dd, yyyy h:mm:ss tt",
        "LongDatePattern": "dddd, MMMM dd, yyyy",
        "LongTimePattern": "h:mm:ss tt",
        "MonthDayPattern": "MMMM dd",
        "PMDesignator": "PM",
        "RFC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        "ShortDatePattern": "M/d/yyyy",
        "ShortTimePattern": "h:mm tt",
        "SortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        "TimeSeparator": ":",
        "UniversalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        "YearMonthPattern": "MMMM, yyyy",
        "AbbreviatedDayNames": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "ShortestDayNames": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        "DayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "AbbreviatedMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
        "MonthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
        "IsReadOnly": false,
        "NativeCalendarName": "Gregorian Calendar",
        "AbbreviatedMonthGenitiveNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
        "MonthGenitiveNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""]
    },
    "eras": [1, "A.D.", null, 0]
});
Type.registerNamespace("Sys.Serialization");
Sys.Serialization.JavaScriptSerializer = function () {};
Sys.Serialization.JavaScriptSerializer.registerClass("Sys.Serialization.JavaScriptSerializer");
Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs = [];
Sys.Serialization.JavaScriptSerializer._charsToEscape = [];
Sys.Serialization.JavaScriptSerializer._dateRegEx = new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"', "g");
Sys.Serialization.JavaScriptSerializer._escapeChars = {};
Sys.Serialization.JavaScriptSerializer._escapeRegEx = new RegExp('["\\\\\\x00-\\x1F]', "i");
Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal = new RegExp('["\\\\\\x00-\\x1F]', "g");
Sys.Serialization.JavaScriptSerializer._jsonRegEx = new RegExp("[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]", "g");
Sys.Serialization.JavaScriptSerializer._jsonStringRegEx = new RegExp('"(\\\\.|[^"\\\\])*"', "g");
Sys.Serialization.JavaScriptSerializer._serverTypeFieldName = "__type";
Sys.Serialization.JavaScriptSerializer._init = function () {
    var c = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", "\\b", "\\t", "\\n", "\\u000b", "\\f", "\\r", "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];
    Sys.Serialization.JavaScriptSerializer._charsToEscape[0] = "\\";
    Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs["\\"] = new RegExp("\\\\", "g");
    Sys.Serialization.JavaScriptSerializer._escapeChars["\\"] = "\\\\";
    Sys.Serialization.JavaScriptSerializer._charsToEscape[1] = '"';
    Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs['"'] = new RegExp('"', "g");
    Sys.Serialization.JavaScriptSerializer._escapeChars['"'] = '\\"';
    for (var a = 0; a < 32; a++) {
        var b = String.fromCharCode(a);
        Sys.Serialization.JavaScriptSerializer._charsToEscape[a + 2] = b;
        Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b] = new RegExp(b, "g");
        Sys.Serialization.JavaScriptSerializer._escapeChars[b] = c[a]
    }
};
Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder = function (b, a) {
    a.append(b.toString())
};
Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder = function (a, b) {
    if (isFinite(a)) b.append(String(a));
    else throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers)
};
Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder = function (a, c) {
    c.append('"');
    if (Sys.Serialization.JavaScriptSerializer._escapeRegEx.test(a)) {
        if (Sys.Serialization.JavaScriptSerializer._charsToEscape.length === 0) Sys.Serialization.JavaScriptSerializer._init();
        if (a.length < 128) a = a.replace(Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal, function (a) {
            return Sys.Serialization.JavaScriptSerializer._escapeChars[a]
        });
        else for (var d = 0; d < 34; d++) {
            var b = Sys.Serialization.JavaScriptSerializer._charsToEscape[d];
            if (a.indexOf(b) !== -1) if (Sys.Browser.agent === Sys.Browser.Opera || Sys.Browser.agent === Sys.Browser.FireFox) a = a.split(b).join(Sys.Serialization.JavaScriptSerializer._escapeChars[b]);
            else a = a.replace(Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b], Sys.Serialization.JavaScriptSerializer._escapeChars[b])
        }
    }
    c.append(a);
    c.append('"')
};
Sys.Serialization.JavaScriptSerializer._serializeWithBuilder = function (b, a, i, g) {
    var c;
    switch (typeof b) {
        case "object":
            if (b) if (Number.isInstanceOfType(b)) Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b, a);
            else if (Boolean.isInstanceOfType(b)) Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b, a);
            else if (String.isInstanceOfType(b)) Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b, a);
            else if (Array.isInstanceOfType(b)) {
                a.append("[");
                for (c = 0; c < b.length; ++c) {
                    if (c > 0) a.append(",");
                    Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b[c], a, false, g)
                }
                a.append("]")
            } else {
                if (Date.isInstanceOfType(b)) {
                    a.append('"\\/Date(');
                    a.append(b.getTime());
                    a.append(')\\/"');
                    break
                }
                var d = [],
                    f = 0;
                for (var e in b) {
                    if (e.startsWith("$")) continue;
                    if (e === Sys.Serialization.JavaScriptSerializer._serverTypeFieldName && f !== 0) {
                        d[f++] = d[0];
                        d[0] = e
                    } else d[f++] = e
                }
                if (i) d.sort();
                a.append("{");
                var j = false;
                for (c = 0; c < f; c++) {
                    var h = b[d[c]];
                    if (typeof h !== "undefined" && typeof h !== "function") {
                        if (j) a.append(",");
                        else j = true;
                        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(d[c], a, i, g);
                        a.append(":");
                        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(h, a, i, g)
                    }
                }
                a.append("}")
            } else a.append("null");
            break;
        case "number":
            Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b, a);
            break;
        case "string":
            Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b, a);
            break;
        case "boolean":
            Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b, a);
            break;
        default:
            a.append("null")
    }
};
Sys.Serialization.JavaScriptSerializer.serialize = function (b) {
    var a = new Sys.StringBuilder;
    Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b, a, false);
    return a.toString()
};
Sys.Serialization.JavaScriptSerializer.deserialize = function (data, secure) {
    if (data.length === 0) throw Error.argument("data", Sys.Res.cannotDeserializeEmptyString);
    try {
        var exp = data.replace(Sys.Serialization.JavaScriptSerializer._dateRegEx, "$1new Date($2)");
        if (secure && Sys.Serialization.JavaScriptSerializer._jsonRegEx.test(exp.replace(Sys.Serialization.JavaScriptSerializer._jsonStringRegEx, ""))) throw null;
        return eval("(" + exp + ")")
    } catch (a) {
        throw Error.argument("data", Sys.Res.cannotDeserializeInvalidJson)
    }
};
Type.registerNamespace("Sys.UI");
Sys.EventHandlerList = function () {
    this._list = {}
};
Sys.EventHandlerList.prototype = {
    _addHandler: function (b, a) {
        Array.add(this._getEvent(b, true), a)
    },
    addHandler: function (b, a) {
        this._addHandler(b, a)
    },
    _removeHandler: function (c, b) {
        var a = this._getEvent(c);
        if (!a) return;
        Array.remove(a, b)
    },
    removeHandler: function (b, a) {
        this._removeHandler(b, a)
    },
    getHandler: function (b) {
        var a = this._getEvent(b);
        if (!a || a.length === 0) return null;
        a = Array.clone(a);
        return function (c, d) {
            for (var b = 0, e = a.length; b < e; b++) a[b](c, d)
        }
    },
    _getEvent: function (a, b) {
        if (!this._list[a]) {
            if (!b) return null;
            this._list[a] = []
        }
        return this._list[a]
    }
};
Sys.EventHandlerList.registerClass("Sys.EventHandlerList");
Sys.CommandEventArgs = function (c, a, b) {
    Sys.CommandEventArgs.initializeBase(this);
    this._commandName = c;
    this._commandArgument = a;
    this._commandSource = b
};
Sys.CommandEventArgs.prototype = {
    _commandName: null,
    _commandArgument: null,
    _commandSource: null,
    get_commandName: function () {
        return this._commandName
    },
    get_commandArgument: function () {
        return this._commandArgument
    },
    get_commandSource: function () {
        return this._commandSource
    }
};
Sys.CommandEventArgs.registerClass("Sys.CommandEventArgs", Sys.CancelEventArgs);
Sys.INotifyPropertyChange = function () {};
Sys.INotifyPropertyChange.prototype = {};
Sys.INotifyPropertyChange.registerInterface("Sys.INotifyPropertyChange");
Sys.PropertyChangedEventArgs = function (a) {
    Sys.PropertyChangedEventArgs.initializeBase(this);
    this._propertyName = a
};
Sys.PropertyChangedEventArgs.prototype = {
    get_propertyName: function () {
        return this._propertyName
    }
};
Sys.PropertyChangedEventArgs.registerClass("Sys.PropertyChangedEventArgs", Sys.EventArgs);
Sys.INotifyDisposing = function () {};
Sys.INotifyDisposing.prototype = {};
Sys.INotifyDisposing.registerInterface("Sys.INotifyDisposing");
Sys.Component = function () {
    if (Sys.Application) Sys.Application.registerDisposableObject(this)
};
Sys.Component.prototype = {
    _id: null,
    _initialized: false,
    _updating: false,
    get_events: function () {
        if (!this._events) this._events = new Sys.EventHandlerList;
        return this._events
    },
    get_id: function () {
        return this._id
    },
    set_id: function (a) {
        this._id = a
    },
    get_isInitialized: function () {
        return this._initialized
    },
    get_isUpdating: function () {
        return this._updating
    },
    add_disposing: function (a) {
        this.get_events().addHandler("disposing", a)
    },
    remove_disposing: function (a) {
        this.get_events().removeHandler("disposing", a)
    },
    add_propertyChanged: function (a) {
        this.get_events().addHandler("propertyChanged", a)
    },
    remove_propertyChanged: function (a) {
        this.get_events().removeHandler("propertyChanged", a)
    },
    beginUpdate: function () {
        this._updating = true
    },
    dispose: function () {
        if (this._events) {
            var a = this._events.getHandler("disposing");
            if (a) a(this, Sys.EventArgs.Empty)
        }
        delete this._events;
        Sys.Application.unregisterDisposableObject(this);
        Sys.Application.removeComponent(this)
    },
    endUpdate: function () {
        this._updating = false;
        if (!this._initialized) this.initialize();
        this.updated()
    },
    initialize: function () {
        this._initialized = true
    },
    raisePropertyChanged: function (b) {
        if (!this._events) return;
        var a = this._events.getHandler("propertyChanged");
        if (a) a(this, new Sys.PropertyChangedEventArgs(b))
    },
    updated: function () {}
};
Sys.Component.registerClass("Sys.Component", null, Sys.IDisposable, Sys.INotifyPropertyChange, Sys.INotifyDisposing);

function Sys$Component$_setProperties(a, i) {
    var d, j = Object.getType(a),
        e = j === Object || j === Sys.UI.DomElement,
        h = Sys.Component.isInstanceOfType(a) && !a.get_isUpdating();
    if (h) a.beginUpdate();
    for (var c in i) {
        var b = i[c],
            f = e ? null : a["get_" + c];
        if (e || typeof f !== "function") {
            var k = a[c];
            if (!b || typeof b !== "object" || e && !k) a[c] = b;
            else Sys$Component$_setProperties(k, b)
        } else {
            var l = a["set_" + c];
            if (typeof l === "function") l.apply(a, [b]);
            else if (b instanceof Array) {
                d = f.apply(a);
                for (var g = 0, m = d.length, n = b.length; g < n; g++, m++) d[m] = b[g]
            } else if (typeof b === "object" && Object.getType(b) === Object) {
                d = f.apply(a);
                Sys$Component$_setProperties(d, b)
            }
        }
    }
    if (h) a.endUpdate()
}
function Sys$Component$_setReferences(c, b) {
    for (var a in b) {
        var e = c["set_" + a],
            d = $find(b[a]);
        e.apply(c, [d])
    }
}
var $create = Sys.Component.create = function (h, f, d, c, g) {
    var a = g ? new h(g) : new h,
        b = Sys.Application,
        i = b.get_isCreatingComponents();
    a.beginUpdate();
    if (f) Sys$Component$_setProperties(a, f);
    if (d) for (var e in d) a["add_" + e](d[e]);
    if (a.get_id()) b.addComponent(a);
    if (i) {
        b._createdComponents[b._createdComponents.length] = a;
        if (c) b._addComponentToSecondPass(a, c);
        else a.endUpdate()
    } else {
        if (c) Sys$Component$_setReferences(a, c);
        a.endUpdate()
    }
    return a
};
Sys.UI.MouseButton = function () {
    throw Error.notImplemented()
};
Sys.UI.MouseButton.prototype = {
    leftButton: 0,
    middleButton: 1,
    rightButton: 2
};
Sys.UI.MouseButton.registerEnum("Sys.UI.MouseButton");
Sys.UI.Key = function () {
    throw Error.notImplemented()
};
Sys.UI.Key.prototype = {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 127
};
Sys.UI.Key.registerEnum("Sys.UI.Key");
Sys.UI.Point = function (a, b) {
    this.x = a;
    this.y = b
};
Sys.UI.Point.registerClass("Sys.UI.Point");
Sys.UI.Bounds = function (c, d, b, a) {
    this.x = c;
    this.y = d;
    this.height = a;
    this.width = b
};
Sys.UI.Bounds.registerClass("Sys.UI.Bounds");
Sys.UI.DomEvent = function (e) {
    var a = e,
        b = this.type = a.type.toLowerCase();
    this.rawEvent = a;
    this.altKey = a.altKey;
    if (typeof a.button !== "undefined") this.button = typeof a.which !== "undefined" ? a.button : a.button === 4 ? Sys.UI.MouseButton.middleButton : a.button === 2 ? Sys.UI.MouseButton.rightButton : Sys.UI.MouseButton.leftButton;
    if (b === "keypress") this.charCode = a.charCode || a.keyCode;
    else if (a.keyCode && a.keyCode === 46) this.keyCode = 127;
    else this.keyCode = a.keyCode;
    this.clientX = a.clientX;
    this.clientY = a.clientY;
    this.ctrlKey = a.ctrlKey;
    this.target = a.target ? a.target : a.srcElement;
    if (!b.startsWith("key")) if (typeof a.offsetX !== "undefined" && typeof a.offsetY !== "undefined") {
        this.offsetX = a.offsetX;
        this.offsetY = a.offsetY
    } else if (this.target && this.target.nodeType !== 3 && typeof a.clientX === "number") {
        var c = Sys.UI.DomElement.getLocation(this.target),
            d = Sys.UI.DomElement._getWindow(this.target);
        this.offsetX = (d.pageXOffset || 0) + a.clientX - c.x;
        this.offsetY = (d.pageYOffset || 0) + a.clientY - c.y
    }
    this.screenX = a.screenX;
    this.screenY = a.screenY;
    this.shiftKey = a.shiftKey
};
Sys.UI.DomEvent.prototype = {
    preventDefault: function () {
        if (this.rawEvent.preventDefault) this.rawEvent.preventDefault();
        else if (window.event) this.rawEvent.returnValue = false
    },
    stopPropagation: function () {
        if (this.rawEvent.stopPropagation) this.rawEvent.stopPropagation();
        else if (window.event) this.rawEvent.cancelBubble = true
    }
};
Sys.UI.DomEvent.registerClass("Sys.UI.DomEvent");
var $addHandler = Sys.UI.DomEvent.addHandler = function (a, d, e, g) {
    if (!a._events) a._events = {};
    var c = a._events[d];
    if (!c) a._events[d] = c = [];
    var b;
    if (a.addEventListener) {
        b = function (b) {
            return e.call(a, new Sys.UI.DomEvent(b))
        };
        a.addEventListener(d, b, false)
    } else if (a.attachEvent) {
        b = function () {
            var b = {};
            try {
                b = Sys.UI.DomElement._getWindow(a).event
            } catch (c) {}
            return e.call(a, new Sys.UI.DomEvent(b))
        };
        a.attachEvent("on" + d, b)
    }
    c[c.length] = {
        handler: e,
        browserHandler: b,
        autoRemove: g
    };
    if (g) {
        var f = a.dispose;
        if (f !== Sys.UI.DomEvent._disposeHandlers) {
            a.dispose = Sys.UI.DomEvent._disposeHandlers;
            if (typeof f !== "undefined") a._chainDispose = f
        }
    }
}, $addHandlers = Sys.UI.DomEvent.addHandlers = function (f, d, c, e) {
    for (var b in d) {
        var a = d[b];
        if (c) a = Function.createDelegate(c, a);
        $addHandler(f, b, a, e || false)
    }
}, $clearHandlers = Sys.UI.DomEvent.clearHandlers = function (a) {
    Sys.UI.DomEvent._clearHandlers(a, false)
};
Sys.UI.DomEvent._clearHandlers = function (a, g) {
    if (a._events) {
        var e = a._events;
        for (var b in e) {
            var d = e[b];
            for (var c = d.length - 1; c >= 0; c--) {
                var f = d[c];
                if (!g || f.autoRemove) $removeHandler(a, b, f.handler)
            }
        }
        a._events = null
    }
};
Sys.UI.DomEvent._disposeHandlers = function () {
    Sys.UI.DomEvent._clearHandlers(this, true);
    var b = this._chainDispose,
        a = typeof b;
    if (a !== "undefined") {
        this.dispose = b;
        this._chainDispose = null;
        if (a === "function") this.dispose()
    }
};
var $removeHandler = Sys.UI.DomEvent.removeHandler = function (b, a, c) {
    Sys.UI.DomEvent._removeHandler(b, a, c)
};
Sys.UI.DomEvent._removeHandler = function (a, e, f) {
    var d = null,
        c = a._events[e];
    for (var b = 0, g = c.length; b < g; b++) if (c[b].handler === f) {
        d = c[b].browserHandler;
        break
    }
    if (a.removeEventListener) a.removeEventListener(e, d, false);
    else if (a.detachEvent) a.detachEvent("on" + e, d);
    c.splice(b, 1)
};
Sys.UI.DomElement = function () {};
Sys.UI.DomElement.registerClass("Sys.UI.DomElement");
Sys.UI.DomElement.addCssClass = function (a, b) {
    if (!Sys.UI.DomElement.containsCssClass(a, b)) if (a.className === "") a.className = b;
    else a.className += " " + b
};
Sys.UI.DomElement.containsCssClass = function (b, a) {
    return Array.contains(b.className.split(" "), a)
};
Sys.UI.DomElement.getBounds = function (a) {
    var b = Sys.UI.DomElement.getLocation(a);
    return new Sys.UI.Bounds(b.x, b.y, a.offsetWidth || 0, a.offsetHeight || 0)
};
var $get = Sys.UI.DomElement.getElementById = function (f, e) {
    if (!e) return document.getElementById(f);
    if (e.getElementById) return e.getElementById(f);
    var c = [],
        d = e.childNodes;
    for (var b = 0; b < d.length; b++) {
        var a = d[b];
        if (a.nodeType == 1) c[c.length] = a
    }
    while (c.length) {
        a = c.shift();
        if (a.id == f) return a;
        d = a.childNodes;
        for (b = 0; b < d.length; b++) {
            a = d[b];
            if (a.nodeType == 1) c[c.length] = a
        }
    }
    return null
};
if (document.documentElement.getBoundingClientRect) Sys.UI.DomElement.getLocation = function (b) {
    if (b.self || b.nodeType === 9 || b === document.documentElement || b.parentNode === b.ownerDocument.documentElement) return new Sys.UI.Point(0, 0);
    var f = b.getBoundingClientRect();
    if (!f) return new Sys.UI.Point(0, 0);
    var k, e = b.ownerDocument.documentElement,
        c = Math.round(f.left) + e.scrollLeft,
        d = Math.round(f.top) + e.scrollTop;
    if (Sys.Browser.agent === Sys.Browser.InternetExplorer) {
        try {
            var g = b.ownerDocument.parentWindow.frameElement || null;
            if (g) {
                var h = g.frameBorder === "0" || g.frameBorder === "no" ? 2 : 0;
                c += h;
                d += h
            }
        } catch (l) {}
        if (Sys.Browser.version === 7 && !document.documentMode) {
            var i = document.body,
                j = i.getBoundingClientRect(),
                a = (j.right - j.left) / i.clientWidth;
            a = Math.round(a * 100);
            a = (a - a % 5) / 100;
            if (!isNaN(a) && a !== 1) {
                c = Math.round(c / a);
                d = Math.round(d / a)
            }
        }
        if ((document.documentMode || 0) < 8) {
            c -= e.clientLeft;
            d -= e.clientTop
        }
    }
    return new Sys.UI.Point(c, d)
};
else if (Sys.Browser.agent === Sys.Browser.Safari) Sys.UI.DomElement.getLocation = function (c) {
    if (c.window && c.window === c || c.nodeType === 9) return new Sys.UI.Point(0, 0);
    var d = 0,
        e = 0,
        a, j = null,
        g = null,
        b;
    for (a = c; a; j = a, (g = b, a = a.offsetParent)) {
        b = Sys.UI.DomElement._getCurrentStyle(a);
        var f = a.tagName ? a.tagName.toUpperCase() : null;
        if ((a.offsetLeft || a.offsetTop) && (f !== "BODY" || (!g || g.position !== "absolute"))) {
            d += a.offsetLeft;
            e += a.offsetTop
        }
        if (j && Sys.Browser.version >= 3) {
            d += parseInt(b.borderLeftWidth);
            e += parseInt(b.borderTopWidth)
        }
    }
    b = Sys.UI.DomElement._getCurrentStyle(c);
    var h = b ? b.position : null;
    if (!h || h !== "absolute") for (a = c.parentNode; a; a = a.parentNode) {
        f = a.tagName ? a.tagName.toUpperCase() : null;
        if (f !== "BODY" && f !== "HTML" && (a.scrollLeft || a.scrollTop)) {
            d -= a.scrollLeft || 0;
            e -= a.scrollTop || 0
        }
        b = Sys.UI.DomElement._getCurrentStyle(a);
        var i = b ? b.position : null;
        if (i && i === "absolute") break
    }
    return new Sys.UI.Point(d, e)
};
else Sys.UI.DomElement.getLocation = function (d) {
    if (d.window && d.window === d || d.nodeType === 9) return new Sys.UI.Point(0, 0);
    var e = 0,
        f = 0,
        a, i = null,
        g = null,
        b = null;
    for (a = d; a; i = a, (g = b, a = a.offsetParent)) {
        var c = a.tagName ? a.tagName.toUpperCase() : null;
        b = Sys.UI.DomElement._getCurrentStyle(a);
        if ((a.offsetLeft || a.offsetTop) && !(c === "BODY" && (!g || g.position !== "absolute"))) {
            e += a.offsetLeft;
            f += a.offsetTop
        }
        if (i !== null && b) {
            if (c !== "TABLE" && c !== "TD" && c !== "HTML") {
                e += parseInt(b.borderLeftWidth) || 0;
                f += parseInt(b.borderTopWidth) || 0
            }
            if (c === "TABLE" && (b.position === "relative" || b.position === "absolute")) {
                e += parseInt(b.marginLeft) || 0;
                f += parseInt(b.marginTop) || 0
            }
        }
    }
    b = Sys.UI.DomElement._getCurrentStyle(d);
    var h = b ? b.position : null;
    if (!h || h !== "absolute") for (a = d.parentNode; a; a = a.parentNode) {
        c = a.tagName ? a.tagName.toUpperCase() : null;
        if (c !== "BODY" && c !== "HTML" && (a.scrollLeft || a.scrollTop)) {
            e -= a.scrollLeft || 0;
            f -= a.scrollTop || 0;
            b = Sys.UI.DomElement._getCurrentStyle(a);
            if (b) {
                e += parseInt(b.borderLeftWidth) || 0;
                f += parseInt(b.borderTopWidth) || 0
            }
        }
    }
    return new Sys.UI.Point(e, f)
};
Sys.UI.DomElement.isDomElement = function (a) {
    return Sys._isDomElement(a)
};
Sys.UI.DomElement.removeCssClass = function (d, c) {
    var a = " " + d.className + " ",
        b = a.indexOf(" " + c + " ");
    if (b >= 0) d.className = (a.substr(0, b) + " " + a.substring(b + c.length + 1, a.length)).trim()
};
Sys.UI.DomElement.resolveElement = function (b, c) {
    var a = b;
    if (!a) return null;
    if (typeof a === "string") a = Sys.UI.DomElement.getElementById(a, c);
    return a
};
Sys.UI.DomElement.raiseBubbleEvent = function (c, d) {
    var b = c;
    while (b) {
        var a = b.control;
        if (a && a.onBubbleEvent && a.raiseBubbleEvent) {
            Sys.UI.DomElement._raiseBubbleEventFromControl(a, c, d);
            return
        }
        b = b.parentNode
    }
};
Sys.UI.DomElement._raiseBubbleEventFromControl = function (a, b, c) {
    if (!a.onBubbleEvent(b, c)) a._raiseBubbleEvent(b, c)
};
Sys.UI.DomElement.setLocation = function (b, c, d) {
    var a = b.style;
    a.position = "absolute";
    a.left = c + "px";
    a.top = d + "px"
};
Sys.UI.DomElement.toggleCssClass = function (b, a) {
    if (Sys.UI.DomElement.containsCssClass(b, a)) Sys.UI.DomElement.removeCssClass(b, a);
    else Sys.UI.DomElement.addCssClass(b, a)
};
Sys.UI.DomElement.getVisibilityMode = function (a) {
    return a._visibilityMode === Sys.UI.VisibilityMode.hide ? Sys.UI.VisibilityMode.hide : Sys.UI.VisibilityMode.collapse
};
Sys.UI.DomElement.setVisibilityMode = function (a, b) {
    Sys.UI.DomElement._ensureOldDisplayMode(a);
    if (a._visibilityMode !== b) {
        a._visibilityMode = b;
        if (Sys.UI.DomElement.getVisible(a) === false) if (a._visibilityMode === Sys.UI.VisibilityMode.hide) a.style.display = a._oldDisplayMode;
        else a.style.display = "none";
        a._visibilityMode = b
    }
};
Sys.UI.DomElement.getVisible = function (b) {
    var a = b.currentStyle || Sys.UI.DomElement._getCurrentStyle(b);
    if (!a) return true;
    return a.visibility !== "hidden" && a.display !== "none"
};
Sys.UI.DomElement.setVisible = function (a, b) {
    if (b !== Sys.UI.DomElement.getVisible(a)) {
        Sys.UI.DomElement._ensureOldDisplayMode(a);
        a.style.visibility = b ? "visible" : "hidden";
        if (b || a._visibilityMode === Sys.UI.VisibilityMode.hide) a.style.display = a._oldDisplayMode;
        else a.style.display = "none"
    }
};
Sys.UI.DomElement._ensureOldDisplayMode = function (a) {
    if (!a._oldDisplayMode) {
        var b = a.currentStyle || Sys.UI.DomElement._getCurrentStyle(a);
        a._oldDisplayMode = b ? b.display : null;
        if (!a._oldDisplayMode || a._oldDisplayMode === "none") switch (a.tagName.toUpperCase()) {
            case "DIV":
            case "P":
            case "ADDRESS":
            case "BLOCKQUOTE":
            case "BODY":
            case "COL":
            case "COLGROUP":
            case "DD":
            case "DL":
            case "DT":
            case "FIELDSET":
            case "FORM":
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
            case "HR":
            case "IFRAME":
            case "LEGEND":
            case "OL":
            case "PRE":
            case "TABLE":
            case "TD":
            case "TH":
            case "TR":
            case "UL":
                a._oldDisplayMode = "block";
                break;
            case "LI":
                a._oldDisplayMode = "list-item";
                break;
            default:
                a._oldDisplayMode = "inline"
        }
    }
};
Sys.UI.DomElement._getWindow = function (a) {
    var b = a.ownerDocument || a.document || a;
    return b.defaultView || b.parentWindow
};
Sys.UI.DomElement._getCurrentStyle = function (a) {
    if (a.nodeType === 3) return null;
    var c = Sys.UI.DomElement._getWindow(a);
    if (a.documentElement) a = a.documentElement;
    var b = c && a !== c && c.getComputedStyle ? c.getComputedStyle(a, null) : a.currentStyle || a.style;
    if (!b && Sys.Browser.agent === Sys.Browser.Safari && a.style) {
        var g = a.style.display,
            f = a.style.position;
        a.style.position = "absolute";
        a.style.display = "block";
        var e = c.getComputedStyle(a, null);
        a.style.display = g;
        a.style.position = f;
        b = {};
        for (var d in e) b[d] = e[d];
        b.display = "none"
    }
    return b
};
Sys.IContainer = function () {};
Sys.IContainer.prototype = {};
Sys.IContainer.registerInterface("Sys.IContainer");
Sys.ApplicationLoadEventArgs = function (b, a) {
    Sys.ApplicationLoadEventArgs.initializeBase(this);
    this._components = b;
    this._isPartialLoad = a
};
Sys.ApplicationLoadEventArgs.prototype = {
    get_components: function () {
        return this._components
    },
    get_isPartialLoad: function () {
        return this._isPartialLoad
    }
};
Sys.ApplicationLoadEventArgs.registerClass("Sys.ApplicationLoadEventArgs", Sys.EventArgs);
Sys._Application = function () {
    Sys._Application.initializeBase(this);
    this._disposableObjects = [];
    this._components = {};
    this._createdComponents = [];
    this._secondPassComponents = [];
    this._unloadHandlerDelegate = Function.createDelegate(this, this._unloadHandler);
    Sys.UI.DomEvent.addHandler(window, "unload", this._unloadHandlerDelegate);
    this._domReady()
};
Sys._Application.prototype = {
    _creatingComponents: false,
    _disposing: false,
    _deleteCount: 0,
    get_isCreatingComponents: function () {
        return this._creatingComponents
    },
    get_isDisposing: function () {
        return this._disposing
    },
    add_init: function (a) {
        if (this._initialized) a(this, Sys.EventArgs.Empty);
        else this.get_events().addHandler("init", a)
    },
    remove_init: function (a) {
        this.get_events().removeHandler("init", a)
    },
    add_load: function (a) {
        this.get_events().addHandler("load", a)
    },
    remove_load: function (a) {
        this.get_events().removeHandler("load", a)
    },
    add_unload: function (a) {
        this.get_events().addHandler("unload", a)
    },
    remove_unload: function (a) {
        this.get_events().removeHandler("unload", a)
    },
    addComponent: function (a) {
        this._components[a.get_id()] = a
    },
    beginCreateComponents: function () {
        this._creatingComponents = true
    },
    dispose: function () {
        if (!this._disposing) {
            this._disposing = true;
            if (this._timerCookie) {
                window.clearTimeout(this._timerCookie);
                delete this._timerCookie
            }
            if (this._endRequestHandler) {
                Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(this._endRequestHandler);
                delete this._endRequestHandler
            }
            if (this._beginRequestHandler) {
                Sys.WebForms.PageRequestManager.getInstance().remove_beginRequest(this._beginRequestHandler);
                delete this._beginRequestHandler
            }
            if (window.pageUnload) window.pageUnload(this, Sys.EventArgs.Empty);
            var c = this.get_events().getHandler("unload");
            if (c) c(this, Sys.EventArgs.Empty);
            var b = Array.clone(this._disposableObjects);
            for (var a = 0, f = b.length; a < f; a++) {
                var d = b[a];
                if (typeof d !== "undefined") d.dispose()
            }
            Array.clear(this._disposableObjects);
            Sys.UI.DomEvent.removeHandler(window, "unload", this._unloadHandlerDelegate);
            if (Sys._ScriptLoader) {
                var e = Sys._ScriptLoader.getInstance();
                if (e) e.dispose()
            }
            Sys._Application.callBaseMethod(this, "dispose")
        }
    },
    disposeElement: function (c, j) {
        if (c.nodeType === 1) {
            var b, h = c.getElementsByTagName("*"),
                g = h.length,
                i = new Array(g);
            for (b = 0; b < g; b++) i[b] = h[b];
            for (b = g - 1; b >= 0; b--) {
                var d = i[b],
                    f = d.dispose;
                if (f && typeof f === "function") d.dispose();
                else {
                    var e = d.control;
                    if (e && typeof e.dispose === "function") e.dispose()
                }
                var a = d._behaviors;
                if (a) this._disposeComponents(a);
                a = d._components;
                if (a) {
                    this._disposeComponents(a);
                    d._components = null
                }
            }
            if (!j) {
                var f = c.dispose;
                if (f && typeof f === "function") c.dispose();
                else {
                    var e = c.control;
                    if (e && typeof e.dispose === "function") e.dispose()
                }
                var a = c._behaviors;
                if (a) this._disposeComponents(a);
                a = c._components;
                if (a) {
                    this._disposeComponents(a);
                    c._components = null
                }
            }
        }
    },
    endCreateComponents: function () {
        var b = this._secondPassComponents;
        for (var a = 0, d = b.length; a < d; a++) {
            var c = b[a].component;
            Sys$Component$_setReferences(c, b[a].references);
            c.endUpdate()
        }
        this._secondPassComponents = [];
        this._creatingComponents = false
    },
    findComponent: function (b, a) {
        return a ? Sys.IContainer.isInstanceOfType(a) ? a.findComponent(b) : a[b] || null : Sys.Application._components[b] || null
    },
    getComponents: function () {
        var a = [],
            b = this._components;
        for (var c in b) a[a.length] = b[c];
        return a
    },
    initialize: function () {
        if (!this.get_isInitialized() && !this._disposing) {
            Sys._Application.callBaseMethod(this, "initialize");
            this._raiseInit();
            if (this.get_stateString) {
                if (Sys.WebForms && Sys.WebForms.PageRequestManager) {
                    this._beginRequestHandler = Function.createDelegate(this, this._onPageRequestManagerBeginRequest);
                    Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(this._beginRequestHandler);
                    this._endRequestHandler = Function.createDelegate(this, this._onPageRequestManagerEndRequest);
                    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(this._endRequestHandler)
                }
                var a = this.get_stateString();
                if (a !== this._currentEntry) this._navigate(a);
                else this._ensureHistory()
            }
            this.raiseLoad()
        }
    },
    notifyScriptLoaded: function () {},
    registerDisposableObject: function (b) {
        if (!this._disposing) {
            var a = this._disposableObjects,
                c = a.length;
            a[c] = b;
            b.__msdisposeindex = c
        }
    },
    raiseLoad: function () {
        var b = this.get_events().getHandler("load"),
            a = new Sys.ApplicationLoadEventArgs(Array.clone(this._createdComponents), !! this._loaded);
        this._loaded = true;
        if (b) b(this, a);
        if (window.pageLoad) window.pageLoad(this, a);
        this._createdComponents = []
    },
    removeComponent: function (b) {
        var a = b.get_id();
        if (a) delete this._components[a]
    },
    unregisterDisposableObject: function (a) {
        if (!this._disposing) {
            var e = a.__msdisposeindex;
            if (typeof e === "number") {
                var b = this._disposableObjects;
                delete b[e];
                delete a.__msdisposeindex;
                if (++this._deleteCount > 1000) {
                    var c = [];
                    for (var d = 0, f = b.length; d < f; d++) {
                        a = b[d];
                        if (typeof a !== "undefined") {
                            a.__msdisposeindex = c.length;
                            c.push(a)
                        }
                    }
                    this._disposableObjects = c;
                    this._deleteCount = 0
                }
            }
        }
    },
    _addComponentToSecondPass: function (b, a) {
        this._secondPassComponents[this._secondPassComponents.length] = {
            component: b,
            references: a
        }
    },
    _disposeComponents: function (a) {
        if (a) for (var b = a.length - 1; b >= 0; b--) {
            var c = a[b];
            if (typeof c.dispose === "function") c.dispose()
        }
    },
    _domReady: function () {
        var a, g, f = this;

        function b() {
            f.initialize()
        }
        var c = function () {
            Sys.UI.DomEvent.removeHandler(window, "load", c);
            b()
        };
        Sys.UI.DomEvent.addHandler(window, "load", c);
        if (document.addEventListener) try {
            document.addEventListener("DOMContentLoaded", a = function () {
                document.removeEventListener("DOMContentLoaded", a, false);
                b()
            }, false)
        } catch (h) {} else if (document.attachEvent) if (window == window.top && document.documentElement.doScroll) {
            var e, d = document.createElement("div");
            a = function () {
                try {
                    d.doScroll("left")
                } catch (c) {
                    e = window.setTimeout(a, 0);
                    return
                }
                d = null;
                b()
            };
            a()
        } else document.attachEvent("onreadystatechange", a = function () {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", a);
                b()
            }
        })
    },
    _raiseInit: function () {
        var a = this.get_events().getHandler("init");
        if (a) {
            this.beginCreateComponents();
            a(this, Sys.EventArgs.Empty);
            this.endCreateComponents()
        }
    },
    _unloadHandler: function () {
        this.dispose()
    }
};
Sys._Application.registerClass("Sys._Application", Sys.Component, Sys.IContainer);
Sys.Application = new Sys._Application;
var $find = Sys.Application.findComponent;
Sys.UI.Behavior = function (b) {
    Sys.UI.Behavior.initializeBase(this);
    this._element = b;
    var a = b._behaviors;
    if (!a) b._behaviors = [this];
    else a[a.length] = this
};
Sys.UI.Behavior.prototype = {
    _name: null,
    get_element: function () {
        return this._element
    },
    get_id: function () {
        var a = Sys.UI.Behavior.callBaseMethod(this, "get_id");
        if (a) return a;
        if (!this._element || !this._element.id) return "";
        return this._element.id + "$" + this.get_name()
    },
    get_name: function () {
        if (this._name) return this._name;
        var a = Object.getTypeName(this),
            b = a.lastIndexOf(".");
        if (b !== -1) a = a.substr(b + 1);
        if (!this.get_isInitialized()) this._name = a;
        return a
    },
    set_name: function (a) {
        this._name = a
    },
    initialize: function () {
        Sys.UI.Behavior.callBaseMethod(this, "initialize");
        var a = this.get_name();
        if (a) this._element[a] = this
    },
    dispose: function () {
        Sys.UI.Behavior.callBaseMethod(this, "dispose");
        var a = this._element;
        if (a) {
            var c = this.get_name();
            if (c) a[c] = null;
            var b = a._behaviors;
            Array.remove(b, this);
            if (b.length === 0) a._behaviors = null;
            delete this._element
        }
    }
};
Sys.UI.Behavior.registerClass("Sys.UI.Behavior", Sys.Component);
Sys.UI.Behavior.getBehaviorByName = function (b, c) {
    var a = b[c];
    return a && Sys.UI.Behavior.isInstanceOfType(a) ? a : null
};
Sys.UI.Behavior.getBehaviors = function (a) {
    if (!a._behaviors) return [];
    return Array.clone(a._behaviors)
};
Sys.UI.Behavior.getBehaviorsByType = function (d, e) {
    var a = d._behaviors,
        c = [];
    if (a) for (var b = 0, f = a.length; b < f; b++) if (e.isInstanceOfType(a[b])) c[c.length] = a[b];
    return c
};
Sys.UI.VisibilityMode = function () {
    throw Error.notImplemented()
};
Sys.UI.VisibilityMode.prototype = {
    hide: 0,
    collapse: 1
};
Sys.UI.VisibilityMode.registerEnum("Sys.UI.VisibilityMode");
Sys.UI.Control = function (a) {
    Sys.UI.Control.initializeBase(this);
    this._element = a;
    a.control = this;
    var b = this.get_role();
    if (b) a.setAttribute("role", b)
};
Sys.UI.Control.prototype = {
    _parent: null,
    _visibilityMode: Sys.UI.VisibilityMode.hide,
    get_element: function () {
        return this._element
    },
    get_id: function () {
        if (!this._element) return "";
        return this._element.id
    },
    set_id: function () {
        throw Error.invalidOperation(Sys.Res.cantSetId)
    },
    get_parent: function () {
        if (this._parent) return this._parent;
        if (!this._element) return null;
        var a = this._element.parentNode;
        while (a) {
            if (a.control) return a.control;
            a = a.parentNode
        }
        return null
    },
    set_parent: function (a) {
        this._parent = a
    },
    get_role: function () {
        return null
    },
    get_visibilityMode: function () {
        return Sys.UI.DomElement.getVisibilityMode(this._element)
    },
    set_visibilityMode: function (a) {
        Sys.UI.DomElement.setVisibilityMode(this._element, a)
    },
    get_visible: function () {
        return Sys.UI.DomElement.getVisible(this._element)
    },
    set_visible: function (a) {
        Sys.UI.DomElement.setVisible(this._element, a)
    },
    addCssClass: function (a) {
        Sys.UI.DomElement.addCssClass(this._element, a)
    },
    dispose: function () {
        Sys.UI.Control.callBaseMethod(this, "dispose");
        if (this._element) {
            this._element.control = null;
            delete this._element
        }
        if (this._parent) delete this._parent
    },
    onBubbleEvent: function () {
        return false
    },
    raiseBubbleEvent: function (a, b) {
        this._raiseBubbleEvent(a, b)
    },
    _raiseBubbleEvent: function (b, c) {
        var a = this.get_parent();
        while (a) {
            if (a.onBubbleEvent(b, c)) return;
            a = a.get_parent()
        }
    },
    removeCssClass: function (a) {
        Sys.UI.DomElement.removeCssClass(this._element, a)
    },
    toggleCssClass: function (a) {
        Sys.UI.DomElement.toggleCssClass(this._element, a)
    }
};
Sys.UI.Control.registerClass("Sys.UI.Control", Sys.Component);
Sys.HistoryEventArgs = function (a) {
    Sys.HistoryEventArgs.initializeBase(this);
    this._state = a
};
Sys.HistoryEventArgs.prototype = {
    get_state: function () {
        return this._state
    }
};
Sys.HistoryEventArgs.registerClass("Sys.HistoryEventArgs", Sys.EventArgs);
Sys.Application._appLoadHandler = null;
Sys.Application._beginRequestHandler = null;
Sys.Application._clientId = null;
Sys.Application._currentEntry = "";
Sys.Application._endRequestHandler = null;
Sys.Application._history = null;
Sys.Application._enableHistory = false;
Sys.Application._historyFrame = null;
Sys.Application._historyInitialized = false;
Sys.Application._historyPointIsNew = false;
Sys.Application._ignoreTimer = false;
Sys.Application._initialState = null;
Sys.Application._state = {};
Sys.Application._timerCookie = 0;
Sys.Application._timerHandler = null;
Sys.Application._uniqueId = null;
Sys._Application.prototype.get_stateString = function () {
    var a = null;
    if (Sys.Browser.agent === Sys.Browser.Firefox) {
        var c = window.location.href,
            b = c.indexOf("#");
        if (b !== -1) a = c.substring(b + 1);
        else a = "";
        return a
    } else a = window.location.hash;
    if (a.length > 0 && a.charAt(0) === "#") a = a.substring(1);
    return a
};
Sys._Application.prototype.get_enableHistory = function () {
    return this._enableHistory
};
Sys._Application.prototype.set_enableHistory = function (a) {
    this._enableHistory = a
};
Sys._Application.prototype.add_navigate = function (a) {
    this.get_events().addHandler("navigate", a)
};
Sys._Application.prototype.remove_navigate = function (a) {
    this.get_events().removeHandler("navigate", a)
};
Sys._Application.prototype.addHistoryPoint = function (c, f) {
    this._ensureHistory();
    var b = this._state;
    for (var a in c) {
        var d = c[a];
        if (d === null) {
            if (typeof b[a] !== "undefined") delete b[a]
        } else b[a] = d
    }
    var e = this._serializeState(b);
    this._historyPointIsNew = true;
    this._setState(e, f);
    this._raiseNavigate()
};
Sys._Application.prototype.setServerId = function (a, b) {
    this._clientId = a;
    this._uniqueId = b
};
Sys._Application.prototype.setServerState = function (a) {
    this._ensureHistory();
    this._state.__s = a;
    this._updateHiddenField(a)
};
Sys._Application.prototype._deserializeState = function (a) {
    var e = {};
    a = a || "";
    var b = a.indexOf("&&");
    if (b !== -1 && b + 2 < a.length) {
        e.__s = a.substr(b + 2);
        a = a.substr(0, b)
    }
    var g = a.split("&");
    for (var f = 0, j = g.length; f < j; f++) {
        var d = g[f],
            c = d.indexOf("=");
        if (c !== -1 && c + 1 < d.length) {
            var i = d.substr(0, c),
                h = d.substr(c + 1);
            e[i] = decodeURIComponent(h)
        }
    }
    return e
};
Sys._Application.prototype._enableHistoryInScriptManager = function () {
    this._enableHistory = true
};
Sys._Application.prototype._ensureHistory = function () {
    if (!this._historyInitialized && this._enableHistory) {
        if (Sys.Browser.agent === Sys.Browser.InternetExplorer && Sys.Browser.documentMode < 8) {
            this._historyFrame = document.getElementById("__historyFrame");
            this._ignoreIFrame = true
        }
        this._timerHandler = Function.createDelegate(this, this._onIdle);
        this._timerCookie = window.setTimeout(this._timerHandler, 100);
        try {
            this._initialState = this._deserializeState(this.get_stateString())
        } catch (a) {}
        this._historyInitialized = true
    }
};
Sys._Application.prototype._navigate = function (c) {
    this._ensureHistory();
    var b = this._deserializeState(c);
    if (this._uniqueId) {
        var d = this._state.__s || "",
            a = b.__s || "";
        if (a !== d) {
            this._updateHiddenField(a);
            __doPostBack(this._uniqueId, a);
            this._state = b;
            return
        }
    }
    this._setState(c);
    this._state = b;
    this._raiseNavigate()
};
Sys._Application.prototype._onIdle = function () {
    delete this._timerCookie;
    var a = this.get_stateString();
    if (a !== this._currentEntry) {
        if (!this._ignoreTimer) {
            this._historyPointIsNew = false;
            this._navigate(a)
        }
    } else this._ignoreTimer = false;
    this._timerCookie = window.setTimeout(this._timerHandler, 100)
};
Sys._Application.prototype._onIFrameLoad = function (a) {
    this._ensureHistory();
    if (!this._ignoreIFrame) {
        this._historyPointIsNew = false;
        this._navigate(a)
    }
    this._ignoreIFrame = false
};
Sys._Application.prototype._onPageRequestManagerBeginRequest = function () {
    this._ignoreTimer = true;
    this._originalTitle = document.title
};
Sys._Application.prototype._onPageRequestManagerEndRequest = function (g, f) {
    var d = f.get_dataItems()[this._clientId],
        c = this._originalTitle;
    this._originalTitle = null;
    var b = document.getElementById("__EVENTTARGET");
    if (b && b.value === this._uniqueId) b.value = "";
    if (typeof d !== "undefined") {
        this.setServerState(d);
        this._historyPointIsNew = true
    } else this._ignoreTimer = false;
    var a = this._serializeState(this._state);
    if (a !== this._currentEntry) {
        this._ignoreTimer = true;
        if (typeof c === "string") {
            if (Sys.Browser.agent !== Sys.Browser.InternetExplorer || Sys.Browser.version > 7) {
                var e = document.title;
                document.title = c;
                this._setState(a);
                document.title = e
            } else this._setState(a);
            this._raiseNavigate()
        } else {
            this._setState(a);
            this._raiseNavigate()
        }
    }
};
Sys._Application.prototype._raiseNavigate = function () {
    var d = this._historyPointIsNew,
        c = this.get_events().getHandler("navigate"),
        b = {};
    for (var a in this._state) if (a !== "__s") b[a] = this._state[a];
    var e = new Sys.HistoryEventArgs(b);
    if (c) c(this, e);
    if (!d) {
        var f;
        try {
            if (Sys.Browser.agent === Sys.Browser.Firefox && window.location.hash && (!window.frameElement || window.top.location.hash)) Sys.Browser.version < 3.5 ? window.history.go(0) : (location.hash = this.get_stateString())
        } catch (g) {}
    }
};
Sys._Application.prototype._serializeState = function (d) {
    var b = [];
    for (var a in d) {
        var e = d[a];
        if (a === "__s") var c = e;
        else b[b.length] = a + "=" + encodeURIComponent(e)
    }
    return b.join("&") + (c ? "&&" + c : "")
};
Sys._Application.prototype._setState = function (a, b) {
    if (this._enableHistory) {
        a = a || "";
        if (a !== this._currentEntry) {
            if (window.theForm) {
                var d = window.theForm.action,
                    e = d.indexOf("#");
                window.theForm.action = (e !== -1 ? d.substring(0, e) : d) + "#" + a
            }
            if (this._historyFrame && this._historyPointIsNew) {
                this._ignoreIFrame = true;
                var c = this._historyFrame.contentWindow.document;
                c.open("javascript:'<html></html>'");
                c.write("<html><head><title>" + (b || document.title) + "</title><scri" + 'pt type="text/javascript">parent.Sys.Application._onIFrameLoad(' + Sys.Serialization.JavaScriptSerializer.serialize(a) + ");</scri" + "pt></head><body></body></html>");
                c.close()
            }
            this._ignoreTimer = false;
            this._currentEntry = a;
            if (this._historyFrame || this._historyPointIsNew) {
                var f = this.get_stateString();
                if (a !== f) {
                    window.location.hash = a;
                    this._currentEntry = this.get_stateString();
                    if (typeof b !== "undefined" && b !== null) document.title = b
                }
            }
            this._historyPointIsNew = false
        }
    }
};
Sys._Application.prototype._updateHiddenField = function (b) {
    if (this._clientId) {
        var a = document.getElementById(this._clientId);
        if (a) a.value = b
    }
};
if (!window.XMLHttpRequest) window.XMLHttpRequest = function () {
    var b = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP"];
    for (var a = 0, c = b.length; a < c; a++) try {
        return new ActiveXObject(b[a])
    } catch (d) {}
    return null
};
Type.registerNamespace("Sys.Net");
Sys.Net.WebRequestExecutor = function () {
    this._webRequest = null;
    this._resultObject = null
};
Sys.Net.WebRequestExecutor.prototype = {
    get_webRequest: function () {
        return this._webRequest
    },
    _set_webRequest: function (a) {
        this._webRequest = a
    },
    get_started: function () {
        throw Error.notImplemented()
    },
    get_responseAvailable: function () {
        throw Error.notImplemented()
    },
    get_timedOut: function () {
        throw Error.notImplemented()
    },
    get_aborted: function () {
        throw Error.notImplemented()
    },
    get_responseData: function () {
        throw Error.notImplemented()
    },
    get_statusCode: function () {
        throw Error.notImplemented()
    },
    get_statusText: function () {
        throw Error.notImplemented()
    },
    get_xml: function () {
        throw Error.notImplemented()
    },
    get_object: function () {
        if (!this._resultObject) this._resultObject = Sys.Serialization.JavaScriptSerializer.deserialize(this.get_responseData());
        return this._resultObject
    },
    executeRequest: function () {
        throw Error.notImplemented()
    },
    abort: function () {
        throw Error.notImplemented()
    },
    getResponseHeader: function () {
        throw Error.notImplemented()
    },
    getAllResponseHeaders: function () {
        throw Error.notImplemented()
    }
};
Sys.Net.WebRequestExecutor.registerClass("Sys.Net.WebRequestExecutor");
Sys.Net.XMLDOM = function (d) {
    if (!window.DOMParser) {
        var c = ["Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument"];
        for (var b = 0, f = c.length; b < f; b++) try {
            var a = new ActiveXObject(c[b]);
            a.async = false;
            a.loadXML(d);
            a.setProperty("SelectionLanguage", "XPath");
            return a
        } catch (g) {}
    } else try {
        var e = new window.DOMParser;
        return e.parseFromString(d, "text/xml")
    } catch (g) {}
    return null
};
Sys.Net.XMLHttpExecutor = function () {
    Sys.Net.XMLHttpExecutor.initializeBase(this);
    var a = this;
    this._xmlHttpRequest = null;
    this._webRequest = null;
    this._responseAvailable = false;
    this._timedOut = false;
    this._timer = null;
    this._aborted = false;
    this._started = false;
    this._onReadyStateChange = function () {
        if (a._xmlHttpRequest.readyState === 4) {
            try {
                if (typeof a._xmlHttpRequest.status === "undefined") return
            } catch (b) {
                return
            }
            a._clearTimer();
            a._responseAvailable = true;
            try {
                a._webRequest.completed(Sys.EventArgs.Empty)
            } finally {
                if (a._xmlHttpRequest != null) {
                    a._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
                    a._xmlHttpRequest = null
                }
            }
        }
    };
    this._clearTimer = function () {
        if (a._timer != null) {
            window.clearTimeout(a._timer);
            a._timer = null
        }
    };
    this._onTimeout = function () {
        if (!a._responseAvailable) {
            a._clearTimer();
            a._timedOut = true;
            a._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
            a._xmlHttpRequest.abort();
            a._webRequest.completed(Sys.EventArgs.Empty);
            a._xmlHttpRequest = null
        }
    }
};
Sys.Net.XMLHttpExecutor.prototype = {
    get_timedOut: function () {
        return this._timedOut
    },
    get_started: function () {
        return this._started
    },
    get_responseAvailable: function () {
        return this._responseAvailable
    },
    get_aborted: function () {
        return this._aborted
    },
    executeRequest: function () {
        this._webRequest = this.get_webRequest();
        var c = this._webRequest.get_body(),
            a = this._webRequest.get_headers();
        this._xmlHttpRequest = new XMLHttpRequest;
        this._xmlHttpRequest.onreadystatechange = this._onReadyStateChange;
        var e = this._webRequest.get_httpVerb();
        this._xmlHttpRequest.open(e, this._webRequest.getResolvedUrl(), true);
        this._xmlHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (a) for (var b in a) {
            var f = a[b];
            if (typeof f !== "function") this._xmlHttpRequest.setRequestHeader(b, f)
        }
        if (e.toLowerCase() === "post") {
            if (a === null || !a["Content-Type"]) this._xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            if (!c) c = ""
        }
        var d = this._webRequest.get_timeout();
        if (d > 0) this._timer = window.setTimeout(Function.createDelegate(this, this._onTimeout), d);
        this._xmlHttpRequest.send(c);
        this._started = true
    },
    getResponseHeader: function (b) {
        var a;
        try {
            a = this._xmlHttpRequest.getResponseHeader(b)
        } catch (c) {}
        if (!a) a = "";
        return a
    },
    getAllResponseHeaders: function () {
        return this._xmlHttpRequest.getAllResponseHeaders()
    },
    get_responseData: function () {
        return this._xmlHttpRequest.responseText
    },
    get_statusCode: function () {
        var a = 0;
        try {
            a = this._xmlHttpRequest.status
        } catch (b) {}
        return a
    },
    get_statusText: function () {
        return this._xmlHttpRequest.statusText
    },
    get_xml: function () {
        var a = this._xmlHttpRequest.responseXML;
        if (!a || !a.documentElement) {
            a = Sys.Net.XMLDOM(this._xmlHttpRequest.responseText);
            if (!a || !a.documentElement) return null
        } else if (navigator.userAgent.indexOf("MSIE") !== -1) a.setProperty("SelectionLanguage", "XPath");
        if (a.documentElement.namespaceURI === "http://www.mozilla.org/newlayout/xml/parsererror.xml" && a.documentElement.tagName === "parsererror") return null;
        if (a.documentElement.firstChild && a.documentElement.firstChild.tagName === "parsererror") return null;
        return a
    },
    abort: function () {
        if (this._aborted || this._responseAvailable || this._timedOut) return;
        this._aborted = true;
        this._clearTimer();
        if (this._xmlHttpRequest && !this._responseAvailable) {
            this._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
            this._xmlHttpRequest.abort();
            this._xmlHttpRequest = null;
            this._webRequest.completed(Sys.EventArgs.Empty)
        }
    }
};
Sys.Net.XMLHttpExecutor.registerClass("Sys.Net.XMLHttpExecutor", Sys.Net.WebRequestExecutor);
Sys.Net._WebRequestManager = function () {
    this._defaultTimeout = 0;
    this._defaultExecutorType = "Sys.Net.XMLHttpExecutor"
};
Sys.Net._WebRequestManager.prototype = {
    add_invokingRequest: function (a) {
        this._get_eventHandlerList().addHandler("invokingRequest", a)
    },
    remove_invokingRequest: function (a) {
        this._get_eventHandlerList().removeHandler("invokingRequest", a)
    },
    add_completedRequest: function (a) {
        this._get_eventHandlerList().addHandler("completedRequest", a)
    },
    remove_completedRequest: function (a) {
        this._get_eventHandlerList().removeHandler("completedRequest", a)
    },
    _get_eventHandlerList: function () {
        if (!this._events) this._events = new Sys.EventHandlerList;
        return this._events
    },
    get_defaultTimeout: function () {
        return this._defaultTimeout
    },
    set_defaultTimeout: function (a) {
        this._defaultTimeout = a
    },
    get_defaultExecutorType: function () {
        return this._defaultExecutorType
    },
    set_defaultExecutorType: function (a) {
        this._defaultExecutorType = a
    },
    executeRequest: function (webRequest) {
        var executor = webRequest.get_executor();
        if (!executor) {
            var failed = false;
            try {
                var executorType = eval(this._defaultExecutorType);
                executor = new executorType
            } catch (a) {
                failed = true
            }
            webRequest.set_executor(executor)
        }
        if (executor.get_aborted()) return;
        var evArgs = new Sys.Net.NetworkRequestEventArgs(webRequest),
            handler = this._get_eventHandlerList().getHandler("invokingRequest");
        if (handler) handler(this, evArgs);
        if (!evArgs.get_cancel()) executor.executeRequest()
    }
};
Sys.Net._WebRequestManager.registerClass("Sys.Net._WebRequestManager");
Sys.Net.WebRequestManager = new Sys.Net._WebRequestManager;
Sys.Net.NetworkRequestEventArgs = function (a) {
    Sys.Net.NetworkRequestEventArgs.initializeBase(this);
    this._webRequest = a
};
Sys.Net.NetworkRequestEventArgs.prototype = {
    get_webRequest: function () {
        return this._webRequest
    }
};
Sys.Net.NetworkRequestEventArgs.registerClass("Sys.Net.NetworkRequestEventArgs", Sys.CancelEventArgs);
Sys.Net.WebRequest = function () {
    this._url = "";
    this._headers = {};
    this._body = null;
    this._userContext = null;
    this._httpVerb = null;
    this._executor = null;
    this._invokeCalled = false;
    this._timeout = 0
};
Sys.Net.WebRequest.prototype = {
    add_completed: function (a) {
        this._get_eventHandlerList().addHandler("completed", a)
    },
    remove_completed: function (a) {
        this._get_eventHandlerList().removeHandler("completed", a)
    },
    completed: function (b) {
        var a = Sys.Net.WebRequestManager._get_eventHandlerList().getHandler("completedRequest");
        if (a) a(this._executor, b);
        a = this._get_eventHandlerList().getHandler("completed");
        if (a) a(this._executor, b)
    },
    _get_eventHandlerList: function () {
        if (!this._events) this._events = new Sys.EventHandlerList;
        return this._events
    },
    get_url: function () {
        return this._url
    },
    set_url: function (a) {
        this._url = a
    },
    get_headers: function () {
        return this._headers
    },
    get_httpVerb: function () {
        if (this._httpVerb === null) {
            if (this._body === null) return "GET";
            return "POST"
        }
        return this._httpVerb
    },
    set_httpVerb: function (a) {
        this._httpVerb = a
    },
    get_body: function () {
        return this._body
    },
    set_body: function (a) {
        this._body = a
    },
    get_userContext: function () {
        return this._userContext
    },
    set_userContext: function (a) {
        this._userContext = a
    },
    get_executor: function () {
        return this._executor
    },
    set_executor: function (a) {
        this._executor = a;
        this._executor._set_webRequest(this)
    },
    get_timeout: function () {
        if (this._timeout === 0) return Sys.Net.WebRequestManager.get_defaultTimeout();
        return this._timeout
    },
    set_timeout: function (a) {
        this._timeout = a
    },
    getResolvedUrl: function () {
        return Sys.Net.WebRequest._resolveUrl(this._url)
    },
    invoke: function () {
        Sys.Net.WebRequestManager.executeRequest(this);
        this._invokeCalled = true
    }
};
Sys.Net.WebRequest._resolveUrl = function (b, a) {
    if (b && b.indexOf("://") !== -1) return b;
    if (!a || a.length === 0) {
        var d = document.getElementsByTagName("base")[0];
        if (d && d.href && d.href.length > 0) a = d.href;
        else a = document.URL
    }
    var c = a.indexOf("?");
    if (c !== -1) a = a.substr(0, c);
    c = a.indexOf("#");
    if (c !== -1) a = a.substr(0, c);
    a = a.substr(0, a.lastIndexOf("/") + 1);
    if (!b || b.length === 0) return a;
    if (b.charAt(0) === "/") {
        var e = a.indexOf("://"),
            g = a.indexOf("/", e + 3);
        return a.substr(0, g) + b
    } else {
        var f = a.lastIndexOf("/");
        return a.substr(0, f + 1) + b
    }
};
Sys.Net.WebRequest._createQueryString = function (c, b, f) {
    b = b || encodeURIComponent;
    var h = 0,
        e, g, d, a = new Sys.StringBuilder;
    if (c) for (d in c) {
        e = c[d];
        if (typeof e === "function") continue;
        g = Sys.Serialization.JavaScriptSerializer.serialize(e);
        if (h++) a.append("&");
        a.append(d);
        a.append("=");
        a.append(b(g))
    }
    if (f) {
        if (h) a.append("&");
        a.append(f)
    }
    return a.toString()
};
Sys.Net.WebRequest._createUrl = function (a, b, c) {
    if (!b && !c) return a;
    var d = Sys.Net.WebRequest._createQueryString(b, null, c);
    return d.length ? a + (a && a.indexOf("?") >= 0 ? "&" : "?") + d : a
};
Sys.Net.WebRequest.registerClass("Sys.Net.WebRequest");
Sys._ScriptLoaderTask = function (b, a) {
    this._scriptElement = b;
    this._completedCallback = a
};
Sys._ScriptLoaderTask.prototype = {
    get_scriptElement: function () {
        return this._scriptElement
    },
    dispose: function () {
        if (this._disposed) return;
        this._disposed = true;
        this._removeScriptElementHandlers();
        Sys._ScriptLoaderTask._clearScript(this._scriptElement);
        this._scriptElement = null
    },
    execute: function () {
        this._addScriptElementHandlers();
        document.getElementsByTagName("head")[0].appendChild(this._scriptElement)
    },
    _addScriptElementHandlers: function () {
        this._scriptLoadDelegate = Function.createDelegate(this, this._scriptLoadHandler);
        if (Sys.Browser.agent !== Sys.Browser.InternetExplorer) {
            this._scriptElement.readyState = "loaded";
            $addHandler(this._scriptElement, "load", this._scriptLoadDelegate)
        } else $addHandler(this._scriptElement, "readystatechange", this._scriptLoadDelegate);
        if (this._scriptElement.addEventListener) {
            this._scriptErrorDelegate = Function.createDelegate(this, this._scriptErrorHandler);
            this._scriptElement.addEventListener("error", this._scriptErrorDelegate, false)
        }
    },
    _removeScriptElementHandlers: function () {
        if (this._scriptLoadDelegate) {
            var a = this.get_scriptElement();
            if (Sys.Browser.agent !== Sys.Browser.InternetExplorer) $removeHandler(a, "load", this._scriptLoadDelegate);
            else $removeHandler(a, "readystatechange", this._scriptLoadDelegate);
            if (this._scriptErrorDelegate) {
                this._scriptElement.removeEventListener("error", this._scriptErrorDelegate, false);
                this._scriptErrorDelegate = null
            }
            this._scriptLoadDelegate = null
        }
    },
    _scriptErrorHandler: function () {
        if (this._disposed) return;
        this._completedCallback(this.get_scriptElement(), false)
    },
    _scriptLoadHandler: function () {
        if (this._disposed) return;
        var a = this.get_scriptElement();
        if (a.readyState !== "loaded" && a.readyState !== "complete") return;
        this._completedCallback(a, true)
    }
};
Sys._ScriptLoaderTask.registerClass("Sys._ScriptLoaderTask", null, Sys.IDisposable);
Sys._ScriptLoaderTask._clearScript = function (a) {
    if (!Sys.Debug.isDebug) a.parentNode.removeChild(a)
};
Type.registerNamespace("Sys.Net");
Sys.Net.WebServiceProxy = function () {};
Sys.Net.WebServiceProxy.prototype = {
    get_timeout: function () {
        return this._timeout || 0
    },
    set_timeout: function (a) {
        if (a < 0) throw Error.argumentOutOfRange("value", a, Sys.Res.invalidTimeout);
        this._timeout = a
    },
    get_defaultUserContext: function () {
        return typeof this._userContext === "undefined" ? null : this._userContext
    },
    set_defaultUserContext: function (a) {
        this._userContext = a
    },
    get_defaultSucceededCallback: function () {
        return this._succeeded || null
    },
    set_defaultSucceededCallback: function (a) {
        this._succeeded = a
    },
    get_defaultFailedCallback: function () {
        return this._failed || null
    },
    set_defaultFailedCallback: function (a) {
        this._failed = a
    },
    get_enableJsonp: function () {
        return !!this._jsonp
    },
    set_enableJsonp: function (a) {
        this._jsonp = a
    },
    get_path: function () {
        return this._path || null
    },
    set_path: function (a) {
        this._path = a
    },
    get_jsonpCallbackParameter: function () {
        return this._callbackParameter || "callback"
    },
    set_jsonpCallbackParameter: function (a) {
        this._callbackParameter = a
    },
    _invoke: function (d, e, g, f, c, b, a) {
        c = c || this.get_defaultSucceededCallback();
        b = b || this.get_defaultFailedCallback();
        if (a === null || typeof a === "undefined") a = this.get_defaultUserContext();
        return Sys.Net.WebServiceProxy.invoke(d, e, g, f, c, b, a, this.get_timeout(), this.get_enableJsonp(), this.get_jsonpCallbackParameter())
    }
};
Sys.Net.WebServiceProxy.registerClass("Sys.Net.WebServiceProxy");
Sys.Net.WebServiceProxy.invoke = function (q, a, m, l, j, b, g, e, w, p) {
    var i = w !== false ? Sys.Net.WebServiceProxy._xdomain.exec(q) : null,
        c, n = i && i.length === 3 && (i[1] !== location.protocol || i[2] !== location.host);
    m = n || m;
    if (n) {
        p = p || "callback";
        c = "_jsonp" + Sys._jsonp++
    }
    if (!l) l = {};
    var r = l;
    if (!m || !r) r = {};
    var s, h, f = null,
        k, o = null,
        u = Sys.Net.WebRequest._createUrl(a ? q + "/" + encodeURIComponent(a) : q, r, n ? p + "=Sys." + c : null);
    if (n) {
        s = document.createElement("script");
        s.src = u;
        k = new Sys._ScriptLoaderTask(s, function (d, b) {
            if (!b || c) t({
                Message: String.format(Sys.Res.webServiceFailedNoMsg, a)
            }, -1)
        });

        function v() {
            if (f === null) return;
            f = null;
            h = new Sys.Net.WebServiceError(true, String.format(Sys.Res.webServiceTimedOut, a));
            k.dispose();
            delete Sys[c];
            if (b) b(h, g, a)
        }
        function t(d, e) {
            if (f !== null) {
                window.clearTimeout(f);
                f = null
            }
            k.dispose();
            delete Sys[c];
            c = null;
            if (typeof e !== "undefined" && e !== 200) {
                if (b) {
                    h = new Sys.Net.WebServiceError(false, d.Message || String.format(Sys.Res.webServiceFailedNoMsg, a), d.StackTrace || null, d.ExceptionType || null, d);
                    h._statusCode = e;
                    b(h, g, a)
                }
            } else if (j) j(d, g, a)
        }
        Sys[c] = t;
        e = e || Sys.Net.WebRequestManager.get_defaultTimeout();
        if (e > 0) f = window.setTimeout(v, e);
        k.execute();
        return null
    }
    var d = new Sys.Net.WebRequest;
    d.set_url(u);
    d.get_headers()["Content-Type"] = "application/json; charset=utf-8";
    if (!m) {
        o = Sys.Serialization.JavaScriptSerializer.serialize(l);
        if (o === "{}") o = ""
    }
    d.set_body(o);
    d.add_completed(x);
    if (e && e > 0) d.set_timeout(e);
    d.invoke();

    function x(d) {
        if (d.get_responseAvailable()) {
            var f = d.get_statusCode(),
                c = null;
            try {
                var e = d.getResponseHeader("Content-Type");
                if (e.startsWith("application/json")) c = d.get_object();
                else if (e.startsWith("text/xml")) c = d.get_xml();
                else c = d.get_responseData()
            } catch (m) {}
            var k = d.getResponseHeader("jsonerror"),
                h = k === "true";
            if (h) {
                if (c) c = new Sys.Net.WebServiceError(false, c.Message, c.StackTrace, c.ExceptionType, c)
            } else if (e.startsWith("application/json")) c = !c || typeof c.d === "undefined" ? c : c.d;
            if (f < 200 || f >= 300 || h) {
                if (b) {
                    if (!c || !h) c = new Sys.Net.WebServiceError(false, String.format(Sys.Res.webServiceFailedNoMsg, a));
                    c._statusCode = f;
                    b(c, g, a)
                }
            } else if (j) j(c, g, a)
        } else {
            var i;
            if (d.get_timedOut()) i = String.format(Sys.Res.webServiceTimedOut, a);
            else i = String.format(Sys.Res.webServiceFailedNoMsg, a);
            if (b) b(new Sys.Net.WebServiceError(d.get_timedOut(), i, "", ""), g, a)
        }
    }
    return d
};
Sys.Net.WebServiceProxy._generateTypedConstructor = function (a) {
    return function (b) {
        if (b) for (var c in b) this[c] = b[c];
        this.__type = a
    }
};
Sys._jsonp = 0;
Sys.Net.WebServiceProxy._xdomain = /^\s*([a-zA-Z0-9\+\-\.]+\:)\/\/([^?#\/]+)/;
Sys.Net.WebServiceError = function (d, e, c, a, b) {
    this._timedOut = d;
    this._message = e;
    this._stackTrace = c;
    this._exceptionType = a;
    this._errorObject = b;
    this._statusCode = -1
};
Sys.Net.WebServiceError.prototype = {
    get_timedOut: function () {
        return this._timedOut
    },
    get_statusCode: function () {
        return this._statusCode
    },
    get_message: function () {
        return this._message
    },
    get_stackTrace: function () {
        return this._stackTrace || ""
    },
    get_exceptionType: function () {
        return this._exceptionType || ""
    },
    get_errorObject: function () {
        return this._errorObject || null
    }
};
Sys.Net.WebServiceError.registerClass("Sys.Net.WebServiceError");
Type.registerNamespace("Mscrm");
Mscrm.DynamicMenuReturnValue = function () {};
Mscrm.EntityReference = function () {};
Mscrm.Message = function () {};
Mscrm.ReportMenuReturnInformation = function () {};
Mscrm.ReportInformation = function () {};
Mscrm.ClientTabInfo = function () {};
Mscrm.RibbonDataInformation = function () {};
Mscrm.RibbonDataTabInformation = function () {};
Mscrm.RuleDefinition = function () {};
Mscrm.RulePart = function () {
    this.DefaultValue = true;
    this.InvertResult = false
};
Mscrm.OrBlockRulePart = function () {};
Mscrm.OrGroup = function () {};
Mscrm.EntityRulePart = function () {};
Mscrm.EntityPropertyRulePart = function () {};
Mscrm.FormEntityContextRulePart = function () {};
Mscrm.PrivilegeRulePart = function () {};
Mscrm.MiscellaneousPrivilegeRulePart = function () {};
Mscrm.FormStateRulePart = function () {};
Mscrm.OrganizationSettingRulePart = function () {};
Mscrm.ReferencingAttributeRequiredRulePart = function () {};
Mscrm.ValueRulePart = function () {};
Mscrm.ClientRulePart = function () {};
Mscrm.OutlookClientRulePart = function () {};
Mscrm.OutlookVersionRulePart = function () {};
Mscrm.CrmOutlookClientVersionRulePart = function () {};
Mscrm.OfflineAccessStateRulePart = function () {};
Mscrm.OutlookRenderTypeRulePart = function () {};
Mscrm.OutlookItemTrackingRulePart = function () {};
Mscrm.RelationshipTypeRulePart = function () {};
Mscrm.SkuRulePart = function () {};
Mscrm.SelectionCountRulePart = function () {};
Mscrm.JavaScriptRulePart = function () {};
Mscrm.PageRulePart = function () {};
Mscrm.OptionSetRulePart = function () {};
Mscrm.RibbonActionHandler = function () {};
Mscrm.UrlActionAttributes = function () {};
Mscrm.JavaScriptActionAttributes = function () {};
Mscrm.JavaScriptFunctionAttributes = function () {};
Mscrm.OutlookActionAttributes = function () {};
Mscrm.RibbonParameter = function () {};
Mscrm.IManagedBrowserShell = function () {};
Mscrm.IManagedBrowserShell.registerInterface("Mscrm.IManagedBrowserShell");
Mscrm.NameValuePair = function (key, value) {
    this.Key = key;
    this.Value = value
};
Mscrm.Notification = function (id, severity, source, text, order) {
    this.Id = id;
    this.Severity = severity;
    this.Source = source;
    this.Text = text;
    this.Order = order
};
Mscrm.PageHeaderData = function () {};
Mscrm.MetricObject = function () {};
Mscrm.IconType = function () {};
Mscrm.IconType.prototype = {
    gridIcon: 0,
    dbGridIcon: 1,
    navigationIcon: 2,
    outlookShortcutIcon: 3,
    largeEntityIcon: 4,
    ribbon16: 5,
    ribbon32: 6,
    formHeaderEntityIcon: 7
};
Mscrm.IconType.registerEnum("Mscrm.IconType", false);
Mscrm.PerformanceMarkerAggregateType = function () {};
Mscrm.PerformanceMarkerAggregateType.prototype = {
    lastValue: 0,
    count: 1,
    average: 2,
    min: 3,
    max: 4,
    sum: 5
};
Mscrm.PerformanceMarkerAggregateType.registerEnum("Mscrm.PerformanceMarkerAggregateType", false);
Mscrm.IPerformanceMarkerVisitor = function () {};
Mscrm.IPerformanceMarkerVisitor.registerInterface("Mscrm.IPerformanceMarkerVisitor");
Mscrm.IClientApiCollectionItem = function () {};
Mscrm.IClientApiCollectionItem.registerInterface("Mscrm.IClientApiCollectionItem");
Mscrm.IUIControl = function () {};
Mscrm.IUIControl.registerInterface("Mscrm.IUIControl");
Mscrm.IFormUIControl = function () {};
Mscrm.IFormUIControl.registerInterface("Mscrm.IFormUIControl");
Mscrm.FormFieldType = function () {};
Mscrm.FormFieldType.prototype = {
    FIELD_NOT_REQUIRED: 0,
    FIELD_RECOMMENDED: 1,
    FIELD_REQUIRED: 2
};
Mscrm.FormFieldType.registerEnum("Mscrm.FormFieldType", false);
Mscrm.KeyCode = function () {};
Mscrm.KeyCode.prototype = {
    KEY_6: 54,
    KEY_COMMA: 188,
    KEY_PERIOD: 190,
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_VERTICAL_TAB: 11,
    KEY_ENTER: 13,
    KEY_SHIFT: 16,
    KEY_CTRL: 17,
    KEY_ALT: 18,
    KEY_ESC: 27,
    KEY_SPACE: 32,
    KEY_END: 35,
    KEY_HOME: 36,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    KEY_DEL: 127,
    KEY_D: 68,
    KEY_F: 70,
    KEY_K: 75,
    KEY_P: 80,
    KEY_S: 83,
    KEY_U: 85,
    KEY_PLUS: 107,
    KEY_MINUS: 109,
    KEY_F2: 113,
    KEY_F4: 115,
    KEY_F9: 120,
    KEY_F10: 121,
    KEY_F12: 123
};
Mscrm.KeyCode.registerEnum("Mscrm.KeyCode", false);
Mscrm.SdkFormType = function () {};
Mscrm.SdkFormType.prototype = {
    undefinedFormType: 0,
    createForm: 1,
    updateForm: 2,
    readOnlyForm: 3,
    disabledForm: 4,
    bulkEditForm: 6
};
Mscrm.SdkFormType.registerEnum("Mscrm.SdkFormType", false);
Mscrm.XmlError = function () {};
Mscrm.XmlError.prototype = {
    ERROR_STOP: 0,
    ERROR_NONE: 1,
    ERROR_CONTINUE: 2
};
Mscrm.XmlError.registerEnum("Mscrm.XmlError", false);
Mscrm.IMenuItem = function () {};
Mscrm.IMenuItem.registerInterface("Mscrm.IMenuItem");
Mscrm.BrowserType = function () {};
Mscrm.BrowserType.prototype = {
    undefined: 0,
    IE: 1,
    firefox: 2,
    chrome: 3,
    safari: 4,
    opera: 5
};
Mscrm.BrowserType.registerEnum("Mscrm.BrowserType", false);
Mscrm.ICrmEventableComponent = function () {};
Mscrm.ICrmEventableComponent.registerInterface("Mscrm.ICrmEventableComponent");
Mscrm.ICrmDeferredActionHandler = function () {};
Mscrm.ICrmDeferredActionHandler.registerInterface("Mscrm.ICrmDeferredActionHandler");
Mscrm.ICrmResizeableControl = function () {};
Mscrm.ICrmResizeableControl.registerInterface("Mscrm.ICrmResizeableControl");
Mscrm.IRibbonSelectionControl = function () {};
Mscrm.IRibbonSelectionControl.registerInterface("Mscrm.IRibbonSelectionControl");
Mscrm.IRibbonSelectionControlProxy = function () {};
Mscrm.IRibbonSelectionControlProxy.registerInterface("Mscrm.IRibbonSelectionControlProxy");
Mscrm.IDataControl = function () {};
Mscrm.IDataControl.registerInterface("Mscrm.IDataControl");
Mscrm.IGridControl = function () {};
Mscrm.IGridControl.registerInterface("Mscrm.IGridControl");
Mscrm.EvalOperator = function () {};
Mscrm.EvalOperator.prototype = {
    none: 0,
    equals: 1,
    greater: 2,
    greaterEquals: 3,
    lower: 4,
    lowerEquals: 5
};
Mscrm.EvalOperator.registerEnum("Mscrm.EvalOperator", false);
Mscrm.ICrmUIFormDataComponent = function () {};
Mscrm.ICrmUIFormDataComponent.registerInterface("Mscrm.ICrmUIFormDataComponent");
Mscrm.ValidationResult = function (isValid, errorText, errorIconPath) {
    this.errorText = null;
    this.isValid = false;
    this.errorIconPath = null;
    this.attributeName = null;
    this.parentFormDataEntityId = null;
    this.isValid = isValid;
    this.errorText = errorText;
    if (!isNullOrEmptyString(errorIconPath)) this.errorIconPath = errorIconPath
};
Mscrm.ImageInfo = function () {};
Mscrm.IDebugTracer = function () {};
Mscrm.IDebugTracer.registerInterface("Mscrm.IDebugTracer");
Mscrm.TraceEntry = function (id, message, timestamp, url) {
    this.id = id;
    this.message = message;
    this.timestamp = timestamp;
    this.url = url
};
Mscrm.RibbonKeyPressParameters = function () {};
Mscrm.ReportingPreference = function () {};
Mscrm.ReportingPreference.prototype = {
    None: 0,
    PromptBeforeReport: 1,
    AutoReport: 2,
    NeverReport: 3
};
Mscrm.ReportingPreference.registerEnum("Mscrm.ReportingPreference", false);
Mscrm.CrashData = function () {};
Mscrm.ILocalStorage = function () {};
Mscrm.ILocalStorage.registerInterface("Mscrm.ILocalStorage");
Mscrm.IFeatureControlChecks = function () {};
Mscrm.IFeatureControlChecks.registerInterface("Mscrm.IFeatureControlChecks");
Mscrm.ImageStripData = function () {};
Mscrm.ImageStripData.$6X = function () {
    var $v_0 = {};
    $v_0["/_IMGS/AREA/18_HOME.GIF"] = "ms-crm-ImageStrip-18_home";
    $v_0["/_IMGS/ICO_18_4200.GIF"] = "ms-crm-ImageStrip-ico_18_4200";
    $v_0["/_IMGS/AREA/18_CALENDAR.GIF"] = "ms-crm-ImageStrip-18_calendar";
    $v_0["/_IMGS/AREA/18_IMPORT.GIF"] = "ms-crm-ImageStrip-18_import";
    $v_0["/_IMGS/DATA_MANAGEMENT.GIF"] = "ms-crm-ImageStrip-data_management";
    $v_0["/_IMGS/ICO_18_2020.GIF"] = "ms-crm-ImageStrip-ico_18_2020";
    $v_0["/_IMGS/ICO_18_127.GIF"] = "ms-crm-ImageStrip-ico_18_127";
    $v_0["/_IMGS/ICO_18_9100.GIF"] = "ms-crm-ImageStrip-ico_18_9100";
    $v_0["/_IMGS/ICO_18_132.GIF"] = "ms-crm-ImageStrip-ico_18_132";
    $v_0["/_IMGS/ICO_16_1082.GIF"] = "ms-crm-ImageStrip-ico_16_1082";
    $v_0["/_IMGS/ICO_16_4003.GIF"] = "ms-crm-ImageStrip-ico_16_4003";
    $v_0["/_IMGS/ICO_18_4.GIF"] = "ms-crm-ImageStrip-ico_18_4";
    $v_0["/_IMGS/ICO_18_3.GIF"] = "ms-crm-ImageStrip-ico_18_3";
    $v_0["/_IMGS/ICO_18_1.GIF"] = "ms-crm-ImageStrip-ico_18_1";
    $v_0["/_IMGS/ICO_18_2.GIF"] = "ms-crm-ImageStrip-ico_18_2";
    $v_0["/_IMGS/ICO_18_123.GIF"] = "ms-crm-ImageStrip-ico_18_123";
    $v_0["/_IMGS/ICO_18_1038.GIF"] = "ms-crm-ImageStrip-ico_18_1038";
    $v_0["/_IMGS/ICO_18_1084.GIF"] = "ms-crm-ImageStrip-ico_18_1084";
    $v_0["/_IMGS/ICO_18_1088.GIF"] = "ms-crm-ImageStrip-ico_18_1088";
    $v_0["/_IMGS/ICO_18_1090.GIF"] = "ms-crm-ImageStrip-ico_18_1090";
    $v_0["/_IMGS/ICO_18_4300.GIF"] = "ms-crm-ImageStrip-ico_18_4300";
    $v_0["/_IMGS/ICO_18_4400.GIF"] = "ms-crm-ImageStrip-ico_18_4400";
    $v_0["/_IMGS/ICO_18_1024.GIF"] = "ms-crm-ImageStrip-ico_18_1024";
    $v_0["/_IMGS/ICO_16_4406.PNG"] = "ms-crm-ImageStrip-ico_16_4406";
    $v_0["/_IMGS/ICO_18_MINICAMPS.GIF"] = "ms-crm-ImageStrip-ico_18_minicamps";
    $v_0["/_IMGS/ICO_18_SERVICECAL.GIF"] = "ms-crm-ImageStrip-ico_18_servicecal";
    $v_0["/_IMGS/ICO_18_112.GIF"] = "ms-crm-ImageStrip-ico_18_112";
    $v_0["/_IMGS/ICO_18_126.GIF"] = "ms-crm-ImageStrip-ico_18_126";
    $v_0["/_IMGS/ICO_18_1010.GIF"] = "ms-crm-ImageStrip-ico_18_1010";
    $v_0["/_IMGS/ICO_18_4001.GIF"] = "ms-crm-ImageStrip-ico_18_4001";
    $v_0["/_IMGS/ICO_24_CAL_EXPAND.GIF"] = "ms-crm-ImageStrip-ico_24_cal_expand";
    $v_0["/_IMGS/ICO_24_CAL_COLLAPSE.GIF"] = "ms-crm-ImageStrip-ico_24_cal_collapse";
    $v_0["/_IMGS/ICO_16_CALDAY.GIF"] = "ms-crm-ImageStrip-ico_16_calday";
    $v_0["/_IMGS/ICO_16_CALWEEK.GIF"] = "ms-crm-ImageStrip-ico_16_calweek";
    $v_0["/_IMGS/ICO_16_CALMONTH.GIF"] = "ms-crm-ImageStrip-ico_16_calmonth";
    $v_0["/_IMGS/ICO_24_CALTODAY_MENU.GIF"] = "ms-crm-ImageStrip-ico_24_caltoday_menu";
    $v_0["/_IMGS/ICO_16_CALTODAY.GIF"] = "ms-crm-ImageStrip-ico_16_caltoday";
    $v_0["/_IMGS/APPTBOOK/UP.GIF"] = "ms-crm-ImageStrip-apptBookUp";
    $v_0["/_IMGS/APPTBOOK/DOWN.GIF"] = "ms-crm-ImageStrip-apptBookDown";
    $v_0["/_IMGS/APPTBOOK/PLUS.GIF"] = "ms-crm-ImageStrip-apptBookPlus";
    $v_0["/_IMGS/APPTBOOK/MINUS.GIF"] = "ms-crm-ImageStrip-apptBookMinus";
    $v_0["/_IMGS/ICO_16_4000.GIF"] = "ms-crm-ImageStrip-ico_16_4000";
    $v_0["/_IMGS/ZOOM/ZOOMPLUSOVER.GIF"] = "ms-crm-ImageStrip-zoomPlusOver";
    $v_0["/_IMGS/ZOOM/ZOOMPLUS.GIF"] = "ms-crm-ImageStrip-zoomPlus";
    $v_0["/_IMGS/ZOOM/ZOOMMINUSOVER.GIF"] = "ms-crm-ImageStrip-zoomMinusOver";
    $v_0["/_IMGS/ZOOM/ZOOMMINUS.GIF"] = "ms-crm-ImageStrip-zoomMinus";
    $v_0["/_IMGS/ZOOM/DOTSELECTED.GIF"] = "ms-crm-ImageStrip-dotSelected";
    $v_0["/_IMGS/ZOOM/DOTUNSELECTED.GIF"] = "ms-crm-ImageStrip-dotUnselected";
    $v_0["/_IMGS/ICO_16_4212.GIF"] = "ms-crm-ImageStrip-ico_16_4212";
    $v_0["/_IMGS/ICO_16_4204.GIF"] = "ms-crm-ImageStrip-ico_16_4204";
    $v_0["/_IMGS/ICO_16_4210.GIF"] = "ms-crm-ImageStrip-ico_16_4210";
    $v_0["/_IMGS/ICO_16_4202.GIF"] = "ms-crm-ImageStrip-ico_16_4202";
    $v_0["/_IMGS/ICO_16_4207.GIF"] = "ms-crm-ImageStrip-ico_16_4207";
    $v_0["/_IMGS/ICO_16_4201.GIF"] = "ms-crm-ImageStrip-ico_16_4201";
    $v_0["/_IMGS/ICO_16_4214.GIF"] = "ms-crm-ImageStrip-ico_16_4214";
    $v_0["/_IMGS/ICO_16_4401.GIF"] = "ms-crm-ImageStrip-ico_16_4401";
    $v_0["/_IMGS/ICO_16_1120.GIF"] = "ms-crm-ImageStrip-ico_16_1120";
    $v_0["/_IMGS/ICO_16_1130.GIF"] = "ms-crm-ImageStrip-ico_16_1130";
    $v_0["/_IMGS/ICO_18_129.GIF"] = "ms-crm-ImageStrip-ico_18_129";
    $v_0["/_IMGS/ICO_16_SALES.GIF"] = "ms-crm-ImageStrip-ico_16_sales";
    $v_0["/_IMGS/ICO_16_MARKETING.GIF"] = "ms-crm-ImageStrip-ico_16_marketing";
    $v_0["/_IMGS/AREA/18_SERVICE.GIF"] = "ms-crm-ImageStrip-18_service";
    $v_0["/_IMGS/AREA/18_SETTINGS.GIF"] = "ms-crm-ImageStrip-18_settings";
    $v_0["/_IMGS/ICO_18_ADMINISTRATION.GIF"] = "ms-crm-ImageStrip-ico_18_administration";
    $v_0["/_IMGS/ICO_18_BUSMANAGEMENT.GIF"] = "ms-crm-ImageStrip-ico_18_busmanagement";
    $v_0["/_IMGS/AREA/18_SYSCUST.GIF"] = "ms-crm-ImageStrip-18_syscust";
    $v_0["/_IMGS/SYSTEMCUSTOMIZATION/ICO_18_MARKETPLACE.PNG"] = "ms-crm-ImageStrip-ico_18_marketplace";
    $v_0["/_IMGS/ICO_INTERNET_LEADS.GIF"] = "ms-crm-ImageStrip-ico_internet_leads";
    $v_0["/_IMGS/ICO_LANDING_PAGES.GIF"] = "ms-crm-ImageStrip-ico_landing_pages";
    $v_0["/_IMGS/ICO_18_TEMPLATES.GIF"] = "ms-crm-ImageStrip-ico_18_templates";
    $v_0["/_IMGS/ICO_18_PRODUCTCATALOG.GIF"] = "ms-crm-ImageStrip-ico_18_productcatalog";
    $v_0["/_IMGS/ICO_18_4703.PNG"] = "ms-crm-ImageStrip-ico_18_4703";
    $v_0["/_IMGS/ICO_18_4703.GIF"] = "ms-crm-ImageStrip-ico_18_4703_g";
    $v_0["/_IMGS/ICO_18_DATAMANAGEMENT.GIF"] = "ms-crm-ImageStrip-ico_18_datamanagement";
    $v_0["/_IMGS/ICO_18_4700.GIF"] = "ms-crm-ImageStrip-ico_18_4700";
    $v_0["/_IMGS/ICO_16_1200.PNG"] = "ms-crm-ImageStrip-ico_16_1200";
    $v_0["/_IMGS/ICO_16_1201.PNG"] = "ms-crm-ImageStrip-ico_16_1201";
    $v_0["/_IMGS/ICO_18_1200.PNG"] = "ms-crm-ImageStrip-ico_18_1200";
    $v_0["/_IMGS/ICO_18_1201.PNG"] = "ms-crm-ImageStrip-ico_18_1201";
    $v_0["/_IMGS/ICO_18_1200.GIF"] = "ms-crm-ImageStrip-ico_18_1200_g";
    $v_0["/_IMGS/ICO_18_1201.GIF"] = "ms-crm-ImageStrip-ico_18_1201_g";
    $v_0["/_IMGS/ICO_16_ADVANCEDFIND.GIF"] = "ms-crm-ImageStrip-ico_16_AdvancedFind";
    $v_0["/_IMGS/ICO/16_HELP.GIF"] = "ms-crm-ImageStrip-16_help";
    $v_0["/_IMGS/ICO/17_HELP.PNG"] = "ms-crm-ImageStrip-17_help";
    $v_0["/_IMGS/PLACEHOLDERS/PLACEHOLDER_24.GIF"] = "ms-crm-ImageStrip-placeholder_24";
    $v_0["/_IMGS/PLACEHOLDERS/FORMHEADER_PLACEHOLDER_35X26.PNG"] = "ms-crm-ImageStrip-formheader_placeholder_35x26";
    $v_0["/_IMGS/ICO_16_1111.PNG"] = "ms-crm-ImageStrip-ico_16_1111";
    $v_0["/_IMGS/ICO_16_1112.PNG"] = "ms-crm-ImageStrip-ico_16_1112";
    $v_0["/_IMGS/ICO_18_1071.GIF"] = "ms-crm-ImageStrip-ico_18_1071";
    $v_0["/_IMGS/ICO_18_3234.GIF"] = "ms-crm-ImageStrip-ico_18_3234";
    $v_0["/_IMGS/ICO_18_9005.GIF"] = "ms-crm-ImageStrip-ico_18_9005";
    $v_0["/_IMGS/ICO_18_4567.GIF"] = "ms-crm-ImageStrip-ico_18_4567";
    $v_0["/_IMGS/ICO_18_4710.PNG"] = "ms-crm-ImageStrip-ico_18_4710";
    $v_0["/_IMGS/ICO_18_4710.GIF"] = "ms-crm-ImageStrip-ico_18_4710_g";
    $v_0["/_IMGS/ICO_16_9105.GIF"] = "ms-crm-ImageStrip-ico_16_9105";
    $v_0["/_IMGS/ICO_18_4502.GIF"] = "ms-crm-ImageStrip-ico_18_4502";
    $v_0["/_IMGS/ICO_16_1.GIF"] = "ms-crm-ImageStrip-ico_16_1";
    $v_0["/_IMGS/ICO_16_2.GIF"] = "ms-crm-ImageStrip-ico_16_2";
    $v_0["/_IMGS/ICO_16_3.GIF"] = "ms-crm-ImageStrip-ico_16_3";
    $v_0["/_IMGS/ICO_16_8.GIF"] = "ms-crm-ImageStrip-ico_16_8";
    $v_0["/_IMGS/ICO_18_ACT.GIF"] = "ms-crm-ImageStrip-ico_18_act";
    $v_0["/_IMGS/ICO_18_HISTORY.GIF"] = "ms-crm-ImageStrip-ico_18_history";
    $v_0["/_IMGS/AREA/18_SUBACCOUNTS.GIF"] = "ms-crm-ImageStrip-18_subAccounts";
    $v_0["/_IMGS/ICO_LRG_1.GIF"] = "ms-crm-ImageStrip-ico_lrg_1";
    $v_0["/_IMGS/ICO_16_4230.GIF"] = "ms-crm-ImageStrip-ico_16_4230";
    $v_0["/_IMGS/VERTICALGRIPPER.GIF"] = "ms-crm-ImageStrip-verticalGripper";
    $v_0["/_IMGS/HORIZONTALGRIPPER.GIF"] = "ms-crm-ImageStrip-horizontalGripper";
    $v_0["/_IMGS/NAVUP.PNG"] = "ms-crm-ImageStrip-navup";
    $v_0["/_IMGS/NAVDOWN.PNG"] = "ms-crm-ImageStrip-navdown";
    $v_0["/_IMGS/NAVLEFT.PNG"] = "ms-crm-ImageStrip-navLeft";
    $v_0["/_IMGS/NAVRIGHT.PNG"] = "ms-crm-ImageStrip-navRight";
    $v_0["/_IMGS/MESSAGEBAR/MSGBAR_BORDER.PNG"] = "ms-crm-ImageStrip-msgbar_border";
    $v_0["/_IMGS/MESSAGEBAR/MSGBAR_ICN_INFO.PNG"] = "ms-crm-ImageStrip-msgbar_icn_info";
    $v_0["/_IMGS/MESSAGEBAR/MSGBAR_CLOSE_BUTTON_CLICK.PNG"] = "ms-crm-ImageStrip-msgbar_close_button_click";
    $v_0["/_IMGS/MESSAGEBAR/MSGBAR_CLOSE_BUTTON_COLD.PNG"] = "ms-crm-ImageStrip-msgbar_close_button_cold";
    $v_0["/_IMGS/MESSAGEBAR/MSGBAR_CLOSE_BUTTON_HOVER.PNG"] = "ms-crm-ImageStrip-msgbar_close_button_hover";
    $v_0["/_IMGS/MNUDOWN.GIF"] = "ms-crm-ImageStrip-mnuDown";
    $v_0["/_IMGS/MNU_RARROW.GIF"] = "ms-crm-ImageStrip-mnu_rArrow";
    $v_0["/_IMGS/MNU_HSPACERGRID.GIF"] = "ms-crm-ImageStrip-mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK12BLACK/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook12Black_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK12BLUE/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook12Blue_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK12SILVER/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook12Silver_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK14BLACK/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook14Black_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK14BLUE/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook14Blue_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK14SILVER/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook14Silver_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK15BLACK/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook15Black_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK15BLUE/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook15Blue_mnu_hSpacerGrid";
    $v_0["/_IMGS/THEME/OUTLOOK15SILVER/MNU_HSPACERGRID.PNG"] = "ms-crm-ImageStrip-Outlook15Silver_mnu_hSpacerGrid";
    $v_0["/_IMGS/MNU_HSPACER.GIF"] = "ms-crm-ImageStrip-mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK12BLACK/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook12Black_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK12BLUE/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook12Blue_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK12SILVER/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook12Silver_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK14BLACK/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook14Black_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK14BLUE/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook14Blue_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK14SILVER/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook14Silver_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK15BLACK/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook15Black_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK15BLUE/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook15Blue_mnu_hSpacer";
    $v_0["/_IMGS/THEME/OUTLOOK15SILVER/MNU_HSPACER.PNG"] = "ms-crm-ImageStrip-Outlook15Silver_mnu_hSpacer";
    $v_0["/_IMGS/RECENTLYVIEWED/HOME.PNG"] = "ms-crm-ImageStrip-Home";
    $v_0["/_IMGS/RECENTLYVIEWED/RECENT.PNG"] = "ms-crm-ImageStrip-Recent";
    $v_0["/_IMGS/DEFAULTSITEMAPAREA_24X24.GIF"] = "ms-crm-ImageStrip-DefaultSitemapArea_24x24";
    $v_0["/_IMGS/WORKPLACE_24X24.GIF"] = "ms-crm-ImageStrip-workplace_24x24";
    $v_0["/_IMGS/SALES_24X24.GIF"] = "ms-crm-ImageStrip-sales_24x24";
    $v_0["/_IMGS/MARKETING_24X24.GIF"] = "ms-crm-ImageStrip-marketing_24x24";
    $v_0["/_IMGS/SERVICES_24X24.GIF"] = "ms-crm-ImageStrip-services_24x24";
    $v_0["/_IMGS/SETTINGS_24X24.GIF"] = "ms-crm-ImageStrip-settings_24x24";
    $v_0["/_IMGS/RESOURCECENTER_24X24.GIF"] = "ms-crm-ImageStrip-resourcecenter_24x24";
    $v_0["/_IMGS/RIBBON/ARROW_RIBBONCOLLAPSE.PNG"] = "ms-crm-ImageStrip-arrow_ribboncollapse";
    $v_0["/_IMGS/RIBBON/ARROW_RIBBONEXPAND.PNG"] = "ms-crm-ImageStrip-arrow_ribbonexpand";
    $v_0["/_IMGS/QFIND.GIF"] = "ms-crm-ImageStrip-qfind";
    $v_0["/_IMGS/SEARCH.GIF"] = "ms-crm-ImageStrip-search";
    $v_0["/_IMGS/SEARCHHOVER.GIF"] = "ms-crm-ImageStrip-searchhover";
    $v_0["/_IMGS/SEARCHDOWN.GIF"] = "ms-crm-ImageStrip-searchdown";
    $v_0["/_IMGS/SEARCHCLEAR.GIF"] = "ms-crm-ImageStrip-searchclear";
    $v_0["/_IMGS/SEARCHCLEARHOVER.GIF"] = "ms-crm-ImageStrip-searchclearhover";
    $v_0["/_IMGS/SEARCHCLEARDOWN.GIF"] = "ms-crm-ImageStrip-searchcleardown";
    $v_0["/_IMGS/HELPVISOR/VISOROPEN.PNG"] = "ms-crm-ImageStrip-visoropen";
    $v_0["/_IMGS/HELPVISOR/VISORCLOSE.PNG"] = "ms-crm-ImageStrip-visorclose";
    $v_0["/_IMGS/HELPVISOR/VISORCLOSEHOVER.PNG"] = "ms-crm-ImageStrip-visorclosehover";
    $v_0["/_IMGS/HELPVISOR/VISOROPENHOVER.PNG"] = "ms-crm-ImageStrip-visoropenhover";
    $v_0["/_IMGS/BTN_DIS_LOOKUP.PNG"] = "ms-crm-ImageStrip-btn_dis_lookup";
    $v_0["/_IMGS/BTN_OFF_LOOKUP.PNG"] = "ms-crm-ImageStrip-btn_off_lookup";
    $v_0["/_IMGS/SEARCH_DISABLE.PNG"] = "ms-crm-ImageStrip-search_disable";
    $v_0["/_IMGS/SEARCH_NORMAL.GIF"] = "ms-crm-ImageStrip-search_normal";
    $v_0["/_IMGS/ERROR/NOTIF_ICN_INFO16.PNG"] = "ms-crm-ImageStrip-notif_icn_info16";
    $v_0["/_IMGS/ERROR/NOTIF_ICN_WARN16.PNG"] = "ms-crm-ImageStrip-notif_icn_warn16";
    $v_0["/_IMGS/ERROR/NOTIF_ICN_CRIT16.PNG"] = "ms-crm-ImageStrip-notif_icn_crit16";
    $v_0["/_IMGS/ERROR/NOTIF_ICN_ALERT16.PNG"] = "ms-crm-ImageStrip-notif_icn_alert16";
    $v_0["/_IMGS/FRM_REQUIRED.GIF"] = "ms-crm-ImageStrip-frm_required";
    $v_0["/_IMGS/FRM_RECOMMENDED.GIF"] = "ms-crm-ImageStrip-frm_recommended";
    $v_0["/_IMGS/RIGHT.GIF"] = "ms-crm-ImageStrip-right";
    $v_0["/_IMGS/DOWN.GIF"] = "ms-crm-ImageStrip-down";
    $v_0["/_IMGS/TAB_SECTION_RIGHT.PNG"] = "ms-crm-ImageStrip-tab_right";
    $v_0["/_IMGS/TAB_SECTION_DOWN.PNG"] = "ms-crm-ImageStrip-tab_down";
    $v_0["/_IMGS/BTN_DIS_CAL.GIF"] = "ms-crm-ImageStrip-btn_dis_cal";
    $v_0["/_IMGS/BTN_OFF_CAL.GIF"] = "ms-crm-ImageStrip-btn_off_cal";
    $v_0["/_IMGS/RECNAV/VERTICAL_LINE_TRANSPARENT.PNG"] = "ms-crm-ImageStrip-vertical_line_transparent";
    $v_0["/_IMGS/RECNAV/DEFAULT_LEFTCAP.PNG"] = "ms-crm-ImageStrip-default_leftcap";
    $v_0["/_IMGS/RECNAV/RIGHTCAP.PNG"] = "ms-crm-ImageStrip-rightcap";
    $v_0["/_IMGS/RECNAV/UP_DISABLED.PNG"] = "ms-crm-ImageStrip-Up_Disabled";
    $v_0["/_IMGS/RECNAV/DOWN_DISABLED.PNG"] = "ms-crm-ImageStrip-Down_Disabled";
    $v_0["/_IMGS/RECNAV/DISABLED_ARROW.PNG"] = "ms-crm-ImageStrip-disabled_arrow";
    $v_0["/_IMGS/RECNAV/UP_ENABLED.PNG"] = "ms-crm-ImageStrip-Up_Enabled";
    $v_0["/_IMGS/RECNAV/DOWN_ENABLED.PNG"] = "ms-crm-ImageStrip-Down_Enabled";
    $v_0["/_IMGS/RECNAV/ENABLED_ARROW.PNG"] = "ms-crm-ImageStrip-enabled_arrow";
    $v_0["/_IMGS/RECNAV/HOVER_LEFTCAP.PNG"] = "ms-crm-ImageStrip-hover_leftcap";
    $v_0["/_IMGS/RECNAV/HOVER_RIGHTCAP.PNG"] = "ms-crm-ImageStrip-hover_rightcap";
    $v_0["/_IMGS/RECNAV/SELECTED_LEFTCAP.PNG"] = "ms-crm-ImageStrip-selected_leftcap";
    $v_0["/_IMGS/ENLARGE.PNG"] = "ms-crm-ImageStrip-enlarge";
    $v_0["/_IMGS/OPENVIEW.PNG"] = "ms-crm-ImageStrip-openview";
    $v_0["/_IMGS/REFRESH.PNG"] = "ms-crm-ImageStrip-refresh";
    $v_0["/_IMGS/CLOSE.PNG"] = "ms-crm-ImageStrip-close";
    $v_0["/_IMGS/MULTISELECT/MULTISELECT_CHECKED.PNG"] = "ms-crm-ImageStrip-multiselect_checked";
    $v_0["/_IMGS/MULTISELECT/MULTISELECT_UNCHECKED.PNG"] = "ms-crm-ImageStrip-multiselect_unchecked";
    $v_0["/_IMGS/MULTISELECT/MULTISELECT_BTN_ON.GIF"] = "ms-crm-ImageStrip-multiselect_btn_on";
    $v_0["/_IMGS/MULTISELECT/MULTISELECT_BTN_DIS.GIF"] = "ms-crm-ImageStrip-multiselect_btn_dis";
    $v_0["/_IMGS/GRID/GRID_REFRESH.GIF"] = "ms-crm-ImageStrip-grid_refresh";
    $v_0["/_IMGS/GRID/BAR_LINE.GIF"] = "ms-crm-ImageStrip-bar_line";
    $v_0["/_IMGS/GRID/BAR_UP.GIF"] = "ms-crm-ImageStrip-bar_up";
    $v_0["/_IMGS/GRID/RESIZE.GIF"] = "ms-crm-ImageStrip-resize";
    $v_0["/_IMGS/GRID/PAGE_FL0.GIF"] = "ms-crm-ImageStrip-page_FL0";
    $v_0["/_IMGS/GRID/PAGE_L0.GIF"] = "ms-crm-ImageStrip-page_L0";
    $v_0["/_IMGS/GRID/PAGE_R0.GIF"] = "ms-crm-ImageStrip-page_R0";
    $v_0["/_IMGS/ICO/16_EXCEL.GIF"] = "ms-crm-ImageStrip-16_excel";
    $v_0["/_IMGS/ICO/16_PRINT.GIF"] = "ms-crm-ImageStrip-16_print";
    $v_0["/_IMGS/ICO_16_ASSIGN.GIF"] = "ms-crm-ImageStrip-ico_16_assign";
    $v_0["/_IMGS/ICO_16_DELETE.GIF"] = "ms-crm-ImageStrip-ico_16_delete";
    $v_0["/_IMGS/GRID/RESET.PNG"] = "ms-crm-ImageStrip-reset";
    $v_0["/_IMGS/GRID/DISABLERESET.PNG"] = "ms-crm-ImageStrip-disablereset";
    $v_0["/_IMGS/GRID/ASC.PNG"] = "ms-crm-ImageStrip-asc";
    $v_0["/_IMGS/GRID/DESC.PNG"] = "ms-crm-ImageStrip-desc";
    $v_0["/_IMGS/GRID/R.GIF"] = "ms-crm-ImageStrip-r";
    $v_0["/_IMGS/GRID/D.GIF"] = "ms-crm-ImageStrip-d";
    $v_0["/_IMGS/GRID/ROW_SELECTED.GIF"] = "ms-crm-ImageStrip-row_selected";
    $v_0["/_IMGS/DROPDOWN.PNG"] = "ms-crm-ImageStrip-dropdown";
    $v_0["/_IMGS/DROPDOWN_WFILTER.PNG"] = "ms-crm-ImageStrip-dropdown_wfilter";
    $v_0["/_IMGS/GRID/STRIPDIVIDER.GIF"] = "ms-crm-ImageStrip-stripDivider";
    $v_0["/_IMGS/GRID/DROPDOWN_ARROW.PNG"] = "ms-crm-ImageStrip-Dropdown_Arrow";
    $v_0["/_IMGS/GRID/PAGE_FL1.GIF"] = "ms-crm-ImageStrip-page_FL1";
    $v_0["/_IMGS/GRID/PAGE_L1.GIF"] = "ms-crm-ImageStrip-page_L1";
    $v_0["/_IMGS/GRID/PAGE_R1.GIF"] = "ms-crm-ImageStrip-page_R1";
    $v_0["/_IMGS/GRID/ADD_13.PNG"] = "ms-crm-ImageStrip-addButton";
    $v_0["/_IMGS/GRID/ADD_DISABLE_16.PNG"] = "ms-crm-ImageStrip-addButtonDisable";
    $v_0["/_IMGS/GRID/ADD_HOVER_13.PNG"] = "ms-crm-ImageStrip-addButtonHover";
    $v_0["/_IMGS/GRID/ACTIONS_DELETE_16.PNG"] = "ms-crm-ImageStrip-deleteButton";
    $v_0["/_IMGS/GRID/HORZPRELOADER_5X55.GIF"] = "ms-crm-ImageStrip-horizontalPreLoader";
    $v_0["/_IMGS/VISUALIZATION/CHARTSIDE.PNG"] = "ms-crm-ImageStrip-chartside";
    $v_0["/_IMGS/FORMSELECTORDROPDOWN.PNG"] = "ms-crm-ImageStrip-formSelectorDropdown";
    $v_0["/_IMGS/FORMNAVTREELINE.PNG"] = "ms-crm-ImageStrip-formNavTreeLine";
    $v_0["/_IMGS/FORMNAVTREELINEBOTTOM.PNG"] = "ms-crm-ImageStrip-formNavTreeLineBottom";
    $v_0["/_IMGS/FORMNAVTREELINE_RTL.PNG"] = "ms-crm-ImageStrip-formNavTreeLineRTL";
    $v_0["/_IMGS/FORMNAVTREELINEBOTTOM_RTL.PNG"] = "ms-crm-ImageStrip-formNavTreeLineBottomRTL";
    $v_0["/_IMGS/ADVFIND/BUTTON.GIF"] = "ms-crm-ImageStrip-AdvFindDownArrow";
    $v_0["/_IMGS/ADVFIND/PROGRESS.GIF"] = "ms-crm-ImageStrip-progress";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/AREACHART.PNG"] = "ms-crm-ImageStrip-areaChart";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/AREACHART/AREACHART_ARROW.PNG"] = "ms-crm-ImageStrip-areaChart_arrow";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/AREACHART/AREACHART_ARROW_DIS.PNG"] = "ms-crm-ImageStrip-areaChart_arrow_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/AREACHART/AREACHART_ARROW_SEL.PNG"] = "ms-crm-ImageStrip-areaChart_arrow_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/AREACHART/AREACHART_DIS.PNG"] = "ms-crm-ImageStrip-areaChart_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/AREACHART/AREACHART_SEL.PNG"] = "ms-crm-ImageStrip-areaChart_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/BARCHART/BARCHART.PNG"] = "ms-crm-ImageStrip-barChart";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/BARCHART/BARCHART_ARROW.PNG"] = "ms-crm-ImageStrip-barChart_arrow";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/BARCHART/BARCHART_ARROW_DIS.PNG"] = "ms-crm-ImageStrip-barChart_arrow_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/BARCHART/BARCHART_ARROW_SEL.PNG"] = "ms-crm-ImageStrip-barChart_arrow_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/BARCHART/BARCHART_DIS.PNG"] = "ms-crm-ImageStrip-barChart_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/BARCHART/BARCHART_SEL.PNG"] = "ms-crm-ImageStrip-barChart_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/COLUMNCHART/COLUMNCHART.PNG"] = "ms-crm-ImageStrip-columnChart";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/COLUMNCHART/COLUMNCHART_ARROW.PNG"] = "ms-crm-ImageStrip-columnChart_arrow";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/COLUMNCHART/COLUMNCHART_ARROW_DIS.PNG"] = "ms-crm-ImageStrip-columnChart_arrow_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/COLUMNCHART/COLUMNCHART_ARROW_SEL.PNG"] = "ms-crm-ImageStrip-columnChart_arrow_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/COLUMNCHART/COLUMNCHART_DIS.PNG"] = "ms-crm-ImageStrip-columnChart_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/COLUMNCHART/COLUMNCHART_SEL.PNG"] = "ms-crm-ImageStrip-columnChart_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/FUNNELCHART/FUNNELCHART.PNG"] = "ms-crm-ImageStrip-funnelChart";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/FUNNELCHART/FUNNELCHART_DIS.PNG"] = "ms-crm-ImageStrip-funnelChart_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/FUNNELCHART/FUNNELCHART_SEL.PNG"] = "ms-crm-ImageStrip-funnelChart_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/LINECHART/LINECHART.PNG"] = "ms-crm-ImageStrip-lineChart";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/LINECHART/LINECHART_DIS.PNG"] = "ms-crm-ImageStrip-lineChart_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/LINECHART/LINECHART_SEL.PNG"] = "ms-crm-ImageStrip-lineChart_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/PIECHART/PIECHART.PNG"] = "ms-crm-ImageStrip-pieChart";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/PIECHART/PIECHART_DIS.PNG"] = "ms-crm-ImageStrip-pieChart_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/PIECHART/PIECHART_SEL.PNG"] = "ms-crm-ImageStrip-pieChart_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/BOTTOMRULES.PNG"] = "ms-crm-ImageStrip-bottomRules";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/BOTTOMRULES_ARROW.PNG"] = "ms-crm-ImageStrip-bottomRules_arrow";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/BOTTOMRULES_ARROW_SEL.PNG"] = "ms-crm-ImageStrip-bottomRules_arrow_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/BOTTOMRULES_SEL.PNG"] = "ms-crm-ImageStrip-bottomRules_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/CLEARRULES.PNG"] = "ms-crm-ImageStrip-clearRules";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/CLEARRULES_SEL.PNG"] = "ms-crm-ImageStrip-clearRules_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/TOPBOTTOMRULES.PNG"] = "ms-crm-ImageStrip-topBottomRules";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/TOPBOTTOMRULES_DIS.PNG"] = "ms-crm-ImageStrip-topBottomRules_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/TOPBOTTOMRULES_SEL.PNG"] = "ms-crm-ImageStrip-topBottomRules_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/TOPRULES.PNG"] = "ms-crm-ImageStrip-topRules";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/TOPRULES_ARROW.PNG"] = "ms-crm-ImageStrip-topRules_arrow";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/TOPRULES_ARROW_SEL.PNG"] = "ms-crm-ImageStrip-topRules_arrow_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/TOPBOTTOM/TOPRULES_SEL.PNG"] = "ms-crm-ImageStrip-topRules_sel";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/ADD.PNG"] = "ms-crm-ImageStrip-add";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/ADD_DIS.PNG"] = "ms-crm-ImageStrip-add_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/DELETECHART.PNG"] = "ms-crm-ImageStrip-deleteChart";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/DELETECHART_DIS.PNG"] = "ms-crm-ImageStrip-deleteChart_dis";
    $v_0["/_IMGS/VISUALIZATION/DESIGNER/DELETECHART_SEL.PNG"] = "ms-crm-ImageStrip-deleteChart_sel";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1.PNG"] = "ms-crm-ImageStrip-ico_fhe_1";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_2.PNG"] = "ms-crm-ImageStrip-ico_fhe_2";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_3.PNG"] = "ms-crm-ImageStrip-ico_fhe_3";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4.PNG"] = "ms-crm-ImageStrip-ico_fhe_4";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_5.PNG"] = "ms-crm-ImageStrip-ico_fhe_5";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_8.PNG"] = "ms-crm-ImageStrip-ico_fhe_8";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9.PNG"] = "ms-crm-ImageStrip-ico_fhe_9";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_112.PNG"] = "ms-crm-ImageStrip-ico_fhe_112";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_123.PNG"] = "ms-crm-ImageStrip-ico_fhe_123";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_127.PNG"] = "ms-crm-ImageStrip-ico_fhe_127";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_132.PNG"] = "ms-crm-ImageStrip-ico_fhe_132";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1010.PNG"] = "ms-crm-ImageStrip-ico_fhe_1010";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1011.PNG"] = "ms-crm-ImageStrip-ico_fhe_1011";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1013.PNG"] = "ms-crm-ImageStrip-ico_fhe_1013";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1016.PNG"] = "ms-crm-ImageStrip-ico_fhe_1016";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1022.PNG"] = "ms-crm-ImageStrip-ico_fhe_1022";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1024.PNG"] = "ms-crm-ImageStrip-ico_fhe_1024";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1026.PNG"] = "ms-crm-ImageStrip-ico_fhe_1026";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1030.PNG"] = "ms-crm-ImageStrip-ico_fhe_1030";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1036.PNG"] = "ms-crm-ImageStrip-ico_fhe_1036";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1038.PNG"] = "ms-crm-ImageStrip-ico_fhe_1038";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1055.PNG"] = "ms-crm-ImageStrip-ico_fhe_1055";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1056.PNG"] = "ms-crm-ImageStrip-ico_fhe_1056";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1070.PNG"] = "ms-crm-ImageStrip-ico_fhe_1070";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1071.PNG"] = "ms-crm-ImageStrip-ico_fhe_1071";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1080.PNG"] = "ms-crm-ImageStrip-ico_fhe_1080";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1083.PNG"] = "ms-crm-ImageStrip-ico_fhe_1083";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1084.PNG"] = "ms-crm-ImageStrip-ico_fhe_1084";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1085.PNG"] = "ms-crm-ImageStrip-ico_fhe_1085";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1088.PNG"] = "ms-crm-ImageStrip-ico_fhe_1088";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1089.PNG"] = "ms-crm-ImageStrip-ico_fhe_1089";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1090.PNG"] = "ms-crm-ImageStrip-ico_fhe_1090";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1091.PNG"] = "ms-crm-ImageStrip-ico_fhe_1091";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1111.PNG"] = "ms-crm-ImageStrip-ico_fhe_1111";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1112.PNG"] = "ms-crm-ImageStrip-ico_fhe_1112";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_1200.PNG"] = "ms-crm-ImageStrip-ico_fhe_1200";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_2010.PNG"] = "ms-crm-ImageStrip-ico_fhe_2010";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_2011.PNG"] = "ms-crm-ImageStrip-ico_fhe_2011";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_2013.PNG"] = "ms-crm-ImageStrip-ico_fhe_2013";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_2020.PNG"] = "ms-crm-ImageStrip-ico_fhe_2020";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_2029.PNG"] = "ms-crm-ImageStrip-ico_fhe_2029";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4000.PNG"] = "ms-crm-ImageStrip-ico_fhe_4000";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4001.PNG"] = "ms-crm-ImageStrip-ico_fhe_4001";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4002.PNG"] = "ms-crm-ImageStrip-ico_fhe_4002";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4007.PNG"] = "ms-crm-ImageStrip-ico_fhe_4007";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4009.PNG"] = "ms-crm-ImageStrip-ico_fhe_4009";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4200.PNG"] = "ms-crm-ImageStrip-ico_fhe_4200";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4201.PNG"] = "ms-crm-ImageStrip-ico_fhe_4201";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4202.PNG"] = "ms-crm-ImageStrip-ico_fhe_4202";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4204.PNG"] = "ms-crm-ImageStrip-ico_fhe_4204";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4206.PNG"] = "ms-crm-ImageStrip-ico_fhe_4206";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4206_RTL.PNG"] = "ms-crm-ImageStrip-ico_fhe_4206_rtl";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4207.PNG"] = "ms-crm-ImageStrip-ico_fhe_4207";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4208.PNG"] = "ms-crm-ImageStrip-ico_fhe_4208";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4209.PNG"] = "ms-crm-ImageStrip-ico_fhe_4209";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4210.PNG"] = "ms-crm-ImageStrip-ico_fhe_4210";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4211.PNG"] = "ms-crm-ImageStrip-ico_fhe_4211";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4212.PNG"] = "ms-crm-ImageStrip-ico_fhe_4212";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4214.PNG"] = "ms-crm-ImageStrip-ico_fhe_4214";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4251.PNG"] = "ms-crm-ImageStrip-ico_fhe_4251";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4300.PNG"] = "ms-crm-ImageStrip-ico_fhe_4300";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4400.PNG"] = "ms-crm-ImageStrip-ico_fhe_4400";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4401.PNG"] = "ms-crm-ImageStrip-ico_fhe_4401";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4401_RTL.PNG"] = "ms-crm-ImageStrip-ico_fhe_4401_rtl";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4402.PNG"] = "ms-crm-ImageStrip-ico_fhe_4402";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4406.PNG"] = "ms-crm-ImageStrip-ico_fhe_4406";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4411.PNG"] = "ms-crm-ImageStrip-ico_fhe_4411";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4412.PNG"] = "ms-crm-ImageStrip-ico_fhe_4412";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4414.PNG"] = "ms-crm-ImageStrip-ico_fhe_4414";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4503.PNG"] = "ms-crm-ImageStrip-ico_fhe_4503";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4700.PNG"] = "ms-crm-ImageStrip-ico_fhe_4700";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4703.PNG"] = "ms-crm-ImageStrip-ico_fhe_4703";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_4710.PNG"] = "ms-crm-ImageStrip-ico_fhe_4710";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_7100.PNG"] = "ms-crm-ImageStrip-ico_fhe_7100";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9100.PNG"] = "ms-crm-ImageStrip-ico_fhe_9100";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9102.PNG"] = "ms-crm-ImageStrip-ico_fhe_9102";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9105.PNG"] = "ms-crm-ImageStrip-ico_fhe_9105";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9106.PNG"] = "ms-crm-ImageStrip-ico_fhe_9106";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9600.PNG"] = "ms-crm-ImageStrip-ico_fhe_9600";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9602.PNG"] = "ms-crm-ImageStrip-ico_fhe_9602";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_9603.PNG"] = "ms-crm-ImageStrip-ico_fhe_9603";
    $v_0["/_IMGS/FORMENTITY/ICO_FHE_SYSTEMENTITY.PNG"] = "ms-crm-ImageStrip-ico_fhe_systemEntity";
    $v_0["/_IMGS/INLINEEDIT/CONFIRM.PNG"] = "ms-crm-ImageStrip-inlineedit_confirm";
    $v_0["/_IMGS/INLINEEDIT/CANCEL.PNG"] = "ms-crm-ImageStrip-inlineedit_cancel";
    $v_0["/_IMGS/INLINEEDIT/LOCKED.PNG"] = "ms-crm-ImageStrip-inlineedit_locked";
    $v_0["/_IMGS/INLINEEDIT/LOCKED_BLACK.PNG"] = "ms-crm-ImageStrip-inlineedit_locked_black";
    $v_0["/_IMGS/INLINEEDIT/WARNING.PNG"] = "ms-crm-ImageStrip-inlineedit_warning";
    $v_0["/_IMGS/INLINEEDIT/ARROW.PNG"] = "ms-crm-ImageStrip-inlineedit_arrow";
    $v_0["/_IMGS/INLINEEDIT/TIME_ICON.PNG"] = "ms-crm-ImageStrip-inlineedit_time_icon";
    $v_0["/_IMGS/INLINEEDIT/TIME_ICON_DISABLED.PNG"] = "ms-crm-ImageStrip-inlineedit_time_icon_disabled";
    $v_0["/_IMGS/INLINEEDIT/CALENDAR_ICON.PNG"] = "ms-crm-ImageStrip-inlineedit_calendar_icon";
    $v_0["/_IMGS/ICO/16_PROGRESS.GIF"] = "ms-crm-ImageStrip-16_progress";
    $v_0["/_IMGS/INLINEEDIT/ALERT.PNG"] = "ms-crm-ImageStrip-inlineedit_alert";
    $v_0["/_IMGS/INLINEEDIT/SAVE.PNG"] = "ms-crm-ImageStrip-inlineedit_save";
    $v_0["/_IMGS/INLINEEDIT/SAVEHOVER.PNG"] = "ms-crm-ImageStrip-inlineedit_save_hover";
    $v_0["/_IMGS/INLINEEDIT/INLINE_EDIT_ICON.PNG"] = "ms-crm-ImageStrip-inlineedit_edit_icon";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_DARK_LEFT.PNG"] = "ms-crm-ImageStrip-process_control_dark_left";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_DARK_RIGHT.PNG"] = "ms-crm-ImageStrip-process_control_dark_right";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_LIGHT_LEFT.PNG"] = "ms-crm-ImageStrip-process_control_light_left";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_LIGHT_RIGHT.PNG"] = "ms-crm-ImageStrip-process_control_light_right";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_DARK_CHECK.PNG"] = "ms-crm-ImageStrip-process_control_dark_check";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_LIGHT_CHECK.PNG"] = "ms-crm-ImageStrip-process_control_light_check";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_DARK_SQUARE.PNG"] = "ms-crm-ImageStrip-process_control_dark_square";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_LIGHT_SQUARE.PNG"] = "ms-crm-ImageStrip-process_control_light_square";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_UP.PNG"] = "ms-crm-ImageStrip-process_control_up";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_DOWN.PNG"] = "ms-crm-ImageStrip-process_control_down";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_DARK_LOCK.PNG"] = "ms-crm-ImageStrip-process_control_dark_lock";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_LIGHT_LOCK.PNG"] = "ms-crm-ImageStrip-process_control_light_lock";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_WARNING.PNG"] = "ms-crm-ImageStrip-process_control_warning";
    $v_0["/_IMGS/PROCESSCONTROL/PROCESS_CONTROL_COMPLETED.PNG"] = "ms-crm-ImageStrip-process_control_completed";
    $v_0["/_IMGS/PROCESSCONTROL/PCC_ADD.PNG"] = "ms-crm-ImageStrip-pcc_add";
    $v_0["/_IMGS/PROCESSCONTROL/PCC_ADD_DEACTIVATED.PNG"] = "ms-crm-ImageStrip-pcc_add_deactivated";
    $v_0["/_IMGS/PROCESSCONTROL/PCC_DEL.PNG"] = "ms-crm-ImageStrip-pcc_del";
    $v_0["/_IMGS/PROCESSCONTROL/PCC_DEL_HOVER.PNG"] = "ms-crm-ImageStrip-pcc_del_hover";
    $v_0["/_IMGS/PROCESSCONTROL/DROPDOWN.PNG"] = "ms-crm-ImageStrip-pcc_dropdown";
    $v_0["/_IMGS/PROCESSCONTROL/ANIMATEDPRELOADER_36.PNG"] = "ms-crm-ImageStrip-AnimatedPreloader_36";
    $v_0["/_IMGS/PROCESSCONTROL/WARNING_31.PNG"] = "ms-crm-ImageStrip-warning_31";
    $v_0["/_IMGS/PROCESSCONTROL/30_ENABLED_MOVE_UP.PNG"] = "ms-crm-ImageStrip-30_enabled_move_up";
    $v_0["/_IMGS/PROCESSCONTROL/30_ENABLED_MOVE_DOWN.PNG"] = "ms-crm-ImageStrip-30_enabled_move_down";
    $v_0["/_IMGS/PROCESSCONTROL/30_ENABLED_HOVER_MOVE_UP.PNG"] = "ms-crm-ImageStrip-30_enabled_hover_move_up";
    $v_0["/_IMGS/PROCESSCONTROL/30_ENABLED_HOVER_MOVE_DOWN.PNG"] = "ms-crm-ImageStrip-30_enabled_hover_move_down";
    $v_0["/_IMGS/PROCESSCONTROL/30_DISABLED_MOVE_UP.PNG"] = "ms-crm-ImageStrip-30_disabled_move_up";
    $v_0["/_IMGS/PROCESSCONTROL/30_DISABLED_MOVE_DOWN.PNG"] = "ms-crm-ImageStrip-30_disabled_move_down";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/ACTIVATE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Activate";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/ADDTOQUEUE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_AddToQueue";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/CASECANCEL_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_CaseCancel";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/CLOSE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Close";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/CLOSEASLOST_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_CloseAsLost";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/CLOSEASWON_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_CloseAsWon";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/CREATE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Create";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/DELETE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Delete";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/DISQUALIFY_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Disqualify";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/EMAILLINK_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_EmailLink";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/FOLLOW_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Follow";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/FORMEDITOR_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_FormEditor";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/HELP_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Help";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/NEW_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_New";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/OPENLEGACYFORM_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_OpenLegacyForm";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/QUALIFY_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Qualify";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/REACTIVATECASE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_ReactivateCase";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/RESOLVECASE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_ResolveCase";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/SAVE_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Save";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/SETTINGS_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Settings";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/SHARING_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_Sharing";
    $v_0["/_IMGS/REFRESHCOMMANDBAR/UNFOLLOW_16.PNG"] = "ms-crm-ImageStrip-refresh_commandbar_UnFollow";
    return $v_0
};
Mscrm.RibbonCommandDefinition = function () {};
Mscrm.RibbonCommandDefinition.prototype = {
    Id: null,
    EnableRules: null,
    DisplayRules: null,
    Actions: null
};
Mscrm.ActionAttributes = function () {};
Mscrm.RibbonSelectionDataType = function () {};
Mscrm.NavigationMode = function () {};
Mscrm.NotificationSeverity = function () {};
Mscrm.NotificationSource = function () {};
Mscrm.RecordSetNavigation = function () {};
Mscrm.ScriptEvents = function () {};
Mscrm.InlineCommands = function () {};
Mscrm.InlineDataFormatTagName = function () {};
Mscrm.RecordPrivilegeType = function () {};
Mscrm.RefreshCommandBarVisibilityRule = function () {};
Mscrm.RefreshFormMarker = function () {};
Mscrm.IconUtil = function () {};
Mscrm.IconUtil.createUri = function (format, encodedSuffix) {
    return Mscrm.CrmUri.create(String.format(format, encodedSuffix))
};
Mscrm.IconUtil.getIconPath = function (objectTypeCode, iconType, cache, suffix) {
    var $v_0 = null;
    if (IsNull(suffix)) suffix = Mscrm.IconUtil.$6b(objectTypeCode.toString(), objectTypeCode, iconType);
    cache = IsNull(cache) ? true : cache;
    if (objectTypeCode >= 1e4) $v_0 = Mscrm.IconUtil.$6U(objectTypeCode, iconType, cache);
    else {
        var $v_1 = CrmEncodeDecode.CrmUrlEncode(suffix);
        switch (iconType) {
            case 0:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/ico_16_{0}", $v_1);
                break;
            case 1:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/ico_16_{0}", $v_1);
                break;
            case 2:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/ico_18_{0}", $v_1);
                break;
            case 3:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/olk_{0}", $v_1);
                break;
            case 4:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/ico_lrg_{0}", $v_1);
                break;
            case 7:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/formentity/ico_fhe_{0}", $v_1);
                break;
            case 5:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/ribbon/entity16_{0}", $v_1);
                break;
            case 6:
                $v_0 = Mscrm.IconUtil.createUri("/_imgs/ribbon/entity32_{0}", $v_1);
                break;
            default:
                $v_0 = Mscrm.CrmUri.create("");
                break
        }
    }
    return $v_0
};
Mscrm.IconUtil.hasSeparateRightToLeftImage = function (objectTypeCode, iconType) {
    switch (iconType) {
        case 7:
            switch (objectTypeCode) {
                case 4401:
                case 4206:
                    return true
            }
            break
    }
    return false
};
Mscrm.IconUtil.$6U = function ($p0, $p1, $p2) {
    var $v_0;
    switch ($p1) {
        case 5:
            $v_0 = Mscrm.IconUtil.createUri("/_imgs/ribbon/entity16_{0}", "Custom.png");
            break;
        case 6:
            $v_0 = Mscrm.IconUtil.createUri("/_imgs/ribbon/entity32_{0}", "Custom.png");
            break;
        default:
            $v_0 = Mscrm.IconUtil.$6W($p0, $p1, $p2);
            break
    }
    return $v_0
};
Mscrm.IconUtil.$6W = function ($p0, $p1, $p2) {
    var $v_0 = Mscrm.CrmUri.create("/_Common/icon.aspx");
    $v_0.get_query()["objectTypeCode"] = $p0.toString();
    $v_0.get_query()["iconType"] = Mscrm.IconType.toString($p1);
    $v_0.get_query()["cache"] = $p2 ? "1" : "0";
    return $v_0
};
Mscrm.IconUtil.getFileExtension = function (objectTypeCode, iconType) {
    if (typeof objectTypeCode === "string") objectTypeCode = parseInt(objectTypeCode);
    switch (iconType) {
        case 0:
        case 1:
            switch (objectTypeCode) {
                case 4709:
                case 3231:
                case 9804:
                case 4608:
                case 4618:
                case 4605:
                case 7101:
                case 9600:
                case 1001:
                case 5:
                case 9602:
                case 9603:
                case 9604:
                case 4710:
                case 4703:
                case 1111:
                case 1112:
                case 1201:
                case 1200:
                case 9502:
                case 9508:
                case 7105:
                case 4406:
                case 8006:
                case 8003:
                case 8e3:
                    return ".png";
                default:
                    return ".gif"
            }
        case 2:
            switch (objectTypeCode) {
                case 3234:
                case 3231:
                case 9333:
                case 9804:
                case 7101:
                case 1201:
                case 1200:
                case 9603:
                case 9600:
                case 9602:
                    return ".png";
                default:
                    return ".gif"
            }
        case 4:
            switch (objectTypeCode) {
                case 2029:
                case 3234:
                case 3231:
                case 9333:
                case 9804:
                case 7100:
                case 7101:
                case 4710:
                case 4703:
                case 1201:
                case 1200:
                    return ".png";
                default:
                    return ".gif"
            }
        case 3:
            return ".ico";
        case 5:
        case 6:
        case 7:
            return ".png";
        default:
            return ".gif"
    }
};
Mscrm.IconUtil.$6b = function ($p0, $p1, $p2) {
    var $v_0 = false;
    switch ($p1) {
        case 135:
        case 1003:
        case 1004:
        case 1017:
        case 1019:
        case 1021:
        case 1023:
        case 1037:
        case 1086:
        case 150:
        case 2012:
        case 2027:
        case 3e3:
        case 4004:
        case 4007:
        case 4102:
        case 33:
        case 4600:
        case 4601:
        case 4602:
        case 4603:
        case 4110:
        case 6:
        case 4101:
        case 29:
        case 30:
        case 1072:
        case 4417:
        case 34:
        case 4415:
        case 4416:
        case 4023:
        case 4413:
        case 4423:
        case 4705:
        case 4419:
        case 4420:
        case 4418:
        case 4606:
        case 4607:
        case 4613:
        case 4615:
        case 4609:
        case 4614:
        case 4610:
        case 4611:
        case 4426:
        case 4702:
        case 14:
        case 4704:
        case 0:
        case 4427:
        case 4707:
        case 31:
        case 4501:
        case 4425:
        case 36:
        case 4708:
        case 4010:
        case 4011:
        case 4616:
        case 4810:
        case 4812:
        case 4811:
        case 4800:
        case 4803:
        case 4802:
        case 9107:
            $p0 = "systemEntity";
            break;
        case 4212:
        case 4401:
        case 4206:
        case 4208:
            if ($p2 === 4 && Mscrm.IconUtil.isIconFlipped($p1, 4)) $v_0 = true;
            break
    }
    if ($p0.length <= 0) $p0 = "systemEntity";
    var $v_1 = window.LOCID_UI_DIR === "RTL";
    if ($v_0 || $v_1 && Mscrm.IconUtil.hasSeparateRightToLeftImage($p1, $p2)) $p0 += "_rtl";
    return $p0 + Mscrm.IconUtil.getFileExtension($p1, $p2)
};
Mscrm.IconUtil.isIconFlipped = function (objectTypeCode, iconType) {
    if (IsNull(objectTypeCode)) return window.LOCID_UI_DIR === "RTL";
    var $v_0 = false;
    switch (iconType) {
        case 0:
        case 2:
        case 3:
            break;
        case 7:
        case 4:
            switch (objectTypeCode) {
                case 135:
                case 5:
                case 10:
                case 132:
                case 1003:
                case 1004:
                case 3234:
                case 3231:
                case 4502:
                case 1201:
                case 1017:
                case 1019:
                case 1021:
                case 9804:
                case 1023:
                case 1037:
                case 1036:
                case 1086:
                case 150:
                case 2012:
                case 2027:
                case 2029:
                case 3e3:
                case 4004:
                case 4007:
                case 4102:
                case 33:
                case 4600:
                case 4602:
                case 4603:
                case 4110:
                case 6:
                case 4101:
                case 29:
                case 30:
                case 1072:
                case 4417:
                case 4415:
                case 4416:
                case 4023:
                case 4413:
                case 4423:
                case 4705:
                case 4419:
                case 4420:
                case 4418:
                case 4605:
                case 4500:
                case 4606:
                case 4607:
                case 4613:
                case 4608:
                case 4615:
                case 4609:
                case 4614:
                case 4610:
                case 4611:
                case 4426:
                case 4702:
                case 14:
                case 4703:
                case 4704:
                case 0:
                case 4427:
                case 4707:
                case 31:
                case 4501:
                case 4425:
                case 36:
                case 4708:
                case 4010:
                case 4011:
                case 4616:
                case 7100:
                case 4810:
                case 4812:
                case 4811:
                case 4800:
                case 4803:
                case 4802:
                case 9107:
                case 4212:
                case 4401:
                case 1116:
                case 1115:
                case 1117:
                case 1113:
                case 1130:
                case 9100:
                case 4230:
                case 9333:
                    break;
                default:
                    $v_0 = Mscrm.IconUtil.isIconFlipped();
                    break
            }
            break
    }
    return $v_0
};
Mscrm.RibbonConstants = function () {};
Mscrm.RuleAppliesTo = function () {};
Mscrm.RibbonRuleRelationshipType = function () {};
Mscrm.RibbonContexts = function () {};
Mscrm.BaseJsonResponse = function () {};
Mscrm.BaseJsonResponse.prototype = {
    Header: null,
    Markup: null
};
Mscrm.ControlJsonResponse = function () {
    Mscrm.ControlJsonResponse.initializeBase(this)
};
Mscrm.PageJsonResponse = function () {
    Mscrm.PageJsonResponse.initializeBase(this)
};
Mscrm.HeaderJsonObject = function () {};
Mscrm.HeaderJsonObject.prototype = {
    Title: null,
    ScriptList: null,
    StyleList: null,
    ScriptListIndex: 0,
    State: null
};
Mscrm.ScriptJsonObject = function () {};
Mscrm.ScriptJsonObject.prototype = {
    Script: null,
    Type: null,
    Id: null,
    AlwaysProcess: false
};
Mscrm.StyleJsonObject = function () {};
Mscrm.StyleJsonObject.prototype = {
    Style: null,
    Type: null,
    Id: null
};
Mscrm.TypeOfResource = function () {};
Mscrm.AggregatePerformanceMarkers = function () {
    this.$a_0 = {}
};
Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers = function () {
    if (!Mscrm.AggregatePerformanceMarkers.$2b) Mscrm.AggregatePerformanceMarkers.$2b = new Mscrm.AggregatePerformanceMarkers;
    return Mscrm.AggregatePerformanceMarkers.$2b
};
Mscrm.AggregatePerformanceMarkers.beginMarker = function (name) {
    if (!(name in Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0)) Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0[name] = new Mscrm.AggregateMarker;
    Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0[name].beginMarker()
};
Mscrm.AggregatePerformanceMarkers.endMarker = function (name) {
    if (!(name in Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0)) return;
    Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0[name].endMarker();
    setAttributeInWindow(name, Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0[name].$29_0.toString())
};
Mscrm.AggregatePerformanceMarkers.getMarkerByName = function (name) {
    return Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0[name]
};
Mscrm.AggregatePerformanceMarkers.resetMarker = function (name) {
    var $v_0 = Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0[name];
    if (IsNull($v_0)) return;
    $v_0.reset()
};
Mscrm.AggregatePerformanceMarkers.getMarkerValue = function (name, type) {
    var $v_0 = Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers().$a_0[name];
    if (IsNull($v_0)) return 0;
    switch (type) {
        case 2:
            return $v_0.$29_0;
        case 1:
            return $v_0.$2E_0;
        case 5:
            return $v_0.$22_0;
        case 4:
            return $v_0.$1t_0;
        case 3:
            return $v_0.$1w_0;
        case 0:
            return $v_0.$v_0;
        default:
            return Number.NaN
    }
};
Mscrm.AggregatePerformanceMarkers.prototype = {
    $a_0: null,
    get_markers: function () {
        return this.$a_0
    },
    accept: function (visitor) {
        visitor.visit(Mscrm.AggregatePerformanceMarkers.get_aggregateMarkers())
    }
};
Mscrm.AggregateMarker = function () {
    this.$1w_0 = Number.MAX_VALUE;
    this.$1t_0 = -1;
    this.$1O_0 = -1
};
Mscrm.AggregateMarker.prototype = {
    $v_0: 0,
    $4q_0: 0,
    $2E_0: 0,
    $22_0: 0,
    $29_0: 0,
    get_min: function () {
        return this.$1w_0
    },
    get_max: function () {
        return this.$1t_0
    },
    get_lastDuration: function () {
        return this.$v_0
    },
    get_lastTime: function () {
        return this.$4q_0
    },
    get_count: function () {
        return this.$2E_0
    },
    get_sum: function () {
        return this.$22_0
    },
    get_average: function () {
        return this.$29_0
    },
    beginMarker: function (currentValueMethod) {
        if (IsNull(currentValueMethod)) this.$1O_0 = (new Date).getTime();
        else this.$1O_0 = currentValueMethod()
    },
    endMarker: function (currentValueMethod) {
        var $v_0;
        if (IsNull(currentValueMethod)) $v_0 = (new Date).getTime();
        else $v_0 = currentValueMethod();
        if (this.$1O_0 <= 0) return;
        this.$2E_0++;
        this.$v_0 = $v_0 - this.$1O_0;
        if (this.$v_0 > this.$1t_0) this.$1t_0 = this.$v_0;
        if (this.$v_0 < this.$1w_0) this.$1w_0 = this.$v_0;
        this.$4q_0 = $v_0;
        this.$22_0 = this.$22_0 + this.$v_0;
        this.$29_0 = Math.round(this.$22_0 / this.$2E_0);
        this.$1O_0 = -1
    },
    reset: function () {
        this.$1w_0 = Number.MAX_VALUE;
        this.$v_0 = 0;
        this.$1t_0 = -1;
        this.$2E_0 = 0;
        this.$22_0 = 0;
        this.$29_0 = 0;
        this.$1O_0 = -1
    }
};
Mscrm.GlobalContext = function () {};
Mscrm.GlobalContext.prototype = {
    getAuthenticationHeader: function () {
        return GenerateAuthenticationHeader()
    },
    getOrgLcid: function () {
        return window.ORG_LANGUAGE_CODE
    },
    getOrgUniqueName: function () {
        return window.ORG_UNIQUE_NAME
    },
    getQueryStringParameters: function () {
        var $v_0 = Mscrm.CrmUri.create(window.location.href);
        return $v_0.get_query()
    },
    getServerUrl: function () {
        return window.SERVER_URL
    },
    getClientUrl: function () {
        var $v_0 = window.location.href.indexOf(window.location.pathname),
            $v_1 = Mscrm.CrmUri.create(window.location.href.substring(0, $v_0)),
            $v_2 = window.IS_PATHBASEDURLS;
        if (IsNull($v_2)) $v_2 = window.top.IS_PATHBASEDURLS;
        $v_2 && (!this.isOutlookClient() || this.isOutlookOnline()) && $v_1.set_useOrganizationName(true);
        var $v_3 = $v_1.toString(),
            $v_4 = $v_3.length - 1;
        if ($v_3.indexOf("/", $v_4) !== -1) $v_3 = $v_3.substring(0, $v_4);
        return $v_3
    },
    getUserId: function () {
        return window.USER_GUID
    },
    getUserLcid: function () {
        return window.USER_LANGUAGE_CODE
    },
    getUserRoles: function () {
        return window.USER_ROLES
    },
    isOutlookOnline: function () {
        return window.IS_ONLINE
    },
    isOutlookClient: function () {
        return window.IS_OUTLOOK_CLIENT
    },
    prependOrgName: function (url) {
        return prependOrgName(url)
    },
    getCurrentTheme: function () {
        if (this.isOutlookClient()) return window.CURRENT_THEME_TYPE;
        else return window.CURRENT_WEB_THEME
    }
};
Mscrm.EntityTypeCode = function () {};
Mscrm.EtcUtil = function () {};
Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode = function (objectTypeCode) {
    return objectTypeCode >= 1e4
};

function IsActivityTypeCode(objectTypeCode) {
    return Mscrm.EntityPropUtil.isActivityTypeCode(objectTypeCode)
}
function IsUserDefinedEntityObjectTypeCode(objectTypeCode) {
    return Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode(objectTypeCode)
}
Mscrm.EventKeys = function () {};
Mscrm.SolutionComponentType = function () {};
Mscrm.WebResourceConstants = function () {};
Mscrm.DialogsControl = function () {
    this.$$d_$6e_2 = Function.createDelegate(this, this.$6e_2);
    Mscrm.DialogsControl.initializeBase(this)
};
Mscrm.DialogsControl.IsValid = function () {
    for (var $v_0 = document.body.getElementsByTagName("*"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        var $v_2 = $v_0[$v_1];
        switch ($v_2.tagName) {
            case "INPUT":
            case "SELECT":
            case "TEXTAREA":
            case "TABLE":
            case "DIV":
            case "SPAN":
            case "IMG":
            case "IFRAME":
                var $v_3 = Mscrm.FormControlInputBehavior.GetElementBehavior($v_2);
                if (IsNull($v_3)) $v_3 = $find($v_2.id);
                if (!IsNull($v_3)) if (!IsNull($v_3.IsValid) && !$v_3.IsValid()) {
                    $v_2.focus();
                    return false
                }
                break
        }
    }
    return true
};
Mscrm.DialogsControl.prototype = {
    initialize: function () {
        Mscrm.CrmUIComponent.prototype.initialize.call(this);
        $addHandler(document, "keydown", this.$$d_$6e_2)
    },
    dispose: function () {
        $removeHandler(document, "keydown", this.$$d_$6e_2);
        Mscrm.CrmUIComponent.prototype.dispose.call(this)
    },
    $6e_2: function ($p0) {
        switch (Mscrm.Utilities.getDomEventKeyCode($p0)) {
            case 27:
                closeWindow();
                break;
            case 13:
                this.$6d_2($p0);
                break
        }
    },
    $6d_2: function ($p0) {
        var $v_0 = $p0.target;
        if (IsNull($v_0._events) || IsNull($v_0._events["keyup"]) && IsNull($v_0._events["keydown"]) && IsNull($v_0._events["keypress"])) switch ($v_0.tagName) {
            case "SPAN":
                switch ($v_0.className) {
                    case "ms-crm-Tab":
                    case "ms-crm-Menu":
                        this.$1f_2($p0);
                        return
                }
                break;
            case "BUTTON":
            case "IMG":
            case "SELECT":
            case "TEXTAREA":
                this.$1f_2($p0);
                return;
            case "DIV":
                switch ($v_0.className) {
                    case "ms-crm-Lookup":
                        this.$1f_2($p0);
                        return
                }
                break;
            case "INPUT":
                switch ($v_0.className) {
                    case "ms-crm-Dialog-Lookup-QuickFind":
                        this.$1f_2($p0);
                        return
                }
                var $v_4 = $v_0.getAttribute("type");
                switch ($v_4) {
                    case "text":
                        $p0.preventDefault();
                        return
                }
                break;
            case "A":
                switch ($v_0.className) {
                    case "ms-crm-FindButton":
                    case "wizText":
                    case "default-link":
                        this.$1f_2($p0);
                        return
                }
                var $v_5 = $v_0.getAttribute("selectEnable");
                if (!IsNull($v_5) && $v_5 === "true") {
                    this.$1f_2($p0);
                    return
                }
                break;
            case "TH":
                switch ($v_0.className) {
                    case "ms-crm-List-Sortable":
                        this.$1f_2($p0);
                        return
                }
                break
        }
        var $v_1 = $get("butBegin"),
            $v_2 = $get("cmdDialogApply"),
            $v_3 = $get("butDialogYes");
        if (!IsNull($v_1)) XUI.Html.DispatchDomEvent($v_1, XUI.Html.CreateDomEvent("click"));
        else if (!IsNull($v_2)) XUI.Html.DispatchDomEvent($v_2, XUI.Html.CreateDomEvent("click"));
        else !IsNull($v_3) && XUI.Html.DispatchDomEvent($v_3, XUI.Html.CreateDomEvent("click"))
    },
    $1f_2: function ($p0) {
        if (IsNull($p0.rawEvent)) return;
        if ("returnValue" in $p0.rawEvent) $p0.rawEvent.returnValue = "true";
        else if ("defaultPrevented" in $p0.rawEvent) $p0.rawEvent.defaultPrevented = "false"
    }
};
Mscrm.CrmHeader = function () {};
Mscrm.CrmHeader.get_scriptLoader = function () {
    if (IsNull(Mscrm.CrmHeader.$12)) Mscrm.CrmHeader.$12 = new Mscrm.ScriptLoader;
    return Mscrm.CrmHeader.$12
};
Mscrm.CrmHeader.get_styleLoader = function () {
    if (IsNull(Mscrm.CrmHeader.$1H)) Mscrm.CrmHeader.$1H = new Mscrm.StyleLoader;
    return Mscrm.CrmHeader.$1H
};
Mscrm.CrmHeader.setScriptFile = function (uri, useInlineScripts, scriptLoaded) {
    if (uri.get_path().toUpperCase() === "/_STATIC/_COMMON/SCRIPTS/GLOBAL.JS") uri = Mscrm.CrmUri.create("/_common/global.ashx");
    if (useInlineScripts) Mscrm.CrmHeader.get_scriptLoader().addIncludeExternalSync(null, uri);
    else Mscrm.CrmHeader.get_scriptLoader().addIncludeExternalCallback(null, uri, scriptLoaded)
};
Mscrm.CrmHeader.setStyleSheet = function (uri, useInlineStyle) {
    if (!IsNull(useInlineStyle) && useInlineStyle) Mscrm.CrmHeader.get_styleLoader().addIncludeExternalSync(null, uri);
    else Mscrm.CrmHeader.get_styleLoader().addIncludeExternal(null, uri)
};
Mscrm.CrmHeader.loadTitle = function (title) {
    document.title = title
};
Mscrm.IncludeLoader = function () {};
Mscrm.IncludeLoader.prototype = {
    get_headElement: function () {
        var $v_0 = document.getElementsByTagName("HEAD");
        return $v_0[0]
    },
    addIncludeExternalSync: function (container, uri) {},
    addIncludeExternal: function (container, uri) {},
    addIncludeInline: function (container, content, id) {},
    fetchExternalFile: function (rawUrl) {
        var $v_0 = new XMLHttpRequest;
        $v_0.open("GET", rawUrl, false);
        $v_0.send(null);
        if ($v_0.status !== 200);
        return $v_0.responseText
    }
};
Mscrm.ScriptLoader = function () {
    Mscrm.ScriptLoader.initializeBase(this)
};
Mscrm.ScriptLoader.$6f = function ($p0, $p1) {
    if (!IsNull($p0.readyState)) $addHandler($p0, "readystatechange", function ($p1_0) {
        var $v_0 = $p0.readyState;
        if ($v_0 === "loaded" || $v_0 === "complete") {
            $clearHandlers($p0);
            $p1()
        }
    });
    else $addHandler($p0, "load", function ($p1_0) {
        $clearHandlers($p0);
        $p1()
    })
};
Mscrm.ScriptLoader.prototype = {
    addIncludeExternalSync: function (container, scriptFile) {
        var $v_0 = scriptFile.toString();
        if (this.$5Z_1($v_0)) return;
        var $v_1 = this.fetchExternalFile($v_0);
        this.addIncludeInline(container, $v_1, $v_0)
    },
    addIncludeExternal: function (container, scriptFile) {
        this.addIncludeExternalCallback(container, scriptFile, null)
    },
    addIncludeExternalCallback: function (container, scriptFile, scriptLoaded) {
        var $v_0 = scriptFile.toString();
        if (!IsNull($get($v_0))) return;
        if (IsNull(container)) container = this.get_headElement();
        var $v_1 = container.ownerDocument.createElement("script");
        container.appendChild($v_1);
        $v_1.setAttribute("type", "text/javascript");
        $v_1.setAttribute("src", $v_0);
        $v_1.setAttribute("id", $v_0);
        !IsNull(scriptLoaded) && Mscrm.ScriptLoader.$6f($v_1, scriptLoaded)
    },
    addIncludeInline: function (container, scriptContent, id) {
        if (IsNull(container)) container = this.get_headElement();
        var $v_0 = container.ownerDocument.createElement("script");
        container.appendChild($v_0);
        !isNullOrEmptyString(id) && $v_0.setAttribute("id", id);
        $v_0.setAttribute("type", "text/javascript");
        $v_0.text = scriptContent
    },
    $5Z_1: function ($p0) {
        var $v_0 = $get($p0);
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.attributes.getNamedItem("loadState");
            if (!$v_1 || $v_1.value === "complete") return true
        }
        return false
    },
    $6G_1: function ($p0, $p1) {
        if ($p0.AlwaysProcess) return false;
        if (isNullOrEmptyString($p0.Id)) return false;
        var $v_0 = $get($p0.Id);
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.attributes.getNamedItem("loadState");
            if ($v_1 && $v_1.value !== "complete") return false;
            $v_0.parentNode === $p1 && $v_0.removeAttribute("delete");
            return true
        }
        return false
    },
    markAllScriptsForDelete: function (container) {
        for (var $v_0 = container.getElementsByTagName("script"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) $v_0[$v_1].setAttribute("delete", "true")
    },
    cleanupMarkedScripts: function (container, forceCleanAllScripts) {
        var $$t_5 = this;
        window.setTimeout(function () {
            for (var $v_0 = container.getElementsByTagName("script"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
                var $v_2 = $v_0[$v_1];
                if (forceCleanAllScripts || !isNullOrEmptyString($v_2.getAttribute("delete"))) {
                    $v_2.parentNode.removeChild($v_2);
                    Mscrm.Utilities.destroyObject($v_2)
                }
            }
        }, 10)
    },
    loadScripts: function (container, headerJsonObject, async, clean) {
        var $v_0 = headerJsonObject.State;
        if (!isNullOrEmptyString($v_0) && $v_0 !== "loadingAsync") return;
        if (IsNull(headerJsonObject.ScriptList)) return;
        var $v_1 = headerJsonObject.ScriptList;
        this.$4B_1 = false;
        this.$4b_1 = clean;
        clean && this.markAllScriptsForDelete(container);
        if (!async) {
            headerJsonObject.State = "loadingSync";
            var $v_2 = headerJsonObject.ScriptListIndex;
            if (IsNull($v_2)) $v_2 = 0;
            else {
                var $v_3 = $v_1[$v_2];
                if (this.$5Z_1($v_3.Id)) $v_2++
            }
            for (; $v_2 < $v_1.length; $v_2++) {
                var $v_4 = $v_1[$v_2];
                if (typeof $v_4.Script == "function") $v_4.Script.apply({});
                else if ($v_4.Type === "inline") this.addIncludeInline(container, $v_4.Script);
                else this.addIncludeExternalSync(container, $v_4.Script)
            }
            headerJsonObject.State = "complete"
        } else {
            headerJsonObject.State = "loadingAsync";
            if (IsNull(headerJsonObject.ScriptListIndex)) headerJsonObject.ScriptListIndex = 0;
            this.$5r_1(container, headerJsonObject)
        }
    },
    $4B_1: false,
    $4b_1: false,
    ContinueProcessing: function (container, headerJsonObject) {
        headerJsonObject.ScriptListIndex++;
        this.$5r_1(container, headerJsonObject)
    },
    $5r_1: function ($p0, $p1) {
        for (var $v_0 = $p1.ScriptList; $p1.ScriptListIndex < $v_0.length; $p1.ScriptListIndex++) {
            var $v_1 = $v_0[$p1.ScriptListIndex];
            if (typeof $v_1.Script == "function") {
                $v_1.Script.apply({});
                continue
            }
            if (this.$6G_1($v_1, $p0)) continue;
            var $v_2 = $p0.ownerDocument.createElement("script");
            $v_2.type = "text/javascript";
            if (!isNullOrEmptyString($v_1.Id)) $v_2.id = $v_1.Id;
            if ($v_1.Type === "inline") {
                var $v_3 = $v_1.Script;
                $v_2.text = $v_3;
                $p0.appendChild($v_2)
            } else {
                var $v_4 = $get($v_1.Id);
                if (!IsNull($v_4)) $v_2 = $v_4;
                else {
                    $v_2.src = $v_1.Script;
                    $v_2.setAttribute("loadState", "loading");
                    $p0.appendChild($v_2)
                }
                this.$69_1($v_2, $p0, $p1, this);
                break
            }
        }
        if ($p1.ScriptListIndex >= $v_0.length) {
            $p1.State = "complete";
            this.$4b_1 && this.cleanupMarkedScripts($p0, false)
        }
    },
    $69_1: function ($p0, $p1, $p2, $p3) {
        var loadCallback = {
            Container: $p1,
            HeaderJsonObject: $p2,
            Context: $p3
        }, stop = this.$4B_1;
        if ($p0._loadHandler) $p0._loadHandler.push(loadCallback);
        else {
            $p0._loadHandler = [];
            $p0._loadHandler.push(loadCallback);
            var callback = this.ContinueProcessing;
            if ($p0.readyState) $p0.onreadystatechange = function () {
                if (stop) {
                    $p0.onreadystatechange = null;
                    cleanLoadHandler($p0);
                    return
                }
                if ($p0.readyState == "loaded" || $p0.readyState == "complete") {
                    $p0.onreadystatechange = null;
                    $p0.setAttribute("loadState", "complete");
                    for (var i = 0, len = $p0._loadHandler.length; i < len; i++) {
                        var obj = $p0._loadHandler[i];
                        if (obj.HeaderJsonObject.CancelAsync) continue;
                        callback.call(obj.Context, obj.Container, obj.HeaderJsonObject)
                    }
                    cleanLoadHandler($p0)
                }
            };
            else $p0.onload = function () {
                $p0.onload = null;
                $p0.setAttribute("loadState", "complete");
                if (stop) {
                    cleanLoadHandler($p0);
                    return
                }
                for (var i = 0, len = $p0._loadHandler.length; i < len; i++) {
                    var obj = $p0._loadHandler[i];
                    if (obj.HeaderJsonObject.CancelAsync) continue;
                    callback.call(obj.Context, obj.Container, obj.HeaderJsonObject)
                }
                cleanLoadHandler($p0)
            }
        }
        function cleanLoadHandler(scriptElement) {
            delete scriptElement._loadHandler;
            scriptElement._loadHandler = null
        }
    },
    cancelAnyCurrentProcessing: function () {
        this.$4B_1 = true
    }
};
Mscrm.StyleLoader = function () {
    Mscrm.StyleLoader.initializeBase(this)
};
Mscrm.StyleLoader.prototype = {
    addIncludeExternalSync: function (container, styleSheet) {
        var $v_0 = styleSheet.toString();
        if (!IsNull($get($v_0))) return;
        var $v_1 = this.fetchExternalFile($v_0);
        this.addIncludeInline(container, $v_1, $v_0)
    },
    addIncludeExternal: function (container, styleSheet) {
        var $v_0 = styleSheet.toString();
        if (!IsNull($get($v_0))) return;
        if (IsNull(container)) container = this.get_headElement();
        container.appendChild(this.$6Y_1(container, styleSheet))
    },
    $6Y_1: function ($p0, $p1) {
        var $v_0 = $p1.toString(),
            $v_1 = $p0.ownerDocument.createElement("link");
        $v_1.href = $v_0;
        $v_1.setAttribute("rel", "stylesheet");
        $v_1.id = $v_0;
        return $v_1
    },
    addIncludeInline: function (container, styleContent) {
        if (IsNull(container)) container = this.get_headElement();
        container.appendChild(this.$6a_1(container, styleContent))
    },
    $6a_1: function ($p0, $p1) {
        var $v_0 = $p0.ownerDocument.createElement("style");
        $v_0.type = "text/css";
        if ($v_0.styleSheet) $v_0.styleSheet.cssText = $p1;
        else $v_0.appendChild($p0.ownerDocument.createTextNode($p1));
        return $v_0
    },
    loadStyles: function (container, headerJsonObject) {
        var $v_0 = headerJsonObject.State;
        if (!isNullOrEmptyString($v_0) || IsNull(headerJsonObject.StyleList)) return;
        for (var $v_1 = headerJsonObject.StyleList, $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
            var $v_3 = $v_1[$v_2],
                $v_4 = $v_3.Type,
                $v_5 = $v_3.Style;
            switch ($v_4) {
                case "inline":
                    this.addIncludeInline(container, $v_5);
                    break;
                case "external":
                    this.addIncludeExternal(container, Mscrm.CrmUri.create($v_5));
                    break
            }
        }
    }
};
Mscrm.Dialog = function (container) {
    this.$$d_$5j_2 = Function.createDelegate(this, this.$5j_2);
    this.$$d_$6y_2 = Function.createDelegate(this, this.$6y_2);
    this.$$d_$72_2 = Function.createDelegate(this, this.$72_2);
    this.$$d_$5f_2 = Function.createDelegate(this, this.$5f_2);
    this.$$d_$5e_2 = Function.createDelegate(this, this.$5e_2);
    this.$$d_$73_2 = Function.createDelegate(this, this.$73_2);
    this.$$d_$70_2 = Function.createDelegate(this, this.$70_2);
    this.$1W_2 = Mscrm.Dialog.$5c++;
    this.$S_2 = Mscrm.Dialog.auto;
    this.$K_2 = 300;
    this.$T_2 = Mscrm.Dialog.auto;
    this.$O_2 = Mscrm.Dialog.auto;
    this.$2j_2 = "ms-crm-modalDialog";
    this.$36_2 = "ms-crm-Floating-Div";
    this.$33_2 = window.LOCID_PAGELOADING_MSG;
    Mscrm.Dialog.initializeBase(this);
    if (IsNull(container)) {
        container = document.createElement("div");
        document.body.appendChild(container)
    }
    this.$0_2 = container;
    this.$0_2.style.display = "none";
    if (Mscrm.Utilities.isIE7()) this.$2K_2 = this.$$d_$70_2
};
Mscrm.Dialog.createDialog = function (container) {
    return $create(Mscrm.Dialog, null, null, null, container)
};
Mscrm.Dialog.$5Q = function ($p0) {
    try {
        $p0.focus()
    } catch ($$e_1) {}
};
Mscrm.Dialog.prototype = {
    get_dialogId: function () {
        if (!IsNull(this.$0_2)) return this.$0_2.id;
        return ""
    },
    set_dialogId: function (value) {
        if (Mscrm.Utilities.get_isStandardsMode()) if (!isNullOrEmptyString(value)) this.$0_2.id = "Dialog_" + value;
        else this.$0_2.id = "Dialog_" + this.$1W_2.toString();
        else if (!isNullOrEmptyString(value)) this.$0_2.setAttribute("name", "Dialog_" + value);
        else this.$0_2.setAttribute("name", "Dialog_" + this.$1W_2.toString());
        return value
    },
    $0_2: null,
    $B_2: null,
    $3K_2: 0,
    $4E_2: 0,
    $3L_2: 0,
    $51_2: 0,
    $3z_2: 0,
    $40_2: 0,
    $3i_2: 0,
    $1R_2: false,
    $1P_2: true,
    $3n_2: true,
    $4o_2: false,
    get_$2V_2: function () {
        return this.$4o_2
    },
    set_$2V_2: function ($p0) {
        this.$4W_2("rendering", $p0.toString());
        this.$4o_2 = $p0;
        return $p0
    },
    $9_2: false,
    $d_2: 0,
    $y_2: 0,
    $D_2: null,
    $6_2: null,
    $C_2: null,
    $X_2: null,
    $Y_2: null,
    $x_2: true,
    $w_2: true,
    $1G_2: true,
    $1Z_2: true,
    $1q_2: false,
    $2Q_2: null,
    $r_2: null,
    $3F_2: null,
    $37_2: null,
    $4F_2: null,
    $4l_2: null,
    $2K_2: null,
    $t_2: false,
    $z_2: "ms-crm-LoadingContainer",
    $F_2: null,
    $4r_2: "/_imgs/AdvFind/progress.gif",
    $1D_2: null,
    $2R_2: null,
    $11_2: null,
    $2I_2: 0,
    $2J_2: 0,
    $1n_2: true,
    $b_2: false,
    $G_2: null,
    $67_2: "ms-crm-modalDialog-shadow",
    $M_2: null,
    $2k_2: 0,
    $2q_2: null,
    $32_2: null,
    $1S_2: true,
    $1T_2: true,
    get_loadingClassName: function () {
        return this.$z_2
    },
    set_loadingClassName: function (value) {
        this.$z_2 = value;
        if (!IsNull(this.$F_2)) this.$F_2.className = value;
        return value
    },
    get_enableShadow: function () {
        return this.$3n_2
    },
    set_enableShadow: function (value) {
        this.$3n_2 = value;
        return value
    },
    get_focusOutCheck: function () {
        return this.$1n_2
    },
    set_focusOutCheck: function (value) {
        this.$1n_2 = value;
        return value
    },
    get_neverGrabFocus: function () {
        return this.$b_2
    },
    set_neverGrabFocus: function (value) {
        this.$b_2 = value;
        return value
    },
    get_reference: function () {
        return this.$11_2
    },
    set_reference: function (value) {
        this.$11_2 = value;
        return value
    },
    get_hideCallback: function () {
        return this.$2R_2
    },
    set_hideCallback: function (value) {
        this.$2R_2 = value;
        return value
    },
    get_top: function () {
        return this.$d_2
    },
    set_top: function (value) {
        if (this.$d_2 === value) return value;
        this.$E_2();
        this.$d_2 = IsNull(value) ? 0 : value;
        this.$9_2 = true;
        return value
    },
    get_left: function () {
        return this.$y_2
    },
    set_left: function (value) {
        if (this.$y_2 === value) return value;
        this.$E_2();
        this.$y_2 = IsNull(value) ? 0 : value;
        this.$9_2 = true;
        return value
    },
    get_height: function () {
        return this.$S_2
    },
    set_height: function (value) {
        if (this.$S_2 === value) return value;
        this.$E_2();
        this.$S_2 = IsNull(value) ? Mscrm.Dialog.auto : value;
        this.$9_2 = true;
        return value
    },
    get_width: function () {
        return this.$K_2
    },
    set_width: function (value) {
        if (this.$K_2 === value) return value;
        this.$E_2();
        this.$K_2 = IsNull(value) ? 0 : value;
        this.$9_2 = true;
        return value
    },
    get_minHeight: function () {
        return this.$T_2
    },
    set_minHeight: function (value) {
        if (this.$T_2 === value) return value;
        this.$E_2();
        this.$T_2 = IsNull(value) ? Mscrm.Dialog.auto : value;
        this.$9_2 = true;
        this.$64_2();
        return value
    },
    get_maxHeight: function () {
        return this.$O_2
    },
    set_maxHeight: function (value) {
        if (this.$O_2 === value) return value;
        this.$E_2();
        this.$O_2 = IsNull(value) ? Mscrm.Dialog.auto : value;
        this.$9_2 = true;
        this.$64_2();
        return value
    },
    get_header: function () {
        return this.$D_2
    },
    set_header: function (value) {
        if (this.$D_2 === value) return value;
        this.$E_2();
        if (this.$1R_2) if (!IsNull(this.$D_2)) if (IsNull(value)) this.$D_2.parentNode.removeChild(this.$D_2);
        else this.$D_2.parentNode.replaceChild(value, this.$D_2);
        else !IsNull(value) && this.$6_2.insertBefore(value);
        this.$D_2 = value;
        this.$1P_2 = true;
        this.$9_2 = true;
        return value
    },
    get_body: function () {
        return this.$1D_2
    },
    set_body: function (value) {
        if (value === this.$1D_2) return value;
        if (IsNull(value)) value = document.createElement("div");
        if (!this.$t_2) {
            this.$E_2();
            if (this.$1R_2) {
                this.$6_2.parentNode.replaceChild(value, this.$6_2);
                this.$1P_2 = true;
                this.$9_2 = true
            }
            this.$6_2 = value
        }
        this.$1D_2 = value;
        return value
    },
    get_footer: function () {
        return this.$C_2
    },
    set_footer: function (value) {
        if (this.$C_2 === value) return value;
        this.$E_2();
        if (this.$1R_2) if (!IsNull(this.$C_2)) if (IsNull(value)) this.$C_2.parentNode.removeChild(this.$C_2);
        else this.$C_2.parentNode.replaceChild(value, this.$C_2);
        else !IsNull(value) && this.$0_2.appendChild(value);
        this.$C_2 = value;
        this.$1P_2 = true;
        this.$9_2 = true;
        return value
    },
    get_focusElementOnHide: function () {
        return this.$X_2
    },
    set_focusElementOnHide: function (value) {
        this.$E_2();
        this.$X_2 = value;
        return value
    },
    get_focusElementOnShow: function () {
        return this.$Y_2
    },
    set_focusElementOnShow: function (value) {
        this.$E_2();
        this.$Y_2 = value;
        return value
    },
    get_launchesRight: function () {
        return this.$x_2
    },
    set_launchesRight: function (value) {
        if (this.$x_2 === value) return value;
        this.$E_2();
        this.$x_2 = value;
        this.$9_2 = true;
        return value
    },
    get_launchesDown: function () {
        return this.$w_2
    },
    set_launchesDown: function (value) {
        if (this.$w_2 === value) return value;
        this.$E_2();
        this.$w_2 = value;
        this.$9_2 = true;
        return value
    },
    get_shiftVertical: function () {
        return this.$1G_2
    },
    set_shiftVertical: function (value) {
        if (this.$1G_2 === value) return value;
        this.$E_2();
        this.$1G_2 = value;
        this.$9_2 = true;
        return value
    },
    get_showingCallback: function () {
        return this.$3F_2
    },
    set_showingCallback: function (value) {
        this.$3F_2 = value;
        return value
    },
    get_shiftHorizontal: function () {
        return this.$1Z_2
    },
    set_shiftHorizontal: function (value) {
        if (this.$1Z_2 === value) return value;
        this.$E_2();
        this.$1Z_2 = value;
        this.$9_2 = true;
        return value
    },
    get_isModal: function () {
        return this.$1q_2
    },
    set_isModal: function (value) {
        this.$E_2();
        this.$1q_2 = value;
        return value
    },
    get_zIndex: function () {
        return this.get_$5g_2()
    },
    get_overlayClickCallback: function () {
        return this.$37_2
    },
    set_overlayClickCallback: function (value) {
        this.$E_2();
        this.$37_2 = value;
        return value
    },
    get_containerClassName: function () {
        return this.$2j_2
    },
    set_containerClassName: function (value) {
        this.$2j_2 = IsNull(value) ? "" : value;
        return value
    },
    get_overlayClassName: function () {
        return this.$36_2
    },
    set_overlayClassName: function (value) {
        this.$36_2 = IsNull(value) ? "" : value;
        return value
    },
    get_enforceHorizontalOffset: function () {
        return this.$1S_2
    },
    set_enforceHorizontalOffset: function (value) {
        this.$1S_2 = value;
        return value
    },
    get_enforceVerticalOffset: function () {
        return this.$1T_2
    },
    set_enforceVerticalOffset: function (value) {
        this.$1T_2 = value;
        return value
    },
    get_isLoading: function () {
        return this.$t_2
    },
    set_isLoading: function (value) {
        if (this.$t_2 === value) return value;
        this.$t_2 = value;
        this.$9_2 = true;
        if (!this.$1R_2) return value;
        if (value) {
            this.$F_2.style.height = this.$6_2.style.height;
            this.$F_2.style.width = this.$K_2 + "px";
            this.$6_2.parentNode.replaceChild(this.$F_2, this.$6_2);
            this.$6_2 = this.$F_2
        } else {
            this.$6_2.parentNode.replaceChild(this.$1D_2, this.$6_2);
            this.$6_2 = this.$1D_2
        }
        return value
    },
    get_isVisible: function () {
        return XUI.Html.GetComputedStyle(this.$0_2, "display") === "block"
    },
    get_bodyHeight: function () {
        if (IsNull(this.$6_2)) return 0;
        var $v_0 = this.$3i_2 - Mscrm.Utilities.getVerticalBoxPadding(this.$6_2),
            $v_1 = this.$6_2.offsetHeight - Mscrm.Utilities.getVerticalBoxPadding(this.$6_2);
        return $v_0 < $v_1 ? $v_1 : $v_0
    },
    $78_2: function () {
        if (this.$6q_2() || this.$1D_2.scrollHeight > this.$1D_2.clientHeight) {
            var $v_0 = this.$K_2 + this.$6E_2();
            Mscrm.Utilities.setOuterWidth(this.$0_2, $v_0);
            Mscrm.Utilities.setInnerWidth(this.$G_2, $v_0)
        }
    },
    $56_2: function ($p0, $p1) {
        if (!IsNull($p0.offsetParent)) {
            $p1[0] += $p0.offsetParent.offsetTop;
            this.$56_2($p0.offsetParent, $p1)
        } else $p1[1] = $p0.offsetHeight;
        return $p1
    },
    $57_2: function () {
        var $v_0;
        if (this.$1G_2) $v_0 = this.$3K_2;
        else if (this.$w_2) {
            this.$0_2.style.display = "block";
            var $v_1 = [this.$d_2, 0];
            $v_1 = this.$56_2(this.$0_2, $v_1);
            $v_0 = Math.round($v_1[1] * .98) + this.$3L_2 - $v_1[0]
        } else $v_0 = this.$d_2 - (this.$3L_2 - 1);
        return $v_0
    },
    $6q_2: function () {
        var $v_0;
        $v_0 = this.$57_2();
        var $v_1 = this.$58_2($v_0),
            $v_2 = $v_1 - Mscrm.Utilities.getVerticalBoxPadding(this.$0_2),
            $v_3 = $v_2 - this.$2J_2 - this.$2I_2,
            $v_4 = XUI.Html.GetComputedStyle(this.$6_2, "overflow"),
            $v_5 = XUI.Html.GetComputedStyle(this.$6_2, "overflowY"),
            $v_6 = $v_4 === "scroll" || $v_5 === "scroll",
            $v_7 = this.$3i_2 > $v_3 && ($v_4 === "auto" || $v_5 === "auto");
        if ($v_6 || $v_7) return true;
        return false
    },
    get_bodyWidth: function () {
        if (IsNull(this.$0_2) || IsNull(this.$6_2)) return 0;
        var $v_0 = this.$K_2 - Mscrm.Utilities.getHorizontalBoxPadding(this.$0_2) - Mscrm.Utilities.getHorizontalBoxPadding(this.$6_2);
        return $v_0
    },
    $6E_2: function () {
        var $v_0 = document.createElement("div"),
            $v_1 = document.createElement("p");
        $v_0.style.position = "absolute";
        $v_0.style.top = "0px";
        $v_0.style.left = "0px";
        $v_0.style.visibility = "hidden";
        $v_0.style.width = "300px";
        $v_0.style.height = "150px";
        $v_0.style.overflow = "hidden";
        $v_1.style.height = "300px";
        $v_0.appendChild($v_1);
        document.body.appendChild($v_0);
        var $v_2 = $v_1.offsetWidth;
        $v_0.style.overflow = "scroll";
        var $v_3 = $v_1.offsetWidth;
        if ($v_3 === $v_2) $v_3 = $v_0.clientWidth;
        document.body.removeChild($v_0);
        return $v_2 - $v_3
    },
    get_$5g_2: function () {
        return 2e3 + this.$1W_2 * 4
    },
    get_$6A_2: function () {
        return 2e3 + this.$1W_2 * 4 + 1
    },
    get_$7F_2: function () {
        return 2e3 + this.$1W_2 * 4 + 2
    },
    get_$6J_2: function () {
        return 2e3 + this.$1W_2 * 4 + 3
    },
    initialize: function () {
        Mscrm.CrmHeader.setStyleSheet(Mscrm.CrmUri.create("/_common/styles/menucore.css.aspx"), true);
        Mscrm.CrmHeader.setStyleSheet(Mscrm.CrmUri.create("/_nav/menu.css.aspx"), true);
        this.$5n_2();
        this.$4F_2 = this.$$d_$73_2;
        $addHandler(window, "resize", this.$4F_2);
        Mscrm.CrmUIComponent.prototype.initialize.call(this)
    },
    show: function (callback) {
        if (!this.$63_2()) return;
        this.$5B_2();
        this.$E_2();
        this.$2Q_2 = callback;
        !this.$1R_2 && this.$6L_2();
        this.$B_2.style.height = document.documentElement.offsetHeight.toString() + "px";
        this.$B_2.style.width = document.documentElement.offsetWidth.toString() + "px";
        !IsNull(this.$2K_2) && $addHandler(document.body, "click", this.$2K_2);
        this.set_$2V_2(true);
        var $$t_1 = this;
        window.setTimeout(function () {
            if ($$t_1.$1P_2) $$t_1.$6D_2();
            else if ($$t_1.$9_2) $$t_1.$5x_2();
            else $$t_1.$5E_2()
        }, 1)
    },
    hide: function (callback) {
        if (!this.get_isVisible()) return;
        this.$5B_2();
        this.$E_2();
        this.$B_2.style.display = "none";
        this.$0_2.style.display = "none";
        this.$G_2.style.display = "none";
        this.$4W_2("displayed", "false");
        this.$6M_2();
        !IsNull(this.$2K_2) && $removeHandler(document.body, "click", this.$2K_2);
        this.$r_2 = callback;
        if (!IsNull(this.$r_2) || !IsNull(this.$2R_2)) this.$5j_2();
        else {
            this.set_$2V_2(false);
            if (!IsNull(this.$X_2) && !this.$b_2) try {
                this.$X_2.parentNode && this.$X_2.focus()
            } catch ($$e_1) {}
        }
    },
    refresh: function (callback) {
        this.$9_2 = true;
        this.$1P_2 = true;
        if (this.get_isVisible()) this.show(callback);
        else !IsNull(callback) && callback(this)
    },
    dispose: function () {
        if (this._disposed) return;
        $removeHandler(window, "resize", this.$4F_2);
        !IsNull(this.$G_2) && !IsNull(this.$G_2.parentNode) && this.$G_2.parentNode.removeChild(this.$G_2);
        if (this.$1R_2) {
            $clearHandlers(this.$B_2);
            $clearHandlers(this.$0_2);
            this.$0_2.innerHTML = "";
            !IsNull(this.$B_2) && !IsNull(this.$B_2.parentNode) && this.$B_2.parentNode.removeChild(this.$B_2)
        }
        this.$0_2 = null;
        this.$B_2 = null;
        this.$D_2 = null;
        this.$6_2 = null;
        this.$C_2 = null;
        Mscrm.CrmUIComponent.prototype.dispose.call(this)
    },
    $5n_2: function () {
        var $v_0 = document.documentElement;
        this.$3z_2 = $v_0.offsetHeight;
        this.$40_2 = $v_0.offsetWidth;
        this.$3K_2 = Math.round($v_0.offsetHeight * .98);
        this.$4E_2 = Math.round($v_0.offsetWidth * .98);
        this.$3L_2 = Math.round(($v_0.offsetHeight - this.$3K_2) / 2);
        this.$51_2 = Math.round(($v_0.offsetWidth - this.$4E_2) / 2)
    },
    $6L_2: function () {
        if (Mscrm.Utilities.get_isStandardsMode()) this.$0_2.className = this.$2j_2;
        this.$0_2.style.position = "absolute";
        this.$0_2.style.zIndex = this.get_$6J_2();
        this.$0_2.style.display = "none";
        $addHandler(this.$0_2, "keydown", this.$$d_$5e_2);
        this.$G_2 = document.createElement("div");
        this.$G_2.className = this.$67_2;
        this.$G_2.style.display = "none";
        this.$G_2.style.position = "absolute";
        this.$G_2.style.zIndex = this.get_$7F_2();
        this.$0_2.parentNode.appendChild(this.$G_2);
        this.$B_2 = document.createElement("div");
        this.$B_2.className = this.$36_2;
        XUI.Html.SetOpacity(this.$B_2, 0);
        this.$B_2.style.zIndex = this.get_$5g_2();
        this.$B_2.style.display = "none";
        this.$B_2.tabIndex = 0;
        if (!Mscrm.Utilities.get_isStandardsMode()) this.$B_2.style.position = "absolute";
        if (Mscrm.Utilities.get_isStandardsMode()) this.$0_2.parentNode.appendChild(this.$B_2);
        else {
            var $v_0 = document.createElement("div");
            this.$0_2.parentNode.appendChild($v_0);
            $v_0.appendChild(this.$B_2)
        }
        this.$4l_2 = this.$$d_$5f_2;
        $addHandler(this.$B_2, "click", this.$4l_2);
        $addHandler(this.$B_2, "focus", this.$$d_$72_2);
        this.$F_2 = document.createElement("div");
        this.$F_2.className = this.$z_2;
        this.$F_2.id = "LoadingContainer";
        this.$F_2.innerHTML = String.format("<table class='{1}'><tr class='{1}'><td style='vertical-align: middle' align='center'><IMG id='loading' alt='' src='{2}'><br>{0}</td></tr></table>", CrmEncodeDecode.CrmHtmlEncode(this.$33_2), CrmEncodeDecode.CrmHtmlAttributeEncode(this.$z_2), CrmEncodeDecode.CrmHtmlAttributeEncode(this.$4r_2));
        if (this.$t_2) this.$6_2 = this.$F_2;
        !IsNull(this.$D_2) && this.$0_2.appendChild(this.$D_2);
        if (IsNull(this.$6_2)) this.$6_2 = document.createElement("div");
        this.$0_2.appendChild(this.$6_2);
        !IsNull(this.$C_2) && this.$0_2.appendChild(this.$C_2);
        this.$1R_2 = true
    },
    $6D_2: function () {
        if (Mscrm.Utilities.get_isLeftToRight()) this.$0_2.style.left = "-" + (this.$K_2 + 1e3) + "px";
        else this.$0_2.style.left = document.body.offsetWidth + 1e3 + "px";
        this.$0_2.style.top = "0px";
        this.$0_2.style.height = "auto";
        Mscrm.Utilities.setOuterWidth(this.$0_2, this.$K_2);
        this.$0_2.style.display = "block";
        this.$6_2.style.height = "auto";
        window.setTimeout(this.$$d_$6y_2, 1)
    },
    $6y_2: function () {
        if (!this.$63_2()) return;
        this.$2I_2 = 0;
        if (!IsNull(this.$C_2)) this.$2I_2 = this.$C_2.offsetHeight;
        this.$2J_2 = 0;
        if (!IsNull(this.$D_2)) this.$2J_2 = this.$D_2.offsetHeight;
        this.$2k_2 = 0;
        if (!IsNull(this.$0_2) && !IsNull(this.$1D_2)) {
            if (this.$0_2.style.display === "none") this.$0_2.style.display = "block";
            this.$2k_2 = this.$0_2.offsetHeight
        }
        this.$3i_2 = this.$2k_2 - Mscrm.Utilities.getVerticalBoxPadding(this.$0_2) - this.$2J_2 - this.$2I_2;
        this.$5x_2();
        this.$1P_2 = false
    },
    $5x_2: function () {
        var $v_0;
        $v_0 = this.$57_2();
        var $v_1 = this.$58_2($v_0),
            $v_2 = this.$59_2(this.$d_2, $v_1 - 1, this.$1T_2 ? this.$3L_2 : 0, this.$1T_2 ? this.$3K_2 : document.documentElement.offsetHeight, this.$1G_2, this.$w_2, this.$w_2),
            $v_3 = this.$59_2(this.$y_2, this.$K_2 - 1, this.$1S_2 ? this.$51_2 : 0, this.$1S_2 ? this.$4E_2 : document.documentElement.offsetWidth, this.$1Z_2, Mscrm.Utilities.get_isLeftToRight() ? this.$x_2 : !this.$x_2, this.$x_2),
            $v_4 = $v_1 - Mscrm.Utilities.getVerticalBoxPadding(this.$0_2),
            $v_5 = $v_4 - this.$2J_2 - this.$2I_2,
            $v_6 = this.$K_2 - Mscrm.Utilities.getHorizontalBoxPadding(this.$0_2),
            $v_7 = $v_5 - Mscrm.Utilities.getVerticalBoxPadding(this.$6_2);
        this.$2q_2 = this.$5O_2(this.$0_2);
        this.$32_2 = this.$5P_2(this.$0_2);
        this.$75_2($v_2, $v_3, $v_4, $v_6, $v_7);
        this.$5E_2();
        this.$9_2 = false
    },
    $75_2: function ($p0, $p1, $p2, $p3, $p4) {
        Mscrm.Utilities.setInnerHeight(this.$0_2, $p2);
        Mscrm.Utilities.setInnerWidth(this.$0_2, $p3);
        this.$0_2.style.top = $p0 + "px";
        this.$0_2.style.left = $p1 + "px";
        Mscrm.Utilities.setInnerHeight(this.$G_2, $p2);
        Mscrm.Utilities.setInnerWidth(this.$G_2, $p3);
        this.$G_2.style.top = $p0 + 1 + "px";
        this.$G_2.style.left = $p1 + (Mscrm.Utilities.get_isLeftToRight() ? 1 : -1) + "px";
        Mscrm.Utilities.setInnerHeight(this.$6_2, $p4)
    },
    $5E_2: function () {
        !IsNull(this.$3F_2) && this.$3F_2(this);
        this.$78_2();
        this.$B_2.style.display = "block";
        this.$0_2.style.display = "block";
        if (this.$3n_2) this.$G_2.style.display = "block";
        this.$6O_2();
        if (!IsNull(this.$2Q_2)) window.setTimeout(this.$$d_$5j_2, 1);
        else {
            this.set_$2V_2(false);
            if (!IsNull(this.$Y_2) && !this.$b_2) {
                var $$t_1 = this;
                window.setTimeout(function () {
                    try {
                        $$t_1.$Y_2.focus()
                    } catch ($$e_0) {}
                }, 0)
            }
        }
        this.$4W_2("displayed", "true")
    },
    $4W_2: function ($p0, $p1) {
        var $v_0 = this.$0_2.attributes.getNamedItem($p0);
        if (IsNull($v_0)) {
            $v_0 = document.createAttribute($p0);
            this.$0_2.attributes.setNamedItem($v_0)
        }
        $v_0.value = $p1.toString()
    },
    $6O_2: function () {
        if (!IsNull(this.$M_2)) {
            (this.$1P_2 || this.$9_2) && this.$5h_2();
            return
        }
        this.$M_2 = document.createElement("iframe");
        this.$M_2.style.position = "absolute";
        this.$5h_2();
        this.$M_2.style.zIndex = this.get_$6A_2();
        XUI.Html.SetOpacity(this.$M_2, 0);
        this.$0_2.parentNode.appendChild(this.$M_2)
    },
    $5h_2: function () {
        this.$M_2.style.top = this.$0_2.style.top;
        this.$M_2.style.left = Mscrm.Utilities.get_isLeftToRight() ? this.$0_2.style.left : Mscrm.Utilities.parseInt(this.$0_2.style.left) - 1 + "px";
        this.$M_2.style.width = Mscrm.Utilities.parseInt(this.$0_2.style.width) + 1 + "px";
        this.$M_2.style.height = Mscrm.Utilities.parseInt(this.$0_2.style.height) + 1 + "px"
    },
    $6M_2: function () {
        if (IsNull(this.$M_2) || IsNull(this.$M_2.parentNode)) return;
        this.$M_2.parentNode.removeChild(this.$M_2);
        this.$M_2 = null
    },
    $5j_2: function () {
        this.set_$2V_2(false);
        if (!IsNull(this.$2Q_2)) {
            !this.$b_2 && Mscrm.Dialog.$5Q(this.$Y_2);
            this.$2Q_2(this);
            this.$2Q_2 = null
        } else {
            !IsNull(this.$X_2) && !this.$b_2 && Mscrm.Dialog.$5Q(this.$X_2);
            !IsNull(this.$2R_2) && this.$2R_2(this);
            if (!IsNull(this.$r_2)) {
                this.$r_2(this);
                this.$r_2 = null
            }
        }
    },
    $58_2: function ($p0) {
        if (this.$S_2 !== Mscrm.Dialog.auto && this.$S_2 > $p0) this.$S_2 = Mscrm.Dialog.auto;
        var $v_0;
        if (this.$S_2 === Mscrm.Dialog.auto) {
            $v_0 = this.$2k_2;
            if (this.$O_2 !== Mscrm.Dialog.auto && this.$O_2 < $v_0) $v_0 = this.$O_2;
            if (this.$T_2 !== Mscrm.Dialog.auto && this.$T_2 > $v_0) $v_0 = this.$T_2
        } else $v_0 = this.$S_2;
        if ($v_0 > $p0) $v_0 = $p0;
        return $v_0
    },
    $59_2: function ($p0, $p1, $p2, $p3, $p4, $p5, $p6) {
        var $v_0;
        if (!$p4) $v_0 = $p5 ? $p0 : $p0 - $p1;
        else if ($p5) if ($p0 + $p1 >= $p2 + $p3) {
            $v_0 = $p2 + $p3 - ($p1 + 1);
            if ($v_0 < $p2 && $p6) $v_0 = $p2
        } else if ($p0 < $p2) $v_0 = $p2;
        else $v_0 = $p0;
        else if ($p0 - $p1 < $p2) {
            $v_0 = $p2;
            if ($p3 < $p1 + 1 && $p6) $v_0 = $p2 + $p3 - ($p1 + 1)
        } else if ($p0 >= $p2 + $p3) $v_0 = $p2 + $p3 - ($p1 + 1);
        else $v_0 = $p0 - $p1;
        return $v_0
    },
    $63_2: function () {
        var $v_0 = true;
        if (IsNull(this.$0_2)) $v_0 = false;
        return $v_0
    },
    $E_2: function () {
        this.get_$2V_2() && Error.create("Changing properties or calling methods while the dialog is rendering is not allowed.")
    },
    $5B_2: function () {
        this._disposed && Error.create("You cannot call methods on a dialog that has been disposed.")
    },
    $64_2: function () {
        if (this.$O_2 !== Mscrm.Dialog.auto && this.$T_2 !== Mscrm.Dialog.auto && this.$O_2 < this.$T_2) this.$O_2 = Mscrm.Dialog.auto
    },
    $5f_2: function ($p0) {
        !this.$1q_2 && this.hide();
        !IsNull(this.$37_2) && this.$37_2(this);
        $p0.stopPropagation();
        $p0.preventDefault()
    },
    $70_2: function ($p0) {
        if (!IsNull(this.$0_2) && this.get_isVisible()) {
            if (!$p0.rawEvent.returnValue) return;
            $p0.rawEvent.returnValue = false;
            $p0.target !== this.$B_2 && !XUI.Html.DomUtils.Contains(this.$0_2, $p0.target) && this.$5f_2($p0)
        }
    },
    $73_2: function ($p0) {
        var $v_0 = document.documentElement;
        if ($v_0.offsetHeight !== this.$3z_2 || $v_0.offsetWidth !== this.$40_2) {
            this.$9_2 = true;
            (Math.abs($v_0.offsetHeight - this.$3z_2) > 20 || Math.abs($v_0.offsetWidth - this.$40_2) > 20) && this.hide();
            this.$5n_2()
        }
    },
    $5O_2: function ($p0) {
        var $v_0 = IsNull($p0.attributes) ? null : $p0.getAttribute("tabindex", 2),
            $v_1 = IsNull($v_0) || $v_0 === 32768 ? null : $p0;
        if (XUI.Html.DomUtils.HasChildElements($p0)) {
            var $$t_5 = this,
                $v_2 = function ($p1_0) {
                    if (!IsNull($v_1)) return true;
                    else {
                        $v_1 = $$t_5.$5O_2($p1_0);
                        return false
                    }
                };
            XUI.Html.DomUtils.ForEachChild($p0, $v_2)
        }
        return $v_1
    },
    $5P_2: function ($p0) {
        var $v_0 = null;
        if (XUI.Html.DomUtils.HasChildElements($p0)) {
            var $$t_6 = this,
                $v_1 = function ($p1_0) {
                    var $v_2 = $$t_6.$5P_2($p1_0);
                    if (!IsNull($v_2)) $v_0 = $v_2;
                    return false
                };
            XUI.Html.DomUtils.ForEachChild($p0, $v_1)
        }
        if (IsNull($v_0)) {
            var $v_3 = IsNull($p0.attributes) ? null : $p0.getAttribute("tabindex", 2);
            $v_0 = IsNull($v_3) || $v_3 === 32768 ? null : $p0
        }
        return $v_0
    },
    $72_2: function ($p0) {
        if (!IsNull(this.$Y_2)) try {
            this.$Y_2.focus()
        } catch ($$e_1) {}
    },
    $5e_2: function ($p0) {
        if ($p0.target === this.$2q_2 && $p0.keyCode === 9 && $p0.shiftKey) {
            $p0.stopPropagation();
            $p0.preventDefault();
            !IsNull(this.$32_2) && this.$32_2.focus()
        } else if ($p0.target === this.$32_2 && $p0.keyCode === 9 && !$p0.shiftKey) {
            $p0.stopPropagation();
            $p0.preventDefault();
            !IsNull(this.$2q_2) && this.$2q_2.focus()
        }
    }
};
Mscrm.InlineMenuItem = function () {
    Mscrm.InlineMenuItem.initializeBase(this)
};
Mscrm.InlineMenuItem.createInlineMenuItem = function (title) {
    var $v_0 = $create(Mscrm.InlineMenuItem);
    $v_0.set_title(title);
    return $v_0
};
Mscrm.InlineMenuItem.prototype = {
    $Q_3: null,
    $V_3: null,
    $4u_3: null,
    $44_3: "ms-crm-IL-MenuItem-MoreInfoItem",
    $4v_3: null,
    $4w_3: null,
    $2x_3: false,
    $2L_3: false,
    get_isNotFound: function () {
        return this.$2L_3
    },
    set_isNotFound: function (value) {
        this.$2L_3 = value;
        return value
    },
    get_isSearchMore: function () {
        return this.$2x_3
    },
    set_isSearchMore: function (value) {
        this.$2x_3 = value;
        return value
    },
    get_moreInfo: function () {
        return this.$Q_3
    },
    set_moreInfo: function (value) {
        this.$Q_3 = value;
        return value
    },
    get_moreInfoRecords: function () {
        return this.$V_3
    },
    set_moreInfoRecords: function (value) {
        this.$V_3 = value;
        return value
    },
    createElements: function () {
        Mscrm.MenuItem.prototype.createElements.call(this);
        if (!IsNull(this.$V_3) && this.$V_3.length) {
            this.$Q_3 = document.createElement("DIV");
            var $v_0 = document.createElement("DIV"),
                $v_1 = this.$V_3[0].$2g_0,
                $v_2 = this.$V_3[0].$24_0;
            !isNullOrEmptyString($v_1) && $v_0.setAttribute("colName", $v_1);
            if (!isNullOrEmptyString($v_2)) {
                XUI.Html.SetText($v_0, $v_2);
                $v_0.title = $v_2
            } else $v_0.innerHTML = "&nbsp;";
            Sys.UI.DomElement.addCssClass($v_0, this.$44_3);
            this.$Q_3.appendChild($v_0);
            var $v_3 = document.createElement("DIV");
            $v_3.style.width = "10%";
            Sys.UI.DomElement.addCssClass($v_3, this.$44_3);
            $v_3.innerHTML = "&nbsp;";
            this.$Q_3.appendChild($v_3);
            var $v_4 = document.createElement("DIV"),
                $v_5 = this.$V_3[1].$2g_0,
                $v_6 = this.$V_3[1].$24_0;
            !isNullOrEmptyString($v_5) && $v_4.setAttribute("colName", $v_5);
            if (!isNullOrEmptyString($v_6)) {
                XUI.Html.SetText($v_4, $v_6);
                $v_4.title = $v_6
            } else $v_4.innerHTML = "&nbsp;";
            Sys.UI.DomElement.addCssClass($v_4, this.$44_3);
            var $v_7 = this.$V_3[0].$2h_0;
            if (!IsNull($v_7)) {
                var $v_8 = this.$V_3[1].$2h_0;
                if (!IsNull($v_8)) {
                    var $v_9 = $v_7 + $v_8;
                    $v_0.style.width = ($v_7 * 90 / $v_9).toString() + "%";
                    $v_4.style.width = ($v_8 * 90 / $v_9).toString() + "%"
                } else $v_0.style.width = "80%"
            }
            this.$Q_3.appendChild($v_4);
            this._text.appendChild(this.$Q_3)
        }
    },
    dispose: function () {
        !IsNull(this._anchor) && $clearHandlers(this._anchor);
        this.$Q_3 = null;
        Mscrm.MenuItem.prototype.dispose.call(this)
    },
    setElementStyles: function (value) {
        Mscrm.InlineMenuItem.$3["moreInfoClassName"] = String.format("ms-crm-{0}MenuItem-MoreInfo ms-crm-{0}MenuItem-MoreInfo-Rest", value);
        Mscrm.InlineMenuItem.$3["moreInfoHoverClassName"] = String.format("ms-crm-{0}MenuItem-MoreInfo ms-crm-{0}MenuItem-MoreInfo-Hover", value);
        Mscrm.InlineMenuItem.$3["moreInfoSelectedClassName"] = String.format("ms-crm-{0}MenuItem-MoreInfo ms-crm-{0}MenuItem-MoreInfo-Selected", value);
        Mscrm.InlineMenuItem.$3["textLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Title-Lookupmore ms-crm-{0}MenuItem-Title-Lookupmore-Rest", value);
        Mscrm.InlineMenuItem.$3["textHoverLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Title-Lookupmore ms-crm-{0}MenuItem-Title-Lookupmore-Hover", value);
        Mscrm.InlineMenuItem.$3["textSelectedLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Title-Lookupmore ms-crm-{0}MenuItem-Title-Lookupmore-Selected", value);
        Mscrm.InlineMenuItem.$3["iconSpanLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Icon-Lookupmore ms-crm-{0}MenuItem-Icon-Lookupmore-Rest", value);
        Mscrm.InlineMenuItem.$3["iconSpanHoverLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Icon-Lookupmore ms-crm-{0}MenuItem-Icon-Lookupmore-Hover", value);
        Mscrm.InlineMenuItem.$3["iconSpanSelectedLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Icon-Lookupmore ms-crm-{0}MenuItem-Icon-Lookupmore-Selected", value);
        Mscrm.InlineMenuItem.$3["separatorLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Sep-Lookupmore ms-crm-{0}MenuItem-Sep-Lookupmore-Rest", value);
        Mscrm.InlineMenuItem.$3["separatorHoverLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Sep-Lookupmore ms-crm-{0}MenuItem-Sep-Lookupmore-Hover", value);
        Mscrm.InlineMenuItem.$3["separatorSelectedLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Sep-Lookupmore ms-crm-{0}MenuItem-Sep-Lookupmore-Selected", value);
        Mscrm.InlineMenuItem.$3["anchorLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Anchor-Lookupmore ms-crm-{0}MenuItem-Anchor-Lookupmore-Rest", value);
        Mscrm.InlineMenuItem.$3["anchorLookupmoreHoverClassName"] = String.format("ms-crm-{0}MenuItem-Anchor-Lookupmore ms-crm-{0}MenuItem-Anchor-Lookupmore-Hover", value);
        Mscrm.InlineMenuItem.$3["anchorLookupmoreSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Anchor-Lookupmore ms-crm-{0}MenuItem-Anchor-Lookupmore-Selected", value);
        Mscrm.InlineMenuItem.$3["itemLookupmoreClassName"] = String.format("ms-crm-{0}MenuItem-Lookupmore ms-crm-{0}MenuItem-Lookupmore-Rest", value);
        Mscrm.InlineMenuItem.$3["itemLookupmoreHoverClassName"] = String.format("ms-crm-{0}MenuItem-Lookupmore ms-crm-{0}MenuItem-Lookupmore-Hover", value);
        Mscrm.InlineMenuItem.$3["itemLookupmoreSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Lookupmore ms-crm{0}MenuItem-Lookupmore-Selected", value);
        Mscrm.InlineMenuItem.$3["textSpanNotFoundClassName"] = String.format("ms-crm-{0}MenuItem-Title-Span-NotFound ms-crm-{0}MenuItem-Title-Span-NotFound-Rest", value);
        Mscrm.InlineMenuItem.$3["textSpanNotFoundHoverClassName"] = String.format("ms-crm-{0}MenuItem-Title-Span-NotFound ms-crm-{0}MenuItem-Title-Span-NotFound-Hover", value);
        Mscrm.InlineMenuItem.$3["textSpanNotFoundSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Title-Span-NotFound ms-crm-{0}MenuItem-Title-Span-NotFound-Selected", value);
        Mscrm.MenuItem.prototype.setElementStyles.call(this, value)
    },
    assignElementStyles: function (styles) {
        this.$4u_3 = Mscrm.InlineMenuItem.$3["moreInfoClassName"];
        this.$4v_3 = Mscrm.InlineMenuItem.$3["moreInfoHoverClassName"];
        this.$4w_3 = Mscrm.InlineMenuItem.$3["moreInfoSelectedClassName"];
        Mscrm.MenuItem.prototype.assignElementStyles.call(this, styles);
        if (this.$2x_3) {
            this.$c_2 = Mscrm.InlineMenuItem.$3["textLookupmoreClassName"];
            this.$1I_2 = Mscrm.InlineMenuItem.$3["textHoverLookupmoreClassName"];
            this.$1b_2 = Mscrm.InlineMenuItem.$3["textSelectedLookupmoreClassName"];
            this.$3G_2 = Mscrm.InlineMenuItem.$3["textSpanNotFoundClassName"];
            this.$3H_2 = Mscrm.InlineMenuItem.$3["textSpanNotFoundHoverClassName"];
            this.$3I_2 = Mscrm.InlineMenuItem.$3["textSpanNotFoundSelectedClassName"];
            this.$s_2 = Mscrm.InlineMenuItem.$3["iconSpanLookupmoreClassName"];
            this.$1U_2 = Mscrm.InlineMenuItem.$3["iconSpanHoverLookupmoreClassName"];
            this.$1V_2 = Mscrm.InlineMenuItem.$3["iconSpanSelectedLookupmoreClassName"];
            this.$13_2 = Mscrm.InlineMenuItem.$3["separatorLookupmoreClassName"];
            this.$20_2 = Mscrm.InlineMenuItem.$3["separatorHoverLookupmoreClassName"];
            this.$21_2 = Mscrm.InlineMenuItem.$3["separatorSelectedLookupmoreClassName"];
            this.$1i_2 = Mscrm.InlineMenuItem.$3["anchorLookupmoreClassName"];
            this.$1j_2 = Mscrm.InlineMenuItem.$3["anchorLookupmoreHoverClassName"];
            this.$1k_2 = Mscrm.InlineMenuItem.$3["anchorLookupmoreSelectedClassName"];
            this.$I_2 = Mscrm.InlineMenuItem.$3["itemLookupmoreClassName"];
            this.$1r_2 = Mscrm.InlineMenuItem.$3["itemLookupmoreHoverClassName"];
            this.$1s_2 = Mscrm.InlineMenuItem.$3["itemLookupmoreSelectedClassName"]
        } else if (this.$2L_3) {
            this.$1I_2 = this.$1b_2 = this.$c_2;
            this.$3H_2 = this.$3I_2 = this.$3G_2;
            this.$1U_2 = this.$1V_2 = this.$s_2;
            this.$20_2 = this.$21_2 = this.$13_2;
            this.$1j_2 = this.$1k_2 = this.$1i_2;
            this.$1r_2 = this.$1s_2 = this.$I_2;
            this._iconSpan.style.display = "none"
        }
    },
    displayRestStyle: function () {
        if (IsNull(this._itemContents)) return;
        Mscrm.MenuItem.prototype.displayRestStyle.call(this);
        !IsNull(this.$Q_3) && Sys.UI.DomElement.addCssClass(this.$Q_3, this.$4u_3)
    },
    displayHoverStyle: function () {
        if (IsNull(this._itemContents)) return;
        Mscrm.MenuItem.prototype.displayHoverStyle.call(this);
        !IsNull(this.$Q_3) && Sys.UI.DomElement.addCssClass(this.$Q_3, this.$4v_3)
    },
    displaySelectedStyle: function () {
        if (IsNull(this._itemContents)) return;
        Mscrm.MenuItem.prototype.displaySelectedStyle.call(this);
        !IsNull(this.$Q_3) && Sys.UI.DomElement.addCssClass(this.$Q_3, this.$4w_3)
    }
};
Mscrm.Menu = function ($p0) {
    this.$$d_$71_2 = Function.createDelegate(this, this.$71_2);
    this.$$d_$6w_2 = Function.createDelegate(this, this.$6w_2);
    this.$$d_$6j_2 = Function.createDelegate(this, this.$6j_2);
    this.$$d_$5e_2 = Function.createDelegate(this, this.$5e_2);
    this.$S_2 = Mscrm.Dialog.auto;
    this.$T_2 = Mscrm.Dialog.auto;
    this.$O_2 = Mscrm.Dialog.auto;
    this.$1_2 = new Array(0);
    this.$33_2 = window.LOCID_PAGELOADING_MSG;
    Mscrm.Menu.initializeBase(this);
    this.$0_2 = $p0;
    this.set_stylePrefix("");
    this.$3x_2 = this.$$d_$5e_2
};
Mscrm.Menu.createMenu = function (container) {
    if (IsNull(container)) {
        var $v_0 = $get("contentDiv");
        if (IsNull($v_0)) $v_0 = document.body;
        container = document.createElement("div");
        $v_0.appendChild(container)
    }
    return $create(Mscrm.Menu, null, null, null, container)
};
Mscrm.Menu.createMenuForParentElement = function (parentElement) {
    var $v_0 = document.createElement("div");
    parentElement.appendChild($v_0);
    return $create(Mscrm.Menu, null, null, null, $v_0)
};
Mscrm.Menu.hideOpenedMenu = function () {
    !IsNull(Mscrm.Menu.$34) && Mscrm.Menu.$34.hide()
};
Mscrm.Menu.prototype = {
    $K_2: 300,
    $d_2: 0,
    $y_2: 0,
    $D_2: null,
    $6_2: null,
    $C_2: null,
    $Y_2: null,
    $X_2: null,
    $x_2: true,
    $w_2: true,
    $1G_2: true,
    $1Z_2: true,
    $66_2: null,
    $7_2: null,
    $0_2: null,
    $2_2: null,
    $A_2: null,
    $u_2: true,
    $9_2: false,
    $1J_2: null,
    $h_2: null,
    $4C_2: "/_imgs/viewpicker_arrow_default.png",
    $43_2: "",
    $1u_2: "",
    $3u_2: "/_imgs/imagestrips/transparent_spacer.gif",
    $4Z_2: "",
    $I_2: null,
    $U_2: null,
    $s_2: null,
    $13_2: null,
    $c_2: null,
    $2B_2: null,
    $Z_2: false,
    $1q_2: false,
    $1o_2: true,
    $p_2: 0,
    $11_2: null,
    $23_2: null,
    $1A_2: null,
    $4d_2: null,
    $1E_2: true,
    $t_2: false,
    $15_2: null,
    $2D_2: null,
    $r_2: null,
    $4D_2: null,
    $4p_2: false,
    $1l_2: null,
    $3x_2: null,
    $30_2: false,
    $1n_2: true,
    $38_2: true,
    $F_2: null,
    $4r_2: "/_imgs/AdvFind/progress.gif",
    $z_2: "ms-crm-LoadingContainer",
    $5_2: null,
    $4a_2: null,
    $1p_2: false,
    $3r_2: true,
    $1B_2: true,
    $1S_2: true,
    $1T_2: true,
    get_loadingClassName: function () {
        return this.$z_2
    },
    set_loadingClassName: function (value) {
        this.$z_2 = value;
        if (!IsNull(this.$2_2)) this.$2_2.set_loadingClassName(value);
        else if (!IsNull(this.$F_2)) this.$F_2.className = value;
        return value
    },
    get_auxIconTooltip: function () {
        return this.$4a_2
    },
    set_auxIconTooltip: function (value) {
        this.$4a_2 = value;
        return value
    },
    get_hideOnAuxAction: function () {
        return this.$1p_2
    },
    set_hideOnAuxAction: function (value) {
        this.$1p_2 = value;
        return value
    },
    get_propagateStyle: function () {
        return this.$38_2
    },
    set_propagateStyle: function (value) {
        this.$38_2 = value;
        return value
    },
    get_submenuIconPath: function () {
        return this.$4C_2
    },
    set_submenuIconPath: function (value) {
        this.$4C_2 = value;
        return value
    },
    get_hasItems: function () {
        return !IsNull(this.$1_2) && this.$1_2.length > 0
    },
    get_selectedItem: function () {
        return this.$66_2
    },
    get_enforceHorizontalOffset: function () {
        return this.$1S_2
    },
    set_enforceHorizontalOffset: function (value) {
        this.$1S_2 = value;
        return value
    },
    get_enforceVerticalOffset: function () {
        return this.$1T_2
    },
    set_enforceVerticalOffset: function (value) {
        this.$1T_2 = value;
        return value
    },
    get_focusOutCheck: function () {
        return this.$1n_2
    },
    set_focusOutCheck: function (value) {
        this.$1n_2 = value;
        !IsNull(this.$2_2) && this.$2_2.set_focusOutCheck(this.$1n_2);
        !IsNull(this.get_parentMenu()) && this.get_parentMenu().set_focusOutCheck(value);
        return value
    },
    $b_2: false,
    get_neverGrabFocus: function () {
        return this.$b_2
    },
    set_neverGrabFocus: function (value) {
        this.$b_2 = value;
        return value
    },
    get_zIndex: function () {
        this.$2T_2();
        return this.$2_2.get_zIndex()
    },
    get_parentMenu: function () {
        return this.$7_2
    },
    set_parentMenu: function (value) {
        this.$7_2 = value;
        this.$4X_2();
        return value
    },
    get_top: function () {
        return this.$d_2
    },
    set_top: function (value) {
        this.$d_2 = value;
        return value
    },
    get_left: function () {
        return this.$y_2
    },
    set_left: function (value) {
        this.$y_2 = value;
        return value
    },
    get_height: function () {
        return this.$S_2
    },
    set_height: function (value) {
        this.$S_2 = value;
        return value
    },
    get_width: function () {
        return this.$K_2
    },
    set_width: function (value) {
        this.$K_2 = value;
        return value
    },
    get_minHeight: function () {
        return this.$T_2
    },
    set_minHeight: function (value) {
        this.$T_2 = value;
        return value
    },
    get_maxHeight: function () {
        return this.$O_2
    },
    set_maxHeight: function (value) {
        this.$O_2 = value;
        return value
    },
    get_header: function () {
        return this.$D_2
    },
    set_header: function (value) {
        this.$D_2 = value;
        return value
    },
    get_body: function () {
        return this.$6_2
    },
    set_body: function (value) {
        this.$6_2 = value;
        return value
    },
    get_footer: function () {
        return this.$C_2
    },
    set_footer: function (value) {
        this.$C_2 = value;
        return value
    },
    get_focusElementOnHide: function () {
        return this.$X_2
    },
    set_focusElementOnHide: function (value) {
        this.$X_2 = value;
        return value
    },
    get_focusElementOnShow: function () {
        if (!IsNull(this.$Y_2)) return this.$Y_2;
        else if (this.$1_2.length > 0 && this.$3r_2) {
            for (var $v_0 = 0; $v_0 < this.$1_2.length; $v_0++) {
                var $v_1 = this.$1_2[$v_0];
                if ($v_1.get_isFocusable()) if ($v_1.get_isMenu() && $v_1.get_isSelected()) return $v_1.get_focusElementOnShow();
                else return $v_1.get_focusElement()
            }
            return this.$A_2
        } else {
            this.set_activeItemIndex(Mscrm.Menu.$18);
            return this.$A_2
        }
    },
    set_focusElementOnShow: function (value) {
        this.$Y_2 = value;
        this.$3r_2 = false;
        return value
    },
    get_launchesRight: function () {
        return this.$x_2
    },
    set_launchesRight: function (value) {
        this.$x_2 = value;
        return value
    },
    get_launchesDown: function () {
        return this.$w_2
    },
    set_launchesDown: function (value) {
        this.$w_2 = value;
        return value
    },
    get_shiftVertical: function () {
        return this.$1G_2
    },
    set_shiftVertical: function (value) {
        this.$1G_2 = value;
        return value
    },
    get_shiftHorizontal: function () {
        return this.$1Z_2
    },
    set_shiftHorizontal: function (value) {
        this.$1Z_2 = value;
        return value
    },
    get_isVertical: function () {
        return this.$u_2
    },
    set_isVertical: function (value) {
        this.$u_2 = value;
        return value
    },
    get_itemContents: function () {
        this.$2T_2();
        this.$2Y_2();
        return this.$h_2
    },
    set_itemContents: function (value) {
        this.$h_2 = value;
        return value
    },
    get_className: function () {
        return this.$2B_2
    },
    set_className: function (value) {
        this.$2B_2 = value;
        return value
    },
    get_title: function () {
        return this.$1J_2
    },
    set_title: function (value) {
        this.$1J_2 = value;
        return value
    },
    get_menuItemId: function () {
        return this.$43_2
    },
    set_menuItemId: function (value) {
        this.$43_2 = value;
        return value
    },
    get_menuId: function () {
        return this.$1u_2
    },
    set_menuId: function (value) {
        this.$1u_2 = value;
        return value
    },
    get_iconPath: function () {
        return this.$3u_2
    },
    set_iconPath: function (value) {
        this.$3u_2 = value;
        return value
    },
    get_auxIconPath: function () {
        return this.$4Z_2
    },
    set_auxIconPath: function (value) {
        this.$4Z_2 = value;
        return value
    },
    get_itemClassName: function () {
        return this.$I_2
    },
    set_itemClassName: function (value) {
        this.$I_2 = value;
        return value
    },
    get_auxIconClassName: function () {
        return this.$U_2
    },
    set_auxIconClassName: function (value) {
        this.$U_2 = value;
        return value
    },
    get_iconClassName: function () {
        return this.$s_2
    },
    set_iconClassName: function (value) {
        this.$I_2 = value;
        return value
    },
    get_separatorClassName: function () {
        return this.$13_2
    },
    set_separatorClassName: function (value) {
        this.$13_2 = value;
        return value
    },
    get_textClassName: function () {
        return this.$c_2
    },
    set_textClassName: function (value) {
        this.$c_2 = value;
        return value
    },
    get_isInline: function () {
        return this.$Z_2
    },
    set_isInline: function (value) {
        this.$Z_2 = value;
        this.$4X_2();
        return value
    },
    get_isModal: function () {
        return this.$1q_2
    },
    set_isModal: function (value) {
        this.$1q_2 = value;
        !IsNull(this.$2_2) && this.$2_2.set_isModal(value);
        return value
    },
    get_hideOnAction: function () {
        return this.$1o_2
    },
    set_hideOnAction: function (value) {
        this.$1o_2 = value;
        return value
    },
    get_actionCallback: function () {
        return !IsNull(this.$5_2) ? this.$5_2.get_actionCallback() : null
    },
    set_actionCallback: function (value) {
        return value
    },
    get_auxActionCallback: function () {
        return null
    },
    set_auxActionCallback: function (value) {
        return value
    },
    get_reference: function () {
        return this.$11_2
    },
    set_reference: function (value) {
        this.$11_2 = value;
        return value
    },
    get_contextMenu: function () {
        return this.$4d_2
    },
    set_contextMenu: function (value) {
        this.$4d_2 = value;
        return value
    },
    get_hideParentOnContextItemAction: function () {
        return this.$1E_2
    },
    set_hideParentOnContextItemAction: function (value) {
        this.$1E_2 = value;
        return value
    },
    get_activeItemIndex: function () {
        return this.$p_2
    },
    set_activeItemIndex: function (value) {
        this.$p_2 = value;
        value !== Mscrm.Menu.$18 && !IsNull(this.$7_2) && this.$7_2.set_activeItemIndex(parseInt(this.get_itemContents().attributes.getNamedItem("itemIndex").value, 10));
        return value
    },
    get_accessKey: function () {
        return this.$1A_2
    },
    set_accessKey: function (value) {
        this.$1A_2 = value;
        return value
    },
    get_tooltip: function () {
        return IsNull(this.$23_2) ? this.$1J_2 : this.$23_2
    },
    set_tooltip: function (value) {
        this.$23_2 = value;
        return value
    },
    get_isLoading: function () {
        return this.$t_2
    },
    set_isLoading: function (value) {
        this.$t_2 = value;
        if (!IsNull(this.$2_2)) this.$2_2.set_isLoading(value);
        else if (this.$Z_2) if (value) this.$5G_2();
        else this.$5F_2();
        return value
    },
    get_stylePrefix: function () {
        return this.$15_2
    },
    set_stylePrefix: function (value) {
        this.$15_2 = !IsNull(value) ? value : "";
        this.$4X_2();
        return value
    },
    get_activeItem: function () {
        return this.$p_2 !== Mscrm.Menu.$18 ? this.$1_2[this.$p_2] : null
    },
    set_activeItem: function (value) {
        var $v_0 = value.get_itemContents().attributes.getNamedItem("itemIndex");
        if (IsNull($v_0)) return value;
        var $v_1 = parseInt($v_0.value, 10);
        this.set_activeItemIndex(isNaN($v_1) ? 0 : $v_1);
        return value
    },
    get_contextItem: function () {
        return this.$2D_2
    },
    set_contextItem: function (value) {
        this.$2D_2 = value;
        return value
    },
    get_hideCallback: function () {
        return this.$r_2
    },
    set_hideCallback: function (value) {
        this.$r_2 = value;
        return value
    },
    get_subMenuShowCallback: function () {
        return this.$4D_2
    },
    set_subMenuShowCallback: function (value) {
        this.$4D_2 = value;
        return value
    },
    get_isSelected: function () {
        return this.$4p_2
    },
    set_isSelected: function (value) {
        this.$4p_2 = value;
        return value
    },
    get_isFocusable: function () {
        for (var $v_0 = 0; $v_0 < this.$1_2.length; $v_0++) if (this.$1_2[0].get_isFocusable()) return true;
        return false
    },
    set_isFocusable: function (value) {
        return value
    },
    get_auxIconMatchesItem: function () {
        return this.$1B_2
    },
    set_auxIconMatchesItem: function (value) {
        this.$1B_2 = value;
        !IsNull(this.$5_2) && this.$5_2.set_auxIconMatchesItem(value);
        return value
    },
    get_isVisible: function () {
        if (IsNull(this.$A_2)) return false;
        return this.$Z_2 ? this.$7_2.get_isVisible() : this.$2_2.get_isVisible()
    },
    get_focusElement: function () {
        this.$2T_2();
        this.$2Y_2();
        if (this.$Z_2 || this.get_isVisible()) {
            var $v_0 = 0;
            while ($v_0 < this.$1_2.length && IsNull(this.$1_2[$v_0].get_actionCallback())) $v_0++;
            return $v_0 < this.$1_2.length ? this.$1_2[$v_0].get_focusElement() : null
        } else return IsNull(this.$5_2) ? null : this.$5_2.get_focusElement()
    },
    get_isMenu: function () {
        return true
    },
    get_hasNextItem: function () {
        return !IsNull(this.$4R_2(true))
    },
    get_hasPreviousItem: function () {
        return !IsNull(this.$4R_2(false))
    },
    get_menuItems: function () {
        return this.$1_2
    },
    get_inlineItem: function () {
        return this.$5_2
    },
    show: function (callback) {
        this.$2T_2();
        this.$2Y_2();
        this.$4Y_2();
        if (!this.get_isLoading() && (IsNull(this.$1_2) || !this.$1_2.length)) return;
        if (!this.$30_2 && (IsNull(this.$7_2) || !this.$Z_2)) {
            $addHandler(this.$A_2, "keydown", this.$3x_2);
            this.$30_2 = true
        }
        if (IsNull(callback)) this.$2_2.show();
        else {
            var $$t_2 = this;
            this.$2_2.show(function ($p1_0) {
                callback($$t_2)
            })
        }
        Mscrm.Menu.$34 = this
    },
    hide: function (callback) {
        if (this.$30_2) {
            $removeHandler(this.$A_2, "keydown", this.$3x_2);
            this.$30_2 = false
        }
        if (!this.get_isVisible()) return;
        if (this.$Z_2) this.$7_2.hide();
        else if (IsNull(callback)) this.$2_2.hide();
        else {
            var $$t_2 = this;
            this.$2_2.hide(function ($p1_0) {
                callback($$t_2)
            })
        }
    },
    hideAll: function (hideParentOnContextItem) {
        this.hide();
        !IsNull(this.$7_2) && this.$7_2.hideAll(hideParentOnContextItem);
        !IsNull(this.$2D_2) && !IsNull(this.$2D_2.get_parentMenu()) && hideParentOnContextItem && this.$2D_2.get_parentMenu().hideAll(hideParentOnContextItem)
    },
    refresh: function (callback) {
        this.$9_2 = true;
        this.$2T_2();
        this.$2Y_2();
        this.$4Y_2();
        if (IsNull(callback)) this.$2_2.refresh();
        else {
            var $$t_2 = this;
            this.$2_2.refresh(function ($p1_0) {
                callback($$t_2)
            })
        }
    },
    dispose: function () {
        if (this._disposed) return;
        if (!IsNull(this.$2_2)) {
            this.$2_2.dispose();
            this.$2_2 = null
        }
        if (!IsNull(this.$0_2) && XUI.Html.DomUtils.Contains(window.document.body, this.$0_2)) {
            this.$0_2.parentNode.removeChild(this.$0_2);
            this.$0_2 = null
        }
        Mscrm.CrmUIComponent.prototype.dispose.call(this)
    },
    addItem: function (item) {
        this.$1_2[this.$1_2.length] = item;
        item.set_parentMenu(this);
        this.$9_2 = true
    },
    insertItem: function (item, position) {
        var $v_0 = position;
        if ($v_0 > this.$1_2.length) $v_0 = this.$1_2.length;
        if ($v_0 < 0) $v_0 = 0;
        for (var $v_1 = this.$1_2.length; $v_1 > $v_0; $v_1--) this.$1_2[$v_1] = this.$1_2[$v_1 - 1];
        this.$1_2[$v_0] = item;
        item.set_parentMenu(this);
        this.$9_2 = true
    },
    clear: function () {
        if (!IsNull(this.$1_2)) for (var $v_0 = 0; $v_0 < this.$1_2.length; $v_0++) {
            var $v_1 = this.$1_2[$v_0];
            $v_1.dispose()
        }
        this.clearDOM()
    },
    clearDOM: function () {
        this.$1_2 = new Array(0);
        this.$9_2 = true;
        this.$2Y_2()
    },
    selectPreviousItem: function () {
        this.selectItem(false)
    },
    selectNextItem: function () {
        this.selectItem(true)
    },
    displayRestStyle: function () {
        if (!this.get_isInline() && !IsNull(this.get_parentMenu()) && this.get_isVisible()) return;
        !IsNull(this.$5_2) && this.$5_2.displayRestStyle()
    },
    displayHoverStyle: function () {
        !IsNull(this.$5_2) && this.$5_2.displayHoverStyle()
    },
    displaySelectedStyle: function () {
        !IsNull(this.$5_2) && this.$5_2.displaySelectedStyle()
    },
    selectItem: function (down) {
        var $v_0 = this.$4R_2(down);
        if (IsNull($v_0)) return;
        if ($v_0.get_isMenu() && $v_0.get_isInline()) {
            $v_0 !== this.$1_2[this.$p_2] && $v_0.set_activeItemIndex(Mscrm.Menu.$18);
            if (down) $v_0.selectNextItem();
            else $v_0.selectPreviousItem()
        } else {
            $v_0.displaySelectedStyle();
            !this.$b_2 && $v_0.get_focusElement().focus()
        }
    },
    $4R_2: function ($p0) {
        var $v_0 = null;
        if (this.$p_2 !== Mscrm.Menu.$18) {
            $v_0 = this.$1_2[this.$p_2];
            if ($v_0.get_isMenu() && $v_0.get_isInline() && ($p0 && $v_0.get_hasNextItem() || !$p0 && $v_0.get_hasPreviousItem())) return $v_0
        }
        var $v_1 = $p0 ? 1 : -1,
            $v_2 = $p0 ? this.$1_2.length : -1,
            $v_3 = this.$p_2 === Mscrm.Menu.$18 && !$p0 ? this.$1_2.length : this.$p_2;
        if ($v_3 === Mscrm.Menu.$18 && !this.$1_2.length || $p0 && $v_3 + $v_1 >= $v_2 || !$p0 && $v_3 + $v_1 <= $v_2) return null;
        var $v_4 = false,
            $v_5 = true;
        do {
            $v_3 += $v_1;
            $v_5 = $p0 && $v_3 + $v_1 < $v_2 || !$p0 && $v_3 + $v_1 > $v_2;
            $v_0 = this.$1_2[$v_3];
            if (!XUI.Html.DomUtils.Contains(this.$A_2, $v_0.get_itemContents())) continue;
            $v_4 = false;
            if ($v_0.get_isMenu() && $v_0.get_isInline()) {
                var $v_6 = $v_0;
                if ($v_6.get_menuItems().length > 0) {
                    $v_6.set_activeItemIndex(Mscrm.Menu.$18);
                    $v_4 = $p0 && $v_6.get_hasNextItem() || !$p0 && $v_6.get_hasPreviousItem()
                }
            }
        } while ($v_5 && !$v_4 && IsNull($v_0.get_actionCallback()));
        return $v_5 || $v_4 || !IsNull($v_0.get_actionCallback()) ? $v_0 : null
    },
    setHeight: function (height) {
        Mscrm.Utilities.setOuterHeight(this.get_itemContents(), height)
    },
    $2T_2: function () {
        if (!IsNull(this.$A_2)) return;
        this.$A_2 = document.createElement("ul");
        this.$A_2.className = this.$2B_2;
        if (!isNullOrEmptyString(this.$1u_2)) this.$A_2.id = this.$1u_2;
        if (!this.$3r_2 && IsNull(this.$Y_2)) this.$A_2.tabIndex = 0;
        if (!IsNull(this.$7_2)) if (this.$Z_2) {
            this.$h_2 = document.createElement("li");
            this.$F_2 = document.createElement("div");
            this.$F_2.className = this.$z_2;
            this.$F_2.innerHTML = String.format("<table class='{1}'><tr class='{1}'><td style='vertical-align: middle' align='center'><IMG id='loading' alt='' src='{2}'><br>{0}</td></tr></table>", CrmEncodeDecode.CrmHtmlEncode(this.$33_2), CrmEncodeDecode.CrmHtmlAttributeEncode(this.$z_2), CrmEncodeDecode.CrmHtmlAttributeEncode(this.$4r_2));
            this.$A_2.style.width = this.$K_2 + "px";
            if (this.$t_2) this.$5G_2();
            else this.$5F_2()
        } else {
            this.$5_2 = Mscrm.MenuItem.createMenuItem(this.$1J_2);
            this.$5_2.set_menuItemId(this.$43_2);
            this.$5_2.set_tooltip(this.get_tooltip());
            this.$5_2.set_iconPath(this.$3u_2);
            this.$h_2 = this.$5_2.get_itemContents();
            this.$5_2.set_actionCallback(this.$$d_$6j_2);
            this.$5_2.set_auxActionCallback(this.$$d_$6j_2);
            this.$5_2.set_parentMenu(this.$7_2);
            this.$5_2.set_stylePrefix(this.$15_2);
            this.$5_2.set_hideOnAction(false);
            this.$5_2.set_hideOnAuxAction(false);
            this.$5_2.set_auxIconPath(this.$4C_2);
            this.$5_2.set_auxIconMatchesItem(this.$1B_2)
        }
        if (!this.$Z_2) {
            this.$2_2 = Mscrm.Dialog.createDialog(this.$0_2);
            this.$2_2.set_showingCallback(this.$$d_$6w_2);
            this.$2_2.set_isModal(this.$1q_2);
            this.$1l_2 = document.createElement("div");
            this.$1l_2.className = this.$2B_2;
            this.$1l_2.appendChild(this.$A_2);
            this.$4Y_2()
        }
    },
    $6w_2: function ($p0) {
        Mscrm.Utilities.setOuterWidth(this.$A_2, $p0.get_bodyWidth());
        if (!this.$u_2) for (var $v_0 = $p0.get_bodyHeight() - Mscrm.Utilities.getVerticalBoxPadding(this.$A_2), $v_1 = 0; $v_1 < this.$1_2.length; $v_1++) this.$1_2[$v_1].setHeight($v_0);
        else for (var $v_2 = $p0.get_bodyWidth() - Mscrm.Utilities.getHorizontalBoxPadding(this.$A_2), $v_3 = 0; $v_3 < this.$1_2.length; $v_3++) {
            var $v_4 = this.$1_2[$v_3].get_itemContents();
            Mscrm.Utilities.setOuterWidth($v_4, $v_2)
        }
        if (!Mscrm.Utilities.get_isLeftToRight() && (Mscrm.Utilities.get_ieBrowserVersion() === 10 || Mscrm.Utilities.get_ieBrowserVersion() === 9)) {
            this.$1l_2.style.paddingBottom = "1px";
            this.$1l_2.style.paddingTop = "1px"
        }
    },
    $5G_2: function () {
        if (IsNull(this.$F_2)) return;
        this.$h_2.innerHTML = "";
        this.$h_2.appendChild(this.$F_2)
    },
    $5F_2: function () {
        if (IsNull(this.$A_2)) return;
        this.$h_2.innerHTML = "";
        !IsNull(this.$D_2) && this.$h_2.appendChild(this.$D_2);
        this.$h_2.appendChild(this.$A_2);
        !IsNull(this.$C_2) && this.$h_2.appendChild(this.$C_2)
    },
    $4Y_2: function () {
        if (!IsNull(this.$2_2)) {
            this.$2_2.set_top(this.$d_2);
            this.$2_2.set_left(this.$y_2);
            this.$2_2.set_height(this.$S_2);
            this.$2_2.set_minHeight(this.$T_2);
            this.$2_2.set_maxHeight(this.$O_2);
            this.$2_2.set_width(this.$K_2);
            this.$2_2.set_header(this.$D_2);
            this.$2_2.set_isLoading(this.$t_2);
            this.$2_2.set_body(this.$1l_2);
            this.$2_2.set_footer(this.$C_2);
            this.$2_2.set_dialogId(this.$1u_2);
            this.$2_2.set_focusElementOnShow(this.get_focusElementOnShow());
            this.$2_2.set_focusElementOnHide(this.$X_2);
            this.$2_2.set_launchesRight(this.$x_2);
            this.$2_2.set_launchesDown(this.$w_2);
            this.$2_2.set_shiftHorizontal(this.$1Z_2);
            this.$2_2.set_shiftVertical(this.$1G_2);
            this.$2_2.set_hideCallback(this.$$d_$71_2);
            this.$2_2.set_focusOutCheck(this.$1n_2);
            this.$2_2.set_loadingClassName(this.$z_2);
            this.$2_2.set_enforceHorizontalOffset(this.$1S_2);
            this.$2_2.set_enforceVerticalOffset(this.$1T_2);
            this.$2_2.set_neverGrabFocus(this.$b_2)
        }
    },
    $4X_2: function () {
        var $v_0 = this.$15_2;
        if ($v_0 !== "") $v_0 = String.format("{0}-", $v_0);
        this.$I_2 = String.format("ms-crm-{0}MenuItem ms-crm-{0}MenuItem-Rest", $v_0);
        this.$U_2 = String.format("ms-crm-{0}MenuItem-Aux", $v_0);
        this.$s_2 = String.format("ms-crm-{0}MenuItem-Icon", $v_0);
        this.$13_2 = String.format("ms-crm-{0}MenuItem-Sep", $v_0);
        this.$c_2 = String.format("ms-crm-{0}MenuItem-Title", $v_0);
        this.$2B_2 = String.format("ms-crm-{1}{0}Menu", $v_0, this.$Z_2 ? "in-" : "");
        !IsNull(this.$5_2) && this.$5_2.set_stylePrefix(String.format("{0}sub", this.$15_2));
        if (this.$38_2 && !IsNull(this.$1_2)) for (var $v_1 = 0; $v_1 < this.$1_2.length; $v_1++) {
            this.$1_2[$v_1].set_stylePrefix(this.$15_2);
            var $v_2 = this.$1_2[$v_1].get_isMenu() ? this.$1_2[$v_1] : null;
            !IsNull($v_2) && !$v_2.get_isInline() && !IsNull($v_2.get_inlineItem()) && $v_2.get_inlineItem().set_stylePrefix(this.$15_2)
        }
    },
    $2Y_2: function () {
        if (!this.$9_2 || IsNull(this.$A_2)) return;
        if (IsNull(this.$A_2)) return;
        for (var $v_0 = this.$A_2.children, $v_1 = $v_0.length, $v_2 = 0; $v_2 < $v_1; $v_2++) $v_0[0].parentNode.removeChild($v_0[0]);
        for (var $v_3 = 0; $v_3 < this.$1_2.length; $v_3++) {
            var $v_4 = this.$1_2[$v_3].get_itemContents();
            if (this.$1_2[$v_3].get_isMenu()) {
                var $v_6 = this.$1_2[$v_3];
                if ($v_6.get_isInline() && !$v_6.get_hasItems() && IsNull($v_6.get_header()) && IsNull($v_6.get_footer()) && !$v_6.get_isLoading()) continue
            }
            if (this.$u_2) XUI.Html.SetFloat($v_4, "none");
            else XUI.Html.SetFloat($v_4, Mscrm.Utilities.get_isLeftToRight() ? "left" : "right");
            var $v_5 = document.createAttribute("itemIndex");
            $v_5.value = $v_3.toString();
            $v_4.attributes.setNamedItem($v_5);
            this.$38_2 && this.$15_2 !== "" && this.$1_2[$v_3].set_stylePrefix(this.$15_2);
            this.$A_2.appendChild($v_4)
        }
        this.$9_2 = false
    },
    $5e_2: function ($p0) {
        switch ($p0.keyCode) {
            case 40:
                this.selectNextItem();
                $p0.stopPropagation();
                $p0.preventDefault();
                break;
            case 38:
                this.selectPreviousItem();
                $p0.stopPropagation();
                $p0.preventDefault();
                break;
            case 27:
            case 37:
            case 39:
                if (this.$6p_2($p0.keyCode)) {
                    this.hide();
                    $p0.stopPropagation();
                    $p0.preventDefault()
                }
                break
        }
    },
    $6p_2: function ($p0) {
        switch ($p0) {
            case 27:
                return true;
            case 37:
                return Mscrm.Utilities.get_isLeftToRight();
            case 39:
                return !Mscrm.Utilities.get_isLeftToRight();
            default:
                return false
        }
    },
    $71_2: function ($p0) {
        !IsNull(this.$r_2) && this.$r_2(this);
        if (!IsNull(this.$7_2) && !this.$Z_2) {
            this.$5_2.set_isSelected(false);
            this.$7_2.set_focusOutCheck(true);
            try {
                this.$7_2.get_isVisible() && this.$5_2.get_focusElement().focus()
            } catch ($$e_1) {}
        }
    },
    $6j_2: function ($p0) {
        this.$7_2.set_focusOutCheck(false);
        var $v_0 = Mscrm.Utilities.getXYPos(this.$5_2.get_itemContents(), !Mscrm.Utilities.get_isLeftToRight(), $get("crmContentPanel")),
            $v_1 = parseInt($v_0["y"], 10);
        this.$d_2 = $v_1;
        this.$y_2 = Mscrm.Utilities.get_isLeftToRight() ? this.$7_2.get_left() + this.$7_2.get_width() : this.$7_2.get_left() - this.$7_2.get_width();
        this.$5_2.set_isSelected(true);
        this.show(this.$4D_2)
    }
};
Mscrm.MenuItem = function () {
    this.$$d_onMouseOut = Function.createDelegate(this, this.onMouseOut);
    this.$$d_onMouseOver = Function.createDelegate(this, this.onMouseOver);
    this.$$d_onClick = Function.createDelegate(this, this.onClick);
    this.$$d_onAuxMouseOut = Function.createDelegate(this, this.onAuxMouseOut);
    this.$$d_onAuxMouseOver = Function.createDelegate(this, this.onAuxMouseOver);
    this.$$d_onAuxClick = Function.createDelegate(this, this.onAuxClick);
    this.$$d_onContextMenu = Function.createDelegate(this, this.onContextMenu);
    this.$$d_onKeyDown = Function.createDelegate(this, this.onKeyDown);
    this.$$d_onBlur = Function.createDelegate(this, this.onBlur);
    this.$$d_onFocus = Function.createDelegate(this, this.onFocus);
    this._renderFormat = Mscrm.MenuItem.formaT_IMAGE_SEP_TITLE_AUX;
    Mscrm.MenuItem.initializeBase(this);
    this.set_stylePrefix("");
    this._menuItemId = String.format("item{0}", Mscrm.MenuItem.$4T.toString());
    Mscrm.MenuItem.$4T++
};
Mscrm.MenuItem.createMenuItem = function (title) {
    var $v_0 = $create(Mscrm.MenuItem);
    $v_0.set_title(title);
    return $v_0
};
Mscrm.MenuItem.prototype = {
    _isSpacer: false,
    _stylePrefix: null,
    _itemContents: null,
    $7_2: null,
    _auxAnchor: null,
    _auxIcon: null,
    _anchor: null,
    _icon: null,
    _iconSpan: null,
    _separator: null,
    _text: null,
    _menuItemId: "",
    _iconPath: "/_imgs/imagestrips/transparent_spacer.gif",
    _auxIconPath: "",
    $I_2: null,
    $1r_2: null,
    $1s_2: null,
    $1i_2: null,
    $1k_2: null,
    $1j_2: null,
    $s_2: null,
    $1U_2: null,
    $1V_2: null,
    $U_2: null,
    $1N_2: null,
    $2d_2: null,
    $13_2: null,
    $20_2: null,
    $21_2: null,
    $c_2: null,
    $1I_2: null,
    $1b_2: null,
    $3G_2: null,
    $3H_2: null,
    $3I_2: null,
    $2G_2: false,
    $1A_2: null,
    _title: null,
    _actionCallback: null,
    _auxActionCallback: null,
    $11_2: null,
    _contextMenu: null,
    $23_2: null,
    _selected: false,
    $3s_2: true,
    $2c_2: true,
    $1o_2: true,
    $1p_2: true,
    $1E_2: true,
    _auxIconTooltip: null,
    $1B_2: false,
    get_menuItemId: function () {
        return this._menuItemId
    },
    set_menuItemId: function (value) {
        this._menuItemId = value;
        return value
    },
    get_anchor: function () {
        return this._anchor
    },
    set_anchor: function (value) {
        this._anchor = value;
        return value
    },
    get_auxIconTooltip: function () {
        return this._auxIconTooltip
    },
    set_auxIconTooltip: function (value) {
        this._auxIconTooltip = value;
        if (!IsNull(this._auxIcon)) {
            this._auxIcon.setAttribute("alt", value);
            this._auxIcon.setAttribute("title", value)
        }
        return value
    },
    get_hideOnAction: function () {
        return this.$1o_2
    },
    set_hideOnAction: function (value) {
        this.$1o_2 = value;
        return value
    },
    get_hideOnAuxAction: function () {
        return this.$1p_2
    },
    set_hideOnAuxAction: function (value) {
        this.$1p_2 = value;
        return value
    },
    get_hideParentOnContextItemAction: function () {
        return this.$1E_2
    },
    set_hideParentOnContextItemAction: function (value) {
        this.$1E_2 = value;
        return value
    },
    get_auxIconMatchesItem: function () {
        return this.$1B_2
    },
    set_auxIconMatchesItem: function (value) {
        this.$1B_2 = value;
        return value
    },
    get_renderFormat: function () {
        return this._renderFormat
    },
    set_renderFormat: function (value) {
        this._renderFormat = value;
        return value
    },
    get_disabled: function () {
        return this.$2G_2
    },
    set_disabled: function (value) {
        this.$2G_2 = value;
        return value
    },
    get_parentMenu: function () {
        return this.$7_2
    },
    set_parentMenu: function (value) {
        this.$7_2 = value;
        return value
    },
    get_iconPath: function () {
        return this._iconPath
    },
    set_iconPath: function (value) {
        this._iconPath = value;
        !IsNull(this._itemContents) && this._icon.setAttribute("src", value);
        return value
    },
    get_auxIconPath: function () {
        return this._auxIconPath
    },
    set_auxIconPath: function (value) {
        this._auxIconPath = value;
        if (!IsNull(this._itemContents)) {
            this._auxIcon.setAttribute("src", value);
            this._auxAnchor.style.display = "inline"
        }
        return value
    },
    get_itemClassName: function () {
        return this.$I_2
    },
    set_itemClassName: function (value) {
        this.$I_2 = value;
        return value
    },
    get_itemSelectedClassName: function () {
        return this.$1s_2
    },
    set_itemSelectedClassName: function (value) {
        this.$1s_2 = value;
        return value
    },
    get_itemHoverClassName: function () {
        return this.$1r_2
    },
    set_itemHoverClassName: function (value) {
        this.$1r_2 = value;
        return value
    },
    get_auxIconClassName: function () {
        return this.$U_2
    },
    set_auxIconClassName: function (value) {
        this.$U_2 = value;
        return value
    },
    get_anchorClassName: function () {
        return this.$1i_2
    },
    set_anchorClassName: function (value) {
        this.$1i_2 = value;
        return value
    },
    get_anchorHoverClassName: function () {
        return this.$1j_2
    },
    set_anchorHoverClassName: function (value) {
        this.$1j_2 = value;
        return value
    },
    get_anchorSelectedClassName: function () {
        return this.$1k_2
    },
    set_anchorSelectedClassName: function (value) {
        this.$1k_2 = value;
        return value
    },
    get_iconClassName: function () {
        return this.$s_2
    },
    set_iconClassName: function (value) {
        this.$s_2 = value;
        return value
    },
    get_iconHoverClassName: function () {
        return this.$1U_2
    },
    set_iconHoverClassName: function (value) {
        this.$1U_2 = value;
        return value
    },
    get_iconSelectedClassName: function () {
        return this.$1V_2
    },
    set_iconSelectedClassName: function (value) {
        this.$1V_2 = value;
        return value
    },
    get_separatorClassName: function () {
        return this.$13_2
    },
    set_separatorClassName: function (value) {
        this.$13_2 = value;
        return value
    },
    get_separatorHoverClassName: function () {
        return this.$20_2
    },
    set_separatorHoverClassName: function (value) {
        this.$20_2 = value;
        return value
    },
    get_separatorSelectedClassName: function () {
        return this.$21_2
    },
    set_separatorSelectedClassName: function (value) {
        this.$21_2 = value;
        return value
    },
    get_textClassName: function () {
        return this.$c_2
    },
    set_textClassName: function (value) {
        this.$c_2 = value;
        return value
    },
    get_textHoverClassName: function () {
        return this.$1I_2
    },
    set_textHoverClassName: function (value) {
        this.$1I_2 = value;
        return value
    },
    get_textSelectedClassName: function () {
        return this.$1b_2
    },
    set_textSelectedClassName: function (value) {
        this.$1b_2 = value;
        return value
    },
    get_textSpanClassName: function () {
        return this.$3G_2
    },
    set_textSpanClassName: function (value) {
        this.$3G_2 = value;
        return value
    },
    get_textSpanHoverClassName: function () {
        return this.$3H_2
    },
    set_textSpanHoverClassName: function (value) {
        this.$3H_2 = value;
        return value
    },
    get_textSpanSelectedClassName: function () {
        return this.$3I_2
    },
    set_textSpanSelectedClassName: function (value) {
        this.$3I_2 = value;
        return value
    },
    get_itemContents: function () {
        IsNull(this._itemContents) && this.createElements();
        return this._itemContents
    },
    set_itemContents: function (value) {
        this._itemContents = value;
        return value
    },
    get_title: function () {
        return this._title
    },
    set_title: function (value) {
        this._title = value;
        !IsNull(this._text) && XUI.Html.SetText(XUI.Html.DomUtils.GetFirstChild(this._text), this._title);
        return value
    },
    get_tooltip: function () {
        return IsNull(this.$23_2) ? this._title : this.$23_2
    },
    set_tooltip: function (value) {
        this.$23_2 = value;
        return value
    },
    get_accessKey: function () {
        return this.$1A_2
    },
    set_accessKey: function (value) {
        this.$1A_2 = value;
        return value
    },
    get_actionCallback: function () {
        return this._actionCallback
    },
    set_actionCallback: function (value) {
        this._actionCallback = value;
        if (!IsNull(this._anchor)) this._itemContents.tabIndex = IsNull(value) ? null : 0;
        return value
    },
    get_auxActionCallback: function () {
        return this._auxActionCallback
    },
    set_auxActionCallback: function (value) {
        this._auxActionCallback = value;
        if (!IsNull(this._auxAnchor)) this._auxAnchor.tabIndex = this.$2c_2 ? 0 : -1;
        return value
    },
    get_reference: function () {
        return this.$11_2
    },
    set_reference: function (value) {
        this.$11_2 = value;
        return value
    },
    get_contextMenu: function () {
        return this._contextMenu
    },
    set_contextMenu: function (value) {
        this._contextMenu = value;
        return value
    },
    get_stylePrefix: function () {
        return this._stylePrefix
    },
    set_stylePrefix: function (value) {
        if (this._stylePrefix === value) return value;
        if (!isNullOrEmptyString(value)) {
            this._stylePrefix = value;
            value = String.format("{0}-", value)
        } else if (IsNull(value)) {
            value = "";
            this._stylePrefix = value
        }
        this.setElementStyles(value);
        if (this._selected) this.displaySelectedStyle();
        else this.displayRestStyle();
        return value
    },
    setElementStyles: function (value) {
        var $v_0 = Mscrm.MenuItem.$4I[value];
        if (IsNull($v_0)) {
            $v_0 = this.buildNewStylesCache(value);
            Mscrm.MenuItem.$4I[value] = $v_0
        }
        this.assignElementStyles($v_0)
    },
    assignElementStyles: function (styles) {
        this.$I_2 = styles["itemClassName"].toString();
        this.$1r_2 = styles["itemHoverClassName"].toString();
        this.$1s_2 = styles["itemSelectedClassName"].toString();
        this.$1i_2 = styles["anchorClassName"].toString();
        this.$1j_2 = styles["anchorHoverClassName"].toString();
        this.$1k_2 = styles["anchorSelectedClassName"].toString();
        this.$s_2 = styles["iconClassName"].toString();
        this.$1U_2 = styles["iconHoverClassName"].toString();
        this.$1V_2 = styles["iconSelectedClassName"].toString();
        this.$U_2 = styles["auxIconClassName"].toString();
        this.$1N_2 = styles["auxIconHoverClassName"].toString();
        this.$2d_2 = styles["auxIconSelectedClassName"].toString();
        this.$13_2 = styles["separatorClassName"].toString();
        this.$20_2 = styles["separatorHoverClassName"].toString();
        this.$21_2 = styles["separatorSelectedClassName"].toString();
        this.$c_2 = styles["textClassName"].toString();
        this.$1I_2 = styles["textHoverClassName"].toString();
        this.$1b_2 = styles["textSelectedClassName"].toString()
    },
    buildNewStylesCache: function (value) {
        var $v_0 = {};
        $v_0["itemClassName"] = String.format("ms-crm-MenuItem-NoOutline ms-crm-{0}MenuItem ms-crm-{0}MenuItem-Rest", value);
        $v_0["itemHoverClassName"] = String.format("ms-crm-MenuItem-NoOutline ms-crm-{0}MenuItem ms-crm-{0}MenuItem-Hover", value);
        $v_0["itemSelectedClassName"] = String.format("ms-crm-MenuItem-NoOutline ms-crm-{0}MenuItem ms-crm{0}MenuItem-Selected", value);
        $v_0["anchorClassName"] = String.format("ms-crm-{0}MenuItem-Anchor ms-crm-{0}MenuItem-Anchor-Rest", value);
        $v_0["anchorHoverClassName"] = String.format("ms-crm-{0}MenuItem-Anchor ms-crm-{0}MenuItem-Anchor-Hover", value);
        $v_0["anchorSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Anchor ms-crm-{0}MenuItem-Anchor-Selected", value);
        $v_0["iconClassName"] = String.format("ms-crm-{0}MenuItem-Icon ms-crm-{0}MenuItem-Icon-Rest", value);
        $v_0["iconHoverClassName"] = String.format("ms-crm-{0}MenuItem-Icon ms-crm-{0}MenuItem-Icon-Hover", value);
        $v_0["iconSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Icon ms-crm-{0}MenuItem-Icon-Selected", value);
        $v_0["auxIconClassName"] = String.format("ms-crm-{0}MenuItem-Aux ms-crm-{0}MenuItem-Aux-Rest", value);
        $v_0["auxIconHoverClassName"] = String.format("ms-crm-{0}MenuItem-Aux ms-crm-{0}MenuItem-Aux-Hover", value);
        $v_0["auxIconSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Aux ms-crm-{0}MenuItem-Aux-Selected", value);
        $v_0["separatorClassName"] = String.format("ms-crm-{0}MenuItem-Sep ms-crm-{0}MenuItem-Sep-Rest", value);
        $v_0["separatorHoverClassName"] = String.format("ms-crm-{0}MenuItem-Sep ms-crm-{0}MenuItem-Sep-Hover", value);
        $v_0["separatorSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Sep ms-crm-{0}MenuItem-Sep-Selected", value);
        $v_0["textClassName"] = String.format("ms-crm-{0}MenuItem-Title ms-crm-{0}MenuItem-Title-Rest", value);
        $v_0["textHoverClassName"] = String.format("ms-crm-{0}MenuItem-Title ms-crm-{0}MenuItem-Title-Hover", value);
        $v_0["textSelectedClassName"] = String.format("ms-crm-{0}MenuItem-Title ms-crm-{0}MenuItem-Title-Selected", value);
        return $v_0
    },
    get_isSelected: function () {
        return this._selected
    },
    set_isSelected: function (value) {
        this._selected = value;
        if (value) this.displaySelectedStyle();
        else this.displayRestStyle();
        return value
    },
    get_isFocusable: function () {
        return this.$3s_2
    },
    set_isFocusable: function (value) {
        this.$3s_2 = value;
        return value
    },
    get_isAuxAnchorFocusable: function () {
        return this.$2c_2
    },
    set_isAuxAnchorFocusable: function (value) {
        this.$2c_2 = value;
        if (!IsNull(this._auxAnchor)) this._auxAnchor.tabIndex = value ? 0 : -1;
        return value
    },
    get_focusElement: function () {
        return this.get_itemContents()
    },
    get_isMenu: function () {
        return false
    },
    displayRestStyle: function () {
        if (IsNull(this._itemContents)) return;
        this._itemContents.className = this.$I_2;
        this._anchor.className = this.$1i_2;
        this._icon.className = this.$s_2;
        this._iconSpan.className = this.$s_2;
        this._auxAnchor.className = this.$U_2;
        XUI.Html.DomUtils.GetFirstChild(this._auxAnchor).className = this.$U_2;
        this._auxIcon.className = this.$U_2;
        this._separator.className = this.$13_2;
        if (this.$2G_2) this._text.className = this.$c_2 + " ms-crm-MenuItem-Disabled";
        else this._text.className = this.$c_2;
        XUI.Html.DomUtils.GetFirstChild(this._text).className = this.$c_2
    },
    displayHoverStyle: function () {
        if (IsNull(this._itemContents)) return;
        this._itemContents.className = this.$1r_2;
        this._anchor.className = this.$1j_2;
        this._icon.className = this.$1U_2;
        this._iconSpan.className = this.$1U_2;
        this._separator.className = this.$20_2;
        if (this.$2G_2) this._text.className = this.$1I_2 + " ms-crm-MenuItem-Disabled";
        else this._text.className = this.$1I_2;
        XUI.Html.DomUtils.GetFirstChild(this._text).className = this.$1I_2;
        if (this.$1B_2) {
            this._auxAnchor.className = this.$1N_2;
            XUI.Html.DomUtils.GetFirstChild(this._auxAnchor).className = this.$1N_2;
            this._auxIcon.className = this.$1N_2
        }
    },
    displaySelectedStyle: function () {
        if (IsNull(this._itemContents)) return;
        this._itemContents.className = this.$1s_2;
        this._anchor.className = this.$1k_2;
        this._icon.className = this.$1V_2;
        this._iconSpan.className = this.$1V_2;
        this._auxAnchor.className = this.$2d_2;
        XUI.Html.DomUtils.GetFirstChild(this._auxAnchor).className = this.$2d_2;
        this._auxIcon.className = this.$2d_2;
        this._separator.className = this.$21_2;
        this._text.className = this.$1b_2;
        XUI.Html.DomUtils.GetFirstChild(this._text).className = this.$1b_2
    },
    setHeight: function (height) {
        Mscrm.Utilities.setOuterHeight(this.get_itemContents(), height)
    },
    createElements: function () {
        this._itemContents = document.createElement("li");
        this._itemContents.setAttribute("id", this._menuItemId);
        this._itemContents.setAttribute("role", "menuitem");
        var $v_0 = {
            focus: this.$$d_onFocus,
            blur: this.$$d_onBlur,
            keydown: this.$$d_onKeyDown
        };
        if (!IsNull(this._contextMenu)) $v_0["contextmenu"] = this.$$d_onContextMenu;
        $addHandlers(this._itemContents, $v_0);
        if (!IsNull(this._actionCallback)) this._itemContents.tabIndex = 0;
        this._auxAnchor = document.createElement("a");
        this._auxAnchor.setAttribute("href", "#");
        if (this._renderFormat === Mscrm.MenuItem.formaT_AUX_IMAGE_SEP_TITLE) XUI.Html.SetFloat(this._auxAnchor, Mscrm.Utilities.get_isLeftToRight() ? "left" : "right");
        else XUI.Html.SetFloat(this._auxAnchor, Mscrm.Utilities.get_isLeftToRight() ? "right" : "left");
        $addHandlers(this._auxAnchor, {
            click: this.$$d_onAuxClick,
            mouseover: this.$$d_onAuxMouseOver,
            mouseout: this.$$d_onAuxMouseOut,
            focus: this.$$d_onAuxMouseOver,
            blur: this.$$d_onAuxMouseOut,
            keydown: this.$$d_onKeyDown
        });
        if (!IsNull(this._auxActionCallback)) this._auxAnchor.tabIndex = this.$2c_2 ? 0 : -1;
        if (this._auxIconPath === "") this._auxAnchor.style.display = "none";
        this._auxIcon = document.createElement("img");
        this._auxIcon.setAttribute("title", IsNull(this._auxIconTooltip) ? "" : this._auxIconTooltip);
        this._auxIcon.setAttribute("alt", IsNull(this._auxIconTooltip) ? "" : this._auxIconTooltip);
        !isNullOrEmptyString(this._auxIconPath) && this._auxIcon.setAttribute("src", this._auxIconPath);
        this._anchor = document.createElement("a");
        this._anchor.setAttribute("title", this.get_tooltip());
        if (!isNullOrEmptyString(this.$1A_2)) this._anchor.accessKey = this.$1A_2;
        $addHandlers(this._anchor, {
            click: this.$$d_onClick,
            mouseover: this.$$d_onMouseOver,
            mouseout: this.$$d_onMouseOut
        });
        if (IsNull(this._actionCallback)) this._anchor.style.cursor = "default";
        this._icon = document.createElement("img");
        this._icon.setAttribute("src", this._iconPath);
        this._iconSpan = document.createElement("span");
        this._iconSpan.appendChild(this._icon);
        this._separator = document.createElement("span");
        this._text = document.createElement("nobr");
        var $v_1 = document.createElement("span");
        this._text.appendChild($v_1);
        if (!isNullOrEmptyString(this._title)) if (!isNullOrEmptyString(this.$1A_2)) $v_1.innerHTML = Mscrm.Utilities.stringInjector(CrmEncodeDecode.CrmHtmlEncode(this._title), CrmEncodeDecode.CrmHtmlEncode(this.$1A_2), "<u>", "</u>");
        else XUI.Html.SetText($v_1, this._title);
        else $v_1.innerHTML = "&nbsp;";
        this._itemContents.appendChild(this._auxAnchor);
        this._auxAnchor.appendChild(document.createElement("span"));
        XUI.Html.DomUtils.GetFirstChild(this._auxAnchor).appendChild(this._auxIcon);
        this._itemContents.appendChild(this._anchor);
        this._anchor.appendChild(document.createElement("span"));
        var $v_2 = XUI.Html.DomUtils.GetFirstChild(this._anchor);
        $v_2.appendChild(this._iconSpan);
        $v_2.appendChild(this._separator);
        $v_2.appendChild(this._text);
        if (this._selected) this.displaySelectedStyle();
        else this.displayRestStyle()
    },
    onFocus: function (e) {
        !this._selected && this.displayHoverStyle();
        this.$7_2.set_activeItem(this)
    },
    onBlur: function (e) {
        !this._selected && this.displayRestStyle()
    },
    onClick: function (e) {
        this.$3M_2(this._actionCallback, this.$1o_2, this.$1E_2)
    },
    onMouseOver: function (e) {
        !this._selected && this.displayHoverStyle();
        if (this._stylePrefix === "CM" || this._stylePrefix === "in-CM") {
            var $v_0 = this.$7_2;
            while (!IsNull($v_0.get_parentMenu())) $v_0 = $v_0.get_parentMenu();
            if (IsNull($v_0.get_activeItem())) return;
            var $v_1 = $v_0.get_activeItem().get_isMenu() && $v_0.get_activeItem().get_inlineItem() === this;
            $v_0.get_activeItem() !== this && !$v_1 && $v_0.get_activeItem().displayRestStyle()
        }
    },
    onMouseOut: function (e) {
        !this._selected && this.displayRestStyle()
    },
    onAuxMouseOver: function (e) {
        if (!this._selected) if (this.$1B_2) this.displayHoverStyle();
        else {
            this._auxAnchor.className = this.$1N_2;
            XUI.Html.DomUtils.GetFirstChild(this._auxAnchor).className = this.$1N_2;
            this._auxIcon.className = this.$1N_2
        }
    },
    onAuxMouseOut: function (e) {
        if (!this._selected) if (this.$1B_2) this.displayRestStyle();
        else {
            this._auxAnchor.className = this.$U_2;
            XUI.Html.DomUtils.GetFirstChild(this._auxAnchor).className = this.$U_2;
            this._auxIcon.className = this.$U_2
        }
    },
    onKeyDown: function (e) {
        switch (e.keyCode) {
            case 37:
            case 39:
                if (this.$6s_2(e.keyCode)) if (this.$7_2.get_activeItem().get_isMenu()) this.$52_2(e);
                else this.$7_2.hideAll(true);
                break;
            case 13:
            case 32:
                this.$52_2(e);
                break
        }
    },
    $6s_2: function ($p0) {
        if (Mscrm.Utilities.get_isLeftToRight()) return $p0 === 39;
        else return $p0 === 37
    },
    $52_2: function ($p0) {
        if ($p0.target === this._itemContents) {
            $p0.stopPropagation();
            $p0.preventDefault();
            this.$3M_2(this._actionCallback, this.$1o_2, this.$1E_2)
        } else if ($p0.target === this._auxAnchor) {
            $p0.stopPropagation();
            $p0.preventDefault();
            this.$3M_2(this._auxActionCallback, this.$1p_2, this.$1E_2)
        }
    },
    onAuxClick: function (e) {
        this.$3M_2(this._auxActionCallback, this.$1p_2, this.$1E_2)
    },
    $3M_2: function ($p0, $p1, $p2) {
        if (!IsNull($p0) && !this.$2G_2) {
            $p1 && this.$7_2.hideAll($p2);
            $p0(this)
        }
    },
    onContextMenu: function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.$7_2.set_focusOutCheck(false);
        var $$t_3 = this;
        this._contextMenu.set_hideCallback(function ($p1_0) {
            $$t_3.$7_2.set_focusOutCheck(true);
            try {
                $$t_3.$7_2.get_isVisible() && $$t_3.get_focusElement().focus()
            } catch ($$e_2) {}
        });
        this._contextMenu.set_contextItem(this);
        this._contextMenu.set_left(e.clientX);
        this._contextMenu.set_top(e.clientY);
        this._contextMenu.show()
    },
    dispose: function () {
        !IsNull(this._itemContents) && $clearHandlers(this._itemContents);
        !IsNull(this._auxAnchor) && $clearHandlers(this._auxAnchor);
        !IsNull(this._anchor) && $clearHandlers(this._anchor);
        this._actionCallback = null;
        this._auxActionCallback = null;
        this._auxAnchor = null;
        this._itemContents = null;
        this._auxIcon = null;
        this._anchor = null;
        this._icon = null;
        this._iconSpan = null;
        this._separator = null;
        this._text = null;
        Mscrm.CrmUIComponent.prototype.dispose.call(this)
    }
};
Mscrm.MenuItemSeparator = function () {
    Mscrm.MenuItemSeparator.initializeBase(this);
    this._isSpacer = true
};
Mscrm.MenuItemSeparator.createSeparator = function (isVertical) {
    var $v_0 = $create(Mscrm.MenuItemSeparator);
    $v_0.$I_2 = "Separator";
    $v_0.$u_3 = isVertical;
    return $v_0
};
Mscrm.MenuItemSeparator.createSpacer = function (isVertical) {
    var $v_0 = $create(Mscrm.MenuItemSeparator);
    $v_0.$I_2 = "Spacer";
    $v_0.$u_3 = isVertical;
    return $v_0
};
Mscrm.MenuItemSeparator.prototype = {
    $3q_3: null,
    $1v_3: null,
    $3y_3: null,
    $u_3: false,
    get_isVertical: function () {
        return this.$u_3
    },
    set_isVertical: function (value) {
        this.$u_3 = value;
        return value
    },
    get_stylePrefix: function () {
        return this._stylePrefix
    },
    set_stylePrefix: function (value) {
        if (this._stylePrefix === value) return value;
        IsNull(this._itemContents) && this.createElements();
        if (!isNullOrEmptyString(value)) {
            this._stylePrefix = value;
            value = String.format("{0}-", value)
        } else if (IsNull(value)) {
            value = "";
            this._stylePrefix = value
        }
        var $v_0 = this.$u_3 ? "v" : "h";
        this._itemContents.className = String.format("ms-crm-{0}MenuItem-{2}-{1}", value, $v_0, this.$I_2);
        this.$3q_3.className = String.format("ms-crm-{0}MenuItem-{2}-{1}f", value, $v_0, this.$I_2);
        this.$1v_3.className = String.format("ms-crm-{0}MenuItem-{2}-{1}m", value, $v_0, this.$I_2);
        this.$3y_3.className = String.format("ms-crm-{0}MenuItem-{2}-{1}l", value, $v_0, this.$I_2);
        return value
    },
    createElements: function () {
        if (IsNull(this._itemContents)) {
            this._itemContents = document.createElement("LI");
            this.$3q_3 = document.createElement("SPAN");
            this._itemContents.appendChild(this.$3q_3);
            this.$1v_3 = document.createElement("SPAN");
            this._itemContents.appendChild(this.$1v_3);
            this.$3y_3 = document.createElement("SPAN");
            this._itemContents.appendChild(this.$3y_3)
        }
    },
    setHeight: function (height) {
        Mscrm.Utilities.setOuterHeight(this.get_itemContents(), height);
        var $v_0 = Mscrm.Utilities.parseInt(XUI.Html.GetComputedStyle(this.$1v_3, "marginTop")),
            $v_1 = Mscrm.Utilities.parseInt(XUI.Html.GetComputedStyle(this.$1v_3, "marginBottom")),
            $v_2 = $v_0 + $v_1;
        Mscrm.Utilities.setOuterHeight(this.$1v_3, height - $v_2)
    }
};
Mscrm.MenuStyles = function () {};
Mscrm.MenuStyles.get_modeSuffix = function () {
    return Mscrm.Utilities.get_isStandardsMode() ? "" : "-qrk"
};
Mscrm.AddActivity = function () {};
Mscrm.AddActivity.addActivityToForm = function (activityType, contentId) {
    var $v_0 = $get("crmFormSubmit"),
        $v_1 = $v_0.crmFormSubmitId.value,
        $v_2 = $v_0.crmFormSubmitObjectType.value,
        $v_3 = PARENT_NAME;
    Mscrm.AddActivity.$53(activityType, contentId, $v_1, $v_2, $v_3)
};
Mscrm.AddActivity.addActivityToFormFromsubgrid = function (activityType, parentId, parentType) {
    var $v_0 = "";
    Mscrm.AddActivity.$5R(activityType, null, parentId, parentType, $v_0, true)
};
Mscrm.AddActivity.addActivityToSelectedObject = function (activityType, contentId, entityReference) {
    Mscrm.AddActivity.$53(activityType, contentId, entityReference.Id, entityReference.TypeCode, entityReference.Name)
};
Mscrm.AddActivity.addActivityToObject = function (activityType, contentId, entityReference) {
    var $v_0 = entityReference.Id,
        $v_1 = entityReference.TypeCode;
    if (typeof activityType !== "number") activityType = parseInt(activityType, 10);
    if (typeof entityReference.TypeCode !== "number") $v_1 = parseInt(entityReference.TypeCode, 10);
    var $v_2 = "";
    if (!IsNull($v_0) && !IsNull($v_1)) {
        $v_2 += "&_CreateFromId=" + CrmEncodeDecode.CrmUrlEncode($v_0);
        $v_2 += "&_CreateFromType=" + CrmEncodeDecode.CrmUrlEncode($v_1)
    }
    if ($v_2.substr(0, 1) === "&") $v_2 = "?" + $v_2.substr(1);
    openFrmObj($v_2, "", activityType, null, 0, null)
};
Mscrm.AddActivity.addActivityTo = function (typeCode, id, type, name, partyId, partyType, partyName, location, contentId) {
    if (typeof type !== "number") type = parseInt(type, 10);
    if (typeof partyType !== "number") partyType = parseInt(partyType, 10);
    var $v_0 = "";
    if (!IsNull(id) && !IsNull(type) && typeCode !== 4401) {
        $v_0 += "&pId=" + CrmEncodeDecode.CrmUrlEncode(id);
        $v_0 += "&pType=" + CrmEncodeDecode.CrmUrlEncode(type);
        $v_0 += "&pName=" + CrmEncodeDecode.CrmUrlEncode(name)
    }
    if (!IsNull(partyId)) {
        $v_0 += "&partyid=" + CrmEncodeDecode.CrmUrlEncode(partyId);
        $v_0 += "&partytype=" + CrmEncodeDecode.CrmUrlEncode(partyType);
        $v_0 += "&partyname=" + CrmEncodeDecode.CrmUrlEncode(partyName);
        $v_0 += "&partyaddressused=";
        if (IsNull(location)) location = "";
        $v_0 += "&contactInfo=" + CrmEncodeDecode.CrmUrlEncode(location)
    }
    if (!isNullOrEmptyString(contentId)) $v_0 += "&contentId=" + CrmEncodeDecode.CrmUrlEncode(contentId);
    if ($v_0.substr(0, 1) === "&") $v_0 = "?" + $v_0.substr(1);
    openFrmObj($v_0, "", typeCode, null, 0, null)
};
Mscrm.AddActivity.$53 = function ($p0, $p1, $p2, $p3, $p4) {
    Mscrm.AddActivity.$5R($p0, $p1, $p2, $p3, $p4, false)
};
Mscrm.AddActivity.$5R = function ($p0, $p1, $p2, $p3, $p4, $p5) {
    if (typeof $p3 !== "number") $p3 = parseInt($p3, 10);
    if (typeof $p0 !== "number") $p0 = parseInt($p0, 10);
    var $v_0 = null,
        $v_1 = 0,
        $v_2 = null,
        $v_3 = null;
    if ($p0 !== 4212) switch ($p3) {
        case 1:
        case 2:
        case 4:
            $v_0 = $p2;
            $v_1 = $p3;
            $v_2 = $p4;
            switch ($p0) {
                case 4204:
                    $v_3 = window.LEAD_PARTY_LOCATION_FOR_FAX;
                    break;
                case 4207:
                    $v_3 = window.LEAD_PARTY_LOCATION_FOR_LETTER;
                    break;
                case 4210:
                    $v_3 = window.LEAD_PARTY_LOCATION_FOR_PHONE;
                    break;
                default:
                    $v_3 = "";
                    break
            }
            break;
        case 112:
        case 3:
        case 1084:
        case 1090:
        case 1088:
        case 1010:
            var $v_4;
            if ($p5) $v_4 = window.parent.document.getElementById("crmForm");
            else $v_4 = $get("crmForm");
            if (!IsNull($v_4)) {
                var $v_5 = Mscrm.FormControlInputBehavior.GetElementBehavior($get("customerid", $v_4)).get_dataValue();
                if (!IsNull($v_5) && !IsNull($v_5[0])) {
                    $v_0 = $v_5[0].id;
                    $v_1 = parseInt($v_5[0].type, 10);
                    $v_2 = $v_5[0].name
                }
            }
            $v_3 = "";
            break;
        default:
            if ($p0 === 4202 && $p3 >= 1e4) {
                $v_0 = $p2;
                $v_1 = $p3;
                $v_2 = $p4
            }
            break
    }
    Mscrm.AddActivity.addActivityTo($p0, $p2, $p3, $p4, $v_0, $v_1, $v_2, $v_3, $p1)
};
Mscrm.CrmBrowser = function () {};
Mscrm.CrmBrowser.$6T = function ($p0) {
    return Mscrm.CrmBrowser.$6S($p0.userAgent, $p0.appName, $p0.appVersion, document.documentMode)
};
Mscrm.CrmBrowser.$6S = function ($p0, $p1, $p2, $p3) {
    var $v_0 = new Mscrm.CrmBrowser;
    $v_0.$q_0 = 0;
    $v_0.$2r_0 = false;
    $v_0.$2z_0 = false;
    $v_0.$1x_0 = $p1;
    $v_0.$1K_0 = parseFloat($p2);
    $v_0.$2H_0 = 0;
    if ($p0.indexOf(" MSIE ") > -1) {
        $v_0.$q_0 = 1;
        $v_0.$1x_0 = "IE";
        var $v_1 = new RegExp("MSIE (\\d+\\.\\d+)");
        $v_0.$1K_0 = parseFloat($v_1.exec($p0)[1]);
        if ($v_0.$1K_0 >= 7) if (!IsNull($p3) && $p3 >= 7) $v_0.$2H_0 = $p3;
        $v_0.$2r_0 = true;
        if ($p0.indexOf("IEMobile") !== -1 || $p0.indexOf("Windows Phone") !== -1) $v_0.$3w_0 = true;
        if (!IsNull(window.navigator.msMaxTouchPoints)) $v_0.$2z_0 = true
    } else if ($p0.indexOf(" Firefox/") > -1) {
        var $v_2 = new RegExp(" Firefox\\/(\\d+\\.\\d+)");
        $v_0.$1K_0 = parseFloat($v_2.exec($p0)[1]);
        $v_0.$q_0 = 2;
        $v_0.$1x_0 = "Firefox";
        $v_0.$2r_0 = true
    } else if ($p0.indexOf(" Chrome/") > -1) {
        var $v_3 = new RegExp(" Chrome\\/(\\d+(\\.\\d+)?)");
        $v_0.$1K_0 = parseFloat($v_3.exec($p0)[1]);
        $v_0.$q_0 = 3;
        $v_0.$1x_0 = "Chrome"
    } else if ($p0.indexOf(" AppleWebKit/") > -1) {
        var $v_4 = new RegExp(" AppleWebKit\\/(\\d+(\\.\\d+)?)");
        $v_0.$1K_0 = parseFloat($v_4.exec($p0)[1]);
        $v_0.$q_0 = 4;
        $v_0.$1x_0 = "Safari";
        if ($p0.indexOf("iPhone") !== -1 || $p0.indexOf("iPad") !== -1 || $p0.indexOf("iPod") !== -1) {
            $v_0.$3w_0 = true;
            $v_0.$2z_0 = true;
            $v_0.$4n_0 = true
        }
    } else if ($p0.indexOf("Opera/") > -1) $v_0.$q_0 = 5;
    return $v_0
};
Mscrm.CrmBrowser.get_currentBrowser = function () {
    if (IsNull(Mscrm.CrmBrowser.$2f)) Mscrm.CrmBrowser.$2f = Mscrm.CrmBrowser.$6T(window.navigator);
    return Mscrm.CrmBrowser.$2f
};
Mscrm.CrmBrowser.prototype = {
    $q_0: 0,
    $1x_0: null,
    $1K_0: 0,
    $2r_0: false,
    $2H_0: 0,
    $3w_0: false,
    $4n_0: false,
    $2z_0: false,
    get_agent: function () {
        return this.$q_0
    },
    get_name: function () {
        return this.$1x_0
    },
    get_version: function () {
        return this.$1K_0
    },
    get_isMobile: function () {
        return this.$3w_0
    },
    get_isMobileSafari: function () {
        return this.$4n_0
    },
    get_isTouchEnabled: function () {
        return this.$2z_0
    },
    get_isIE7: function () {
        return this.$q_0 === 1 && this.$1K_0 <= 7 && this.$2H_0 <= 7
    },
    get_isIE8: function () {
        return this.$q_0 === 1 && this.$2H_0 === 8
    },
    get_hasDebuggerStatement: function () {
        return this.$2r_0
    },
    get_documentMode: function () {
        return this.$2H_0
    }
};
Mscrm.RecentlyViewedItem = function () {};
Mscrm.RecentlyViewedItem.prototype = {
    Name: null,
    Id: null,
    TypeName: null,
    DisplayName: null,
    TypeCode: 0,
    Action: null
};
Mscrm.CrmUIComponent = function () {
    Mscrm.CrmUIComponent.initializeBase(this)
};
Mscrm.CrmUIComponent.$$cctor = function () {
    crmCreate = Mscrm.CrmUIComponent.crmCreate
};
Mscrm.CrmUIComponent.crmCreate = function (type, properties, events, references, element) {
    try {
        if (!Mscrm.PageManager.$1Y) return $create(type, properties, events, references, element)
    } catch ($v_0) {
        if (!element) return null;
        var $v_1 = String.format("Error initializing component with element id='{0}' and with type='{1}': {2}", !element ? "null" : element.id, !type ? "null" : type.getName(), $v_0.message);
        catchError($v_1, window.location.href, 0, true)
    }
    return null
};
Mscrm.CrmUIComponent.prototype = {
    handleEvent: function (eventCode, parameters, sourceComponent) {
        return null
    },
    raiseEvent: function (eventCode, parameters) {
        return this.$4_1.raiseEvent(eventCode, parameters, this)
    },
    raiseEventWithCheck: function (eventCode, parameters) {
        var $v_0 = this.$4_1;
        if ($v_0) return $v_0.raiseEvent(eventCode, parameters, this);
        else return []
    },
    $P_1: null,
    get_subscribedEvents: function () {
        return this.$P_1
    },
    set_subscribedEvents: function (value) {
        this.$P_1 = value;
        return value
    },
    _disposed: false,
    get_isDisposed: function () {
        return this._disposed
    },
    dispose: function () {
        if (this._disposed) return;
        this._disposed = true;
        Sys.Component.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    initialize: function () {
        Sys.Component.prototype.initialize.call(this);
        if (!IsNull(this.$4_1)) if (!IsNull(this.$P_1)) for (var $v_0 = 0; $v_0 < this.$P_1.length; $v_0++) this.$4_1.subscribeEvent(this.$P_1[$v_0], this.get_id())
    },
    $1z_1: null,
    get_rootManager: function () {
        return this.$1z_1
    },
    set_rootManager: function (value) {
        this.$1z_1 = value;
        return value
    },
    $4_1: null,
    get_eventManager: function () {
        return this.$4_1
    },
    set_eventManager: function (value) {
        this.$4_1 = value;
        return value
    }
};
Mscrm.CrmUIControl = function (element) {
    Mscrm.CrmUIControl.initializeBase(this, [element])
};
Mscrm.CrmUIControl.prototype = {
    fireControlEvent: function (eventName, args) {
        var $v_0 = this.get_events().getHandler(eventName);
        if ($v_0) {
            $v_0(this, args);
            return true
        }
        return false
    },
    handleEvent: function (eventCode, parameters, sourceComponent) {
        return null
    },
    raiseEvent: function (eventCode, parameters) {
        return this.$4_2.raiseEvent(eventCode, parameters, this)
    },
    raiseEventWithCheck: function (eventCode, parameters) {
        var $v_0 = this.$4_2;
        if ($v_0) return $v_0.raiseEvent(eventCode, parameters, this);
        else return []
    },
    $P_2: null,
    get_subscribedEvents: function () {
        return this.$P_2
    },
    set_subscribedEvents: function (value) {
        this.$P_2 = value;
        return value
    },
    initialize: function () {
        Sys.Component.prototype.initialize.call(this);
        if (!IsNull(this.$4_2)) if (!IsNull(this.$P_2)) for (var $v_0 = 0; $v_0 < this.$P_2.length; $v_0++) this.$4_2.subscribeEvent(this.$P_2[$v_0], this.get_id())
    },
    _disposed: false,
    get_isDisposed: function () {
        return this._disposed
    },
    dispose: function () {
        if (this._disposed) return;
        this._disposed = true;
        Sys.Component.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    $1z_2: null,
    get_rootManager: function () {
        return this.$1z_2
    },
    set_rootManager: function (value) {
        this.$1z_2 = value;
        return value
    },
    $4_2: null,
    get_eventManager: function () {
        return this.$4_2
    },
    set_eventManager: function (value) {
        this.$4_2 = value;
        return value
    },
    get_height: function () {
        return this.get_element().offsetHeight
    },
    set_height: function (value) {
        if (value < 0) this.get_element().style.height = "0px";
        else this.get_element().style.height = value.toString() + "px";
        return value
    },
    get_width: function () {
        return this.get_element().offsetWidth
    },
    set_width: function (value) {
        if (value < 0) this.get_element().style.width = "0px";
        else this.get_element().style.width = value.toString() + "px";
        return value
    },
    get_left: function () {
        return this.get_element().offsetLeft
    },
    set_left: function (value) {
        this.get_element().style.left = value.toString() + "px";
        return value
    },
    get_top: function () {
        return this.get_element().offsetTop
    },
    set_top: function (value) {
        this.get_element().style.top = value.toString() + "px";
        return value
    }
};
Mscrm.UIControl = function (innerControl) {
    Mscrm.UIControl.initializeBase(this, [innerControl])
};
Mscrm.UIControl.prototype = {
    setVisible: function (isVisible) {
        Sys.UI.DomElement.setVisible(this.get_element(), isVisible)
    },
    getVisible: function () {
        return Sys.UI.DomElement.getVisible(this.get_element())
    },
    setFocus: function () {
        Mscrm.FormControlInputBehavior.GetElementBehavior(this.get_element()).setFocus()
    },
    get_disabled: function () {
        return Mscrm.FormControlInputBehavior.GetElementBehavior(this.get_element()).get_disabled()
    },
    set_disabled: function (value) {
        Mscrm.FormControlInputBehavior.GetElementBehavior(this.get_element()).set_disabled(value);
        return value
    },
    dispose: function () {
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    }
};
Mscrm.CrmUIBehavior = function (element) {
    Mscrm.CrmUIBehavior.initializeBase(this, [element])
};
Mscrm.CrmUIBehavior.getBehaviorByName = function (element, name) {
    return Sys.UI.Behavior.getBehaviorByName(element, name)
};
Mscrm.CrmUIBehavior.prototype = {
    handleEvent: function (eventCode, parameters, sourceComponent) {
        return null
    },
    fireControlEvent: function (eventName, args) {
        var $v_0 = this.get_events().getHandler(eventName);
        if (!IsNull($v_0)) {
            $v_0(this, args);
            return true
        }
        return false
    },
    raiseEvent: function (eventCode, parameters) {
        return this.$4_2.raiseEvent(eventCode, parameters, this)
    },
    raiseEventWithCheck: function (eventCode, parameters) {
        var $v_0 = this.$4_2;
        if ($v_0) return $v_0.raiseEvent(eventCode, parameters, this);
        else return []
    },
    $P_2: null,
    get_subscribedEvents: function () {
        return this.$P_2
    },
    set_subscribedEvents: function (value) {
        this.$P_2 = value;
        return value
    },
    _disposed: false,
    get_isDisposed: function () {
        return this._disposed
    },
    dispose: function () {
        if (this._disposed) return;
        this._disposed = true;
        Sys.UI.Behavior.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    initialize: function () {
        Sys.UI.Behavior.prototype.initialize.call(this);
        if (!IsNull(this.$4_2)) if (!IsNull(this.$P_2)) for (var $v_0 = 0; $v_0 < this.$P_2.length; $v_0++) this.$4_2.subscribeEvent(this.$P_2[$v_0], this.get_id())
    },
    $1z_2: null,
    get_rootManager: function () {
        return this.$1z_2
    },
    set_rootManager: function (value) {
        this.$1z_2 = value;
        return value
    },
    $4_2: null,
    get_eventManager: function () {
        return this.$4_2
    },
    set_eventManager: function (value) {
        this.$4_2 = value;
        return value
    }
};
Mscrm.CurrencyValidator = function () {};
Mscrm.CurrencyValidator.IsValidCurrencyCode = function (input) {
    var $v_0 = new RegExp("^[a-zA-Z]{3}$");
    return $v_0.test(input)
};
Mscrm.CurrencyValidator.IsValidCurrencySymbol = function (input) {
    if (input.length >= Mscrm.CurrencyValidator.$62 && input.length <= Mscrm.CurrencyValidator.$61) return true;
    return false
};
Mscrm.CurrencyValidator.IsValidCurrencyName = function (input) {
    if (input.length >= Mscrm.CurrencyValidator.$60 && input.length <= Mscrm.CurrencyValidator.$5z) return true;
    return false
};
Mscrm.CurrencyValidator.IsValidCurrencyPrecision = function (input) {
    var $v_0 = new RegExp("^[0-4]{1}$");
    return $v_0.test(input.toString())
};
Mscrm.CurrencyValidator.InitializeDomElements = function (builtInCurrencyDiv, customCurrencyDiv, builtInCurrencyInput, customCurrencyInput, customCurrencyCode, customCurrencySymbol, customCurrencyName, requiredInputNote, errorLabel, precisionDropDown, currencyList, regionDropDown, specifyCustomCurrencyLink, customCurrencyHeader) {
    Mscrm.CurrencyValidator.$3O = $get(builtInCurrencyDiv);
    Mscrm.CurrencyValidator.$2U = $get(customCurrencyDiv);
    Mscrm.CurrencyValidator.$3P = $get(builtInCurrencyInput);
    Mscrm.CurrencyValidator.$3S = $get(customCurrencyInput);
    Mscrm.CurrencyValidator.$k = $get(customCurrencyCode);
    Mscrm.CurrencyValidator.$m = $get(customCurrencySymbol);
    Mscrm.CurrencyValidator.$l = $get(customCurrencyName);
    Mscrm.CurrencyValidator.$3a = $get(requiredInputNote);
    Mscrm.CurrencyValidator.$3U = $get(errorLabel);
    Mscrm.CurrencyValidator.$26 = $get(precisionDropDown);
    Mscrm.CurrencyValidator.$3R = $get(currencyList);
    Mscrm.CurrencyValidator.$3Z = $get(regionDropDown);
    Mscrm.CurrencyValidator.$3c = $get(specifyCustomCurrencyLink);
    Mscrm.CurrencyValidator.$4K = $get(customCurrencyHeader);
    $addHandler(window, "unload", Mscrm.CurrencyValidator.$5H);
    $addHandler(Mscrm.CurrencyValidator.$3c, "click", Mscrm.CurrencyValidator.$7K)
};
Mscrm.CurrencyValidator.DisableBuiltInEnableCustomDiv = function () {
    Mscrm.CurrencyValidator.$3P.checked = false;
    Mscrm.CurrencyValidator.$3S.checked = true;
    Mscrm.CurrencyValidator.$3O.disabled = true;
    Mscrm.CurrencyValidator.$2U.disabled = false;
    Mscrm.CurrencyValidator.$3a.disabled = false;
    Mscrm.CurrencyValidator.$k.disabled = false;
    Mscrm.CurrencyValidator.$m.disabled = false;
    Mscrm.CurrencyValidator.$l.disabled = false;
    Mscrm.CurrencyValidator.$26.disabled = false;
    Mscrm.CurrencyValidator.$3Z.disabled = true;
    Mscrm.CurrencyValidator.$3R.disabled = true;
    WatermarkTextBox_OnEnable(Mscrm.CurrencyValidator.$k);
    WatermarkTextBox_OnEnable(Mscrm.CurrencyValidator.$m);
    WatermarkTextBox_OnEnable(Mscrm.CurrencyValidator.$l);
    WatermarkTextBox_OnBlur(Mscrm.CurrencyValidator.$k);
    WatermarkTextBox_OnBlur(Mscrm.CurrencyValidator.$m);
    WatermarkTextBox_OnBlur(Mscrm.CurrencyValidator.$l);
    Mscrm.CurrencyValidator.ClearErrorText()
};
Mscrm.CurrencyValidator.EnableBuiltInDisableCustomDiv = function () {
    Mscrm.CurrencyValidator.$3P.checked = true;
    Mscrm.CurrencyValidator.$3S.checked = false;
    Mscrm.CurrencyValidator.$3O.disabled = false;
    Mscrm.CurrencyValidator.$2U.disabled = true;
    Mscrm.CurrencyValidator.$3a.disabled = true;
    Mscrm.CurrencyValidator.$k.disabled = true;
    Mscrm.CurrencyValidator.$m.disabled = true;
    Mscrm.CurrencyValidator.$l.disabled = true;
    Mscrm.CurrencyValidator.$26.disabled = true;
    Mscrm.CurrencyValidator.$3Z.disabled = false;
    Mscrm.CurrencyValidator.$3R.disabled = false;
    WatermarkTextBox_OnDisable(Mscrm.CurrencyValidator.$k);
    WatermarkTextBox_OnDisable(Mscrm.CurrencyValidator.$m);
    WatermarkTextBox_OnDisable(Mscrm.CurrencyValidator.$l);
    Mscrm.CurrencyValidator.ClearErrorText()
};
Mscrm.CurrencyValidator.InitializeCurrencyPicker = function (isCustom) {
    if (isCustom === 1) {
        Mscrm.CurrencyValidator.$5q();
        Mscrm.CurrencyValidator.DisableBuiltInEnableCustomDiv()
    } else Mscrm.CurrencyValidator.EnableBuiltInDisableCustomDiv()
};
Mscrm.CurrencyValidator.ValidateCurrencyCodeInput = function () {
    var $v_0 = Mscrm.CurrencyValidator.$k.value,
        $v_1 = Mscrm.CurrencyValidator.IsValidCurrencyCode($v_0);
    $v_0 !== LOCID_CURRENCY_CODE_WATERMARK && WatermarkTextBox_OnInvalidData(Mscrm.CurrencyValidator.$k);
    if (!$v_1 || $v_0 === LOCID_CURRENCY_CODE_WATERMARK) {
        Mscrm.CurrencyValidator.SetErrorText(LOCID_INVALID_CURRENCY_CODE);
        return false
    }
    Mscrm.CurrencyValidator.ClearErrorText();
    WatermarkTextBox_OnValidData(Mscrm.CurrencyValidator.$k);
    return true
};
Mscrm.CurrencyValidator.ValidateCurrencySymbolInput = function () {
    var $v_0 = Mscrm.CurrencyValidator.$m.value,
        $v_1 = Mscrm.CurrencyValidator.IsValidCurrencySymbol($v_0);
    $v_0 !== LOCID_CURRENCY_SYMBOL_WATERMARK && WatermarkTextBox_OnInvalidData(Mscrm.CurrencyValidator.$m);
    if (!$v_1 || $v_0 === LOCID_CURRENCY_SYMBOL_WATERMARK) {
        Mscrm.CurrencyValidator.SetErrorText(LOCID_INVALID_CURRENCY_SYMBOL);
        return false
    }
    Mscrm.CurrencyValidator.ClearErrorText();
    WatermarkTextBox_OnValidData(Mscrm.CurrencyValidator.$m);
    return true
};
Mscrm.CurrencyValidator.ValidateCurrencyNameInput = function () {
    var $v_0 = Mscrm.CurrencyValidator.$l.value,
        $v_1 = Mscrm.CurrencyValidator.IsValidCurrencyName($v_0);
    $v_0 !== LOCID_CURRENCY_NAME_WATERMARK && WatermarkTextBox_OnInvalidData(Mscrm.CurrencyValidator.$l);
    if (!$v_1 || $v_0 === LOCID_CURRENCY_NAME_WATERMARK) {
        Mscrm.CurrencyValidator.SetErrorText(LOCID_INVALID_CURRENCY_NAME);
        return false
    }
    Mscrm.CurrencyValidator.ClearErrorText();
    WatermarkTextBox_OnValidData(Mscrm.CurrencyValidator.$l);
    return true
};
Mscrm.CurrencyValidator.ValidatePrecisionInput = function () {
    var $v_0 = Mscrm.CurrencyValidator.$26.options[Mscrm.CurrencyValidator.$26.selectedIndex],
        $v_1 = parseInt($v_0.value, 10),
        $v_2 = Mscrm.CurrencyValidator.IsValidCurrencyPrecision($v_1);
    if (!$v_2) {
        Mscrm.CurrencyValidator.SetErrorText(LOCID_INVALID_CURRENCY_PRECISION);
        return false
    }
    Mscrm.CurrencyValidator.ClearErrorText();
    return true
};
Mscrm.CurrencyValidator.ValidateInput = function () {
    if (Mscrm.CurrencyValidator.ValidateCurrencyCodeInput() && Mscrm.CurrencyValidator.ValidateCurrencySymbolInput() && Mscrm.CurrencyValidator.ValidateCurrencyNameInput() && Mscrm.CurrencyValidator.ValidatePrecisionInput()) return true;
    else return false
};
Mscrm.CurrencyValidator.SetErrorText = function ($p0) {
    Mscrm.CurrencyValidator.$3U.innerHTML = CrmEncodeDecode.CrmHtmlEncode($p0)
};
Mscrm.CurrencyValidator.ClearErrorText = function () {
    Mscrm.CurrencyValidator.$3U.innerHTML = ""
};
Mscrm.CurrencyValidator.$7K = function ($p0) {
    Mscrm.CurrencyValidator.$5q()
};
Mscrm.CurrencyValidator.$5q = function () {
    Mscrm.CurrencyValidator.$4K.className = "CustomCurrencyVisible";
    Mscrm.CurrencyValidator.$2U.className = "CustomCurrencyVisible"
};
Mscrm.CurrencyValidator.$5H = function ($p0) {
    $clearHandlers(Mscrm.CurrencyValidator.$3c);
    $removeHandler(window, "unload", Mscrm.CurrencyValidator.$5H)
};
Mscrm.CrmEventArgs = function () {
    Mscrm.CrmEventArgs.initializeBase(this)
};
Mscrm.CrmEventArgs.prototype = {
    $4m_1: false,
    returnValue: null,
    preventDefault: function () {
        this.$4m_1 = true
    },
    get_isDefaultPrevented: function () {
        return this.$4m_1
    }
};

function prependOrgName(sUrl) {
    var $v_0 = sUrl;
    if (window.IS_PATHBASEDURLS && window.ORG_UNIQUE_NAME.length > 0) $v_0 = "/" + CrmEncodeDecode.CrmUrlEncode(window.ORG_UNIQUE_NAME) + sUrl;
    return $v_0
}
Mscrm.CrmOneNoteUri = function ($p0, $p1) {
    Mscrm.CrmOneNoteUri.initializeBase(this, [$p0, $p1]);
    this.set_useOrganizationName(false);
    this.set_useVersionStamp(false);
    this.set_useCssLcid(false)
};
Mscrm.CrmOneNoteUri.prototype = {
    parse: function ($p0) {
        var $v_0 = $p0.indexOf(":"),
            $v_1;
        $v_1 = $v_0 + 1;
        while ($p0.charAt($v_1) === "/") $v_1++;
        this.set_scheme($p0.substr(0, $v_1));
        this.set_host("");
        this.set_port(-1);
        var $v_2 = $p0.substr($v_1);
        this.parsePath($v_2)
    },
    get_isLocalServer: function () {
        return false
    },
    toString: function () {
        return Mscrm.CrmUri.prototype.toString.call(this)
    }
};
Mscrm.CrmUri = function (uri, organizationName, baseUri) {
    this.$1d_0 = IsNull(organizationName) ? "" : CrmEncodeDecode.CrmUrlEncode(organizationName);
    this.$4H_0 = baseUri;
    if (IsNull(uri)) uri = "";
    this.parse(uri);
    this.$4N_0 = uri;
    this.$H_0 = this.$L_0;
    if (uri.length > 0) {
        this.$7C_0();
        this.$7B_0();
        this.$7A_0();
        this.$7D_0()
    }
};
Mscrm.CrmUri.create = function (uri, baseUri) {
    if (uri.toLowerCase().startsWith("onenote:")) return new Mscrm.CrmOneNoteUri(uri, window.ORG_UNIQUE_NAME);
    if (uri.toLowerCase().startsWith("$webresource:")) if (!isNullOrEmptyString(window.WEB_RESOURCE_ORG_VERSION_NUMBER)) return new Mscrm.CrmUri("/" + window.WEB_RESOURCE_ORG_VERSION_NUMBER + "/WebResources/" + uri.substr(13), window.ORG_UNIQUE_NAME);
    else return new Mscrm.CrmUri("/WebResources/" + uri.substr(13), window.ORG_UNIQUE_NAME);
    return new Mscrm.CrmUri(uri, window.ORG_UNIQUE_NAME, baseUri)
};
Mscrm.CrmUri.createForOrganization = function (uri, organizationName) {
    if (uri.toLowerCase().startsWith("onenote:")) return new Mscrm.CrmOneNoteUri(uri, organizationName);
    return new Mscrm.CrmUri(uri, organizationName)
};
Mscrm.CrmUri.isSameDomain = function (uriA, uriB) {
    if (uriA.startsWith("/") && uriB.startsWith("/")) return true;
    var $v_0 = Mscrm.CrmUri.$5U(uriA),
        $v_1 = Mscrm.CrmUri.$5U(uriB);
    return $v_0.get_scheme() === $v_1.get_scheme() && $v_0.get_host() === $v_1.get_host() && $v_0.get_port() === $v_1.get_port()
};
Mscrm.CrmUri.$5U = function ($p0) {
    var $v_0 = Mscrm.CrmUri.create($p0.toUpperCase());
    Mscrm.CrmUri.$7G($v_0.get_host(), window.top.WEB_SERVER_HOST.toUpperCase(), window.top.location.hostname.toUpperCase()) && Mscrm.CrmUri.$6x($v_0);
    return $v_0
};
Mscrm.CrmUri.$7G = function ($p0, $p1, $p2) {
    return isNullOrEmptyString($p0) || $p0 === $p1 || $p0 === $p2
};
Mscrm.CrmUri.$6x = function ($p0) {
    $p0.set_host(window.top.WEB_SERVER_HOST.toUpperCase());
    var $v_0 = window.top.WEB_SERVER_PORT,
        $v_1 = Number.NaN;
    if (!isNullOrEmptyString($v_0)) $v_1 = Number.parseInvariant($v_0.toString());
    if (isNaN($v_1)) $v_1 = -1;
    $p0.set_port($v_1);
    $p0.set_scheme(window.top.SERVER_URL.toUpperCase().split(":")[0])
};
Mscrm.CrmUri.updateCrmUriHostAndScheme = function (uri) {
    if (Mscrm.SessionInfo.$28) {
        var $v_0 = Mscrm.CrmUri.create(window.location.href);
        uri.set_scheme($v_0.get_scheme());
        uri.set_host($v_0.get_host());
        uri.set_port($v_0.get_port());
        Mscrm.SessionInfo.$28 = false
    }
    return uri
};
Mscrm.CrmUri.prototype = {
    $1d_0: null,
    $2Z_0: false,
    $3e_0: false,
    $3d_0: false,
    $4G_0: true,
    $4N_0: null,
    $g_0: null,
    $1g_0: null,
    $n_0: null,
    $o_0: 0,
    $H_0: null,
    $L_0: null,
    $e_0: null,
    $27_0: null,
    $17_0: null,
    $4H_0: null,
    checkParamsNoEqual: false,
    get_useOrganizationName: function () {
        return this.$2Z_0
    },
    set_useOrganizationName: function (value) {
        if (IsNull(value)) return value;
        this.$2Z_0 = value;
        return value
    },
    get_useVersionStamp: function () {
        return this.$3e_0
    },
    set_useVersionStamp: function (value) {
        if (IsNull(value)) return value;
        if (this.$3e_0 !== value) {
            this.$3e_0 = value;
            if (this.$3e_0) this.setQueryParameter("ver", this.get_$7N_0().toString(10));
            else this.$5i_0("ver")
        }
        return value
    },
    get_useCssLcid: function () {
        return this.$3d_0
    },
    set_useCssLcid: function (value) {
        if (this.$3d_0 !== value) {
            this.$3d_0 = value;
            if (this.$3d_0) this.setQueryParameter("lcid", window.USER_LANGUAGE_CODE.toString(10));
            else this.$5i_0("lcid")
        }
        return value
    },
    get_appendSolutionId: function () {
        return this.$4G_0
    },
    set_appendSolutionId: function (value) {
        if (IsNull(value)) return value;
        this.$4G_0 = value;
        return value
    },
    get_path: function () {
        return this.$H_0
    },
    set_path: function (value) {
        this.$H_0 = IsNull(value) ? "" : value;
        return value
    },
    get_isWebResource: function () {
        return Mscrm.Utilities.$3f.test(this.$H_0.toUpperCase()) && this.get_isLocalServer()
    },
    get_pageType: function () {
        var $v_0 = "none";
        if (this.get_path().endsWith("/areas.aspx")) return "entityrelatedlist";
        switch (this.get_path()) {
            case "/sfa/accts/edit.aspx":
            case "/sfa/conts/edit.aspx":
            case "/sfa/leads/edit.aspx":
            case "/sfa/opps/edit.aspx":
            case "/cs/cases/edit.aspx":
            case "/userdefined/edit.aspx":
            case "/ma/camps/edit.aspx":
            case "/sm/sites/edit.aspx":
            case "/biz/teams/edit.aspx":
                $v_0 = "entityrecord";
                break;
            case "/_root/homepage.aspx":
            case "/CS/home_cases.aspx":
            case "/workplace/home_workplace.aspx":
                $v_0 = "entitylist";
                break;
            case "/tools/formEditor/formeditor.aspx":
                $v_0 = "formeditor";
                break;
            case "/tools/dashboardEditor/dashboardeditor.aspx":
                $v_0 = "dashboardeditor";
                break;
            case "/tools/visualizationdesigner/visualizationdesigner.aspx":
                $v_0 = "vizdesigner";
                break;
            case "/advancedfind/advfind.aspx":
                $v_0 = "advancedfind";
                break;
            case "/main.aspx":
                $v_0 = this.get_query()["pagetype"];
                break;
            default:
                $v_0 = "none";
                break
        }
        if (IsNull($v_0) || !$v_0.length) $v_0 = "none";
        return $v_0
    },
    get_fragment: function () {
        return "#" + this.$17_0
    },
    set_fragment: function (value) {
        this.$17_0 = IsNull(value) ? "" : value;
        if (this.$17_0.startsWith("#")) this.$17_0 = this.$17_0.substr(1);
        return value
    },
    get_host: function () {
        return this.$n_0
    },
    set_host: function (value) {
        this.$n_0 = IsNull(value) ? "" : value;
        return value
    },
    get_port: function () {
        return this.$o_0
    },
    set_port: function (value) {
        this.$o_0 = IsNull(value) ? -1 : value;
        return value
    },
    get_scheme: function () {
        return this.$g_0
    },
    set_scheme: function (value) {
        if (IsNull(value) || !value.length) this.$g_0 = "";
        else {
            var $v_0 = value.indexOf(":");
            if ($v_0 === -1) {
                this.$g_0 = value;
                this.$1g_0 = value === "mailto" || value === "news" ? ":" : "://"
            } else {
                this.$g_0 = value.substr(0, $v_0);
                this.$1g_0 = value.substr($v_0)
            }
        }
        return value
    },
    get_query: function () {
        if (!this.$27_0) this.$27_0 = this.$55_0(this.$e_0);
        return this.$27_0
    },
    get_queryString: function () {
        this.$5y_0();
        return this.$e_0
    },
    get_$7N_0: function () {
        if (!IsNull(window.VERSION_STAMP)) return window.VERSION_STAMP;
        else return 0
    },
    get_isLocalServer: function () {
        if (!this.$n_0.length || this.$n_0.toUpperCase() === "LOCALHOST") return true;
        if (this.$n_0.toUpperCase() === window.top.location.hostname.toUpperCase() || this.$6m_0()) {
            var $v_0 = Number.NaN,
                $v_1 = window.top.location.port;
            if (!isNullOrEmptyString($v_1)) $v_0 = Number.parseInvariant($v_1);
            if (isNaN($v_0)) $v_0 = -1;
            return this.$o_0 === $v_0
        }
        return false
    },
    $6m_0: function () {
        var $v_0 = window.WEB_SERVER_HOST;
        if (IsNull($v_0)) {
            $v_0 = window.top.WEB_SERVER_HOST;
            if (IsNull($v_0)) $v_0 = ""
        }
        return this.$n_0.toUpperCase() === $v_0.toUpperCase()
    },
    clone: function () {
        var $v_0 = Mscrm.CrmUri.create(this.toString());
        $v_0.set_appendSolutionId(this.get_appendSolutionId());
        $v_0.set_useOrganizationName(this.get_useOrganizationName());
        $v_0.set_useCssLcid(this.get_useCssLcid());
        $v_0.set_useVersionStamp(this.get_useVersionStamp());
        return $v_0
    },
    toString: function () {
        this.$6C_0();
        return this.$4N_0
    },
    toNormalizedString: function () {
        var $v_0 = true,
            $v_1 = this.get_useOrganizationName(),
            $v_2 = this.get_port(),
            $v_3 = this.get_scheme(),
            $v_4 = this.get_host();
        if (!IsNull(this.get_host()) && this.get_host().length > 0) $v_0 = this.get_host().toUpperCase() === window.WEB_SERVER_HOST.toUpperCase();
        if ($v_0) {
            this.get_port() === -1 && this.set_port(window.WEB_SERVER_PORT);
            (IsNull(this.get_scheme()) || !this.get_scheme().length) && this.set_scheme(window.SERVER_URL.split(":")[0]);
            this.set_host(window.WEB_SERVER_HOST);
            this.set_useOrganizationName(true)
        }
        var $v_5 = this.toString();
        if ($v_0) {
            this.set_port($v_2);
            this.set_scheme($v_3);
            this.set_useOrganizationName($v_1);
            this.set_host($v_4)
        }
        return $v_5
    },
    compare: function (uri, ignoreCase, op) {
        if (op === 2) return uri.compare(this, ignoreCase, 5);
        if (op === 3) return uri.compare(this, ignoreCase, 4);
        var $v_0 = this.toNormalizedString().toUpperCase().split("?")[0],
            $v_1 = uri.toNormalizedString().toUpperCase().split("?")[0];
        if ($v_0 !== $v_1) return false;
        var $v_2 = this.get_queryString().split("=").length - 1,
            $v_3 = uri.get_queryString().split("=").length - 1,
            $v_4 = true;
        switch (op) {
            case 1:
                $v_4 = $v_2 === $v_3;
                break;
            case 4:
                $v_4 = $v_2 < $v_3;
                break;
            case 5:
                $v_4 = $v_2 <= $v_3;
                break;
            default:
                return true
        }
        if (!$v_4) return false;
        var $$dict_8 = this.get_query();
        for (var $$key_9 in $$dict_8) {
            var $v_5 = {
                key: $$key_9,
                value: $$dict_8[$$key_9]
            }, $v_6 = $v_5.value,
                $v_7 = uri.get_query()[$v_5.key];
            if (ignoreCase) {
                if (!IsNull($v_6)) $v_6 = $v_6.toUpperCase();
                if (!IsNull($v_7)) $v_7 = $v_7.toUpperCase()
            }
            if ($v_6 !== $v_7) return false
        }
        return true
    },
    subsetOf: function (uri, ignoreCase) {
        return this.compare(uri, ignoreCase, 5)
    },
    equals: function (uri, ignoreCase) {
        return this.compare(uri, ignoreCase, 1)
    },
    isEmpty: function () {
        return !this.toString().length
    },
    appendToQuery: function (appendQuery) {
        if (appendQuery.startsWith("&")) appendQuery = "?" + appendQuery.substr(1);
        else if (!appendQuery.startsWith("?")) appendQuery = "?" + appendQuery;
        var $v_0 = this.$55_0(appendQuery),
            $$dict_2 = $v_0;
        for (var $$key_3 in $$dict_2) {
            var $v_1 = {
                key: $$key_3,
                value: $$dict_2[$$key_3]
            };
            this.get_query()[$v_1.key] = $v_1.value
        }
    },
    clearQuery: function () {
        this.$e_0 = "";
        this.$27_0 = {}
    },
    parse: function (uri) {
        var $v_0 = -1;
        $v_0 = uri.indexOf("?");
        var $v_1 = uri.indexOf(":"),
            $v_2;
        if ($v_1 > $v_0 && $v_0 !== -1) $v_1 = -1;
        if ($v_1 === -1) {
            this.$g_0 = "";
            this.$1g_0 = "";
            this.$n_0 = "";
            this.$o_0 = -1;
            this.parsePath(uri);
            return
        }
        $v_2 = $v_1 + 1;
        while (uri.charAt($v_2) === "/") $v_2++;
        this.$g_0 = uri.substr(0, $v_1).toLowerCase();
        this.$1g_0 = uri.substr($v_1, $v_2 - $v_1);
        if (!isNullOrEmptyString(this.$g_0)) switch (this.$g_0.toLowerCase()) {
            case "http":
            case "https":
            case "ftp":
            case "ftps":
                if (this.$1g_0 !== "://") {
                    this.$g_0 = "";
                    this.$1g_0 = "";
                    $v_2 = 0;
                    $v_1 = -1
                }
                break
        }
        for (var $v_3 = -1, $v_4 = -1, $v_6 = $v_2; $v_6 < uri.length && $v_3 === -1; $v_6++) switch (uri.charAt($v_6)) {
            case "/":
                $v_3 = $v_6;
                break;
            case ":":
                $v_4 = $v_6;
                break
        }
        if ($v_3 === -1) $v_3 = uri.length;
        if ($v_4 === -1) $v_4 = $v_3;
        this.$n_0 = uri.substr($v_2, $v_4 - $v_2);
        if ($v_3 === $v_4) this.$o_0 = -1;
        else {
            this.$o_0 = Number.parseInvariant(uri.substr($v_4 + 1, $v_3 - $v_4 - 1));
            if (isNaN(this.$o_0)) this.$o_0 = -1
        }
        var $v_5 = $v_3 < uri.length ? uri.substr($v_3) : "";
        this.parsePath($v_5)
    },
    parsePath: function (uriPath) {
        this.$L_0 = uriPath;
        this.$e_0 = "";
        this.$17_0 = "";
        var $v_0 = this.$L_0.indexOf("?"),
            $v_1 = this.$L_0.indexOf("#"),
            $v_2 = -1;
        if ($v_0 !== -1) {
            var $v_3 = $v_1 > $v_0 ? $v_1 : this.$L_0.length;
            this.$e_0 = this.$L_0.substr($v_0, $v_3 - $v_0);
            $v_2 = $v_0
        }
        if ($v_1 !== -1) {
            this.$17_0 = CrmEncodeDecode.CrmUrlDecode(this.$L_0.substr($v_1 + 1));
            if ($v_2 === -1 || $v_1 < $v_2) $v_2 = $v_1;
            if ($v_0 > $v_1) this.$e_0 = ""
        }
        if ($v_2 !== -1) this.$L_0 = this.$L_0.substr(0, $v_2);
        if (!isNullOrEmptyString(this.$4H_0)) {
            var $v_4 = Mscrm.CrmUri.create(this.$4H_0),
                $v_5 = $v_4.get_path(),
                $v_6 = $v_5.split("/");
            $v_6.pop();
            this.$L_0 = $v_6.join("/") + "/" + this.$L_0
        }
    },
    $7C_0: function () {
        if (!this.$1d_0.length) {
            this.$2Z_0 = false;
            return
        }
        var $v_0 = this.$1d_0 + "/",
            $v_1 = this.$H_0.startsWith("/");
        if ($v_1) $v_0 = "/" + $v_0;
        $v_0 = $v_0.toUpperCase();
        if (this.$H_0.toUpperCase().startsWith($v_0) && this.get_isLocalServer()) {
            this.$H_0 = this.$H_0.substr($v_0.length);
            if ($v_1) this.$H_0 = "/" + this.$H_0
        }
        var $v_2 = window.IS_PATHBASEDURLS;
        if (IsNull($v_2)) $v_2 = window.top.IS_PATHBASEDURLS;
        this.$2Z_0 = $v_2 && this.$7J_0()
    },
    $7D_0: function () {
        this.set_useVersionStamp(this.$5p_0())
    },
    $7B_0: function () {
        this.set_useCssLcid(this.$7I_0())
    },
    $7A_0: function () {
        if (this.$6F_0() && !this.$5p_0()) if (this.$4G_0) Mscrm.SolutionDecorater.setSolutionIdInQuerystring(this);
        else if (this.get_query()[Mscrm.SolutionDecorater.solutionId]) delete this.get_query()[Mscrm.SolutionDecorater.solutionId]
    },
    $6C_0: function () {
        this.$7L_0();
        this.$5y_0();
        var $v_0 = new Sys.StringBuilder;
        if (this.$g_0.length > 0) {
            $v_0.append(this.$g_0);
            $v_0.append(this.$1g_0)
        }
        if (this.$n_0.length > 0) {
            $v_0.append(this.$n_0);
            if (this.$o_0 !== -1) {
                $v_0.append(":");
                $v_0.append(this.$o_0.toString(10))
            }
        }
        this.$L_0.length > 0 && !this.$L_0.startsWith("/") && !$v_0.isEmpty() && $v_0.append("/");
        $v_0.append(this.$L_0);
        $v_0.append(this.$e_0);
        if (this.$17_0.length > 0) {
            $v_0.append("#");
            $v_0.append(this.$17_0)
        }
        this.$4N_0 = $v_0.toString()
    },
    $7L_0: function () {
        if (this.$2Z_0 && this.$1d_0 && this.$1d_0.length > 0) {
            var $v_0 = this.$H_0.startsWith("/");
            this.$L_0 = ($v_0 ? "/" + this.$1d_0 : this.$1d_0 + "/") + this.$H_0
        } else this.$L_0 = this.$H_0
    },
    $5y_0: function () {
        var $v_0 = this.get_query(),
            $v_1 = new Sys.StringBuilder,
            $v_2 = [],
            $v_3 = 0,
            $$dict_4 = $v_0;
        for (var $$key_5 in $$dict_4) {
            var $v_5 = {
                key: $$key_5,
                value: $$dict_4[$$key_5]
            };
            $v_2[$v_3++] = $v_5.key
        }
        $v_2.sort();
        for (var $v_4 = true, $v_6 = 0; $v_6 < $v_3; $v_6++) {
            if ($v_4) {
                $v_4 = false;
                $v_1.append("?")
            } else $v_1.append("&");
            $v_1.append(CrmEncodeDecode.CrmUrlEncode($v_2[$v_6]));
            if (!this.checkParamsNoEqual || !IsNull($v_0[$v_2[$v_6]])) {
                $v_1.append("=");
                $v_1.append(CrmEncodeDecode.CrmUrlEncode($v_0[$v_2[$v_6]]))
            }
        }
        this.$e_0 = $v_1.toString()
    },
    $55_0: function ($p0) {
        var $v_0 = {};
        if (!$p0 || !$p0.length) return $v_0;
        var $v_1 = 1,
            $v_2, $v_3;
        while ($v_1 < $p0.length) {
            $v_2 = $p0.indexOf("&", $v_1);
            if ($v_2 === -1) $v_2 = $p0.length;
            $v_3 = $p0.indexOf("=", $v_1);
            if ($v_3 > $v_2) $v_3 = -1;
            if ($v_3 !== -1 && $v_3 < $v_2) {
                var $v_4 = $p0.substr($v_1, $v_3 - $v_1),
                    $v_5 = $p0.substr($v_3 + 1, $v_2 - $v_3 - 1);
                $v_0[CrmEncodeDecode.CrmUrlDecode($v_4)] = CrmEncodeDecode.CrmUrlDecode($v_5)
            } else if (this.checkParamsNoEqual && $v_3 === -1) {
                var $v_6 = $p0.substr($v_1, $v_2 - $v_1);
                $v_0[CrmEncodeDecode.CrmUrlDecode($v_6)] = null
            }
            $v_1 = $v_2 + 1
        }
        return $v_0
    },
    setQueryParameter: function (name, value) {
        if (!value) value = "";
        if (!this.$27_0 && this.$e_0.length <= 1) this.$e_0 = "?" + CrmEncodeDecode.CrmUrlEncode(name) + "=" + CrmEncodeDecode.CrmUrlEncode(value);
        else this.get_query()[name] = value
    },
    $5i_0: function ($p0) {
        if (!this.$27_0 && this.$e_0.length <= 1) return;
        else if (this.get_query()[$p0]) delete this.get_query()[$p0]
    },
    $7J_0: function () {
        var $v_0 = this.$H_0.toUpperCase();
        return ($v_0.endsWith(".ASPX") || $v_0.endsWith(".ASMX") || $v_0.endsWith(".ASHX") || Mscrm.Utilities.$3f.test($v_0)) && $v_0.startsWith("/") && !$v_0.startsWith("/HELP/") && this.get_isLocalServer()
    },
    $6F_0: function () {
        var $v_0 = this.$H_0.toUpperCase();
        return $v_0.endsWith(".ASPX") && $v_0.startsWith("/") && !$v_0.startsWith("/HELP/") && this.get_isLocalServer()
    },
    $5p_0: function () {
        return Mscrm.CrmUri.$65.test(this.$H_0)
    },
    $7I_0: function () {
        return this.$H_0.toUpperCase().endsWith(".CSS.ASPX")
    }
};
Mscrm.CrmWindow = function () {};
Mscrm.CrmWindow.get_entityFormModeMapping = function () {
    return Mscrm.CrmWindow.$2n
};
Mscrm.CrmWindow.get_openedFormsCache = function () {
    return Mscrm.CrmWindow.$1F
};
Mscrm.CrmWindow.get_windowOpenTimes = function () {
    return Mscrm.CrmWindow.$16
};

function safeWindowOpen(url, name, features, replace, disablePopupWarning) {
    var $v_0 = null;
    if (!IsNull(url)) $v_0 = url.toString();
    else $v_0 = "";
    if (IsNull(features)) features = "";
    Mscrm.PerformanceTracing.write("Navigate", $v_0);
    var $v_1 = null;
    try {
        var $v_2 = new Date;
        features = $5v(features);
        $v_1 = window.open($v_0, name, features, replace);
        var $v_3 = new Date;
        $5o($v_1, $v_2.getTime(), $v_3.getTime());
        $v_1._masterWindow = masterWindow()
    } catch ($$e_9) {}
    IsNull($v_1) && !disablePopupWarning && handlePopupBlockerError($v_0);
    return $v_1
}
function $5o($p0, $p1, $p2) {
    var $v_0 = $p0.name;
    Mscrm.CrmWindow.$16[$v_0] = {
        BeforeWindowOpenTimestamp: $p1,
        AfterWindowOpenTimestamp: $p2
    };
    $p0.BeforeWindowOpenTimestamp = $p1;
    $p0.AfterWindowOpenTimestamp = $p2;
    var $v_1 = (new Date).getTime(),
        $$dict_5 = Mscrm.CrmWindow.$16;
    for (var $$key_6 in $$dict_5) {
        var $v_2 = {
            key: $$key_6,
            value: $$dict_5[$$key_6]
        }, $v_3 = Mscrm.CrmWindow.$16[$v_2.key];
        if (!IsNull($v_3) && $v_3["AfterWindowOpenTimestamp"] <= $v_1 - 3e4) delete Mscrm.CrmWindow.$16[$v_2.key]
    }
}
function $6c($p0, $p1, $p2) {
    var $v_0 = $p0.name,
        $v_1 = Mscrm.CrmWindow.$16[$v_0];
    if (!IsNull($v_1)) {
        $p1.val = $v_1["BeforeWindowOpenTimestamp"];
        $p2.val = $v_1["AfterWindowOpenTimestamp"];
        return
    }
    $p1.val = $p0.BeforeWindowOpenTimestamp;
    $p2.val = $p0.AfterWindowOpenTimestamp
}
function getWindowOpenTimeJson(windowName, remove) {
    var $v_0 = Mscrm.CrmWindow.$16[windowName];
    if (remove) delete Mscrm.CrmWindow.$16[windowName];
    if (!IsNull($v_0)) return Sys.Serialization.JavaScriptSerializer.serialize($v_0);
    return null
}
function $5v($p0) {
    var $v_0 = $p0;
    if ($p0.indexOf("status") !== -1) if (Mscrm.Utilities.isChrome()) {
        var $v_1 = ",\\s?status\\s?=\\s?1",
            $v_2 = new RegExp($v_1);
        $v_0 = $p0.replace($v_2, "");
        if ($v_0 === $p0) {
            $v_1 = "status\\s?=\\s?1\\s?,";
            $v_2 = new RegExp($v_1);
            $v_0 = $p0.replace($v_2, "")
        }
        if ($v_0 === $p0) {
            $v_1 = "status\\s?=\\s?1";
            $v_2 = new RegExp($v_1);
            $v_0 = $p0.replace($v_2, "")
        }
    }
    return $v_0
}
function masterWindow() {
    var $v_0 = window.self._masterWindow;
    if (isValidWindowInstance($v_0)) return $v_0;
    if (isValidWindowInstance(window.top) && window.top !== window.self) {
        $v_0 = window.top.masterWindow();
        if (isValidWindowInstance($v_0)) return $v_0
    }
    if ($6g(window.self) && isValidWindowInstance(window.opener)) {
        if (isValidWindowInstance(window.opener.top) && !IsNull(window.opener.top.masterWindow) && window.opener.top !== window.self) {
            $v_0 = window.opener.top.masterWindow();
            if (isValidWindowInstance($v_0)) return $v_0
        }
        if (!IsNull(window.opener.masterWindow)) return window.opener
    }
    return window.self
}
function setFormMode(etc, mode) {
    Mscrm.CrmWindow.$2n[etc] = mode
}
function getFormMode(etc) {
    return Mscrm.CrmWindow.$2n[etc]
}
function isValidWindowInstance($sn_window) {
    try {
        if (IsNull($sn_window)) return false;
        $sn_window.document
    } catch ($$e_1) {
        return false
    }
    return true
}
function $6g($p0) {
    try {
        if (IsNull($p0) || IsNull($p0.opener)) return false
    } catch ($$e_1) {
        return false
    }
    return true
}
function attachWindowOnBeforeUnload(handler, windowInstance) {
    if (isOutlookHostedWindow()) if (window.top.initActionQueue != null && typeof window.top.initActionQueue != "undefined") window.top.initActionQueue.push(function () {
        window.top.Mscrm.CrmWindow.onBeforeUnloadHandler = function (rawEvent) {
            handler(new Sys.UI.DomEvent(rawEvent))
        }
    });
    else window.top.Mscrm.CrmWindow.onBeforeUnloadHandler = function (rawEvent) {
        handler(new Sys.UI.DomEvent(rawEvent))
    };
    else windowInstance = $3N(handler, windowInstance, "beforeunload", false)
}
function detachWindowOnBeforeUnload(handler, windowInstance) {
    if (isOutlookHostedWindow()) window.top.Mscrm.CrmWindow.onBeforeUnloadHandler = null;
    else windowInstance = $3N(handler, windowInstance, "beforeunload", true)
}
function attachWindowOnUnload(handler, windowInstance) {
    if (isOutlookHostedWindow()) if (window.top.initActionQueue != null && typeof window.top.initActionQueue != "undefined") window.top.initActionQueue.push(function () {
        window.top.Mscrm.CrmWindow.onUnloadHandler = function (rawEvent) {
            handler(new Sys.UI.DomEvent(rawEvent))
        }
    });
    else window.top.Mscrm.CrmWindow.onUnloadHandler = function (rawEvent) {
        handler(new Sys.UI.DomEvent(rawEvent))
    };
    else windowInstance = $3N(handler, windowInstance, "unload", false)
}
function detachWindowOnUnload(handler, windowInstance) {
    if (isOutlookHostedWindow()) window.top.Mscrm.CrmWindow.onUnloadHandler = null;
    else windowInstance = $3N(handler, windowInstance, "unload", true)
}
function currentLocationHash() {
    return window.location.hash.substr(1)
}
function $3N($p0, $p1, $p2, $p3) {
    if (!$p1) $p1 = window.self;
    var $v_0 = $p1;
    if ($p3) $removeHandler($v_0, $p2, $p0);
    else $addHandler($v_0, $p2, $p0);
    return $p1
}
function executeOnUnloadHandlers() {
    return $5M(Mscrm.CrmWindow.onUnloadHandler)
}
function executeOnBeforeUnloadHandlers() {
    return $5M(Mscrm.CrmWindow.onBeforeUnloadHandler)
}
function $5M($p0) {
    var $v_0 = "",
        $v_1 = false;
    if ($p0) {
        var $v_2 = window.document.createEventObject();
        try {
            $p0($v_2);
            if (!IsNull($v_2.returnValue)) {
                $v_0 += $v_2.returnValue;
                $v_1 = true
            }
        } catch ($$e_4) {}
    }
    return $v_1 ? $v_0 : null
}
function safeEmailWindowOpen(url, name, features, replace) {
    var $v_0 = null;
    if (IsNull(features)) features = "";
    try {
        features = $5v(features);
        $v_0 = window.open(url.toString(), name, features, replace)
    } catch ($$e_5) {
        handlePopupBlockerError(url.toString())
    }
    return $v_0
}
function safeWindowShowModalDialog(url, winArguments, features, useModalDialog) {
    var $v_0 = url.toString();
    Mscrm.PerformanceTracing.write("Navigate", $v_0);
    if (IsNull(winArguments)) winArguments = {};
    if (IsNull(useModalDialog)) useModalDialog = true;
    if (!Mscrm.Utilities.isModalDialogSupported()) useModalDialog = false;
    try {
        if (Mscrm.Utilities.get_ieBrowserVersion() < 9) winArguments["window"] = window
    } catch ($$e_5) {}
    if (!features) features = "";
    var $v_1 = null;
    if (!useModalDialog) {
        safeWindowShowModelessDialog(url, winArguments, features);
        return $v_1
    }
    try {
        do $v_1 = window.showModalDialog($v_0, winArguments, features);
        while ($v_1 === "___RETRY___");
        $v_1 = $5D($v_1)
    } catch ($$e_7) {
        handlePopupBlockerError($v_0)
    }
    return $v_1
}
function $5D($p0) {
    var $v_0 = $p0;
    if (typeof $p0 === "string") try {
        $v_0 = Sys.Serialization.JavaScriptSerializer.deserialize($p0)
    } catch ($$e_2) {}
    return $v_0
}
function safeWindowShowModelessDialog(url, winArguments, features) {
    var $v_0 = url.toString();
    Mscrm.PerformanceTracing.write("Navigate", $v_0);
    if (IsNull(features)) features = "";
    var $v_1 = null;
    try {
        $v_1 = window.showModelessDialog($v_0, winArguments, features)
    } catch ($$e_5) {
        var $v_2 = new RegExp(";", "g");
        features = features.replace($v_2, ",");
        $v_2 = new RegExp(":", "g");
        features = features.replace($v_2, "=");
        features = features.replace("dialogwidth", "width").replace("dialogWidth", "width").replace("dialogheight", "height").replace("dialogHeight", "height").replace("dialogleft", "left").replace("dialogLeft", "left").replace("dialogtop", "top").replace("dialogTop", "top");
        if (!isNullOrEmptyString(features)) features = "dialog=yes,dependent=yes,location=no,menubar=no,toolbar=no,personalbar=no," + features;
        else features = "dialog=yes,dependent=yes,location=no,menubar=no,toolbar=no,personalbar=no";
        $v_1 = safeWindowOpen(url, buildWinName(), features);
        $v_1.dialogArguments = winArguments
    }
    if (IsNull($v_1)) handlePopupBlockerError($v_0);
    else if (!Mscrm.Utilities.isModalDialogSupported()) $v_1.opener = window.self;
    return $v_1
}
function openErrorDlg(errorCode, message, errorInfo, width, height) {
    if (IsNull(width) || width <= 0) width = parseInt(window.LOCID_ERROR_DIALOG_WIDTH, 10);
    if (IsNull(height) || height <= 0) height = parseInt(window.LOCID_ERROR_DIALOG_HEIGHT, 10);
    var $v_0 = Mscrm.CrmUri.create("/_common/error/dlg_error.aspx");
    $v_0.get_query()["hresult"] = !IsNull(errorCode) ? errorCode : "";
    var $v_1 = {};
    $v_1["errMessage"] = message;
    $v_1["errInfo"] = errorInfo;
    return openStdDlg($v_0, $v_1, width, height, true, false, null)
}
function openStdWinWithUrlPreload(url, name, width, height, customWinFeatures) {
    var $v_0 = masterWindow().getPreloadInfo(url.toString());
    if (IsNull($v_0)) return openStdWin(url, name, width, height, customWinFeatures);
    var $v_1 = openStdWin(Mscrm.CrmUri.create("/_static/loading.htm"), name, width, height, customWinFeatures),
        $v_2, $v_3, $$t_A, $$t_B;
    $6c($v_1, $$t_A = {
        val: $v_2
    }, $$t_B = {
        val: $v_3
    }), $v_2 = $$t_A.val, $v_3 = $$t_B.val;
    masterWindow().setPreloadPageParameters(url, $v_1, $v_2, $v_3);
    var $v_4 = masterWindow().isPreloadComplete(url.toString());
    !IsNull($v_4) && !IsNull($v_0) && finishPreload($v_4, $v_0);
    return $v_1
}
function openStdWin(url, name, width, height, customWinFeatures) {
    var $v_0 = buildWindowFeatures(width, height, customWinFeatures);
    return openStdWinWithFeatures(url, name, $v_0, true)
}
function openStdWinWithFeatures(url, name, features, replace) {
    if (isOutlookHostedWindow()) {
        var $v_0 = getOutlookHostedWindow(),
            $v_1 = null;
        if (!IsNull(url)) $v_1 = $v_0.openWindow(url.toString(), name, features);
        else $v_1 = $v_0.openWindow(null, name, features);
        $v_1.opener = window.self;
        return $v_1
    } else return safeWindowOpen(url, name, features, replace)
}
function buildWindowFeatures(windowWidth, windowHeight, customWinFeatures) {
    windowWidth = Mscrm.Display.$4P(windowWidth);
    windowHeight = Mscrm.Display.$4O(windowHeight);
    var $v_0 = Mscrm.Display.$4Q(windowWidth),
        $v_1 = Mscrm.Display.$4S(windowHeight);
    customWinFeatures = IsNull(customWinFeatures) || !customWinFeatures.length ? "" : "," + customWinFeatures;
    return "width=" + windowWidth + ",height=" + windowHeight + ",status=1,resizable=1,left=" + $v_0 + ",top=" + $v_1 + customWinFeatures
}
function openStdDlgWithCallback(url, winArguments, width, height, functionReference, resizable, modeless, customWinParams) {
    return openStdDlg(url, winArguments, width, height, resizable, modeless, customWinParams, functionReference)
}
function openStdDlg(url, winArguments, width, height, resizable, modeless, customWinParams, functionReference) {
    if (IsNull(customWinParams)) customWinParams = "";
    if (IsNull(winArguments)) winArguments = "";
    var $v_0 = winArguments;
    if (!IsNull(functionReference)) {
        $v_0 = {};
        $v_0.passedArguments = winArguments;
        $v_0.callbackFunction = functionReference
    }
    if (IsNull(resizable)) resizable = true;
    if (IsNull(modeless)) modeless = false;
    if (typeof height !== "number") height = parseInt(height.toString(), 10);
    if (typeof width !== "number") width = parseInt(width.toString(), 10);
    if (resizable) {
        width += parseInt(window.LOCID_DIALOG_OFFSET_WIDTH, 10);
        height += parseInt(window.LOCID_DIALOG_OFFSET_HEIGHT, 10)
    }
    width = Mscrm.Display.$4P(width);
    height = Mscrm.Display.$4O(height);
    var $v_1 = Mscrm.Display.$4Q(width),
        $v_2 = Mscrm.Display.$4S(height);
    if (window.LOCID_UI_DIR === "RTL") $v_1 = window.screen.availWidth - $v_1 - width;
    var $v_3 = "";
    if (modeless || Mscrm.Utilities.isFirefox()) $v_3 = "dialogLeft:" + $v_1 + "px;dialogTop:" + $v_2 + "px;";
    customWinParams = "dialogWidth:" + width + "px;dialogHeight:" + height + "px;" + $v_3 + "help:no;status:yes;scroll:no;center:yes;resizable:" + (resizable ? "yes" : "no") + ";" + customWinParams;
    if (isOutlookHostedWindow()) {
        var $v_4 = getOutlookHostedWindow();
        if (!modeless) return $v_4.showModalDialog(url.toString(), $v_0, customWinParams);
        else {
            var $v_5 = $v_4.showModelessDialog(url.toString(), $v_0, customWinParams);
            $v_5.opener = window.self;
            return $v_5
        }
    } else if (!modeless) return safeWindowShowModalDialog(url, $v_0, customWinParams, IsNull(functionReference));
    else return safeWindowShowModelessDialog(url, $v_0, customWinParams)
}
function getDialogArguments() {
    var $v_0 = window.dialogArguments;
    if (!$v_0 && isOutlookHostedWindow()) {
        $v_0 = getOutlookHostedWindow().getDialogArguments();
        window.dialogArguments = $v_0
    }
    if (!IsNull($v_0) && !IsNull($v_0.callbackFunction)) $v_0 = $v_0.passedArguments;
    return $v_0
}
function getDialogReturnValue() {
    return $5D(window.returnValue)
}
function isOutlookHostedWindow() {
    if (Mscrm.SessionInfo.isOutlookClient()) {
        var $v_0 = getOutlookHostedWindow();
        if (!IsNull($v_0)) return $v_0.HostEnabled
    }
    return false
}
function isRichClient() {
    if (isOutlookHostedWindow()) {
        var $v_0 = getOutlookHostedWindow();
        return $v_0.ParentFrameAvailable
    }
    return false
}
function getOutlookHostedWindow() {
    return window.external
}
function closeWindow(focus) {
    if (isOutlookHostedWindow()) window.setTimeout(closeOutlookWindow, 0);
    else try {
        focus && window.focus();
        !Mscrm.Utilities.isIE() && window.top.open("", "_self", "");
        window.top.close()
    } catch ($v_0) {
        window.close()
    }
}
function closeOutlookWindow() {
    getOutlookHostedWindow().closeWindow()
}
function resizeWindow(width, height) {
    if (isOutlookHostedWindow()) getOutlookHostedWindow().resizeWindow(width, height);
    else {
        var $v_0 = window.dialogWidth;
        if (typeof $v_0 !== "undefined") {
            window.dialogWidth = width + "px";
            window.dialogHeight = height + "px"
        } else window.resizeTo(width, height)
    }
}
function openIsvWin(url, passParams, mode, parameters, dialogArgs) {
    if (passParams) url = addIsvParameters(url);
    if (IsNull(mode)) mode = 0;
    if (IsNull(dialogArgs)) dialogArgs = {};
    if (dialogArgs.self !== window.self) dialogArgs["window"] = window;
    switch (mode) {
        case 1:
            safeWindowShowModalDialog(url, dialogArgs, parameters);
            break;
        case 2:
            safeWindowShowModelessDialog(url, dialogArgs, parameters);
            break;
        default:
            safeWindowOpen(url, buildWinName(null), parameters, true);
            break
    }
}
function addIsvParameters(url) {
    url.get_query()["orgname"] = window.ORG_UNIQUE_NAME;
    url.get_query()["userlcid"] = window.USER_LANGUAGE_CODE;
    url.get_query()["orglcid"] = window.ORG_LANGUAGE_CODE;
    var $v_0 = $get("crmFormSubmit");
    if (typeof $v_0 !== "undefined" && !IsNull($v_0)) {
        url.get_query()["type"] = $v_0.crmFormSubmitObjectType.value;
        url.get_query()["typename"] = $v_0.crmFormSubmitObjectTypeName.value;
        url.get_query()["id"] = $v_0.crmFormSubmitId.value
    }
    return url
}
function addPassiveAuthParameters(url) {
    if (!isNullOrEmptyString(window.ISV_ADDITIONAL_AUTH)) {
        var $v_0 = window.ISV_ADDITIONAL_AUTH.split("=");
        url.get_query()[$v_0[0]] = $v_0[1]
    }
    return url
}
function isOutlookInstance() {
    try {
        var $v_0 = Mscrm.CrmUri.create(window.top.location.href);
        return $v_0.get_scheme().toUpperCase() === "OUTLOOK"
    } catch ($$e_1) {
        return false
    }
}
function setPageTitle(title) {
    if (isNullOrEmptyString(title)) if (!isNullOrEmptyString(window.top.document.title)) title = window.top.document.title;
    else if (!isNullOrEmptyString(document.title)) title = document.title;
    else title = window.LOCID_BRANDNAME;
    try {
        var $v_0 = title;
        if (title !== window.LOCID_BRANDNAME) $v_0 = String.format(window.LOCID_WINDOW_TITLE_FORMAT, title, window.LOCID_BRANDNAME);
        try {
            window.top.document.title = $v_0
        } catch ($$e_2) {
            document.title = $v_0
        }
    } catch ($$e_3) {}
}
function openUrl(url, relative) {
    if (isOutlookInstance() || (IsNull(Mscrm.PageManager) && IsNull(Mscrm.PageManager.get_instance()) || !Mscrm.PageManager.isFlatUIPage())) {
        window.location.href = url;
        return
    }
    if (IsNull(relative)) relative = true;
    if (relative) {
        var $v_2 = Mscrm.CrmUri.create(window.location.href).get_path().split("/");
        $v_2[$v_2.length - 1] = url;
        url = "";
        var $v_3 = 0;
        while ($v_3 < $v_2.length) {
            if (IsNull($v_2[$v_3]) || !$v_2[$v_3].length) {
                $v_3++;
                continue
            }
            url += "/" + $v_2[$v_3];
            $v_3++
        }
    }
    var $v_0 = getStickyViewIdForSubAreaPage(Mscrm.CrmUri.create(url)),
        $v_1 = {};
    $v_1["uri"] = $v_0.toString();
    Mscrm.PageManager.get_instance().raiseEvent(21, $v_1);
    return
}
function openUrlByCrmUrl(url, parameters) {
    if (isOutlookInstance() || (IsNull(Mscrm.PageManager) && IsNull(Mscrm.PageManager.get_instance()) || !Mscrm.PageManager.isFlatUIPage())) {
        window.location.href = url.toString();
        return
    }
    if (IsNull(parameters)) parameters = {};
    parameters["uri"] = url.toString();
    Mscrm.PageManager.get_instance().raiseEvent(21, parameters)
}
function getStickyViewIdForSubAreaPage(url) {
    if (isNullOrEmptyString(url.get_query()["pid"])) return url;
    try {
        var $v_0 = {};
        $v_0["pid"] = url.get_query()["pid"];
        var $v_1 = Mscrm.PageManager.get_instance().raiseEvent(48, $v_0);
        if (!IsNull($v_1)) {
            var $v_2 = $v_1[0];
            if (!IsNull($v_2)) {
                url.get_query()["viewId"] = $v_2.get_query()["viewId"];
                url.get_query()["viewType"] = $v_2.get_query()["viewType"]
            }
        }
    } catch ($$e_4) {}
    return url
}
function getRecordUrl(type, id) {
    var $v_0 = {};
    $v_0["returnUrl"] = true;
    var $v_1 = null;
    if (!IsNull(id) && id.length > 0) $v_1 = "?id=" + CrmEncodeDecode.CrmUrlEncode(id);
    if (openFrmObj($v_1, null, type, null, Mscrm.NavigationMode.DefaultNavigationMode, $v_0)) return $v_0["uri"];
    return Mscrm.CrmUri.create("")
}
function openFrmObj(queryString, name, type, urlPrefix, mode, parameters) {
    var $v_0 = openFrmObject(queryString, name, type, urlPrefix, mode, parameters);
    if ($v_0 || !$v_0) return $v_0;
    return !IsNull($v_0)
}
function openFrmObject(queryString, name, type, urlPrefix, mode, parameters) {
    if (IsNull(mode)) mode = Mscrm.NavigationMode.DefaultNavigationMode;
    var $v_0 = mode === 1;
    if (IsNull(queryString)) queryString = "";
    if (typeof type === "string") type = parseInt(type, 10);
    switch (type) {
        case 9002:
        case 4425:
        case 4405:
        case 4423:
        case 0:
        case 4605:
        case 4602:
        case 4603:
        case 8e3:
        case 1120:
        case 4606:
        case 4607:
        case 4608:
        case 4615:
        case 4616:
        case 4618:
        case 4709:
        case 29:
        case 4410:
        case 1112:
            return null;
        case 9100:
            if (!queryString.length) {
                if (Mscrm.Utilities.isIosDevice()) {
                    alert(window.LOCID_UNSUPPORTED_RIBBONACTION);
                    return true
                }
                type = 9099
            }
            break;
        case 127:
            if (!queryString.length) type = 9202;
            break
    }
    var $v_1 = Mscrm.WindowInformation.getWindowInformation(type),
        $v_2 = $v_1.Url,
        $v_3 = $v_1.Width,
        $v_4 = $v_1.Height,
        $v_5 = null,
        $v_6 = null;
    if (!IsNull($v_2)) {
        if (queryString.length > 0 && queryString.charAt(0) === "?" || queryString.charAt(0) === "&") queryString = queryString.substr(1);
        if (IsNull(urlPrefix)) urlPrefix = "";
        var $v_7 = $v_2.toString();
        $v_2 = Mscrm.CrmUri.create(urlPrefix + $v_7 + ($v_7.indexOf("?") === -1 ? "?" : "&") + queryString);
        var $v_8 = $v_2.get_query()["id"],
            $v_9;
        try {
            $v_9 = window.top
        } catch ($$e_G) {
            $v_9 = window.self
        }
        switch (type) {
            case 126:
                name += "Viewer";
                break;
            case 1080:
                if (!queryString.length) {
                    var $v_J = Mscrm.CrmUri.create("/Tools/ProductCatalog/dlg_create.aspx");
                    $v_J.get_query()["ObjType"] = 1080;
                    var $v_K = [queryString, name, type, parameters, $v_2, $v_3, $v_4, $v_0, $v_8];
                    $v_6 = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.CrmWindowMethods, $v_K);
                    $v_5 = openStdDlgWithCallback($v_J, null, 350, 250, $v_6, true, false, null);
                    if (Mscrm.Utilities.isModalDialogSupported()) return performActionAfterSwitch($v_5, queryString, name, type, parameters, $v_2, $v_3, $v_4, $v_0)
                }
                break;
            case 1056:
                if (!queryString.length) {
                    var $v_L = Mscrm.CrmUri.create("/Tools/ProductCatalog/dlg_create.aspx");
                    $v_L.get_query()["ObjType"] = 1056;
                    var $v_M = [queryString, name, type, parameters, $v_2, $v_3, $v_4, $v_0, $v_8];
                    $v_6 = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.CrmWindowMethods, $v_M);
                    $v_5 = openStdDlgWithCallback($v_L, null, 400, 240, $v_6, true, false, null);
                    if (Mscrm.Utilities.isModalDialogSupported()) return performActionAfterSwitch($v_5, queryString, name, type, parameters, $v_2, $v_3, $v_4, $v_0)
                }
                break;
            case 1082:
                return !IsNull(openStdDlg($v_2, window.self, $v_3, $v_4, true, false, null));
            case 5003:
                OpenServiceAvailabilityDialog($v_2.toString());
                return true;
            case 129:
                return !IsNull(openStdDlg(Mscrm.CrmUri.create("/Tools/SubjectManager/dialogs/edit.aspx?" + queryString + "&readOnly=1"), null, $v_3, $v_4, true, false, null));
            case 5004:
                $v_2.get_query()["calendarId"] = $get("calendarId").value;
                $v_2.get_query()["resourceId"] = $get("oId").value;
                $v_2.get_query()["name"] = "Time off";
                $v_2.get_query()["mode"] = "Edit";
                return !IsNull(openStdDlg($v_2, $v_9.window, $v_3, $v_4, true, false, null));
            case 5006:
            case 5007:
                $v_2.get_query()["calendarId"] = $get("calendarId").value;
                $v_2.get_query()["innerCalendarId"] = $get("oId").value;
                $v_2.get_query()["name"] = "Working Hours";
                $v_2.get_query()["mode"] = "Edit";
                return !IsNull(openStdDlg($v_2, $v_9.window, $v_3, $v_4, true, false, null));
            case 5005:
                $v_2.get_query()["mode"] = "Edit";
                if (!IsNull(openStdDlg($v_2, $v_9.window, $v_3, $v_4, true, false, null))) {
                    Mscrm.Utilities.refreshCurrentGrid(4004);
                    return true
                } else return false;
            case 5008:
                $v_2.get_query()["calendarId"] = $get("calendarId").value;
                $v_2.get_query()["resourceId"] = $get("oId").value;
                $v_2.get_query()["selecteddates"] = XUI.DomUtilities.GetFirstChild(XUI.DomUtilities.GetFirstChild(crmGrid.InnerGrid.SelectedRecords[0][3].cells[crmGrid.InnerGrid.FindColumnIndex("starttime")])).nodeValue;
                $v_2.get_query()["mode"] = $get("mode").value;
                return !IsNull(openStdDlg($v_2, null, $v_3, $v_4, true, false, null));
            case 5009:
            case 5010:
                $v_2.get_query()["calendarId"] = $get("calendarId").value;
                $v_2.get_query()["resourceId"] = $get("oId").value;
                $v_2.get_query()["name"] = "Working Hours";
                $v_2.get_query()["mode"] = $get("mode").value;
                break;
            case 4003:
                return false;
            case 4230:
                return false;
            case 9004:
                if (name && name.length === 32) $v_2.get_query()["QueryId"] = name;
                var $v_A = openStdDlg($v_2, $v_9.window, $v_3, $v_4, true, false, null);
                Mscrm.Utilities.refreshCurrentGrid(4230);
                return !IsNull($v_A);
            case 9100:
                var $v_B = Mscrm.CrmUri.create(window.location.href);
                if (!$v_B.get_path().toUpperCase().endsWith("TOOLS/SOLUTION/AREAS.ASPX")) {
                    name = buildWinName(null);
                    break
                } else {
                    var $v_N = $v_2.get_query()["id"].toString(),
                        $v_O = Mscrm.WindowInformation.getWindowInformation(9099),
                        $v_P = Mscrm.CrmUri.create("/CRMReports/reportproperty.aspx");
                    $v_P.get_query()["disablePersonal"] = true;
                    $v_P.get_query()["id"] = $v_N;
                    return !IsNull(openStdWin($v_P, buildWinName(null), $v_O.Width, $v_O.Height, null))
                }
            case 4703:
                if (queryString.indexOf("id") > -1) break;
                var $v_C = $v_2.toString(),
                    $v_D = $v_C.lastIndexOf("/"),
                    $v_E = "";
                if ($v_D > 0) $v_E = $v_C.substring(0, $v_D + 1);
                var $v_F = Mscrm.CrmUri.create($v_E + "workflowTemplate/workflowTemplatePage.aspx");
                $v_F = Mscrm.CrmUri.updateCrmUriHostAndScheme($v_F);
                var $v_G = openStdDlg($v_F, name, 640, 480, true, false, null);
                if (IsNull($v_G) || !$v_G.Success) return true;
                $v_2 = $v_1.Url;
                $v_2.get_query()["id"] = $v_G.Id;
                Mscrm.Grid.auto(4703, $v_G.Name);
                break;
            case 1010:
                if (!queryString.length) return !IsNull(openStdDlg(Mscrm.CrmUri.create("/cs/contracts/lookup_template.aspx"), window, parseInt(window.LOCID_CONTRACTS_TDIALOG_WIDTH, 10), parseInt(window.LOCID_CONTRACTS_TDIALOG_HEIGHT, 10), true, false, null));
                break;
            case 2010:
                if (!$v_8 || !$v_8.length) {
                    var $v_Q = Mscrm.CrmUri.create("/Tools/EmailTemplateEditor/Dialogs/emailtemplateproperties.aspx");
                    $v_Q.get_query()["isPersonal"] = "0";
                    openStdDlg($v_Q, window, 400, 200, true, false, null);
                    return true
                }
                break;
            case 4200:
            case 9202:
                return !IsNull(openStdDlg($v_2, window, $v_3, $v_4, true, false, null));
            case 1030:
            case 1031:
                var $v_H = Mscrm.CrmUri.create(window.location.href);
                if (!$v_H.get_path().toUpperCase().endsWith("TOOLS/SOLUTION/AREAS.ASPX")) {
                    delete $v_2.get_query().id;
                    $v_2.get_query()["dashboardId"] = $v_8;
                    openUrl($v_2.toString(), false)
                } else {
                    var $v_R = Mscrm.CrmUri.create("/main.aspx?pagetype=dashboardeditor"),
                        $v_S = "&formId=" + $v_8 + "&dashboardType=" + type;
                    $v_R.get_query()["extraqs"] = $v_S;
                    openStdWin($v_R, buildWinName(null), window.screen.availWidth * .9, window.screen.availHeight * .9, null)
                }
                return true;
            case 1111:
                var $v_I = Mscrm.CrmUri.create("/main.aspx?pagetype=vizdesigner");
                $v_I.get_query()["extraqs"] = "id=" + $v_8;
                openStdWin($v_I, buildWinName($v_8), $v_1.Width, $v_1.Height, "resizable=0");
                return true;
            default:
                if (Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode(type)) $v_2.get_query()["etc"] = type;
                break
        }
        if (Mscrm.Utilities.isModalDialogSupported() || !Mscrm.Utilities.isModalDialogSupported() && IsNull($v_6)) return performActionAfterSwitch($v_5, queryString, name, type, parameters, $v_2, $v_3, $v_4, $v_0)
    }
    return false
}
function performActionAfterSwitch(returnValue, queryString, name, type, parameters, url, windowWidth, windowHeight, sameWindow) {
    switch (type) {
        case 1080:
        case 1056:
            if (!queryString.length) if (IsNull(returnValue)) return null;
            else url = Mscrm.CrmUri.create(returnValue);
            break
    }
    if (!IsNull(url)) {
        var $v_0 = false;
        if (!IsNull(parameters) && !IsNull(parameters["returnUrl"]) && parameters["returnUrl"]) {
            parameters["uri"] = url;
            return true
        }
        var $v_1 = false;
        if (!IsNull(parameters) && !IsNull(parameters["sameWindow"])) $v_1 = parameters["sameWindow"];
        else $v_1 = sameWindow;
        if (!isOutlookInstance() && Mscrm.PageManager.isFlatUIPage() && Mscrm.PageManager.isFlatUrl(url.toString()) && $v_1) {
            if (IsNull(parameters)) parameters = {};
            parameters["uri"] = url.toString();
            parameters["name"] = name;
            parameters["windowWidth"] = windowWidth;
            parameters["windowHeight"] = windowHeight;
            parameters["sameWindow"] = true;
            var $v_2 = Mscrm.PageManager.get_instance().$4_1.raiseEvent(21, parameters, null);
            if (!(IsNull($v_2) || !$v_2.length)) return true
        }
        if (!IsNull(url.get_path()) && url.get_path().toLowerCase() === "/userdefined/edit.aspx" && !sameWindow) {
            var $v_3 = url.get_query()["pagemode"],
                $v_4 = url.get_query()["redir"];
            if ((IsNull($v_4) || $v_4 !== "0") && (IsNull($v_3) || $v_3 !== "iframe")) {
                if (window.EDIT_PRELOAD && type !== 1056 && type !== 1080) {
                    url.get_query()["preloadcache"] = (new Date).getTime();
                    url.get_query()["pagemode"] = "iframe";
                    if (Mscrm.Utilities.isJsonResponseSupported(url)) url.get_query()["responseType"] = "Json";
                    if (!IsNull(url.get_query()["rof"]) && url.get_query()["rof"].toLowerCase() === "false") {
                        masterWindow().preloadPage(url, true, true);
                        $v_0 = false
                    } else $v_0 = !masterWindow().preloadPage(url, true, false)
                }
                queryString = url.get_queryString();
                url = Mscrm.CrmUri.create("/main.aspx");
                url.get_query()["etc"] = type.toString();
                url.get_query()["pagetype"] = "entityrecord";
                url.get_query()["extraqs"] = queryString;
                if (!IsNull(parameters) && !IsNull(parameters["rof"])) url.get_query()["rof"] = parameters["rof"];
                if ($v_0) $v_0 = masterWindow().preloadPage(url, false, false)
            }
        } else if (!IsNull(url.get_query()["rof"])) delete url.get_query().rof;
        if (isOutlookHostedWindow()) switch (type) {
            case 9099:
            case 9801:
            case 9802:
            case 9803:
            case 9804:
            case 9805:
            case 9806:
            case 9807:
            case 9808:
            case 9809:
            case 9810:
            case 9811:
                return openStdWin(url, name, windowWidth, windowHeight, null);
            default:
                var $v_5 = getOutlookHostedWindow().openInspector(type, url.toString(), windowHeight, windowWidth);
                if (!IsNull($v_5)) $v_5.opener = window.self;
                return $v_5
        } else if (!sameWindow) {
            if ($v_0) return openStdWinWithUrlPreload(url, name, windowWidth, windowHeight, null);
            return openStdWin(url, name, windowWidth, windowHeight, null)
        } else {
            openInPlace(url, windowWidth, windowHeight);
            return true
        }
    }
    return false
}
function isPreloadComplete(contentUrl) {
    var $v_0 = Mscrm.CrmUri.create(contentUrl),
        $v_1 = contentUrl.indexOf("/userdefined/edit.aspx");
    if ($v_1 > 0) $v_0 = Mscrm.CrmUri.createForOrganization(contentUrl, contentUrl.substr(1, $v_1 - 1));
    else {
        var $v_3 = contentUrl.indexOf("/main.aspx");
        if ($v_3 > 0) $v_0 = Mscrm.CrmUri.createForOrganization(contentUrl, contentUrl.substr(1, $v_1 - 1))
    }
    contentUrl = $v_0.toString();
    var $v_2 = Mscrm.CrmWindow.$1F[contentUrl];
    if ($v_2) {
        if (!$v_2.get_isLoaded()) return null;
        window.self.PreloadStartTime = $v_2.$2P_0;
        window.self.PreloadEndTime = $v_2.$2O_0;
        delete Mscrm.CrmWindow.$1F[contentUrl]
    }
    return contentUrl
}
function preloadPage(path, forEditMode, force) {
    if (!force && $6k(path.get_query()["etc"]) !== forEditMode) return false;
    var $v_0 = path.toString(),
        $v_1 = new Mscrm.PagePreloadInfo;
    Mscrm.CrmWindow.$1F[$v_0] = $v_1;
    try {
        var $v_2 = Mscrm.XmlUtil.createXmlHttp();
        $v_2.onreadystatechange = function () {
            if ($v_2.readyState !== 4) return;
            $v_2.onreadystatechange = null;
            $v_1.set_isLoaded(true);
            if ($v_2.status !== 200);
            if (isValidWindowInstance($v_1.$2S_0)) {
                delete Mscrm.CrmWindow.$1F[$v_0];
                finishPreload($v_0, $v_1)
            }
            $v_2 = null
        };
        $v_2.open("GET", $v_0, true);
        $v_2.send(null)
    } catch ($v_3) {}
    return true
}
function finishPreload(path, pagePreloadInfo) {
    var $v_0 = pagePreloadInfo.$2S_0;
    if (isValidWindowInstance($v_0)) {
        $v_0.location.href = path;
        $5o($v_0, pagePreloadInfo.$2e_0, pagePreloadInfo.$2a_0);
        $v_0.StartRefreshPreloadTimestamp = pagePreloadInfo.$2P_0;
        $v_0.FinishRefreshPreloadTimestamp = pagePreloadInfo.$2O_0;
        $v_0._masterWindow = masterWindow()
    }
}
function setPreloadPageParameters(path, windowInstance, beforeWindowOpenTime, afterWindowOpenTime) {
    var $v_0 = Mscrm.CrmWindow.$1F[path.toString()];
    if (!IsNull($v_0)) {
        $v_0.$2S_0 = windowInstance;
        $v_0.$2e_0 = beforeWindowOpenTime;
        $v_0.$2a_0 = afterWindowOpenTime
    }
}
function getPreloadInfo(path) {
    return Mscrm.CrmWindow.$1F[path]
}
function $6k($p0) {
    var $v_0 = true;
    if (!isNullOrEmptyString($p0)) {
        var $v_1 = getFormMode($p0);
        if (!IsNull($v_1) && $v_1.toString() === "RO") $v_0 = false
    }
    return $v_0
}
function openInPlace(path, x, y) {
    x = Mscrm.Display.$4P(x);
    y = Mscrm.Display.$4O(y);
    var $v_0 = Mscrm.Display.$4Q(x),
        $v_1 = Mscrm.Display.$4S(y);
    window.moveTo($v_0, $v_1);
    resizeWindow(x, y);
    window.location.href = path.toString()
}
function openItem(type, id, mode, extraParams) {
    if (IsNull(extraParams)) extraParams = {};
    extraParams["sameWindow"] = mode === 1;
    return openObj(type, id, null, null, mode, extraParams)
}
function openObjEtn(name, id, parameters, urlPrefix, mode, extraParameters) {
    var $v_0 = Mscrm.EntityPropUtil.EntityTypeName2CodeMap[name];
    if (IsNull($v_0)) {
        alert(formatString(window.LOCID_UNRECOGNIZE_DOTC, name));
        return false
    }
    return openObj($v_0, id, parameters, urlPrefix, mode, extraParameters)
}
function openObj(type, id, parameters, urlPrefix, mode, extraParams) {
    try {
        var $v_0 = !! openObject(type, id, parameters, urlPrefix, mode, extraParams);
        if ($v_0 || !$v_0) return $v_0;
        return !IsNull($v_0)
    } catch ($$e_7) {
        return false
    }
}
function openObject(type, id, parameters, urlPrefix, mode, extraParams) {
    if (typeof type === "string") type = parseInt(type, 10);
    var $v_0 = "";
    if (id) {
        if (type === 1039) {
            var $v_1 = new RemoteCommand("SystemCustomization", "CheckSavedQuery", null);
            $v_1.SetParameter("savedQueryId", id);
            if (!$v_1.Execute(null).Success) return null
        }
        $v_0 += "?id=" + CrmEncodeDecode.CrmUrlEncode(id)
    }
    if (!IsNull(parameters)) {
        $v_0 += !$v_0.length ? "?" : "&";
        if (parameters.length > 0 && (parameters.charAt(0) === "?" || parameters.charAt(0) === "&")) parameters = parameters.substr(1);
        $v_0 += parameters
    }
    return openFrmObject($v_0, buildWinName(id), type, urlPrefix, mode, extraParams)
}
function openObjEx(type, parentType, parentId, parameters, urlPrefix) {
    try {
        var $v_0 = "";
        if (parentId) $v_0 += "?pId=" + CrmEncodeDecode.CrmUrlEncode(parentId) + "&pType=" + CrmEncodeDecode.CrmUrlEncode(parentType.toString());
        if (!IsNull(parameters)) {
            if (parameters.length > 0 && (parameters.charAt(0) === "?" || parameters.charAt(0) === "&")) parameters = parameters.substr(1);
            $v_0 += "&" + parameters
        }
        return openFrmObj($v_0, buildWinName(null), type, urlPrefix, Mscrm.NavigationMode.DefaultNavigationMode, null)
    } catch ($$e_6) {
        return false
    }
}
function closeWindowScript() {
    var $v_0 = Mscrm.PageManager.get_instance();
    if (IsNull($v_0)) $v_0 = window.parent.Sys.Application.findComponent("crmPageManager");
    if (!IsNull($v_0)) {
        var $v_1 = 23;
        if (Mscrm.NavigationMode.DefaultNavigationMode === 1) $v_1 = 18;
        $v_0.raiseEvent($v_1, null);
        return
    }
    closeWindow()
}
function openPopup() {
    var $v_0 = window.createPopup();
    SetDefaultStyles($v_0);
    return $v_0
}
function SetDefaultStyles(popup) {
    if (!IsNull(popup)) {
        var $v_0 = null;
        if (Mscrm.SessionInfo.isHelpContext()) {
            $v_0 = Mscrm.CrmUri.create("/help/common/fonts.css.aspx");
            $v_0.set_useOrganizationName(false)
        } else $v_0 = Mscrm.CrmUri.create("/_common/styles/fonts.css.aspx");
        popup.document.createStyleSheet($v_0.toString())
    }
}
function buildWinName(s) {
    if (s) {
        var $v_0 = new RegExp("[-\\{\\}:]", "g");
        return s.toLowerCase().replace($v_0, "")
    }
    return (new Date).getTime().toString()
}
function $6o() {
    if (Sys.Browser.agent === Sys.Browser.InternetExplorer) if (Sys.Browser.version >= 8) return true;
    else {
        var $v_0 = new RegExp("Trident\\/[0-9]+\\.?[0-9]*");
        if (Sys.Browser.version >= 7 && $v_0.test(window.navigator.userAgent)) return true
    }
    return false
}
function handlePopupBlockerError(url) {
    if (!isNullOrEmptyString(url)) if ($6o() && !Mscrm.CrmUri.isSameDomain(url, window.location.href)) return;
    alert(window.LOCID_POPUP_BLOCKER_ERROR + window.location.hostname)
}
function validateUrlProtocol(url) {
    var $v_0 = Mscrm.CrmUri.create(url);
    if (isNullOrEmptyString($v_0.get_scheme())) return 0;
    switch ($v_0.get_scheme()) {
        case "http":
        case "https":
        case "ftp":
        case "ftps":
        case "onenote":
        case "tel":
            return 1;
        default:
            return 2
    }
}
function setAttributeInWindow(attributeName, value) {
    window[attributeName] = value
}
function setPerfMarkerTimestamp(markerName) {
    setAttributeInWindow(markerName, (new Date).getTime().toString())
}
Mscrm.DateTimeUtility = function () {};
Mscrm.DateTimeUtility.get_$7M = function () {
    return !!window._useTaiwanCalendar
};
Mscrm.DateTimeUtility.getCalendarYear = function (value) {
    var $v_0 = new Date(value.getFullYear(), value.getMonth(), value.getDate()),
        $v_1 = Mscrm.Utilities.trimStart(value.localeFormat("yyyy"), ["0"]),
        $v_2 = Mscrm.DateTimeUtility.$5X(Sys.CultureInfo.CurrentCulture);
    if ($v_2.indexOf("g") === -1) return $v_1;
    $v_0.setDate(1);
    var $v_3 = $v_0.localeFormat("gg");
    return String.format(LOCID_YEAR_DISPLAYFORMAT, $v_3, $v_1)
};
Mscrm.DateTimeUtility.formatDate = function (value, format) {
    var $v_0 = value.localeFormat(isNullOrEmptyString(format) ? "d" : format);
    if (isNullOrEmptyString($v_0)) {
        alert(LOCID_ALERT_ACTUAL_DATE_FAIL);
        return null
    } else if (Mscrm.DateTimeUtility.get_$7M()) {
        var $v_1 = value.localeFormat("yyyy");
        if ($v_0.indexOf($v_1) > -1) {
            var $v_2 = $v_1.length - 2,
                $v_3 = 0;
            while ($v_3 < $v_2 && $v_1.charAt($v_3) === "0") $v_3++;
            if ($v_3 > 0) {
                var $v_4 = $v_1.substr($v_3);
                $v_0 = $v_0.replace($v_1, $v_4)
            }
        }
    }
    return $v_0
};
Mscrm.DateTimeUtility.localDateTimeNow = function () {
    var $v_0 = new Date;
    $v_0.setMinutes($v_0.getMinutes() + $v_0.getTimezoneOffset() + window.ORG_TIMEZONE_OFFSET);
    return $v_0
};
Mscrm.DateTimeUtility.parseDate = function (value, noAlert) {
    if (isNullOrEmptyString(value)) return null;
    var $v_0 = Mscrm.NumberUtility.fullWidthToHalfWidth(value),
        $v_1 = Sys.CultureInfo.CurrentCulture,
        $v_2 = Mscrm.DateTimeUtility.$3Y($v_0, $v_1, "d");
    if (!$v_2) {
        var $v_3 = Mscrm.DateTimeUtility.$5X($v_1);
        if ($v_3.indexOf("g") > -1) {
            var $v_6 = $v_3.replace(new RegExp("\\s*g+\\s*"), "");
            $v_2 = Mscrm.DateTimeUtility.$3Y($v_0, $v_1, $v_6)
        }
        var $v_4 = new RegExp("y{4}");
        if (!$v_2 && $v_4.test($v_3)) {
            var $v_7 = $v_3.replace($v_4, "yy");
            $v_2 = Mscrm.DateTimeUtility.$3Y($v_0, $v_1, $v_7)
        }
        var $v_5 = window._fallbackCultureInfo;
        if (!$v_2 && !IsNull($v_5)) {
            var $v_8 = new RegExp("^[0-9]"),
                $v_9 = new RegExp("[0-9]{4}");
            if ($v_8.test($v_0) && $v_9.test($v_0)) $v_2 = Mscrm.DateTimeUtility.$3Y($v_0, $v_5, "d")
        }
    }
    if (!$v_2) {
        var $v_A = new RemoteCommand("DateTimeService", "GetActualDate");
        $v_A.ErrorHandler = function ($p1_0, $p1_1) {};
        $v_A.SetParameter("date", $v_0);
        var $v_B = $v_A.Execute();
        if ($v_B.Success && !isNullOrEmptyString($v_B.ReturnValue)) $v_2 = new Date($v_B.ReturnValue)
    }
    if (!$v_2 || $v_2 < Mscrm.DateTimeUtility.$4t || Mscrm.DateTimeUtility.$4s < $v_2) {
        !noAlert && alert(String.format(LOCID_ALERT_ENTER_VALID_DATE, window.USER_DATE_FORMATTED_FORMATSTRING));
        return null
    }
    return $v_2
};
Mscrm.DateTimeUtility.today = function () {
    var $v_0 = Mscrm.DateTimeUtility.localDateTimeNow();
    return new Date($v_0.getFullYear(), $v_0.getMonth(), $v_0.getDate())
};
Mscrm.DateTimeUtility.getDateOnly = function (dateTime) {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate())
};
Mscrm.DateTimeUtility.$5X = function ($p0) {
    return $p0.dateTimeFormat["ShortDatePattern"]
};
Mscrm.DateTimeUtility.$3Y = function ($p0, $p1, $p2) {
    if ($p1 === Sys.CultureInfo.CurrentCulture) return Date.parseLocale($p0, $p2);
    else if (Date._parse) return Date._parse($p0, $p1, [null, $p2]);
    return null
};
Mscrm.DateTimeUtility.generateForDurationControl = function () {
    var $v_0 = new Array(0);
    Array.add($v_0, "");
    Array.add($v_0, String.format(window.LOCID_ONE_MINUTE_MASK, Mscrm.NumberUtility.addFormatting(1, 0)));
    Array.add($v_0, String.format(window.LOCID_N_MINUTES_MASK, Mscrm.NumberUtility.addFormatting(15, 0)));
    Array.add($v_0, String.format(window.LOCID_N_MINUTES_MASK, Mscrm.NumberUtility.addFormatting(30, 0)));
    Array.add($v_0, String.format(window.LOCID_N_MINUTES_MASK, Mscrm.NumberUtility.addFormatting(45, 0)));
    Array.add($v_0, String.format(window.LOCID_ONE_HOUR_MASK, Mscrm.NumberUtility.addFormatting(1, 0)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(1.5, 1)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(2, 0)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(2.5, 1)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(3, 0)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(3.5, 1)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(4, 0)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(4.5, 1)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(5, 0)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(5.5, 1)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(6, 0)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(6.5, 1)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(7, 0)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(7.5, 1)));
    Array.add($v_0, String.format(window.LOCID_N_HOURS_MASK, Mscrm.NumberUtility.addFormatting(8, 0)));
    Array.add($v_0, String.format(window.LOCID_ONE_DAY_MASK, Mscrm.NumberUtility.addFormatting(1, 0)));
    Array.add($v_0, String.format(window.LOCID_N_DAYS_MASK, Mscrm.NumberUtility.addFormatting(2, 0)));
    Array.add($v_0, String.format(window.LOCID_N_DAYS_MASK, Mscrm.NumberUtility.addFormatting(3, 0)));
    return $v_0
};

function LocalDateTimeNow() {
    return Mscrm.DateTimeUtility.localDateTimeNow()
}
Mscrm.CrmDebug = function () {};
Mscrm.CrmDebug.assert = function (condition, errorMessage) {};
Mscrm.CrmDebug.fail = function (errorMessage) {};
Mscrm.DeferredActionHandlerFactory = function () {};
Mscrm.DeferredActionHandlerFactory.create = function (id) {
    if (IsNull(id)) return Mscrm.DefaultDeferredActionHandler.get_instance();
    var $v_0 = Mscrm.DefaultDeferredActionHandler.get_instance();
    switch (id) {
        case "RecordUpdated":
            $v_0 = Mscrm.RecordUpdatedHandler.get_instance();
            break
    }
    return $v_0
};
Mscrm.DefaultDeferredActionHandler = function () {};
Mscrm.DefaultDeferredActionHandler.get_instance = function () {
    var $v_0 = null;
    if (IsNull($v_0)) $v_0 = new Mscrm.DefaultDeferredActionHandler;
    return $v_0
};
Mscrm.DefaultDeferredActionHandler.prototype = {
    handleDeferredAction: function (parameters, extraParams) {
        if (IsNull(parameters["eventCode"])) return;
        if (!IsNull(parameters["uri"]) && !IsNull(extraParams["appendqs"])) {
            var $v_1 = Mscrm.CrmUri.create(parameters["uri"]);
            $v_1.appendToQuery(extraParams["appendqs"]);
            parameters["uri"] = $v_1.toString()
        }
        var $v_0 = parameters["eventCode"];
        Mscrm.PageManager.get_instance().raiseEvent($v_0, parameters)
    }
};
Mscrm.RecordUpdatedHandler = function () {};
Mscrm.RecordUpdatedHandler.$5N = function ($p0) {
    var $v_0 = $p0["appendqs"].toString();
    if (!isNullOrEmptyString($v_0)) {
        $v_0 = $v_0.substr(1);
        var $v_1 = $v_0.split("=");
        return $v_1
    }
    return null
};
Mscrm.RecordUpdatedHandler.get_instance = function () {
    var $v_0 = null;
    if (IsNull($v_0)) $v_0 = new Mscrm.RecordUpdatedHandler;
    return $v_0
};
Mscrm.RecordUpdatedHandler.prototype = {
    handleDeferredAction: function (parameters, extraParams) {
        if (Mscrm.NavigationMode.DefaultNavigationMode === 1) {
            var $v_8 = extraParams["isNew"],
                $v_9 = extraParams["newId"];
            if ($v_8 && !IsNull($v_9) && $v_9.length > 0) {
                var $v_A = {};
                $v_A["updateQueryString"] = String.format("id={0}", $v_9);
                Mscrm.PageManager.get_instance().raiseEvent(43, $v_A)
            }
        }
        var $v_0 = parameters["etc"],
            $v_1 = parameters["title"],
            $v_2 = parameters["id"];
        if (parameters["isNew"]) $v_2 = extraParams["newId"];
        Mscrm.Utilities.refreshParentGrid($v_0, $v_1, $v_2);
        var $v_3 = {};
        $v_3["Id"] = $v_2;
        $v_3["otc"] = parameters["etc"];
        $v_3["etn"] = parameters["etn"];
        $v_3["entitydisplayname"] = parameters["entitydisplayname"];
        $v_3["title"] = $v_1;
        Mscrm.PageManager.get_instance().raiseEvent(51, $v_3);
        Mscrm.DefaultDeferredActionHandler.get_instance().handleDeferredAction(parameters, extraParams);
        var $v_4 = parameters["action"];
        switch ($v_4) {
            case "save":
                var $v_5 = parameters["refreshOnSave"];
                if (!IsNull($v_5) && $v_5) {
                    var $v_B = false,
                        $v_C = Mscrm.CrmUri.create(window.top.location.href),
                        $v_D = null;
                    if ($v_C.get_path().endsWith("/main.aspx")) {
                        var $v_E = $v_C.get_query()["extraqs"];
                        $v_D = Mscrm.CrmUri.create("");
                        if (!IsNull($v_E)) {
                            $v_D.appendToQuery($v_E);
                            delete $v_D.get_query().preloadcache
                        }
                        if (IsNull($v_D.get_query()["id"])) $v_B = true
                    }
                    if ($v_B && parameters["isNew"]) {
                        $v_D.get_query()["etc"] = $v_0;
                        $v_D.get_query()["pagemode"] = "iframe";
                        $v_D.get_query()["id"] = extraParams["newId"];
                        $v_C.get_query()["extraqs"] = $v_D.toString();
                        var $v_F = extraParams["rof"];
                        if (!isNullOrEmptyString($v_F)) $v_C.get_query()["rof"] = $v_F;
                        window.top.location.href = $v_C.toString();
                        break
                    } else {
                        var $v_G = Mscrm.CrmUri.create(parameters["uri"]);
                        delete $v_G.get_query().preloadcache;
                        var $v_H = parameters["isNew"];
                        if ($v_H) {
                            var $v_J = extraParams["newId"];
                            $v_G.get_query()["id"] = $v_J
                        }
                        if (!IsNull($v_2) && IsNull($v_G.get_query()["id"])) $v_G.get_query()["id"] = $v_2;
                        var $v_I = {};
                        $v_I["uri"] = $v_G.toString();
                        if (Mscrm.PageManager.$2w) Mscrm.PageManager.get_instance().raiseEvent(22, $v_I);
                        else {
                            var $$t_R = this;
                            window.setTimeout(function () {
                                Mscrm.PageManager.get_instance().raiseEvent(22, $v_I)
                            }, 0)
                        }
                    }
                }
                break;
            case "saveandclose":
                closeWindow();
                break;
            case "delete":
                Mscrm.Utilities.closeCurrentWindow();
                break;
            case "saveandnew":
                parameters["sameWindow"] = true;
                var $v_6 = null,
                    $v_7 = Mscrm.CrmUri.create("");
                if (!IsNull(parameters["_CreateFromType"]) && !IsNull(parameters["_CreateFromId"])) {
                    $v_7.get_query()["_CreateFromType"] = parameters["_CreateFromType"].toString();
                    $v_7.get_query()["_CreateFromId"] = parameters["_CreateFromId"].toString()
                }
                if (!IsNull(parameters["pId"]) && !IsNull(parameters["pType"])) {
                    if (!IsNull(parameters["pName"])) $v_7.get_query()["pName"] = parameters["pName"].toString();
                    $v_7.get_query()["pId"] = parameters["pId"].toString();
                    $v_7.get_query()["pType"] = parameters["pType"].toString()
                }
                if (!IsNull(extraParams["partyid"]) && !IsNull(extraParams["partyname"]) && !IsNull(extraParams["partytype"])) {
                    $v_7.get_query()["partyid"] = extraParams["partyid"].toString();
                    $v_7.get_query()["partyname"] = extraParams["partyname"].toString();
                    $v_7.get_query()["partytype"] = extraParams["partytype"].toString()
                }
                switch ($v_0) {
                    case 1071:
                    case 1011:
                    case 1013:
                    case 1089:
                    case 1091:
                    case 1083:
                    case 1085:
                    case 1055:
                        var $$dict_M = extraParams;
                        for (var $$key_N in $$dict_M) {
                            var $v_K = {
                                key: $$key_N,
                                value: $$dict_M[$$key_N]
                            };
                            if ($v_K.key !== "etc" && $v_K.key !== "pagemode") if ($v_K.key === "appendqs") {
                                var $v_L = Mscrm.RecordUpdatedHandler.$5N(extraParams);
                                if ($v_L) $v_7.get_query()[$v_L[0]] = $v_L[1]
                            } else $v_7.get_query()[$v_K.key] = extraParams[$v_K.key]
                        }
                        break;
                    case 3234:
                        if (!IsNull(extraParams["connectToMe"])) $v_7.get_query()["connectToMe"] = extraParams["connectToMe"].toString();
                        else if (!IsNull(extraParams["appendqs"])) {
                            var $v_M = Mscrm.RecordUpdatedHandler.$5N(extraParams);
                            if ( !! (!IsNull($v_M) & $v_M[0] === "connectToMe")) $v_7.get_query()["connectToMe"] = $v_M[1]
                        }
                        break
                }
                $v_6 = $v_7.get_queryString();
                openObj($v_0, null, $v_6, null, 1, parameters);
                $v_0 === 1010 && IsNull(parameters["_CreateFromType"]) && closeWindow();
                break
        }
    }
};
Mscrm.Display = function () {};
Mscrm.Display.get_windowSizeAdjusted = function () {
    return Mscrm.Display.$3g
};
Mscrm.Display.set_windowSizeAdjusted = function (value) {
    Mscrm.Display.$3g = value;
    return value
};
Mscrm.Display.$4P = function ($p0) {
    var $v_0 = $p0;
    if (!$p0) $p0 = window.screen.availWidth >= 1e3 ? 820 : 750;
    $p0 = $p0 >= window.screen.availWidth ? window.screen.availWidth : $p0;
    Mscrm.Display.$3g = $p0 !== $v_0;
    return $p0
};
Mscrm.Display.$4O = function ($p0) {
    if (!$p0) return window.screen.availHeight >= 600 ? 560 : 510;
    else return $p0 >= window.screen.availHeight ? window.screen.availHeight : $p0
};
Mscrm.Display.$4Q = function ($p0) {
    var $v_0 = 0;
    if (window.screen.availWidth - $p0 > 0) $v_0 = (window.screen.availWidth - $p0) / 2;
    return $v_0
};
Mscrm.Display.$4S = function ($p0) {
    $p0 += 40;
    var $v_0 = 0;
    if (window.screen.availHeight - $p0 > 0) $v_0 = (window.screen.availHeight - $p0) / 2;
    return $v_0
};
Mscrm.ErrorInformation = function ($p0) {
    this.$2F_0 = "";
    this.$41_0 = "Not available";
    this.$3k_0 = "Not available";
    this.$46_0 = "";
    this.$49_0 = "";
    this.$4A_0 = "";
    this.$3m_0 = "";
    this.$3l_0 = "";
    this.$3D_0 = "";
    this.$45_0 = "";
    !IsNull($p0) && this.$6v_0($p0)
};
Mscrm.ErrorInformation.createFromDoc = function (oXml) {
    return new Mscrm.ErrorInformation(oXml)
};
Mscrm.ErrorInformation.createErrorInfo = function (code, msg, serializedException) {
    var $v_0 = new Mscrm.ErrorInformation(null);
    $v_0.$2C_0 = code;
    $v_0.$2F_0 = msg;
    $v_0.$3D_0 = serializedException;
    return $v_0
};
Mscrm.ErrorInformation.createExtendedErrorInfo = function (code, msg, serializedException, otherParameters) {
    var $v_0 = Mscrm.ErrorInformation.createErrorInfo(code, msg, serializedException);
    if (otherParameters && otherParameters.length > 0) {
        $v_0.$i_0 = {};
        for (var $v_1 = 0; $v_1 < otherParameters.length; $v_1++) $v_0.$i_0[$v_1.toString()] = otherParameters[$v_1]
    }
    return $v_0
};
Mscrm.ErrorInformation.prototype = {
    $2C_0: null,
    $i_0: null,
    $6v_0: function ($p0) {
        var $v_0 = XUI.Xml.SelectSingleNode($p0, "error", null);
        if (!IsNull($v_0)) {
            this.$2C_0 = Mscrm.XmlUtil.getNodeText($v_0, "code", null);
            this.$2F_0 = CrmEncodeDecode.CrmHtmlEncode(Mscrm.XmlUtil.getNodeText($v_0, "description", ""));
            this.$41_0 = Mscrm.XmlUtil.getNodeText($v_0, "line", "Not available");
            this.$3k_0 = Mscrm.XmlUtil.getNodeText($v_0, "details", "Not available");
            this.$46_0 = Mscrm.XmlUtil.getNodeText($v_0, "requesturl", "");
            this.$49_0 = Mscrm.XmlUtil.getNodeText($v_0, "source", "");
            this.$4A_0 = Mscrm.XmlUtil.getNodeText($v_0, "stacktrace", "");
            this.$3m_0 = Mscrm.XmlUtil.getNodeText($v_0, "displaytitle", "");
            this.$3l_0 = Mscrm.XmlUtil.getNodeText($v_0, "displaytext", "");
            this.$3D_0 = Mscrm.XmlUtil.getNodeText($v_0, "exception", "");
            this.$45_0 = Mscrm.XmlUtil.getNodeText($v_0, "pathAndQuery", "");
            this.$i_0 = this.$6R_0($v_0, "parameters")
        }
    },
    $6R_0: function ($p0, $p1) {
        var $v_0 = XUI.Xml.SelectSingleNode($p0, $p1, null);
        if (!IsNull($v_0)) {
            var $v_1 = {}, $v_2 = 0,
                $$t_7 = this,
                $v_3 = function ($p1_0) {
                    $v_1[$v_2.toString()] = XUI.Xml.GetText($p1_0);
                    $v_2++;
                    return false
                };
            XUI.Xml.DomUtils.ForEachChild($v_0, $v_3);
            return $v_1
        }
        return null
    },
    get_description: function () {
        return this.$2F_0
    },
    get_line: function () {
        return this.$41_0
    },
    get_details: function () {
        return this.$3k_0
    },
    get_code: function () {
        return this.$2C_0
    },
    get_requesturl: function () {
        return this.$46_0
    },
    get_source: function () {
        return this.$49_0
    },
    get_stacktrace: function () {
        return this.$4A_0
    },
    get_displaytitle: function () {
        return this.$3m_0
    },
    get_displaytext: function () {
        return this.$3l_0
    },
    get_pathAndQuery: function () {
        return this.$45_0
    },
    get_serializedException: function () {
        return this.$3D_0
    },
    get_parameters: function () {
        return this.$i_0
    },
    formatMessage: function (message) {
        if (this.$i_0 && message) {
            var $v_0 = [],
                $$dict_2 = this.$i_0;
            for (var $$key_3 in $$dict_2) {
                var $v_1 = {
                    key: $$key_3,
                    value: $$dict_2[$$key_3]
                };
                if (!IsNull(this.$i_0[$v_1.key])) $v_0[Number.parseInvariant($v_1.key)] = $v_1.value;
                else break
            }
            if ($v_0.length === 2) message = String.format(message, $v_0[0], $v_0[1]);
            else if ($v_0.length === 3) message = String.format(message, $v_0[0], $v_0[1], $v_0[2]);
            else if ($v_0.length === 4) message = String.format(message, $v_0[0], $v_0[1], $v_0[2], $v_0[3]);
            else if ($v_0.length === 5) message = String.format(message, $v_0[0], $v_0[1], $v_0[2], $v_0[3], $v_0[4]);
            else message = String.format(message, $v_0)
        }
        return message
    }
};
Mscrm.EventManager = function () {
    this.$1m_1 = {};
    Mscrm.EventManager.initializeBase(this)
};
Mscrm.EventManager.prototype = {
    $3p_1: 0,
    isEventing: function () {
        if (IsNull(this.$R_1)) return !!this.$3p_1;
        else return this.$R_1.isEventing()
    },
    subscribeEvent: function (eventCode, controlId) {
        var $v_0 = "SE" + eventCode.toString();
        if (IsNull(this.$1m_1[$v_0])) this.$1m_1[$v_0] = [];
        var $v_1 = this.$1m_1[$v_0];
        $v_1[$v_1.length] = controlId
    },
    $1X_1: false,
    get_isTransient: function () {
        return this.$1X_1
    },
    set_isTransient: function (value) {
        this.$1X_1 = value;
        return value
    },
    $1c_1: null,
    get_transientId: function () {
        return this.$1c_1
    },
    set_transientId: function (value) {
        this.$1c_1 = value;
        return value
    },
    $R_1: null,
    get_parentEventManager: function () {
        return this.$R_1
    },
    set_parentEventManager: function (value) {
        this.$R_1 = value;
        return value
    },
    get_parentEventManagerId: function () {
        if (!IsNull(this.$R_1)) return this.$R_1.get_id();
        else return null
    },
    set_parentEventManagerId: function (value) {
        this.$R_1 = $find(value);
        return value
    },
    $2A_1: null,
    get_childEventManagerIds: function () {
        return this.$2A_1
    },
    set_childEventManagerIds: function (value) {
        this.$2A_1 = value;
        return value
    },
    get_eventSubscribers: function () {
        return null
    },
    set_eventSubscribers: function (value) {
        for (var $v_0 = value, $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
            var $v_2 = $v_0[$v_1].split("|"),
                $v_3 = parseInt($v_2[0], 10),
                $v_4 = $v_2[1].split(","),
                $v_5 = "SE" + $v_3.toString();
            this.$1m_1[$v_5] = $v_4
        }
        return value
    },
    $4V_1: function ($p0, $p1, $p2, $p3, $p4) {
        var $v_0 = [],
            $v_1 = "SE" + $p0.toString(),
            $v_2 = this.$1m_1[$v_1];
        if (!IsNull($v_2)) for (var $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
            var $v_4 = $v_2[$v_3].trim();
            if ($p3 && ($p2 && $v_4 === $p2.get_id())) continue;
            var $v_5 = $find($v_4);
            if ($v_5 || !Mscrm.PageManager.$1Y) try {
                var $v_6 = $v_5.handleEvent($p0, $p1, $p2);
                $v_0[$v_0.length] = $v_6
            } catch ($v_7) {
                catchError($v_7.message, window.location.href, 0, true, $p4, $v_7.number)
            }
        }
        return $v_0
    },
    $4U_1: function ($p0, $p1, $p2, $p3, $p4) {
        var $v_0 = [];
        if (!IsNull(this.$2A_1)) for (var $v_1 = 0; $v_1 < this.$2A_1.length; $v_1++) {
            var $v_2 = this.$2A_1[$v_1].trim();
            if ($p4 && $v_2 === $p3) continue;
            var $v_3 = $find($v_2);
            if ($v_3 || !Mscrm.PageManager.$1Y) {
                var $v_4 = $v_3.propogateEvent($p0, $p1, $p2, this.get_id());
                $v_0 = $v_0.concat($v_4)
            }
        }
        if (!IsNull(this.$19_1)) {
            var $$dict_A = this.$19_1;
            for (var $$key_B in $$dict_A) {
                var $v_5 = {
                    key: $$key_B,
                    value: $$dict_A[$$key_B]
                }, $v_6 = $v_5.key;
                if ($p4 && $v_6 === $p3) continue;
                var $v_7 = $v_5.value;
                try {
                    var $v_8 = $v_7.propogateEvent($p0, $p1, $p2, this.get_id());
                    $v_0 = $v_0.concat($v_8)
                } catch ($$e_G) {}
            }
        }
        return $v_0
    },
    raiseEvent: function (eventCode, parameters, sourceComponent) {
        var $v_0 = false;
        try {
            if (window.location.href.toUpperCase().indexOf("OUTLOOK://") >= 0) $v_0 = true
        } catch ($$e_4) {
            return []
        }
        if (IsNull(this.$R_1)) this.$3p_1++;
        var $v_1 = [],
            $v_2;
        try {
            switch (eventCode) {
                case 0:
                    if (!IsNull(this.$19_1)) {
                        var $v_4 = this.get_id() + " has tcemid = ",
                            $$dict_8 = this.$19_1;
                        for (var $$key_9 in $$dict_8) {
                            var $v_5 = {
                                key: $$key_9,
                                value: $$dict_8[$$key_9]
                            };
                            $v_4 += $v_5.key + ","
                        }
                        alert($v_4)
                    }
                    break
            }
            var $v_3 = arguments.caller;
            $v_2 = this.$4V_1(eventCode, parameters, sourceComponent, true, $v_3);
            $v_1 = $v_1.concat($v_2);
            $v_2 = this.$4U_1(eventCode, parameters, sourceComponent, this.get_id(), false);
            $v_1 = $v_1.concat($v_2);
            if (!$v_0 && !IsNull(this.$R_1)) {
                $v_2 = this.$R_1.bubbleEvent(eventCode, parameters, sourceComponent, this.$1X_1 ? this.$1c_1 : this.get_id(), $v_3);
                $v_1 = $v_1.concat($v_2)
            }
        } catch ($v_6) {
            catchError($v_6.message, window.location.href, 0, true, null, $v_6.number)
        } finally {
            if (IsNull(this.$R_1)) this.$3p_1--
        }
        return $v_1
    },
    propogateEvent: function (eventCode, parameters, sourceComponent, sourceEventManagerId) {
        var $v_0 = [],
            $v_1;
        $v_1 = this.$4V_1(eventCode, parameters, sourceComponent, false, arguments.caller);
        $v_0 = $v_0.concat($v_1);
        $v_1 = this.$4U_1(eventCode, parameters, sourceComponent, sourceEventManagerId, false);
        $v_0 = $v_0.concat($v_1);
        return $v_0
    },
    bubbleEvent: function (eventCode, parameters, sourceComponent, sourceEventManagerId, caller) {
        var $v_0 = [],
            $v_1;
        $v_1 = this.$4V_1(eventCode, parameters, sourceComponent, true, caller);
        $v_0 = $v_0.concat($v_1);
        $v_1 = this.$4U_1(eventCode, parameters, sourceComponent, sourceEventManagerId, true);
        $v_0 = $v_0.concat($v_1);
        if (!IsNull(this.$R_1)) {
            $v_1 = this.$R_1.bubbleEvent(eventCode, parameters, sourceComponent, this.$1X_1 ? this.$1c_1 : this.get_id(), caller);
            $v_0 = $v_0.concat($v_1)
        }
        return $v_0
    },
    $5u_1: 0,
    $19_1: null,
    registerTransientChildEventManager: function (childEventManager) {
        if (IsNull(this.$19_1)) this.$19_1 = {};
        var $v_0 = this.get_id() + "$tcem" + this.$5u_1.toString();
        this.$5u_1++;
        this.$19_1[$v_0] = childEventManager;
        return $v_0
    },
    unregisterTransientChildEventManager: function (uniqueRegisteredId) {
        if (IsNull(this.$19_1)) return;
        delete this.$19_1[uniqueRegisteredId]
    }
};
Mscrm.Form = function () {};
Mscrm.Form.resetFormToVisibleArea = function () {
    var $v_0 = $get("formBodyContainer");
    if ($v_0 && $v_0.scrollTop > 0) $v_0.scrollTop = 0
};
Mscrm.Form.setFieldRequiredOrRecommended = function (field, toType, toAlt) {
    if (IsNull(field) || IsNull(field.className)) return;
    if (IsNull(toAlt)) toAlt = "";
    var $v_0, $v_1, $v_2, $v_3 = null,
        $v_4 = false;
    switch (toType) {
        case 2:
            $v_0 = "ms-crm-Field-Normal";
            $v_1 = "ms-crm-Field-Recommended";
            $v_2 = "ms-crm-Field-Required";
            $v_3 = Mscrm.CrmUri.create("/_imgs/frm_required.gif");
            break;
        case 1:
            $v_0 = "ms-crm-Field-Required";
            $v_1 = "ms-crm-Field-Normal";
            $v_2 = "ms-crm-Field-Recommended";
            $v_3 = Mscrm.CrmUri.create("/_imgs/frm_recommended.gif");
            break;
        case 0:
        default:
            $v_0 = "ms-crm-Field-Required";
            $v_1 = "ms-crm-Field-Recommended";
            $v_2 = "ms-crm-Field-Normal";
            $v_4 = true;
            break
    }
    var $v_5 = field.className.replace($v_0, "");
    $v_5 = $v_5.replace($v_1, "");
    if ($v_5.indexOf($v_2) < 0) $v_5 += " " + $v_2;
    field.className = $v_5;
    var $v_6 = field.getElementsByTagName("IMG"),
        $v_7 = 0;
    if (!IsNull($v_6)) $v_7 = $v_6.length;
    if ($v_4) {
        if ($v_7 > 0) $v_6[$v_7 - 1].style.display = "none"
    } else if ($v_7 <= 0) {
        var $v_8 = field,
            $v_9 = XUI.Html.DomUtils.GetFirstChild(field);
        if (!IsNull($v_9)) $v_8 = $v_9;
        $v_8.innerHTML += '<img alt="' + CrmEncodeDecode.CrmHtmlAttributeEncode(toAlt) + '" src="' + CrmEncodeDecode.CrmHtmlAttributeEncode($v_3.toString()) + '"/>'
    } else {
        var $v_A = $v_6[$v_7 - 1];
        $v_A.src = $v_3.toString();
        $v_A.alt = toAlt;
        $v_A.style.display = "inline"
    }
};

function SetFieldRequiredOrRecommended(field, toType, toAlt) {
    Mscrm.Form.setFieldRequiredOrRecommended(field, toType, toAlt)
}
Mscrm.FormControlInputBehavior = function (element) {
    Mscrm.FormControlInputBehavior.initializeBase(this, [element])
};
Mscrm.FormControlInputBehavior.GetBehavior = function (id) {
    if (isNullOrEmptyString(id)) return null;
    return Mscrm.FormControlInputBehavior.GetElementBehavior($get(id))
};
Mscrm.FormControlInputBehavior.GetElementBehavior = function (element) {
    if (IsNull(element)) return null;
    Mscrm.Utilities.tryInitOnDemandControl(element.id);
    var $v_0 = Sys.UI.Behavior.getBehaviorsByType(element, Mscrm.ICrmUIFormDataComponent);
    if (!$v_0.length) return null;
    return $v_0[0]
};
Mscrm.FormControlInputBehavior.isSlugSupportEnabled = function () {
    var $v_0 = window._MscrmIsSlugSupportEnabled;
    return IsNull($v_0) ? false : $v_0
};
Mscrm.FormControlInputBehavior.createSlugSupportIfNeeded = function (behaviorOwner) {
    Mscrm.FormControlInputBehavior.isSlugSupportEnabled() && Sys.Application.add_init(function ($p1_0, $p1_1) {
        $create(Mscrm.SlugSupport, null, null, null, behaviorOwner)
    })
};
Mscrm.FormControlInputBehavior.prototype = {
    initialize: function () {
        Mscrm.CrmUIBehavior.prototype.initialize.call(this);
        this.get_isDataSlugSupported() && Mscrm.FormControlInputBehavior.createSlugSupportIfNeeded(this.get_element())
    },
    get_isDataSlugSupported: function () {
        return false
    },
    get_dataValue: function () {
        return this.get_elementValue()
    },
    set_dataValue: function (value) {
        this.set_elementValue(value.toString());
        return value
    },
    add_dataValueChanged: function (value) {
        this.get_events().addHandler("OnDataValueChange", value)
    },
    remove_dataValueChanged: function (value) {
        this.get_events().removeHandler("OnDataValueChange", value)
    },
    get_dataXml: function () {
        return String.format("<{0}>{1}</{0}>", this.get_element().id, CrmEncodeDecode.CrmXmlEncode(this.get_elementValue()))
    },
    get_requiredLevel: function () {
        var $v_0 = this.get_element().getAttribute("req");
        if (IsNull($v_0)) return 0;
        else try {
            return parseInt($v_0, 10)
        } catch ($$e_1) {
            return 0
        }
    },
    set_requiredLevel: function (value) {
        return value
    },
    get_disabled: function () {
        return this.get_element().disabled
    },
    set_disabled: function (value) {
        this.get_element().disabled = value;
        return value
    },
    get_forceSubmit: function () {
        var $v_0 = this.get_element().getAttribute("ForceSubmit");
        return Mscrm.Utilities.parseBoolean($v_0)
    },
    set_forceSubmit: function (value) {
        this.get_element().setAttribute("ForceSubmit", value);
        return value
    },
    get_doNotSubmit: function () {
        var $v_0 = this.get_element().getAttribute("DoNotSubmit");
        return Mscrm.Utilities.parseBoolean($v_0)
    },
    set_doNotSubmit: function (value) {
        this.get_element().setAttribute("DoNotSubmit", value);
        return value
    },
    setFocus: function () {
        this.get_element().focus()
    },
    fireOnChange: function () {},
    get_elementValue: function () {
        return this.get_element().value
    },
    set_elementValue: function (value) {
        this.get_element().value = value.toString();
        return value
    },
    handleDataValueChangedEvent: function (args) {
        var $v_0 = this.get_events().getHandler("OnDataValueChange");
        if (!IsNull($v_0)) {
            $v_0(this, args);
            return true
        }
        return false
    },
    setDisplay: function (visibility) {
        var $v_0 = visibility ? "inline" : "none";
        if (!IsNull(this.get_element())) this.get_element().style.display = $v_0
    }
};
Mscrm.ButtonUtils = function () {};
Mscrm.ButtonUtils.hoverOn = function (e) {
    if (!IsNull(e) && !e.disabled) e.className = "ms-crm-Button ms-crm-Button-Hover"
};
Mscrm.ButtonUtils.hoverOff = function (e) {
    if (!IsNull(e) && !e.disabled) e.className = "ms-crm-Button"
};
Mscrm.FormEditor = function () {};
Mscrm.FormEditor.OpenEditor = function (typeCode, formId, entityId) {
    var $v_0 = "",
        $v_1 = new RemoteCommand("FormEditorWebService", "GetFormAndEntityType", null);
    $v_1.SetParameter("formId", formId);
    $v_1.SetParameter("entityId", entityId);
    var $v_2 = $v_1.Execute(null);
    if ($v_2.Success) {
        $v_0 = $v_2.ReturnValue.toString();
        var $v_3 = $v_0.split(":");
        if ($v_3.length === 2) {
            var $v_4 = parseInt($v_3[0], 10),
                $v_5 = $v_3[1];
            switch ($v_4) {
                case 2:
                    Mscrm.FormEditor.OpenFormEditor(typeCode, "main", formId, -1);
                    break;
                case 5:
                    Mscrm.FormEditor.OpenMobileFormEditor($v_5, formId);
                    break
            }
        }
    }
};
Mscrm.FormEditor.OpenFormEditor = function (typeCode, formType, formId, actionType) {
    var $v_0 = Mscrm.CrmUri.create("/main.aspx?pagetype=formeditor");
    $v_0.get_query()["etc"] = typeCode;
    if (IsNull(actionType)) actionType = -1;
    if (!isNullOrEmptyString(formId)) {
        formId = formId.replace("{", "");
        formId = formId.replace("}", "");
        $v_0.get_query()["extraqs"] = "formtype=" + CrmEncodeDecode.CrmNameValueEncode(formType) + "&formId=" + CrmEncodeDecode.CrmNameValueEncode(formId) + "&action=" + CrmEncodeDecode.CrmNameValueEncode(actionType.toString())
    } else $v_0.get_query()["extraqs"] = "formtype=" + CrmEncodeDecode.CrmNameValueEncode(formType) + "&action=" + CrmEncodeDecode.CrmNameValueEncode(actionType.toString());
    var $v_1 = String.format("{0}Editor", formType);
    openStdWin($v_0, $v_1, 1024, 768, null)
};
Mscrm.FormEditor.OpenMobileFormEditor = function (logicalName, formId) {
    var $v_0 = Mscrm.CrmUri.create("/m/console/entityconfig.aspx");
    $v_0.get_query()["etn"] = logicalName;
    if (!isNullOrEmptyString(formId)) {
        formId = formId.replace("{", "");
        formId = formId.replace("}", "");
        $v_0.get_query()["formId"] = formId
    }
    var $v_1 = String.format("{0}Editor", "mobile");
    openStdWin($v_0, $v_1, 1024, 768, null)
};
Mscrm.FormEditor.PublishEntity = function (selEntityTypeCode, primEntityTypeCode) {
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/systemcustomization/scripts/syscustutil.js"), true);
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/systemcustomization/entities/scripts/util.js"), true);
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/systemcustomization/scripts/syscustvalidation.js"), true);
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/formeditor/scripts/util.js"), true);
    var $v_0 = selEntityTypeCode;
    if (!$v_0) $v_0 = primEntityTypeCode;
    var $v_1 = Mscrm.FormEditor.GetPublishXml($v_0);
    publishEntities($v_1, true, null, null)
};
Mscrm.FormEditor.PublishAll = function () {
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/systemcustomization/scripts/syscustutil.js"), true);
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/systemcustomization/entities/scripts/util.js"), true);
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/systemcustomization/scripts/syscustvalidation.js"), true);
    Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/tools/formeditor/scripts/util.js"), true);
    publishEntitiesAll(null, null)
};
Mscrm.FormEditor.GetPublishXml = function (entityCode) {
    var $v_0 = createXmlDoc("publish"),
        $v_1 = addXmlNode($v_0, "entities"),
        $v_2 = Mscrm.FormEditor.getEntityId(entityCode);
    addTextXmlNode($v_1, "entity", $v_2);
    return convertXmlDocToString($v_0)
};
Mscrm.FormEditor.getEntityId = function (entityCode) {
    var $v_0 = "";
    try {
        var $v_1 = new RemoteCommand("FormEditorWebService", "GetEntityId", null);
        $v_1.SetParameter("entityCode", entityCode);
        var $v_2 = $v_1.Execute(null);
        if ($v_2.Success) $v_0 = $v_2.ReturnValue.toString()
    } catch ($$e_4) {
        $v_0 = ""
    }
    return $v_0
};
Mscrm.Rte = function () {};
Mscrm.Rte.AddImage = function (entityTypeCode) {
    switch (entityTypeCode) {
        case 9333:
            var $v_0 = Mscrm.CrmUri.create("/_grid/cmds/dlg_AddItem.aspx?type=image"),
                $v_1 = openStdDlg($v_0, null, 700, 250);
            SetItem($v_1);
            break
    }
};
Mscrm.Rte.AddHyperlink = function (entityTypeCode) {
    switch (entityTypeCode) {
        case 9333:
            var $v_0 = Mscrm.CrmUri.create("/_grid/cmds/dlg_AddItem.aspx?type=hyperlink"),
                $v_1 = openStdDlg($v_0, null, 700, 200);
            SetItem($v_1);
            break
    }
};
Mscrm.WebResourceUtils = function () {};
Mscrm.WebResourceUtils.ShowWebResourceDependencies = function (oid, objectTypecode) {
    var $v_0 = Mscrm.CrmUri.create("/tools/dependency/dependencyviewdialog.aspx");
    $v_0.get_query()["objectid"] = oid;
    $v_0.get_query()["objecttype"] = objectTypecode;
    $v_0.get_query()["operationtype"] = "showdependency";
    openStdWin($v_0, "ShowDependency", 800, 600, null)
};
Mscrm.ItemObject = function () {};
Mscrm.ItemObject.prototype = {
    type: "",
    name: "",
    serverUrl: "",
    altText: ""
};
Mscrm.GlobalEvents = function () {};
Mscrm.GlobalEvents.$$cctor = function () {
    $addHandler(document, "keypress", Mscrm.GlobalEvents.$3T);
    $addHandler(document, "keydown", Mscrm.GlobalEvents.$3T);
    $addHandler(document, "selectstart", Mscrm.GlobalEvents.$5K);
    $addHandler(document, "dragstart", Mscrm.GlobalEvents.$5J);
    $addHandler(document, "beforeunload", Mscrm.GlobalEvents.$5L);
    $addHandler(document, "contextmenu", Mscrm.GlobalEvents.$5I)
};
Mscrm.GlobalEvents.$3T = function ($p0) {
    var $v_0 = String.fromCharCode(Mscrm.GlobalEvents.$76($p0.keyCode)).toUpperCase();
    if ($p0.ctrlKey && !$p0.altKey) {
        switch ($v_0) {
            case "P":
                $p0.rawEvent.keyCode = 0;
                $p0.rawEvent.returnValue = false;
                $p0.stopPropagation();
                break
        }
        if ($v_0 === window.LOCID_JUMP_TO_RIBBON) setFocusOnRibbon($p0.target);
        else if ($v_0 === window.LOCID_JUMP_TO_RIBBON_CONTROL) setFocusOnLastRibbonControl($p0.target);
        else if ($p0.shiftKey && $v_0 === "7") Mscrm.Utilities.raiseKeyPressEvent(58, $p0.target);
        else if ($p0.shiftKey && $v_0 === "#") Mscrm.Utilities.raiseKeyPressEvent(59, $p0.target);
        else if ($p0.shiftKey && $v_0 === "5") Mscrm.Utilities.raiseKeyPressEvent(67, $p0.target);
        else $p0.shiftKey && $v_0 === "1" && Mscrm.Utilities.raiseKeyPressEvent(73, $p0.target)
    }
};
Mscrm.GlobalEvents.$76 = function ($p0) {
    if (!Mscrm.GlobalEvents.$N) {
        Mscrm.GlobalEvents.$N = {};
        Mscrm.GlobalEvents.$N[219] = 91;
        Mscrm.GlobalEvents.$N[221] = 93;
        Mscrm.GlobalEvents.$N[51] = 35;
        Mscrm.GlobalEvents.$N[186] = 59;
        Mscrm.GlobalEvents.$N[187] = 61;
        Mscrm.GlobalEvents.$N[188] = 44;
        Mscrm.GlobalEvents.$N[189] = 45;
        Mscrm.GlobalEvents.$N[190] = 46;
        Mscrm.GlobalEvents.$N[191] = 47;
        Mscrm.GlobalEvents.$N[222] = 39
    }
    if (Mscrm.GlobalEvents.$N[$p0]) return Mscrm.GlobalEvents.$N[$p0];
    return $p0
};
Mscrm.GlobalEvents.$5K = function ($p0) {
    var $v_0 = $p0.target;
    if (!$v_0.tagName || typeof $v_0.className != "string") return;
    var $v_1 = $v_0.tagName.toUpperCase();
    !Mscrm.GlobalEvents.$6t() && $v_1 !== "INPUT" && $v_1 !== "TEXTAREA" && !($v_1 === "DIV" && Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Lookup")) && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Field-Data-Print") && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Field-Label-Print") && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Tab-Print") && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Form-Section-Print") && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Form-Print") && $p0.preventDefault()
};
Mscrm.GlobalEvents.$6t = function () {
    if (typeof _UI_TEXT_SELECTABLE != "undefined" && _UI_TEXT_SELECTABLE === "1") return true;
    return false
};
Mscrm.GlobalEvents.get_globalAllowDrag = function () {
    return Mscrm.GlobalEvents.$3W
};
Mscrm.GlobalEvents.set_globalAllowDrag = function (value) {
    Mscrm.GlobalEvents.$3W = value;
    return value
};
Mscrm.GlobalEvents.$5J = function ($p0) {
    !Mscrm.GlobalEvents.$3W && $p0.preventDefault()
};
Mscrm.GlobalEvents.$5L = function ($p0) {
    $removeHandler(document, "keypress", Mscrm.GlobalEvents.$3T);
    $removeHandler(document, "keydown", Mscrm.GlobalEvents.$3T);
    $removeHandler(document, "selectstart", Mscrm.GlobalEvents.$5K);
    $removeHandler(document, "dragstart", Mscrm.GlobalEvents.$5J);
    $removeHandler(document, "beforeunload", Mscrm.GlobalEvents.$5L);
    $removeHandler(document, "contextmenu", Mscrm.GlobalEvents.$5I)
};
Mscrm.GlobalEvents.$5I = function ($p0) {
    if (!$p0.target.tagName) return;
    var $v_0 = $p0.target.tagName.toUpperCase(),
        $v_1 = null;
    if (!IsNull(document.selection)) $v_1 = document.selection.createRange().text;
    else $v_1 = window.getSelection().toString();
    !(!$p0.target.disabled && (!IsNull($v_1) && $v_1.length > 0 || $v_0 === "TEXTAREA" || $v_0 === "INPUT" && $p0.target.getAttribute("type").toString().toUpperCase() === "TEXT")) && $p0.preventDefault()
};
Mscrm.Grid = function () {};
Mscrm.Grid.auto = function (objectTypeCode, findValue, entityId) {
    if (String === Object.getType(objectTypeCode)) objectTypeCode = Number.parseInvariant(objectTypeCode);
    var $v_0, $v_1;
    switch (objectTypeCode) {
        case 5:
            $v_0 = false;
            $v_1 = false;
            break;
        default:
            $v_0 = Mscrm.EntityPropUtil.isActivityTypeCode(objectTypeCode);
            $v_1 = Mscrm.EntityPropUtil.isQueueItemTypeCode(objectTypeCode);
            break
    }
    if (objectTypeCode === 9004) objectTypeCode = 4230;
    var $v_2 = window.document,
        $v_3 = window;
    try {
        var $v_5 = window.frameElement;
        if ($v_5) if ($v_5.getAttribute("isArea") === "1") {
            $v_2 = window.parent.document;
            $v_3 = window.parent
        } else if ($v_5.className === "ms-crm-Home-Cal-Workplace") {
            $v_2.location.reload();
            return
        } else if ($v_5.className === "ms-crm-Home-Cal-Month") {
            $v_2 = window.parent.document;
            $v_2.location.reload();
            return
        }
    } catch ($$e_8) {}
    for (var $v_4 = $v_3.frames, $v_6 = 0; $v_6 < $v_4.length; $v_6++) try {
        var $v_7 = $v_4[$v_6].frameElement;
        if ($v_7.className === "ms-crm-Home-Cal-Month")!IsNull($v_4[$v_6].Refresh) && $v_4[$v_6].Refresh(objectTypeCode);
        else if ($v_7.className === "noteData") {
            var $v_8 = Mscrm.FormControlInputBehavior.GetBehavior($v_7.id);
            $v_8.isParentTabVisible() && (objectTypeCode === 5 || !$v_8.get_isDirty()) && $v_8.refresh()
        } else if ($v_7.className === "ms-crm-Home-Cal-Workplace") {
            $v_4[$v_6].location.reload();
            return
        } else if ($v_7.className === "ms-crm-Dialog-Lookup-Results") {
            if (objectTypeCode.toString() === $get("selObjects").value.toString()) {
                window.search(findValue);
                return
            }
        } else if ($v_7.getAttribute("isArea")) {
            var $v_9 = $v_4[$v_6].frames;
            if ($v_9 && $v_9.length > 0) {
                $v_7 = $v_9[0].frameElement;
                $v_7.className === "ms-crm-Home-Cal-Month" && !IsNull($v_9[0].Refresh) && $v_9[0].Refresh(objectTypeCode)
            }
            var $v_A = $v_4[$v_6].document;
            Mscrm.Grid.findAndRefreshGrids($v_A, objectTypeCode, $v_0, $v_1, findValue, entityId)
        }
    } catch ($$e_F) {}
    Mscrm.Grid.findAndRefreshGrids($v_2, objectTypeCode, $v_0, $v_1, findValue, entityId)
};
Mscrm.Grid.findAndRefreshGrids = function ($sn_document, objectTypeCode, isActivity, isQueueable, findValue, entityId) {
    if (IsNull($sn_document)) return;
    !Mscrm.Grid.$5w($sn_document.getElementsByTagName("DIV"), objectTypeCode, isActivity, isQueueable, findValue, entityId) && Mscrm.Grid.$5w($sn_document.getElementsByTagName("TABLE"), objectTypeCode, isActivity, isQueueable, findValue, entityId)
};
Mscrm.Grid.$5w = function ($p0, $p1, $p2, $p3, $p4, $p5) {
    if (String === Object.getType($p1)) $p1 = Number.parseInvariant($p1);
    if (IsNull($p0)) return false;
    for (var $v_0 = false, $v_1 = 0; $v_1 < $p0.length; $v_1++) {
        var $v_2 = $p0[$v_1];
        if ($v_2.className.indexOf("ms-crm-ListControl") > -1 && !isNullOrEmptyString($v_2.id)) {
            $v_0 = true;
            var $v_3 = $v_2.control;
            if (!IsNull($v_3) && $v_3.GetParameter("autorefresh") === "1" && (Number.parseInvariant($v_3.GetParameter("otc")) === $p1 || $p2 && (Number.parseInvariant($v_3.GetParameter("otc")) === 4200 || $p1 === 4200) || $p3 && (Number.parseInvariant($v_3.GetParameter("otc")) === 2029 || $p1 === 2029) || Number.parseInvariant($v_3.GetParameter("otc")) === 7103 || $v_3.GetParameter("otc") === "0")) {
                var $v_4 = $get("crmGrid_findCriteria"),
                    $v_5 = Mscrm.CrmUri.create(window.location.toString().toUpperCase());
                if (!IsNull($p4) && $v_4 && $v_5.get_path().indexOf("LOOKUPINFO.ASPX") > 0) {
                    $v_4.value = $p4;
                    window.search($v_5.get_query()["LOOKUPSTYLE"] === "MULTI", $p5);
                    return $v_0
                }
                $v_3.ClearPagingCookie();
                $v_3.refresh()
            }
        }
    }
    Mscrm.PageManager.isOutlookProxyPage() && getOutlookHostedWindow().refreshGrid();
    return $v_0
};
Mscrm.Grid.getGridRecords = function (grid, columns, layoutXml) {
    var $v_0 = new Array(1),
        $v_1 = null;
    if (!IsNull(columns)) {
        $v_1 = new Array(0);
        var $v_7 = XUI.Xml.LoadXml(layoutXml).documentElement;
        if (XUI.Xml.DomUtils.HasChildElements($v_7)) {
            var $v_8 = 0,
                $v_9 = function ($p1_0) {
                    var $v_A = $p1_0,
                        $v_B = XUI.Xml.GetText($v_A),
                        $v_C = 0;
                    while ($v_C < columns.length) {
                        if (columns[$v_C] === $v_B) {
                            var $v_D = $v_1.length;
                            if (IsNull($v_1[$v_D])) $v_1[$v_D] = {};
                            $v_1[$v_D]["fieldname"] = XUI.Xml.GetText($v_A.attributes.getNamedItem("fieldname"));
                            $v_1[$v_D]["index"] = $v_8
                        }++$v_C
                    }++$v_8;
                    return false
                };
            XUI.Xml.DomUtils.ForEachChild($v_7, $v_9)
        }
    }
    var $v_2 = 0,
        $v_3 = grid.getElementsByTagName("COL");
    if (!IsNull($v_3)) {
        var $v_E;
        if ($v_3[1].className === "ms-crm-List-RowIconColumn") $v_E = 3;
        else $v_E = 2;
        if ($v_3.length > $v_E) for (var $v_F = 0; $v_F < $v_E; $v_F++) if ($v_3[$v_F].className === "ms-crm-List-PreviewGlyphColumn" || $v_3[$v_F].className === "ms-crm-List-CheckBoxColumn" || $v_3[$v_F].className === "ms-crm-List-RowIconColumn" || $v_3[$v_F].className === "ms-crm-List-NonDataColumn") $v_2++
    }
    var $v_4 = grid.getElementsByTagName("TBODY"),
        $v_5 = null;
    if (!IsNull($v_4)) $v_5 = $v_4[0].getElementsByTagName("TR");
    else $v_5 = grid.getElementsByTagName("TR");
    for (var $v_6 = $v_5.length, $v_G = 0; $v_G < $v_6; $v_G++) {
        var $v_H = $v_5[$v_G],
            $v_I = $v_H.attributes.getNamedItem("oid").value;
        if (!isNullOrEmptyString($v_I)) {
            var $v_J = {};
            $v_J["oid"] = $v_I;
            var $v_K = $v_H.attributes.getNamedItem("otype").value;
            if (!isNullOrEmptyString($v_K)) $v_J["otype"] = $v_K;
            else $v_J["otype"] = grid.attributes.getNamedItem("oname").value;
            var $v_L = 0;
            while ($v_L < $v_1.length) {
                var $v_M = $v_1[$v_L]["index"],
                    $v_N = XUI.Html.GetText($v_H.children[$v_M + $v_2]),
                    $v_O = $v_1[$v_L]["fieldname"];
                $v_J[$v_O] = $v_N;
                ++$v_L
            }
            $v_0[$v_G] = $v_J
        }
    }
    return $v_0
};
Mscrm.Grid.addExistingFromSubGridStandard = function (gridTypeCode, gridControl, parentObjectTypeCode, parentId) {
    if (!IsNull(gridControl)) {
        var $v_0 = gridControl.GetParameter("relName"),
            $v_1;
        switch ($v_0) {
            case "goal_parent_goal":
                $v_1 = locAssocObjGoal;
                break;
            default:
                $v_1 = window.parent.locAssocOneToMany;
                if (IsNull($v_1)) $v_1 = locAssocOneToMany;
                break
        }
        $v_1(gridTypeCode, $v_0, parentId, parentObjectTypeCode)
    }
};
Mscrm.Grid.addExistingFromSubGridAssociated = function (gridTypeCode, gridControl, parentObjectTypeCode, parentId) {
    if (!IsNull(gridControl)) {
        var $v_0 = gridControl.GetParameter("relName"),
            $v_1 = gridControl.GetParameter("roleOrd"),
            $v_2 = false;
        switch (gridTypeCode) {
            case 4300:
                switch ($v_0) {
                    case "campaignactivitylist_association":
                        window.parent.locAssocObjCampaignActivity(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "campaignlist_association":
                        locAssocObjCampaign(gridTypeCode, "subType=targetLists", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "listlead_association":
                        locAssocObjLead(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "listcontact_association":
                        window.parent.locAssocObjContact(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "listaccount_association":
                        window.parent.locAssocObjAccount(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    default:
                        $v_2 = true;
                        break
                }
                break;
            case 4400:
                switch ($v_0) {
                    case "campaignlist_association":
                        locAssocObjList(gridTypeCode, "subType=targetLists", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "campaigncampaign_association":
                        locAssocObjCampaign(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    default:
                        $v_2 = true;
                        break
                }
                break;
            case 1024:
                switch ($v_0) {
                    case "productsubstitute_association":
                        locAssocObjProduct(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "productassociation_association":
                        locAssocObjProduct(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "campaignproduct_association":
                        locAssocObjCampaign(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    case "competitorproduct_association":
                        locAssocObjCompetitor(gridTypeCode, "", $v_0, $v_1, parentId, parentObjectTypeCode);
                        break;
                    default:
                        $v_2 = true;
                        break
                }
                break;
            default:
                $v_2 = true;
                break
        }
        if ($v_2) {
            var $v_3 = window.parent.locAssocObj;
            if (IsNull($v_3)) $v_3 = locAssocObj;
            $v_3(gridTypeCode, "", $v_0, $v_1, "", parentId, parentObjectTypeCode)
        }
    }
};
Mscrm.Grid.deleteRecords = function (gridControl, records, entityTypeCode) {
    var $v_0 = false,
        $v_1 = false,
        $v_2 = null,
        $v_3 = null,
        $v_4 = Mscrm.Grid.generateStandardActionUri("delete", entityTypeCode, records.length);
    if (Mscrm.EntityPropUtil.isActivityTypeCode(entityTypeCode)) {
        $v_0 = true;
        $v_1 = true
    }
    switch (entityTypeCode) {
        case 4406:
            switch (gridControl.GetParameter("viewid")) {
                case "{FD4DF17C-386E-4E29-9D31-529A568A3BBC}":
                case "{BA825777-1A7B-4837-8778-B86904D1115C}":
                case "{83DC2389-0A4C-4249-A5D3-BA1AB401FF1C}":
                case "{2C9E8543-3E3B-4F8D-AEDF-B8A43446619D}":
                    $v_4.get_query()["iObjSubType"] = "7";
                    break
            }
            break;
        case 1:
            $v_4 = Mscrm.Grid.generateStandardActionUri("delete_account", entityTypeCode, records.length);
            $v_0 = true;
            break;
        case 9802:
        case 9805:
            for (var $v_5 = new Array(records.length), $v_8 = 0; $v_8 < records.length; $v_8++) $v_5[$v_8] = records[$v_8].Id.split(":")[2];
            $v_2 = $v_5;
            break;
        case 2:
            $v_4 = Mscrm.Grid.generateStandardActionUri("delete_contact", entityTypeCode, records.length);
            $v_0 = true;
            break;
        case 1083:
        case 1085:
        case 1089:
        case 1091:
            for (var $v_9 = new Array(records.length), $v_C = 0; $v_C < records.length; $v_C++) $v_9[$v_C] = records[$v_C].Id;
            var $v_A = [];
            $v_A[0] = window.parent;
            $v_A[1] = $v_9;
            $v_A[2] = window.self;
            $v_2 = $v_A;
            $v_4 = Mscrm.Grid.generateStandardActionUri("deleteqoiproduct", entityTypeCode, records.length);
            $v_4.get_query()["sParentId"] = gridControl.GetParameter("oId");
            var $v_B = [false, gridControl];
            $v_3 = Mscrm.Utilities.createCallbackFunctionObject("refreshGridAfterMerge", Mscrm.GridRibbonActions, $v_B);
            break;
        case 2020:
            $v_4 = Mscrm.Grid.generateStandardActionUri("delete_queue", entityTypeCode, records.length);
            $v_0 = true;
            break;
        case 2029:
            $v_0 = true;
            $v_1 = true;
            break;
        case 4411:
            for (var $v_D = new Sys.StringBuilder, $v_E = 0; $v_E < records.length; $v_E++) {
                $v_E > 0 && $v_D.append(";");
                $v_D.append(records[$v_E].Id)
            }
            $v_4 = Mscrm.Grid.generateStandardActionUri("delete_importmap", entityTypeCode, records.length);
            $v_4.get_query()["sIds"] = $v_D.toString();
            $v_0 = true;
            break;
        case 4251:
            var $v_F = 1;
            switch (gridControl.GetParameter("viewid")) {
                case "{4805B7C1-218B-4FAD-95A5-D5708E3CCFC0}":
                case "{E9D20D36-01F3-4830-BB29-3D8A6E9DB557}":
                    $v_F = 2;
                    break
            }
            var $v_G = [false, gridControl];
            $v_3 = Mscrm.Utilities.createCallbackFunctionObject("refreshGridAfterMerge", Mscrm.GridRibbonActions, $v_G);
            $v_4 = Mscrm.CrmUri.create("/activities/act_dlgs/dlg_seriesaction.aspx");
            $v_4.get_query()["actionType"] = "6";
            $v_4.get_query()["iTotal"] = records.length;
            $v_4.get_query()["insDel"] = $v_F === 1;
            break;
        case 4201:
        case 4200:
            if (records.length === 1) {
                var $v_H = gridControl.getCellValue("instancetypecode", records[0].Id);
                if ($v_H !== "0" && $v_H !== "1") {
                    $v_4 = Mscrm.CrmUri.create("/activities/act_dlgs/dlg_seriesaction.aspx");
                    $v_4.get_query()["actionType"] = "5";
                    $v_4.get_query()["eId"] = records[0].Id;
                    var $v_I = [false, gridControl];
                    $v_3 = Mscrm.Utilities.createCallbackFunctionObject("refreshGridAfterMerge", Mscrm.GridRibbonActions, $v_I);
                    return Mscrm.Grid.executeStandardAction($v_4, gridControl, records, 350, 250, $v_3)
                }
            }
            break;
        case 4e3:
            if (records.length > 0) {
                var $v_J = window.LOCID_DELETE_CONFIRM_ONE + "\n\n" + window.LOCID_DELETE_CONFIRM_TWO;
                if (confirm($v_J)) return Mscrm.Grid.executeStandardAction($v_4, gridControl, records, 570, 250, null, false, $v_2);
                else return null
            }
            break;
        case 1010:
            if (records.length === 1) $v_4.get_query()["sIds"] = records[0].Id;
            break;
        case 7100:
            if (records.length !== 1) {
                alert(window.LOCID_ONLYSELECTONE_WARN);
                return null
            }
            $v_4.get_query()["sIds"] = records[0].Id;
            break;
        case 1030:
            $v_4.get_query()["sIds"] = records[0].Id;
            break;
        case 4567:
            if (records.length === 1) {
                var $v_K = gridControl.getCellValue("number", records[0].Id);
                if ($v_K === "1") {
                    if (gridControl.get_pageRecordCount() === 1) {
                        alert(window.LOCID_ERROR_IN_USE_PARTITION);
                        return null
                    }
                    var $v_L = gridControl.getCellValue("enddatetimeraw", records[0].Id);
                    $v_4.get_query()["iAuditEndDate"] = $v_L
                } else {
                    alert(window.LOCID_ERROR_NOT_OLDEST);
                    return null
                }
            }
            break;
        case 9502:
            $v_4 = Mscrm.Grid.generateStandardActionUri("delete_sharepointsite", entityTypeCode, records.length);
            break;
        case 4703:
            for (var $v_6 = new Sys.StringBuilder, $v_M = 0; $v_M < records.length; $v_M++) {
                $v_M > 0 && $v_6.append(";");
                $v_6.append(records[$v_M].Id)
            }
            $v_4.get_query()["sIds"] = $v_6.toString();
            break;
        case 4230:
            var $v_7 = Mscrm.Grid.executeStandardAction($v_4, gridControl, records, 570, 205, null, false, $v_2);
            isOutlookHostedWindow() && getOutlookHostedWindow().refreshViewList();
            return $v_7
    }
    if ($v_1) $v_4.get_query()["sSubTypes"] = Mscrm.Grid.getSubTypesString(records);
    return Mscrm.Grid.executeStandardAction($v_4, gridControl, records, 570, $v_0 ? 250 : 205, $v_3, false, $v_2)
};
Mscrm.Grid.getSubTypesString = function (records) {
    for (var $v_0 = new Sys.StringBuilder, $v_1 = 0; $v_1 < records.length; $v_1++) {
        $v_1 > 0 && $v_0.append(",");
        $v_0.append(records[$v_1].TypeCode.toString())
    }
    return $v_0.toString()
};
Mscrm.Grid.generateStandardActionUri = function (actionName, entityTypeCode, selectedRecordCount) {
    var $v_0 = Mscrm.CrmUri.create(String.format("/_grid/cmds/dlg_{0}.aspx", CrmEncodeDecode.CrmUrlEncode(actionName)));
    $v_0.get_query()["iObjType"] = entityTypeCode;
    $v_0.get_query()["iTotal"] = selectedRecordCount;
    return $v_0
};
Mscrm.Grid.executeStandardAction = function (actionUri, gridControl, selectedRecords, dialogWidth, dialogHeight, callback, forceRefresh, dialogArguments) {
    if (IsNull(forceRefresh)) forceRefresh = false;
    if (IsNull(gridControl)) {
        alert(window.LOCID_ACTION_NOITEMSELECTED);
        return null
    }
    var $v_0 = Mscrm.Grid.executeStandardActionInternal(actionUri, selectedRecords, dialogWidth, dialogHeight, dialogArguments, callback);
    Mscrm.Utilities.isModalDialogSupported() && ($v_0 || forceRefresh) && gridControl.refresh();
    return $v_0
};
Mscrm.Grid.executeStandardActionInternal = function (actionUri, selectedRecords, dialogWidth, dialogHeight, dialogArguments, callback) {
    if (IsNull(selectedRecords) || !selectedRecords.length) {
        alert(window.LOCID_ACTION_NOITEMSELECTED);
        return null
    }
    if (IsNull(dialogWidth)) dialogWidth = 400;
    if (IsNull(dialogHeight)) dialogHeight = 200;
    if (IsNull(dialogArguments)) {
        for (var $v_0 = new Array(selectedRecords.length), $v_1 = 0; $v_1 < selectedRecords.length; $v_1++) $v_0[$v_1] = selectedRecords[$v_1].Id;
        dialogArguments = $v_0
    }
    if (!IsNull(callback)) return openStdDlgWithCallback(actionUri, dialogArguments, dialogWidth, dialogHeight, callback);
    else return openStdDlg(actionUri, dialogArguments, dialogWidth, dialogHeight)
};

function auto(objectTypeCode, findValue, entityId) {
    Mscrm.Grid.auto(objectTypeCode, findValue, entityId)
}
function findAndRefreshGrids(doc, objectTypeCode, isActivity, findValue, entityId) {
    Mscrm.Grid.findAndRefreshGrids(doc, objectTypeCode, isActivity, false, findValue, entityId)
}
function getGridRecords(grid, columns, layoutXml) {
    return Mscrm.Grid.getGridRecords(grid, columns, layoutXml)
}
Mscrm.Help = function () {};
Mscrm.Help.loadHelp = function (area) {
    var $v_0 = "",
        $v_1 = 0,
        $v_2 = 0,
        $v_3 = 285,
        $v_4;
    try {
        $v_4 = window.top;
        var $v_B = $v_4.location.href
    } catch ($$e_7) {
        $v_4 = window.self
    }
    var $v_5 = $v_4.screenLeft,
        $v_6 = $v_4.screenTop,
        $v_7 = $v_4.screen,
        $v_8 = $v_4.stage;
    if (window.LOCID_UI_DIR === "RTL") if ($v_5 - $v_3 - 15 < 3) $v_1 = 3;
    else $v_1 = $v_5 - $v_3 - 15;
    else {
        if ($v_5 + $v_4.document.body.clientWidth < $v_7.width - $v_3) $v_1 = $v_5 + $v_4.document.body.clientWidth + 3;
        else $v_1 = $v_7.width - 300;
        if (area) $v_1 -= 280
    }
    if ($v_6 + $v_4.document.body.clientHeight < $v_7.height) $v_2 = $v_6 - 23;
    else $v_2 = $v_7.height - 450;
    var $v_9 = Mscrm.CrmUri.create(window.HELP_SERVER_URL.length > 0 && Mscrm.SessionInfo.isOnline() ? Mscrm.Help.concatenateUrl(window.HELP_SERVER_URL, "/help/default.aspx") : "/help/default.aspx");
    if (area) {
        $v_9.get_query()["area"] = area;
        $v_3 = 565
    } else {
        var $v_C = null;
        if (isRichClient()) {
            var $v_J = getOutlookHostedWindow().getParameter("currentfolderurl");
            if ($v_J !== "") $v_C = Mscrm.CrmUri.create($v_J)
        }
        if (!$v_C || $v_C.get_path().toLowerCase() === "/sitemapnavpage.aspx") $v_C = Mscrm.CrmUri.create(window.location.href);
        if (!IsNull(Mscrm.PageManager) && !IsNull(Mscrm.PageManager.get_instance())) {
            var $v_K = Mscrm.PageManager.get_instance().raiseEvent(15, null),
                $v_L = $v_K[0];
            if (IsNull($v_L)) {
                if (isRichClient() && $v_C.get_path().toLowerCase() === "/main.aspx") {
                    var $v_M = Number.parseInvariant($v_C.get_query()["etc"]);
                    if (!Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode($v_M)) {
                        $v_C = Mscrm.CrmUri.create("/_root/homepage.aspx");
                        $v_C.get_query()["etc"] = $v_M.toString()
                    } else $v_C = Mscrm.CrmUri.create("/_root/stage.aspx")
                }
            } else if ($v_L.length > 0) $v_C = Mscrm.CrmUri.create($v_L)
        }
        try {
            if (!Mscrm.SessionInfo.isOutlookClient() && $v_C.get_path().toLowerCase() === "/_root/bar_top.aspx" || window.location.protocol === "outlook:") $v_C = Mscrm.CrmUri.create($v_8.location.href)
        } catch ($$e_I) {
            return Mscrm.Help.loadHelp("##WHATSNEW##")
        }
        var $v_D = $v_C.get_path().toLowerCase();
        $v_D === "/userdefined/edit.aspx" && $v_C.set_path($v_D);
        var $v_E = $v_C;
        $v_C = Mscrm.CrmUri.create($v_C.get_path());
        $v_C.set_useOrganizationName(false);
        Mscrm.SolutionDecorater.removeSolutionIdFromQuerystring($v_C);
        $v_D = $v_C.get_path().toLowerCase();
        switch ($v_D) {
            case "/userdefined/edit.aspx":
                if (!IsNull($v_E.get_query()["etc"])) {
                    var $v_N = Number.parseInvariant($v_E.get_query()["etc"]);
                    if (!Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode($v_N)) {
                        $v_C.get_query()["etc"] = $v_E.get_query()["etc"];
                        if (!IsNull($v_E.get_query()["etn"])) $v_C.get_query()["etn"] = $v_E.get_query()["etn"]
                    }
                }
                break;
            case "/tools/systemcustomization/systemcustomization.aspx":
                var $v_F = $v_E.get_query()["pid"];
                if (!IsNull($v_F) && $v_F !== "0") $v_C.get_query()["pid"] = $v_E.get_query()["pid"];
                break;
            case "/_root/homepage.aspx":
                $v_0 = "custom_entity_list";
                $v_C.get_query()["etc"] = $v_E.get_query()["etc"];
                break;
            case "/tools/home_tools.aspx":
            case "/tools/admin/admin.aspx":
            case "/tools/business/business.aspx":
            case "/tools/templates/templates.aspx":
            case "/tools/datamanagement/datamanagement.aspx":
            case "/tools/productcatalog/productcatalog.aspx":
                if ($v_E.get_query()["web"]) delete $v_E.get_query().web;
                if ($v_E.get_query()["sitemappath"]) delete $v_E.get_query().sitemappath;
                $v_C.appendToQuery($v_E.get_queryString());
                break;
            case "/tools/formeditor/formeditor.aspx":
                var $v_O = Mscrm.CrmUri.create($v_4.location.search).get_query()["extraqs"];
                if (!IsNull($v_O)) if ($v_O.search(new RegExp("formtype=main")) !== -1) $v_C.get_query()["formtype"] = "main";
                else $v_C.get_query()["formtype"] = "preview";
                else $v_C.get_query()["formtype"] = "main";
                break;
            case "/main.aspx":
                $v_C = Mscrm.CrmUri.create("/userdefined/edit.aspx");
                $v_C.set_useOrganizationName(false);
                var $v_P = $v_E.get_query()["etc"].toString();
                if (!Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode(parseInt($v_P, 10))) {
                    var $v_Q = $v_E.get_query()["etn"];
                    $v_C.get_query()["etc"] = $v_P;
                    if (!IsNull($v_Q)) $v_C.get_query()["etn"] = $v_Q.toString()
                }
                break;
            case "/tools/regionaloptions/dialogs/regionaloptions.aspx":
                var $v_R = Mscrm.CrmUri.create($v_4.location.search).get_query()["usersettings"];
                if (!IsNull($v_R)) if ($v_R.length > 0 && $v_R.toLowerCase() === "true") $v_C.get_query()["context"] = "user";
                else $v_C.get_query()["context"] = "sys";
                break;
            case "/tools/systemcustomization/relationships/managerelationship.aspx":
                var $v_S = Mscrm.CrmUri.create($v_4.location.search).get_query()["entityrole"];
                if (!IsNull($v_S)) if ($v_S.length > 0) $v_C.get_query()["entityrole"] = $v_S;
                break;
            case "/tools/solution/edit.aspx":
                var $v_G = Mscrm.TreeNavControl.getHelpContextUri();
                if (!IsNull($v_G)) {
                    $v_G.set_useOrganizationName(false);
                    $v_C = $v_G
                }
                break;
            case "/crmreports/viewer/viewer.aspx":
                var $v_T = Mscrm.CrmUri.create($v_4.location.search).get_query()["helpID"];
                if (!IsNull($v_T)) if ($v_T.length > 0) $v_C.get_query()["helpID"] = $v_T;
                $v_0 = "/crmreports/viewer/viewer.aspx";
                break;
            case "/_grid/cmds/dlg_additem.aspx":
                var $v_U = Mscrm.CrmUri.create($v_4.location.search).get_query()["type"];
                switch ($v_U) {
                    case "image":
                        $v_C.get_query()["helpID"] = "addImageItem";
                        break;
                    case "hyperlink":
                        $v_C.get_query()["helpID"] = "addTextItem";
                        break;
                    default:
                        $v_0 = "/_grid/cmds/dlg_additem.aspx";
                        break
                }
                break;
            default:
                try {
                    var $v_V = window.getHelpContext();
                    typeof $v_V === "string" && $v_C.set_fragment($v_V)
                } catch ($$e_W) {}
                break
        }
        var $v_H = $v_C.toString(),
            $v_I = $v_H.toUpperCase();
        if (Mscrm.Utilities.$3f.test($v_I)) {
            var $v_W = $v_I.indexOf("/WEBRESOURCES/");
            if ($v_W > 0) $v_H = $v_H.substr($v_W)
        }
        $v_9.get_query()["area"] = $v_H
    }
    $v_9.get_query()["user_lcid"] = window.USER_HELP_LCID;
    if ($v_0.length > 0) $v_9.get_query()["defaultHelp"] = $v_0;
    var $v_A = $v_4.document.body.clientHeight - 5;
    if ($v_A < 300) $v_A = 300;
    $v_9.get_query()["ver"] = CrmEncodeDecode.CrmUrlEncode(window.APPLICATION_FULL_VERSION);
    if (!Mscrm.Help.$6l()) {
        try {
            var $v_X = "resizable=1,width=" + $v_3 + ",height=" + $v_A + ",left=" + $v_1 + ",top=" + $v_2;
            if (!IsNull(openStdWinWithFeatures($v_9, buildWinName(), $v_X, false))) return true
        } catch ($$e_c) {}
        return false
    } else {
        Mscrm.Help.$68($v_9);
        try {
            if (!IsNull(safeWindowOpen($v_9, buildWinName(), "", false))) return true
        } catch ($$e_d) {}
        return false
    }
};
Mscrm.Help.concatenateUrl = function (url1, url2) {
    if (IsNull(url1) || !url1.length) return url2;
    if (IsNull(url2) || !url2.length) return url1;
    if (url1.charAt(url1.length - 1) !== "/" && url2.charAt(0) !== "/") return url1 + "/" + url2;
    if (url1.charAt(url1.length - 1) === "/" && url2.charAt(0) === "/") return url1 + url2.substr(1, url2.length - 1);
    return url1 + url2
};
Mscrm.Help.$6l = function () {
    return window.HELP_REDIRECT_AVAILABLE
};
Mscrm.Help.$68 = function ($p0) {
    $p0.get_query()["SkuType"] = window.HELP_SKU;
    if (!isNullOrEmptyString(window.ONLINE_TRANSACTION_TYPE)) $p0.get_query()["tt"] = window.ONLINE_TRANSACTION_TYPE
};

function loadHelp(area) {
    return Mscrm.Help.loadHelp(area)
}
function ConcatenateUrl(url1, url2) {
    return Mscrm.Help.concatenateUrl(url1, url2)
}
Mscrm.ImageStrip = function () {};
Mscrm.ImageStrip.get_$6h = function () {
    if (!Mscrm.ImageStrip.$2s) Mscrm.ImageStrip.$2s = Mscrm.ImageStripData.$6X();
    return Mscrm.ImageStrip.$2s
};
Mscrm.ImageStrip.getImage = function (url) {
    var $v_0 = Mscrm.ImageStrip.getImageInfo(url),
        $v_1 = document.createElement("IMG");
    $v_1.src = $v_0.source;
    $v_1.className = $v_0.cssClass;
    return $v_1
};
Mscrm.ImageStrip.getImageInfo = function (url) {
    var $v_0 = new Mscrm.ImageInfo,
        $v_1 = Mscrm.ImageStrip.get_$6h()[url.get_path().toUpperCase()];
    if (!$v_1 || !window.IMAGE_STRIPS_ENABLED) {
        $v_0.cssClass = "";
        $v_0.source = url.toString()
    } else {
        $v_0.cssClass = $v_1;
        $v_0.source = "/_imgs/imagestrips/transparent_spacer.gif"
    }
    return $v_0
};
Mscrm.ImageStrip.getImageStripClassName = function (element) {
    var $v_0 = element.className.match(Mscrm.ImageStrip.$5Y);
    if ($v_0 && $v_0.length > 2) return $v_0[2];
    else return null
};
Mscrm.ImageStrip.replaceExistingImageStripClass = function (source, newClassValue) {
    for (var $v_0 = source, $v_1 = $v_0.split(" "), $v_2 = "", $v_3 = "", $v_4 = 0; $v_4 < $v_1.length; $v_4++) {
        $v_3 = $v_1[$v_4].trim();
        if ($v_3.startsWith("ms-crm-ImageStrip-")) $v_3 = "";
        if ($v_3 === "") continue;
        $v_2 += $v_3 + " "
    }
    $v_2 += newClassValue;
    return $v_2
};
Mscrm.ImageStrip.changeImage = function (imageToChange, newUrl) {
    var $v_0 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create(newUrl));
    imageToChange.src = $v_0.source;
    imageToChange.className = Mscrm.ImageStrip.replaceExistingImageStripClass(imageToChange.className, $v_0.cssClass)
};

function IsNull(o) {
    return typeof o === "undefined" || typeof o === "unknown" || o == null
}
function isArray(item) {
    return !!item && (Array.isInstanceOfType(item) || typeof item.splice === "function")
}
function isInstanceOfTypeAcrossFrames(item, type) {
    try {
        return IsNull(item) || IsNull(type) ? false : Object.getType(item).getName() === type.getName()
    } catch ($$e_2) {
        return false
    }
}
function isNullOrEmptyString(str) {
    return IsNull(str) || typeof str === "string" && !str.length
}
function getClass(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
}
function isOfClass(obj, soughtClass) {
    return getClass(obj) === soughtClass
}
Mscrm.TypeNames = function () {};
Mscrm.ClassNames = function () {};
Mscrm.InlineContentLoader = function () {};
Mscrm.InlineContentLoader.$$cctor = function () {
    Mscrm.InlineContentLoader.$12 = Mscrm.CrmHeader.get_scriptLoader();
    Mscrm.InlineContentLoader.$1H = Mscrm.CrmHeader.get_styleLoader()
};
Mscrm.InlineContentLoader.$5l = function ($p0, $p1, $p2, $p3, $p4) {
    Mscrm.InlineContentLoader.cancelCurrentRequest();
    Mscrm.InlineContentLoader.$J = new XMLHttpRequest;
    Mscrm.InlineContentLoader.$J.open($p2, $p0.toString(), true);
    $p2.toUpperCase() === "POST" && Mscrm.InlineContentLoader.$J.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    Mscrm.InlineContentLoader.$J.onreadystatechange = function () {
        if (Mscrm.InlineContentLoader.$J.readyState === 4) {
            Mscrm.InlineContentLoader.$J.onreadystatechange = null;
            if (Mscrm.InlineContentLoader.$J.status === 200 && Mscrm.InlineContentLoader.$J.getResponseHeader("Content-Type").indexOf("application/json") >= 0) $p3(Mscrm.InlineContentLoader.$J);
            else $p4(Mscrm.InlineContentLoader.$J)
        }
    };
    Mscrm.InlineContentLoader.$J.send($p1)
};
Mscrm.InlineContentLoader.requestJsonContentByGet = function (url, onSuccess, onFailure) {
    Mscrm.InlineContentLoader.$5l(url, null, "GET", onSuccess, onFailure)
};
Mscrm.InlineContentLoader.requestJsonContentByPost = function (url, httpBody, onSuccess, onFailure) {
    Mscrm.InlineContentLoader.$5l(url, httpBody, "POST", onSuccess, onFailure)
};
Mscrm.InlineContentLoader.cancelCurrentRequest = function () {
    if (!IsNull(Mscrm.InlineContentLoader.$J)) {
        Mscrm.InlineContentLoader.$J.onreadystatechange = null;
        Mscrm.InlineContentLoader.$J.abort();
        Mscrm.InlineContentLoader.$J = null
    }
    Mscrm.InlineContentLoader.$12.cancelAnyCurrentProcessing()
};
Mscrm.InlineContentLoader.$5T = function ($p0, $p1) {
    var $v_0 = $get($p1 + $p0.id);
    if (IsNull($v_0)) {
        $v_0 = document.createElement("div");
        $p0.parentNode.appendChild($v_0);
        $v_0.id = $p1 + $p0.id;
        $v_0.style.display = "none"
    }
    return $v_0
};
Mscrm.InlineContentLoader.loadJsonResponse = function (jsonResponse, container) {
    var $v_0 = Mscrm.InlineContentLoader.$5T(container, "styleContainer_"),
        $v_1 = Mscrm.InlineContentLoader.$5T(container, "scriptContainer_");
    if (!IsNull(jsonResponse.Header)) {
        !IsNull(jsonResponse.Header.Title) && Mscrm.CrmHeader.loadTitle(jsonResponse.Header.Title);
        Mscrm.InlineContentLoader.$1H.loadStyles($v_0, jsonResponse.Header)
    }
    container.innerHTML = jsonResponse.Markup;
    !IsNull(jsonResponse.Header) && Mscrm.InlineContentLoader.$12.loadScripts($v_1, jsonResponse.Header, true, true)
};
Mscrm.InlineContentLoader.loadHeaderJson = function (headerJson, container, async) {
    var $v_0 = headerJson.State;
    if ($v_0 === "complete") return;
    Mscrm.InlineContentLoader.$1H.loadStyles(container, headerJson);
    Mscrm.InlineContentLoader.$12.loadScripts(container, headerJson, async, false)
};
Mscrm.NumberUtility = function () {};
Mscrm.NumberUtility.addFormatting = function (value, precision, noTrailingZeroes) {
    var $v_0 = IsNull(precision) || precision < 0 ? 10 : precision;
    if (noTrailingZeroes && $v_0 > 0) {
        var $v_2 = value.toString(10);
        $v_0 = Mscrm.NumberUtility.$4M($v_2, true)
    }
    var $v_1 = value.localeFormat("n" + $v_0.toString());
    try {
        if (value !== Number.parseLocale($v_1)) {
            var $v_3 = value.toString(10),
                $v_4 = Mscrm.NumberUtility.$4M($v_3, true),
                $v_5 = Mscrm.NumberUtility.$4M($v_1, false),
                $v_6 = "",
                $v_7 = Sys.CultureInfo.CurrentCulture.numberFormat["NumberDecimalSeparator"].toString().charAt(Sys.CultureInfo.CurrentCulture.numberFormat["NumberDecimalSeparator"].toString().length - 1);
            if ($v_4 <= $v_5) {
                for (var $v_9 = $v_5 - $v_4, $v_8 = 0; $v_8 < $v_1.length; $v_8++) {
                    var $v_A = $v_1.length - 1 - $v_8;
                    if ($v_1.charAt($v_A) === $v_7) break;
                    if ($v_8 >= $v_9) $v_6 = $v_3.charAt($v_3.length - 1 - $v_8 + $v_9) + $v_6;
                    else $v_6 = "0" + $v_6
                }
                $v_6 = $v_1.substring(0, $v_1.length - $v_8) + $v_6
            }
            if (value === Number.parseLocale($v_6)) $v_1 = $v_6
        }
    } catch ($$e_E) {}
    return $v_1
};
Mscrm.NumberUtility.$4M = function ($p0, $p1) {
    for (var $v_0 = $p1 ? Sys.CultureInfo.InvariantCulture : Sys.CultureInfo.CurrentCulture, $v_1 = $v_0.numberFormat["NumberDecimalSeparator"].toString().charAt($v_0.numberFormat["NumberDecimalSeparator"].toString().length - 1), $v_2 = $p0.length - 1; $v_2 >= 0; $v_2--) if ($p0.charAt($v_2) === $v_1) return $p0.length - $v_2 - 1;
    return 0
};
Mscrm.NumberUtility.fullWidthToHalfWidth = function (value) {
    if (!isNullOrEmptyString(value)) for (var $v_0 = 0; $v_0 < Mscrm.NumberUtility.$3t.length; $v_0++) value.replace(new RegExp(Mscrm.NumberUtility.$3t[$v_0], "g"), Mscrm.NumberUtility.$4h[$v_0]);
    return value
};
Mscrm.NumberUtility.locStringToFloat = function (value) {
    try {
        return Number.parseLocale(Mscrm.NumberUtility.$5d(value))
    } catch ($$e_1) {
        return Number.NaN
    }
};
Mscrm.NumberUtility.locStringToInt = function (value) {
    try {
        return Math.floor(Number.parseLocale(Mscrm.NumberUtility.$5d(value)))
    } catch ($$e_1) {
        return Number.NaN
    }
};
Mscrm.NumberUtility.$5d = function ($p0) {
    if (typeof $p0 !== "string" || isNullOrEmptyString($p0)) return "";
    var $v_0 = Mscrm.NumberUtility.fullWidthToHalfWidth($p0);
    return $v_0.replace(new RegExp("[\\s\u00a0]*", "g"), "")
};
Mscrm.NumberUtility.formatDuration = function (minutes) {
    var $v_0 = 2,
        $v_1 = null;
    if (minutes < 60) {
        var $v_2 = Mscrm.NumberUtility.addFormatting(minutes, 0, true);
        if (IsNull($v_2) || !$v_2.length) return null;
        if (minutes === 1) $v_1 = String.format(window.LOCID_ONE_MINUTE_MASK, $v_2);
        else $v_1 = String.format(window.LOCID_N_MINUTES_MASK, $v_2)
    } else if (minutes >= 60 && minutes < 1440) {
        var $v_3 = minutes / 60,
            $v_4 = Mscrm.NumberUtility.addFormatting($v_3, $v_0, true);
        if (IsNull($v_4) || !$v_4.length) return null;
        if ($v_3 === 1) $v_1 = String.format(window.LOCID_ONE_HOUR_MASK, $v_4);
        else $v_1 = String.format(window.LOCID_N_HOURS_MASK, $v_4)
    } else if (minutes >= 1440) {
        var $v_5 = minutes / 60,
            $v_6 = $v_5 / 24,
            $v_7 = Mscrm.NumberUtility.addFormatting($v_6, $v_0, true);
        if (IsNull($v_7) || !$v_7.length) return null;
        if ($v_6 === 1) $v_1 = String.format(window.LOCID_ONE_DAY_MASK, $v_7);
        else $v_1 = String.format(window.LOCID_N_DAYS_MASK, $v_7)
    }
    return $v_1
};
Mscrm.PagePreloadInfo = function () {
    this.$2P_0 = (new Date).getTime()
};
Mscrm.PagePreloadInfo.prototype = {
    $3v_0: false,
    $2P_0: 0,
    $2O_0: 0,
    $2S_0: null,
    $2e_0: 0,
    $2a_0: 0,
    get_isLoaded: function () {
        return this.$3v_0
    },
    set_isLoaded: function (value) {
        this.$3v_0 = value;
        if (this.$3v_0) this.$2O_0 = (new Date).getTime();
        return value
    },
    get_preloadEndTime: function () {
        return this.$2O_0
    },
    set_preloadEndTime: function (value) {
        this.$2O_0 = value;
        return value
    },
    get_preloadStartTime: function () {
        return this.$2P_0
    },
    set_preloadStartTime: function (value) {
        this.$2P_0 = value;
        return value
    },
    get_windowInstance: function () {
        return this.$2S_0
    },
    set_windowInstance: function (value) {
        this.$2S_0 = value;
        return value
    },
    get_beforeWindowOpenedTime: function () {
        return this.$2e_0
    },
    set_beforeWindowOpenedTime: function (value) {
        this.$2e_0 = value;
        return value
    },
    get_afterWindowOpenedTime: function () {
        return this.$2a_0
    },
    set_afterWindowOpenedTime: function (value) {
        this.$2a_0 = value;
        return value
    }
};
Mscrm.PerformanceTracing = function () {};
Mscrm.PerformanceTracing.get_$6B = function () {
    return window._perfTraceBuffer
};
Mscrm.PerformanceTracing.get_$6H = function () {
    return !!Mscrm.PerformanceTracing.get_$5C()
};
Mscrm.PerformanceTracing.get_$5C = function () {
    if (!Mscrm.PerformanceTracing.$2l) {
        var $v_0 = window.self,
            $v_1 = null;
        while ($v_0) {
            var $v_2 = Mscrm.PerformanceTracing.$6V($v_0);
            if (!$v_2) break;
            $v_1 = $v_2;
            if ($v_0.parent !== $v_0.self) $v_0 = $v_0.parent;
            else $v_0 = $v_0.opener
        }
        Mscrm.PerformanceTracing.$2l = $v_1
    }
    return Mscrm.PerformanceTracing.$2l
};
Mscrm.PerformanceTracing.onDocumentReady = function (e) {
    document.readyState === "complete" && Mscrm.PerformanceTracing.write("ReadyState_Complete")
};
Mscrm.PerformanceTracing.onApplicationLoad = function (sender, e) {
    window.setTimeout(Mscrm.PerformanceTracing.$6z, 0)
};
Mscrm.PerformanceTracing.write = function (id, url, message) {
    var $v_0 = Mscrm.PerformanceTracing.get_$6B();
    if ($v_0) {
        var $v_1 = new Mscrm.TraceEntry(id, message, (new Date).getTime(), url);
        Array.add($v_0, $v_1);
        Mscrm.PerformanceTracing.get_$6H() && Mscrm.PerformanceTracing.$6Q($v_0)
    }
};
Mscrm.PerformanceTracing.$6Q = function ($p0) {
    for (var $v_0 = Mscrm.CrmUri.create(window.location.href), $v_1 = $p0.length, $v_2 = 0; $v_2 < $v_1; $v_2++) {
        var $v_3 = $p0[$v_2],
            $v_4 = $v_3.url ? Mscrm.CrmUri.create($v_3.url) : $v_0,
            $v_5 = String.format("{0} {1} {2}{3} {4}", $v_3.timestamp, $v_3.id, $v_4.get_path(), $v_4.get_queryString(), $v_3.message);
        Mscrm.PerformanceTracing.get_$5C().trace($v_5)
    }
    Array.clear($p0)
};
Mscrm.PerformanceTracing.$6V = function ($p0) {
    var $v_0 = null;
    try {
        $v_0 = $p0.Sys
    } catch ($$e_2) {
        return null
    }
    if ($v_0) {
        var $v_1 = $v_0.Debug;
        if ($v_1 && $v_1.trace && $p0.document.getElementById("TraceConsole")) return $v_1
    }
    return null
};
Mscrm.PerformanceTracing.$6z = function () {
    Mscrm.PerformanceTracing.write("After_ApplicationLoad")
};
Mscrm.OutlookUtil = function () {};
Mscrm.OutlookUtil.get_uiUtil = function () {
    if (IsNull(Mscrm.OutlookUtil.$3J)) {
        var $v_0 = $get("crmRcUtil");
        if ($v_0) Mscrm.OutlookUtil.$3J = $v_0
    }
    return Mscrm.OutlookUtil.$3J
};
Mscrm.CacheScope = function () {};
Mscrm.ResponseType = function () {};
Mscrm.PageManager = function () {
    this.$$d_$54_3 = Function.createDelegate(this, this.$54_3);
    this.$$d_applicationLoadHandler = Function.createDelegate(this, this.applicationLoadHandler);
    Mscrm.PageManager.initializeBase(this)
};
Mscrm.PageManager.get_instance = function () {
    return $find("crmPageManager")
};
Mscrm.PageManager.get_isPageLoaded = function () {
    return Mscrm.PageManager.$2w
};
Mscrm.PageManager.get_isUnloading = function () {
    return Mscrm.PageManager.$1Y
};
Mscrm.PageManager.isOutlookProxyPage = function () {
    try {
        var $v_0;
        try {
            $v_0 = Mscrm.CrmUri.create(window.top.location.href)
        } catch ($$e_1) {
            $v_0 = Mscrm.CrmUri.create(window.location.href)
        }
        if ($v_0.get_path().toLowerCase() === "/_grid/outlookribboncontextgrid.aspx") return true
    } catch ($$e_2) {}
    return false
};
Mscrm.PageManager.isFlatUIPage = function () {
    try {
        var $v_0, $v_1 = false;
        try {
            $v_0 = Mscrm.CrmUri.create(window.top.location.href)
        } catch ($v_3) {
            var $v_4 = $v_3.number;
            if ($v_4 === -2146828218) $v_1 = true;
            $v_0 = Mscrm.CrmUri.create(window.location.href)
        }
        var $v_2 = Mscrm.CrmUri.create(window.location.href);
        if ($v_0.get_scheme().toUpperCase() === "OUTLOOK" || $v_0.get_path().toUpperCase().endsWith("/STAGE.ASPX") || $v_1) {
            var $v_5 = window.self;
            do {
                $v_0 = Mscrm.CrmUri.create($v_5.location.href);
                $v_5 = $v_5.parent
            } while ($v_5 !== $v_5.parent && !$v_0.get_path().endsWith("/main.aspx"))
        }
        if ($v_0.get_path().endsWith("main.aspx") && (window.self === window.parent || $v_2.get_query()["pagemode"] === "iframe" || $v_2.toString() === $v_0.toString()) && typeof _ISFLATUIPAGE != "undefined" && _ISFLATUIPAGE) return true;
        else return false
    } catch ($$e_6) {}
    return false
};
Mscrm.PageManager.isFlatObject = function (etc) {
    var $v_0 = false;
    switch (etc) {
        case 4406:
        case 1:
        case 2:
        case 1080:
        case 1013:
        case 4:
        case 3:
        case 9600:
        case 9603:
        case 9604:
        case 9602:
        case 112:
        case 4300:
        case 4400:
        case 4402:
        case 4401:
        case 123:
        case 3234:
        case 1010:
        case 1011:
        case 1022:
        case 1026:
        case 1038:
        case 1083:
        case 1071:
        case 2029:
        case 1084:
        case 1085:
        case 1088:
        case 1089:
        case 8:
        case 1090:
        case 1091:
        case 9100:
        case 9:
        case 1024:
        case 1055:
        case 1056:
        case 2013:
        case 4200:
        case 4210:
        case 4201:
        case 4214:
        case 4001:
        case 4212:
        case 4207:
        case 4204:
        case 4202:
        case 9502:
        case 9508:
        case 4412:
            $v_0 = true;
            break;
        default:
            $v_0 = etc >= 1e4;
            break
    }
    return $v_0
};
Mscrm.PageManager.isFlatUrl = function (url) {
    var $v_0 = Mscrm.CrmUri.create(url);
    switch ($v_0.get_path().toLowerCase()) {
        case "/advancedfind/advfind.aspx":
        case "/advancedfind/fetchdata.aspx":
        case "/import/edit.aspx":
        case "/sfa/accts/edit.aspx":
        case "/sfa/conts/edit.aspx":
        case "/sfa/opps/edit.aspx":
        case "/sfa/comps/edit.aspx":
        case "/sfa/saleslit/edit.aspx":
        case "/sfa/opportunityproduct/edit.aspx":
        case "/sfa/customeraddress/edit.aspx":
        case "/sfa/leads/edit.aspx":
        case "/sfa/quotes/edit.aspx":
        case "/sfa/quotedetail/edit.aspx":
        case "/sfa/salesorder/edit.aspx":
        case "/sfa/salesorderdetail/edit.aspx":
        case "/sfa/invoice/edit.aspx":
        case "/sfa/invoicedetail/edit.aspx":
        case "/cs/cases/edit.aspx":
        case "/cs/contracts/edit.aspx":
        case "/cs/contractdetails/edit.aspx":
        case "/cs/home_managekb.aspx":
        case "/tools/admin/admin.aspx":
        case "/tools/productcatalog/productcatalog.aspx":
        case "/tools/documentmanagement/documentmanagement.aspx":
        case "/tools/datamanagement/datamanagement.aspx":
        case "/tools/business/business.aspx":
        case "/products/pricelevel/edit.aspx":
        case "/products/productpricelevel/edit.aspx":
        case "/products/discounttype/edit.aspx":
        case "/products/discounttypeitem/edit.aspx":
        case "/products/product/edit.aspx":
        case "/products/uom/edit.aspx":
        case "/products/uomschedule/edit.aspx":
        case "ma/camps/edit.aspx":
        case "ma/campaignactivity/edit.aspx":
        case "ma/campaignresponse/edit.aspx":
        case "ma/lists/edit.aspx":
        case "ma/bulkoperations/edit.aspx":
        case "/workplace/home_dashboards.aspx":
        case "/workplace/home_workplace.aspx":
        case "/workplace/home_activities.aspx":
        case "/sm/sites/edit.aspx":
        case "/biz/teams/edit.aspx":
        case "/biz/users/edit.aspx":
        case "/tools/queueitem/edit.aspx":
        case "/activities/phone/edit.aspx":
        case "/activities/appointment/edit.aspx":
        case "/activities/serviceappointment/edit.aspx":
        case "/activities/task/edit.aspx":
        case "/activities/letter/edit.aspx":
        case "/activities/email/edit.aspx":
        case "/activities/fax/edit.aspx":
        case "/userdefined/edit.aspx":
        case "/_root/homepage.aspx":
        case "/main.aspx":
            return true
    }
    return false
};
Mscrm.PageManager.prototype = {
    mode: null,
    initialize: function () {
        Mscrm.PageManagerBase.prototype.initialize.call(this);
        Sys.Application.add_load(this.$$d_applicationLoadHandler);
        Sys.Application.add_unload(this.$$d_$54_3);
        this.$4_1.subscribeEvent(74, this.get_id())
    },
    applicationLoadHandler: function (sender, args) {
        Sys.Application.remove_load(this.$$d_applicationLoadHandler);
        this.loadHandler()
    },
    $54_3: function ($p0, $p1) {
        Sys.Application.remove_unload(this.$$d_$54_3);
        this.unloadHandler()
    },
    handleEvent: function (eventCode, parameters, sourceComponent) {
        switch (eventCode) {
            case 74:
                Mscrm.Utilities.asyncInitAllControls();
                break
        }
        return Mscrm.CrmUIComponent.prototype.handleEvent.call(this, eventCode, parameters, sourceComponent)
    },
    loadHandler: function () {
        this.mode === "iframe" && Mscrm.PageManager.isFlatUIPage() && Mscrm.PageManager.isFlatUrl(window.parent.location.href) && this.linkParentEventManager(window.parent, "crmPageManager");
        this.raisePageLoadEvents(null);
        this.executePageOnLoadScripts();
        if (!this.$2p_2) {
            var $$t_0 = this;
            window.setTimeout(function () {
                $$t_0.internalExecuteDeferredActions(null)
            }, 0)
        }
        Mscrm.PageManager.$2w = true
    },
    unloadHandler: function () {
        if (Mscrm.PageManager.$1Y) return;
        else Mscrm.PageManager.$1Y = true;
        if (this.mode === "iframe") if (!IsNull(this.$10_2) && this.$4_1.$1X_1) {
            var $v_0 = this.$10_2.$4_1;
            !IsNull($v_0) && $v_0.unregisterTransientChildEventManager(this.$4_1.$1c_1)
        }
        this.raiseEvent(29, null)
    }
};
Mscrm.PageManagerBase = function () {
    Mscrm.PageManagerBase.initializeBase(this)
};
Mscrm.PageManagerBase.prototype = {
    initialize: function () {
        Mscrm.CrmUIComponent.prototype.initialize.call(this);
        this.$3j_2 = window.location.href
    },
    dispose: function () {
        this.$10_2 = null;
        this.$3B_2 = null;
        this.$1Q_2 = null;
        this.$2m_2 = null;
        this.$1y_2 = null;
        Mscrm.CrmUIComponent.prototype.dispose.call(this)
    },
    $10_2: null,
    get_parentPageManager: function () {
        return this.$10_2
    },
    $3B_2: null,
    get_rootElement: function () {
        return this.$3B_2
    },
    set_rootElement: function (value) {
        if (isNullOrEmptyString(value.toString())) this.$3B_2 = document.body;
        else this.$3B_2 = $get(value.toString());
        return value
    },
    get_parentWindowPageManager: function () {
        var $v_0 = null;
        try {
            $v_0 = window.top.opener.Sys.Application.findComponent("crmPageManager")
        } catch ($$e_1) {}
        return $v_0
    },
    $3j_2: null,
    get_contentUrl: function () {
        return this.$3j_2
    },
    set_contentUrl: function (value) {
        this.$3j_2 = value;
        return value
    },
    $1Q_2: null,
    get_deferredActionList: function () {
        return this.$1Q_2
    },
    set_deferredActionList: function (value) {
        this.$1Q_2 = value;
        return value
    },
    $2p_2: false,
    get_executeDeferredActionsOnDemand: function () {
        return this.$2p_2
    },
    set_executeDeferredActionsOnDemand: function (value) {
        this.$2p_2 = value;
        return value
    },
    $2m_2: null,
    get_deferredActionParameters: function () {
        return this.$2m_2
    },
    set_deferredActionParameters: function (value) {
        this.$2m_2 = value;
        return value
    },
    $1y_2: null,
    get_pageOnLoadScriptList: function () {
        return this.$1y_2
    },
    set_pageOnLoadScriptList: function (value) {
        this.$1y_2 = value;
        return value
    },
    executeDeferredActions: function (parameters) {
        this.internalExecuteDeferredActions(parameters)
    },
    linkParentEventManager: function (win, pageManagerId) {
        try {
            this.$10_2 = win.Sys.Application.findComponent(pageManagerId);
            if (IsNull(this.$10_2)) return
        } catch ($$e_2) {
            return
        }
        var $v_0 = this.$10_2.$4_1,
            $v_1 = $v_0.registerTransientChildEventManager(this.$4_1);
        this.$4_1.$1X_1 = true;
        this.$4_1.$1c_1 = $v_1;
        this.$4_1.$R_1 = $v_0
    },
    raisePageLoadEvents: function (uri) {
        var $v_0 = {};
        $v_0["uri"] = isNullOrEmptyString(uri) ? window.location.href : uri;
        this.raiseEvent(57, $v_0);
        if (!document.body.offsetHeight || !document.body.offsetWidth) return;
        this.raiseEvent(9, $v_0)
    },
    executePageOnLoadScripts: function () {
        if (this.$1y_2) for (var $v_0 = 0; $v_0 < this.$1y_2.length; $v_0++) eval(this.$1y_2[$v_0])
    },
    internalExecuteDeferredActions: function (parameters) {
        if (this.$1Q_2) {
            var $v_0 = Mscrm.CrmUri.create("");
            $v_0.appendToQuery(this.$2m_2.join("&"));
            var $v_1 = $v_0.get_query(),
                $$dict_3 = parameters;
            for (var $$key_4 in $$dict_3) {
                var $v_3 = {
                    key: $$key_4,
                    value: $$dict_3[$$key_4]
                };
                $v_1[$v_3.key] = $v_3.value
            }
            for (var $v_2 = this.$1Q_2.length, $v_4 = 0; $v_4 < $v_2; $v_4++) {
                if (IsNull(this.$1Q_2)) break;
                var $v_5 = this.$1Q_2[$v_4],
                    $v_6 = {};
                $v_6["key"] = $v_5;
                var $v_7 = this.raiseEvent(10, $v_6);
                if (!$v_7 || !$v_7.length) continue;
                var $v_8 = $v_7[0],
                    $v_9 = Mscrm.DeferredActionHandlerFactory.create($v_8["handlerId"]);
                $v_9.handleDeferredAction($v_8, $v_1)
            }
        }
    },
    loadHandler: function () {},
    unloadHandler: function () {}
};
Mscrm.RemoteCommandXml = function (service, command) {
    this.$i_0 = {};
    this.$2o_0 = Mscrm.RemoteCommandXml.$77;
    this.$3E_0 = service;
    this.$2i_0 = command;
    this.$W_0 = new XMLHttpRequest;
    this.$1h_0 = false
};
Mscrm.RemoteCommandXml.$77 = function ($p0, $p1) {
    if (IsNull($p0)) $p0 = "Not available";
    var $v_0 = "";
    if ($p1) {
        var $v_2 = XUI.Xml.SelectSingleNode($p1, "error/description", null);
        if (!IsNull($v_2)) $v_0 = XUI.Xml.GetText($v_2)
    }
    var $v_1 = Mscrm.ErrorInformation.createFromDoc($p1);
    openErrorDlg($p0, $v_0, $v_1, -1, -1)
};
Mscrm.RemoteCommandXml.prototype = {
    $3E_0: null,
    $2i_0: null,
    $35_0: null,
    $1h_0: false,
    $4c_0: null,
    $11_0: null,
    $W_0: null,
    $6u_0: function ($p0, $p1) {
        return !isNullOrEmptyString($p0) && !isNullOrEmptyString($p1) && $p0.toUpperCase() === "APPGRIDWEBSERVICE" && ($p1.toUpperCase() === "REFRESH" || $p1.toUpperCase() === "DISASSOCIATEANDREFRESH" || $p1.toUpperCase() === "DELETECONNECTIONANDREFRESH")
    },
    execute: function (funAsyncCallbackFunction) {
        var $v_0 = !IsNull(funAsyncCallbackFunction);
        this.$W_0.readyState > 0 && this.$W_0.readyState < 4 && this.abort();
        var $v_1 = new String,
            $$dict_3 = this.$i_0;
        for (var $$key_4 in $$dict_3) {
            var $v_4 = {
                key: $$key_4,
                value: $$dict_3[$$key_4]
            };
            $v_1 += "&" + CrmEncodeDecode.CrmUrlEncode($v_4.key) + "=" + CrmEncodeDecode.CrmUrlEncode($v_4.value)
        }
        this.$35_0 = Mscrm.CrmUri.create("/AppWebServices/" + CrmEncodeDecode.CrmUrlEncode(this.$3E_0) + ".ashx?operation=" + CrmEncodeDecode.CrmUrlEncode(this.$2i_0) + $v_1);
        if ($v_0) {
            var $v_5 = new Mscrm.AsyncResultHandler(this, this.$W_0, funAsyncCallbackFunction);
            this.$W_0.onreadystatechange = $v_5.$$d_readyStateChanged
        }
        var $v_2, $v_3 = null;
        do {
            $v_2 = false;
            this.$W_0.open("POST", this.$35_0.toString(), $v_0);
            Mscrm.Utilities.setResponseTypeToMSXml(this.$W_0);
            this.$6u_0(this.$3E_0, this.$2i_0) && Mscrm.WrpcTokenFuncs.setTokenInHeader(this.$W_0, this.$35_0);
            try {
                this.$W_0.send(this.$4c_0);
                if (!$v_0) {
                    $v_3 = new Mscrm.RemoteCommandXmlResult(this, this.$W_0, $v_0);
                    if (!$v_3.$1a_0) $v_2 = $v_3.$48_0
                }
            } catch ($v_6) {
                var $v_7 = LOCID_REMOTECOMMAND_ERROR;
                $v_2 = confirm($v_7)
            }
            if ($v_2) this.$W_0 = new XMLHttpRequest
        } while ($v_2);
        return $v_3
    },
    get_reference: function () {
        return this.$11_0
    },
    set_reference: function (value) {
        this.$11_0 = value;
        return value
    },
    get_aborted: function () {
        return this.$1h_0
    },
    set_aborted: function (value) {
        this.$1h_0 = value;
        return value
    },
    get_errorHandler: function () {
        return this.$2o_0
    },
    get_service: function () {
        return this.$3E_0
    },
    get_command: function () {
        return this.$2i_0
    },
    get_oUrl: function () {
        return this.$35_0
    },
    setContent: function (value) {
        this.$4c_0 = value
    },
    setParameter: function (key, value) {
        this.$i_0[key] = CrmEncodeDecode.CrmUrlDecode(value)
    },
    abort: function () {
        if (!this.$1h_0) {
            this.$1h_0 = true;
            this.$W_0.abort()
        }
    }
};
Mscrm.AsyncResultHandler = function (remoteCommand, xmlHttp, functionCallback) {
    this.$$d_readyStateChanged = Function.createDelegate(this, this.readyStateChanged);
    this.$39_0 = remoteCommand;
    this.$25_0 = xmlHttp;
    this.$4g_0 = functionCallback
};
Mscrm.AsyncResultHandler.prototype = {
    $39_0: null,
    $25_0: null,
    $4g_0: null,
    readyStateChanged: function () {
        if (this.$25_0.readyState === 4) {
            this.$25_0.onreadystatechange = null;
            if (!this.$39_0.$1h_0 && this.$25_0.status) {
                var $v_0 = new Mscrm.RemoteCommandXmlResult(this.$39_0, this.$25_0, true);
                this.$4g_0($v_0, this.$39_0);
                this.$25_0.abort()
            }
        }
    }
};
Mscrm.RemoteCommandXmlResult = function (remoteCommand, xmlHttp, asyncRequest) {
    this.$4y_0 = remoteCommand;
    var $v_0 = new String,
        $v_1 = xmlHttp.responseXML;
    if (xmlHttp.status === 401) $v_0 = "0x80040277";
    else if (xmlHttp.status === 200) {
        this.$4z_0 = xmlHttp.responseText;
        this.$1a_0 = true
    } else {
        var $v_2 = !IsNull($v_1) ? XUI.Xml.SelectSingleNode($v_1, "error", null) : null;
        if (!IsNull($v_2)) {
            $v_2 = XUI.Xml.SelectSingleNode($v_1, "error/code", null);
            if (!IsNull($v_2)) $v_0 = XUI.Xml.GetText($v_2)
        } else $v_0 = "ServerError"
    }
    if (this.$1a_0) if (xmlHttp.responseText.indexOf("gridXml") < 0) {
        $v_0 = "HttpXMLError";
        this.$1a_0 = false
    }
    if (!this.$1a_0) if ($v_0 === ERRORCODE_ETM) {
        if (!asyncRequest) this.$48_0 = confirm(LOCID_ERRMSG_ETM_RETRY)
    } else !IsNull(remoteCommand.$2o_0) && remoteCommand.$2o_0($v_0, $v_1);
    if (!this.$1a_0);
};
Mscrm.RemoteCommandXmlResult.prototype = {
    $48_0: false,
    $1a_0: false,
    $4z_0: null,
    $4y_0: null,
    get_remoteCommandXml: function () {
        return this.$4y_0
    },
    get_returnValue: function () {
        return this.$4z_0
    },
    get_success: function () {
        return this.$1a_0
    },
    get_retry: function () {
        return this.$48_0
    }
};
Mscrm.InlinePageManager = function () {
    Mscrm.InlinePageManager.initializeBase(this)
};
Mscrm.InlinePageManager.prototype = {
    initialize: function () {
        Mscrm.PageManagerBase.prototype.initialize.call(this);
        this.$4_1.subscribeEvent(71, this.get_id())
    },
    $4k_3: null,
    $4j_3: false,
    get_isPageLoaded: function () {
        return this.$4j_3
    },
    $2t_3: false,
    get_isUnloading: function () {
        return this.$2t_3
    },
    handleEvent: function (eventCode, parameters, sourceComponent) {
        switch (eventCode) {
            case 71:
                this.$4k_3 = parameters["uri"];
                this.loadHandler();
                break
        }
        return null
    },
    loadHandler: function () {
        Mscrm.PageManager.isFlatUIPage() && Mscrm.PageManager.isFlatUrl(window.location.href) && this.linkParentEventManager(window.self, "crmPageManager");
        this.raisePageLoadEvents(this.$4k_3);
        this.executePageOnLoadScripts();
        if (!this.$2p_2) {
            var $$t_0 = this;
            window.setTimeout(function () {
                $$t_0.internalExecuteDeferredActions(null)
            }, 0)
        }
        this.$4j_3 = true
    },
    unloadHandler: function () {
        if (this.$2t_3) return;
        else this.$2t_3 = true;
        if (!IsNull(this.$10_2) && this.$4_1.$1X_1) {
            var $v_0 = this.$10_2.$4_1;
            !IsNull($v_0) && $v_0.unregisterTransientChildEventManager(this.$4_1.$1c_1)
        }
        this.raiseEvent(29, null);
        this.$2t_3 = false
    }
};
Mscrm.ReportViewType = function () {};
Mscrm.ReportUtil = function () {};
Mscrm.ReportUtil.downloadReport = function (id) {
    var $v_0 = Mscrm.CrmUri.create("/CRMReports/download.aspx");
    $v_0.get_query()["id"] = id;
    var $v_1 = "frmRptDownload",
        $v_2 = $get($v_1);
    if (IsNull($v_2)) {
        $v_2 = window.document.createElement("iframe");
        $v_2.style.display = "none";
        $v_2.id = $v_1;
        $v_2.setAttribute("name", $v_1);
        $v_2.src = Mscrm.CrmUri.create("/_static/blank.htm").toString();
        window.document.body.insertBefore($v_2, XUI.Html.DomUtils.GetFirstChild(window.document.body));
        $v_2.contentWindow.name = $v_1;
        var $v_3 = String.format("$get({0}).src = {1}", CrmEncodeDecode.CrmJavaScriptEncode($v_1), CrmEncodeDecode.CrmJavaScriptEncode($v_0.toString()));
        window.setTimeout($v_3, 10)
    } else $v_2.src = $v_0.toString()
};
Mscrm.ReportUtil.handleReportDoubleClick = function (sender, args) {
    var $v_0 = args.objectRow,
        $v_1 = args.objectID;
    Mscrm.ReportUtil.viewReport(parseInt($v_0.getAttribute("reporttypecode"), 10), $v_1, $v_0.getAttribute("filename"), "dblclick", null);
    args.breakEvent = true
};
Mscrm.ReportUtil.isValidReportName = function (reportName) {
    if (IsNull(reportName) || !reportName.length) return false;
    var $v_0 = new RegExp('[;\\?:@&=\\+\\$,\\\\\\*<>\\|"\\/]'),
        $v_1 = new RegExp("[^ .]");
    return !$v_0.test(reportName) && $v_1.test(reportName)
};
Mscrm.ReportUtil.runReportWizard = function (reportId, createOrgReport) {
    var $v_0 = 800,
        $v_1 = 530,
        $v_2 = Mscrm.CrmUri.create("/WebWizard/WizardContainer.aspx");
    $v_2.get_query()["WizardId"] = "FD24E63E-421A-4b25-9E28-274B4B7A2263";
    if (!IsNull(reportId)) $v_2.get_query()["WizardInput"] = reportId;
    var $v_3 = {};
    $v_3["isOrgReport"] = createOrgReport;
    return openStdDlg($v_2, $v_3, $v_0, $v_1, true, false, null)
};
Mscrm.ReportUtil.viewReport = function (reportViewType, reportId, fileName, action, snapshotId) {
    switch (reportViewType) {
        case 1:
            if (action === "dblclick") action = "filter";
            var $v_0 = Mscrm.CrmUri.create("");
            $v_0.get_query()["helpID"] = fileName;
            $v_0.get_query()["action"] = action;
            if (!IsNull(snapshotId)) $v_0.get_query()["snapshotID"] = snapshotId;
            openObj(9100, reportId, $v_0.toString(), "", 0, null);
            break;
        case 3:
            if (action === "filter" || action === "editfilter") {
                alert(window.LOCID_NON_SRS_FILTERSCHEDULE);
                return
            }
            Mscrm.ReportUtil.downloadReport(reportId);
            break;
        case 2:
        case 4:
            if (action === "filter" || action === "editfilter") {
                alert(window.LOCID_NON_SRS_FILTERSCHEDULE);
                return
            }
            var $v_1 = Mscrm.WindowInformation.getWindowInformation(9100);
            $v_1.Url.get_query()["id"] = reportId;
            openStdWin($v_1.Url, buildWinName(null), $v_1.Width, $v_1.Height, "scrollbars=1,toolbar=1,menubar=1,location=1");
            break
    }
};
Mscrm.ReportUtil.getReportCopySuffix = function (formatString) {
    var $v_0 = Mscrm.DateTimeUtility.localDateTimeNow(),
        $v_1 = String.format(window.LOCID_DATE_TIME_ORDER_FORMAT, Mscrm.DateTimeUtility.formatDate($v_0), timeToString($v_0, 0)),
        $v_2 = String.format(formatString, "{0}", $v_1);
    return $v_2.replace(new RegExp('[;\\?:@&=\\+\\$,\\\\\\*<>\\|"\\/]', "g"), "_")
};
Mscrm.ReportUtil.get_reportInformation = function () {
    return Mscrm.ReportUtil.$3A
};
Mscrm.ReportUtil.generateReportMenuXml = function (commandProperties, entityLogicalName, isForm, ribbonSelectionControl) {
    if (!Mscrm.ReportUtil.$2M || !Mscrm.ReportUtil.$31 || entityLogicalName !== Mscrm.ReportUtil.$31) {
        Mscrm.ReportUtil.$3A = {};
        Mscrm.ReportUtil.$31 = entityLogicalName;
        var $v_1 = Mscrm.ReportUtil.$6N(entityLogicalName, isForm, ribbonSelectionControl),
            $v_2 = new RemoteCommand("Reports", "GenerateReportMenuXml", null);
        $v_2.SetParameter("entityLogicalName", entityLogicalName);
        $v_2.SetParameter("menuId", $v_1);
        $v_2.SetParameter("isForm", isForm.toString());
        $v_2.SetParameter("ribbonContext", ribbonSelectionControl.get_ribbonContextType());
        $v_2.SetParameter("ribbonRelationshipType", ribbonSelectionControl.get_ribbonRelationshipType());
        var $v_3 = $v_2.Execute();
        Mscrm.ReportUtil.$2M = $v_3.ReturnValue
    }
    var $v_0 = Mscrm.ReportUtil.$2M.Reports.ReportInformation;
    if (!IsNull($v_0)) {
        var $v_4;
        if (isArray($v_0)) $v_4 = $v_0;
        else $v_4 = [$v_0];
        for (var $v_5 = 0; $v_5 < $v_4.length; $v_5++) {
            var $v_6 = $v_4[$v_5];
            Mscrm.ReportUtil.$3A[$v_6.ID] = $v_6
        }
    }
    commandProperties["PopulationXML"] = Mscrm.ReportUtil.$2M.MenuXml;
    commandProperties["SuppressCommandIncludes"] = true
};
Mscrm.ReportUtil.$6N = function ($p0, $p1, $p2) {
    var $v_0 = "NoRelationship";
    switch ($p2.get_ribbonRelationshipType()) {
        case 1:
            $v_0 = "OneToMany";
            break;
        case 2:
            $v_0 = "ManyToMany";
            break
    }
    var $v_1;
    if ($p1) $v_1 = "Form";
    else if ($p2.get_ribbonContextType() === "HomePageGrid") $v_1 = "HomepageGrid";
    else $v_1 = "SubGrid";
    var $v_2 = String.format("{0}|{1}|{2}|Mscrm.{3}.{0}.{4}", $p0, $v_0, $p2.get_ribbonContextType(), $v_1, $p1 ? "Reports" : "RunReport");
    return $v_2
};

function refreshRibbon() {
    Mscrm.RibbonUtility.$f(32, null, null)
}
function isRibbonControlVisible(command, id) {
    return Mscrm.RibbonUtility.$5A(34, command, id)
}
function isRibbonControlEnabled(command, id) {
    return Mscrm.RibbonUtility.$5A(33, command, id)
}
function executeRibbonCommand(command) {
    var $v_0 = {};
    $v_0["command"] = command;
    Mscrm.RibbonUtility.$f(31, $v_0, null)
}
function getXmlFromExecuteRibbonCommand(command) {
    var $v_0 = {};
    $v_0["command"] = command;
    $v_0["getRibbonXmlForOutlookClient"] = true;
    Mscrm.RibbonUtility.$f(31, $v_0, null);
    return $v_0["RibbonXmlForOutlookClientResult"]
}
function unloadRibbonData(rd) {
    Mscrm.RibbonUtility.$f(36, null, rd)
}
function loadRibbonData(rd, initialTabId) {
    var $v_0 = {};
    if (!isNullOrEmptyString(initialTabId)) $v_0["initialTabId"] = initialTabId;
    Mscrm.RibbonUtility.$f(35, $v_0, rd)
}
function raiseTabSwitchEvent(tabSwitchData) {
    Mscrm.RibbonUtility.$f(39, tabSwitchData, null)
}
function raiseRibbonRootEvent(rootEventData) {
    Mscrm.RibbonUtility.$f(37, rootEventData, null)
}
function setSelectedControl(control) {
    var $v_0 = {};
    $v_0["selectedControl"] = control;
    Mscrm.RibbonUtility.$f(38, $v_0, null)
}
function setFocusOnRibbon(keyPressEventTarget) {
    var $v_0 = new Mscrm.RibbonKeyPressParameters;
    $v_0.eventElement = keyPressEventTarget;
    Mscrm.RibbonUtility.$f(55, $v_0, null)
}
function setFocusOnLastRibbonControl(keyPressEventTarget) {
    var $v_0 = new Mscrm.RibbonKeyPressParameters;
    $v_0.eventElement = keyPressEventTarget;
    Mscrm.RibbonUtility.$f(56, $v_0, null)
}
function ribbonDebugAlert(value) {}
Mscrm.RibbonUtility = function () {};
Mscrm.RibbonUtility.$5A = function ($p0, $p1, $p2) {
    var $v_0 = {};
    $v_0["command"] = $p1;
    $v_0["id"] = $p2;
    for (var $v_1 = Mscrm.RibbonUtility.$f($p0, $v_0, null), $v_2 = false, $v_3 = 0; $v_3 < $v_1.length; $v_3++) if ($v_1[$v_3]) $v_2 = true;
    return $v_2
};
Mscrm.RibbonUtility.$f = function ($p0, $p1, $p2) {
    var $v_0 = Mscrm.RibbonUtility.$6Z();
    if (!IsNull($v_0)) {
        var $v_1 = $v_0.$4_1;
        if (!IsNull($v_1)) return $v_1.raiseEvent($p0, $p1, $p2)
    }
    return []
};
Mscrm.RibbonUtility.$6Z = function () {
    var $v_0 = Mscrm.PageManager.get_instance();
    if (!IsNull($v_0)) return $v_0;
    var $v_1 = window.parent;
    while (!IsNull($v_1) && IsNull($v_0)) {
        var $v_2 = $v_1.Mscrm.PageManager;
        if (!IsNull($v_2)) $v_0 = $v_2.get_instance();
        var $v_3 = $v_1.parent;
        $v_1 = $v_3 === $v_1 ? null : $v_3
    }
    return $v_0
};

function storeScriptCrashData(crashData) {
    Mscrm.ScriptErrorReporting.$5t(crashData)
}
function promptAndReportScriptErrors() {
    Mscrm.ScriptErrorReporting.$2W(null)
}
function reportScriptError(crashData, addServerInformation, synchronous) {
    Mscrm.ScriptErrorReporting.$5k(crashData, addServerInformation, synchronous)
}
function catchError(message, url, line, reportToWatson, caller, exceptionNumber) {
    try {
        var $v_0 = caller;
        if (window._DebugOnScriptError) debugger;
        if (!Mscrm.ScriptErrorReporting.$7H() && (window.ScriptErrorReportingPreference === 1 || window.ScriptErrorReportingPreference === 2)) {
            window.status = window.LOCID_SCRIPT_ERROR_STATUS_BAR;
            var $v_1 = "",
                $v_2 = "";
            if (!$v_0) $v_0 = arguments.callee.caller;
            if (typeof $v_0 !== "undefined" && $v_0) {
                var $v_4 = $v_0.callee;
                if (typeof $v_4 === "undefined") $v_4 = $v_0;
                var $v_5 = 0;
                while ($v_4 && $v_5 < 20) {
                    var $v_6 = new RegExp("\\s", "g"),
                        $v_7 = $v_4.toString().substr(8).replace($v_6, ""),
                        $v_8 = $v_7.substring(0, $v_7.indexOf("(")),
                        $v_9 = $v_7.substring($v_7.indexOf("("), $v_7.indexOf(")") + 1);
                    if (IsNull($v_8) || !$v_8.length || $v_8 === "anonymous") $v_8 = "anonymous" + $v_7;
                    else $v_8 += $v_9;
                    if (!$v_5) $v_2 = $v_8.substring(0, 255);
                    $v_1 += "    <Function>" + CrmEncodeDecode.CrmXmlEncode($v_8) + "</Function>\r\n";
                    $v_4 = $v_4.caller;
                    $v_5++
                }
            }
            var $v_3 = Mscrm.ScriptErrorReporting.$6I(message, url, line, $v_2, $v_1, reportToWatson, exceptionNumber);
            isOutlookHostedWindow() && getOutlookHostedWindow().reportCrash(message, url, line, $v_2, $v_1, reportToWatson);
            if (window.ScriptErrorReportingPreference === 1) exceptionNumber !== -2146823277 && message !== "Can't execute code from a freed script" && Mscrm.ScriptErrorReporting.$5t($v_3);
            else {
                Mscrm.ScriptErrorReporting.$5k($v_3, true, false);
                window.status = ""
            }
            return true
        }
    } catch ($$e_G) {}
    return false
}
Mscrm.ScriptErrorReporting = function () {
    Mscrm.ScriptErrorReporting.initializeBase(this)
};
Mscrm.ScriptErrorReporting.$$cctor = function () {
    var $v_0 = {};
    $v_0["subscribedEvents"] = [29];
    $create(Mscrm.ScriptErrorReporting, $v_0, null, null, null);
    window.onerror = window.catchError;
    $addHandler(window, "beforeunload", Mscrm.ScriptErrorReporting.$2W)
};
Mscrm.ScriptErrorReporting.$5t = function ($p0) {
    if (window.parent !== window.self && window.parent.storeScriptCrashData) {
        window.parent.storeScriptCrashData($p0);
        return
    }
    if (!Mscrm.ScriptErrorReporting.$14) Mscrm.ScriptErrorReporting.$14 = new Array(0);
    if (Mscrm.ScriptErrorReporting.$14.length < 7) Mscrm.ScriptErrorReporting.$14[Mscrm.ScriptErrorReporting.$14.length] = $p0
};
Mscrm.ScriptErrorReporting.$2W = function ($p0) {
    try {
        try {
            if (window.parent !== window.self && window.parent.promptAndReportScriptErrors) {
                window.parent.promptAndReportScriptErrors();
                return
            }
        } catch ($$e_1) {
            return
        }
        if (Mscrm.ScriptErrorReporting.$14 && window.ScriptErrorReportingPreference === 1) {
            var $v_0 = Mscrm.WindowInformation.getWindowInformation(9200);
            openStdDlg(Mscrm.CrmUri.create("/_common/error/dlg_scriptError.aspx"), Mscrm.ScriptErrorReporting.$14, $v_0.Width, $v_0.Height, true, false, null);
            Mscrm.ScriptErrorReporting.$14 = null;
            window.status = ""
        }
    } catch ($$e_3) {}
};
Mscrm.ScriptErrorReporting.$6I = function ($p0, $p1, $p2, $p3, $p4, $p5, $p6) {
    var $v_0 = new Mscrm.CrashData;
    $v_0.lineNumber = $p2;
    $v_0.func = $p3;
    $v_0.reportToWatson = IsNull($p5) ? true : $p5;
    var $v_1 = Mscrm.CrmUri.create($p1),
        $v_2 = Mscrm.CrmUri.create(window.location.href);
    $v_1.set_scheme($v_2.set_scheme(""));
    $v_1.set_host($v_2.set_host(""));
    $v_1.set_port($v_2.set_port(-1));
    $v_1.set_useOrganizationName($v_2.set_useOrganizationName(false));
    $v_0.fileName = $v_1.get_path();
    var $v_3 = "Web";
    if (Mscrm.SessionInfo.isOutlookLaptopClient()) $v_3 = "Outlook Laptop - " + (Mscrm.SessionInfo.isOnline() ? "Online" : "Offline");
    else if (Mscrm.SessionInfo.isOutlookWorkstationClient()) $v_3 = "Outlook Desktop";
    $v_0.report = "<CrmScriptErrorReport>\r\n  <ReportVersion>1.0</ReportVersion>\r\n  <ScriptErrorDetails>\r\n   <Message>" + CrmEncodeDecode.CrmXmlEncode($p0) + "</Message>\r\n" + (!IsNull($p6) ? "   <ExceptionNumber>" + CrmEncodeDecode.CrmXmlEncode($p6.toString()) + "</ExceptionNumber>\r\n" : "") + "   <Line>" + $p2 + "</Line>\r\n   <URL>" + CrmEncodeDecode.CrmXmlEncode($v_1.toString()) + "</URL>\r\n   <PageURL>" + CrmEncodeDecode.CrmXmlEncode($v_2.toString()) + "</PageURL>\r\n   <Function>" + CrmEncodeDecode.CrmXmlEncode($p3) + "</Function>\r\n   <CallStack>\r\n" + $p4 + "   </CallStack>\r\n  </ScriptErrorDetails>\r\n  <ClientInformation>\r\n   <BrowserUserAgent>" + CrmEncodeDecode.CrmXmlEncode(window.navigator.userAgent) + "</BrowserUserAgent>\r\n   <BrowserLanguage>" + CrmEncodeDecode.CrmXmlEncode(window.navigator.browserLanguage) + "</BrowserLanguage>\r\n   <SystemLanguage>" + CrmEncodeDecode.CrmXmlEncode(window.navigator.systemLanguage) + "</SystemLanguage>\r\n   <UserLanguage>" + CrmEncodeDecode.CrmXmlEncode(window.navigator.userLanguage) + "</UserLanguage>\r\n   <ScreenResolution>" + window.screen.width + "x" + window.screen.height + "</ScreenResolution>\r\n   <ClientName>" + $v_3 + "</ClientName>\r\n   <ClientTime>" + CrmEncodeDecode.CrmXmlEncode(FormatDateTime(new Date)) + "</ClientTime>\r\n  </ClientInformation>\r\n</CrmScriptErrorReport>\r\n";
    return $v_0
};
Mscrm.ScriptErrorReporting.$5k = function ($p0, $p1, $p2) {
    var $v_0 = new RemoteCommand("ScriptError", "SendScriptErrorReport", null);
    $v_0.SetParameter("fileName", $p0.fileName);
    $v_0.SetParameter("lineNumber", $p0.lineNumber.toString());
    $v_0.SetParameter("function", $p0.func);
    $v_0.SetParameter("errorReport", $p0.report);
    $v_0.SetParameter("addServerInformation", $p1.toString());
    $v_0.SetParameter("errorReportingPreference", Mscrm.ReportingPreference.toString(window.ScriptErrorReportingPreference));
    $v_0.SetParameter("reportToWatson", $p0.reportToWatson.toString());
    $v_0.ErrorHandler = function () {};
    if ($p2) $v_0.Execute(null);
    else $v_0.Execute(Mscrm.ScriptErrorReporting.$6P)
};
Mscrm.ScriptErrorReporting.$7H = function () {
    var $v_0 = window.SUPPRESS_SCRIPT_ERRORS;
    return !!$v_0
};
Mscrm.ScriptErrorReporting.$6P = function ($p0, $p1) {};
Mscrm.ScriptErrorReporting.prototype = {
    handleEvent: function ($p0, $p1, $p2) {
        switch ($p0) {
            case 29:
                Mscrm.ScriptErrorReporting.$2W(null);
                break
        }
        return Mscrm.CrmUIComponent.prototype.handleEvent.call(this, $p0, $p1, $p2)
    },
    dispose: function () {
        Mscrm.ScriptErrorReporting.$2W(null);
        $removeHandler(window, "beforeunload", Mscrm.ScriptErrorReporting.$2W);
        Mscrm.CrmUIComponent.prototype.dispose.call(this)
    }
};
Mscrm.SessionInfo = function () {};
Mscrm.SessionInfo.isOutlookClient = function () {
    return window.IS_OUTLOOK_CLIENT
};
Mscrm.SessionInfo.isOutlook14Client = function () {
    return window.IS_OUTLOOK_14_CLIENT
};
Mscrm.SessionInfo.getClientMajorVersion = function () {
    var $v_0 = window.CLIENT_MAJOR_VERSION;
    if (!$v_0) return null;
    else return $v_0
};
Mscrm.SessionInfo.getOutlookMajorVersion = function () {
    var $v_0 = window.OUTLOOK_MAJOR_VERSION;
    if (!$v_0) return null;
    else return $v_0
};
Mscrm.SessionInfo.isOutlookWorkstationClient = function () {
    return Mscrm.SessionInfo.isOutlookClient() && document.cookie.indexOf("LightClient") !== -1
};
Mscrm.SessionInfo.isOutlookLaptopClient = function () {
    return window.IS_OUTLOOK_LAPTOP_CLIENT
};
Mscrm.SessionInfo.isOnline = function () {
    return window.IS_ONLINE
};
Mscrm.SessionInfo.isHelpContext = function () {
    return !(IsNull(window.HELP_CONTEXT) || window.HELP_CONTEXT !== 1)
};
Mscrm.SessionInfo.get_appendBaseSchemeAndHost = function () {
    return Mscrm.SessionInfo.$28
};
Mscrm.SessionInfo.set_appendBaseSchemeAndHost = function (value) {
    Mscrm.SessionInfo.$28 = value;
    return value
};

function IsOutlookClient() {
    return Mscrm.SessionInfo.isOutlookClient()
}
function IsOutlook14Client() {
    return Mscrm.SessionInfo.isOutlook14Client()
}
function getOutlookMajorVersion() {
    return Mscrm.SessionInfo.getOutlookMajorVersion()
}
function IsOutlookWorkstationClient() {
    return Mscrm.SessionInfo.isOutlookWorkstationClient()
}
function IsOutlookLaptopClient() {
    return Mscrm.SessionInfo.isOutlookLaptopClient()
}
function IsOnline() {
    return Mscrm.SessionInfo.isOnline()
}
function IsHelpContext() {
    return Mscrm.SessionInfo.isHelpContext()
}
Mscrm.Shortcuts = function () {};
Mscrm.Shortcuts.getViewUrl = function () {
    var $v_0 = window.location.href,
        $v_1 = null;
    if (!Mscrm.SessionInfo.isOnline()) {
        var $v_3 = window.location.pathname;
        $v_1 = Mscrm.CrmUri.create(Mscrm.Help.concatenateUrl(window.WEB_APP_URL, $v_0.substr($v_0.indexOf($v_3))));
        $v_1.set_useOrganizationName(false)
    } else {
        $v_0 = $v_0.substring(0, $v_0.indexOf(window.location.pathname));
        $v_1 = Mscrm.Utilities.getContentUrl(null)
    }
    $v_1 = Mscrm.Utilities.getPageUrl($v_1, "entitylist");
    var $v_2 = window._homepageParameterInfo;
    if (!IsNull($v_2)) {
        for (var $v_5 = 0; $v_5 < $v_2.length; $v_5++) {
            var $v_6 = $v_2[$v_5],
                $v_7 = $get($v_6.controlId);
            if (!IsNull($v_7) && !IsNull($v_7.DataValue)) $v_1.get_query()[$v_6.parameterName] = $v_7.DataValue
        }
        var $v_4 = $get("crmGrid_SavedQuerySelector");
        if (!IsNull($v_4)) $v_1.get_query()["viewtype"] = getViewType($v_4)
    }
    if (Mscrm.SessionInfo.isOnline()) $v_1 = Mscrm.CrmUri.create(Mscrm.Help.concatenateUrl($v_0, $v_1.get_path() + $v_1.get_queryString()));
    return $v_1
};
Mscrm.Shortcuts.openEmailForm = function (to, subject, body) {
    var $v_0 = new Sys.StringBuilder;
    $v_0.append("mailto:");
    $v_0.append(CrmEncodeDecode.CrmUrlEncode(to));
    $v_0.append("?");
    if (!IsNull(subject) && subject.length > 0) {
        $v_0.append("subject=");
        $v_0.append(CrmEncodeDecode.CrmUrlEncode(subject));
        $v_0.append("&")
    }
    if (!IsNull(body)) {
        $v_0.append("body=");
        $v_0.append(CrmEncodeDecode.CrmUrlEncode(body))
    }
    var $v_1 = $v_0.toString();
    if ($v_1.length > 2020) openErrorDlg("0x80044331", null, null, 0, 0);
    else {
        var $v_2;
        $v_2 = document.createElement("IFrame");
        $v_2.style.display = "none";
        $v_2.src = $v_1;
        document.documentElement.appendChild($v_2);
        window.setTimeout(function () {
            document.documentElement.removeChild($v_2);
            $v_2 = null
        }, 50)
    }
};
Mscrm.Shortcuts.openPhoneWindow = function (phoneNumber, countryCode) {
    var $v_0 = new RegExp("[-()\\s]", "g");
    phoneNumber = phoneNumber.replace($v_0, "");
    var $v_1 = new RegExp("^[0-9]", "i");
    if ($v_1.test(phoneNumber) && !isNullOrEmptyString(countryCode)) phoneNumber = countryCode + phoneNumber;
    var $v_2 = "callto:" + phoneNumber,
        $v_3 = Mscrm.CrmUri.createForOrganization($v_2, null);
    $v_3.checkParamsNoEqual = true;
    safeWindowOpen($v_3, "", "")
};
Mscrm.Shortcuts.copyTextToClipboard = function (text, successMessage, failMessage) {
    var $v_0 = new XUI.ClipboardManager,
        $v_1 = 2,
        $v_2 = null;
    while ($v_1 > 0 && !$v_2) {
        $v_0.SetData(text);
        $v_2 = $v_0.GetData();
        $v_1--
    }
    if (!IsNull($v_2) && $v_2.length > 0)!IsNull(successMessage) && successMessage.length > 0 && alert(successMessage);
    else !IsNull(failMessage) && failMessage.length > 0 && alert(failMessage)
};
Mscrm.SolutionDecorater = function () {};
Mscrm.SolutionDecorater.setSolutionIdInRequestHeader = function (xmlHttp) {
    var $v_0 = $get("crmFormSubmit");
    if (!IsNull($v_0))!IsNull($v_0.appSolutionId) && $v_0.appSolutionId.value !== "" && xmlHttp.setRequestHeader($v_0.appSolutionId.id, $v_0.appSolutionId.value);
    else !IsNull(window.APP_SOLUTION_ID) && window.APP_SOLUTION_ID !== "" && xmlHttp.setRequestHeader(Mscrm.SolutionDecorater.solutionId, window.APP_SOLUTION_ID)
};
Mscrm.SolutionDecorater.setSolutionIdInQuerystring = function (url) {
    if (!Mscrm.SolutionDecorater.$6r(url.get_path())) return;
    var $v_0 = $get("crmFormSubmit");
    if (!IsNull($v_0)) {
        if (!IsNull($v_0.appSolutionId) && $v_0.appSolutionId.value !== "") url.get_query()[$v_0.appSolutionId.id] = $v_0.appSolutionId.value
    } else if (!IsNull(window.APP_SOLUTION_ID) && window.APP_SOLUTION_ID !== "") url.get_query()[Mscrm.SolutionDecorater.solutionId] = window.APP_SOLUTION_ID
};
Mscrm.SolutionDecorater.removeSolutionIdFromQuerystring = function (url) {
    if (!IsNull(url) && !IsNull(url.get_query())) delete url.get_query()[Mscrm.SolutionDecorater.solutionId]
};
Mscrm.SolutionDecorater.$6r = function ($p0) {
    var $v_0 = $p0.toUpperCase(),
        $v_1 = $v_0.split("/");
    isNullOrEmptyString(Mscrm.SolutionDecorater.$3X) && Mscrm.SolutionDecorater.$6i();
    for (var $v_2 = "", $v_3 = 0; $v_3 < $v_1.length; $v_3++) {
        if (!$v_1[$v_3].length) continue;
        $v_2 += "/" + $v_1[$v_3];
        if (Mscrm.SolutionDecorater.$4L.indexOf($v_2 + "|") >= 0) return false
    }
    $v_2 = "";
    for (var $v_4 = 0; $v_4 < $v_1.length; $v_4++) {
        if (!$v_1[$v_4].length) continue;
        $v_2 += "/" + $v_1[$v_4];
        if (Mscrm.SolutionDecorater.$3X.indexOf($v_2 + "|") >= 0) return true
    }
    return false
};
Mscrm.SolutionDecorater.$6i = function () {
    Mscrm.SolutionDecorater.$3X = "/TOOLS/CONTRACTTYPEMANAGER|\r\n\t\t\t\t\t\t\t\t/TOOLS/EMAILTEMPLATEEDITOR|\r\n\t\t\t\t\t\t\t\t/TOOLS/EMAILTEMPLATEMANAGER|\r\n\t\t\t\t\t\t\t\t/TOOLS/FORMEDITOR|\r\n\t\t\t\t\t\t\t\t/TOOLS/KBTEMPLATEEDITOR|\r\n\t\t\t\t\t\t\t\t/TOOLS/KBTEMPLATEMANAGER|\r\n\t\t\t\t\t\t\t\t/TOOLS/MAILMERGE|\r\n\t\t\t\t\t\t\t\t/TOOLS/MANAGEMAPS|\r\n\t\t\t\t\t\t\t\t/TOOLS/MUIPROVISIONING|\r\n\t\t\t\t\t\t\t\t/TOOLS/PUBLISHER|\r\n\t\t\t\t\t\t\t\t/TOOLS/RELATIONSHIPROLEEDITOR|\r\n\t\t\t\t\t\t\t\t/TOOLS/RELATIONSHIPROLEMANAGER|\r\n\t\t\t\t\t\t\t\t/TOOLS/SOLUTION|\r\n\t\t\t\t\t\t\t\t/TOOLS/SYSTEMCUSTOMIZATION|\r\n\t\t\t\t\t\t\t\t/TOOLS/TEMPLATES|\r\n\t\t\t\t\t\t\t\t/TOOLS/VIEWEDITOR|\r\n\t\t\t\t\t\t\t\t/SFA/WORKFLOW|\r\n\t\t\t\t\t\t\t\t/REPORTS|\r\n\t\t\t\t\t\t\t\t/BIZ/ROLES|\r\n\t\t\t\t\t\t\t\t/BIZ/USERS|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_ACTIVATE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_CONFIRM_DELETE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_DEACTIVATE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_DELETE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_PUBLISHMAILMERGETEMPLATE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_PUBLISHSOLUTION.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_ROLE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_UNPUBLISH.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_UNPUBLISHMAILMERGETEMPLATE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_WEBMAILMERGE.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_DELETEIMPORTEDRECORDS.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_UNPUBLISH.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_ADDSOLUTIONCOMPONENT.ASPX|\r\n\t\t\t\t\t\t\t\t/MAIN.ASPX|\r\n\t\t\t\t\t\t\t\t/CONNECTIONS/CONNECTIONROLES|\r\n\t\t\t\t\t\t\t\t/TOOLS/DEPENDENCY|\r\n\t\t\t\t\t\t\t\t/TOOLS/WEBRESOURCEEDITOR/WEBRESOURCEEDITOR.ASPX|\r\n\t\t\t\t\t\t\t\t/_CONTROLS/LOOKUP/LOOKUPINFO.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_ADDITEM.ASPX|\r\n\t\t\t\t\t\t\t\t/TOOLS/SOLUTION/MANAGEDPROPERTY/MANAGEDPROPERTYEDITOR.ASPX|\r\n\t\t\t\t\t\t\t\t/TOOLS/DASHBOARDEDITOR/DASHBOARDEDITOR.ASPX|\r\n\t\t\t\t\t\t\t\t/CRMREPORTS/REPORTPROPERTY.ASPX|\r\n\t\t\t\t\t\t\t\t/TOOLS/VISUALIZATIONDESIGNER/VISUALIZATIONDESIGNER.ASPX|\r\n\t\t\t\t\t\t\t\t/VISUALIZATION/CMDS/DLG_IMPORTVISUALIZATION.ASPX|\r\n\t\t\t\t\t\t\t\t/VISUALIZATION/SAVEVISUALIZATION.ASPX|\r\n\t\t\t\t\t\t\t\t/BIZ/FIELDSECURITYPROFILES|\r\n\t\t\t\t\t\t\t\t/WEBWIZARD/WIZARDCONTAINER.ASPX|\r\n\t\t\t\t\t\t\t\t/_GRID/CMDS/DLG_EDITATTRIBUTE.ASPX|";
    Mscrm.SolutionDecorater.$4L = "/TOOLS/SOLUTION/HOME_SOLUTION.ASPX|"
};

function GetWindowInformation(objectTypeCode) {
    return Mscrm.WindowInformation.getWindowInformation(objectTypeCode)
}
Mscrm.WindowInformation = function () {};
Mscrm.WindowInformation.getWindowInformation = function (objectTypeCode) {
    var $v_0 = Mscrm.CrmUri.create("/_common/windowinformation/windowinformation.js.aspx");
    $v_0.set_useCssLcid(true);
    Mscrm.CrmHeader.setScriptFile($v_0, true);
    var $v_1 = Mscrm.Imported.WindowInformationImplementation.getWindowInformationInternal(objectTypeCode);
    if (!$v_1.Height) $v_1.Height = parseInt(window.screen.availHeight * .9);
    return $v_1
};
Mscrm.WrpcTokenFuncs = function () {};
Mscrm.WrpcTokenFuncs.setTokenInHeader = function (xmlHttp, url) {
    url = Mscrm.WrpcTokenFuncs.formatUrlForToken(url);
    var $v_0 = Mscrm.WrpcTokenFuncs.getCrmWrpcToken(url);
    if ($v_0) {
        xmlHttp.setRequestHeader("CRMWRPCToken", $v_0.Token);
        xmlHttp.setRequestHeader("CRMWRPCTokenTimeStamp", $v_0.Timestamp.toString())
    }
};
Mscrm.WrpcTokenFuncs.getTokenAsQS = function (url) {
    url = Mscrm.WrpcTokenFuncs.formatUrlForToken(url);
    var $v_0 = Mscrm.WrpcTokenFuncs.getCrmWrpcToken(url);
    if ($v_0) return "CRMWRPCToken=" + CrmEncodeDecode.CrmUrlEncode($v_0.Token) + "&CRMWRPCTokenTimeStamp=" + CrmEncodeDecode.CrmUrlEncode($v_0.Timestamp.toString());
    return ""
};
Mscrm.WrpcTokenFuncs.setCrmWrpcToken = function (url, token, timestamp) {
    var $v_0 = {};
    $v_0.Token = token;
    $v_0.Timestamp = timestamp;
    window._aWrpcTokens[url.toString().toUpperCase()] = $v_0
};
Mscrm.WrpcTokenFuncs.getCrmWrpcToken = function (url) {
    if (IsNull(url)) return null;
    var $v_0 = window._aWrpcTokens[url.toString().toUpperCase()];
    if (IsNull($v_0)) return null;
    var $v_1 = $v_0.Token,
        $v_2 = $v_0.Timestamp,
        $v_3 = new Mscrm.WrpcToken;
    $v_3.Token = $v_1;
    $v_3.Timestamp = $v_2;
    $v_3.Url = url;
    return $v_3
};
Mscrm.WrpcTokenFuncs.formatUrlForToken = function (url) {
    var $v_0 = IsNull(url) ? "" : url.toString();
    if (!$v_0.length) {
        $v_0 = window.location.pathname;
        if ($v_0.length < 1 || $v_0.charAt(0) !== "/") $v_0 = "/" + $v_0
    }
    var $v_1 = Mscrm.CrmUri.create($v_0);
    $v_1.clearQuery();
    return $v_1
};

function SetTokenInHeader(xmlHttp, url) {
    Mscrm.WrpcTokenFuncs.setTokenInHeader(xmlHttp, url)
}
function GetTokenAsQS(url) {
    return Mscrm.WrpcTokenFuncs.getTokenAsQS(url)
}
function SetCrmWrpcToken(url, token, timestamp) {
    Mscrm.WrpcTokenFuncs.setCrmWrpcToken(url, token, timestamp)
}
function GetCrmWrpcToken(url) {
    return Mscrm.WrpcTokenFuncs.getCrmWrpcToken(url)
}
function formatUrlForToken(url) {
    return Mscrm.WrpcTokenFuncs.formatUrlForToken(url)
}
Mscrm.WrpcToken = function () {};
Mscrm.WrpcToken.prototype = {
    Timestamp: 0,
    Token: null,
    Url: null
};
Mscrm.ContextMenuAction = function () {};
Mscrm.Utilities = function () {};
Mscrm.Utilities.isMainApplicationPage = function () {
    var $v_0 = false,
        $v_1 = Mscrm.CrmUri.create(window.location.href);
    if (isNullOrEmptyString($v_1.get_query()["pagetype"])) $v_0 = true;
    return $v_0
};
Mscrm.Utilities.compareGuids = function (guidA, guidB) {
    if (!IsNull(guidA) && guidA.length === 36 && guidA.charAt(0) !== "{" && guidA.charAt(35) !== "}") guidA = "{" + guidA + "}";
    if (!IsNull(guidB) && guidB.length === 36 && guidB.charAt(0) !== "{" && guidB.charAt(35) !== "}") guidB = "{" + guidB + "}";
    return guidA.toUpperCase() === guidB.toUpperCase()
};
Mscrm.Utilities.getHomePageQueryStringParams = function () {
    var $v_0 = ["etc", "etn", "viewid", "viewtype"];
    return $v_0
};
Mscrm.Utilities.getRecordPageQueryStringParams = function () {
    var $v_0 = ["etc", "etn", "id"];
    return $v_0
};
Mscrm.Utilities.getPageUrl = function (pageUrl, pageType) {
    if (!Mscrm.PageManager.isOutlookProxyPage() && !Mscrm.Utilities.isNewPageModel(pageUrl)) return pageUrl;
    if (IsNull(pageType)) return pageUrl;
    var $v_0 = null;
    switch (pageType.toUpperCase()) {
        case "ENTITYLIST":
            $v_0 = Mscrm.Utilities.getHomePageQueryStringParams();
            break;
        case "ENTITYRECORD":
            $v_0 = Mscrm.Utilities.getRecordPageQueryStringParams();
            break;
        default:
            return pageUrl
    }
    var $v_1 = Mscrm.Utilities.removeExtraQSParameters(pageUrl, $v_0);
    $v_1.set_path("/main.aspx");
    $v_1.get_query()["pagetype"] = pageType;
    delete $v_1.get_query().pagemode;
    delete pageUrl.get_query().pagetype;
    var $v_2 = pageUrl.get_queryString();
    if ($v_2.length > 0) $v_1.get_query()["extraqs"] = $v_2;
    return $v_1
};
Mscrm.Utilities.removeExtraQSParameters = function (pageUrl, qsParams) {
    for (var $v_0 = Mscrm.CrmUri.create(pageUrl.toString().split("?")[0]), $v_1 = 0; $v_1 < qsParams.length; $v_1++) {
        var $v_2 = qsParams[$v_1];
        if (!IsNull(pageUrl.get_query()[$v_2])) {
            $v_0.get_query()[$v_2] = pageUrl.get_query()[$v_2];
            delete pageUrl.get_query()[$v_2]
        }
    }
    return $v_0
};
Mscrm.Utilities.getHomePageUrlForRecordPage = function (homepage, defaultUrl) {
    var $v_0 = defaultUrl;
    switch (homepage.get_path()) {
        case "/sfa/accts/edit.aspx":
            $v_0 = Mscrm.CrmUri.create("/_root/homepage.aspx?etc=1");
            break;
        case "/sfa/conts/edit.aspx":
            $v_0 = Mscrm.CrmUri.create("/_root/homepage.aspx?etc=2");
            break;
        case "/sfa/leads/edit.aspx":
            $v_0 = Mscrm.CrmUri.create("/_root/homepage.aspx?etc=4");
            break;
        case "/sfa/opps/edit.aspx":
            $v_0 = Mscrm.CrmUri.create("/_root/homepage.aspx?etc=3");
            break;
        case "/cs/cases/edit.aspx":
            $v_0 = Mscrm.CrmUri.create("/_root/homepage.aspx?etc=112");
            break;
        case "/userdefined/edit.aspx":
            var $v_1 = homepage.get_query()["etc"];
            $v_0 = Mscrm.CrmUri.create("/_root/homepage.aspx");
            $v_0.get_query()["etc"] = $v_1;
            break;
        case "/ma/camps/edit.aspx":
            $v_0 = Mscrm.CrmUri.create("homepage.aspx?etc=4400");
            break;
        default:
            break
    }
    return $v_0
};
Mscrm.Utilities.getResourceCenterUrlAndParams = function (strFwLink, httpsFwLink) {
    var $v_0, $v_1;
    if (window.location.protocol === "http:") {
        $v_0 = "http://";
        $v_1 = strFwLink
    } else {
        $v_0 = "https://";
        $v_1 = httpsFwLink
    }
    var $v_2 = Mscrm.CrmUri.create($v_0 + "go.microsoft.com/fwlink/");
    $v_2.get_query()["LinkID"] = $v_1;
    $v_2.get_query()["clcid"] = "0x409";
    $v_2.get_query()["LangCode"] = window.USER_HELP_LCID;
    $v_2.get_query()["SkuType"] = window.HELP_CRM_SKU;
    $v_2.get_query()["Ver"] = window.APPLICATION_FULL_VERSION;
    if (!isNullOrEmptyString(window.ONLINE_TRANSACTION_TYPE)) $v_2.get_query()["tt"] = window.ONLINE_TRANSACTION_TYPE;
    return $v_2.toString()
};
Mscrm.Utilities.isNewPageModel = function (uri) {
    var $v_0 = false;
    if (uri.get_path().toUpperCase().endsWith("/HOMEPAGE.ASPX")) $v_0 = true;
    else if (uri.get_path().toUpperCase().endsWith("/USERDEFINED/EDIT.ASPX")) {
        var $v_1 = 0,
            $v_2 = uri.get_query()["etc"];
        if (!IsNull($v_2)) $v_1 = parseInt($v_2, 10);
        switch ($v_1) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 112:
                $v_0 = true;
                break;
            default:
                $v_0 = $v_1 >= 1e4;
                break
        }
    } else if (typeof _IsRefreshForm !== "undefined" && _IsRefreshForm === "1") $v_0 = true;
    return $v_0
};
Mscrm.Utilities.isValidForStickyViews = function (areaId, subAreaId) {
    if (isNullOrEmptyString(areaId) || isNullOrEmptyString(subAreaId)) return false;
    var $v_0 = false;
    switch (areaId.toUpperCase()) {
        case "WORKPLACE":
        case "SFA":
        case "MA":
        case "CS":
        case "SETTINGS":
            $v_0 = true;
            break;
        default:
            $v_0 = false;
            break
    }
    if ($v_0) switch (subAreaId.toUpperCase()) {
        case "NAV_MINICAMPS":
            $v_0 = false;
            break;
        case "NAV_DASHBOARDS":
            $v_0 = false;
            break;
        default:
            $v_0 = true;
            break
    }
    return $v_0
};
Mscrm.Utilities.isDigit = function (s) {
    var $v_0 = false;
    if (s.length === 1) {
        var $v_1 = s.charCodeAt(0);
        $v_0 = $v_1 >= 48 && $v_1 <= 57
    }
    return $v_0
};
Mscrm.Utilities.getMainPageManager = function () {
    var $v_0 = null;
    try {
        var $v_1 = Mscrm.CrmUri.create(window.location.href),
            $v_2 = window.self;
        while ($v_2 !== $v_2.parent) {
            $v_2 = $v_2.parent;
            var $v_3 = Mscrm.CrmUri.create($v_2.location.href);
            if ($v_3.get_path().toUpperCase().endsWith("/MAIN.ASPX")) {
                $v_0 = $v_2.Sys.Application.findComponent("crmPageManager");
                break
            }
        }
    } catch ($$e_4) {
        $v_0 = null
    }
    return $v_0
};
Mscrm.Utilities.createGuid = function () {
    for (var $v_0 = "", $v_1 = 0; $v_1 < 8; $v_1++) $v_0 += Math.floor(Math.random() * 15).toString(15);
    $v_0 += "-";
    for (var $v_2 = 0; $v_2 < 4; $v_2++) $v_0 += Math.floor(Math.random() * 15).toString(15);
    $v_0 += "-";
    for (var $v_3 = 0; $v_3 < 4; $v_3++) $v_0 += Math.floor(Math.random() * 15).toString(15);
    $v_0 += "-";
    for (var $v_4 = 0; $v_4 < 4; $v_4++) $v_0 += Math.floor(Math.random() * 15).toString(15);
    $v_0 += "-";
    for (var $v_5 = 0; $v_5 < 12; $v_5++) $v_0 += Math.floor(Math.random() * 15).toString(15);
    return "{" + $v_0 + "}"
};
Mscrm.Utilities.isModalDialogSupported = function () {
    var $v_0 = window.showModalDialog;
    if (!IsNull($v_0)) return true;
    return false
};
Mscrm.Utilities.isFirefox = function () {
    return Sys.Browser.agent === Sys.Browser.Firefox
};
Mscrm.Utilities.isIosDevice = function () {
    var uaString = navigator.userAgent;
    if (IsNull(uaString)) return false;
    uaString = uaString.toLowerCase();
    return uaString != "" && uaString.search("ipad|ipod|iphone") > -1
};
Mscrm.Utilities.isIE = function () {
    return Sys.Browser.agent === Sys.Browser.InternetExplorer
};
Mscrm.Utilities.executeFunctionIfModeless = function (callbackReference, value) {
    !Mscrm.Utilities.isModalDialogSupported() && Mscrm.Utilities.executeFunction(callbackReference, value)
};
Mscrm.Utilities.executeFunction = function (callbackReference, value) {
    if (!IsNull(callbackReference)) {
        var $v_0 = callbackReference.context,
            $v_1 = callbackReference.callback,
            $v_2 = callbackReference.parameters,
            $v_3 = [value];
        if (!IsNull($v_2)) for (var $v_4 = 0; $v_4 < $v_2.length; $v_4++) $v_3[$v_4 + 1] = $v_2[$v_4];
        try {
            $v_1.apply($v_0, $v_3)
        } catch ($$e_7) {
            alert(window.LOCID_IPADWINCLOSED)
        }
    }
};
Mscrm.Utilities.getExternalIFrame = function (frameElement, frameId) {
    try {
        return frameElement.contentWindow.frames[frameId]
    } catch ($$e_2) {
        return null
    }
};
Mscrm.Utilities.setReturnValue = function (value) {
    window.returnValue = Sys.Serialization.JavaScriptSerializer.serialize(value);
    var $v_0 = window.dialogArguments;
    if (!IsNull($v_0)) {
        var $v_1 = $v_0.callbackFunction;
        Mscrm.Utilities.executeFunction($v_1, value)
    }
};
Mscrm.Utilities.createCallbackFunctionObject = function (functionName, context, parameters, onlyForModeless) {
    if (IsNull(onlyForModeless)) onlyForModeless = true;
    if (!onlyForModeless || !Mscrm.Utilities.isModalDialogSupported()) {
        var $v_0 = {};
        if (IsNull(context)) context = window;
        $v_0.context = context;
        $v_0.callback = context[functionName];
        if (!IsNull(parameters)) $v_0.parameters = parameters;
        return $v_0
    }
    return null
};
Mscrm.Utilities.$1L = function ($p0, $p1) {
    if (isNullOrEmptyString($p0)) return $p1;
    if ($p0.indexOf($p1) >= 0) return $p0;
    return $p0 + " " + $p1
};
Mscrm.Utilities.flipElementHorizontally = function (element) {
    var $v_0 = element.style;
    $v_0["MozTransform"] = Mscrm.Utilities.$1L($v_0["MozTransform"], "scaleX(-1)");
    $v_0["WebkitTransform"] = Mscrm.Utilities.$1L($v_0["WebkitTransform"], "scaleX(-1)");
    $v_0["transform"] = Mscrm.Utilities.$1L($v_0["transform"], "scaleX(-1)");
    if (Mscrm.Utilities.get_ieBrowserVersion() > 0 && Mscrm.Utilities.get_ieBrowserVersion() <= 9) $v_0["filter"] = Mscrm.Utilities.$1L($v_0["filter"], "fliph")
};
Mscrm.Utilities.flipElementVertically = function (element) {
    var $v_0 = element.style;
    $v_0["MozTransform"] = Mscrm.Utilities.$1L($v_0["MozTransform"], "scaleY(-1)");
    $v_0["WebkitTransform"] = Mscrm.Utilities.$1L($v_0["WebkitTransform"], "scaleY(-1)");
    $v_0["transform"] = Mscrm.Utilities.$1L($v_0["transform"], "scaleY(-1)");
    if (Mscrm.Utilities.get_ieBrowserVersion() > 0 && Mscrm.Utilities.get_ieBrowserVersion() <= 9) $v_0["filter"] = Mscrm.Utilities.$1L($v_0["filter"], "flipv")
};
Mscrm.Utilities.cancelElementFlipping = function (element) {
    var $v_0 = element.style;
    $v_0["MozTransform"] = "";
    $v_0["WebkitTransform"] = "";
    $v_0["transform"] = "";
    $v_0["filter"] = ""
};
Mscrm.Utilities.removeAll = function (parentNode) {
    for (var $v_0 = 0; $v_0 < parentNode.length; $v_0++) {
        var $v_1 = parentNode[$v_0];
        $v_1.parentNode.removeChild($v_1)
    }
};
Mscrm.Utilities.getEventElement = function (rawEvent, tagName) {
    var $v_0 = rawEvent.target || rawEvent.srcElement;
    if (isNullOrEmptyString(tagName)) return $v_0;
    while ($v_0 && $v_0.tagName !== tagName) $v_0 = $v_0.parentNode;
    return $v_0
};
Mscrm.Utilities.eventToDomEvent = function (rawEvent) {
    return new Sys.UI.DomEvent(rawEvent)
};
Mscrm.Utilities.getDomEventElement = function (domEvent, tagName) {
    var $v_0 = domEvent.target;
    while ($v_0 && $v_0.tagName !== tagName) $v_0 = $v_0.parentNode;
    return $v_0
};
Mscrm.Utilities.getParentElementByTagName = function (node, tagName) {
    while (node && node.tagName !== tagName) node = node.parentNode;
    return node
};
Mscrm.Utilities.getAdoptedNode = function ($sn_document, node) {
    var $v_0 = node;
    if ($sn_document.adoptNode) $v_0 = $sn_document.adoptNode(node);
    return $v_0
};
Mscrm.Utilities.getEventTarget = function (rawEvent) {
    if (IsNull(rawEvent)) return null;
    return Mscrm.Utilities.eventToDomEvent(rawEvent).target
};
Mscrm.Utilities.isDefaultPrevented = function (browserEvent) {
    if (IsNull(browserEvent)) throw Error.argumentNull("browserEvent", "browserEvent must be not null.");
    if ("returnValue" in browserEvent) if (IsNull(browserEvent.returnValue)) return false;
    else return !browserEvent.returnValue;
    else if ("defaultPrevented" in browserEvent) return browserEvent.defaultPrevented;
    else if ("getPreventDefault" in browserEvent) return browserEvent.getPreventDefault();
    return false
};
Mscrm.Utilities.getDomEventKeyCode = function (domEvent) {
    if (!IsNull(domEvent.keyCode)) return domEvent.keyCode;
    return domEvent.charCode
};
Mscrm.Utilities.preventDefault = function (rawEvent) {
    if ("preventDefault" in rawEvent) {
        rawEvent.preventDefault();
        return
    }
    rawEvent.returnValue = false;
    return
};
Mscrm.Utilities.stopPropagation = function (rawEvent) {
    if ("stopPropagation" in rawEvent) {
        rawEvent.StopPropagation();
        return
    }
    rawEvent.cancelBubble = true;
    return
};
Mscrm.Utilities.getLegacyEventHandler = function (element, eventAttributeName) {
    var $v_0 = element.getAttribute(eventAttributeName);
    if (IsNull($v_0)) return null;
    if (isOfClass($v_0, "Function")) return $v_0;
    return new Function("eventObject", $v_0)
};
Mscrm.Utilities.removeLegacyEventHandler = function (element, eventAttributeName) {
    element.setAttribute(eventAttributeName, null);
    element.removeAttribute(eventAttributeName)
};
Mscrm.Utilities.getXYPos = function (obj, rtl, parent) {
    var $v_0 = {}, $v_1 = 0,
        $v_2 = 0,
        $v_3 = 0,
        $v_4 = obj;
    while (!IsNull(obj) && document.documentElement !== obj && !(!IsNull(parent) && parent === obj)) {
        if (rtl) {
            var $v_6 = obj.scrollWidth,
                $v_7 = obj.clientWidth,
                $v_8 = obj.scrollLeft;
            if ($v_6 < $v_7) $v_6 = $v_7;
            if (!$v_7 && $v_6 > 0) $v_7 = $v_6;
            if ($v_6 >= $v_7 + $v_8) $v_3 = $v_6 - $v_7 - $v_8;
            else $v_3 = $v_7 + $v_8 - $v_6;
            $v_1 += $v_3
        } else $v_1 -= obj.scrollLeft;
        $v_2 -= obj.scrollTop;
        if (obj === $v_4) {
            $v_1 += obj.offsetLeft;
            $v_2 += obj.offsetTop;
            $v_4 = obj.offsetParent
        }
        var $v_5 = XUI.Html.GetComputedStyle(obj, "position");
        obj = $v_5 === "fixed" || $v_5 === "absolute" ? obj.offsetParent : obj.parentNode
    }
    $v_0["x"] = $v_1;
    $v_0["y"] = $v_2;
    return $v_0
};
Mscrm.Utilities.getIconPath = function (entityTypeCode) {
    return Mscrm.IconUtil.getIconPath(entityTypeCode, 0).toString()
};
Mscrm.Utilities.decorateAccessKey = function (text) {
    var $v_0 = Mscrm.Utilities.getAccessKey(text);
    if (isNullOrEmptyString($v_0)) return text;
    var $v_1 = text.indexOf("&");
    if (text.length > $v_1 + 1) {
        var $v_2 = CrmEncodeDecode.CrmHtmlEncode(text.substring(0, $v_1)) + "<u>" + CrmEncodeDecode.CrmHtmlEncode(text.charAt($v_1 + 1).toString()) + "</u>";
        if (text.length > $v_1 + 2) $v_2 = $v_2 + CrmEncodeDecode.CrmHtmlEncode(text.substring($v_1 + 2, text.length));
        return $v_2
    }
    return text
};
Mscrm.Utilities.getAccessKey = function (text) {
    if (isNullOrEmptyString(text)) return "";
    var $v_0 = text.indexOf("&");
    if ($v_0 !== text.length - 1) if ($v_0 >= 0) return text.substring($v_0 + 1, $v_0 + 2);
    return ""
};
Mscrm.Utilities.getGridId = function ($sn_window) {
    if (!IsNull($sn_window)) {
        var $v_0 = $sn_window.GRID_ID;
        if (!isNullOrEmptyString($v_0)) return $v_0;
        return "crmGrid"
    }
    return null
};
Mscrm.Utilities.reloadPage = function () {
    try {
        if (window.top !== window.self) window.top.location.reload();
        else window.location.reload()
    } catch ($$e_0) {}
};
Mscrm.Utilities.getCrmGrid = function () {
    var $v_0 = Mscrm.Utilities.getGridId(window.self);
    if (!IsNull($v_0)) return $find($v_0);
    return null
};
Mscrm.Utilities.getViewURL = function (entityTypeCode, viewId, qsParam) {
    if (Mscrm.EntityPropUtil.isActivityTypeCode(entityTypeCode)) entityTypeCode = 4200;
    return String.format("_root/homepage.aspx?etc={0}&viewid={1}&{2}", CrmEncodeDecode.CrmUrlEncode(entityTypeCode.toString(10)), CrmEncodeDecode.CrmUrlEncode(viewId), qsParam)
};
Mscrm.Utilities.refreshCurrentGrid = function (entityTypeCode) {
    if (!Mscrm.PageManager.isFlatUIPage()) Mscrm.Grid.auto(entityTypeCode, null);
    else {
        var $v_0 = {};
        $v_0["etc"] = entityTypeCode;
        Mscrm.PageManager.get_instance().raiseEvent(50, $v_0)
    }
};
Mscrm.Utilities.refreshParentGrid = function (entityTypeCode, displayName, entityID) {
    try {
        if (isOutlookHostedWindow()) {
            var $v_0 = getOutlookHostedWindow();
            $v_0.notifyItemChanged(entityTypeCode, entityID)
        }
        if (!IsNull(Mscrm.PageManager.get_instance()) && !IsNull(Mscrm.PageManager.get_instance().get_parentWindowPageManager())) {
            var $v_1 = {};
            $v_1["etc"] = entityTypeCode;
            $v_1["async"] = true;
            Mscrm.PageManager.get_instance().get_parentWindowPageManager().raiseEvent(50, $v_1)
        } else window.top.opener.auto(entityTypeCode, displayName, entityID)
    } catch ($$e_5) {}
};
Mscrm.Utilities.closeCurrentWindow = function () {
    if (!IsNull(Mscrm.PageManager.get_instance())) {
        var $v_0 = Mscrm.NavigationMode.DefaultNavigationMode === 1 ? 18 : 23;
        Mscrm.PageManager.get_instance().raiseEvent($v_0, null)
    } else closeWindow()
};
Mscrm.Utilities.raiseKeyPressEvent = function (eventCode, keyPressEventTarget) {
    if (!IsNull(Mscrm.PageManager.get_instance())) {
        var $v_0 = {};
        $v_0["EventElement"] = keyPressEventTarget;
        Mscrm.PageManager.get_instance().raiseEvent(eventCode, $v_0)
    }
};
Mscrm.Utilities.isHomepageUrl = function (uri) {
    var $v_0 = false,
        $v_1 = uri.get_path().toUpperCase();
    if ($v_1.endsWith("/HOMEPAGE.ASPX") || $v_1.endsWith("/HOME_APPTBOOK.ASPX") || $v_1.endsWith("/HOME_RESOURCE.ASPX") || $v_1.endsWith("/HOME_SITE.ASPX") || $v_1.endsWith("/HOME_CAMPS.ASPX") || $v_1.endsWith("/HOME_TERRITORY.ASPX") || $v_1.endsWith("/HOME_USER.ASPX") || $v_1.endsWith("/HOME_TEAM.ASPX") || $v_1.endsWith("/HOME_ROLE.ASPX") || $v_1.endsWith("/HOME_DUPLICATEDETECTIONJOBS.ASPX") || $v_1.endsWith("/HOME.ASPX") || $v_1.endsWith("/HOME_PRODUCT.ASPX") || $v_1.endsWith("/HOME_ACTIVITIES.ASPX") || $v_1.endsWith("/HOME_IMPORT.ASPX") || $v_1.endsWith("/HOME_ANSWERS.ASPX") || $v_1.endsWith("/HOME_SOLUTION.ASPX") || $v_1.endsWith("/HOME_DASHBOARDS.ASPX")) $v_0 = true;
    return $v_0
};
Mscrm.Utilities.setElementSize = function (domElement, sizeMode, desiredHeight, desiredWidth) {
    switch (sizeMode) {
        case "StretchToFit":
            var $v_0 = domElement.parentNode;
            domElement.style.height = "0px";
            domElement.style.width = "0px";
            while (!IsNull($v_0)) {
                if ($v_0.tagName.toUpperCase() === "TD") {
                    $v_0.style.width = "auto";
                    $v_0.style.height = "auto";
                    break
                }
                $v_0 = $v_0.parentNode
            }
            domElement.style.height = $v_0.offsetHeight + "px";
            domElement.style.width = $v_0.offsetWidth + "px";
            break;
        case "StretchMaintainAspectRatio":
            Mscrm.Utilities.setSizeMaintainRatio(domElement);
            break;
        case "Specific":
            domElement.style.height = desiredHeight + "px";
            domElement.style.width = desiredWidth + "px";
            break
    }
    domElement.style.visibility = "visible"
};
Mscrm.Utilities.setSizeMaintainRatio = function (domElement) {
    var $v_0 = domElement.clientHeight,
        $v_1 = domElement.clientWidth;
    domElement.style.width = "0px";
    domElement.style.height = "0px";
    var $v_2 = domElement.parentNode,
        $v_3 = $v_2.offsetWidth,
        $v_4 = $v_2.offsetHeight;
    if (!$v_3 || !$v_4) {
        var $v_7 = $v_2.parentNode;
        if ($v_7.tagName.toUpperCase() === "TD") {
            $v_7.style.height = "auto";
            $v_7.style.width = "auto"
        }
        $v_3 = $v_7.offsetWidth;
        $v_4 = $v_7.offsetHeight;
        if (!$v_3 || !$v_4) return
    }
    var $v_5 = $v_0 / $v_4,
        $v_6 = $v_1 / $v_3;
    if ($v_5 > $v_6) {
        domElement.style.height = $v_4.toString() + "px";
        domElement.style.width = ($v_1 / $v_5).toString() + "px"
    } else {
        domElement.style.width = $v_3.toString() + "px";
        domElement.style.height = ($v_0 / $v_6).toString() + "px"
    }
};
Mscrm.Utilities.processImageWebResource = function (element) {
    var $v_0 = element,
        $v_1 = $v_0.attributes.getNamedItem("resizeMode").value,
        $v_2 = "",
        $v_3 = "";
    if ($v_1 === "Specific") {
        $v_2 = $v_0.attributes.getNamedItem("desiredHeight").value;
        $v_3 = $v_0.attributes.getNamedItem("desiredWidth").value
    }
    Mscrm.Utilities.setElementSize($v_0, $v_1, $v_2, $v_3);
    Mscrm.Utilities.$79($v_0);
    Mscrm.Utilities.$7E($v_0)
};
Mscrm.Utilities.$79 = function ($p0) {
    var $v_0 = $p0.attributes.getNamedItem("horizontalAlignment").value;
    $p0.parentNode.parentNode.style.textAlign = $v_0
};
Mscrm.Utilities.$7E = function ($p0) {
    var $v_0 = $p0.attributes.getNamedItem("verticalAlignment").value;
    if ($v_0 === "Bottom" || $v_0 === "Middle") $p0.parentNode.parentNode.style.verticalAlign = $v_0
};
Mscrm.Utilities.sendSelectedRecordsUrl = function (useEmail, records, entityTypeCode, writeUrlOnly) {
    if (!useEmail && !Mscrm.Utilities.get_ieBrowserVersion()) {
        alert(window.LOCID_UNSUPPORTED_RIBBONACTION);
        return
    }
    if (IsNull(records) || !records.length) {
        alert(window.LOCID_ACTION_NOITEMSELECTED);
        return
    }
    if (records.length > 10) {
        alert(window.LOCID_MAX_RECORDS_ERROR);
        return
    }
    var $v_0 = window.location.href;
    if (!Mscrm.SessionInfo.isOnline()) $v_0 = window.WEB_APP_URL;
    else $v_0 = $v_0.substring(0, $v_0.indexOf(window.location.pathname));
    if (IsNull(writeUrlOnly)) writeUrlOnly = !useEmail && records.length === 1;
    for (var $v_1 = new Sys.StringBuilder, $v_2 = 0; $v_2 < records.length; $v_2++) {
        var $v_3 = records[$v_2],
            $v_4 = null;
        if ($v_3.TypeCode) {
            var $v_6 = Mscrm.WindowInformation.getWindowInformation($v_3.TypeCode);
            $v_4 = IsNull($v_6) ? null : $v_6.Url
        } else $v_4 = Mscrm.CrmUri.create(IsNull($v_3.Action) ? "" : $v_3.Action);
        $v_4 = Mscrm.Utilities.getPageUrl($v_4, "entityrecord");
        if (IsNull($v_4)) continue;
        if (!writeUrlOnly) {
            $v_2 > 0 && $v_1.append("\r\n\r\n");
            $v_1.append($v_3.Name);
            $v_1.append("\r\n");
            $v_1.append(Mscrm.Utilities.isIosDevice() ? "[" : "<")
        }
        switch ($v_3.TypeCode) {
            case 4230:
                var $v_5 = GetQueryData($v_3.TypeCode, $v_3.Id);
                if (!IsNull($v_5)) $v_4.get_query()["etn"] = $v_5.ReturnType;
                $v_4.get_query()["QueryId"] = $v_3.Id;
                $v_4.get_query()["ViewType"] = $v_3.TypeCode;
                $v_4.get_query()["AutoRun"] = "true";
                break;
            default:
                if (!isNullOrEmptyString($v_3.Id)) {
                    $v_4.get_query()["id"] = $v_3.Id;
                    if (Mscrm.EtcUtil.isUserDefinedEntityObjectTypeCode($v_3.TypeCode)) $v_4.get_query()["etc"] = $v_3.TypeCode
                }
                break
        }
        $v_1.append(Mscrm.Help.concatenateUrl($v_0, $v_4.toString()));
        !writeUrlOnly && $v_1.append(Mscrm.Utilities.isIosDevice() ? "]" : ">")
    }
    if (useEmail) {
        var $v_7 = records.length === 1 ? records[0].Name : "";
        Mscrm.Shortcuts.openEmailForm("", $v_7, $v_1.toString())
    } else Mscrm.Shortcuts.copyTextToClipboard($v_1.toString(), "", window.LOCID_COPY_SHORTCUT_ERROR)
};
Mscrm.Utilities.sendViewUrl = function (useEmail, viewUri, viewTitle, viewId, viewTypeCode) {
    var $v_0 = [],
        $v_1 = [];
    Array.add($v_0, "viewid");
    Array.add($v_1, viewId);
    if (!isNullOrEmptyString(viewTypeCode)) {
        Array.add($v_0, "viewtype");
        Array.add($v_1, viewTypeCode)
    }
    viewUri = Mscrm.Utilities.getPageUrl(viewUri, "entitylist");
    Mscrm.Utilities.sendCustomViewUrl(useEmail, viewUri, viewTitle, $v_0, $v_1)
};
Mscrm.Utilities.sendCustomViewUrl = function (useEmail, uri, title, paramKey, paramValue) {
    var $v_0 = new Sys.StringBuilder;
    $v_0.append(title);
    $v_0.append(" <");
    delete uri.get_query().pagemode;
    for (var $v_1 = 0; $v_1 < paramKey.length; $v_1++) if (!isNullOrEmptyString(paramKey[$v_1]) && !isNullOrEmptyString(paramValue[$v_1])) uri.get_query()[paramKey[$v_1]] = paramValue[$v_1];
    $v_0.append(uri.toString());
    $v_0.append(">");
    if (useEmail) Mscrm.Shortcuts.openEmailForm("", title, $v_0.toString());
    else Mscrm.Shortcuts.copyTextToClipboard($v_0.toString(), "", window.LOCID_COPY_SHORTCUT_ERROR)
};
Mscrm.Utilities.get_isStandardsMode = function () {
    if (IsNull(Mscrm.Utilities.$2y)) Mscrm.Utilities.$2y = document.compatMode !== "BackCompat";
    return Mscrm.Utilities.$2y
};
Mscrm.Utilities.get_ieBrowserVersion = function () {
    if (Sys.Browser.agent !== Sys.Browser.InternetExplorer) return 0;
    if (!Mscrm.Utilities.$1C) {
        Mscrm.Utilities.$1C = 7;
        if (Sys.Browser.version >= 8) {
            Mscrm.Utilities.$1C = Sys.Browser.version;
            return Mscrm.Utilities.$1C
        }
        var $v_0 = window.navigator.userAgent,
            $v_1 = new RegExp("Trident\\/([0-9]{1,}[\\.0-9]{0,})");
        if ($v_1.test($v_0)) {
            var $v_2 = $v_1.exec($v_0),
                $v_3 = $v_2.length >= 2 ? Number.parseInvariant($v_2[1]) : 3;
            Mscrm.Utilities.$1C = $v_3 >= 4 ? $v_3 + 4 : 7
        } else Mscrm.Utilities.$1C = Sys.Browser.version
    }
    return Mscrm.Utilities.$1C
};
Mscrm.Utilities.get_ieBrowserCompatibilityMode = function () {
    if (Sys.Browser.agent !== Sys.Browser.InternetExplorer) return 0;
    var $v_0 = document.documentMode;
    if (!IsNull($v_0)) return $v_0;
    var $v_1 = document.compatMode;
    if ($v_1 === "CSS1Compat") return 7;
    return 0
};
Mscrm.Utilities.get_isIEBrowserInOlderCompatibilityMode = function () {
    var $v_0 = Mscrm.Utilities.get_ieBrowserVersion();
    if ($v_0 > 0) {
        var $v_1 = Mscrm.Utilities.get_ieBrowserCompatibilityMode();
        if ($v_1 > 0) return $v_1 !== $v_0
    }
    return false
};
Mscrm.Utilities.get_isLeftToRight = function () {
    if (IsNull(Mscrm.Utilities.$2v)) Mscrm.Utilities.$2v = window.LOCID_UI_DIR !== "RTL";
    return Mscrm.Utilities.$2v
};
Mscrm.Utilities.parseInt = function (s, defaultValue) {
    var $v_0 = parseInt(s, 10);
    return isNaN($v_0) ? IsNull(defaultValue) ? 0 : defaultValue : $v_0
};
Mscrm.Utilities.parseBoolean = function (value) {
    return !isNullOrEmptyString(value) && !(value.toString().toLowerCase() === "false") && !(value.toString() === "0")
};
Mscrm.Utilities.setInnerHeight = function (e, height) {
    e.style.height = (Mscrm.Utilities.get_isStandardsMode() ? height : height + Mscrm.Utilities.getVerticalBoxPadding(e)) + "px"
};
Mscrm.Utilities.getNonHiddenInnerText = function (e) {
    var $v_0 = "",
        $v_1 = false;
    if (IsNull(e)) return $v_0;
    if (e.children.length === 2) {
        var $v_2 = function ($p1_0) {
            if ($p1_0.tagName !== "LABEL" && $p1_0.tagName !== "SPAN") {
                $v_1 = false;
                return true
            }
            if ($p1_0.className !== "ms-crm-Hidden-NoBehavior") $v_0 += XUI.Html.GetText($p1_0);
            else $v_1 = true;
            return false
        };
        XUI.Html.DomUtils.ForEachChild(e, $v_2)
    }
    if (!$v_1) $v_0 = XUI.Html.GetText(e);
    return $v_0
};
Mscrm.Utilities.setNonHiddenLabelValue = function (label, value) {
    for (var $v_0 = null, $v_2 = 0; $v_2 < label.children.length; $v_2++) if (label.children[$v_2].tagName === "LABEL" && label.children[$v_2].className !== "ms-crm-Hidden-NoBehavior") {
        $v_0 = label.children[$v_2];
        break
    }
    if (IsNull($v_0)) {
        XUI.Html.SetText(label, value);
        return
    }
    for (var $v_1 = null, $v_3 = 0; $v_3 < $v_0.childNodes.length; $v_3++) if ($v_0.childNodes[$v_3].nodeType === 3) {
        $v_1 = $v_0.childNodes[$v_3];
        break
    }
    if (IsNull($v_1)) {
        XUI.Html.SetText(label, value);
        return
    }
    $v_1.nodeValue = value
};
Mscrm.Utilities.setOuterHeight = function (e, height) {
    e.style.height = (Mscrm.Utilities.get_isStandardsMode() ? height - Mscrm.Utilities.getVerticalBoxPadding(e) : height) + "px"
};
Mscrm.Utilities.setInnerWidth = function (e, width) {
    e.style.width = (Mscrm.Utilities.get_isStandardsMode() ? width : width + Mscrm.Utilities.getHorizontalBoxPadding(e)) + "px"
};
Mscrm.Utilities.setOuterWidth = function (e, width) {
    e.style.width = (Mscrm.Utilities.get_isStandardsMode() ? width - Mscrm.Utilities.getHorizontalBoxPadding(e) : width) + "px"
};
Mscrm.Utilities.getVerticalBoxPadding = function (e) {
    var $v_0 = XUI.Html.GetComputedStyle(e, "borderTopWidth"),
        $v_1 = XUI.Html.GetComputedStyle(e, "borderBottomWidth"),
        $v_2 = XUI.Html.GetComputedStyle(e, "paddingTop"),
        $v_3 = XUI.Html.GetComputedStyle(e, "paddingBottom");
    return Mscrm.Utilities.parseInt($v_0) + Mscrm.Utilities.parseInt($v_1) + Mscrm.Utilities.parseInt($v_2) + Mscrm.Utilities.parseInt($v_3)
};
Mscrm.Utilities.getHorizontalBoxPadding = function (e) {
    var $v_0 = XUI.Html.GetComputedStyle(e, "borderLeftWidth"),
        $v_1 = XUI.Html.GetComputedStyle(e, "borderRightWidth"),
        $v_2 = XUI.Html.GetComputedStyle(e, "paddingLeft"),
        $v_3 = XUI.Html.GetComputedStyle(e, "paddingRight");
    return Mscrm.Utilities.parseInt($v_0) + Mscrm.Utilities.parseInt($v_1) + Mscrm.Utilities.parseInt($v_2) + Mscrm.Utilities.parseInt($v_3)
};
Mscrm.Utilities.handleHttpErr = function (httpStatusCode) {
    if (httpStatusCode !== 200) {
        var $v_0 = Mscrm.ErrorInformation.createErrorInfo(httpStatusCode.toString(), "", "");
        openErrorDlg(httpStatusCode.toString(), "", $v_0, 0, 0);
        return false
    }
    return true
};
Mscrm.Utilities.safeHttpSend = function (httpRequest, xmlDoc) {
    var $v_0 = true;
    try {
        httpRequest.send(XUI.Xml.XMLSerializer.serializeToString(xmlDoc))
    } catch ($$e_3) {
        $v_0 = Mscrm.Utilities.handleHttpErr(httpRequest.status)
    }
    if ($v_0) $v_0 = Mscrm.Utilities.handleHttpErr(httpRequest.status);
    return $v_0
};
Mscrm.Utilities.getChildElementsByClassName = function (parent, className, onlyGetFirst) {
    if (!IsNull(parent.getElementsByClassName)) {
        var $v_0 = parent.getElementsByClassName(className);
        if (onlyGetFirst) {
            if (IsNull($v_0) || $v_0.length <= 1) return $v_0;
            var $v_1 = [];
            $v_1[0] = $v_0[0];
            return $v_1
        }
        return $v_0
    }
    if (!IsNull(parent.querySelectorAll)) {
        if (onlyGetFirst) {
            var $v_2 = parent.querySelector("." + className),
                $v_3 = [];
            if (!IsNull($v_2)) $v_3[0] = $v_2;
            return $v_3
        }
        return parent.querySelectorAll("." + className)
    } else return Mscrm.Utilities.$5S(parent, className, onlyGetFirst)
};
Mscrm.Utilities.validateVersion = function (version) {
    var $v_0 = version,
        $v_1 = new RegExp("^[0-9]+$"),
        $v_2 = $v_1.test(version);
    if (!$v_2) {
        $v_1 = new RegExp("^[0-9]+([.][0-9]+){1,3}$");
        $v_2 = $v_1.test(version);
        if (!$v_2) {
            alert(window.LOCID_INVALID_VERSION_FORMAT);
            $v_0 = ""
        }
    } else $v_0 = $v_0 + ".0.0.0";
    return $v_0
};
Mscrm.Utilities.$5S = function ($p0, $p1, $p2) {
    var $v_0 = [],
        $v_1 = 0,
        $v_2 = function ($p1_0) {
            if (!IsNull($p1_0.className) && $p1_0.className.indexOf($p1) >= 0) {
                $v_0[$v_1++] = $p1_0;
                if ($p2) return true
            }
            $v_0 = $v_0.concat(Mscrm.Utilities.$5S($p1_0, $p1, $p2));
            if ($v_0.length > 0 && $p2) return true;
            return false
        };
    XUI.Html.DomUtils.ForEachChild($p0, $v_2);
    return $v_0
};
Mscrm.Utilities.trim = function (s, extraChars) {
    return Mscrm.Utilities.trimChars(s, extraChars, true, true)
};
Mscrm.Utilities.trimStart = function (s, extraChars) {
    return Mscrm.Utilities.trimChars(s, extraChars, true, false)
};
Mscrm.Utilities.trimEnd = function (s, extraChars) {
    return Mscrm.Utilities.trimChars(s, extraChars, false, true)
};
Mscrm.Utilities.trimChars = function (s, extraChars, begin, end) {
    var $v_0 = "\\u0085|\\u00A0|\\u2028|\\u2029|\\u1680|\\u180E|\\u2000|\\u2001|\\u2002|\\u2003|\\u2004|\\u2005|\\u2006|\\u2007|\\u2008|\\u2009|\\u200A|\\u202F|\\u205F|\\u3000";
    if (!IsNull(extraChars)) for (var $v_2 = 0; $v_2 < extraChars.length; $v_2++) {
        $v_0 += "|\\u";
        var $v_3 = extraChars[$v_2].charCodeAt(0);
        if ($v_3 < 256) $v_0 += "00";
        else if ($v_3 < 4096) $v_0 += "0";
        $v_0 += $v_3.toString(16)
    }
    var $v_1 = null;
    if (begin && end) {
        s = s.trim();
        $v_1 = "^(" + $v_0 + ")+|(" + $v_0 + ")+$"
    } else if (begin) {
        s = s.trimStart();
        $v_1 = "^(" + $v_0 + ")+"
    } else if (end) {
        s = s.trimEnd();
        $v_1 = "(" + $v_0 + ")+$"
    }
    if (!IsNull($v_1)) {
        var $v_4 = new RegExp($v_1, "g");
        s = s.replace($v_4, "")
    }
    return s
};
Mscrm.Utilities.stringInjector = function (original, find, addToStart, addToEnd) {
    if (find && find.length > 0) {
        var $v_0 = original.indexOf(find);
        if ($v_0 > -1) original = original.substring(0, $v_0) + addToStart + find + addToEnd + original.substr($v_0 + find.length)
    }
    return original
};
Mscrm.Utilities.click = function (domElement) {
    try {
        domElement.click()
    } catch ($$e_1) {
        XUI.Html.DispatchDomEvent(domElement, XUI.Html.CreateDomEvent("click"))
    }
};
Mscrm.Utilities.trimSpaces = function (s) {
    if (!IsNull(s)) {
        s = Mscrm.Utilities.trim(s, null);
        return s.replace(new RegExp("\\s+", "g"), " ")
    }
    return null
};
Mscrm.Utilities.isUserUsingBaseLanguage = function () {
    if (window.ORG_LANGUAGE_CODE === window.USER_LANGUAGE_CODE) return true;
    else return false
};
Mscrm.Utilities.isIE7 = function () {
    if (Sys.Browser.agent === Sys.Browser.InternetExplorer) {
        if (Sys.Browser.version === 7 && !window.document.documentMode) return true;
        return false
    } else return false
};
Mscrm.Utilities.isIE7OrIE7CompactMode = function () {
    return window.navigator.userAgent.indexOf("MSIE 7") > -1
};
Mscrm.Utilities.destroyObject = function (value) {
    for (var prop in value) {
        if (prop === "_disposed") continue;
        try {
            value[prop] = null;
            delete value[prop]
        } catch (e) {}
    }
};
Mscrm.Utilities.isChrome = function () {
    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) return true;
    else return false
};
Mscrm.Utilities.destroyElement = function (element) {
    if (IsNull(element)) return;
    if (IsNull(Mscrm.Utilities.$1M)) {
        Mscrm.Utilities.$1M = document.createElement("DIV");
        Mscrm.Utilities.$1M.id = "__trash";
        Mscrm.Utilities.$1M.style.display = "none";
        document.body.appendChild(Mscrm.Utilities.$1M)
    }
    Sys.Application.disposeElement(element);
    Mscrm.Utilities.clearAllHandlersInSubtree(element);
    Mscrm.Utilities.$1M.appendChild(element);
    Mscrm.Utilities.$1M.innerHTML = ""
};
Mscrm.Utilities.clearAllHandlersInSubtree = function (node) {
    $clearHandlers(node);
    for (var $v_0 = node.getElementsByTagName("*"), $v_1 = 0, $v_2 = $v_0.length; $v_1 < $v_2; $v_1++) $clearHandlers($v_0[$v_1])
};
Mscrm.Utilities.glowBackground = function (on, element, cssForOn, cssForOff) {
    if (!IsNull(element)) if (on) element.className = cssForOn;
    else element.className = cssForOff
};
Mscrm.Utilities.renderButtonForAccessibilityChecker = function () {};
Mscrm.Utilities.isDescendant = function (parent, child) {
    var $v_0 = child.id;
    child.id = Math.random().toString();
    var $v_1 = !IsNull($get(child.id, parent));
    child.id = $v_0;
    return $v_1
};
Mscrm.Utilities.getContentUrl = function (component) {
    var $v_0;
    if (IsNull(component) || IsNull(component.get_rootManager) || IsNull(component.get_rootManager())) {
        var $v_1 = $find("crmContentPanel");
        if (!IsNull($v_1)) $v_0 = $v_1.get_contentUrl();
        else $v_0 = Mscrm.CrmUri.create(window.location.href)
    } else {
        var $v_2 = component.get_rootManager();
        $v_0 = Mscrm.CrmUri.create($v_2.get_contentUrl())
    }
    return $v_0
};
Mscrm.Utilities.isJsonResponseSupported = function (uri) {
    return false
};
Mscrm.Utilities.enableDisableDomElement = function (targetElement, disable) {
    var $v_0 = targetElement.tagName.toUpperCase();
    if ($v_0 === "INPUT" || $v_0 === "BUTTON" || $v_0 === "SELECT" || $v_0 === "TEXTAREA") {
        targetElement.setAttribute("disabled", "true");
        return
    }
    var $v_1 = $get(targetElement.id + "_greyDiv");
    if (disable) {
        if (!IsNull($v_1)) return;
        var $v_3 = XUI.Html.GetComputedStyle(targetElement, "position").toUpperCase();
        if (!($v_3 === "ABSOLUTE" || $v_3 === "FIXED" || $v_3 === "RELATIVE")) targetElement.style.position = "relative";
        $v_1 = document.createElement("div");
        targetElement.appendChild($v_1);
        $v_1.id = targetElement.id + "_greyDiv";
        $v_1.className = "ms-crm-greyDiv";
        XUI.Html.SetOpacity($v_1, .35)
    } else {
        if (IsNull($v_1)) return;
        $v_1.parentNode.removeChild($v_1)
    }
    for (var $v_2 = targetElement.getElementsByTagName("*"), $v_4 = 0, $v_5 = $v_2.length; $v_4 < $v_5; $v_4++) {
        var $v_6 = $v_2[$v_4];
        Mscrm.Utilities.$5a($v_6, disable)
    }
    Mscrm.Utilities.$5a(targetElement, disable)
};
Mscrm.Utilities.$5a = function ($p0, $p1) {
    if ($p1) if (!IsNull($p0.getAttribute("tabIndex"))) {
        $p0.setAttribute("oldTabIndex", $p0.tabIndex);
        $p0.tabIndex = -1
    } else switch ($p0.tagName.toUpperCase()) {
        case "INPUT":
        case "A":
        case "AREA":
        case "TEXTAREA":
        case "SELECT":
        case "BUTTON":
            $p0.setAttribute("oldTabIndex", "");
            $p0.tabIndex = -1;
            break
    } else if (!IsNull($p0.getAttribute("oldTabIndex"))) {
        if (isNullOrEmptyString($p0.getAttribute("oldTabIndex").toString())) $p0.removeAttribute("tabIndex");
        else $p0.tabIndex = $p0.getAttribute("oldTabIndex");
        $p0.removeAttribute("oldTabIndex")
    }
};
Mscrm.Utilities.addOption = function (option, selectControl, index) {
    try {
        selectControl.add(option, selectControl.options[index])
    } catch ($$e_3) {
        selectControl.add(option, index)
    }
};
Mscrm.Utilities.setResponseTypeToMSXml = function (request) {
    if (Mscrm.Utilities.get_ieBrowserVersion() === 10) request.responseType = "msxml-document"
};
Mscrm.Utilities.showInlineMenu = function (displayRecords, parameters) {
    var $v_0 = parameters["inlineMenu"];
    if (IsNull($v_0)) $v_0 = Mscrm.Menu.createMenu();
    $v_0.set_stylePrefix("IL");
    $v_0.$b_2 = false;
    if (!IsNull(parameters["inlineMenuId"])) $v_0.$1u_2 = parameters["inlineMenuId"];
    !IsNull(parameters["stylePrefix"]) && $v_0.set_stylePrefix(parameters["stylePrefix"]);
    $v_0.$d_2 = parameters["top"];
    $v_0.$y_2 = parameters["left"];
    $v_0.$K_2 = parameters["width"];
    if (!IsNull(parameters["maxHeight"])) $v_0.$O_2 = parameters["maxHeight"];
    if (!IsNull(parameters["inlineMenuHeaderDOM"])) $v_0.$D_2 = parameters["inlineMenuHeaderDOM"];
    if (!IsNull(parameters["inlineMenuFooterDOM"])) $v_0.$C_2 = parameters["inlineMenuFooterDOM"];
    !IsNull(parameters["focusElementOnShow"]) && $v_0.set_focusElementOnShow(parameters["focusElementOnShow"]);
    if (!IsNull(parameters["focusElementOnHide"])) $v_0.$X_2 = parameters["focusElementOnHide"];
    if (!IsNull(displayRecords)) {
        if (displayRecords.length > 0) for (var $v_1 = 0; $v_1 < displayRecords.length; $v_1++) {
            var $v_2 = displayRecords[$v_1],
                $v_3 = Mscrm.InlineMenuItem.createInlineMenuItem($v_2.$1J_0.$24_0);
            $v_3.set_iconPath(Mscrm.Utilities.getIconPath($v_2.$3o_0));
            $v_3.set_tooltip($v_2.$1J_0.$24_0);
            $v_3.$11_2 = $v_1;
            $v_3.$V_3 = $v_2.$47_0;
            $v_3.set_actionCallback(parameters["onClickCallback"]);
            $v_3.$V_3.length > 0 && !IsNull(parameters["itemHeight"]) && $v_3.setHeight(parameters["itemHeight"]);
            $v_0.addItem($v_3)
        } else if (!displayRecords.length) {
            var $v_4 = Mscrm.InlineMenuItem.createInlineMenuItem(LOCID_INLINELOOKUP_NO_RECORDS);
            $v_4.$3s_2 = false;
            $v_4.$2L_3 = true;
            $v_0.addItem($v_4)
        }
        if (!IsNull(parameters["enableShowMore"]) && parameters["enableShowMore"]) {
            var $v_5 = Mscrm.InlineMenuItem.createInlineMenuItem(LOCID_INLINELOOKUP_SHOWMORE);
            $v_5.$2x_3 = true;
            $v_5.set_actionCallback(parameters["showMoreCallback"]);
            $v_0.addItem($v_5)
        }
        $v_0.show();
        return $v_0
    }
    return null
};
Mscrm.Utilities.selectMenuItemOnNavigation = function (down, searchMenu, searchMenuItemIndex, typeOfMenu) {
    var $v_0 = {};
    $v_0["itemtitle"] = null;
    $v_0["itemindex"] = searchMenuItemIndex;
    if (!searchMenu.get_isVisible() || searchMenu.get_menuItems().length < 1) return $v_0;
    if (searchMenuItemIndex > -1) {
        var $v_1 = searchMenu.get_menuItems()[searchMenuItemIndex];
        !IsNull($v_1) && $v_1.displayRestStyle()
    }
    searchMenuItemIndex = Mscrm.Utilities.getNextIndexOnNavigation(down, searchMenuItemIndex, searchMenu);
    $v_0["itemindex"] = searchMenuItemIndex;
    if (searchMenuItemIndex !== -1) {
        var $v_2 = searchMenu.get_menuItems()[searchMenuItemIndex];
        $v_2.displayHoverStyle();
        $v_2.get_itemContents().scrollIntoView(false);
        if (typeOfMenu === "InlineLookupmenu" && $v_2.$2L_3) return Mscrm.Utilities.selectMenuItemOnNavigation(down, searchMenu, searchMenuItemIndex, typeOfMenu);
        if (searchMenuItemIndex === searchMenu.get_menuItems().length - 1) return $v_0;
        else {
            $v_0["itemtitle"] = $v_2.get_title();
            return $v_0
        }
    }
    return $v_0
};
Mscrm.Utilities.getNextIndexOnNavigation = function (down, searchMenuItemIndex, searchMenu) {
    var $v_0 = 0;
    if (down) if (searchMenuItemIndex === -1 || searchMenuItemIndex === searchMenu.get_menuItems().length - 1) $v_0 = 0;
    else $v_0 = searchMenuItemIndex + 1;
    else if (searchMenuItemIndex === -1 || !searchMenuItemIndex) $v_0 = searchMenu.get_menuItems().length - 1;
    else if (searchMenuItemIndex > 0) $v_0 = searchMenuItemIndex - 1;
    return $v_0
};
Mscrm.Utilities.getILMenuDimension = function (rootElement, isScrollVisible, menuHeight) {
    var $v_0 = {}, $v_1 = !rootElement.clientHeight;
    if ($v_1) {
        $v_0["valid"] = false;
        return $v_0
    }
    var $v_2 = XUI.Html.DomUtils.GetFirstChild(rootElement),
        $v_3 = $($v_2),
        $v_4 = $v_3.offset(),
        $v_5 = $v_2.scrollWidth,
        $v_6 = $v_2.scrollHeight,
        $v_7 = 16,
        $v_8 = Mscrm.Utilities.ilMenuHasMoreInfoColumns(rootElement) ? 0 : 50,
        $v_9 = $v_4.left,
        $v_A = $v_4.top;
    if ($v_5 < 300 - $v_8) $v_5 = 300 - $v_8;
    if (Mscrm.Utilities.get_isLeftToRight()) if ($v_9 + $v_5 > $(document).width()) $v_9 -= $v_5 - $v_3.width() + 1;
    else $v_9++;
    else {
        if ($v_9 - $v_5 < 0) $v_9 += $v_5 + 1;
        else $v_9 += $v_3.width() - 2;
        if (isScrollVisible) $v_9 -= $v_7 + 1
    }
    if ($v_A + $v_6 + menuHeight < $(window).height()) $v_A = $v_A + $v_6;
    else $v_A = $v_A - menuHeight;
    $v_0["top"] = $v_A;
    $v_0["left"] = $v_9;
    $v_0["width"] = isScrollVisible ? $v_5 - $v_7 : $v_5;
    $v_0["valid"] = true;
    return $v_0
};
Mscrm.Utilities.ilMenuHasMoreInfoColumns = function (element) {
    var $v_0 = element.id.endsWith("_lookupTable") ? element.id.replace("_lookupTable", "") : element.id.replace("_i", ""),
        $v_1 = $get($v_0);
    if (IsNull($v_1)) return false;
    else {
        var $v_2 = $v_1.getAttribute("inlineViewIds");
        return !isNullOrEmptyString($v_2)
    }
};
Mscrm.Utilities.partyListXml = function (fieldName, partyItems) {
    for (var $v_0 = "<" + CrmEncodeDecode.CrmXmlEncode(fieldName) + ">", $v_1 = partyItems.length, $v_2 = 0; $v_2 < $v_1; $v_2++) {
        var $v_3 = partyItems[$v_2];
        $v_0 += "<activityparty>";
        if (!IsNull($v_3.id) && $v_3.id.toLowerCase() !== "null" && parseInt($v_3.type, 10) !== 9206 && (IsNull($v_3.category) || $v_3.category !== 3)) $v_0 += '<partyid name="' + CrmEncodeDecode.CrmXmlEncode($v_3.name) + '" type="' + $v_3.type + '">' + CrmEncodeDecode.CrmXmlEncode($v_3.id) + "</partyid>";
        else $v_0 += "<addressused>" + CrmEncodeDecode.CrmXmlEncode($v_3.name) + "</addressused>";
        if (!IsNull($v_3.resourceSpecId)) $v_0 += "<resourcespecid>" + CrmEncodeDecode.CrmXmlEncode($v_3.resourceSpecId) + "</resourcespecid>";
        if (!IsNull($v_3.effort)) $v_0 += "<effort>" + CrmEncodeDecode.CrmXmlEncode($v_3.effort) + "</effort>";
        if (!IsNull($v_3.exchangeEntryId)) $v_0 += "<exchangeentryid>" + CrmEncodeDecode.CrmXmlEncode($v_3.exchangeEntryId) + "</exchangeentryid>";
        if (!isNullOrEmptyString($v_3.activityPartyId)) $v_0 += "<activitypartyid>" + CrmEncodeDecode.CrmXmlEncode($v_3.activityPartyId) + "</activitypartyid>";
        $v_0 += "</activityparty>"
    }
    $v_0 += "</" + CrmEncodeDecode.CrmXmlEncode(fieldName) + ">";
    return $v_0
};
Mscrm.Utilities.addControlMarker = function (controlId, category, markerName, value) {
    if (!window.PerformanceMarkers) window.PerformanceMarkers = {};
    if (!(controlId in window.PerformanceMarkers)) {
        var $v_0 = {};
        $v_0[markerName] = value;
        $v_0["ControlType"] = category;
        window.PerformanceMarkers[controlId] = $v_0
    } else {
        var $v_1 = window.PerformanceMarkers[controlId];
        $v_1[markerName] = value
    }
};
Mscrm.Utilities.tryInitOnDemandControl = function (id) {
    if (Sys.Application.get_isCreatingComponents() || IsNull(window._aControlHeaderList)) return false;
    var $v_0 = window._aControlHeaderList[id];
    if (!IsNull($v_0)) {
        var $v_1 = $v_0.State;
        if ($v_1 === "loadingAsync") $v_0.CancelAsync = true;
        if (isNullOrEmptyString($v_1) || $v_1 === "loadingAsync") {
            var $v_2 = $get("controlHeaderContainer");
            Mscrm.InlineContentLoader.loadHeaderJson($v_0, $v_2, false)
        }
    }
    return true
};
Mscrm.Utilities.asyncInitAllControls = function () {
    if (IsNull(window._aControlHeaderList)) return;
    var container = document.getElementById("controlHeaderContainer"),
        count = 0,
        bucketListIndex = 0,
        bucketList = [];
    bucketList[0] = [];
    for (var controlId in window._aControlHeaderList) {
        bucketList[bucketListIndex].push(window._aControlHeaderList[controlId]);
        count++;
        if (count >= 7) {
            count = 0;
            bucketListIndex++;
            bucketList[bucketListIndex] = []
        }
    }
    for (var i = 0; i <= bucketListIndex; i++) {
        var action = function () {
            var k = i;
            return function () {
                for (var j = 0; j < bucketList[k].length; j++) Mscrm.InlineContentLoader.loadHeaderJson(bucketList[k][j], container, false)
            }
        }();
        executeFunctionDeferred(action, true, false)
    }
    executeFunctionDeferred(function () {
        window._aControlHeaderList = null
    }, false, false)
};
Mscrm.Utilities.syncInitAllControls = function () {
    if (IsNull(window._aControlHeaderList)) return;
    var container = document.getElementById("controlHeaderContainer");
    for (var controlId in window._aControlHeaderList) Mscrm.InlineContentLoader.loadHeaderJson(window._aControlHeaderList[controlId], container, false);
    window._aControlHeaderList = null
};

function compareGuids(guidA, guidB) {
    return Mscrm.Utilities.compareGuids(guidA, guidB)
}
function getHomePageQueryStringParams() {
    return Mscrm.Utilities.getHomePageQueryStringParams()
}
function getRecordPageQueryStringParams() {
    return Mscrm.Utilities.getRecordPageQueryStringParams()
}
function getPageUrl(pageUrl, pageType) {
    return Mscrm.Utilities.getPageUrl(pageUrl, pageType)
}
function getHomePageUrlForRecordPage(homepage, defaultUrl) {
    return Mscrm.Utilities.getHomePageUrlForRecordPage(homepage, defaultUrl)
}
function isNewPageModel(uri) {
    return Mscrm.Utilities.isNewPageModel(uri)
}
function isValidForStickyViews(areaId, subAreaId) {
    return Mscrm.Utilities.isValidForStickyViews(areaId, subAreaId)
}
function isDigit(s) {
    return Mscrm.Utilities.isDigit(s)
}
function getMainPageManager() {
    return Mscrm.Utilities.getMainPageManager()
}
function createGuid() {
    return Mscrm.Utilities.createGuid()
}
function getDomEventElement(e, tagName) {
    return Mscrm.Utilities.getDomEventElement(e, tagName)
}
function getXYPos(obj, rtl) {
    return Mscrm.Utilities.getXYPos(obj, rtl)
}
function getIconPath(entityTypeCode) {
    return Mscrm.Utilities.getIconPath(entityTypeCode)
}
function getGridId($sn_window) {
    return Mscrm.Utilities.getGridId($sn_window)
}
function getCrmGrid() {
    return Mscrm.Utilities.getCrmGrid()
}
function getViewURL(entityTypeCode, viewId, qsParam) {
    return Mscrm.Utilities.getViewURL(entityTypeCode, viewId, qsParam)
}
function refreshParentGrid(entityTypeCode, entityId) {
    Mscrm.Utilities.refreshParentGrid(entityTypeCode, entityId)
}
function refreshCurrentGrid(entityTypeCode) {
    Mscrm.Utilities.refreshCurrentGrid(entityTypeCode)
}
function closeCurrentWindow() {
    Mscrm.Utilities.closeCurrentWindow()
}
function isHomepageUrl(uri) {
    return Mscrm.Utilities.isHomepageUrl(uri)
}
function setElementSize(domElement, sizeMode, desiredHeight, desiredWidth) {
    Mscrm.Utilities.setElementSize(domElement, sizeMode, desiredHeight, desiredWidth)
}
function setSizeMaintainRatio(domElement) {
    Mscrm.Utilities.setSizeMaintainRatio(domElement)
}
function Trim(s) {
    return Mscrm.Utilities.trim(s, null)
}
function TrimSpaces(s) {
    return Mscrm.Utilities.trimSpaces(s)
}
Mscrm.XmlUtil = function () {};
Mscrm.XmlUtil.loadXmlDocument = function (xml) {
    return XUI.Xml.LoadXml(xml)
};
Mscrm.XmlUtil.loadXmlDocumentAsFreeThreaded = function (xml) {
    return XUI.Xml.LoadXml(xml)
};
Mscrm.XmlUtil.createXslTemplateByXml = function (xslString) {
    var $v_0 = new Mscrm.XslTemplate;
    $v_0.stylesheet = XUI.Xml.LoadXml(xslString);
    return $v_0
};
Mscrm.XmlUtil.createXslTemplate = function () {
    return new Mscrm.XslTemplate
};
Mscrm.XmlUtil.createXmlHttp = function () {
    return new XMLHttpRequest
};
Mscrm.XmlUtil.handleXMLErr = function (xml, shouldContinue) {
    if (IsNull(shouldContinue)) shouldContinue = false;
    if (!IsNull(XUI.Xml.GetParserError(xml))) {
        alert(window.LOCID_XML_PROCESS_ERROR);
        return shouldContinue ? 2 : 0
    }
    var $v_0 = XUI.Xml.SelectSingleNode(xml, "/error", XUI.Xml.CreateNSDictionary(xml.documentElement));
    if (!IsNull($v_0)) if (!shouldContinue) {
        var $v_1 = Mscrm.ErrorInformation.createFromDoc(xml);
        openErrorDlg(!IsNull($v_1.$2C_0) ? $v_1.$2C_0 : "", $v_1.$2F_0, $v_1, 0, 0);
        return 0
    } else return 2;
    return 1
};
Mscrm.XmlUtil.getNodeText = function (rootNode, nodeName, defaultValue) {
    var $v_0 = XUI.Xml.SelectSingleNode(rootNode, nodeName, XUI.Xml.CreateNSDictionary(rootNode.ownerDocument.documentElement));
    if (!IsNull($v_0)) return XUI.Xml.GetText($v_0);
    return defaultValue
};
Mscrm.XmlUtil.viewXml = function (xml) {};
Mscrm.XmlUtil.downloadXml = function (xml, fileName) {
    var $v_0 = Mscrm.CrmUri.create("/tools/_common/xmlviewer.aspx");
    $v_0.get_query()["download"] = "true";
    $v_0.get_query()["fileName"] = fileName;
    var $v_1 = "downloadXmlFrame",
        $v_2 = $get($v_1);
    if (IsNull($v_2)) {
        $v_2 = document.createElement("iframe");
        $v_2.style.display = "none";
        $v_2.id = $v_1;
        $v_2.setAttribute("name", $v_1);
        $v_2.src = Mscrm.CrmUri.create("/_static/blank.htm").toString();
        window.document.body.appendChild($v_2);
        $v_2.contentWindow.name = $v_1
    }
    var $v_3 = "downloadXmlForm",
        $v_4 = $get($v_3);
    if (IsNull($v_4)) {
        $v_4 = document.createElement("form");
        $v_4.id = $v_3;
        $v_4.innerHTML = '<input id="xml" name="xml" type="hidden">';
        window.document.body.appendChild($v_4)
    }
    var $v_5 = $get("xml", $v_4);
    $v_5.value = xml;
    $v_4.target = $v_1;
    $v_4.method = "post";
    $v_4.action = $v_0.toString();
    $v_4.submit()
};

function loadXmlDocument(xml) {
    return Mscrm.XmlUtil.loadXmlDocument(xml)
}
function loadXmlDocumentAsFreeThreaded(xml) {
    return Mscrm.XmlUtil.loadXmlDocumentAsFreeThreaded(xml)
}
function createXslTemplateByXml(xslString) {
    return Mscrm.XmlUtil.createXslTemplateByXml(xslString)
}
function CreateXslTemplate() {
    return Mscrm.XmlUtil.createXslTemplate()
}
function handleXMLErr(xml, shouldContinue) {
    return Mscrm.XmlUtil.handleXMLErr(xml, shouldContinue)
}
function getNodeText(rootNode, nodeName, defaultValue) {
    return Mscrm.XmlUtil.getNodeText(rootNode, nodeName, defaultValue)
}
function ViewXml(xml) {
    Mscrm.XmlUtil.viewXml(xml)
}
Mscrm.XslTemplate = function () {};
Mscrm.XslTemplate.prototype = {
    stylesheet: null,
    createProcessor: function () {
        if (window.XSLTProcessor) return new Mscrm.XslProcessor(this.stylesheet);
        else return new Mscrm.InternetExplorerXslProcessor(this.stylesheet)
    }
};
Mscrm.XslProcessor = function ($p0) {
    this._parameters = {};
    this._stylesheet = $p0
};
Mscrm.XslProcessor.prototype = {
    input: null,
    output: null,
    _stylesheet: null,
    addParameter: function (name, value) {
        this._parameters[name] = value
    },
    transform: function () {
        var $v_0 = new XSLTProcessor;
        $v_0.importStylesheet(this._stylesheet);
        var $$dict_1 = this._parameters;
        for (var $$key_2 in $$dict_1) {
            var $v_2 = {
                key: $$key_2,
                value: $$dict_1[$$key_2]
            };
            $v_0.setParameter(null, $v_2.key, $v_2.value)
        }
        var $v_1 = $v_0.transformToFragment(this.input, this.input);
        this.output = XUI.Xml.XMLSerializer.serializeToString($v_1);
        return this.output
    }
};
Mscrm.InternetExplorerXslProcessor = function ($p0) {
    Mscrm.InternetExplorerXslProcessor.initializeBase(this, [$p0]);
    var $v_0 = XUI.Xml.XMLSerializer.serializeToString($p0);
    this._stylesheet = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
    this._stylesheet.async = false;
    this._stylesheet.resolveExternals = false;
    this._stylesheet.loadXML($v_0)
};
Mscrm.InternetExplorerXslProcessor.prototype = {
    transform: function () {
        var $v_0 = new ActiveXObject("Msxml2.XSLTemplate");
        $v_0.stylesheet = this._stylesheet;
        var $v_1 = $v_0.createProcessor();
        $v_1.input = this.input;
        var $$dict_2 = this._parameters;
        for (var $$key_3 in $$dict_2) {
            var $v_2 = {
                key: $$key_3,
                value: $$dict_2[$$key_3]
            };
            $v_1.addParameter($v_2.key, $v_2.value)
        }
        $v_1.transform();
        this.output = $v_1.output;
        return this.output
    }
};
Mscrm.MetricsReporting = function () {
    this.$$d_$54_0 = Function.createDelegate(this, this.$54_0);
    this.$1e_0 = [];
    this.$5m_0();
    var $v_0 = null;
    try {
        $v_0 = window.opener
    } catch ($$e_1) {}
    if (IsNull($v_0)) {
        var $$t_2 = this;
        window.setInterval(function () {
            $$t_2.sendMetricsToServer(true)
        }, 9e5)
    }
    Sys.Application.add_unload(this.$$d_$54_0)
};
Mscrm.MetricsReporting.instance = function () {
    if (IsNull(Mscrm.MetricsReporting.$2u)) Mscrm.MetricsReporting.$2u = new Mscrm.MetricsReporting;
    return Mscrm.MetricsReporting.$2u
};
Mscrm.MetricsReporting.prototype = {
    $5m_0: function () {
        this.$1e_0 = []
    },
    addCounterMetric: function (metric, value) {
        if (!this.$4J_0()) return;
        var $v_0 = this.$5W_0(metric, null);
        if (!IsNull($v_0.Value)) $v_0.Value = $v_0.Value + value;
        else $v_0.Value = value;
        this.$3b_0()
    },
    addMetric: function (metric, value) {
        if (!this.$4J_0()) return;
        var $v_0 = this.$3Q_0(metric, null);
        $v_0.Value = value;
        this.$3b_0()
    },
    addTimeMetric: function (metric, value) {
        if (!this.$4J_0()) return;
        var $v_0 = this.$3Q_0(metric, null);
        $v_0.Value = value;
        this.$3b_0()
    },
    $5W_0: function ($p0, $p1) {
        var $v_0 = window.self.masterWindow();
        if ($v_0 !== window.self) try {
            var $v_1 = $v_0.Mscrm.MetricsReporting.instance();
            return $v_1.$5W_0($p0, this.$3V_0())
        } catch ($$e_4) {}
        for (var $v_2 = 0; $v_2 < this.$1e_0.length; $v_2++) {
            var $v_3 = this.$1e_0[$v_2];
            if ($v_3.Name === $p0 && $v_3.RequestId === (isNullOrEmptyString($p1) ? this.$3V_0() : $p1)) return $v_3
        }
        return this.$3Q_0($p0, $p1)
    },
    $3Q_0: function ($p0, $p1) {
        var $v_0 = window.self.masterWindow();
        if ($v_0 !== window.self) try {
            var $v_2 = $v_0.Mscrm.MetricsReporting.instance();
            return $v_2.$3Q_0($p0, this.$3V_0())
        } catch ($$e_4) {}
        var $v_1 = new Mscrm.MetricObject;
        $v_1.Name = $p0;
        $v_1.Value = null;
        $v_1.RequestId = isNullOrEmptyString($p1) ? this.$3V_0() : $p1;
        Array.add(this.$1e_0, $v_1);
        return $v_1
    },
    $3b_0: function () {
        var $v_0 = window.self.masterWindow();
        if ($v_0 !== window.self) try {
            var $v_1 = $v_0.Mscrm.MetricsReporting.instance();
            $v_1.$3b_0();
            return
        } catch ($$e_2) {}
        this.$5V_0() >= 150 && this.sendMetricsToServer(true)
    },
    $5V_0: function () {
        return this.$1e_0.length
    },
    sendMetricsToServer: function (async) {
        if (!this.$5V_0()) return;
        var $v_0 = new XMLHttpRequest,
            $v_1 = Mscrm.CrmUri.create("/AppWebServices/MetricsReportingService.asmx/Report");
        $v_1.set_useOrganizationName(true);
        $v_0.open("POST", $v_1.toString(), async);
        $v_0.setRequestHeader("content-type", "application/json; charset=utf-8");
        var $v_2 = Sys.Serialization.JavaScriptSerializer.serialize(this.$1e_0);
        this.$5m_0();
        $v_0.send('{"metrics":' + $v_2 + "}")
    },
    $54_0: function ($p0, $p1) {
        this.sendMetricsToServer(false)
    },
    $4J_0: function () {
        return window.self.IS_UEIP_ENABLED
    },
    $3V_0: function () {
        return window.self.REQ_ID
    }
};
Mscrm.MetricsCollector = function () {};
Mscrm.MetricsCollector.collectAndReportClientMetrics = function () {
    var $v_0 = window.self,
        $v_1 = Mscrm.CrmUri.create($v_0.location.href);
    if ($v_1.get_pageType() !== "entityrecord") return;
    var $v_2 = $v_0.document.getElementById("contentIFrame");
    if (IsNull($v_2) || IsNull($v_2.contentWindow) || IsNull($v_2.contentWindow.PostRenderTime) || IsNull($v_0.FullyLoadedTime) || IsNull($v_0.LoadStartTime) || isActionQueueActive()) {
        window.setTimeout(Mscrm.MetricsCollector.collectAndReportClientMetrics, 200);
        return
    }
    var $v_3 = null;
    try {
        $v_3 = $v_0.opener
    } catch ($$e_4) {}
    if (isValidWindowInstance($v_3) && !IsNull($v_3.getWindowOpenTimeJson)) {
        var $v_5 = $v_3.getWindowOpenTimeJson($v_0.name, true);
        if (!isNullOrEmptyString($v_5)) {
            var $v_6 = Sys.Serialization.JavaScriptSerializer.deserialize($v_5);
            $v_0.BeforeWindowOpenTimestamp = $v_6["BeforeWindowOpenTimestamp"];
            $v_0.AfterWindowOpenTimestamp = $v_6["AfterWindowOpenTimestamp"]
        }
    }
    var $v_4 = $v_2.contentWindow;
    Mscrm.MetricsReporting.instance().addMetric("EditReqId", $v_4.REQ_ID);
    Mscrm.MetricsCollector.$2X($v_0, "BeforeWindowOpenTimestamp", $v_0, "AfterWindowOpenTimestamp", "PopupOpenTime");
    isValidWindowInstance($v_3) && Mscrm.MetricsCollector.$2X($v_3, "PreloadStartTime", $v_3, "PreloadEndTime", "EditPreloadTime", true);
    Mscrm.MetricsCollector.$2X($v_0, "AfterWindowOpenTimestamp", $v_0, "LoadStartTime", "MainPageApproxDownloadTime");
    Mscrm.MetricsCollector.$2X($v_0, "BeforeWindowOpenTimestamp", $v_4, "PostRenderTime", "PerceiveReadyTime");
    Mscrm.MetricsCollector.$2X($v_0, "BeforeWindowOpenTimestamp", $v_0, "FullyLoadedTime", "FullFormReadyTime")
};
Mscrm.MetricsCollector.$2X = function ($p0, $p1, $p2, $p3, $p4, $p5) {
    try {
        var $v_0 = $p0[$p1],
            $v_1 = $p2[$p3];
        if (!IsNull($v_0) && !IsNull($v_1)) {
            Mscrm.MetricsReporting.instance().addTimeMetric($p4, $v_1 - $v_0);
            if ($p5) {
                $p0[$p1] = null;
                window.self[$p1] = $v_0;
                $p2[$p3] = null;
                window.self[$p3] = $v_1
            }
        }
    } catch ($$e_8) {}
};
Mscrm.MetricsStopwatch = function (name) {
    this.$5b_0 = name
};
Mscrm.MetricsStopwatch.prototype = {
    $5b_0: null,
    $5s_0: null,
    start: function () {
        this.$5s_0 = new Date
    },
    stop: function () {
        var $v_0 = (new Date).getTime() - this.$5s_0.getTime();
        Mscrm.MetricsReporting.instance().addMetric(this.$5b_0, $v_0.toString() + " ms")
    }
};
Mscrm.CrmLocalStorage = function () {};
Mscrm.CrmLocalStorage.get_$42 = function () {
    if (IsNull(Mscrm.CrmLocalStorage.$2N)) if (Mscrm.CrmLocalStorage.$6n()) Mscrm.CrmLocalStorage.$2N = new Mscrm.LocalStorage;
    else Mscrm.CrmLocalStorage.$2N = new Mscrm.UserDataStorage;
    return Mscrm.CrmLocalStorage.$2N
};
Mscrm.CrmLocalStorage.$6n = function () {
    try {
        return "localStorage" in window && window["localStorage"] !== null
    } catch ($$e_0) {
        return false
    }
};
Mscrm.CrmLocalStorage.getItem = function (key) {
    return Mscrm.CrmLocalStorage.get_$42().getItem(key)
};
Mscrm.CrmLocalStorage.setItem = function (key, value) {
    Mscrm.CrmLocalStorage.get_$42().setItem(key, value)
};
Mscrm.CrmLocalStorage.removeItem = function (key) {
    Mscrm.CrmLocalStorage.get_$42().removeItem(key)
};
Mscrm.LocalStorage = function () {};
Mscrm.LocalStorage.prototype = {
    getItem: function ($p0) {
        return localStorage.getItem($p0)
    },
    setItem: function ($p0, $p1) {
        localStorage.setItem($p0, $p1)
    },
    removeItem: function ($p0) {
        localStorage.removeItem($p0)
    }
};
Mscrm.UserDataStorage = function () {
    this.$j_0 = $get(this.$50_0);
    if (IsNull(this.$j_0)) {
        this.$j_0 = document.createElement("<div style='behavior:url(#default#userData);display: none;' id='" + this.$50_0 + "'></div>");
        document.body.appendChild(this.$j_0)
    }
};
Mscrm.UserDataStorage.prototype = {
    $j_0: null,
    $3h_0: "commonStore",
    $50_0: "userDataElement",
    getItem: function ($p0) {
        this.$j_0.load(this.$3h_0);
        return this.$j_0.getAttribute($p0)
    },
    setItem: function ($p0, $p1) {
        this.$j_0.setAttribute($p0, $p1);
        this.$j_0.save(this.$3h_0)
    },
    removeItem: function ($p0) {
        this.$j_0.removeAttribute($p0);
        this.$j_0.save(this.$3h_0)
    }
};
Mscrm.SearchRecordColumn = function () {};
Mscrm.SearchRecordColumn.prototype = {
    $24_0: "",
    $2h_0: 0,
    $2g_0: "",
    get_value: function () {
        return this.$24_0
    },
    set_value: function (value) {
        this.$24_0 = value;
        return value
    },
    get_columnWidth: function () {
        return this.$2h_0
    },
    set_columnWidth: function (value) {
        this.$2h_0 = value;
        return value
    },
    get_columnName: function () {
        return this.$2g_0
    },
    set_columnName: function (value) {
        this.$2g_0 = value;
        return value
    }
};
Mscrm.SearchRecord = function () {};
Mscrm.SearchRecord.prototype = {
    $47_0: null,
    $4i_0: null,
    $1J_0: null,
    $3o_0: 0,
    $4x_0: null,
    $4f_0: null,
    get_resultColumns: function () {
        return this.$47_0
    },
    set_resultColumns: function (value) {
        this.$47_0 = value;
        return value
    },
    get_hiddenColumns: function () {
        return this.$4i_0
    },
    set_hiddenColumns: function (value) {
        this.$4i_0 = value;
        return value
    },
    get_title: function () {
        return this.$1J_0
    },
    set_title: function (value) {
        this.$1J_0 = value;
        return value
    },
    get_entityTypeCode: function () {
        return this.$3o_0
    },
    set_entityTypeCode: function (value) {
        this.$3o_0 = value;
        return value
    },
    get_objectId: function () {
        return this.$4x_0
    },
    set_objectId: function (value) {
        this.$4x_0 = value;
        return value
    },
    get_entityLogicalName: function () {
        return this.$4f_0
    },
    set_entityLogicalName: function (value) {
        this.$4f_0 = value;
        return value
    }
};
Mscrm.FeatureControl = function () {};
Mscrm.FeatureControl.get_Current = function () {
    return Mscrm.FeatureControl.$4e
};
Mscrm.DefaultFeatureControlChecks = function () {};
Mscrm.DefaultFeatureControlChecks.prototype = {
    isFeatureEnabled: function (featureName) {
        if (isNullOrEmptyString(featureName)) return false;
        if (!IsNull(window.FeatureControl)) if (featureName in window.FeatureControl) return window.FeatureControl[featureName];
        else return false;
        return false
    }
};
Mscrm.FeatureNames = function () {};
Type.registerNamespace("Xrm");
Xrm.Page = function () {};
Xrm.Utility = function () {};
Xrm.Utility.openEntityForm = function (name, id, parameters) {
    var $v_0 = Mscrm.CrmUri.create("temp"),
        $$dict_4 = parameters;
    for (var $$key_5 in $$dict_4) {
        var $v_2 = {
            key: $$key_5,
            value: $$dict_4[$$key_5]
        };
        $v_0.get_query()[$v_2.key] = $v_2.value
    }
    var $v_1 = $v_0.get_queryString();
    if (!$v_1.length) $v_1 = null;
    return openObjEtn(name, id, $v_1)
};
Xrm.Utility.openWebResource = function (webResourceName, webResourceData, width, height) {
    var $v_0 = Mscrm.CrmUri.create(String.format("$webresource:{0}", webResourceName));
    !isNullOrEmptyString(webResourceData) && $v_0.appendToQuery(String.format("Data={0}", webResourceData));
    return openStdWin($v_0, null, width, height, "scrollbars=1,toolbar=1,menubar=1,location=1")
};
Type.registerNamespace("Mscrm.Imported");
Type.registerNamespace("Mscrm.Obsolete");

function getBrowserMajorVersion() {
    return Sys.Browser.version
}
function getObjUrl(objectType) {
    var $v_0 = Mscrm.WindowInformation.getWindowInformation(objectType);
    if (!IsNull($v_0)) return $v_0.Url;
    return null
}
function formatString() {
    var $v_0 = arguments.length;
    if (!$v_0) return "";
    var $v_1 = arguments[0],
        $v_2;
    if ($v_0 > 1 && isArray(arguments[1])) $v_2 = arguments[1];
    else {
        $v_2 = new Array($v_0 - 1);
        for (var $v_3 = 1; $v_3 < $v_0; $v_3++) $v_2[$v_3 - 1] = arguments[$v_3]
    }
    for (var $v_4 = 0; $v_4 < $v_2.length; $v_4++) $v_1 = $v_1.replace(new RegExp("\\{" + $v_4 + "\\}", "g"), $v_2[$v_4].toString());
    return $v_1
}
function StringBuilder() {
    this.$3C_0 = new Sys.StringBuilder;
    this.ToString = this.toString
}
StringBuilder.prototype = {
    Append: function (s) {
        this.$3C_0.append(s)
    },
    Reset: function () {
        this.$3C_0.clear()
    },
    toString: function () {
        return this.$3C_0.toString()
    }
};
Mscrm.Obsolete.RenderVariables = function () {};
Mscrm.Obsolete.RenderVariables.$$cctor = function () {
    var $$dict_0 = Mscrm.EntityTypeCode;
    for (var $$key_1 in $$dict_0) {
        var $v_0 = {
            key: $$key_1,
            value: $$dict_0[$$key_1]
        };
        window[$v_0.key] = $v_0.value
    }
    window.Import = 4410;
    var $$dict_3 = new Mscrm.FormFieldType;
    for (var $$key_4 in $$dict_3) {
        var $v_1 = {
            key: $$key_4,
            value: $$dict_3[$$key_4]
        };
        window[$v_1.key] = $v_1.value
    }
    var $$dict_6 = new Mscrm.KeyCode;
    for (var $$key_7 in $$dict_6) {
        var $v_2 = {
            key: $$key_7,
            value: $$dict_6[$$key_7]
        };
        window[$v_2.key] = $v_2.value
    }
    var $$dict_9 = new Mscrm.XmlError;
    for (var $$key_A in $$dict_9) {
        var $v_3 = {
            key: $$key_A,
            value: $$dict_9[$$key_A]
        };
        window[$v_3.key] = $v_3.value
    }
};
Type.registerNamespace("XUI");
Mscrm.DynamicMenuReturnValue.registerClass("Mscrm.DynamicMenuReturnValue");
Mscrm.EntityReference.registerClass("Mscrm.EntityReference");
Mscrm.Message.registerClass("Mscrm.Message");
Mscrm.ReportMenuReturnInformation.registerClass("Mscrm.ReportMenuReturnInformation");
Mscrm.ReportInformation.registerClass("Mscrm.ReportInformation");
Mscrm.ClientTabInfo.registerClass("Mscrm.ClientTabInfo");
Mscrm.RibbonDataInformation.registerClass("Mscrm.RibbonDataInformation");
Mscrm.RibbonDataTabInformation.registerClass("Mscrm.RibbonDataTabInformation");
Mscrm.RuleDefinition.registerClass("Mscrm.RuleDefinition");
Mscrm.RulePart.registerClass("Mscrm.RulePart");
Mscrm.OrBlockRulePart.registerClass("Mscrm.OrBlockRulePart");
Mscrm.OrGroup.registerClass("Mscrm.OrGroup");
Mscrm.EntityRulePart.registerClass("Mscrm.EntityRulePart");
Mscrm.EntityPropertyRulePart.registerClass("Mscrm.EntityPropertyRulePart");
Mscrm.FormEntityContextRulePart.registerClass("Mscrm.FormEntityContextRulePart");
Mscrm.PrivilegeRulePart.registerClass("Mscrm.PrivilegeRulePart");
Mscrm.MiscellaneousPrivilegeRulePart.registerClass("Mscrm.MiscellaneousPrivilegeRulePart");
Mscrm.FormStateRulePart.registerClass("Mscrm.FormStateRulePart");
Mscrm.OrganizationSettingRulePart.registerClass("Mscrm.OrganizationSettingRulePart");
Mscrm.ReferencingAttributeRequiredRulePart.registerClass("Mscrm.ReferencingAttributeRequiredRulePart");
Mscrm.ValueRulePart.registerClass("Mscrm.ValueRulePart");
Mscrm.ClientRulePart.registerClass("Mscrm.ClientRulePart");
Mscrm.OutlookClientRulePart.registerClass("Mscrm.OutlookClientRulePart");
Mscrm.OutlookVersionRulePart.registerClass("Mscrm.OutlookVersionRulePart");
Mscrm.CrmOutlookClientVersionRulePart.registerClass("Mscrm.CrmOutlookClientVersionRulePart");
Mscrm.OfflineAccessStateRulePart.registerClass("Mscrm.OfflineAccessStateRulePart");
Mscrm.OutlookRenderTypeRulePart.registerClass("Mscrm.OutlookRenderTypeRulePart");
Mscrm.OutlookItemTrackingRulePart.registerClass("Mscrm.OutlookItemTrackingRulePart");
Mscrm.RelationshipTypeRulePart.registerClass("Mscrm.RelationshipTypeRulePart");
Mscrm.SkuRulePart.registerClass("Mscrm.SkuRulePart");
Mscrm.SelectionCountRulePart.registerClass("Mscrm.SelectionCountRulePart");
Mscrm.JavaScriptRulePart.registerClass("Mscrm.JavaScriptRulePart");
Mscrm.PageRulePart.registerClass("Mscrm.PageRulePart");
Mscrm.OptionSetRulePart.registerClass("Mscrm.OptionSetRulePart");
Mscrm.RibbonActionHandler.registerClass("Mscrm.RibbonActionHandler");
Mscrm.UrlActionAttributes.registerClass("Mscrm.UrlActionAttributes");
Mscrm.JavaScriptActionAttributes.registerClass("Mscrm.JavaScriptActionAttributes");
Mscrm.JavaScriptFunctionAttributes.registerClass("Mscrm.JavaScriptFunctionAttributes");
Mscrm.OutlookActionAttributes.registerClass("Mscrm.OutlookActionAttributes");
Mscrm.RibbonParameter.registerClass("Mscrm.RibbonParameter");
Mscrm.NameValuePair.registerClass("Mscrm.NameValuePair");
Mscrm.Notification.registerClass("Mscrm.Notification");
Mscrm.PageHeaderData.registerClass("Mscrm.PageHeaderData");
Mscrm.MetricObject.registerClass("Mscrm.MetricObject");
Mscrm.ValidationResult.registerClass("Mscrm.ValidationResult");
Mscrm.ImageInfo.registerClass("Mscrm.ImageInfo");
Mscrm.TraceEntry.registerClass("Mscrm.TraceEntry");
Mscrm.RibbonKeyPressParameters.registerClass("Mscrm.RibbonKeyPressParameters");
Mscrm.CrashData.registerClass("Mscrm.CrashData");
Mscrm.ImageStripData.registerClass("Mscrm.ImageStripData");
Mscrm.RibbonCommandDefinition.registerClass("Mscrm.RibbonCommandDefinition");
Mscrm.ActionAttributes.registerClass("Mscrm.ActionAttributes");
Mscrm.RibbonSelectionDataType.registerClass("Mscrm.RibbonSelectionDataType");
Mscrm.NavigationMode.registerClass("Mscrm.NavigationMode");
Mscrm.NotificationSeverity.registerClass("Mscrm.NotificationSeverity");
Mscrm.NotificationSource.registerClass("Mscrm.NotificationSource");
Mscrm.RecordSetNavigation.registerClass("Mscrm.RecordSetNavigation");
Mscrm.ScriptEvents.registerClass("Mscrm.ScriptEvents");
Mscrm.InlineCommands.registerClass("Mscrm.InlineCommands");
Mscrm.InlineDataFormatTagName.registerClass("Mscrm.InlineDataFormatTagName");
Mscrm.RecordPrivilegeType.registerClass("Mscrm.RecordPrivilegeType");
Mscrm.RefreshCommandBarVisibilityRule.registerClass("Mscrm.RefreshCommandBarVisibilityRule");
Mscrm.RefreshFormMarker.registerClass("Mscrm.RefreshFormMarker");
Mscrm.IconUtil.registerClass("Mscrm.IconUtil");
Mscrm.RibbonConstants.registerClass("Mscrm.RibbonConstants");
Mscrm.RuleAppliesTo.registerClass("Mscrm.RuleAppliesTo");
Mscrm.RibbonRuleRelationshipType.registerClass("Mscrm.RibbonRuleRelationshipType");
Mscrm.RibbonContexts.registerClass("Mscrm.RibbonContexts");
Mscrm.BaseJsonResponse.registerClass("Mscrm.BaseJsonResponse");
Mscrm.ControlJsonResponse.registerClass("Mscrm.ControlJsonResponse", Mscrm.BaseJsonResponse);
Mscrm.PageJsonResponse.registerClass("Mscrm.PageJsonResponse", Mscrm.BaseJsonResponse);
Mscrm.HeaderJsonObject.registerClass("Mscrm.HeaderJsonObject");
Mscrm.ScriptJsonObject.registerClass("Mscrm.ScriptJsonObject");
Mscrm.StyleJsonObject.registerClass("Mscrm.StyleJsonObject");
Mscrm.TypeOfResource.registerClass("Mscrm.TypeOfResource");
Mscrm.AggregatePerformanceMarkers.registerClass("Mscrm.AggregatePerformanceMarkers");
Mscrm.AggregateMarker.registerClass("Mscrm.AggregateMarker");
Mscrm.GlobalContext.registerClass("Mscrm.GlobalContext");
Mscrm.EntityTypeCode.registerClass("Mscrm.EntityTypeCode");
Mscrm.EtcUtil.registerClass("Mscrm.EtcUtil");
Mscrm.EventKeys.registerClass("Mscrm.EventKeys");
Mscrm.SolutionComponentType.registerClass("Mscrm.SolutionComponentType");
Mscrm.WebResourceConstants.registerClass("Mscrm.WebResourceConstants");
Mscrm.CrmUIComponent.registerClass("Mscrm.CrmUIComponent", Sys.Component, Mscrm.ICrmEventableComponent);
Mscrm.DialogsControl.registerClass("Mscrm.DialogsControl", Mscrm.CrmUIComponent);
Mscrm.CrmHeader.registerClass("Mscrm.CrmHeader");
Mscrm.IncludeLoader.registerClass("Mscrm.IncludeLoader");
Mscrm.ScriptLoader.registerClass("Mscrm.ScriptLoader", Mscrm.IncludeLoader);
Mscrm.StyleLoader.registerClass("Mscrm.StyleLoader", Mscrm.IncludeLoader);
Mscrm.Dialog.registerClass("Mscrm.Dialog", Mscrm.CrmUIComponent, Mscrm.IDialog);
Mscrm.MenuItem.registerClass("Mscrm.MenuItem", Mscrm.CrmUIComponent, Mscrm.IMenuItem);
Mscrm.InlineMenuItem.registerClass("Mscrm.InlineMenuItem", Mscrm.MenuItem);
Mscrm.Menu.registerClass("Mscrm.Menu", Mscrm.CrmUIComponent, Mscrm.IMenu, Mscrm.IMenuItem);
Mscrm.MenuItemSeparator.registerClass("Mscrm.MenuItemSeparator", Mscrm.MenuItem);
Mscrm.MenuStyles.registerClass("Mscrm.MenuStyles");
Mscrm.AddActivity.registerClass("Mscrm.AddActivity");
Mscrm.CrmBrowser.registerClass("Mscrm.CrmBrowser");
Mscrm.RecentlyViewedItem.registerClass("Mscrm.RecentlyViewedItem");
Mscrm.CrmUIControl.registerClass("Mscrm.CrmUIControl", Sys.UI.Control, Mscrm.ICrmEventableComponent, Mscrm.ICrmResizeableControl);
Mscrm.UIControl.registerClass("Mscrm.UIControl", Mscrm.CrmUIControl, Mscrm.IUIControl);
Mscrm.CrmUIBehavior.registerClass("Mscrm.CrmUIBehavior", Sys.UI.Behavior, Mscrm.ICrmEventableComponent);
Mscrm.CurrencyValidator.registerClass("Mscrm.CurrencyValidator");
Mscrm.CrmEventArgs.registerClass("Mscrm.CrmEventArgs", Sys.EventArgs);
Mscrm.CrmUri.registerClass("Mscrm.CrmUri");
Mscrm.CrmOneNoteUri.registerClass("Mscrm.CrmOneNoteUri", Mscrm.CrmUri);
Mscrm.CrmWindow.registerClass("Mscrm.CrmWindow");
Mscrm.DateTimeUtility.registerClass("Mscrm.DateTimeUtility");
Mscrm.CrmDebug.registerClass("Mscrm.CrmDebug");
Mscrm.DeferredActionHandlerFactory.registerClass("Mscrm.DeferredActionHandlerFactory");
Mscrm.DefaultDeferredActionHandler.registerClass("Mscrm.DefaultDeferredActionHandler", null, Mscrm.ICrmDeferredActionHandler);
Mscrm.RecordUpdatedHandler.registerClass("Mscrm.RecordUpdatedHandler", null, Mscrm.ICrmDeferredActionHandler);
Mscrm.Display.registerClass("Mscrm.Display");
Mscrm.ErrorInformation.registerClass("Mscrm.ErrorInformation");
Mscrm.EventManager.registerClass("Mscrm.EventManager", Sys.Component);
Mscrm.Form.registerClass("Mscrm.Form");
Mscrm.FormControlInputBehavior.registerClass("Mscrm.FormControlInputBehavior", Mscrm.CrmUIBehavior, Mscrm.ICrmUIFormDataComponent);
Mscrm.ButtonUtils.registerClass("Mscrm.ButtonUtils");
Mscrm.FormEditor.registerClass("Mscrm.FormEditor");
Mscrm.Rte.registerClass("Mscrm.Rte");
Mscrm.WebResourceUtils.registerClass("Mscrm.WebResourceUtils");
Mscrm.ItemObject.registerClass("Mscrm.ItemObject");
Mscrm.GlobalEvents.registerClass("Mscrm.GlobalEvents");
Mscrm.Grid.registerClass("Mscrm.Grid");
Mscrm.Help.registerClass("Mscrm.Help");
Mscrm.ImageStrip.registerClass("Mscrm.ImageStrip");
Mscrm.TypeNames.registerClass("Mscrm.TypeNames");
Mscrm.ClassNames.registerClass("Mscrm.ClassNames");
Mscrm.InlineContentLoader.registerClass("Mscrm.InlineContentLoader");
Mscrm.NumberUtility.registerClass("Mscrm.NumberUtility");
Mscrm.PagePreloadInfo.registerClass("Mscrm.PagePreloadInfo");
Mscrm.PerformanceTracing.registerClass("Mscrm.PerformanceTracing");
Mscrm.OutlookUtil.registerClass("Mscrm.OutlookUtil");
Mscrm.CacheScope.registerClass("Mscrm.CacheScope");
Mscrm.ResponseType.registerClass("Mscrm.ResponseType");
Mscrm.PageManagerBase.registerClass("Mscrm.PageManagerBase", Mscrm.CrmUIComponent);
Mscrm.PageManager.registerClass("Mscrm.PageManager", Mscrm.PageManagerBase);
Mscrm.RemoteCommandXml.registerClass("Mscrm.RemoteCommandXml");
Mscrm.AsyncResultHandler.registerClass("Mscrm.AsyncResultHandler");
Mscrm.RemoteCommandXmlResult.registerClass("Mscrm.RemoteCommandXmlResult");
Mscrm.InlinePageManager.registerClass("Mscrm.InlinePageManager", Mscrm.PageManagerBase);
Mscrm.ReportViewType.registerClass("Mscrm.ReportViewType");
Mscrm.ReportUtil.registerClass("Mscrm.ReportUtil");
Mscrm.RibbonUtility.registerClass("Mscrm.RibbonUtility");
Mscrm.ScriptErrorReporting.registerClass("Mscrm.ScriptErrorReporting", Mscrm.CrmUIComponent);
Mscrm.SessionInfo.registerClass("Mscrm.SessionInfo");
Mscrm.Shortcuts.registerClass("Mscrm.Shortcuts");
Mscrm.SolutionDecorater.registerClass("Mscrm.SolutionDecorater");
Mscrm.WindowInformation.registerClass("Mscrm.WindowInformation");
Mscrm.WrpcTokenFuncs.registerClass("Mscrm.WrpcTokenFuncs");
Mscrm.WrpcToken.registerClass("Mscrm.WrpcToken");
Mscrm.ContextMenuAction.registerClass("Mscrm.ContextMenuAction");
Mscrm.Utilities.registerClass("Mscrm.Utilities");
Mscrm.XmlUtil.registerClass("Mscrm.XmlUtil");
Mscrm.XslTemplate.registerClass("Mscrm.XslTemplate");
Mscrm.XslProcessor.registerClass("Mscrm.XslProcessor");
Mscrm.InternetExplorerXslProcessor.registerClass("Mscrm.InternetExplorerXslProcessor", Mscrm.XslProcessor);
Mscrm.MetricsReporting.registerClass("Mscrm.MetricsReporting");
Mscrm.MetricsCollector.registerClass("Mscrm.MetricsCollector");
Mscrm.MetricsStopwatch.registerClass("Mscrm.MetricsStopwatch");
Mscrm.CrmLocalStorage.registerClass("Mscrm.CrmLocalStorage");
Mscrm.LocalStorage.registerClass("Mscrm.LocalStorage", null, Mscrm.ILocalStorage);
Mscrm.UserDataStorage.registerClass("Mscrm.UserDataStorage", null, Mscrm.ILocalStorage);
Mscrm.SearchRecordColumn.registerClass("Mscrm.SearchRecordColumn");
Mscrm.SearchRecord.registerClass("Mscrm.SearchRecord");
Mscrm.FeatureControl.registerClass("Mscrm.FeatureControl");
Mscrm.DefaultFeatureControlChecks.registerClass("Mscrm.DefaultFeatureControlChecks", null, Mscrm.IFeatureControlChecks);
Mscrm.FeatureNames.registerClass("Mscrm.FeatureNames");
Xrm.Page.registerClass("Xrm.Page");
Xrm.Utility.registerClass("Xrm.Utility");
StringBuilder.registerClass("StringBuilder");
Mscrm.Obsolete.RenderVariables.registerClass("Mscrm.Obsolete.RenderVariables");
Mscrm.RibbonSelectionDataType.recordCount = 0;
Mscrm.RibbonSelectionDataType.selectedRecordCount = 1;
Mscrm.RibbonSelectionDataType.allRecords = 2;
Mscrm.RibbonSelectionDataType.allRecordIds = 3;
Mscrm.RibbonSelectionDataType.selectedRecords = 4;
Mscrm.RibbonSelectionDataType.selectedIds = 5;
Mscrm.RibbonSelectionDataType.unselectedRecords = 6;
Mscrm.RibbonSelectionDataType.unselectedIds = 7;
Mscrm.RibbonSelectionDataType.gridXml = 8;
Mscrm.RibbonSelectionDataType.entityDisplayName = 9;
Mscrm.RibbonSelectionDataType.entityDisplayPluralName = 10;
Mscrm.RibbonSelectionDataType.viewTitle = 11;
Mscrm.RibbonSelectionDataType.viewIsUserOwned = 12;
Mscrm.RibbonSelectionDataType.totalRecordCount = 13;
Mscrm.RibbonSelectionDataType.pageNumber = 14;
Mscrm.RibbonSelectionDataType.pageSize = 15;
Mscrm.NavigationMode.NavigationModeNewWindow = 0;
Mscrm.NavigationMode.NavigationModeInline = 1;
Mscrm.NavigationMode.DefaultNavigationMode = 0;
Mscrm.NotificationSeverity.none = 0;
Mscrm.NotificationSeverity.error = 1;
Mscrm.NotificationSeverity.warning = 2;
Mscrm.NotificationSeverity.information = 3;
Mscrm.NotificationSeverity.userDefined = 4;
Mscrm.NotificationSource.server = "Server";
Mscrm.NotificationSource.strategy = "strategy";
Mscrm.NotificationSource.privilegeCheck = "PrivilegeCheck";
Mscrm.NotificationSource.validate = "Validate";
Mscrm.RecordSetNavigation.PrimaryFieldName = "primaryFieldColumnName";
Mscrm.RecordSetNavigation.PrimaryFieldColumnIndex = "primaryFieldColumnIndex";
Mscrm.RecordSetNavigation.DisplayFieldName = "displayFieldColumnName";
Mscrm.RecordSetNavigation.DisplayFieldLabel = "displayFieldColumnLabel";
Mscrm.RecordSetNavigation.DisplayFieldColumnIndex = "displayFieldColumnIndex";
Mscrm.RecordSetNavigation.PageNumber = "pageNumber";
Mscrm.RecordSetNavigation.LayoutXml = "layoutXml";
Mscrm.RecordSetNavigation.ViewName = "viewName";
Mscrm.RecordSetNavigation.RecordPosition = "rpos";
Mscrm.RecordSetNavigation.RecordsMask = "page_{0}_Records";
Mscrm.RecordSetNavigation.MoreRecordsMask = "page_{0}_moreRecords";
Mscrm.RecordSetNavigation.GridXmlMask = "page_{0}_gridXml";
Mscrm.RecordSetNavigation.RemoteCommandMask = "page_{0}_RemoteCommand";
Mscrm.RecordSetNavigation.RefreshDataMask = "page_{0}_RefreshData";
Mscrm.ScriptEvents.ShowEvents = 0;
Mscrm.ScriptEvents.AppNavGoTo = 1;
Mscrm.ScriptEvents.CacheInitializedCallback = 2;
Mscrm.ScriptEvents.GetSelectedAreaSubAreaIds = 3;
Mscrm.ScriptEvents.GetPageInfo = 4;
Mscrm.ScriptEvents.InsertCacheData = 5;
Mscrm.ScriptEvents.NavigateSaveState = 6;
Mscrm.ScriptEvents.NavigateRestoreState = 7;
Mscrm.ScriptEvents.Navigate = 8;
Mscrm.ScriptEvents.PageLoaded = 9;
Mscrm.ScriptEvents.RetrieveCacheData = 10;
Mscrm.ScriptEvents.SyncCache = 11;
Mscrm.ScriptEvents.ShowAppNav = 12;
Mscrm.ScriptEvents.UpdateViewUrl = 13;
Mscrm.ScriptEvents.WindowResize = 14;
Mscrm.ScriptEvents.GetContentUrl = 15;
Mscrm.ScriptEvents.NavigateBack = 16;
Mscrm.ScriptEvents.NavigateForward = 17;
Mscrm.ScriptEvents.NavigateBackCheckpoint = 18;
Mscrm.ScriptEvents.NavigateRetrieveDetails = 19;
Mscrm.ScriptEvents.RequestResize = 20;
Mscrm.ScriptEvents.NavigateRequest = 21;
Mscrm.ScriptEvents.NavigateRefresh = 22;
Mscrm.ScriptEvents.NavigateClose = 23;
Mscrm.ScriptEvents.SignOut = 24;
Mscrm.ScriptEvents.OnClick = 25;
Mscrm.ScriptEvents.OnGridReset = 26;
Mscrm.ScriptEvents.OnGridRefresh = 27;
Mscrm.ScriptEvents.OnGridResetComplete = 28;
Mscrm.ScriptEvents.PageUnloaded = 29;
Mscrm.ScriptEvents.RibbonSelectionChanged = 30;
Mscrm.ScriptEvents.RibbonExecuteCommand = 31;
Mscrm.ScriptEvents.RibbonRefresh = 32;
Mscrm.ScriptEvents.RibbonRequestEnabledState = 33;
Mscrm.ScriptEvents.RibbonRequestVisibleState = 34;
Mscrm.ScriptEvents.RibbonDataLoad = 35;
Mscrm.ScriptEvents.RibbonDataUnload = 36;
Mscrm.ScriptEvents.RibbonRootEvent = 37;
Mscrm.ScriptEvents.SetRibbonSelectedControl = 38;
Mscrm.ScriptEvents.RibbonTabSwitch = 39;
Mscrm.ScriptEvents.OnDocumentReady = 40;
Mscrm.ScriptEvents.OnKeyDown = 41;
Mscrm.ScriptEvents.ViewSelectorChanged = 42;
Mscrm.ScriptEvents.UpdatePageInformation = 43;
Mscrm.ScriptEvents.GetWindowSize = 44;
Mscrm.ScriptEvents.SelectionChanged = 45;
Mscrm.ScriptEvents.NavigateConfirm = 46;
Mscrm.ScriptEvents.GridViewChanged = 47;
Mscrm.ScriptEvents.GetStickyViewIdForSubAreaPage = 48;
Mscrm.ScriptEvents.RetrieveRecentData = 49;
Mscrm.ScriptEvents.RefreshGrid = 50;
Mscrm.ScriptEvents.RecordUpdated = 51;
Mscrm.ScriptEvents.RecentlyViewedAddItem = 52;
Mscrm.ScriptEvents.OnDashboardRefresh = 53;
Mscrm.ScriptEvents.OnPaneRefresh = 54;
Mscrm.ScriptEvents.RibbonSetFocusToSelf = 55;
Mscrm.ScriptEvents.RibbonSetFocusToLastControl = 56;
Mscrm.ScriptEvents.BeforePageLoaded = 57;
Mscrm.ScriptEvents.RecentlyViewedSetFocusOnViewedPagesIcon = 58;
Mscrm.ScriptEvents.SiteMapSetFocusOnFirstItem = 59;
Mscrm.ScriptEvents.UpdateVisualizationUrl = 60;
Mscrm.ScriptEvents.UpdateDashboardsUrl = 61;
Mscrm.ScriptEvents.NewViewCreated = 62;
Mscrm.ScriptEvents.RetrieveLookupMruData = 63;
Mscrm.ScriptEvents.AddLookupMruItems = 64;
Mscrm.ScriptEvents.UpdateLookupMruItems = 65;
Mscrm.ScriptEvents.RemoveLookupMruItems = 66;
Mscrm.ScriptEvents.RibbonMinimizeToggle = 67;
Mscrm.ScriptEvents.SignOutRequested = 68;
Mscrm.ScriptEvents.RibbonTabScalingComplete = 69;
Mscrm.ScriptEvents.TabExpended = 70;
Mscrm.ScriptEvents.InlinePageLoaded = 71;
Mscrm.ScriptEvents.DashboardViewChanged = 72;
Mscrm.ScriptEvents.ContentPanelSetFocusOnDivContentPanel = 73;
Mscrm.ScriptEvents.RibbonRendered = 74;
Mscrm.ScriptEvents.SignInRequested = 75;
Mscrm.ScriptEvents.RefreshActivitiesWall = 76;
Mscrm.ScriptEvents.RefreshTabsControl = 77;
Mscrm.ScriptEvents.RefreshNotesWall = 78;
Mscrm.ScriptEvents.GridRowPreview = 79;
Mscrm.ScriptEvents.RefreshActivityContainer = 80;
Mscrm.ScriptEvents.GridContextualAction = 81;
Mscrm.InlineCommands.Error = -1;
Mscrm.InlineCommands.None = 0;
Mscrm.InlineCommands.Save = 1;
Mscrm.InlineCommands.SaveAndClose = 2;
Mscrm.InlineCommands.DeleteRecord = 3;
Mscrm.InlineCommands.Deactivate = 5;
Mscrm.InlineCommands.Reactivate = 6;
Mscrm.InlineCommands.LeadQualify = 15;
Mscrm.InlineCommands.LeadDisqualify = 16;
Mscrm.InlineCommands.QuoteAccept = 17;
Mscrm.InlineCommands.QuoteCreateOrder = 18;
Mscrm.InlineCommands.OrderProcessOrder = 19;
Mscrm.InlineCommands.OpportunityAddRelatedOrder = 21;
Mscrm.InlineCommands.OpportunityAddRelatedQuote = 22;
Mscrm.InlineCommands.OpportunityAddRelatedInvoice = 23;
Mscrm.InlineCommands.QuoteCreateRevision = 24;
Mscrm.InlineCommands.QuoteCloseQuote = 25;
Mscrm.InlineCommands.OrderCancelOrder = 26;
Mscrm.InlineCommands.InvoiceCancel = 27;
Mscrm.InlineCommands.QuoteGetProducts = 28;
Mscrm.InlineCommands.QuoteActivate = 29;
Mscrm.InlineCommands.IncidentCancel = 40;
Mscrm.InlineCommands.ChangeSalesStage = 42;
Mscrm.InlineCommands.SalesOrderGetProducts = 43;
Mscrm.InlineCommands.InvoiceGetProducts = 44;
Mscrm.InlineCommands.Assign = 49;
Mscrm.InlineCommands.OrderLock = 50;
Mscrm.InlineCommands.OrderUnlock = 51;
Mscrm.InlineCommands.InvoiceLock = 52;
Mscrm.InlineCommands.InvoiceUnlock = 53;
Mscrm.InlineCommands.OrderFulfillOrder = 56;
Mscrm.InlineCommands.InvoicePaid = 57;
Mscrm.InlineCommands.SaveAsCompleted = 58;
Mscrm.InlineCommands.AddToQueue = 59;
Mscrm.InlineCommands.RecalculateRecord = 66;
Mscrm.InlineCommands.OpenEditForm = 201;
Mscrm.InlineCommands.LoadHelp = 202;
Mscrm.InlineCommands.IncidentResolve = 203;
Mscrm.InlineCommands.ShareRecord = 204;
Mscrm.InlineCommands.OpportunityCloseAsWon = 205;
Mscrm.InlineCommands.OpportunityCloseAsLost = 206;
Mscrm.InlineCommands.CreateConnection = 207;
Mscrm.InlineCommands.Retrieve = 208;
Mscrm.InlineCommands.UpdateConnection = 209;
Mscrm.InlineCommands.AssociateToCompetitor = 210;
Mscrm.InlineCommands.SaveAndNew = 211;
Mscrm.InlineCommands.EmailLink = 212;
Mscrm.InlineCommands.OpportunityReopen = 213;
Mscrm.InlineCommands.FormEditor = 214;
Mscrm.InlineCommands.Follow = 215;
Mscrm.InlineCommands.UNFollow = 216;
Mscrm.InlineCommands.LaunchProcessControlConfiguration = 217;
Mscrm.InlineDataFormatTagName.Input = "Input";
Mscrm.InlineDataFormatTagName.Id = "id";
Mscrm.InlineDataFormatTagName.EntityLogicalName = "name";
Mscrm.InlineDataFormatTagName.DataXml = "dataxml";
Mscrm.RecordPrivilegeType.None = 0;
Mscrm.RecordPrivilegeType.Create = 1;
Mscrm.RecordPrivilegeType.Read = 2;
Mscrm.RecordPrivilegeType.Write = 4;
Mscrm.RecordPrivilegeType.DeletePrivilege = 8;
Mscrm.RecordPrivilegeType.Assign = 16;
Mscrm.RecordPrivilegeType.Share = 32;
Mscrm.RecordPrivilegeType.Append = 64;
Mscrm.RecordPrivilegeType.AppendTo = 128;
Mscrm.RefreshCommandBarVisibilityRule.None = 0;
Mscrm.RefreshCommandBarVisibilityRule.NewRecord = 1;
Mscrm.RefreshCommandBarVisibilityRule.ExistingRecord = 2;
Mscrm.RefreshCommandBarVisibilityRule.PrimaryIsActive = 3;
Mscrm.RefreshCommandBarVisibilityRule.PrimaryIsInactive = 4;
Mscrm.RefreshCommandBarVisibilityRule.IsFollowed = 5;
Mscrm.RefreshCommandBarVisibilityRule.IsNotFollowed = 6;
Mscrm.RefreshCommandBarVisibilityRule.Offline = 7;
Mscrm.RefreshCommandBarVisibilityRule.Online = 8;
Mscrm.RefreshCommandBarVisibilityRule.FormDesignerNotValidForEntity = 9;
Mscrm.RefreshCommandBarVisibilityRule.CannotWritePrimary = 10;
Mscrm.RefreshCommandBarVisibilityRule.CannotDeletePrimary = 11;
Mscrm.RefreshCommandBarVisibilityRule.CannotSavePrimary = 12;
Mscrm.RefreshCommandBarVisibilityRule.CannotSharePrimary = 13;
Mscrm.RefreshFormMarker.StartPreload = "StartRefreshPreloadTimestamp";
Mscrm.RefreshFormMarker.FinishPreload = "FinishRefreshPreloadTimestamp";
Mscrm.RefreshFormMarker.BeforeWindowOpen = "BeforeWindowOpenTimestamp";
Mscrm.RefreshFormMarker.AfterWindowOpen = "AfterWindowOpenTimestamp";
Mscrm.RefreshFormMarker.StartRetrieveLayout = "StartRetrieveLayoutTimestamp";
Mscrm.RefreshFormMarker.FinishRetrieveLayout = "FinishRetrieveLayoutTimestamp";
Mscrm.RefreshFormMarker.StartDataBinding = "StartDataBindingTimestamp";
Mscrm.RefreshFormMarker.FinishDataBinding = "FinishDataBindingTimestamp";
Mscrm.RefreshFormMarker.StartRetrieveAttributesMetadata = "StartRetrieveAttributesMetadataTimestamp";
Mscrm.RefreshFormMarker.FinishRetrieveAttributesMetadata = "FinishRetrieveAttributesMetadataTimestamp";
Mscrm.RefreshFormMarker.StartProcessControlInitializer = "StartProcessControlInitializerTimestamp";
Mscrm.RefreshFormMarker.FinishProcessControlInitializer = "FinishProcessControlInitializerTimestamp";
Mscrm.RefreshFormMarker.StartInlineEditInitializer = "StartInlineEditInitializerTimestamp";
Mscrm.RefreshFormMarker.FinishInlineEditInitializer = "FinishInlineEditInitializerTimestamp";
Mscrm.RefreshFormMarker.StartUpdatePageHeader = "StartUpdatePageHeaderTimestamp";
Mscrm.RefreshFormMarker.FinishUpdatePageHeader = "FinishUpdatePageHeaderTimestamp";
Mscrm.RefreshFormMarker.StartLinkControlInitialization = "StartLinkControlInitTimestamp";
Mscrm.RefreshFormMarker.FinishLinkControlInitialization = "FinishLinkControlInitTimestamp";
Mscrm.RefreshFormMarker.StartLoadingMissingScripts = "StartLoadingMissingScripts";
Mscrm.RefreshFormMarker.FinishLoadingMissingScripts = "FinishLoadingMissingScripts";
Mscrm.RefreshFormMarker.StartLoadingProcessStageAdvance = "StartLoadingProcessStageAdvanceTimestamp";
Mscrm.RefreshFormMarker.FinishLoadingProcessStageAdvance = "FinishLoadingProcessStageAdvanceTimestamp";
Mscrm.RefreshFormMarker.StartLoadingProcessStageBack = "StartLoadingProcessStageBackTimestamp";
Mscrm.RefreshFormMarker.FinishLoadingProcessStageBack = "FinishLoadingProcessStageBackTimestamp";
Mscrm.RefreshFormMarker.StartLoadingNewProcessStage = "StartLoadingNewProcessStageTimestamp";
Mscrm.RefreshFormMarker.FinishLoadingNewProcessStage = "FinishLoadingNewProcessStageTimestamp";
Mscrm.RefreshFormMarker.StartSubjectLookupRetrieve = "StartSubjectLookupRetrieveTimestamp";
Mscrm.RefreshFormMarker.FinishSubjectLookupRetrieve = "FinishSubjectLookupRetrieveTimestamp";
Mscrm.RefreshFormMarker.StartSubjectLookupShow = "StartSubjectLookupShowTimestamp";
Mscrm.RefreshFormMarker.FinishSubjectLookupShow = "FinishSubjectLookupShowTimestamp";
Mscrm.RefreshFormMarker.StartOpenFlyOut = "StartOpenFlyOutTimestamp";
Mscrm.RefreshFormMarker.FinishOpenFlyOut = "FinishOpenFlyOutTimestamp";
Mscrm.RefreshFormMarker.StartCloseFlyOut = "StartCloseFlyOutTimestamp";
Mscrm.RefreshFormMarker.FinishCloseFlyOut = "FinishCloseFlyOutTimestamp";
Mscrm.RefreshFormMarker.StartCancelFlyOut = "StartCancelFlyOutTimestamp";
Mscrm.RefreshFormMarker.FinishCancelFlyOut = "FinishCancelFlyOutTimestamp";
Mscrm.RefreshFormMarker.StartWallHtmlLoad = "StartWallHtmlLoadTimestamp";
Mscrm.RefreshFormMarker.FinishWallHtmlLoad = "FinishWallHtmlLoadTimestamp";
Mscrm.RefreshFormMarker.StartWallRefreshLoadTime = "StartWallRefreshLoadTimestamp";
Mscrm.RefreshFormMarker.FinishWallRefreshLoadTime = "FinishWallRefreshLoadTimestamp";
Mscrm.RefreshFormMarker.StartNotesWallRefreshLoadTime = "StartNotesWallRefreshLoadTimestamp";
Mscrm.RefreshFormMarker.FinishNotesWallRefreshLoadTime = "FinishNotesWallRefreshLoadTimestamp";
Mscrm.RefreshFormMarker.StartPostNoteTime = "StartPostNoteTimestamp";
Mscrm.RefreshFormMarker.FinishPostNoteTime = "FinishPostNoteTimestamp";
Mscrm.RefreshFormMarker.StartDeleteNoteTime = "StartDeleteNoteTimestamp";
Mscrm.RefreshFormMarker.FinishDeleteNoteTime = "FinishDeleteNoteTimestamp";
Mscrm.RefreshFormMarker.StartStyleSheetTime = "StartStyleSheetTimestamp";
Mscrm.RefreshFormMarker.FinishStyleSheetTime = "FinishStyleSheetTimestamp";
Mscrm.RefreshFormMarker.StartLoadingScriptBlocks = "StartLoadingScriptBlocksTimestamp";
Mscrm.RefreshFormMarker.FinishLoadingScriptBlocks = "FinishLoadingScriptBlocksTimestamp";
Mscrm.RefreshFormMarker.StartOnPageRefreshed = "StartOnPageRefreshedTimestamp";
Mscrm.RefreshFormMarker.FinishOnPageRefreshed = "FinishOnPageRefreshedTimestamp";
Mscrm.RefreshFormMarker.StartPostInitialization = "StartPostInitializationTimestamp";
Mscrm.RefreshFormMarker.FinishPostInitialization = "FinishPostInitializationTimestamp";
Mscrm.RefreshFormMarker.StartPostInitializeProcessControl = "StartPostInitializeProcessControlTimestamp";
Mscrm.RefreshFormMarker.FinishPostInitializeProcessControl = "FinishPostInitializeProcessControlTimestamp";
Mscrm.RefreshFormMarker.StartAddingConnection = "StartAddingConnectionTimestamp";
Mscrm.RefreshFormMarker.StartAddingCompetitor = "StartAddingCompetitorTimestamp";
Mscrm.RefreshFormMarker.StartUpdatingConnection = "StartUpdatingConnectionTimestamp";
Mscrm.RefreshFormMarker.FinishAddingConnection = "FinishAddingConnectionTimestamp";
Mscrm.RefreshFormMarker.FinishAddingCompetitor = "FinishAddingCompetitorTimestamp";
Mscrm.RefreshFormMarker.FinishUpdatingConnection = "FinishUpdatingConnectionTimestamp";
Mscrm.RefreshFormMarker.FinishRefreshingSubGridLite = "FinishRefreshingSubGridLiteTimestamp";
Mscrm.RefreshFormMarker.BeginCreateFormNavControl = "BeginCreateFormNavControlTimestamp";
Mscrm.RefreshFormMarker.EndCreateFormNavControl = "EndCreateFormNavControlTimestamp";
Mscrm.RefreshFormMarker.ServiceRoundtrip = "ServiceRoundtrip";
Mscrm.RefreshFormMarker.ResetFormState = "ResetFormState";
Mscrm.RefreshFormMarker.ControlsInitializationComplete = "ControlsInitializationCompleteTimestamp";
Mscrm.RefreshFormMarker.OpportunityCloseFlyOutStart = "OpportunityCloseFlyoutStartTimestamp";
Mscrm.RefreshFormMarker.OpportunityCloseFlyOutFinish = "OpportunityCloseFlyoutFinishTimestamp";
Mscrm.IconUtil.maxIconSize = 10240;
Mscrm.IconUtil.defaultIcon = "/_imgs/ico_16.gif";
Mscrm.IconUtil.genericCustomEntityRibbonIconSuffix = "Custom.png";
Mscrm.RibbonConstants.jewelId = "Mscrm.Jewel";
Mscrm.RuleAppliesTo.none = 0;
Mscrm.RuleAppliesTo.primaryEntity = 1;
Mscrm.RuleAppliesTo.selectedEntity = 2;
Mscrm.RibbonRuleRelationshipType.noRelationship = 0;
Mscrm.RibbonRuleRelationshipType.oneToMany = 1;
Mscrm.RibbonRuleRelationshipType.manyToMany = 2;
Mscrm.RibbonContexts.form = "Form";
Mscrm.RibbonContexts.homepageGrid = "HomePageGrid";
Mscrm.RibbonContexts.subGridStandard = "SubGridStandard";
Mscrm.RibbonContexts.subGridAssociated = "SubGridAssociated";
Mscrm.TypeOfResource.Inline = "inline";
Mscrm.TypeOfResource.External = "external";
Mscrm.AggregatePerformanceMarkers.$2b = null;
Mscrm.EntityTypeCode.None = 0;
Mscrm.EntityTypeCode.Account = 1;
Mscrm.EntityTypeCode.ActivityMimeAttachment = 1001;
Mscrm.EntityTypeCode.ActivityParty = 135;
Mscrm.EntityTypeCode.ActivityPointer = 4200;
Mscrm.EntityTypeCode.Annotation = 5;
Mscrm.EntityTypeCode.AnnualFiscalCalendar = 2e3;
Mscrm.EntityTypeCode.Appointment = 4201;
Mscrm.EntityTypeCode.AsyncOperation = 4700;
Mscrm.EntityTypeCode.AttributeMap = 4601;
Mscrm.EntityTypeCode.Audit = 4567;
Mscrm.EntityTypeCode.BulkDeleteFailure = 4425;
Mscrm.EntityTypeCode.BulkDeleteOperation = 4424;
Mscrm.EntityTypeCode.BulkOperation = 4406;
Mscrm.EntityTypeCode.BulkOperationLog = 4405;
Mscrm.EntityTypeCode.BusinessUnit = 10;
Mscrm.EntityTypeCode.BusinessUnitNewsArticle = 132;
Mscrm.EntityTypeCode.Calendar = 4003;
Mscrm.EntityTypeCode.CalendarRule = 4004;
Mscrm.EntityTypeCode.Campaign = 4400;
Mscrm.EntityTypeCode.CampaignActivity = 4402;
Mscrm.EntityTypeCode.CampaignResponse = 4401;
Mscrm.EntityTypeCode.Competitor = 123;
Mscrm.EntityTypeCode.ResourceGroup = 4007;
Mscrm.EntityTypeCode.ConstraintBasedGroup = 4007;
Mscrm.EntityTypeCode.Connection = 3234;
Mscrm.EntityTypeCode.ConnectionRole = 3231;
Mscrm.EntityTypeCode.Contact = 2;
Mscrm.EntityTypeCode.Contract = 1010;
Mscrm.EntityTypeCode.ContractDetail = 1011;
Mscrm.EntityTypeCode.ContractTemplate = 2011;
Mscrm.EntityTypeCode.CustomerAddress = 1071;
Mscrm.EntityTypeCode.CustomerOpportunityRole = 4503;
Mscrm.EntityTypeCode.CustomerRelationship = 4502;
Mscrm.EntityTypeCode.Dependency = 7105;
Mscrm.EntityTypeCode.Discount = 1013;
Mscrm.EntityTypeCode.DiscountType = 1080;
Mscrm.EntityTypeCode.DisplayString = 4102;
Mscrm.EntityTypeCode.DocumentIndex = 126;
Mscrm.EntityTypeCode.DuplicateRule = 4414;
Mscrm.EntityTypeCode.Email = 4202;
Mscrm.EntityTypeCode.Equipment = 4e3;
Mscrm.EntityTypeCode.Fax = 4204;
Mscrm.EntityTypeCode.FieldSecurityProfile = 1200;
Mscrm.EntityTypeCode.FieldPermission = 1201;
Mscrm.EntityTypeCode.FixedMonthlyFiscalCalendar = 2004;
Mscrm.EntityTypeCode.Goal = 9600;
Mscrm.EntityTypeCode.Metric = 9603;
Mscrm.EntityTypeCode.RollupField = 9604;
Mscrm.EntityTypeCode.GoalRollupQuery = 9602;
Mscrm.EntityTypeCode.ImportEntity = 4410;
Mscrm.EntityTypeCode.ImportFile = 4412;
Mscrm.EntityTypeCode.ImportJob = 9107;
Mscrm.EntityTypeCode.ImportLog = 4423;
Mscrm.EntityTypeCode.ImportMap = 4411;
Mscrm.EntityTypeCode.Incident = 112;
Mscrm.EntityTypeCode.IncidentResolution = 4206;
Mscrm.EntityTypeCode.Invoice = 1090;
Mscrm.EntityTypeCode.InvoiceDetail = 1091;
Mscrm.EntityTypeCode.KbArticle = 127;
Mscrm.EntityTypeCode.KbArticleComment = 1082;
Mscrm.EntityTypeCode.KbArticleTemplate = 1016;
Mscrm.EntityTypeCode.Lead = 4;
Mscrm.EntityTypeCode.Letter = 4207;
Mscrm.EntityTypeCode.List = 4300;
Mscrm.EntityTypeCode.ListMember = 4301;
Mscrm.EntityTypeCode.MailMergeTemplate = 9106;
Mscrm.EntityTypeCode.MonthlyFiscalCalendar = 2003;
Mscrm.EntityTypeCode.Opportunity = 3;
Mscrm.EntityTypeCode.OpportunityClose = 4208;
Mscrm.EntityTypeCode.OpportunityProduct = 1083;
Mscrm.EntityTypeCode.OrderClose = 4209;
Mscrm.EntityTypeCode.Organization = 1019;
Mscrm.EntityTypeCode.PhoneCall = 4210;
Mscrm.EntityTypeCode.PluginAssembly = 4605;
Mscrm.EntityTypeCode.PluginType = 4602;
Mscrm.EntityTypeCode.PluginTypeStatistic = 4603;
Mscrm.EntityTypeCode.Post = 8e3;
Mscrm.EntityTypeCode.PostFollow = 8003;
Mscrm.EntityTypeCode.PostLike = 8006;
Mscrm.EntityTypeCode.PriceLevel = 1022;
Mscrm.EntityTypeCode.Privilege = 1023;
Mscrm.EntityTypeCode.Product = 1024;
Mscrm.EntityTypeCode.ProductPriceLevel = 1026;
Mscrm.EntityTypeCode.Publisher = 7101;
Mscrm.EntityTypeCode.QuarterlyFiscalCalendar = 2002;
Mscrm.EntityTypeCode.Queue = 2020;
Mscrm.EntityTypeCode.QueueItem = 2029;
Mscrm.EntityTypeCode.Quote = 1084;
Mscrm.EntityTypeCode.QuoteClose = 4211;
Mscrm.EntityTypeCode.QuoteDetail = 1085;
Mscrm.EntityTypeCode.RecurringAppointmentMaster = 4251;
Mscrm.EntityTypeCode.RelationshipRole = 4500;
Mscrm.EntityTypeCode.RelationshipRoleMap = 4501;
Mscrm.EntityTypeCode.Report = 9100;
Mscrm.EntityTypeCode.ResourceSpec = 4006;
Mscrm.EntityTypeCode.RibbonCommand = 1116;
Mscrm.EntityTypeCode.RibbonContextGroup = 1115;
Mscrm.EntityTypeCode.RibbonCustomization = 1120;
Mscrm.EntityTypeCode.RibbonDiff = 1130;
Mscrm.EntityTypeCode.RibbonRule = 1117;
Mscrm.EntityTypeCode.RibbonTabToCommandMap = 1113;
Mscrm.EntityTypeCode.SharePointSite = 9502;
Mscrm.EntityTypeCode.SharePointDocumentLocation = 9508;
Mscrm.EntityTypeCode.SystemForm = 1030;
Mscrm.EntityTypeCode.UserForm = 1031;
Mscrm.EntityTypeCode.Role = 1036;
Mscrm.EntityTypeCode.SalesLiterature = 1038;
Mscrm.EntityTypeCode.SalesLiteratureItem = 1070;
Mscrm.EntityTypeCode.SalesOrder = 1088;
Mscrm.EntityTypeCode.SalesOrderDetail = 1089;
Mscrm.EntityTypeCode.SavedQuery = 1039;
Mscrm.EntityTypeCode.SavedQueryVisualization = 1111;
Mscrm.EntityTypeCode.SdkMessageProcessingStep = 4608;
Mscrm.EntityTypeCode.SdkMessageProcessingStepImage = 4615;
Mscrm.EntityTypeCode.SemiAnnualFiscalCalendar = 2001;
Mscrm.EntityTypeCode.Service = 4001;
Mscrm.EntityTypeCode.ServiceAppointment = 4214;
Mscrm.EntityTypeCode.ServiceEndpoint = 4618;
Mscrm.EntityTypeCode.Site = 4009;
Mscrm.EntityTypeCode.SiteMap = 4709;
Mscrm.EntityTypeCode.Solution = 7100;
Mscrm.EntityTypeCode.SolutionComponent = 7103;
Mscrm.EntityTypeCode.Subject = 129;
Mscrm.EntityTypeCode.SystemUser = 8;
Mscrm.EntityTypeCode.Task = 4212;
Mscrm.EntityTypeCode.Team = 9;
Mscrm.EntityTypeCode.Template = 2010;
Mscrm.EntityTypeCode.Territory = 2013;
Mscrm.EntityTypeCode.TransactionCurrency = 9105;
Mscrm.EntityTypeCode.UnresolvedAddress = 2012;
Mscrm.EntityTypeCode.UoM = 1055;
Mscrm.EntityTypeCode.UoMSchedule = 1056;
Mscrm.EntityTypeCode.UserFiscalCalendar = 1086;
Mscrm.EntityTypeCode.UserQuery = 4230;
Mscrm.EntityTypeCode.UserQueryVisualization = 1112;
Mscrm.EntityTypeCode.UserSettings = 150;
Mscrm.EntityTypeCode.Workflow = 4703;
Mscrm.EntityTypeCode.WebResource = 9333;
Mscrm.EntityTypeCode.ServiceRestrictionCalendarRule = 5003;
Mscrm.EntityTypeCode.TimeOffCalendarRule = 5004;
Mscrm.EntityTypeCode.HolidayCalendarRule = 5005;
Mscrm.EntityTypeCode.OccurrenceCalendarRule = 5006;
Mscrm.EntityTypeCode.RecurrenceCalendarRule = 5007;
Mscrm.EntityTypeCode.OccurringWorkShift = 5008;
Mscrm.EntityTypeCode.RecurringWorkShift = 5009;
Mscrm.EntityTypeCode.NotWorkingWorkShift = 5010;
Mscrm.EntityTypeCode.ActivityScheduling = 5011;
Mscrm.EntityTypeCode.AppLicense = 9002;
Mscrm.EntityTypeCode.AppSalesPerson = 9003;
Mscrm.EntityTypeCode.AppOfflineFilter = 9004;
Mscrm.EntityTypeCode.AppWorkflowInstance = 9005;
Mscrm.EntityTypeCode.ReportPropertyDialog = 9099;
Mscrm.EntityTypeCode.ScriptErrorDialog = 9200;
Mscrm.EntityTypeCode.ScriptErrorDetailsDialog = 9201;
Mscrm.EntityTypeCode.DuplicateDetectionDialog = 9203;
Mscrm.EntityTypeCode.BulkDeleteWizardDialog = 9204;
Mscrm.EntityTypeCode.ImportWizardDialog = 9205;
Mscrm.EntityTypeCode.UnresolvedEmailParty = 9206;
Mscrm.EntityTypeCode.SolutionExportWizard = 9207;
Mscrm.EntityTypeCode.SolutionImportWizard = 9208;
Mscrm.EntityTypeCode.AccountAddress = 1e3;
Mscrm.EntityTypeCode.ContactAddress = 1008;
Mscrm.EntityTypeCode.NewKbArticle = 9202;
Mscrm.EntityTypeCode.Entity = 9801;
Mscrm.EntityTypeCode.Attribute = 9802;
Mscrm.EntityTypeCode.Relationship = 9803;
Mscrm.EntityTypeCode.OptionSet = 9804;
Mscrm.EntityTypeCode.EntityRelationship = 9805;
Mscrm.EntityTypeCode.AttributePicklistValue = 9806;
Mscrm.EntityTypeCode.EntityRelationshipRole = 9807;
Mscrm.EntityTypeCode.RolePrivileges = 9808;
Mscrm.EntityTypeCode.LocalizedLabel = 9809;
Mscrm.EntityTypeCode.ViewAttribute = 9810;
Mscrm.EntityTypeCode.RoleTemplatePrivileges = 9811;
Mscrm.EntityTypeCode.BaseAddEntityObjectTypeCode = 1e4;
Mscrm.EntityTypeCode.InternalAddress = 1003;
Mscrm.EntityTypeCode.CompetitorAddress = 1004;
Mscrm.EntityTypeCode.LeadAddress = 1017;
Mscrm.EntityTypeCode.OrganizationUI = 1021;
Mscrm.EntityTypeCode.RoleTemplate = 1037;
Mscrm.EntityTypeCode.License = 2027;
Mscrm.EntityTypeCode.IntegrationStatus = 3e3;
Mscrm.EntityTypeCode.SubscriptionSyncInfo = 33;
Mscrm.EntityTypeCode.EntityMap = 4600;
Mscrm.EntityTypeCode.Notification = 4110;
Mscrm.EntityTypeCode.BusinessUnitMap = 6;
Mscrm.EntityTypeCode.DisplayStringMap = 4101;
Mscrm.EntityTypeCode.Subscription = 29;
Mscrm.EntityTypeCode.FilterTemplate = 30;
Mscrm.EntityTypeCode.SubscriptionClients = 1072;
Mscrm.EntityTypeCode.ColumnMapping = 4417;
Mscrm.EntityTypeCode.SubscriptionManuallyTrackedObject = 34;
Mscrm.EntityTypeCode.DuplicateRecord = 4415;
Mscrm.EntityTypeCode.DuplicateRuleCondition = 4416;
Mscrm.EntityTypeCode.EmailHash = 4023;
Mscrm.EntityTypeCode.ImportData = 4413;
Mscrm.EntityTypeCode.IsvConfig = 4705;
Mscrm.EntityTypeCode.LookUpMapping = 4419;
Mscrm.EntityTypeCode.OwnerMapping = 4420;
Mscrm.EntityTypeCode.PickListMapping = 4418;
Mscrm.EntityTypeCode.SdkMessage = 4606;
Mscrm.EntityTypeCode.SdkMessageFilter = 4607;
Mscrm.EntityTypeCode.SdkMessagePair = 4613;
Mscrm.EntityTypeCode.SdkMessageRequest = 4609;
Mscrm.EntityTypeCode.SdkMessageRequestField = 4614;
Mscrm.EntityTypeCode.SdkMessageResponse = 4610;
Mscrm.EntityTypeCode.SdkMessageResponseField = 4611;
Mscrm.EntityTypeCode.TransformationMapping = 4426;
Mscrm.EntityTypeCode.WorkflowWaitSubscription = 4702;
Mscrm.EntityTypeCode.SystemUserPrincipals = 14;
Mscrm.EntityTypeCode.WorkflowDependency = 4704;
Mscrm.EntityTypeCode.TransformationParameterMapping = 4427;
Mscrm.EntityTypeCode.ApplicationFile = 4707;
Mscrm.EntityTypeCode.PrivilegeObjectTypeCodes = 31;
Mscrm.EntityTypeCode.ClientUpdate = 36;
Mscrm.EntityTypeCode.OrganizationStatistic = 4708;
Mscrm.EntityTypeCode.ResourceGroupExpansion = 4010;
Mscrm.EntityTypeCode.InterProcessLock = 4011;
Mscrm.EntityTypeCode.SdkMessageProcessingStepSecureConfig = 4616;
Mscrm.EntityTypeCode.TimeZoneDefinition = 4810;
Mscrm.EntityTypeCode.TimeZoneLocalizedName = 4812;
Mscrm.EntityTypeCode.TimeZoneRule = 4811;
Mscrm.EntityTypeCode.WebWizard = 4800;
Mscrm.EntityTypeCode.WizardAccessPrivilege = 4803;
Mscrm.EntityTypeCode.WizardPage = 4802;
Mscrm.EntityTypeCode.WorkflowLog = 4706;
Mscrm.EntityTypeCode.ProcessSession = 4710;
Mscrm.EventKeys.click = "click";
Mscrm.EventKeys.change = "change";
Mscrm.EventKeys.onChange = "onchange";
Mscrm.EventKeys.focus = "focus";
Mscrm.EventKeys.blur = "blur";
Mscrm.EventKeys.keyDown = "keydown";
Mscrm.EventKeys.mouseOut = "mouseout";
Mscrm.EventKeys.mouseOver = "mouseover";
Mscrm.SolutionComponentType.None = 0;
Mscrm.SolutionComponentType.Entity = 1;
Mscrm.SolutionComponentType.Attribute = 2;
Mscrm.SolutionComponentType.Relationship = 3;
Mscrm.SolutionComponentType.OptionSet = 9;
Mscrm.SolutionComponentType.EntityRelationship = 10;
Mscrm.SolutionComponentType.EntityRelationshipRelationships = 12;
Mscrm.SolutionComponentType.Role = 20;
Mscrm.SolutionComponentType.Organization = 25;
Mscrm.SolutionComponentType.SavedQuery = 26;
Mscrm.SolutionComponentType.Workflow = 29;
Mscrm.SolutionComponentType.Template = 36;
Mscrm.SolutionComponentType.ContractTemplate = 37;
Mscrm.SolutionComponentType.KbArticleTemplate = 38;
Mscrm.SolutionComponentType.MailMergeTemplate = 39;
Mscrm.SolutionComponentType.DuplicateRule = 44;
Mscrm.SolutionComponentType.EntityMap = 46;
Mscrm.SolutionComponentType.AttributeMap = 47;
Mscrm.SolutionComponentType.SavedQueryVisualization = 59;
Mscrm.SolutionComponentType.SystemForm = 60;
Mscrm.SolutionComponentType.WebResource = 61;
Mscrm.SolutionComponentType.ConnectionRole = 63;
Mscrm.WebResourceConstants.sizeModeStretchToFit = "StretchToFit";
Mscrm.WebResourceConstants.sizeModeStretchMaintainAspectRatio = "StretchMaintainAspectRatio";
Mscrm.WebResourceConstants.sizeModeSpecific = "Specific";
Mscrm.CrmHeader.$12 = null;
Mscrm.CrmHeader.$1H = null;
Mscrm.Dialog.auto = -1;
Mscrm.Dialog.numZLevels = 4;
Mscrm.Dialog.$5c = 0;
Mscrm.InlineMenuItem.$3 = {};
Mscrm.Menu.$18 = -1;
Mscrm.Menu.$34 = null;
Mscrm.MenuItem.$4T = 0;
Mscrm.MenuItem.defaultStylePrefix = "";
Mscrm.MenuItem.formaT_IMAGE_SEP_TITLE_AUX = 0;
Mscrm.MenuItem.formaT_AUX_IMAGE_SEP_TITLE = 1;
Mscrm.MenuItem.$4I = {};
Mscrm.MenuStyles.defaultStylePrefix = "";
Mscrm.MenuStyles.recentlyViewedStylePrefix = "RV";
Mscrm.MenuStyles.recordSelectorStylePrefix = "RS";
Mscrm.MenuStyles.contextMenuStylePrefix = "CM";
Mscrm.MenuStyles.activityViewSelectorStylePrefix = "AVS";
Mscrm.MenuStyles.viewSelectorStylePrefix = "VS";
Mscrm.MenuStyles.viewSelectorHeaderStylePrefix = "VS-header";
Mscrm.MenuStyles.formSelectorStylePrefix = "FS";
Mscrm.MenuStyles.multiSelectStylePrefix = "MS";
Mscrm.MenuStyles.lookupMruStylePrefix = "LK";
Mscrm.MenuStyles.inlineLookupStylePrefix = "IL";
Mscrm.MenuStyles.notification = "Ntfc";
Mscrm.MenuStyles.popupStylePrefix = "POPUP";
Mscrm.MenuStyles.quirksSuffix = "-qrk";
Mscrm.MenuStyles.disabledStyle = "ms-crm-MenuItem-Disabled";
Mscrm.CrmBrowser.$2f = null;
Mscrm.CrmUIComponent.$$cctor();
Mscrm.CurrencyValidator.$61 = 4;
Mscrm.CurrencyValidator.$62 = 1;
Mscrm.CurrencyValidator.$5z = 100;
Mscrm.CurrencyValidator.$60 = 1;
Mscrm.CurrencyValidator.$3O = null;
Mscrm.CurrencyValidator.$2U = null;
Mscrm.CurrencyValidator.$3P = null;
Mscrm.CurrencyValidator.$3S = null;
Mscrm.CurrencyValidator.$k = null;
Mscrm.CurrencyValidator.$m = null;
Mscrm.CurrencyValidator.$l = null;
Mscrm.CurrencyValidator.$3a = null;
Mscrm.CurrencyValidator.$3U = null;
Mscrm.CurrencyValidator.$26 = null;
Mscrm.CurrencyValidator.$3R = null;
Mscrm.CurrencyValidator.$3Z = null;
Mscrm.CurrencyValidator.$3c = null;
Mscrm.CurrencyValidator.$4K = null;
Mscrm.CrmUri.versionStampParameterName = "ver";
Mscrm.CrmUri.cssLcidParameterName = "lcid";
Mscrm.CrmUri.$65 = new RegExp("\\.bmp$|\\.css$|\\.css\\.aspx$|\\.gif$|\\.htc$|\\.htc\\.aspx$|\\.ico$|\\.jpg$|\\.js$|\\.js\\.aspx$|\\.png$|\\.xsl$|global\\.ashx$", "i");
Mscrm.CrmWindow.onBeforeUnloadHandler = null;
Mscrm.CrmWindow.onUnloadHandler = null;
Mscrm.CrmWindow.dialogRetryReturnValue = "___RETRY___";
Mscrm.CrmWindow.$1F = {};
Mscrm.CrmWindow.$2n = {};
Mscrm.CrmWindow.$16 = {};
Mscrm.DateTimeUtility.$4s = new Date(9999, 11, 30);
Mscrm.DateTimeUtility.$4t = new Date(1900, 0, 1);
Mscrm.Display.$3g = false;
Mscrm.Form.formHeaderContainerId = "formHeaderContainer";
Mscrm.Form.formFooterContainerId = "formFooterContainer";
Mscrm.Form.refreshFormFooterContainerId = "refreshFormFooterContainer";
Mscrm.FormControlInputBehavior.dataValueChangeEventKey = "OnDataValueChange";
Mscrm.GlobalEvents.$N = null;
Mscrm.GlobalEvents.$3W = false;
Mscrm.GlobalEvents.$$cctor();
Mscrm.ImageStrip.$2s = null;
Mscrm.ImageStrip.$5Y = new RegExp("(\\s|^)(ms-crm-ImageStrip-\\S+)(\\s|$)");
Mscrm.TypeNames.numberType = "number";
Mscrm.TypeNames.stringType = "string";
Mscrm.TypeNames.booleanType = "boolean";
Mscrm.TypeNames.objectType = "object";
Mscrm.TypeNames.functionType = "function";
Mscrm.TypeNames.undefinedType = "undefined";
Mscrm.TypeNames.unknownType = "unknown";
Mscrm.ClassNames.argumentsClass = "Arguments";
Mscrm.ClassNames.arrayClass = "Array";
Mscrm.ClassNames.booleanClass = "Boolean";
Mscrm.ClassNames.dateClass = "Date";
Mscrm.ClassNames.errorClass = "Error";
Mscrm.ClassNames.functionClass = "Function";
Mscrm.ClassNames.jsonClass = "JSON";
Mscrm.ClassNames.mathClass = "Math";
Mscrm.ClassNames.numberClass = "Number";
Mscrm.ClassNames.objectClass = "Object";
Mscrm.ClassNames.regExpClass = "RegExp";
Mscrm.ClassNames.stringClass = "String";
Mscrm.InlineContentLoader.$J = null;
Mscrm.InlineContentLoader.$12 = null;
Mscrm.InlineContentLoader.$1H = null;
Mscrm.InlineContentLoader.$$cctor();
Mscrm.NumberUtility.$3t = ["\uff41", "\uff4d", "\uff50", "\uff21", "\uff2d", "\uff30", "\u2019", "\u3000", "\uff1a", "\u3001", "\uff0c", "\uff0d", "\u30fc", "\u2015", "\u2010", "\uff0e", "\u3002", "\uff0f", "\uff10", "\uff11", "\uff12", "\uff13", "\uff14", "\uff15", "\uff16", "\uff17", "\uff18", "\uff19"];
Mscrm.NumberUtility.$4h = ["a", "m", "p", "A", "M", "P", "'", " ", ":", ",", ",", "-", "-", "-", "-", ".", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
Mscrm.PerformanceTracing.$2l = null;
Mscrm.OutlookUtil.$3J = null;
Mscrm.CacheScope.Local = 0;
Mscrm.CacheScope.Global = 1;
Mscrm.CacheScope.ChildOnly = 2;
Mscrm.ResponseType.Json = "Json";
Mscrm.ResponseType.Html = "Html";
Mscrm.PageManager.$2w = false;
Mscrm.PageManager.$1Y = false;
Mscrm.ReportViewType.none = 0;
Mscrm.ReportViewType.viewInSrs = 1;
Mscrm.ReportViewType.viewAtServer = 2;
Mscrm.ReportViewType.viewInApp = 3;
Mscrm.ReportViewType.viewLinked = 4;
Mscrm.ReportUtil.$3A = {};
Mscrm.ReportUtil.$31 = null;
Mscrm.ReportUtil.$2M = null;
Mscrm.ScriptErrorReporting.$14 = null;
Mscrm.ScriptErrorReporting.$$cctor();
Mscrm.SessionInfo.$28 = false;
Mscrm.SolutionDecorater.$3X = null;
Mscrm.SolutionDecorater.$4L = null;
Mscrm.SolutionDecorater.solutionId = "appSolutionId";
Mscrm.ContextMenuAction.open = 0;
Mscrm.ContextMenuAction.openInNewWindow = 1;
Mscrm.ContextMenuAction.copyShortcut = 2;
Mscrm.ContextMenuAction.sendShortcut = 3;
Mscrm.ContextMenuAction.pinItem = 4;
Mscrm.ContextMenuAction.unpinItem = 5;
Mscrm.ContextMenuAction.print = 6;
Mscrm.ContextMenuAction.refresh = 7;
Mscrm.ContextMenuAction.openSource = 8;
Mscrm.Utilities.$3f = new RegExp("(^/WEBRESOURCES/)|(^/(%7B|\\{)[0-9]{15,22}(%7D|\\})/WEBRESOURCES/)", "i");
Mscrm.Utilities.emptyString = "";
Mscrm.Utilities.$2y = null;
Mscrm.Utilities.$1C = 0;
Mscrm.Utilities.$2v = null;
Mscrm.Utilities.$1M = null;
Mscrm.Utilities.inlineMenuMinWidth = 300;
Mscrm.MetricsReporting.$2u = null;
Mscrm.CrmLocalStorage.$2N = null;
Mscrm.FeatureControl.$4e = new Mscrm.DefaultFeatureControlChecks;
Mscrm.FeatureNames.RefreshFall = "FCB.Refresh.Fall";
Mscrm.FeatureNames.RefreshSales = "FCB.Refresh.Sales";
Mscrm.FeatureNames.RefreshService = "FCB.Refresh.Service";
Mscrm.FeatureNames.RefreshCommonInfrastructure = "FCB.Refresh.Common";
Mscrm.FeatureNames.HelpRedirect = "FCB.HelpRedirect";
Xrm.Page.data = null;
Xrm.Page.ui = null;
Xrm.Page.context = new Mscrm.GlobalContext;
Mscrm.Obsolete.RenderVariables.$$cctor();
Type.registerNamespace("XUI");
XUI.ClipboardManager = function () {
    var _this = this,
        _mimeType = GetMimeType(),
        _clipboardContext;

    function GetMimeType() {
        if (Sys.Browser.agent == Sys.Browser.Safari || Sys.Browser.agent == Sys.Browser.AppleWebKit) return "text/plain";
        else if (Sys.Browser.agent == Sys.Browser.Firefox) return "text/unicode";
        else return "text"
    }
    var clipboardApi = {
        SetData: function (data) {
            window.clipboardData.setData(_mimeType, data);
            return true
        },
        GetData: function (data) {
            return window.clipboardData.getData(_mimeType)
        }
    }, componentsApi = {
        SetData: function (data) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            var stringComp = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString),
                transfComp = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            transfComp.addDataFlavor(_mimeType);
            var clipboardService = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
            stringComp.data = data;
            transfComp.setTransferData(_mimeType, stringComp, data.length * 2);
            clipboardService.setData(transfComp, null, Components.interfaces.nsIClipboard.kGlobalClipboard);
            return true
        },
        GetData: function (data) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            var clipboardService = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard),
                transfComp = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            transfComp.addDataFlavor(_mimeType);
            var dataComp = {}, length = {};
            clipboardService.getData(transfComp, Components.interfaces.nsIClipboard.kGlobalClipboard);
            transfComp.getTransferData(_mimeType, dataComp, length);
            dataComp = dataComp && dataComp.value.QueryInterface(Components.interfaces.nsISupportsString);
            return dataComp && dataComp.data.substring(0, length.value / 2)
        }
    }, internalApi = {
        SetData: function (data) {
            _clipboardContext = {};
            _clipboardContext[_mimeType] = data;
            return true
        },
        GetData: function (data) {
            return _clipboardContext && _clipboardContext[_mimeType]
        }
    };

    function SelectApi(apiName) {
        if (window.clipboardData && window.clipboardData.setData) return clipboardApi[apiName];
        else if (window.Components) try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            return componentsApi[apiName]
        } catch (e) {
            return internalApi[apiName]
        } else return internalApi[apiName]
    }
    this.SetData = function (data) {
        this.SetData = SelectApi("SetData");
        return this.SetData(data)
    };
    this.GetData = function () {
        this.GetData = SelectApi("GetData");
        return this.GetData()
    }
};
Type.registerNamespace("XUI");
XUI.DomUtilities = function () {
    var NodeType = {
        Element: 1,
        TextNode: 3,
        Document: 9
    };

    function Trim(strValue) {
        if (strValue != null) return strValue.replace(/^\s*/, "").replace(/\s*$/, "");
        return strValue
    }
    function IsEnumerable(domNode) {
        var nodeType = domNode.nodeType;
        if (nodeType == NodeType.Element) return true;
        if (nodeType == NodeType.TextNode) {
            var textContent = domNode.nodeValue;
            return textContent && Trim(textContent).length > 0
        }
        return false
    }
    function FindEnumerableNode(domNode, sPrevNextSibling) {
        var r = domNode;
        while (r != null && !IsEnumerable(r)) r = r[sPrevNextSibling];
        return r
    }
    var functionsRequiringInit = [{
        name: "Contains",
        selector: function () {
            return document.body.contains != null ? function (domNode, otherDomNode) {
                return domNode && domNode.contains(otherDomNode)
            } : function (domNode, otherDomNode) {
                return domNode && domNode.compareDocumentPosition(otherDomNode) >= 16
            }
        }
    }];

    function UpdateStub(fnInfo) {
        api[fnInfo.name] = function () {
            api[fnInfo.name] = fnInfo.selector();
            return api[fnInfo.name].apply(api, arguments)
        }
    }
    for (var api = {
        NodeType: NodeType,
        HasChildElements: function (domNode, countEmptyNodes) {
            if (domNode.hasChildNodes()) {
                var childNodes = domNode.childNodes;
                if (countEmptyNodes) return childNodes.length > 0;
                else return this.GetFirstChild(domNode) != null
            } else return false
        },
        GetFirstChild: function (domNode) {
            return FindEnumerableNode(domNode.firstChild, "nextSibling")
        },
        GetLastChild: function (domNode) {
            return FindEnumerableNode(domNode.lastChild, "previousSibling")
        },
        GetNextSibling: function (domNode) {
            return FindEnumerableNode(domNode.nextSibling, "nextSibling")
        },
        GetPrevSibling: function (domNode) {
            return FindEnumerableNode(domNode.previousSibling, "previousSibling")
        },
        ForEachChild: function (domNode, fnProcessElement) {
            var curNode = this.GetFirstChild(domNode);
            while (curNode != null && !fnProcessElement(curNode)) curNode = this.GetNextSibling(curNode);
            return curNode
        },
        GetChildElementAt: function (domNode, index) {
            var idx = 0;

            function ProcessNode(node) {
                return idx++ == index
            }
            return this.ForEachChild(domNode, ProcessNode)
        },
        GetBaseName: function (domNode) {
            return domNode.localName || domNode.baseName || domNode.nodeName
        },
        Contains: function (domNode, otherDomNode) {}
    }, i = 0; i < functionsRequiringInit.length; i++) UpdateStub(functionsRequiringInit[i]);
    return api
}();
Type.registerNamespace("XUI");
XUI.Html = function () {
    var functionsRequiringInit = [{
        name: "SetText",
        selector: function () {
            return document.body.textContent != null ? function (domNode, newVal) {
                domNode.textContent = newVal
            } : function (domNode, newVal) {
                domNode.innerText = newVal
            }
        }
    }, {
        name: "GetText",
        selector: function () {
            return document.body.textContent != null ? function (domNode) {
                return domNode.textContent
            } : function (domNode) {
                if (domNode.nodeName == "INPUT" && Sys.Browser.agent == Sys.Browser.InternetExplorer && Sys.Browser.version < 9) return domNode.value;
                else return domNode.innerText
            }
        }
    }, {
        name: "GetOuterHTML",
        selector: function () {
            return document.body.outerHTML != null ? function (domNode) {
                return domNode.outerHTML
            } : function (domNode) {
                if ("outerHTML" in domNode) return domNode.outerHTML;
                else {
                    var oDoc = domNode.ownerDocument,
                        oClone = domNode.cloneNode(true),
                        oTemp = oDoc.createElement("div");
                    oDoc.documentElement.appendChild(oTemp);
                    oTemp.appendChild(oClone);
                    var sHTML = oTemp.innerHTML;
                    oDoc.documentElement.removeChild(oTemp);
                    return sHTML
                }
            }
        }
    }, {
        name: "SetOuterHTML",
        selector: function () {
            return document.body.outerHTML != null ? function (domNode, newVal) {
                domNode.outerHTML = newVal
            } : function (domNode, newVal) {
                var oTemp = document.createElement("div");
                document.body.appendChild(oTemp);
                oTemp.innerHTML = newVal;
                var parentNode = domNode.parentNode;
                parentNode.replaceChild(oTemp.firstChild.cloneNode(true), domNode);
                document.body.removeChild(oTemp)
            }
        }
    }, {
        name: "GetComputedStyle",
        selector: function () {
            return document.body.currentStyle != null ? function (domNode, camelStyleName) {
                var temp = domNode.currentStyle == null ? domNode.children : null,
                    r = domNode.currentStyle[camelStyleName];
                if (r.indexOf("%") > 0 || r.indexOf("em") > 0) throw "RelativeMeasurementInComputedStyle";
                return r
            } : function (domNode, camelStyleName) {
                var computedStyle = document.defaultView.getComputedStyle(domNode, null);
                return computedStyle != null ? computedStyle[camelStyleName] : null
            }
        }
    }, {
        name: "SetFloat",
        selector: function () {
            return document.body.style.styleFloat != null ? function (domNode, newVal) {
                domNode.style.styleFloat = newVal
            } : function (domNode, newVal) {
                domNode.style.cssFloat = newVal
            }
        }
    }, {
        name: "SetOpacity",
        selector: function () {
            return document.body.style.opacity != null ? function (domNode, newVal) {
                domNode.style.opacity = newVal
            } : function (domNode, newVal) {
                domNode.style.filter = newVal == 1 ? "" : "alpha(opacity=" + newVal * 100 + ")"
            }
        }
    }, {
        name: "GetOpacity",
        selector: function () {
            return document.body.style.opacity != null ? function (domNode) {
                var o = domNode.style.opacity;
                return o != null && o != "" ? parseFloat(o) : 1
            } : function (domNode) {
                var f = domNode.style.filter;
                return f != null && f != "" ? parseInt(f.replace("alpha(opacity=", "").replace(")", "")) / 100 : 1
            }
        }
    }, {
        name: "RemoveOpacity",
        selector: function () {
            return document.body.style.opacity != null ? function (domNode) {
                domNode.style.opacity = ""
            } : function (domNode) {
                domNode.style.filter = ""
            }
        }
    }, {
        name: "IsContentEditable",
        selector: function () {
            return document.body.isContentEditable != null ? function (domNode) {
                return domNode.isContentEditable
            } : function (domNode) {
                return domNode.contentEditable
            }
        }
    }, {
        name: "RotateElement",
        selector: function () {
            if (document.body.style.MozTransform != null) return function (domNode, degrees, origXMid, origYMid, origWidth, origHeight) {
                domNode.style.MozTransform = "rotate(" + degrees + "deg)"
            };
            if (document.body.style.OTransform != null) return function (domNode, degrees, origXMid, origYMid, origWidth, origHeight) {
                domNode.style.OTransform = "rotate(" + degrees + "deg)"
            };
            if (document.body.style.WebkitTransform != null) return function (domNode, degrees, origXMid, origYMid, origWidth, origHeight) {
                domNode.style.WebkitTransform = "rotate(" + degrees + "deg)"
            };
            return function (domNode, degrees, origXMid, origYMid, origWidth, origHeight) {
                var deg2radians = Math.PI * 2 / 360,
                    radians = degrees * deg2radians,
                    costheta = Math.cos(radians),
                    sintheta = Math.sin(radians),
                    newHeight = origHeight * Math.abs(costheta) + origWidth * Math.abs(sintheta),
                    newWidth = origWidth * Math.abs(costheta) + origHeight * Math.abs(sintheta),
                    newXNear = origXMid - newWidth / 2,
                    newYTop = origYMid - newHeight / 2;
                domNode.style.left = newXNear + "px";
                domNode.style.top = newYTop + "px";
                domNode.filters.item(0).M11 = costheta;
                domNode.filters.item(0).M12 = -sintheta;
                domNode.filters.item(0).M21 = sintheta;
                domNode.filters.item(0).M22 = costheta
            }
        }
    }, {
        name: "CreateDomEvent",
        selector: function () {
            return "createEvent" in document ? function (eventType) {
                var eventObj = document.createEvent("Event");
                eventObj.initEvent(eventType, true, true);
                return eventObj
            } : function (eventType) {
                var eventObj = document.createEventObject();
                eventObj.type = eventType;
                return eventObj
            }
        }
    }, {
        name: "DispatchDomEvent",
        selector: function () {
            return "dispatchEvent" in document ? function (domNode, eventObj) {
                return domNode.dispatchEvent(eventObj)
            } : function (domNode, eventObj) {
                return domNode.fireEvent("on" + eventObj.type, eventObj)
            }
        }
    }];

    function UpdateStub(fnInfo) {
        api[fnInfo.name] = function () {
            api[fnInfo.name] = fnInfo.selector();
            return api[fnInfo.name].apply(api, arguments)
        }
    }
    for (var api = {
        DomUtils: XUI.DomUtilities,
        GetDirection: function () {
            return document.documentElement.getAttribute("dir")
        },
        SetText: function (domNode, newVal) {},
        GetText: function (domNode) {},
        GetOuterHTML: function (domNode) {},
        SetOuterHTML: function (domNode, newVal) {},
        GetComputedStyle: function (domNode, camelStyleName) {},
        SetFloat: function (domNode, newVal) {},
        SetOpacity: function (domNode, newVal) {},
        GetOpacity: function (domNode) {},
        RemoveOpacity: function (domNode) {},
        IsContentEditable: function (domNode) {},
        RotateElement: function (domNode, degrees, origXMid, origYMid, origWidth, origHeight) {},
        CreateDomEvent: function (eventType) {},
        DispatchDomEvent: function (domNode, eventObj) {}
    }, i = 0; i < functionsRequiringInit.length; i++) UpdateStub(functionsRequiringInit[i]);
    return api
}();
Type.registerNamespace("XUI");
XUI.Xml = function () {
    function GetActiveXObject(progIDs) {
        for (var i = 0; i < progIDs.length; i++) try {
            var xmlDoc = new ActiveXObject(progIDs[i]);
            return xmlDoc
        } catch (ex) {}
        return null
    }
    MSXML_DOMParser = function () {};
    MSXML_DOMParser.prototype.parseFromString = function (sValue, contentType) {
        var xmlDoc = GetActiveXObject(["Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument"]);
        if (xmlDoc != null) try {
            xmlDoc.async = false;
            xmlDoc.loadXML(sValue);
            xmlDoc.setProperty("SelectionLanguage", "XPath");
            return xmlDoc
        } catch (e) {}
        return null
    };
    MSXML_XMLSerializer = function () {};
    MSXML_XMLSerializer.prototype.serializeToString = function (node) {
        return node.xml || ""
    };
    MSXML_XPathResult = function () {
        this.singleNodeValue = null;
        this._resultNodes = null;
        var curItemIdx = 0;
        this.iterateNext = function () {
            return curItemIdx < this._resultNodes.length ? this._resultNodes[curItemIdx++] : null
        }
    };
    var ORDERED_NODE_ITERATOR_TYPE = window.XPathResult != null ? XPathResult.ORDERED_NODE_ITERATOR_TYPE : 5,
        FIRST_ORDERED_NODE_TYPE = window.XPathResult != null ? XPathResult.FIRST_ORDERED_NODE_TYPE : 9;
    MSXML_XPathEvaluator = function () {};
    MSXML_XPathEvaluator.prototype.evaluate = function (sXPath, contextNode, namespaceResolver, resultType, xPathResultObj) {
        namespaceResolver();
        var result;
        if (resultType == ORDERED_NODE_ITERATOR_TYPE) {
            result = new MSXML_XPathResult;
            result._resultNodes = contextNode.selectNodes(sXPath)
        } else if (resultType == FIRST_ORDERED_NODE_TYPE) {
            result = new MSXML_XPathResult;
            result.singleNodeValue = contextNode.selectSingleNode(sXPath)
        }
        return result
    };

    function GetDOMParser() {
        return window.ActiveXObject != null ? new MSXML_DOMParser : new DOMParser
    }
    function GetXMLSerializer() {
        return window.ActiveXObject != null ? new MSXML_XMLSerializer : new XMLSerializer
    }
    function GetXPathEvaluator() {
        return window.ActiveXObject != null ? new MSXML_XPathEvaluator : new XPathEvaluator
    }
    var reusableOjbects = {
        DOMParser: {
            instance: null,
            constructor: GetDOMParser
        },
        XMLSerializer: {
            instance: null,
            constructor: GetXMLSerializer
        },
        XPathEvaluator: {
            instance: null,
            constructor: GetXPathEvaluator
        }
    };

    function GetReusableObject(name) {
        if (reusableOjbects[name].instance == null) reusableOjbects[name].instance = reusableOjbects[name].constructor();
        return reusableOjbects[name].instance
    }
    var functionsRequiringInit = [{
        name: "GetParserError",
        selector: function (xmlDoc) {
            var fnGetParserError;
            if (xmlDoc != null && xmlDoc.parseError != null) fnGetParserError = function (xmlDoc) {
                var parserError;
                if (xmlDoc.parseError != 0) {
                    var props = ["errorCode", "reason", "line", "linepos", "srcText", "url", "filepos"];
                    parserError = "";
                    for (var i = 0; i < props.length; i++) parserError += props[i] + ": " + xmlDoc.parseError[props[i]] + "\n"
                }
                return parserError
            };
            else fnGetParserError = function (xmlDoc) {
                var parserError;
                if (xmlDoc.documentElement.namespaceURI == "http://www.mozilla.org/newlayout/xml/parsererror.xml" && xmlDoc.documentElement.tagName == "parsererror") parserError = xmlDoc.documentElement.textContent;
                else if (xmlDoc.documentElement.firstChild && xmlDoc.documentElement.firstChild.tagName == "parsererror") parserError = xmlDoc.documentElement.firstChild.textContent;
                return parserError
            };
            return fnGetParserError
        }
    }, {
        name: "GetText",
        selector: function (contextNode) {
            return "textContent" in contextNode ? function (contextNode) {
                return contextNode.textContent
            } : function (contextNode) {
                return contextNode.text
            }
        }
    }, {
        name: "SetText",
        selector: function (contextNode) {
            return "textContent" in contextNode ? function (contextNode, newValue) {
                contextNode.textContent = newValue
            } : function (contextNode, newValue) {
                contextNode.text = newValue
            }
        }
    }, {
        name: "GetNamespaceResolver",
        selector: function (contextNode) {
            var xmlDoc = contextNode.nodeType == XUI.DomUtilities.NodeType.Document ? contextNode : contextNode.ownerDocument;
            return "setProperty" in xmlDoc ? function (contextNode, oNamespaces) {
                return function (sPrefix) {
                    var xmlDoc = contextNode.nodeType == XUI.DomUtilities.NodeType.Document ? contextNode : contextNode.ownerDocument;
                    xmlDoc.setProperty("SelectionLanguage", "XPath");
                    if (oNamespaces != null) {
                        var nsDeclarations = [],
                            nsString = "xmlns:{0}='{1}'";
                        for (var prefix in oNamespaces) nsDeclarations.push(String.format(nsString, prefix, oNamespaces[prefix]));
                        xmlDoc.setProperty("SelectionNamespaces", nsDeclarations.join(" "))
                    }
                }
            } : function (contextNode, oNamespaces) {
                if (oNamespaces != null) return function (sPrefix) {
                    return oNamespaces[sPrefix]
                }
            }
        }
    }, {
        name: "CreateElementNS",
        selector: function (xmlDoc) {
            return "createElementNS" in xmlDoc ? function (xmlDoc, namespaceURI, qualifiedName) {
                return xmlDoc.createElementNS(namespaceURI, qualifiedName)
            } : function (xmlDoc, namespaceURI, qualifiedName) {
                return xmlDoc.createNode(1, qualifiedName, namespaceURI)
            }
        }
    }, {
        name: "CreateDocument",
        selector: function () {
            return "implementation" in document && "createDocument" in document.implementation && window.ActiveXObject == null ? function () {
                return document.implementation.createDocument(null, null, null)
            } : function () {
                return GetActiveXObject(["Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument"])
            }
        }
    }];

    function UpdateStub(fnInfo) {
        api[fnInfo.name] = function () {
            api[fnInfo.name] = fnInfo.selector(arguments[0]);
            return api[fnInfo.name].apply(api, arguments)
        }
    }
    for (var api = {
        DomUtils: XUI.DomUtilities,
        DOMParser: GetReusableObject("DOMParser"),
        XMLSerializer: GetReusableObject("XMLSerializer"),
        XPathEvaluator: GetReusableObject("XPathEvaluator"),
        Load: function (sUrl, bAsync, fnOnSuccess, fnOnFailure) {
            var xmlhttp = new XMLHttpRequest;
            if (bAsync) xmlhttp.onreadystatechange = WaitForReadyState;
            try {
                xmlhttp.open("GET", sUrl, bAsync);
                Mscrm.Utilities.setResponseTypeToMSXml(xmlhttp);
                xmlhttp.send()
            } catch (ex) {
                fnOnFailure(400, null);
                return null
            }!bAsync && CheckXmlHttpResult();

            function WaitForReadyState() {
                if (xmlhttp.readyState == 4) {
                    xmlhttp.onreadystatechange = function () {};
                    CheckXmlHttpResult()
                }
            }
            function CheckXmlHttpResult() {
                if (xmlhttp.status == 200) fnOnSuccess(xmlhttp.responseXML);
                else fnOnFailure(xmlhttp.status, xmlhttp.responseXML)
            }
        },
        LoadXml: function (sXml) {
            return this.DOMParser.parseFromString(sXml, "text/xml")
        },
        SelectNodes: function (contextNode, sXPath, oNamespaces) {
            var result = [],
                xPathNodes = this.XPathEvaluator.evaluate(sXPath, contextNode, this.GetNamespaceResolver(contextNode, oNamespaces), ORDERED_NODE_ITERATOR_TYPE, null);
            if (xPathNodes != null) {
                var node = xPathNodes.iterateNext();
                while (node != null) {
                    result.push(node);
                    node = xPathNodes.iterateNext()
                }
            }
            return result
        },
        SelectSingleNode: function (contextNode, sXPath, oNamespaces) {
            var xPathNode = this.XPathEvaluator.evaluate(sXPath, contextNode, this.GetNamespaceResolver(contextNode, oNamespaces), FIRST_ORDERED_NODE_TYPE, null);
            return xPathNode != null ? xPathNode.singleNodeValue : null
        },
        CreateNSDictionary: function (contextNode) {
            var resolver = {};
            if (contextNode) for (var attribList = contextNode.attributes, attribLength = attribList.length, i = 0; i < attribLength; i++) {
                var attrib = attribList.item(i);
                if (attrib.prefix == "xmlns") resolver[XUI.DomUtilities.GetBaseName(attrib)] = attrib.nodeValue;
                else if (attrib.nodeName == "xmlns") resolver["default"] = attrib.nodeValue
            }
            return resolver
        },
        GetParserError: function (xmlDoc) {},
        GetText: function (contextNode) {},
        SetText: function (contextNode, newValue) {},
        GetNamespaceResolver: function (contextNode, oNamespaces) {},
        CreateElementNS: function (xmlDoc, namespaceURI, qualifiedName) {},
        CreateDocument: function () {}
    }, i = 0; i < functionsRequiringInit.length; i++) UpdateStub(functionsRequiringInit[i]);
    return api
}();

function _crmUrlDecode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    s = s.replace(/%u[a-fA-F0-9]{4}/g, function ($1) {
        return String.fromCharCode(parseInt($1.substr(2, $1.length - 2), 16))
    });
    return decodeURIComponent(s)
}
function _crmUrlEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    s = _UrlEncode(s);
    s = s.replace(/%u[dD][89aAbB][a-fA-F0-9]{2}%u[dD][cCdDeEfF][a-fA-F0-9]{2}/g, function ($1) {
        return encodeURIComponent(String.fromCharCode(parseInt($1.substring(2, 6), 16)) + String.fromCharCode(parseInt($1.substring(8), 16)))
    });
    s = s.replace(/%u[a-fA-F0-9]{4}/g, function ($1) {
        return encodeURIComponent(String.fromCharCode(parseInt($1.substr(2, $1.length - 2), 16)))
    });
    return s
}
function _crmUrlEncodeIE7(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    s = _UrlEncodeIE7(s);
    s = s.replace(/%u[dD][89aAbB][a-fA-F0-9]{2}%u[dD][cCdDeEfF][a-fA-F0-9]{2}/g, function ($1) {
        return encodeURIComponent(String.fromCharCode(parseInt($1.substring(2, 6), 16)) + String.fromCharCode(parseInt($1.substring(8), 16)))
    });
    s = s.replace(/%u[a-fA-F0-9]{4}/g, function ($1) {
        return encodeURIComponent(String.fromCharCode(parseInt($1.substr(2, $1.length - 2), 16)))
    });
    return s
}
function _crmNameValueEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    return CrmEncodeDecode.CrmUrlEncode(s)
}
function _crmNameValueDecode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    return CrmEncodeDecode.CrmUrlDecode(s)
}
function _crmXmlDecode(s, charToDecode) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    if (typeof charToDecode != "undefined" && charToDecode != null) {
        if (charToDecode.length > 1) charToDecode = charToDecode.charAt(0);
        var sEncodedChar = _XmlEncode(charToDecode),
            rex = new RegExp(sEncodedChar, "g");
        s = s.replace(rex, charToDecode);
        switch (charToDecode) {
            case "<":
                s = s.replace(/&lt;/g, "<");
                break;
            case ">":
                s = s.replace(/&gt;/g, ">");
                break;
            case "&":
                s = s.replace(/&amp;/g, "&");
                break;
            case '"':
                s = s.replace(/&quot;/g, '"');
                break;
            case "'":
                s = s.replace(/&apos;/g, "'");
                break
        }
        return s
    }
    s = s.replace(/&[^;]+;/g, function ($1) {
        switch ($1) {
            case "&lt;":
                return "<";
            case "&gt;":
                return ">";
            case "&amp;":
                return "&";
            case "&quot;":
                return '"';
            case "&apos;":
                return "'"
        }
        if ($1.match(/&#[0-9]+;/g)) return _crmCharCodeToChar($1.substr(2, $1.length - 3));
        if ($1.match(/&#x[a-fA-F0-9]+;/g)) return _crmCharCodeToChar(parseInt($1.substr(3, $1.length - 4), 16));
        return $1
    });
    return s
}
function _crmCharCodeToChar(charCode) {
    if (charCode > 65535 && charCode < 1114112) {
        charCode -= 65536;
        return String.fromCharCode(55296 + (charCode >> 10), 56320 + (charCode & 1023))
    } else return String.fromCharCode(charCode)
}
function _crmXmlEncode(s, charToEncode) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    if (typeof charToEncode != "undefined" && charToEncode != null) {
        if (charToEncode.length > 1) charToEncode = charToEncode.charAt(0);
        var sEncodedChar = _XmlEncode(charToEncode),
            rex = new RegExp(charToEncode, "g");
        return s.replace(rex, sEncodedChar)
    }
    return _surrogateAmpersandWorkaround(s, _XmlEncode)
}
function _crmHtmlEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    return _surrogateAmpersandWorkaround(s, _HtmlEncode)
}
function _crmHtmlEncodeForFormatString(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    s = _surrogateAmpersandWorkaround(s, _HtmlEncode);
    return s.replace(/&#123;/g, "{").replace(/&#125;/g, "}")
}
function _crmPluginTraceHtmlEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    s = _crmHtmlEncode(s);
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/&#9;/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    s = s.replace(/&#10;/g, "<br/>");
    s = s.replace(/&#20;/g, "&nbsp;");
    return s
}
function _crmHtmlAttributeEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    return _surrogateAmpersandWorkaround(s, _HtmlAttributeEncode)
}
function _crmXmlAttributeEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    return _surrogateAmpersandWorkaround(s, _XmlAttributeEncode)
}
function _crmJavaScriptEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    return _JavaScriptEncode(s)
}
function _crmVisualBasicScriptEncode(s) {
    if (IsNull(s)) return s;
    else if (typeof s != "string") s = s.toString();
    return _VisualBasicScriptEncode(s)
}
function _surrogateAmpersandWorkaround(s, encodingFunction) {
    s = s.replace(new RegExp("([\\uD800-\\uDBFF][\\uDC00-\\uDFFF])", "g"), function ($1) {
        return "CRMEntityReferenceOpen" + (($1.charCodeAt(0) - 55296) * 1024 + ($1.charCodeAt(1) & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"
    });
    s = s.replace(new RegExp("[\\uD800-\\uDFFF]", "g"), "\ufffd");
    s = encodingFunction(s);
    s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
    s = s.replace(/CRMEntityReferenceClose/g, ";");
    return s
}
function CrmEncodeDecodeLibrary() {
    this.CrmHtmlEncode = _crmHtmlEncode;
    this.CrmHtmlAttributeEncode = _crmHtmlAttributeEncode;
    this.CrmXmlEncode = _crmXmlEncode;
    this.CrmXmlAttributeEncode = _crmXmlAttributeEncode;
    this.CrmJavaScriptEncode = _crmJavaScriptEncode;
    this.CrmVisualBasicScriptEncode = _crmVisualBasicScriptEncode;
    this.CrmUrlEncode = _crmUrlEncode;
    this.CrmUrlEncodeIE7 = _crmUrlEncodeIE7;
    this.CrmNameValueEncode = _crmNameValueEncode;
    this.CrmHtmlEncodeForFormatString = _crmHtmlEncodeForFormatString;
    this.CrmPluginTraceHtmlEncode = _crmPluginTraceHtmlEncode;
    this.CrmXmlDecode = _crmXmlDecode;
    this.CrmHtmlDecode = _crmXmlDecode;
    this.CrmUrlDecode = _crmUrlDecode;
    this.CrmNameValueDecode = _crmNameValueDecode
}
var CrmEncodeDecode = new CrmEncodeDecodeLibrary;

function _HtmlEncode(strInput) {
    var c, HtmlEncode = "",
        buffer = "",
        bufferLength = 500,
        count = 0;
    if (strInput == null) return null;
    if (strInput == "") return "";
    for (var cnt = 0; cnt < strInput.length; cnt++) {
        c = strInput.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c == 32 || c > 47 && c < 58 || c == 46 || c == 44 || c == 45 || c == 95) buffer += String.fromCharCode(c);
        else buffer += "&#" + c + ";";
        if (++count == bufferLength) {
            HtmlEncode += buffer;
            buffer = "";
            count = 0
        }
    }
    if (buffer.length) HtmlEncode += buffer;
    return HtmlEncode
}
function _HtmlAttributeEncode(strInput) {
    var c, HtmlAttributeEncode = "";
    if (strInput == null) return null;
    if (strInput == "") return "";
    for (var cnt = 0; cnt < strInput.length; cnt++) {
        c = strInput.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c > 47 && c < 58 || c == 46 || c == 44 || c == 45 || c == 95) HtmlAttributeEncode = HtmlAttributeEncode + String.fromCharCode(c);
        else HtmlAttributeEncode = HtmlAttributeEncode + "&#" + c + ";"
    }
    return HtmlAttributeEncode
}
function _XmlEncode(strInput) {
    return _HtmlEncode(strInput)
}
function _XmlAttributeEncode(strInput) {
    return _HtmlAttributeEncode(strInput)
}
function _JavaScriptEncode(strInput) {
    var c, EncodeJs = "";
    if (strInput == null) return null;
    if (strInput == "") return "";
    for (var cnt = 0; cnt < strInput.length; cnt++) {
        c = strInput.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c == 32 || c > 47 && c < 58 || c == 46 || c == 44 || c == 45 || c == 95) EncodeJs = EncodeJs + String.fromCharCode(c);
        else if (c > 127) EncodeJs = EncodeJs + "\\u" + OutputEncoder_TwoByteHex(c);
        else EncodeJs = EncodeJs + "\\x" + OutputEncoder_SingleByteHex(c)
    }
    return "'" + EncodeJs + "'"
}
function _VisualBasicScriptEncode(strInput) {
    var c, EncodeVbs = "",
        bInQuotes = false;
    if (strInput == null) return null;
    if (strInput == "") return "";
    for (var cnt = 0; cnt < strInput.length; cnt++) {
        c = strInput.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c == 32 || c > 47 && c < 58 || c == 46 || c == 44 || c == 45 || c == 95) {
            if (!bInQuotes) {
                EncodeVbs = EncodeVbs + '&"';
                bInQuotes = true
            }
            EncodeVbs = EncodeVbs + String.fromCharCode(c)
        } else {
            if (bInQuotes) {
                EncodeVbs = EncodeVbs + '"';
                bInQuotes = false
            }
            EncodeVbs = EncodeVbs + "&chrw(" + c + ")"
        }
    }
    if (EncodeVbs.charAt(0) == "&") EncodeVbs = EncodeVbs.substring(1);
    if (EncodeVbs.length == 0) EncodeVbs = '""';
    if (bInQuotes) EncodeVbs = EncodeVbs + '"';
    return EncodeVbs
}
function _UrlEncode(strInput) {
    var c, EncodeUrl = "";
    if (strInput == null) return null;
    if (strInput == "") return "";
    for (var cnt = 0; cnt < strInput.length; cnt++) {
        c = strInput.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c > 47 && c < 58 || c == 46 || c == 45 || c == 95) EncodeUrl = EncodeUrl + String.fromCharCode(c);
        else if (c > 127) EncodeUrl = EncodeUrl + "%u" + OutputEncoder_TwoByteHex(c);
        else EncodeUrl = EncodeUrl + "%" + OutputEncoder_SingleByteHex(c)
    }
    return EncodeUrl
}
function _UrlEncodeIE7(strInput) {
    var c, EncodeUrl = "",
        buffer = [],
        count = 0;
    if (strInput == null) return null;
    if (strInput == "") return "";
    for (var cnt = 0; cnt < strInput.length; cnt++) {
        c = strInput.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c > 47 && c < 58 || c == 46 || c == 45 || c == 95) buffer[count++] = String.fromCharCode(c);
        else if (c > 127) buffer[count++] = "%u" + OutputEncoder_TwoByteHex(c);
        else buffer[count++] = "%" + OutputEncoder_SingleByteHex(c)
    }
    return buffer.join("")
}
function OutputEncoder_SingleByteHex(charC) {
    if (charC == null) return "";
    for (var SingleByteHex = charC.toString(16), cnt = SingleByteHex.length; cnt < 2; cnt++) SingleByteHex = "0" + SingleByteHex;
    return SingleByteHex
}
function OutputEncoder_TwoByteHex(charC) {
    if (charC == null) return "";
    for (var TwoByteHex = charC.toString(16), cnt = TwoByteHex.length; cnt < 4; cnt++) TwoByteHex = "0" + TwoByteHex;
    return TwoByteHex
}
function AntiXss() {
    this.HtmlEncode = _HtmlEncode;
    this.HtmlAttributeEncode = _HtmlAttributeEncode;
    this.XmlEncode = _XmlEncode;
    this.XmlAttributeEncode = _XmlAttributeEncode;
    this.JavaScriptEncode = _JavaScriptEncode;
    this.VisualBasicScriptEncode = _VisualBasicScriptEncode;
    this.UrlEncode = _UrlEncode
}
var AntiXssLibrary = new AntiXss;

function RemoteCommand(sObject, sCommand, sUrlBase, commandNameSpace) {
    this.Command = sCommand;
    this.GetParameter = getParameter;
    this.ErrorHandler = RemoteCommandDefaultErrorHandler;
    this.Reference = null;
    this.Aborted = false;
    this.IgnoreCurrentSolutionContext = false;
    var sXmlDocumentStart = "",
        sXmlDocumentEnd = "",
        oXmlHttp = new XMLHttpRequest,
        aParameters = [],
        sCommandNamespace = _sWebServicesNamespace;
    if (!IsNull(commandNameSpace)) sCommandNamespace = commandNameSpace;
    if (IsNull(sUrlBase)) sUrlBase = "/AppWebServices/";
    var sUrl = Mscrm.CrmUri.create(sUrlBase + sObject + ".asmx").toString();
    sXmlDocumentStart += '<?xml version="1.0" encoding="utf-8" ?>';
    sXmlDocumentStart += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">';
    sXmlDocumentStart += "<soap:Body>";
    sXmlDocumentStart += "<" + CrmEncodeDecode.CrmXmlEncode(sCommand) + ' xmlns="' + sCommandNamespace + '">';
    sXmlDocumentEnd += "</" + CrmEncodeDecode.CrmXmlEncode(sCommand) + ">";
    sXmlDocumentEnd += "</soap:Body>";
    sXmlDocumentEnd += "</soap:Envelope>";
    this.Execute = execute;
    this.SetParameter = setParameter;
    this.SetXmlParameter = setXmlParameter;
    this.Abort = abort;

    function getParameter(sName) {
        var i = aParameters[sName];
        if (!IsNull(i)) return aParameters[i];
        return null
    }
    function setParameter(sName, oValue) {
        var sValue;
        if (IsNull(oValue)) sValue = "";
        else if (isArray(oValue)) {
            var sType = oValue.type;
            if (IsNull(sType) && oValue.length > 0) sType = "object";
            sValue = "";
            for (var i = 0; i < oValue.length; i++) sValue += "<" + CrmEncodeDecode.CrmXmlEncode(sType) + ">" + CrmEncodeDecode.CrmXmlEncode(oValue[i]) + "</" + CrmEncodeDecode.CrmXmlEncode(sType) + ">"
        } else sValue = CrmEncodeDecode.CrmXmlEncode(oValue);
        var oParameter = new CommandParameter(sName, sValue);
        pushCommandParameter(oParameter)
    }
    function setXmlParameter(sName, sXmlValue) {
        var oParameter = new CommandParameter(sName, IsNull(sXmlValue) ? "" : sXmlValue);
        pushCommandParameter(oParameter)
    }
    function pushCommandParameter(oParameter) {
        if (!IsNull(aParameters[oParameter.Name])) aParameters[aParameters[oParameter.Name]] = oParameter;
        else {
            aParameters[oParameter.Name] = aParameters.length;
            aParameters.push(oParameter)
        }
    }
    function abort() {
        if (!this.Aborted) {
            this.Aborted = true;
            oXmlHttp.abort()
        }
    }
    function execute(funAsyncCallbackFunction) {
        var sXmlDocument = sXmlDocumentStart;
        oXmlHttp.readyState > 0 && oXmlHttp.readyState < 4 && abort();
        for (var i = 0; i < aParameters.length; i++) sXmlDocument += aParameters[i].GetXml();
        sXmlDocument += sXmlDocumentEnd;
        var async = !IsNull(funAsyncCallbackFunction);
        if (async) {
            var oAsyncResultHandler = new AsyncResultHandler(this, oXmlHttp, funAsyncCallbackFunction);
            oXmlHttp.onreadystatechange = oAsyncResultHandler.ReadyStateChanged
        }
        var bTryAgain, remoteCmdResult = null;
        do {
            bTryAgain = false;
            oXmlHttp.open("POST", sUrl, async);
            Mscrm.Utilities.setResponseTypeToMSXml(oXmlHttp);
            oXmlHttp.setRequestHeader("SOAPAction", sCommandNamespace + "/" + sCommand);
            oXmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            oXmlHttp.setRequestHeader("Content-Length", sXmlDocument.length);
            SetTokenInHeader(oXmlHttp, Mscrm.CrmUri.create(sUrl));!this.IgnoreCurrentSolutionContext && Mscrm.SolutionDecorater.setSolutionIdInRequestHeader(oXmlHttp);
            try {
                oXmlHttp.send(sXmlDocument);
                if (!async) {
                    remoteCmdResult = new RemoteCommandResult(this, oXmlHttp, false);
                    if (remoteCmdResult.Success == false) bTryAgain = remoteCmdResult.Retry
                }
            } catch (e) {
                var sErrorText = LOCID_REMOTECOMMAND_ERROR;
                bTryAgain = window.confirm(sErrorText)
            }
            if (bTryAgain) oXmlHttp = new XMLHttpRequest
        } while (bTryAgain);
        if (!async) return remoteCmdResult
    }
}
function RemoteCommandDefaultErrorHandler(sHResult, oXmlNode) {
    if (sHResult == null) sHResult = "Not available";
    var sErrMessage = "";
    if (oXmlNode != null) {
        var oDescription = XUI.Xml.SelectSingleNode(oXmlNode, "error/description", XUI.Xml.CreateNSDictionary(oXmlNode.ownerDocument.documentElement));
        if (!IsNull(oDescription)) sErrMessage = XUI.Xml.GetText(oDescription)
    }
    var errInfo = Mscrm.ErrorInformation.createFromDoc(oXmlNode);
    openErrorDlg(sHResult, sErrMessage, errInfo)
}
function AsyncResultHandler(oRemoteCommand, oXmlHttp, functionCallback) {
    this.ReadyStateChanged = readyStateChanged;

    function readyStateChanged() {
        if (oXmlHttp.readyState == 4) {
            oXmlHttp.onreadystatechange = null;
            if (!oRemoteCommand.Aborted && oXmlHttp.status != 0) {
                var result = new RemoteCommandResult(oRemoteCommand, oXmlHttp, true);
                functionCallback(result, oRemoteCommand);
                oXmlHttp.abort()
            }
        }
    }
}
function CommandParameter(sName, sValue) {
    this.Name = sName;
    this.Value = sValue;
    this.GetXml = getParameterXml;

    function getParameterXml() {
        var sXml = "<" + CrmEncodeDecode.CrmXmlEncode(this.Name) + ">";
        sXml += this.Value;
        sXml += "</" + CrmEncodeDecode.CrmXmlEncode(this.Name) + ">";
        return sXml
    }
}
function RemoteCommandResult(oRemoteCommand, oXmlHttp, bIsAsync) {
    var sCommand = oRemoteCommand.Command,
        oXml = oXmlHttp.responseXML;
    this.RemoteCommand = oRemoteCommand;
    this.RawResponse = oXml;
    this.Xml = null;
    this.ReturnValue = null;
    var soapBodyNode = null,
        defaultNSName = null;
    if (!IsNull(oXml)) {
        var sNamespace = "";
        if (XUI.DomUtilities.HasChildElements(oXml)) sNamespace = XUI.DomUtilities.GetLastChild(oXml).prefix + ":";
        var soapBodyNode = XUI.Xml.SelectSingleNode(oXml, "/" + sNamespace + "Envelope/" + sNamespace + "Body", XUI.Xml.CreateNSDictionary(oXml.documentElement)),
            soadpBodyFirstChild = soapBodyNode ? XUI.DomUtilities.GetFirstChild(soapBodyNode) : null,
            xmlNSAttribute = null;
        if (!IsNull(soadpBodyFirstChild)) xmlNSAttribute = soadpBodyFirstChild.attributes.getNamedItem("xmlns");
        var defaultNSName = xmlNSAttribute ? xmlNSAttribute.nodeValue : null;
        this.Xml = defaultNSName ? XUI.Xml.SelectSingleNode(soapBodyNode, "./default:" + sCommand + "Response/default:" + sCommand + "Result", {
            "default": defaultNSName
        }) : null;
        this.ReturnValue = ReadXml(this.Xml)
    }
    var oResult = handleSoapResponse(oXmlHttp, bIsAsync);
    this.Success = oResult.Success;
    this.Retry = oResult.Retry;
    this.ConvertToObject = ReadXml;

    function handleSoapResponse(oXmlHttp, bAsyncRequest) {
        var sHResult = null,
            oXmlNode = null,
            oErrorNode, bSuccess = true,
            oXml = oXmlHttp.responseXML,
            nsDictionary = null,
            sNamespace = "",
            parseError = null;
        if (!IsNull(oXml)) {
            nsDictionary = XUI.Xml.CreateNSDictionary(oXml.documentElement);
            sNamespace = XUI.DomUtilities.HasChildElements(oXml) ? XUI.DomUtilities.GetLastChild(oXml).prefix + ":" : "";
            parseError = XUI.Xml.GetParserError(oXml)
        }
        if (parseError) {
            sHResult = "XmlParseError";
            bSuccess = false
        } else if (oXmlHttp.status == 401) {
            sHResult = "0x80040277";
            bSuccess = false
        } else if (oXmlHttp.status != 200) {
            oXmlNode = !IsNull(oXml) ? XUI.Xml.SelectSingleNode(oXml, "/" + sNamespace + "Envelope/" + sNamespace + "Body/" + sNamespace + "Fault", nsDictionary) : null;
            if (!IsNull(oXmlNode)) {
                oErrorNode = XUI.Xml.SelectSingleNode(oXmlNode, "error/code", nsDictionary);
                if (!IsNull(oErrorNode)) sHResult = XUI.Xml.GetText(oErrorNode);
                else {
                    oErrorNode = XUI.Xml.SelectSingleNode(oXmlNode, "detail/error/code", nsDictionary);
                    if (!IsNull(oErrorNode)) sHResult = XUI.Xml.GetText(oErrorNode)
                }
            } else sHResult = "ServerError";
            bSuccess = false
        }
        if (bSuccess) {
            var soapBodyNode = XUI.Xml.SelectSingleNode(oXml, "/" + sNamespace + "Envelope/" + sNamespace + "Body", nsDictionary),
                soadpBodyFirstChild = soapBodyNode ? XUI.DomUtilities.GetFirstChild(soapBodyNode) : null,
                xmlNSAttribute = null;
            if (soadpBodyFirstChild != null) xmlNSAttribute = soadpBodyFirstChild.attributes.getNamedItem("xmlns");
            var defaultNSName = xmlNSAttribute ? xmlNSAttribute.nodeValue : null;
            oXmlNode = defaultNSName ? XUI.Xml.SelectSingleNode(soapBodyNode, "./default:" + sCommand + "Response", {
                "default": defaultNSName
            }) : null;
            if (IsNull(oXmlNode)) {
                sHResult = "SoapError";
                bSuccess = false
            }
        }
        if (!bSuccess) {
            var bRetry = false;
            if (sHResult == ERRORCODE_ETM) {
                if (!bAsyncRequest) bRetry = window.confirm(LOCID_ERRMSG_ETM_RETRY)
            } else oRemoteCommand.ErrorHandler && oRemoteCommand.ErrorHandler(sHResult, oXmlNode)
        }
        return {
            Success: bSuccess,
            Retry: bRetry
        }
    }
    function ReadXml(oXml) {
        var oReturnFromLoop = false,
            oReturnValue = {};
        if (IsNull(oXml)) return oReturnValue;
        var sReturnValue = "";
        XUI.DomUtilities.ForEachChild(oXml, function (oChildNode) {
            var oChildNodeBaseName = XUI.DomUtilities.GetBaseName(oChildNode);
            switch (oChildNode.nodeType) {
                case 1:
                    var oChildObject = ReadXml(oChildNode);
                    if (IsNull(oReturnValue[oChildNodeBaseName])) oReturnValue[oChildNodeBaseName] = oChildObject;
                    else {
                        if (!isArray(oReturnValue[oChildNodeBaseName])) {
                            var property = oReturnValue[oChildNodeBaseName];
                            oReturnValue[oChildNodeBaseName] = [];
                            oReturnValue[oChildNodeBaseName].push(property)
                        }
                        oReturnValue[oChildNodeBaseName].push(oChildObject)
                    }
                    break;
                case 3:
                    var parsedValue = fromString(oChildNode.nodeValue);
                    if (sReturnValue.length > 0 || typeof parsedValue == "string") {
                        sReturnValue += fromString(oChildNode.nodeValue);
                        oReturnFromLoop = true
                    } else {
                        oReturnValue = parsedValue;
                        oReturnFromLoop = true;
                        return true
                    }
                    break;
                case 4:
                    sReturnValue += XUI.Xml.GetText(oChildNode);
                    oReturnFromLoop = true;
                    break;
                default:
                    break
            }
            return false
        });
        if (sReturnValue.length > 0) oReturnValue = sReturnValue;
        if (oReturnFromLoop) return oReturnValue;
        if (IsNull(oReturnValue.xmlAttributes)) {
            var attributes = oXml.attributes;
            if (attributes.length > 0) {
                oReturnValue.xmlAttributes = {};
                for (var i = 0; i < attributes.length; i++) oReturnValue.xmlAttributes[XUI.DomUtilities.GetBaseName(attributes.item(i))] = fromString(attributes.item(i).nodeValue)
            }
        }
        return oReturnValue
    }
    function fromString(sValue) {
        if (sValue.toLowerCase() == "true") return true;
        else if (sValue.toLowerCase() == "false") return false;
        var intValue = parseInt(sValue, 10);
        if (!isNaN(intValue) && intValue.toString() == sValue) return intValue;
        var floatValue = parseFloat(sValue);
        if (!isNaN(floatValue) && floatValue.toString() == sValue) return floatValue;
        var dateValue = new Date(sValue);
        if (!isNaN(dateValue) && dateValue.getFullYear() >= 1900 && dateValue.getFullYear() < 5e3) return dateValue;
        return sValue
    }
}
function ConvertUserTypeToLike(searchValue) {
    for (var s = "", sChar = "", iLength = searchValue.length, i = 0; i < iLength; i++) {
        sChar = searchValue.charAt(i);
        switch (sChar) {
            case "%":
                s += "[%]";
                break;
            case "_":
                s += "[_]";
                break;
            case "[":
                s += "[[]";
                break;
            case "*":
                s += "%";
                break;
            default:
                s += sChar;
                break
        }
    }
    return s
}
function GetNodeValue(input, searchName, bNoDecode) {
    if (!input || !searchName) return "";
    var rootStart = input.indexOf("<" + searchName + ">");
    if (rootStart == -1) {
        rootStart = input.indexOf("<" + searchName + " ");
        if (rootStart == -1) return ""
    }
    var startIndex = input.indexOf(">", rootStart) + 1,
        endIndex = input.indexOf("</" + searchName + ">", startIndex);
    if (endIndex == -1) return "";
    else return bNoDecode ? input.substring(startIndex, endIndex) : CrmEncodeDecode.CrmXmlDecode(input.substring(startIndex, endIndex))
}
function GetCachedSetting(settingName, defaultValue) {
    if (window.top.oSettingsCache != null) {
        var stateValue = window.top.oSettingsCache[settingName];
        if (stateValue != null) return stateValue
    }
    return defaultValue
}
function SetCachedSetting(settingName, stateValue) {
    if (window.top.oSettingsCache == null) window.top.oSettingsCache = {};
    window.top.oSettingsCache[settingName] = stateValue
}
function ScrollVerticalList(oContainer, oSelected, iSelectedIndex, iNumItems, bAlignToTop) {
    (oContainer.scrollTop > iSelectedIndex / iNumItems * oContainer.scrollHeight || oContainer.scrollTop + oContainer.clientHeight < (iSelectedIndex + 1) / iNumItems * oContainer.scrollHeight) && oSelected.scrollIntoView(bAlignToTop)
}
function getNumDigits(iVal) {
    if (isNaN(iVal)) return -1;
    if (iVal == null) return 0;
    var tempVal = iVal,
        countDigits = 0;
    while (tempVal != 0) {
        tempVal = tempVal / 10;
        tempVal = parseInt(tempVal, 10);
        countDigits++
    }
    return countDigits
}
function GetEntityIdAndDisplayName(entityData) {
    var resultsXmlDoc = null,
        entityId = "",
        displayName = "";
    try {
        resultsXmlDoc = XUI.Xml.LoadXml(entityData);
        var entityIdNode = XUI.Xml.SelectSingleNode(resultsXmlDoc, "//EntityId", null),
            displayNameNode = XUI.Xml.SelectSingleNode(resultsXmlDoc, "//DisplayName", null);
        entityId = IsNull(entityIdNode) ? "" : XUI.Xml.GetText(entityIdNode);
        displayName = IsNull(displayNameNode) ? "" : XUI.Xml.GetText(displayNameNode)
    } catch (e) {}
    return {
        EntityId: entityId,
        DisplayName: displayName
    }
}
function toBool(sValue) {
    return sValue.toLowerCase() == "true"
}
function QualifyLeadSuppressDeDup() {
    var leadQualifyDataXmlDoc = XUI.Xml.LoadXml(_qualifyLeadData),
        oShowNew = toBool(XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlShowNew", null))),
        oCreateAccount = toBool(XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlCreateAccount", null))),
        oCreateContact = toBool(XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlCreateContact", null))),
        oCreateOpportunity = toBool(XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlCreateOpportunity", null))),
        oNewStatus = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//ulNewStatus", null)),
        oOppCurrencyId = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlOppCurrencyId", null)),
        oOpportunityParentType = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlOpportunityParentType", null)),
        oOpportunityParentId = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlOpportunityParentId", null)),
        oLeadId = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlLeadId", null)),
        ocampaignId = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlCampaignId", null)),
        ocampaignType = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(leadQualifyDataXmlDoc, "//qlCampaignType", null)),
        formEntityOtc = parseInt(document.getElementById("crmFormSubmitObjectType").value, 10);
    if (formEntityOtc == Mscrm.EntityTypeCode.CampaignResponse) QualifyLead(oLeadId, oShowNew, oCreateAccount, oCreateContact, oCreateOpportunity, oOpportunityParentType, oOpportunityParentId, true);
    else formEntityOtc == Mscrm.EntityTypeCode.Lead && qualifyLead(oShowNew, oCreateAccount, oCreateContact, oCreateOpportunity, oOpportunityParentType, oOpportunityParentId, oOppCurrencyId, oNewStatus, true)
}
function CheckForDuplicates(iEventType, sRedirectUrl) {
    var dataXml = "",
        crmFormCtrl = $find("crmForm"),
        success = crmFormCtrl.BuildXml(false, false, true),
        xml = window.document.getElementById("crmFormSubmitXml");
    dataXml = xml.value;
    var oUrl = Mscrm.CrmUri.create("/Tools/DuplicateDetection/ViewDuplicates/ViewDuplicates.aspx?source=1"),
        oid = window.document.getElementById("crmFormSubmitId");
    if (oid && oid.value && oid.value != "") oUrl.get_query()["oid"] = oid.value;
    var dataXmlObj = {};
    dataXmlObj.xml = dataXml;
    var changedDataXmlObj = {};
    changedDataXmlObj.xml = _changedFormData;
    var dataXmlArray;
    if (typeof _dupActionName != "undefined") dataXmlArray = [dataXmlObj, changedDataXmlObj, _dupActionName];
    else dataXmlArray = [dataXmlObj, changedDataXmlObj];
    var innerPageManager = $find("crmInlinePageManager");
    if (IsNull(innerPageManager)) innerPageManager = $find("crmPageManager");
    var parameters = [iEventType, sRedirectUrl, crmFormCtrl, innerPageManager],
        callbackFunction = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterViewDuplicates", this, parameters),
        entityData = openStdDlgWithCallback(oUrl, dataXmlArray, 560, 560, callbackFunction, false, false);
    Mscrm.Utilities.isModalDialogSupported() && performActionAfterViewDuplicates(entityData, iEventType, sRedirectUrl, crmFormCtrl, innerPageManager)
}
function performActionAfterViewDuplicates(entityData, iEventType, sRedirectUrl, crmFormCtrl, innerPageManager) {
    entityData == "QualifyLead" && QualifyLeadSuppressDeDup();
    var entityId = "",
        displayName = "",
        returnValues;
    if (entityData && entityData != "") {
        returnValues = GetEntityIdAndDisplayName(entityData);
        if (!IsNull(returnValues)) {
            entityId = returnValues.EntityId;
            displayName = returnValues.DisplayName
        }
    }
    if (entityId && entityId != "") {
        crmFormCtrl.detachCloseAlert();
        if (iEventType == 2) {
            if (!IsNull(Mscrm.PageManager) && Mscrm.PageManager.isFlatUIPage() && !IsNull(Mscrm.PageManager.get_instance())) {
                innerPageManager.executeDeferredActions();
                return
            }
            var oType = window.document.getElementById("crmFormSubmitObjectType").value;
            try {
                if (window.opener.location.href.indexOf("resolve.aspx") > 0) window.opener.auto(oType, displayName, entityId);
                else window.opener.auto(oType)
            } catch (e) {}
            closeWindow()
        } else if (iEventType == 1) {
            if (!IsNull(Mscrm.PageManager) && Mscrm.PageManager.isFlatUIPage() && !IsNull(Mscrm.PageManager.get_instance())) {
                var parameters = {};
                parameters["newId"] = entityId;
                innerPageManager.executeDeferredActions(parameters);
                return
            }
            var sLocation = location.href,
                separator = sLocation.indexOf("?") != -1 ? "&" : "?",
                poundIndex = -1;
            if ((poundIndex = sLocation.indexOf("#")) != -1) sLocation = sLocation.substr(0, poundIndex);
            if (sLocation.indexOf("?id=") == -1 && sLocation.indexOf("&id=") == -1) {
                sLocation = sLocation + separator + "id=" + entityId;
                separator = "&"
            }
            if (sLocation.indexOf("?refreshgrid=") == -1 && sLocation.indexOf("&refreshgrid=") == -1) sLocation = sLocation + separator + "refreshgrid=1";
            window.location.href = sLocation
        } else if (iEventType == 59) {
            if (!IsNull(Mscrm.PageManager) && Mscrm.PageManager.isFlatUIPage() && !IsNull(Mscrm.PageManager.get_instance())) {
                var parameters = {};
                parameters["newId"] = entityId;
                innerPageManager.executeDeferredActions(parameters);
                return
            }
            window.location.href = sRedirectUrl
        }
    }
}
function customErrorHandler(ex, iEventType, sUrl) {
    if (ex == "0x80040333") {
        CheckForDuplicates(iEventType, sUrl);
        return true
    }
    return false
}
function GenerateAuthenticationHeader() {
    var xml = new StringBuilder;
    xml.Append('<soap:Header><CrmAuthenticationToken xmlns="');
    xml.Append(CrmEncodeDecode.CrmXmlEncode(CRM2007_WEBSERVICE_NS));
    xml.Append('"><AuthenticationType xmlns="');
    xml.Append(CrmEncodeDecode.CrmXmlEncode(CRM2007_CORETYPES_NS));
    xml.Append('">');
    xml.Append(CrmEncodeDecode.CrmXmlEncode(AUTHENTICATION_TYPE));
    xml.Append('</AuthenticationType><CrmTicket xmlns="');
    xml.Append(CrmEncodeDecode.CrmXmlEncode(CRM2007_CORETYPES_NS));
    xml.Append('"></CrmTicket><OrganizationName xmlns="');
    xml.Append(CrmEncodeDecode.CrmXmlEncode(CRM2007_CORETYPES_NS));
    xml.Append('">');
    xml.Append(CrmEncodeDecode.CrmXmlEncode(ORG_UNIQUE_NAME));
    xml.Append('</OrganizationName><CallerId xmlns="');
    xml.Append(CrmEncodeDecode.CrmXmlEncode(CRM2007_CORETYPES_NS));
    xml.Append('">00000000-0000-0000-0000-000000000000</CallerId></CrmAuthenticationToken></soap:Header>');
    return xml.ToString()
}
function escapeSingleQuotesAndBackSlashes(s) {
    s = s.replace(/\\/g, "\\\\");
    return s.replace(/'/g, "\\'")
}
function FormatDateTime(dDateTime) {
    var DATE_SEPARATOR = "-",
        DATETIME_SEPARATOR = "T",
        TIME_SEPARATOR = ":",
        oBuilder = new StringBuilder;
    oBuilder.Append(dDateTime.getFullYear());
    oBuilder.Append(DATE_SEPARATOR);
    oBuilder.Append(PadNumber(dDateTime.getMonth() + 1));
    oBuilder.Append(DATE_SEPARATOR);
    oBuilder.Append(PadNumber(dDateTime.getDate()));
    oBuilder.Append(DATETIME_SEPARATOR);
    oBuilder.Append(PadNumber(dDateTime.getHours()));
    oBuilder.Append(TIME_SEPARATOR);
    oBuilder.Append(PadNumber(dDateTime.getMinutes()));
    oBuilder.Append(TIME_SEPARATOR);
    oBuilder.Append(PadNumber(dDateTime.getSeconds()));
    return oBuilder.ToString()
}
function PadNumber(iNumber, iLength) {
    var PAD_CHAR = "0",
        DEFAULT_LENGTH = 2;
    if (iLength == null) iLength = DEFAULT_LENGTH;
    for (var sNumber = new String(iNumber), oBuilder = new StringBuilder, i = 0; i < iLength - sNumber.length; i++) oBuilder.Append(PAD_CHAR);
    oBuilder.Append(sNumber);
    return oBuilder.ToString()
}
function isControlVisible(oElement) {
    return XUI.Html.GetComputedStyle(oElement, "display") === "none" ? false : true
}
window.globalAshxLoaded = true;
(function () {
    window.loadAllScriptIncludes_header && window.loadAllScriptIncludes_header();
    window.loadAllScriptIncludes_footer && window.loadAllScriptIncludes_footer();
})();