
const COMPRESS = process.env.NODE_ENV === 'production';
const setValue = (c, u) => COMPRESS ? c : u;
const REGISTER_SYNTHLE = setValue(0, 'RegisterSynthle');
const REGISTER_CONTROLLER = setValue(1, 'RegisterController');
const REGISTERED = setValue(2, 'Registered');
const CREATE_ROOM = setValue(3, 'CreateRoom');
const ROOM_CREATED = setValue(4, 'RoomCreated');
const JOIN_ROOM = setValue(5, 'JoinRoom');
const CONTROLLER_JOINED = setValue(6, 'ControllerJoined');
const ROOM_NOT_FOUND = setValue(7, 'RoomNotFound');
const RELAY = setValue(22, 'Relay');

module.exports = {
  REGISTER_SYNTHLE,
  REGISTER_CONTROLLER,
  REGISTERED,
  CREATE_ROOM,
  ROOM_CREATED,
  JOIN_ROOM,
  CONTROLLER_JOINED,
  ROOM_NOT_FOUND,
  RELAY
}
