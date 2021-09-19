import http from 'http';
const port = 8080;

const listener = (req, res) => {
  const random = Math.random();
  const hasNewEvent = random > 0.7;
  res.writeHead(200);
  if (hasNewEvent) {
    res.end(JSON.stringify({ events: ['New event'] }));
  } else {
    res.end(JSON.stringify({ events: [] }));
  }
};

const server = http.createServer(listener);

server.listen(port, () => {
  console.info(`Server is running on ${port}`);
});
