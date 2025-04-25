import * as Struct from "./struct.js";
import * as COM from "./com.js";
import * as Win32 from "./win32.js";

var ComBase = {
    WindowsCreateString: new NativeFunction(Win32.FindHiddenExport("combase.dll", "WindowsCreateString"), 'uint', ['pointer', 'uint', 'pointer'], Win32.Abi),
    WindowsDeleteString: new NativeFunction(Win32.FindHiddenExport("combase.dll", "WindowsDeleteString"), 'uint', ['pointer'], Win32.Abi),
    WindowsGetStringRawBuffer: new NativeFunction(Win32.FindHiddenExport("combase.dll", "WindowsGetStringRawBuffer"), 'pointer', ['pointer', 'pointer'], Win32.Abi),
};

module.exports = {
    alloc: function (str) {
        var ret = new Struct({ 'value': 'pointer' });
        COM.ThrowIfFailed(ComBase.WindowsCreateString(Memory.allocUtf16String(str), str.length, ret.Get()));
        return ret.value;
    },
    read: function (hstring) { return Memory.readUtf16String(ComBase.WindowsGetStringRawBuffer(hstring, NULL)); },
    free: function (hstring) { return ComBase.WindowsDeleteString(hstring); },
}


