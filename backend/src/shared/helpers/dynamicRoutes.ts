/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/

import {SwaggerJson} from './swaggerJson';

export class DynamicRoutes {

    private static jsonRoutes: SwaggerJson[] = [];


    public static addConfig(config: SwaggerJson): void {
        this.jsonRoutes.push(config);
    }

    public static getApplications(): {
        name: string,
        pages: {
            path: string,
            description: string
        }[]
    }[] {
        return this.jsonRoutes.map( config => ({
            name: config.basePath.substr(1),
            pages: config.tags.map( tag => ({
                path: '/'+tag.name,
                description: tag.description
            }))
        }));
    }
}

