import * as Win32 from "./win32.js";

var OleAut32 = {
    SysAllocString: new NativeFunction(Module.findExportByName("OleAut32.dll", "SysAllocString"), 'pointer', ['pointer'], Win32.Abi),
    SysFreeString: new NativeFunction(Module.findExportByName("OleAut32.dll", "SysFreeString"), 'void', ['pointer'], Win32.Abi),
};

exports = {
    alloc: function (str) { return OleAut32.SysAllocString(Memory.allocUtf16String(str)); },
    read: function (bstr_ptr) { return Memory.readUtf16String(str); },
    free: function (bstr_ptr) { OleAut32.SysFreeString(bstr_ptr); },
};
