//config global
const hostname = '127.0.0.1';
const port = 3000;

var apiNative = require("./apiNative");

apiNative.server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
