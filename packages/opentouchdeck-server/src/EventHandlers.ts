import { EventEmitter } from 'events';

export default class EventHandlers {
    static triggers: EventEmitter = new EventEmitter();
}