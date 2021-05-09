status_1 = "";
status_2 = "";
song_1 = "";
song_2 = "";
left_Wrist_x = 0;
left_Wrist_y = 0;
right_Wrist_x = 0;
right_Wrist_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;

function preload(){
song_1 = loadSound("Billy Goat Stomp - Joel Cummins.mp3");
song_2 = loadSound("Falliing in Slow Motion - RKVC.mp3");
}

function setup(){
canvas = createCanvas(500, 500);
canvas.centre();
Video = createCapture(VIDEO);
Video.hide();

poseNet = ml5.poseNet(Video, model_loaded);
poseNet.on("pose", gopose);
}

function model_loaded(){
console.log("Model Loaded!");
}

function draw(){
image(Video, 0, 0, 500, 500);

status_1 = song_1.isPlaying();
status_2 = song_2.isPlaying();

fill("#00ffff");
stroke("#00ffff");
if(score_leftWrist > 0.2){
circle(left_Wrist_x, left_Wrist_y, 20);
song_2.stop();
if(status_1 == "false"){
song_1.play();
document.getElementById("song").innerHTML = "Playing -  Billy Goat Stomp";
}
}
if(score_rightWrist > 0.2){
circle(right_Wrist_x, right_Wrist_y, 20);
song1.stop();
if(status_2 == "false"){
song_2.play();
document.getElementById("song").innerHTML = "Playing -  Falling in Slow Motion";
}
}
}

function gopose(results){
if(results.length > 0){
console.log(results);
left_Wrist_x = results[0].pose.leftWrist.x;
left_Wrist_y = results[0].pose.leftWrist.y;
right_Wrist_x = results[0].pose.rightWrist.x;
right_Wrist_y = results[0].pose.rightWrist.y;

score_leftWrist = results[0].pose.keypoints[9].score;
score_rightWrist = results[0].pose.keypoints[10].score;
}
}

function play(){
song.play();
song.rate(1);
song.volume(1)
}