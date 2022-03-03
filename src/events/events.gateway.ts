import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { promisify } from 'util';
import { exec } from 'child_process';
import 'dotenv/config';

const port: any = process.env.HOST_LAUNCHER_PORT || 3801;
@WebSocketGateway(Number(port), {
  cors: true,
  namespace: 'events',
  timeout: 500000000000000,
  pingTimeout: 999999999,
})
export class EventsGateway implements OnGatewayConnection, OnGatewayConnection, OnGatewayDisconnect {
  containerSockets = {};
  containerLogSockets = {};
  containerMonitorSockets = {};
  public connectedSockets: { [key: string]: any[] } = {};
  exec = promisify(exec);

  @WebSocketServer() server: Server;
  private readonly logger = new Logger(EventsGateway.name);
  // constructor() {}

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.logger.log('------> Identify <------ ', ' Data: ', data);
    return data;
  }

  @SubscribeMessage('ping')
  async pingReceiver(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.logger.log('------> Ping <------ ', ' Hello ', client.id);
  }

  @SubscribeMessage('openTerminal')
  async openTerminal(@MessageBody() data: any): Promise<number> {
    if (!data.containerId) return;
    this.logger.log('------> Launching Terminal <------ ', ' Container: ', data.containerId);
    const cmd = `osascript -e 'tell app "Terminal" to do script "docker exec -it ${data.containerId} /bin/sh"' && osascript -e 'tell application "Terminal" to activate'`;
    await this.exec(cmd);
    return null;
  }

  @SubscribeMessage('openFinderPath')
  async openFinderPath(@MessageBody() data: any): Promise<number> {
    if (!data.filePath) return;
    this.logger.log('------> Launching Finder <------ ', ' filePath: ', data.filePath);
    const cmd = `open ${data.filePath}`;
    await this.exec(cmd);
    return null;
  }

  @SubscribeMessage('openVSCodePath')
  async openVSCodePath(@MessageBody() data: any): Promise<number> {
    if (!data.filePath) {
      return;
    }
    this.logger.log('------> Launching VSCode <------ ', ' filePath: ', data.filePath);
    const cmd = `osascript -e 'tell app "VS Code" to open ${data.filePath} && osascript -e 'tell application "VS Code" to activate'`;
    await this.exec(cmd);
    return null;
  }

  @SubscribeMessage('tailLogs')
  async tailLogs(@MessageBody() data: any): Promise<number> {
    this.logger.log('------> Launching Terminal for Logs <------ ', ' Container: ', data.containerId);
    if (!data.containerId) return;
    const cmd = `osascript -e 'tell app "Terminal" to do script "docker logs ${data.containerId} --details --follow --tail=all"' && osascript -e 'tell application "Terminal" to activate'`;
    await this.exec(cmd);
    return null;
  }

  async handleConnection(client: any, req: Request) {
    try {
      if (req) {
      }
      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      console.warn('error', error);
    }
  }

  handleDisconnect(client: any) {
    console.log('------> See ya ', client.id);
  }
}
