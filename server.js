const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // if you run the client from sth like file:///C:/nodejs/10httonlyCookie1/index.html
  // it would mean HTML file is being served via the file:// protocol directly from your filesystem rather than over HTTP or HTTPS.
  console.log('Request origin:', req.headers.origin);
  console.log('Request url:', req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');// Adjust the port if necessary
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    // Preflight request automatically sends by browser for many reasons
    res.writeHead(204);//success with no content to return to the client
    res.end();
    return;
  }
 
  /*\ /login */
  if (req.url === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      console.log(body);
      try {
        
        const { username, password } = JSON.parse(body); // Parse the JSON body
        console.log(username, password);
        if (username === 'admin' && password === 'xPA$81') {
          res.writeHead(200, {
            'Set-Cookie': 'token=123456; HttpOnly; ',
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ message: 'Logged in successfully' }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Unauthorized' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Bad Request: Invalid JSON' }));
      }
    });
    /*\ /something */
  } else if (req.url === '/something' && req.method === 'GET') {
    // Check if the user is logged in by checking the cookie
    const cookie = req.headers.cookie;
    if (cookie && cookie.includes('token=123456')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'You are logged in, here is something. BLBL' }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Unauthorized: You are not logged in.' }));
    }
  } else {
    // For any other route, return 404 not found
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
});
server.listen(port, () => {
  console.log('Server running on port 3000');
});//**  Generated mostly by chatGPT ver. 4 **/
