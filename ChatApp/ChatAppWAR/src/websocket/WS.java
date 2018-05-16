package websocket;

import java.io.IOException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

@ServerEndpoint("/websocket/echo")
public class WS{

		
	@OnOpen
	public void onOpen(Session session) throws NamingException {
		Context context = new InitialContext();
		WSLocal ws = (WSLocal) context.lookup("java:app/ChatAppJAR/WSBean!websocket.WSLocal");
		ws.onOpen(session);
	}
	
	@OnMessage
	public void echoTextMessage(Session session, String msg, boolean last) throws JsonParseException, JsonMappingException, IOException, NamingException {		
		Context context = new InitialContext();
		WSLocal ws = (WSLocal) context.lookup("java:app/ChatAppJAR/WSBean!websocket.WSLocal");
		ws.echoTextMessage(session, msg, last);
	}

	@OnClose
	public void close(Session session) throws NamingException {
		Context context = new InitialContext();
		WSLocal ws = (WSLocal) context.lookup("java:app/ChatAppJAR/WSBean!websocket.WSLocal");
		ws.close(session);	
	}
	
	@OnError
	public void error(Session session, Throwable t) throws NamingException {
		Context context = new InitialContext();
		WSLocal ws = (WSLocal) context.lookup("java:app/ChatAppJAR/WSBean!websocket.WSLocal");
		ws.error(session, t);
		
	}

	
	
	
}