import { GroupEvent } from './Event'
import { Message } from './Message'

export class Group {
    groupID: string;
    groupName: string;
    members: string[];
    messages: Message[];
    events: GroupEvent[];
}