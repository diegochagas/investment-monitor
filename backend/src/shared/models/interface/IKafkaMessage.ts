/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */


export interface IKafkaMessage {
    type: string
    action: string
    instance: string
    strategy?: IKafkaStatusStrategy
    timestamp?: number;
    content: any
}

export interface IKafkaStatusStrategy {
    name: string
    version: string
}
