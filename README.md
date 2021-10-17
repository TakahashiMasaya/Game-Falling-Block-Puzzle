# Game-Falling-Block-Puzzle
Game Falling Block Puzzle is Like Tet.....  
(See below image is now progressing.)   
![](https://user-images.githubusercontent.com/12569855/135569538-14fbb34c-9dd7-489d-8363-f16c45e6799e.png)

## How to play
![](https://user-images.githubusercontent.com/12569855/135570249-9afaf9bc-234e-48ea-9f0b-ced8b4f790cf.png)

See below details pressing keys.

|key(SP)|key(PC)|detail|
----|----|----
|①|arrow up|NONE|
|②|arrow down|droping block|
|③|arrow left|move block left|
|④|arrow right|move block right|
|⑤|z|turn block left|
|⑥|x|turn block right|
|⑦|enter|to play this game|

## UML(class structure)
![](https://user-images.githubusercontent.com/12569855/135568251-cffd7f75-265b-42e9-bf65-1d0a51be554b.png)

## How to use docker

It uses image `Nginx:latest`(At the moment).

### run
```
$ docker-compose up   
```
(mounted `./dist` and `./templates/default.conf.template`)

### custom configure file
```
$ view ./templates/default.conf.template
```

## GitHub Action

When you push any files on `lightsail` branch, run GitHub Action.  
※You mustn't push on `lightsail`.  
