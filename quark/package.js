
import * as env from "@env";
import * as sys from '@sys';
import * as sciter from '@sciter';

import { LogRunner } from 'logrunner.js';

export function checkForImageMagic( resultCb ) 
{
  var signatureFound = false;

  if( env.PLATFORM != "Windows" )
    return; // we need it only on Windows so far

  async function readPipe(pipe) {
    try {
      while(pipe) {
        var text = sciter.decode(await pipe.read()); 
        signatureFound = signatureFound || text.indexOf("ImageMagic") >= 0;  
      }
    } catch(e) {}
    resultCb(signatureFound);
  }
  
  var proc = sys.spawn(["magick","-version"], { stdout:"pipe", stderr:"pipe"} );

  if(!proc) 
    document.post( () => resultCb(false) );
  else 
    readPipe(proc.stdout);
}

function checkFolder(folderPath, forWriting = false) 
{
  const S_IFDIR = 0x4000;
  const S_IWRITE = 0x0080;
  const S_IREAD = 0x0100;

  const modes = forWriting ? (S_IFDIR | S_IWRITE) : (S_IFDIR | S_IREAD);

  var stat = sys.fs.$stat(folderPath);
  if(stat)
    return (stat.st_mode & modes) == modes;
  return false;
}


async function convertSvgToIco(inp,outp) {
  const args = ["magick","-density","256x256","-background","transparent",inp,"-define","icon:auto-resize","-colors","256",outp];
  var r = await LogRunner.run(args);
  if(r != 0) throw "convertSvgToIco: failed to produce .ICO file";
}

function checkFile(path) {
  if(sys.fs.$stat(path)) return path;
  return null;
}

function getPackfolderPath() {
  if(env.PLATFORM == "Windows")
    return checkFile(env.home("../packfolder.exe") ) 
        || checkFile(env.home("../../bin/windows/packfolder.exe"));
  else if(env.PLATFORM == "OSX")
    return checkFile(env.home("packfolder") ) 
        || checkFile(env.home("../../bin/macosx/packfolder"));
  else if(env.PLATFORM  == "Linux")
    return  checkFile(env.home("../packfolder") ) 
        || checkFile(env.home("../../bin/linux/packfolder"));
}

function getScappPath(target) {
  switch(target) {
    case "winX32": return checkFile( env.home("../x32/scapp.exe") ) || checkFile( env.home("../../bin/windows/x32/scapp.exe"));
    case "winX64": return checkFile( env.home("../x64/scapp.exe") ) || checkFile( env.home("../../bin/windows/x64/scapp.exe"));
    case "winARM64": return checkFile( env.home("../arm64/scapp.exe") ) || checkFile(env.home("../../bin/windows/arm64/scapp.exe"));
    case "macX64": return checkFile( env.home("scapp") ) || checkFile(env.home("../../bin/macosx/scapp"));
    case "linuxX64": return checkFile( env.home("../x64/scapp") ) || checkFile( env.home("../../bin/linux/x64/scapp"));
    case "linuxARM32": return checkFile( env.home("../arm32/scapp") ) || checkFile( env.home("../../bin/linux/arm32/scapp"));
  }
}

async function packageResources(folder,datfile) {

  const packfolder = getPackfolderPath();
  if(!packfolder)
    throw "packageResources: no packfolder executable found";
  const args = [packfolder,folder,datfile,"-binary"];
  var r = await LogRunner.run(args);
  if(r != 0) throw `packfolder: failed to produce ${datfile} file, status=${r}`;
}

function makePath(dir,subdirs,nameext) {
  var path = dir;
  for(var sub of subdirs) {
    path += "/";
    path += sub;
    if(checkFile(path)) continue;
    if(!sys.fs.$mkdir(path)) throw "makePath: cannot create dir:" + path; 
  }
  return path + "/" + nameext;
}

function assembleExe(target,scapp,datfile,exefile, params = null) {

  var r = Window.this.scapp.assembleExe(scapp,datfile,exefile,params);
  var msg;
  switch(r) {
    case 0: LogRunner.add(`${target} Done!`,"result"); break;
    case 1: LogRunner.add(`${target} Done, but no metadata update`,"result"); break;
    case -1: LogRunner.add(`${target} FAILURE, no .dat file`, "stderr"); break;
    case -2: LogRunner.add(`${target} FAILURE opening output file`, "stderr"); break;
    case -3: LogRunner.add(`${target} FAILURE writing output file`, "stderr"); break;
  }
}

export async function assemble(params) {

  LogRunner.clear();

  if(!checkFolder(params.resources, false)) {
    LogRunner.add(`Error: ${params.resources} is not a readable folder`, "stderr");
    return;
  }

  if(!checkFolder(params.out, true)) {
    LogRunner.add(`Error: ${params.out} is not a writeable folder`, "stderr");
    return;
  }


  const datfile = params.out + "/" + params.exe + ".dat";
  const icofile = params.out + "/" + params.exe + ".ico";

  try {
    await packageResources(params.resources,datfile);
    for( var target of params.targets ) 
    {
      switch(target) {
        case "winX32": {
          await convertSvgToIco(params.logo,icofile);
          const scapp = checkFile( env.home("../x32/scapp.exe") ) || checkFile( env.home("../../bin.win/x32/scapp.exe"));
          const exefile = makePath(params.out, ["windows","x32"], params.exe + ".exe");
          var p = Object.assign({},params,{icofile:icofile});
          assembleExe(target,scapp,datfile,exefile,p);
        } break;
        case "winX64": {
          await convertSvgToIco(params.logo,icofile);
          const scapp = checkFile( env.home("../x64/scapp.exe") ) || checkFile( env.home("../../bin.win/x64/scapp.exe"));
          const exefile = makePath(params.out, ["windows","x64"], params.exe + ".exe");
          var p = Object.assign({},params,{icofile:icofile});
          assembleExe(target,scapp,datfile,exefile,p);
        } break;
        case "winARM64": {
          await convertSvgToIco(params.logo,icofile);
          const scapp = checkFile( env.home("../arm64/scapp.exe") ) || checkFile(env.home("../../bin.win/arm64/scapp.exe"));
          const exefile = makePath(params.out, ["windows","arm64"], params.exe + ".exe");
          var p = Object.assign({},params,{icofile:icofile});
          assembleExe(target,scapp,datfile,exefile,p);
        } break;
        case "mac": { // TODO: build proper .app bundle folder here
          const scapp = checkFile( env.home("scapp") ) || checkFile( env.home("../../bin.osx/scapp"));
          const exefile = makePath(params.out, ["macos"], params.exe);
          assembleExe(target,scapp,datfile,exefile);
        } break;
        case "linuxX64": {
          const scapp = checkFile( env.home("../x64/scapp") ) || checkFile( env.home("../../bin.lnx/x64/scapp"));
          const exefile = makePath(params.out, ["linux","x64"], params.exe);
          assembleExe(target,scapp,datfile,exefile);
        } break;
        case "linuxARM32": {
          const scapp = checkFile( env.home("../arm32/scapp") ) || checkFile( env.home("../../bin.lnx/arm32/scapp"));
          const exefile = makePath(params.out, ["linux","arm32"], params.exe);
          assembleExe(target,scapp,datfile,exefile);
        } break;
      }
    }
  } 
  catch(e) 
  {
    LogRunner.add(e, "stderr");
  }

}

