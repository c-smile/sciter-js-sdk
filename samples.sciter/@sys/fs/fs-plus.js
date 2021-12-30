
import * as sys from "@sys";
import * as env from "@env";

export function drillDir(path) {
 return path.split("/").reduce((parentDir, childDir) => {
    let curDir = parentDir + childDir;
    if(childDir == "") return parentDir;
    if(!sys.fs.$stat(curDir)?.isDirectory)
    {    
      if(!sys.fs.$mkdir(curDir))
         throw new Error(`failed to create directory ${curDir}`);
    }
    return curDir + "/";
  }, env.PLATFORM == "Windows"? "":"/");
}