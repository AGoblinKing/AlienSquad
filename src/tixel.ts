export import Game = require("tixel/game");
export import Scene = require("tixel/scene");
export import Utils = require("tixel/utils");

// these need broken up
import iEntity = require("tixel/entity");
import iTiles = require("tixel/components/tiles");

// setting up a nice wrapper
export class TileMap extends iTiles.TileMap {}
export class Tiles extends iTiles.Tiles {}
export class Entity extends iEntity.Entity {}
export class Component extends iEntity.Component {}