import { OnEvent } from "@nestjs/event-emitter";
import { 
    OnGatewayConnection,
    OnGatewayInit, 
    SubscribeMessage, 
    WebSocketGateway, 
    WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { JwtHandle } from "../../auth/utils/jwt-handle/jwt-handle";

@WebSocketGateway({
    cors:{
       origin: '*',
    },
})
export class SocketProvider {
    constructor(private JwtHandle:JwtHandle){}
    @WebSocketServer() serverGlobal: Socket;
    /**
     * esta funcion se encarga de emitir el evento join que emite el frontend(angular,react,vue)
     * @param video 
     */
    @SubscribeMessage('join')
    handleJoin(io: Socket, token: string){
        const {id} = this.JwtHandle.getIdByToken(token);
        io.join(`__room__ ${id}`);

    }

    @OnEvent('video.created')
    getVideo(video: any){
        this.serverGlobal.emit('video.created', video);
    }

    @OnEvent('video_user.created')
    sendVideosToUser(data: {video: any,id: string}){
        this.serverGlobal
        .to(`__room__ ${data.id}`)
        .emit('video.created', data.video);
        // this.serverGlobal.emit('video_user.created', video);
    }
}
