export import Game = require("tixel/game");
export import Scene = require("tixel/scene");
export import Utils = require("tixel/utils");
export import c = require("tixel/components");
export import Components = require("tixel/components");

// these need broken up
import iEntity = require("tixel/entity");

// setting up a nice wrapper
export class Entity extends iEntity.Entity {}
export class Component extends iEntity.Component {}