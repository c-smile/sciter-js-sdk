import * as sys from "@sys";
import * as BJSON from "@bjson";

const PIPE_NAME = "inspector-js";

async function handleConnection(driverFactory,conn) 
{
    //console.log(`Accepted connection! ${conn.getpeername()} <-> ${conn.getsockname()}`);

    var driver;

    function closeconn() { if(conn) conn.close(); }

    document.on("beforeunload", closeconn);

    let awaitingResponses = [];

    function outbound(name,data,callback) {
      if(callback) {
        awaitingResponses.push(callback);
        conn.write(BJSON.write([name,true, data]));
      } else 
        conn.write(BJSON.write([name,false, data]));
    }

    driver = driverFactory(outbound);

    var message;
    while (true) {
      try {
        message = await conn.read();
        if (!message)
          break;
        BJSON.read(message, (chunk) => {
          const [name,needresp,data] = chunk;
          if( name == "resp")
            awaitingResponses.shift()(data);
          else {
            let answer = driver.handle(name,data);
            if( needresp )
              conn.write(BJSON.write(["resp",false,answer]));
          }
        });
      }
      catch(e) {
        console.error("conn:",e,e?.stack);
        break;
      }
    }
    //console.log('empty message, connection closed?', typeof message);
    driver.gone();
    conn = undefined;
    document.off(closeconn);
}

export async function serve(driverFactory) 
{
  var p = new sys.Pipe();
  document.on("beforeunload", evt => p.close());
  try {
    p.bind(PIPE_NAME);
    p.listen();
    //console.log(`Listening on ${p.getsockname()}`);
    let conn;
    while (true) {
        conn = await p.accept();
        if(!conn) break;
        handleConnection(driverFactory,conn);
        conn = undefined;
    }
  } catch (e) {
    console.error("serve:",e,e?.stack);
  }
}