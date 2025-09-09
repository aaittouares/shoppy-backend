import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ProductsGateway implements OnGatewayConnection {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  private readonly server: Server;

  handleProductUpdated() {
    this.server.emit('productUpdated');
  }

  handleConnection(client: Socket) {
    try {
      this.authService.verifyToken(client.handshake.auth.Authentication.value);
      console.log('ws auth authorized');
    } catch (err) {
      client.disconnect(true);
      console.log('dégage de là, ws auth pas authorized');
      //throw new WsException('Unauthorized.');
    }
  }
}
