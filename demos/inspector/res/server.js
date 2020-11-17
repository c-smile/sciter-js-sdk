import * as sys from "@sys";
import * as BJSON from "@bjson";

const PIPE_NAME = "inspector-js";

async function handleConnection(driverFactory,conn) 
{
    console.log(`Accepted connection! ${conn.getpeername()} <-> ${conn.getsockname()}`);

    var driver;

    async function outbound(message) {
      conn.write(BJSON.write(message));
      let response = await conn.read();
      if (!response) {
          console.log('connection closed!');
          driver.gone();
      }
      return BJSON.read(response);
    }

    driver = driverFactory(outbound);

    var message;
    while (true) {
        try {
          message = await conn.read();
          if (!message) {
              console.log('connection closed!');
              driver.gone();
              break;
          }
          let answer = driver.handle(BJSON.read(message));
          //list.append(<text>Received:{JSON.stringify(json)}</text>);
          if(answer)
            conn.write(BJSON.write(answer));
        }
        catch(e) {
          console.error(e);
        }
    }
}

export async function serve(driverFactory) 
{
  var p = new sys.Pipe();
  document.on("beforeunload", evt => p.close());
  try {
    p.bind(PIPE_NAME);
    p.listen();
    console.log(`Listening on ${p.getsockname()}`);
    let conn;
    while (true) {
        conn = await p.accept();
        handleConnection(driverFactory,conn);
        conn = undefined;
    }
  } catch (e) {
    console.log(e);
  }
}