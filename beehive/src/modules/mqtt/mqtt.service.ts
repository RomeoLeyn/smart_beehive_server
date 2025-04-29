import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { ReadingsService } from 'src/modules/readings/readings.service';

@Injectable()
export class MqttService {
  constructor(private readonly readingsService: ReadingsService) {}

  private client: mqtt.MqttClient;

  onModuleInit() {
    this.client = mqtt.connect(process.env.MQTT_BROKER || '', {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    });

    this.client.on('connect', () => {
      console.log('Connect to MQTT');
      this.client.subscribe(process.env.MQTT_TOPIC || '', (err) => {
        if (!err) {
          console.log('Subcrive to topic beehive/sensors');
        }
      });
    });

    this.client.on('message', (topic, message) => {
      const sensorsreadings = message.toString();
      void this.readingsService.create(sensorsreadings);
    });
  }
}
