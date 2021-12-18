song = "";
function preload(){
 song=loadSound("music.mp3")
}
var scorerightwrist=0
var scoreleftwrist=0
rightwristx = 0
leftwristx = 0
rightwristy = 0
leftwristy = 0

function setup(){
    canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video,modelloaded)
    posenet.on('pose',gotposes)
}

function modelloaded(){
    console.log("posenet is inishiliased")
}

function gotposes(results){
if (results.length>0) {
scorerightwrist = results[0].pose.keypoints[10].score
scoreleftwrist = results[0].pose.keypoints[9].score
rightwristx = results[0].pose.rightWrist.x 
rightwristy = results[0].pose.rightWrist.y
leftwristx = results[0].pose.leftWrist.x
leftwristy = results[0].pose.leftWrist.y
}
}

function draw(){
    image(video,0,0,600,500)
    fill("red")
    stroke("red")
    if (scorerightwrist>0.2) {
        circle(rightwristx,rightwristy,20)
        if (rightwristy>0 && rightwristy<100) {
            document.getElementById("speed").innerHTML = "speed=0.5x"
            song.rate(0.5)
        }
        if (rightwristy>100 && rightwristy<200) {
            document.getElementById("speed").innerHTML = "speed=1x"
            song.rate(1)
        }
        if (rightwristy>200 && rightwristy<300) {
            document.getElementById("speed").innerHTML = "speed=1.5x"
            song.rate(1.5)
        }
        if (rightwristy>300 && rightwristy<400) {
            document.getElementById("speed").innerHTML = "speed=2x"
            song.rate(2)
        }
        if (rightwristy>400) {
            document.getElementById("speed").innerHTML = "speed=2.5x"
            song.rate(2.5)
        }
    }
    if (scoreleftwrist>0.2) {
        circle(leftwristx,leftwristy,20)
        Num=Number(leftwristy)
        new_y=floor(Num*2)
        left=new_y/1000
        document.getElementById("volume").innerHTML="volume="+left
        song.setVolume(left)
    }
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}

