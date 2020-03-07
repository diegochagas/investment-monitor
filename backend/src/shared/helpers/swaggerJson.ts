/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/

export interface SwaggerJson {
    info:                Info;
    host:                string;
    basePath:            string;
    produces:            string[];
    schemes:             string[];
    securityDefinitions: SecurityDefinitions;
    swagger:             string;
    paths:               Paths;
    definitions:         Definitions;
    responses:           Parameters;
    parameters:          Parameters;
    tags:                Tag[];
}

export interface Definitions {
    Route:       Route;
    Exchange:    Exchange;
    Instance:    Instance;
    Application: Application;
    Page:        Page;
    Profile:     Profile;
    Topic:       Topic;
}

export interface Application {
    required:   string[];
    properties: ApplicationProperties;
}

export interface ApplicationProperties {
    name:  Name;
    pages: Pages;
}

export interface Name {
    type:        string;
    description: string;
}

export interface Pages {
    type:  string;
    items: Schema;
}

export interface Schema {
    $ref: string;
}

export interface Exchange {
    required:   string[];
    properties: ExchangeProperties;
}

export interface ExchangeProperties {
    name: Icon;
    url:  Icon;
    icon: Icon;
}

export interface Icon {
    type:        Type;
    description: string;
    example:     string;
}

export enum Type {
    APIKey = "apiKey",
    String = "string",
}

export interface Instance {
    required:   string[];
    properties: InstanceProperties;
}

export interface InstanceProperties {
    label:      Icon;
    instanceId: Icon;
    type:       Status;
    status:     Status;
    strategy:   Name;
    reason:     Name;
}

export interface Status {
    type:        Type;
    description: string;
    enum:        string[];
}

export interface Page {
    required:   string[];
    properties: PageProperties;
}

export interface PageProperties {
    path: Icon;
    rule: Status;
}

export interface Profile {
    required:   string[];
    properties: ProfileProperties;
}

export interface ProfileProperties {
    profileName:  Icon;
    applications: Pages;
}

export interface Route {
    required:   null;
    properties: RouteProperties;
}

export interface RouteProperties {
    pageName: Icon;
    path:     Icon;
}

export interface Topic {
    required:   string[];
    properties: TopicProperties;
}

export interface TopicProperties {
    name: Icon;
    type: Status;
}

export interface Info {
    description: string;
    title:       string;
    version:     string;
}

export interface Parameters {
}

export interface Paths {
    "/exchange":             ExchangeClass;
    "/exchange/{id}":        ID;
    "/instance":             InstanceClass;
    "/instance/{id}":        InstanceID;
    "/instance/{id}/action": InstanceIDAction;
    "/instance/refresh":     InstanceRefresh;
    "/profile":              ProfileClass;
    "/profile/{id}":         ProfileID;
    "/route":                RouteClass;
    "/topic":                ExchangeClass;
    "/topic/{id}":           ID;
}

export interface ExchangeClass {
    post: Post;
    get:  Get;
}

export interface Get {
    parameters:  any[];
    description: string;
    tags:        string[];
    responses:   PurpleResponses;
}

export interface PurpleResponses {
    "200": Purple200;
}

export interface Purple200 {
    description: string;
    schema:      Pages;
}

export interface Post {
    parameters:  Jwt[];
    description: string;
    tags:        string[];
    responses:   FluffyResponses;
}

export interface Jwt {
    name:        string;
    in:          In;
    description: null | string;
    required?:   boolean;
    schema?:     Schema;
    type?:       Type;
}

export enum In {
    Body = "body",
    Header = "header",
    Path = "path",
}

export interface FluffyResponses {
    "200": Fluffy200;
}

export interface Fluffy200 {
    description: string;
    schema:      Schema;
}

export interface ID {
    get:    Post;
    put:    Post;
    delete: Delete;
}

export interface Delete {
    parameters:  Jwt[];
    description: string;
    tags:        string[];
    responses:   DeleteResponses;
}

export interface DeleteResponses {
    "200": Tentacled200;
}

export interface Tentacled200 {
    description: string;
}

export interface InstanceClass {
    get:  Post;
    post: Post;
}

export interface InstanceRefresh {
    post: Delete;
    get:  Delete;
}

export interface InstanceID {
    put:    Post;
    delete: Delete;
}

export interface InstanceIDAction {
    put: Delete;
}

export interface ProfileClass {
    post: Post;
    put:  Post;
    get:  Get;
}

export interface ProfileID {
    get: Post;
}

export interface RouteClass {
    get: Get;
}

export interface SecurityDefinitions {
    JWT: Jwt;
}

export interface Tag {
    name:        string;
    description: string;
}