const WebSocket = require('ws');

let wss = null;

const onConnection = (ws, req) => {
  // TODO: ws.user = token.email
  ws.on('error', () => {});
};

const broadcastToAll = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, (error) => {});
    }
  });
};

const listen = (server) => {
  wss = new WebSocket.Server({
    path: '/ws/dashboard', //Accept only connections matching this path
    maxPayload: 1024, //The maximum allowed message size
    backlog: 100, //The maximum length of the queue of pending connections.
    // verifyClient: verifyClient, //An hook to reject connections
    server, //A pre-created HTTP/S server to use
  });

  wss.on('connection', onConnection);
  wss.broadcast = broadcastToAll;
};

const send = ({ event, payload }) => {
  wss.broadcast(JSON.stringify({ event, payload }));
};

const events = {
  ALIPAY: 'ALIPAY',
  BALANCE: 'BALANCE',
  REGISTRATION: 'REGISTRATION',
  CHANGE_PIN: 'CHANGE_PIN',
  LINK_BANK: 'LINK_BANK',
  UNLINK_BANK: 'UNLINK_BANK',
  CASHIN_VIA_LINKED_BANK: 'CASHIN_VIA_LINKED_BANK',
  CASHIN_VIA_UNLINK_BANK: 'CASHIN_VIA_UNLINK_BANK',
  CASHOUT_VIA_LINKED_BANK: 'CASHOUT_VIA_LINKED_BANK',
  CASHOUT_VIA_UNLINK_BANK: 'CASHOUT_VIA_UNLINK_BANK',
  TRANSFER: 'TRANSFER',
};

module.exports = {
  listen: listen,
  send: send,
  events: events,
};
