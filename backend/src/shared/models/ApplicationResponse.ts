/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/

export class ApplicationResponse<T> {

    constructor(public statusCode: number, public data?: T, public message?: string, public internalCode?: string) {

    }
}
