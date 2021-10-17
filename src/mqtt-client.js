import * as mqtt from 'mqtt';

class MqttClient {
  host;
  topic;
  client;

  constructor(host, topic) {
    this.host = host;
    this.topic = topic;
  }

  subscribe() {
    this.client = this.connect();

    this.client.on('connect', () => {
      console.info(`Connected to: ${this.host}`);

      this.client.subscribe(this.topic, {}, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.info(`Subscribed to: ${this.topic}`);

        this.client.on('message', (topic, content) => {
          if (!content) {
            return;
          }
          console.info(`New message on ${topic}`);
          const events = JSON.parse(content.toString());
          console.log(events);
        });
      });
    });
  }

  unsubscribe() {
    if (!this.client) {
      return;
    }
    this.client.end();
  }

  connect() {
    const client = mqtt.connect(this.host);
    return client;
  }

  publish(message) {
    const publishMessage = () => {
      this.client.publish(this.topic, JSON.stringify(message));
    };

    if (this.client.connected) {
      publishMessage();
    } else {
    }
    this.client.on('connect', publishMessage);
  }
}

const mqttClient = new MqttClient(
  'ws://broker.hivemq.com:8000/mqtt',
  'someTopic',
);

mqttClient.subscribe();

setInterval(() => {
  mqttClient.publish('Hi');
}, 5_000);
