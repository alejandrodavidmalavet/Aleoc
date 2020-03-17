class ChessPiece {
    image;
    points;
    hasMoved = false;
    constructor(file, rank, team, index) {
        this.file = file;
        this.rank = rank;
        this.team = team;
        this.index = index;
    }
    canMove(loc,a){
        return false
    }
    executeMove(loc,i){
        var start = document.getElementById(this.file + this.rank)
        var end = document.getElementById(loc)
        kill(end.getAttribute("index"),ChessPieces,end.getAttribute("num"),Locations)
        start.innerHTML = null
        start.removeAttribute("index")
        start.removeAttribute("style")
        end.innerHTML = this.image
        end.setAttribute("index",i)
        ChessPieces[i].file = loc[0]
        ChessPieces[i].rank = loc[1]
        ChessPieces[i].hasMoved = true
        Locations[start.getAttribute("num")] = 0
        Locations[end.getAttribute("num")] = 1
        colorUpdate(end)
        turnSwitch()

    }
    inCheck(loc,i){
        var start = document.getElementById(this.file + this.rank)
        var end = document.getElementById(loc)
        var start_piece = ChessPieces[start.getAttribute("index")]
        var end_piece = null
        if (end.getAttribute("index") != null){
            end_piece = ChessPieces[end.getAttribute("index")]
            ChessPieces[end.getAttribute("index")] = null
        }
        var f = start_piece.file
        var r = start_piece.rank
        var output = false
        ChessPieces[i].file = loc[0]
        ChessPieces[i].rank = loc[1]
        Locations[start.getAttribute("num")] = 0
        Locations[end.getAttribute("num")] = 1
        if (turn == 'w' && whiteCheck(false)){
            output = true
        }
        else if(turn == 'b' && blackCheck(false)){
            output = true
        }
        ChessPieces[i].file = f
        ChessPieces[i].rank = r
        if (end_piece != null) ChessPieces[end.getAttribute("index")] = end_piece
        Locations[start.getAttribute("num")] = 1
        Locations[end.getAttribute("num")] = 0
        return output
    }
}
class King extends ChessPiece {
    image = '<i class="fas fa-chess-king"></i>'
    points = Infinity
    constructor(file, rank, team, index) {
        super(file,rank,team,index);
    }
    canMove(loc,a){
        var f1 = loc.charCodeAt(0)
        var f0 = this.file.charCodeAt(0)
        var r1 = loc.charCodeAt(1)
        var r0 = this.rank.charCodeAt(0)
        var y = 0
        var x = 0
        if (f1 > f0 && r1 > r0) {x = 1; y = 1;}
        else if (f1 > f0 && r1 < r0) {x = 1; y = -1;}
        else if (f1 < f0 && r1 > r0) {x = -1; y = 1;}
        else if (f1 < f0 && r1 < r0) {x = -1; y = -1;}
        else if (f1 > f0 && r1 == r0) {x = 1}
        else if (f1 == f0 && r1 > r0) {y = 1}
        else if (f1 < f0 && r1 == r0) {x = -1}
        else if (f1 == f0 && r1 < r0) {y = -1}
        else return false
        if ((f0 + x) == f1 && (r0 + y) == r1){
            return true;
        }
        return false
    }
}
class Queen extends ChessPiece {
    image = '<i class="fas fa-chess-queen"></i>'
    points = 9
    constructor(file, rank, team, index) {
        super(file,rank,team,index);
    }
    canMove(loc,a){
        var f1 = loc.charCodeAt(0)
        var f0 = this.file.charCodeAt(0)
        var r1 = loc.charCodeAt(1)
        var r0 = this.rank.charCodeAt(0)
        var y = 0
        var x = 0
        if (f1 > f0 && r1 > r0) {x = 1; y = 1;}
        else if (f1 > f0 && r1 < r0) {x = 1; y = -1;}
        else if (f1 < f0 && r1 > r0) {x = -1; y = 1;}
        else if (f1 < f0 && r1 < r0) {x = -1; y = -1;}
        else if (f1 > f0 && r1 == r0) {x = 1}
        else if (f1 == f0 && r1 > r0) {y = 1}
        else if (f1 < f0 && r1 == r0) {x = -1}
        else if (f1 == f0 && r1 < r0) {y = -1}
        else return false
        for (let i = 1; i < 8; i++){
            if ((f0 + x*i) == f1 && (r0 + y*i) == r1){
                return true;
            }
            else if (isOccupied(f0+x*i,r0+y*i,a)){
                return false;
            }
        }
        return false;
    }
}
class Rook extends ChessPiece {
    image = '<i class="fas fa-chess-rook"></i>';
    points = 5
    constructor(file, rank, team, index) {
        super(file,rank,team,index);
    }
    canMove(loc,a){
        var f1 = loc.charCodeAt(0)
        var f0 = this.file.charCodeAt(0)
        var r1 = loc.charCodeAt(1)
        var r0 = this.rank.charCodeAt(0)
        var y = 0
        var x = 0
        if (f1 > f0 && r1 == r0) {x = 1}
        else if (f1 == f0 && r1 > r0) {y = 1}
        else if (f1 < f0 && r1 == r0) {x = -1}
        else if (f1 == f0 && r1 < r0) {y = -1}
        else return false
        for (let i = 1; i < 8; i++){
            if ((f0 + x*i) == f1 && (r0 + y*i) == r1){
                return true;
            }
            else if (isOccupied(f0+x*i,r0+y*i,a)){
                return false;
            }
        }
        return false;
    }
}
class Bishop extends ChessPiece {
    image = '<i class="fas fa-chess-bishop"></i>'
    points = 3
    constructor(file, rank, team, index) {
        super(file,rank,team,index);
    }
    canMove(loc,a){
        var f1 = loc.charCodeAt(0)
        var f0 = this.file.charCodeAt(0)
        var r1 = loc.charCodeAt(1)
        var r0 = this.rank.charCodeAt(0)
        var y
        var x
        if (f1 > f0 && r1 > r0) {x = 1; y = 1;}
        else if (f1 > f0 && r1 < r0) {x = 1; y = -1;}
        else if (f1 < f0 && r1 > r0) {x = -1; y = 1;}
        else if (f1 < f0 && r1 < r0) {x = -1; y = -1;}
        else return false
        for (let i = 1; i < 8; i++){
            if ((f0 + x*i) == f1 && (r0 + y*i) == r1){
                return true;
            }
            else if (isOccupied(f0+x*i,r0+y*i,a)){
                return false;
            }
        }
        return false;
    }
}
class Knight extends ChessPiece {
    image = '<i class="fas fa-chess-knight"></i>'
    points = 3
    constructor(file, rank, team, index) {
        super(file,rank,team,index);
    }
    canMove(loc,a){
        var f1 = loc.charCodeAt(0)
        var f0 = this.file.charCodeAt(0)
        var r1 = loc.charCodeAt(1)
        var r0 = this.rank.charCodeAt(0)
        if (((f0 + 2 == f1 || f0 - 2 == f1) 
        && (r0 + 1 == r1 || r0 - 1 == r1)) 
        || ((f0+ 1 == f1 || f0 - 1 == f1) 
        && (r0 + 2 == r1 || r0 - 2 == r1))){
            return true
        }
        return false
    }
}
class Pawn extends ChessPiece {
    image = '<i class="fas fa-chess-pawn"></i>'
    points = 1
    constructor(file, rank, team, index) {
        super(file,rank,team,index);
    }
    canMove(loc,a){
        var f1 = loc.charCodeAt(0)
        var f0 = this.file.charCodeAt(0)
        var r1 = loc.charCodeAt(1)
        var r0 = this.rank.charCodeAt(0)
        var t = this.team
        if(t == 'w' && r0 + 1 == r1 && f0 == f1 && !isOccupied(f1,r1,a)) return true;
        else if (t == 'b' && r0 - 1 == r1 && f0 == f1 && !isOccupied(f1,r1,a)) return true;
        else if (t == 'w' && (f0 + 1 == f1 || f0 - 1 == f1) && r0 + 1 == r1 && isOccupied(f1,r1,a)) return true;
        else if (t == 'b' && (f0 + 1 == f1 || f0 - 1 == f1) && r0 - 1 == r1 && isOccupied(f1,r1,a)) return true;
        else if (!this.hasMoved && t == 'w' && r0 + 2 == r1 && f0 == f1 && !isOccupied(f1,r1,a)) return true;
        else if (!this.hasMoved && t == 'b' && r0 - 2 == r1 && f0 == f1 && !isOccupied(f1,r1,a)) return true;
        return false;
    }
}

let BR1 = new Rook('a','8','b',0);
let BK1 = new Knight('b','8','b',1);
let BB1 = new Bishop('c','8','b',2);
let BQ = new Queen('d','8','b',3);
let BK = new King('e','8','b',4);
let BB2 = new Bishop('f','8','b',5);
let BK2 = new Knight('g','8','b',6);
let BR2 = new Rook('h','8','b',7);
let BP1 = new Pawn('a','7','b',8);
let BP2 = new Pawn('b','7','b',9);
let BP3 = new Pawn('c','7','b',10);
let BP4 = new Pawn('d','7','b',11);
let BP5 = new Pawn('e','7','b',12);
let BP6 = new Pawn('f','7','b',13);
let BP7 = new Pawn('g','7','b',14);
let BP8 = new Pawn('h','7','b',15);
let WP1 = new Pawn('a','2','w',16);
let WP2 = new Pawn('b','2','w',17);
let WP3 = new Pawn('c','2','w',18);
let WP4 = new Pawn('d','2','w',19);
let WP5 = new Pawn('e','2','w',20);
let WP6 = new Pawn('f','2','w',21);
let WP7 = new Pawn('g','2','w',22);
let WP8 = new Pawn('h','2','w',23);
let WR1 = new Rook('a','1','w',24);
let WK1 = new Knight('b','1','w',25);
let WB1 = new Bishop('c','1','w',26);
let WQ = new Queen('d','1','w',27);
let WK = new King('e','1','w',28);
let WB2 = new Bishop('f','1','w',29);
let WK2 = new Knight('g','1','w',30);
let WR2 = new Rook('h','1','w',31);

var ChessPieces = [BR1,BK1,BB1,BQ,BK,BB2,BK2,BR2,BP1,BP2,BP3,BP4,BP5,BP6,BP7,BP8,WP1,WP2,WP3,WP4,WP5,WP6,WP7,WP8,WR1,WK1,WB1,WQ,WK,WB2,WK2,WR2] // FIX THIS To BE ALL WHITE THENALL BLACK
var Locations = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
let selected = null;
let selected_index = null;
let white_score = 0
let black_score = 0
let white_check_alert = false
let black_check_alert = false
let turn = 'w';

debug()
function main(x){
    if (selected != null){
        let Piece = ChessPieces[selected_index]
        let End = ChessPieces[document.getElementById(x).getAttribute("index")]
        if (attackingOwnPieces(End) || !Piece.canMove(x,Locations)){
            terminate()
            return
        }
        if (Piece.inCheck(x,selected_index)){
            terminate()
            return
        }
        Piece.executeMove(x,selected_index)
        if(mate()) console.log("Game has ended in a Mate!")
        whiteCheck(true)
        blackCheck(true)
        checkAlert()
        terminate()
        debug()
        return
    }
    else{
        selected = document.getElementById(x)
        selected_index = selected.getAttribute("index")
        if(emptySpace(selected_index) || wrongTeam(ChessPieces,selected_index)){
            terminate()
            return
        }
        selected.style.backgroundColor = "rgb(204, 96, 19)"
    }
}
function turnSwitch(){
    if(turn == 'w') turn = 'b'
    else turn = 'w'
}
function terminate(){
    selected.style.removeProperty("background-color")
    checkAlert()
    selected = null
    selected_index = null
}
function wrongTeam(p,i){
    if (p[i].team != turn){
            return true
        }
}
function emptySpace(i){
    if (i == null){
        return true
    }
}
function attackingOwnPieces(e){
    if (e != null && e.team == turn) return true
    return false
}
function isOccupied(f,r,l){
    let loc = String.fromCharCode(f) + String.fromCharCode(r)
    let n = document.getElementById(loc)
    if (n == null) return
    else n = n.getAttribute("num")
    if (l[n] == 1){
        return true
    }
    return false
}
function colorUpdate(x){
    if (turn == 'w'){
        x.style.color = "rgb(255, 235, 211)";
    }
    else {
        x.style.color = "rgb(41, 19, 7)";
    }
}
function updateScore(i){
    if (turn == 'w'){
        document.getElementById("white-pieces").innerHTML += ChessPieces[i].image
    }
    else document.getElementById("black-pieces").innerHTML += ChessPieces[i].image
    if (turn == 'w'){
        white_score += ChessPieces[i].points
    }
    else {
        black_score += ChessPieces[i].points
    }
    document.getElementById("white-score").innerHTML = white_score
    document.getElementById("black-score").innerHTML = black_score
}
function kill(i,p,j,l){
    if (i != null){
        updateScore(i)
        p[i] = null
        l[j] = 0
    }
}
function whiteCheck(toggle){
    let loc = ChessPieces[28].file + ChessPieces[28].rank
    for (let i = 0; i < 16; i++){
        if (ChessPieces[i] != null){
            if (ChessPieces[i].canMove(loc,Locations)){
                if (toggle) white_check_alert = true
                return true
            }
        }
    }
    white_check_alert = false
    return false
}
function blackCheck(toggle){
    if(ChessPieces[4] == null) return true
    let loc = ChessPieces[4].file + ChessPieces[4].rank
    for (let i = 16; i < 32; i++){
        if (ChessPieces[i] != null){
            if (ChessPieces[i].canMove(loc,Locations)){
                if (toggle) black_check_alert = true
                return true
            }
        }
    }
    black_check_alert = false
    return false
}
function checkAlert(){
    if (white_check_alert) document.getElementById(ChessPieces[28].file + ChessPieces[28].rank).style.backgroundColor = "red"
    else document.getElementById(ChessPieces[28].file + ChessPieces[28].rank).style.removeProperty("background-color")
    if (black_check_alert) document.getElementById(ChessPieces[4].file + ChessPieces[4].rank).style.backgroundColor = "red"
    else document.getElementById(ChessPieces[4].file + ChessPieces[4].rank).style.removeProperty("background-color")
}
function mate(){
    if (turn == 'b'){
        for(let i = 0; i < 16; i++){
            for(let j = 97; j <105;j++){
                for(let k = 49; k < 57;k++){
                    let loc = String.fromCharCode(j) + String.fromCharCode(k)
                    let piece = ChessPieces[i]
                    if (piece == null) continue
                    if(document.getElementById(loc).getAttribute("index")!= null && ChessPieces[document.getElementById(loc).getAttribute("index")].team == 'b') continue
                    if(piece.canMove(loc,Locations)){
                        if(piece.inCheck(loc,i)){
                            continue
                        }
                        return false;
                    }
                }
            }
        }
    }
    if (turn == 'w'){
        for(let i = 16; i < 32; i++){
            for(let j = 97; j <105;j++){
                for(let k = 49; k < 57;k++){
                    let loc = String.fromCharCode(j) + String.fromCharCode(k)
                    let piece = ChessPieces[i]
                    if (piece == null) continue
                    if(document.getElementById(loc).getAttribute("index")!= null && ChessPieces[document.getElementById(loc).getAttribute("index")].team == 'w') continue
                    if(piece.canMove(loc,Locations)){
                        if(piece.inCheck(loc,i)){
                            continue
                        }
                        return false;
                    }
                }
            }
        }
    }
    return true
}
function debug(){
    if (turn == 'w') console.log("White's Turn")
    if (turn == 'b') console.log("Black's Turn")
    console.log(ChessPieces)
    console.log(Locations)
}