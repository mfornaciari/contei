export async function wsOpen(ws: WebSocket): Promise<void> {
  await new Promise(resolve => {
    ws.onopen = resolve;
  });
}

export async function wsMessage(ws: WebSocket): Promise<string> {
  const event = await new Promise<MessageEvent<string | Buffer>>(resolve => {
    ws.onmessage = resolve;
  });
  return event.data.toString();
}

export async function wsClose(ws: WebSocket): Promise<void> {
  const closed = new Promise<CloseEvent>(resolve => {
    ws.onclose = resolve;
  });
  ws.close();
  await closed;
}
