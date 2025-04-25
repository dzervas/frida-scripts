import * as Struct from "./struct.js";
import * as GUID from "./guid.js";

export var Abi = Process.arch == 'x64' ? 'win64' : 'stdcall';

export function FindHiddenExport(moduleName, procName) {
    var Kernel32 = {
        LoadLibrary: new NativeFunction(Module.findExportByName("kernel32.dll", "LoadLibraryW"), 'pointer', ['pointer'], Abi),
        GetProcAddress: new NativeFunction(Module.findExportByName("kernel32.dll", "GetProcAddress"), 'pointer', ['pointer', 'pointer'], Abi),
    };
    var moduleAddr = Kernel32.LoadLibrary(Memory.allocUtf16String(moduleName));
    if (moduleAddr == 0x0) { throw Error("Didn't load " + moduleName); }
    return Kernel32.GetProcAddress(moduleAddr, Memory.allocAnsiString(procName));
}


// module.exports = {
//     // Microsoft APIs use stdcall on x86.
//     Abi: Abi,
//     FindHiddenExport: FindHiddenExport,
// };
