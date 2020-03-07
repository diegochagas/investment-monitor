import {InstanceStatus} from "../instance/Instance";

export interface IKafkastatusContent {
    status: InstanceStatus
    reason: string
}
