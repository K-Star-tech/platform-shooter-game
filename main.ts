namespace SpriteKind {
    export const Explosion = SpriteKind.create()
    export const Missile = SpriteKind.create()
    export const AmmoRefill = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Avatar.vy == 0) {
        Avatar.vy = -150
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("Launch", 250, function () {
        if (info.score() > 0) {
            Missile = sprites.createProjectileFromSprite(assets.image`Missiles`, Avatar, 1, 0)
            info.changeScoreBy(-1)
            Missile.startEffect(effects.fire)
        } else {
            effects.clearParticles(Missile)
            Avatar.sayText("Gone", 2000, false)
        }
        if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingLeft))) {
            Missile.vx = -30
            Missile.ax = -500
            characterAnimations.loopFrames(
            Missile,
            assets.animation`myAnim0`,
            200,
            characterAnimations.rule(Predicate.FacingLeft)
            )
        } else if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingRight))) {
            Missile.vx = 30
            Missile.ax = 500
            characterAnimations.loopFrames(
            Missile,
            assets.animation`myAnim0`,
            200,
            characterAnimations.rule(Predicate.FacingLeft)
            )
        }
        if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingLeft))) {
            Missile.setPosition(Avatar.x + -6, Avatar.y + 3.5)
        } else if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingRight))) {
            Missile.setPosition(Avatar.x + 6, Avatar.y + 3.5)
        }
        Missile.setFlag(SpriteFlag.DestroyOnWall, true)
        Missile.setFlag(SpriteFlag.AutoDestroy, false)
        Missile.setKind(SpriteKind.Missile)
    })
})
function UpdatePlayerProjectile () {
    if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingLeft))) {
        Bullet.vx = -200
    } else if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingRight))) {
        Bullet.vx = 200
    }
    ChargeTime = game.runtime() - ButtonDownTime
    if (ChargeTime < 700) {
        Bullet.setImage(assets.image`Bullet`)
    } else if (ChargeTime < 1400) {
        Bullet.setImage(assets.image`Bullet0`)
    } else if (ChargeTime < 2100) {
        Bullet.setImage(assets.image`Bullet2`)
    } else if (ChargeTime < 2800) {
        Bullet.setImage(assets.image`Bullet1`)
    } else {
        Bullet.setImage(assets.image`Bullet3`)
    }
    if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingLeft))) {
        Bullet.setPosition(Avatar.x + -7, Avatar.y + 3.5)
    } else if (characterAnimations.matchesRule(Avatar, characterAnimations.rule(Predicate.FacingRight))) {
        Bullet.setPosition(Avatar.x + 7, Avatar.y + 3.5)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(Avatar, characterAnimations.rule(Predicate.FacingLeft))
})
function CreatePlayerProjectile () {
    Bullet = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    Bullet.setFlag(SpriteFlag.AutoDestroy, false)
    Bullet.setFlag(SpriteFlag.DestroyOnWall, true)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    characterAnimations.setCharacterState(Avatar, characterAnimations.rule(Predicate.FacingRight))
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Missile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "LifeEnergy", -10)
    if (sprites.readDataNumber(otherSprite, "LifeEnergy") == 0) {
        sprites.destroy(otherSprite)
    }
    otherSprite.image.replace(2, 3)
    pause(100)
    otherSprite.image.replace(3, 2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.AmmoRefill, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(10)
})
sprites.onDestroyed(SpriteKind.Missile, function (sprite) {
    Explosion = sprites.create(assets.image`Explosion`, SpriteKind.Explosion)
    Explosion.setPosition(sprite.x, sprite.y)
    Explosion.lifespan = 100
})
function CreateEnemy (x: string, y: string) {
    Creature = sprites.create(assets.image`Alien`, SpriteKind.Enemy)
    Creature.follow(Avatar, 75)
    tiles.placeOnRandomTile(Creature, assets.tile`myTile0`)
    Creature.z = 2
    sprites.setDataNumber(Creature, "LifeEnergy", 100)
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    Ammunition = sprites.create(assets.image`Ammo`, SpriteKind.AmmoRefill)
    Ammunition.setPosition(Creature.x, Creature.y)
    Ammunition.follow(Avatar)
})
let Ammunition: Sprite = null
let Creature: Sprite = null
let Explosion: Sprite = null
let ButtonDownTime = 0
let ChargeTime = 0
let Bullet: Sprite = null
let Missile: Sprite = null
let Avatar: Sprite = null
info.setLife(999)
Avatar = sprites.create(assets.image`Hero`, SpriteKind.Player)
controller.moveSprite(Avatar, 100, 0)
info.setScore(30)
Avatar.z = 1
Avatar.ay = 200
scene.cameraFollowSprite(Avatar)
scene.setBackgroundImage(assets.image`Land`)
tiles.setCurrentTilemap(tilemap`level1`)
characterAnimations.loopFrames(
Avatar,
[img`
    ...............222222...........
    .............222222ff...........
    ...........22222222d1fff........
    ..........2222222dd1dddff.......
    ..........222222ddd1ddddf.......
    .........22222ddddd1ddddf.......
    .........2222dddddddddddf.......
    .........2222ddddddddddff.......
    ..........222dddddddddff........
    ..........22ddddddddff..........
    ...........22dddddfff...........
    ............2fffff..............
    ..........66222222..............
    ..........662f22222.............
    ..........666f22f222............
    ..........666f22f222............
    ..........662f22f222............
    ..........662f2ff22.............
    ..........662f777777777.........
    ..........6627777555577.........
    ..........6677777777777.........
    ..........66444444..............
    ...........4444444..............
    ............444444..............
    .............44444..............
    ..............4444..............
    ..............4444..............
    ..............4444..............
    ..............4444..............
    ..............44444.............
    ..............444444............
    .............4444444............
    `],
500,
characterAnimations.rule(Predicate.FacingRight)
)
characterAnimations.loopFrames(
Avatar,
[img`
    ...........222222...............
    ...........ff222222.............
    ........fff1d22222222...........
    .......ffddd1dd2222222..........
    .......fdddd1ddd222222..........
    .......fdddd1ddddd22222.........
    .......fddddddddddd2222.........
    .......ffdddddddddd2222.........
    ........ffddddddddd222..........
    ..........ffdddddddd22..........
    ...........fffddddd22...........
    ..............fffff2............
    ..............22222266..........
    .............22222f266..........
    ............222f22f666..........
    ............222f22f666..........
    ............222f22f266..........
    .............22ff2f266..........
    .........7722ffff2f266..........
    .........772222222f266..........
    .........7722222fff266..........
    ..............44444466..........
    ..............4444444...........
    ..............444444............
    ..............44444.............
    ..............4444..............
    ..............4444..............
    ..............4444..............
    ..............4444..............
    .............44444..............
    ............444444..............
    ............4444444.............
    `],
500,
characterAnimations.rule(Predicate.FacingLeft)
)
CreateEnemy("abc", "abc")
game.onUpdate(function () {
    if (controller.B.isPressed()) {
        if (ButtonDownTime == 0) {
            ButtonDownTime = game.runtime()
            CreatePlayerProjectile()
        }
        UpdatePlayerProjectile()
    } else if (ButtonDownTime != 0) {
        ButtonDownTime = 0
    } else {
        ButtonDownTime = 0
    }
})
