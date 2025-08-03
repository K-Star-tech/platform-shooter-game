// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`18001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400020200000000000000000000000000000000000000000202030302020200000000000000000000000000000202020303030303030302020202000000000000020202020303030303030303030303030303020202020202030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303010103030303030303030303030303030303030303030101000001010103030303030303030303030303030101010000000000000001010101030303030303010101010000000000000000000000000000010101010101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
........................
........................
........................
........................
22....................22
22222..............22222
222222222......222222222
222222222222222222222222
222222222222222222222222
222222222222222222222222
222222222222222222222222
..22222222222222222222..
.....22222222222222.....
.........222222.........
........................
........................
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "Ground":
            case "tile1":return tile1;
            case "Ground green":
            case "tile2":return tile2;
            case "myTile":
            case "tile3":return tile3;
            case "myTile0":
            case "tile4":return tile4;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
