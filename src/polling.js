class PollingClient {
  interval;
  intervalId;
  host;

  constructor(host, interval) {
    this.host = host;
    this.interval = interval;
  }

  subscribe() {
    this.intervalId = setInterval(async () => {
      try {
        const response = await fetch(this.host);
        const events = await response.json();
        console.log(events);
      } catch (err) {
        console.error(err);
      }
    }, this.interval);
  }

  unsubscribe() {
    clearInterval(this.intervalId);
  }
}

const client = new PollingClient('http://localhost:8080', 3_000);
client.subscribe();
