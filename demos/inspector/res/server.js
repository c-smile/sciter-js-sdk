import * as sys from "@sys";

const PIPE_NAME = "inspector-js";

async function handleConnection(driverFactory, conn) {
  // console.log(`Accepted connection! ${conn.getpeername()} <-> ${conn.getsockname()}`);

  let driver;
  const bstream = new BJSON(); // Binary JSON stream

  function closeconn() {
    if (conn) conn.close();
  }

  document.on("beforeunload", closeconn);

  const awaitingResponses = [];

  function outbound(name, data, callback) {
    if (callback) {
      awaitingResponses.push(callback);
      conn.write(bstream.pack([name, true, data]));
    }
    else
      conn.write(bstream.pack([name, false, data]));
  }

  // read very first message, either "hello" or "activate":

  let data = await conn.read();
  if (!data)
    return;

  bstream.unpack(data, (message) => {
    const [name, needresp, data] = message;
    if (name == "hello") {
      // first client message
      driver = driverFactory(outbound, data);
    }
    else if (name == "activate") { // other instance of inspector is trying to run
      Window.this.activate();
      conn.close();
      conn = undefined;
    }
  });

  // server loop

  while (conn) {
    try {
      data = await conn.read();
      if (!data)
        break;
      bstream.unpack(data, (message) => {
        const [name, needresp, data] = message;
        if (name == "resp")
          awaitingResponses.shift()(data);
        else {
          const answer = driver.handle(name, data);
          if (needresp)
            conn.write(bstream.pack(["resp", false, answer]));
        }
      });
    }
    catch (e) {
      console.error("conn:", e, e?.stack);
      break;
    }
  }
  // console.log('empty message, connection closed?', typeof message);
  if (driver)
    driver.gone(outbound);
  conn = undefined;
  document.off(closeconn);
}

async function activateOtherInstance() {
  const pipe = new sys.Pipe();
  const bstream = new BJSON();

  try {
    await pipe.connect(PIPE_NAME);
    await pipe.write(bstream.pack(["activate", false, null]));
    Window.this.close();
  }
  catch (e) {
      document.body.patch(<body>
        Error {e} activating other instance of inspector.
        <pre>{e?.stack}</pre>
        (Rebooting the OS may help).
      </body>);
      Window.this.state = Window.WINDOW_SHOWN;
  }
}

export async function serve(driverFactory) {
  const p = new sys.Pipe();
  document.on("beforeunload", (evt) => p.close());
  try {
    p.bind(PIPE_NAME);
    p.listen();
    Window.this.state = Window.WINDOW_SHOWN;
    // console.log(`Listening on ${p.getsockname()}`);
    let conn;
    while (true) {
      conn = await p.accept();
      handleConnection(driverFactory, conn);
      conn = undefined;
    }
  }
  catch (e) {
    if (e.message.includes("address already in use")) {
      p.close();
      activateOtherInstance();
    }
    else {
      document.body.patch(<body>
        Error {e} starting inspector.
        <pre>{e?.stack}</pre>
        (Rebooting the OS may help).
      </body>);
      Window.this.state = Window.WINDOW_SHOWN;
    }
  }
}
