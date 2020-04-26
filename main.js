class ChessPiece {
    hasMoved = false
    constructor(location, team) {
        this.location = location
        this.team = team
    }
    executeMove(loc){
        enPassantTrigger(loc)
        gameRecord(this.location,loc)
        moveUpdate(loc,start_piece,this.location,null)
        initializeEnPassant()
        turnSwitch()
        terminate()
        this.hasMoved = true
    }
    inCheck(loc){
        let output; let start_loc = this.location
        let start = ChessBoard[start_loc]; let end = ChessBoard[loc]
        moveUpdate(loc,start,start_loc,null)
        output = checkTest(this.team)
        moveUpdate(start_loc,start,loc,end)
        return output
    }
    getCastle(){}
}
class K extends ChessPiece {
    constructor(location,team) {
        super(location,team)
    }
    canMove(loc){ 
        if (attackingOwnPiece(this.team,ChessBoard[loc])) return false
        let f0 = this.location.charCodeAt(0);   let f1 = loc.charCodeAt(0)
        let r0 = this.location.charCodeAt(1);   let r1 = loc.charCodeAt(1)
        if (f0 + 1 == f1 && r0 + 1 == r1) return true
        if (f0 + 1 == f1 && r0 - 1 == r1) return true
        if (f0 - 1 == f1 && r0 + 1 == r1) return true
        if (f0 - 1 == f1 && r0 - 1 == r1) return true
        if (f0 + 1 == f1 && r0 == r1) return true
        if (f0 - 1 == f1 && r0 == r1) return true
        if (r0 + 1 == r1 && f0 == f1) return true
        if (r0 - 1 == r1 && f0 == f1) return true
        if (f0 + 2 == f1 && r0 == r1 && this.team == w && !this.hasMoved && weakWhite()) return white_weak_castle = true
        if (f0 + 2 == f1 && r0 == r1 && this.team == b && !this.hasMoved && weakBlack()) return black_weak_castle = true
        if (f0 - 2 == f1 && r0 == r1 && this.team == w && !this.hasMoved && strongWhite()) return white_strong_castle = true
        if (f0 - 2 == f1 && r0 == r1 && this.team == b && !this.hasMoved && strongBlack()) return black_strong_castle = true
        return false
    }
    getCastle(loc){
        if (attackingOwnPiece(this.team,ChessBoard[loc])) return false
        let f0 = this.location.charCodeAt(0);   let f1 = loc.charCodeAt(0)
        let r0 = this.location.charCodeAt(1);   let r1 = loc.charCodeAt(1)
        if (f0 + 2 == f1 && r0 == r1 && this.team == w && !this.hasMoved && weakWhite()) return white_weak_castle = true
        if (f0 + 2 == f1 && r0 == r1 && this.team == b && !this.hasMoved && weakBlack()) return black_weak_castle = true
        if (f0 - 2 == f1 && r0 == r1 && this.team == w && !this.hasMoved && strongWhite()) return white_strong_castle = true
        if (f0 - 2 == f1 && r0 == r1 && this.team == b && !this.hasMoved && strongBlack()) return black_strong_castle = true
    }
    getImage(){
        if(this.team == w) return wK
        else return bK
    }
    getType(){
        return king
    }
    getValue(){
        return 0 
    }
}
class Q extends ChessPiece {
    constructor(location,team) {
        super(location,team)
    }
    canMove(loc){
        if (attackingOwnPiece(this.team,ChessBoard[loc])) return false
        let f0 = this.location.charCodeAt(0);   let f1 = loc.charCodeAt(0)
        let r0 = this.location.charCodeAt(1);   let r1 = loc.charCodeAt(1)
        let y = 0; let x = 0
        if(f1 > f0) x = 1
        else if(f1 < f0) x = -1
        if(r1 > r0) y = 1
        else if(r1 < r0) y = -1
        for (let i = 1; i < 8; i++)
            if ((f0 + x*i) == f1 && (r0 + y*i) == r1) return true
            else if (isOccupied(f0+x*i,r0+y*i)) return false
        return false
    }
    getImage(){
        if(this.team == w) return wQ
        else return bQ
    }
    getType(){
        return queen
    }
    getValue(){
        return 900
    }
}
class R extends ChessPiece {
    constructor(location,team) {
        super(location,team)
    }
    canMove(loc){
        if (attackingOwnPiece(this.team,ChessBoard[loc])) return false
        let f0 = this.location.charCodeAt(0);   let f1 = loc.charCodeAt(0)
        let r0 = this.location.charCodeAt(1);   let r1 = loc.charCodeAt(1)
        let y = 0; let x = 0
        if(f1 > f0) x = 1
        else if(f1 < f0) x = -1
        if(r1 > r0) y = 1
        else if(r1 < r0) y = -1
        if(x != 0 && y != 0) return false
        for (let i = 1; i < 8; i++)
            if ((f0 + x*i) == f1 && (r0 + y*i) == r1) return true
            else if (isOccupied(f0+x*i,r0+y*i)) return false;
        return false;
    }
    getImage(){
        if(this.team == w) return wR
        else return bR
    }
    getType(){
        return rook
    }
    getValue(){
        return 5
    }
}
class B extends ChessPiece {
    constructor(location,team) {
        super(location,team)
    }
    canMove(loc){
        if (attackingOwnPiece(this.team,ChessBoard[loc])) return false
        let f0 = this.location.charCodeAt(0);   let f1 = loc.charCodeAt(0)
        let r0 = this.location.charCodeAt(1);   let r1 = loc.charCodeAt(1)
        let y = 0; let x = 0
        if(f1 > f0) x = 1
        else if(f1 < f0) x = -1
        if(r1 > r0) y = 1
        else if(r1 < r0) y = -1
        if(x == 0 || y == 0) return false
        for (let i = 1; i < 8; i++)
            if ((f0 + x*i) == f1 && (r0 + y*i) == r1) return true
            else if (isOccupied(f0+x*i,r0+y*i)) return false;
        return false;
    }
    getImage(){
        if(this.team == w) return wB
        else return bB
    }
    getType(){
        return bishop
    }
    getValue(){
        return 3
    }
}
class N extends ChessPiece {
    constructor(location,team) {
        super(location,team)
    }
    canMove(loc){
        if (attackingOwnPiece(this.team,ChessBoard[loc])) return false
        let f0 = this.location.charCodeAt(0);   let f1 = loc.charCodeAt(0)
        let r0 = this.location.charCodeAt(1);   let r1 = loc.charCodeAt(1)
        if (((f0 + 2 == f1 || f0 - 2 == f1) && (r0 + 1 == r1 || r0 - 1 == r1)) ||
        ((f0+ 1 == f1 || f0 - 1 == f1) && (r0 + 2 == r1 || r0 - 2 == r1))) return true
        return false
    }
    getImage(){
        if(this.team == w) return wN
        else return bN
    }
    getType(){
        return knight
    }
    getValue(){
        return 3
    }
}
class P extends ChessPiece {
    constructor(location,team) {
        super(location,team)
    }
    canMove(loc){
        if (attackingOwnPiece(this.team,ChessBoard[loc])) return false
        let f0 = this.location.charCodeAt(0);   let f1 = loc.charCodeAt(0)
        let r0 = this.location.charCodeAt(1);   let r1 = loc.charCodeAt(1)
        let occupied = isOccupied(f1,r1)
        if(this.team == w){
            if(r0 + 1 == r1 && f0 == f1 && !occupied) return true
            else if((f0 + 1 == f1 || f0 - 1 == f1) && r0 + 1 == r1 && (occupied || loc == en_passant_square)) return true
            else if(!this.hasMoved && r0 + 2 == r1 && f0 == f1 && !occupied && !isOccupied(f1,r1-1)) return true
        }
        else{
            if (r0 - 1 == r1 && f0 == f1 && !occupied) return true
            else if ((f0 + 1 == f1 || f0 - 1 == f1) && r0 - 1 == r1 && (occupied || loc == en_passant_square)) return true
            else if (!this.hasMoved && r0 - 2 == r1 && f0 == f1 && !occupied && !isOccupied(f1,r1+1)) return true
        }
        return false
    }
    getImage(){
        if(this.team == w) return wP
        else return bP
    }
    getType(){
        return pawn
    }
    getValue(){
        return 1
    }
}

let chessboard_container = document.getElementsByClassName('squares')[0]
let overlay = document.getElementById('overlay')
let move_tracker = document.getElementById("move-tracker")
let white_profile_pic = document.getElementById("white-profile")
let black_profile_pic = document.getElementById("black-profile")
let pop_up = document.getElementById('pop-up-window')
let engine_settings = pop_up.innerHTML
let pawn_promotion_prompt = '<div id="pawn-promotion"> <button id="q"onclick="pawnUpdate()"><i class="fas fa-chess-queen"></i></button> <button id="r"onclick="pawnUpdate(\'r\')"><i class="fas fa-chess-rook"></i></button> <button id="b"onclick="pawnUpdate(\'b\')"><i class="fas fa-chess-bishop"></i></button> <button id="n"onclick="pawnUpdate(\'n\')"><i class="fas fa-chess-knight"></i></button> </div>'

let pawn = ''
let knight = 'N'
let bishop = 'B'
let rook = 'R'
let queen = 'Q'
let king = 'K'

let wK = '<img src="images/wK.png">'
let bK = '<img src="images/bK.png">'
let wQ = '<img src="images/wQ.png">'
let bQ = '<img src="images/bQ.png">'
let wR = '<img src="images/wR.png">'
let bR = '<img src="images/bR.png">'
let wN = '<img src="images/wN.png">'
let bN = '<img src="images/bN.png">'
let wB = '<img src="images/wB.png">'
let bB = '<img src="images/bB.png">'
let wP = '<img src="images/wP.png">'
let bP = '<img src="images/bP.png">'

let hover_color = "rgba(255, 255, 120, 0.65)"
let selected_color = "rgba(220, 220, 0, 0.65)"
let black_overlay = "rgba(128, 128, 128, 0.65)"
let white_overlay = "rgba(169, 169, 169, 0.65)"

let start_piece = null
let end_piece = null

let w = true
let b = false

let turn = w
let board_orientation = w

let castle = false
let white_weak_castle = false
let black_weak_castle = false
let white_strong_castle = false
let black_strong_castle = false

let white_king_location = 'e1'
let black_king_location = 'e8'

let newPiece = null

let en_passant = false
let en_passant_square = null
let en_passant_piece = null

let game_record = []
let moved_pieces = []
let killed_pieces = []
let en_passant_record = []
let pawn_promotion_record = []
let castle_record = []

let engine = false
let engine_depth = 3
let engine_team = null

let game_flag = false

let move_notation = ''
let chess_notation_record = []
let attacked_piece = ''

let redo_flag = false
let redo_record = []

let Locations = [   'a8','b8','c8','d8','e8','f8','g8','h8',
                    'a7','b7','c7','d7','e7','f7','g7','h7',
                    'a6','b6','c6','d6','e6','f6','g6','h6',
                    'a5','b5','c5','d5','e5','f5','g5','h5',
                    'a4','b4','c4','d4','e4','f4','g4','h4',
                    'a3','b3','c3','d3','e3','f3','g3','h3',
                    'a2','b2','c2','d2','e2','f2','g2','h2',
                    'a1','b1','c1','d1','e1','f1','g1','h1']

let ChessBoard = {  'a8':new R('a8',b),'b8':new N('b8',b),'c8':new B('c8',b),'d8':new Q('d8',b),'e8':new K('e8',b),'f8':new B('f8',b),'g8':new N('g8',b),'h8':new R('h8',b),
                    'a7':new P('a7',b),'b7':new P('b7',b),'c7':new P('c7',b),'d7':new P('d7',b),'e7':new P('e7',b),'f7':new P('f7',b),'g7':new P('g7',b),'h7':new P('h7',b),
                    'a6':null,         'b6':null,         'c6':null,         'd6':null,         'e6':null,         'f6':null,         'g6':null,         'h6':null,
                    'a5':null,         'b5':null,         'c5':null,         'd5':null,         'e5':null,         'f5':null,         'g5':null,         'h5':null,
                    'a4':null,         'b4':null,         'c4':null,         'd4':null,         'e4':null,         'f4':null,         'g4':null,         'h4':null,
                    'a3':null,         'b3':null,         'c3':null,         'd3':null,         'e3':null,         'f3':null,         'g3':null,         'h3':null,    
                    'a2':new P('a2',w),'b2':new P('b2',w),'c2':new P('c2',w),'d2':new P('d2',w),'e2':new P('e2',w),'f2':new P('f2',w),'g2':new P('g2',w),'h2':new P('h2',w),
                    'a1':new R('a1',w),'b1':new N('b1',w),'c1':new B('c1',w),'d1':new Q('d1',w),'e1':new K('e1',w),'f1':new B('f1',w),'g1':new N('g1',w),'h1':new R('h1',w) }

function main(loc){
    if(endMarker()) return
    if (!start_piece) return firstSelection(loc)
    secondSelection(loc)
    hoverUpdate(loc)
}
function firstSelection(loc){
    start_piece = ChessBoard[loc]
    if (!start_piece || start_piece.team != turn) start_piece = null
    else { pawnPromotionPrimer(true); showMove()}
}
function secondSelection(loc){
    end_piece = ChessBoard[loc]
    if (start_piece.inCheck(loc)){ hideMove(); terminate(); return}
    if (!start_piece.canMove(loc)){ hideMove(); terminate(); return}
    recordMove(loc)
}

function recordMove(loc){

    let v = validMoves()

    let ambiguous = ''

    if(start_piece.getType() != pawn){
        for(let i = 0; i < v.length; i++){
            let piece = ChessBoard[v[i][0]]
            if(v[i][1] == loc
            && piece.getType() == start_piece.getType() 
            && piece.team == start_piece.team 
            && piece.location != start_piece.location){
                ambiguous = start_piece.location[0]
                break
            }
        }
    }

    if (end_piece)
        if (start_piece.getType() == pawn) attacked_piece = start_piece.location[0] + "x"
        else attacked_piece = 'x'
    else if(start_piece.getType() == pawn && loc == en_passant_square) attacked_piece = start_piece.location[0] + "x"
    else attacked_piece = ''

    if(start_piece.getType() == king) start_piece.getCastle(loc)

    if(black_strong_castle || white_strong_castle) move_notation = 'O-O-O'
    else if(black_weak_castle || white_weak_castle) move_notation = 'O-O'
    else move_notation += start_piece.getType() + ambiguous + attacked_piece + loc

    pawnPromotion()

    if(pawn_promotion_record[pawn_promotion_record.length-1]) move_notation += "=" + pawn_promotion_record[pawn_promotion_record.length-1].getType()

    start_piece.executeMove(loc)

    v = validMoves()

    if(!safe(black_king_location,b))
        if(v.length == 0) move_notation += '#' // Checkmate
        else move_notation += '+' // Check

    else if(!safe(white_king_location,w))
        if(v.length == 0) move_notation += '#' // Checkmate
        else move_notation += '+' // Check

    else if(v.length == 0) move_notation += '$' // Stalemate

    chess_notation_record.push(move_notation)

    move_notation = ''

    guiUpdate()

    if(turn == engine_team) playEngine(engine_team)

}
function moveUpdate(to,moved_piece,from,null_piece){

    if(moved_piece.getType() == pawn){
        if(to == en_passant_square) ChessBoard[en_passant_piece.location] = null
        else if(from == en_passant_square) ChessBoard[en_passant_piece.location] = en_passant_piece
    }

    else if(moved_piece.getType() == king){
        if(moved_piece.team == b) black_king_location = to
        else white_king_location = to
    }

    if(castle){
        if(white_weak_castle)
            if(ChessBoard['f1'])    {ChessBoard['h1'] = ChessBoard['f1']; ChessBoard['h1'].location = 'h1'; ChessBoard['f1'] = null; castleReset()}
            else                    {ChessBoard['f1'] = ChessBoard['h1']; ChessBoard['f1'].location = 'f1'; ChessBoard['h1'] = null}

        else if(black_weak_castle)
            if(ChessBoard['f8'])    {ChessBoard['h8'] = ChessBoard['f8']; ChessBoard['h8'].location = 'h8'; ChessBoard['f8'] = null; castleReset()}
            else                    {ChessBoard['f8'] = ChessBoard['h8']; ChessBoard['f8'].location = 'f8'; ChessBoard['h8'] = null}

        else if(white_strong_castle)
            if(ChessBoard['d1'])    {ChessBoard['a1'] = ChessBoard['d1']; ChessBoard['a1'].location = 'a1'; ChessBoard['d1'] = null; castleReset()}
            else                    {ChessBoard['d1'] = ChessBoard['a1']; ChessBoard['d1'].location = 'd1'; ChessBoard['a1'] = null}

        else if(black_strong_castle)
            if(ChessBoard['d8'])    {ChessBoard['a8'] = ChessBoard['d8']; ChessBoard['a8'].location = 'a8'; ChessBoard['d8'] = null; castleReset()}
            else                    {ChessBoard['d8'] = ChessBoard['a8']; ChessBoard['d8'].location = 'd8'; ChessBoard['a8'] = null}
    }

    moved_piece.location = to
    ChessBoard[from] = null_piece
    ChessBoard[to] = moved_piece
}
function turnSwitch(){
    if(turn) return turn = false
    return turn = true
}
function terminate(){
    start_piece = null
    end_piece = null
    newPiece = null
    castleReset()
}

function isOccupied(file,rank){
    return ChessBoard[String.fromCharCode(file) + String.fromCharCode(rank)]
}
function attackingOwnPiece(team,piece){
    if (piece && piece.team == team) return true
    return false
}

function pawnPromotionPrimer(){ //COULD USE SOME CLEANING
    if (start_piece.getType() == pawn && start_piece.team == w && start_piece.location[1] == '7') newPiece = new Q()
    else if (start_piece.getType() == pawn && start_piece.team == b && start_piece.location[1] == '2') newPiece = new Q()
}
function pawnUpdate(type){
    if (type == 'r') newPiece = new R()
    else if (type == 'b') newPiece = new B()
    else if (type == 'n') newPiece = new N()
    Close()
}
function pawnPromotion(){
    pawn_promotion_record.push(newPiece)
    if(newPiece){
        newPiece.location = start_piece.location
        newPiece.team = start_piece.team
        start_piece = newPiece
        newPiece = null
    }
}

function safe(loc,team){
    let piece
    if(team == b){
        for(let i = 63; i >= 0; i--){
            piece = ChessBoard[Locations[i]]
            if (piece && piece.team != team && piece.canMove(loc)) return false
        }
    }
    else {
        for(let i = 0; i < 64; i++){
            piece = ChessBoard[Locations[i]]
            if (piece && piece.team != team && piece.canMove(loc)) return false
        }
    }
    return true
}
function checkTest(team){
    if(team == w) return !safe(white_king_location,w)
    else return !safe(black_king_location,b)
}

function castleReset(){
    castle = false
    white_weak_castle = false
    black_weak_castle = false
    white_strong_castle = false
    black_strong_castle = false
}
function weakWhite(){
    if (turn == w
    &&  ChessBoard['h1']
    && !ChessBoard['h1'].hasMoved
    && !ChessBoard['f1']
    && !ChessBoard['g1']
    && safe('e1',w)
    && safe('f1',w)
    && safe('g1',w))
    return castle = true
    return false
}
function strongWhite(){
    if (turn == w
    &&  ChessBoard['a1']
    && !ChessBoard['a1'].hasMoved
    && !ChessBoard['b1']
    && !ChessBoard['c1']
    && !ChessBoard['d1']
    && safe('e1',w)
    && safe('c1',w)
    && safe('d1',w))
    return castle = true
    return false
}
function weakBlack(){
    if (turn == b
    &&  ChessBoard['h8']
    && !ChessBoard['h8'].hasMoved
    && !ChessBoard['f8']
    && !ChessBoard['g8']
    && safe('e8',b)
    && safe('f8',b)
    && safe('g8',b))
    return castle = true
    return false
}
function strongBlack(){
    if (turn == b
    &&  ChessBoard['a8']
    && !ChessBoard['a8'].hasMoved
    && !ChessBoard['b8']
    && !ChessBoard['c8']
    && !ChessBoard['d8']
    && safe('e8',b)
    && safe('c8',b)
    && safe('d8',b))
    return castle = true
    return false
}

function initializeEnPassant(){
    if(start_piece.getType() == pawn && !start_piece.hasMoved){
        if(start_piece.location[1] == '4')      {en_passant_square = start_piece.location[0] + '3'; en_passant_piece = start_piece}
        else if(start_piece.location[1] == '5') {en_passant_square = start_piece.location[0] + '6'; en_passant_piece = start_piece}
    }
    else {en_passant_square = null; en_passant_piece = null}
}
function enPassantTrigger(loc){
    if(loc == en_passant_square && start_piece.getType() == pawn) return en_passant = true
    return en_passant = false
}

function gameRecord(l1,l2){
    if(!redo_flag) redo_record = game_record.concat([[l1,l2]])
    game_record.push([l1,l2])
    killed_pieces.push(end_piece)
    moved_pieces.push([start_piece,start_piece.hasMoved])
    en_passant_record.push([en_passant,en_passant_piece,en_passant_square])
    castle_record.push([castle,white_weak_castle,black_weak_castle,white_strong_castle,black_strong_castle])
}
function getLastMove(){
    if(game_record[0] == undefined) return false
    return [game_record.pop(),
            moved_pieces.pop(),
            killed_pieces.pop(),
            en_passant_record.pop(),
            castle_record.pop(),
            pawn_promotion_record.pop(),
            turnSwitch()]
}
function undo(gui){

    let last_move = getLastMove()

    if (!last_move) return

    if (last_move[5]) last_move[1][0] = new P(last_move[0][0],last_move[6])

    if (last_move[3][0]) ChessBoard[last_move[3][1].location] = last_move[3][1]

    en_passant_piece = last_move[3][1]
    en_passant_square = last_move[3][2]

    last_move[1][0].location = last_move[0][0]
    last_move[1][0].hasMoved = last_move[1][1]

    ChessBoard[last_move[0][0]] = last_move[1][0]
    ChessBoard[last_move[0][1]] = last_move[2]

    if(last_move[4][0])
        if(last_move[4][1]){        ChessBoard['f1'].hasMoved = false; ChessBoard['h1'] = ChessBoard['f1']; ChessBoard['h1'].location = 'h1'; ChessBoard['f1'] = null}
        else if(last_move[4][2]){   ChessBoard['f8'].hasMoved = false; ChessBoard['h8'] = ChessBoard['f8']; ChessBoard['h8'].location = 'h8'; ChessBoard['f8'] = null}
        else if(last_move[4][3]){   ChessBoard['d1'].hasMoved = false; ChessBoard['a1'] = ChessBoard['d1']; ChessBoard['a1'].location = 'a1'; ChessBoard['d1'] = null}
        else if(last_move[4][4]){   ChessBoard['d8'].hasMoved = false; ChessBoard['a8'] = ChessBoard['d8']; ChessBoard['a8'].location = 'a8'; ChessBoard['d8'] = null}

    if(last_move[1][0].getType() == king)
        if(last_move[6] == b) black_king_location = last_move[0][0]
        else white_king_location = last_move[0][0]
    
    guiUpdate(gui)
}
function redo(){
    if(game_record.length == redo_record.length) return
    let move = redo_record[game_record.length]
    redo_flag = true
    main(move[0])
    main(move[1])
    redo_flag = false
}

function validMoves(){
    let capture_kings = [];     let non_capture_kings = []
    let capture_pawns = [];     let non_capture_pawns = []
    let capture_knights = [];   let non_capture_knights = []
    let capture_bishops = [];   let non_capture_bishops = []
    let capture_rooks = [];     let non_capture_rooks = []
    let capture_queens = [];    let non_capture_queens = []
    let piece; let l1; let l2
    for(let i = 0; i < 64; i++){
        l1 = Locations[i]
        piece = ChessBoard[l1]
        if(piece && piece.team == turn)
            for (let j = 0; j < 64; j++){
                l2 = Locations[j]
                if(piece.canMove(l2) && !piece.inCheck(l2)){
                    if(ChessBoard[l2])
                        if(piece.getType() == pawn) capture_pawns.push([l1,l2])
                        else if (piece.getType() == knight) capture_knights.push([l1,l2])
                        else if (piece.getType() == bishop) capture_bishops.push([l1,l2])
                        else if (piece.getType() == rook) capture_rooks.push([l1,l2])
                        else if (piece.getType() == queen) capture_queens.push([l1,l2])
                        else capture_kings.push([l1,l2])
                    else
                        if(piece.getType() == pawn) non_capture_pawns.push([l1,l2])
                        else if (piece.getType() == knight) non_capture_knights.push([l1,l2])
                        else if (piece.getType() == bishop) non_capture_bishops.push([l1,l2])
                        else if (piece.getType() == rook) non_capture_rooks.push([l1,l2])
                        else if (piece.getType() == queen) non_capture_queens.push([l1,l2])
                        else non_capture_kings.push([l1,l2])
                }
            }
    }
    return capture_kings.concat(capture_pawns).concat(capture_knights).concat(capture_bishops).concat(capture_rooks).concat(capture_queens).concat(non_capture_pawns).concat(non_capture_knights).concat(non_capture_bishops).concat(non_capture_rooks).concat(non_capture_queens).concat(non_capture_kings)
}

function playEngine(team){
    let m1 = minimax(null,engine_depth,-Infinity,Infinity,team,true)
    if(m1[1] == null) m1[1] = m1[2]
    if(m1[1] == undefined) return
    console.log(m1,(m1.length-1))
    m1 = m1[Math.floor(Math.random() * (m1.length-1))+1]
    main(m1[0])
    main(m1[1])
    hideMove()
}
function minimax(node,depth,a,b,maximizingPlayer,start){
    if(!start) mockMove(node)
    let v = validMoves()
    if(depth == 0){ v = [evaluate(0),node]; undo(false); return v }
    let best_move; let val
    if(maximizingPlayer){
        best_move = [-Infinity,node]
        for(let i = 0; i < v.length; i++){
            val = minimax(v[i],depth-1,a,b,false,false)
            if(val[0] > best_move[0]) best_move = [val[0],v[i]]
            else if(val[0] == best_move[0]) best_move.push(v[i])
            a = Math.max(val[0],a)
            if(a >= b) break
        }
    }
    else {
        best_move = [Infinity,node]
        for(let i = 0; i < v.length; i++){
            val = minimax(v[i],depth-1,a,b,true,false)
            if(val[0] < best_move[0]) best_move = [val[0],v[i]]
            else if(val[0] == best_move[0]) best_move.push(v[i])
            b = Math.min(val[0],b)
            if(a >= b) break
        }
    }
    if(!start) undo(false)
    return best_move
}
function evaluate(n){
    let piece
    for(let i = 0; i < 64; i++){
        piece = ChessBoard[Locations[i]]
        if(piece)
            if(piece.team == b) n -= piece.getValue()
            else n += piece.getValue()
    }
    return n
}
function mockMove(move){
    start_piece = ChessBoard[move[0]]
    end_piece = ChessBoard[move[1]]
    pawnPromotionEngine() // make it test all possible types
    start_piece.getCastle(move[1])
    start_piece.executeMove(move[1])
}
function pawnPromotionEngine(){

    if (start_piece.getType() == pawn)
        if(start_piece.team == w && start_piece.location[1] == '7') newPiece = new Q()
        else if(start_piece.team == b && start_piece.location[1] == '2') newPiece = new Q()

    pawn_promotion_record.push(newPiece)

    if(newPiece){
        newPiece.location = start_piece.location
        newPiece.team = start_piece.team
        start_piece = newPiece
        newPiece = null
    }

}

function guiUpdate(bool){ //NEEDS MAJOR CLEANING
    if(bool == false) return
    if(bool != undefined) chess_notation_record.pop()
    for(let i = 0; i < 64; i++)
    if(ChessBoard[Locations[i]]){
        if(document.getElementById(Locations[i]).innerHTML == ChessBoard[Locations[i]].getImage()) continue
        else document.getElementById(Locations[i]).innerHTML = ChessBoard[Locations[i]].getImage()
    }
    else document.getElementById(Locations[i]).innerHTML = ""
    hideMove()
    let num_white_pawns = 0
    let num_black_pawns = 0
    let num_white_knights = 0
    let num_black_knights = 0
    let num_white_bishops = 0
    let num_black_bishops = 0
    let num_white_rooks = 0
    let num_black_rooks = 0
    let num_white_queens = 0
    let num_black_queens = 0
    let black_score = 0
    let white_score = 0
    for(let i = 0; i < 64; i++){
        let piece = ChessBoard[Locations[i]]
        if(!piece) continue
        if(piece.team == w){
            if(piece.getType() == pawn){
                white_score += 1
                num_white_pawns++
            }
            else if(piece.getType() == knight){
                white_score+=3
                num_white_knights++
            }
            else if(piece.getType() == bishop){
                white_score+= 3
                num_white_bishops++
            }
            else if(piece.getType() == rook){
                white_score += 5
                num_white_rooks++
            }
            else if(piece.getType() == queen){
                white_score += 9
                num_white_queens++
            }
            continue
        }
        else {
            if(piece.getType() == pawn){
                black_score += 1
                num_black_pawns++
            }
            else if(piece.getType() == knight){
                black_score+=3
                num_black_knights++
            }
            else if(piece.getType() == bishop){
                black_score+= 3
                num_black_bishops++
            }
            else if(piece.getType() == rook){
                black_score += 5
                num_black_rooks++
            }
            else if(piece.getType() == queen){
                black_score += 9
                num_black_queens++
            }
            continue
        }
    }
    num_white_pawns = 8-num_white_pawns
    num_white_bishops = 2-num_white_bishops
    num_white_knights = 2-num_white_knights
    num_white_rooks = 2-num_white_rooks
    num_white_queens = 1-num_white_queens
    if(num_white_queens < 0) num_white_pawns += num_white_queens
    if(num_white_knights < 0) num_white_pawns += num_white_knights
    if(num_white_bishops < 0) num_white_pawns += num_white_bishops
    if(num_white_rooks < 0) num_white_pawns += num_white_rooks
    let black_captured = ""
    for(let i = 0; i < num_white_pawns; i++)black_captured+='p'
    while(num_white_knights > 0){
        black_captured+='n'
        num_white_knights--
    }
    while(num_white_bishops > 0){
        black_captured+='b'
        num_white_bishops--
    }
    while(num_white_rooks > 0){
        black_captured+='r'
        num_white_rooks--
    }
    while(num_white_queens > 0){
        black_captured+='q'
        num_white_queens--
    }
    num_black_pawns = 8-num_black_pawns
    num_black_bishops = 2-num_black_bishops
    num_black_knights = 2-num_black_knights
    num_black_rooks = 2-num_black_rooks
    num_black_queens = 1-num_black_queens
    if(num_black_queens < 0) num_black_pawns += num_black_queens
    if(num_black_knights < 0) num_black_pawns += num_black_knights
    if(num_black_bishops < 0) num_black_pawns += num_black_bishops
    if(num_black_rooks < 0) num_black_pawns += num_black_rooks
    let white_captured = ""
    for(let i = 0; i < num_black_pawns; i++)white_captured+='p'
    while(num_black_knights > 0){
        white_captured+='n'
        num_black_knights--
    }
    while(num_black_bishops > 0){
        white_captured+='b'
        num_black_bishops--
    }
    while(num_black_rooks > 0){
        white_captured+='r'
        num_black_rooks--
    }
    while(num_black_queens > 0){
        white_captured+='q'
        num_black_queens--
    }
    document.getElementById("white-captured-pieces").innerHTML = ''
    let x = 0
    let last_piece = white_captured[0]
    for(let i = 0; i < white_captured.length; i++){
        if(white_captured[i] != last_piece) x++
        if(white_captured[i] == 'p') document.getElementById('white-captured-pieces').innerHTML += bP
        else if(white_captured[i] == 'n') document.getElementById('white-captured-pieces').innerHTML += bN
        else if(white_captured[i] == 'b') document.getElementById('white-captured-pieces').innerHTML += bB
        else if(white_captured[i] == 'r') document.getElementById('white-captured-pieces').innerHTML += bR
        else if(white_captured[i] == 'q') document.getElementById('white-captured-pieces').innerHTML += bQ
        document.getElementById("white-captured-pieces").childNodes[i].style.paddingLeft = (1.1*i + 2*x).toString()+"vh"
        last_piece = white_captured[i]
    }
    document.getElementById("black-captured-pieces").innerHTML = ''
    x = 0
    last_piece = black_captured[0]
    for(let i = 0; i < black_captured.length; i++){
        if(black_captured[i] != last_piece) x++
        if(black_captured[i] == 'p') document.getElementById('black-captured-pieces').innerHTML += wP
        else if(black_captured[i] == 'n') document.getElementById('black-captured-pieces').innerHTML += wN
        else if(black_captured[i] == 'b') document.getElementById('black-captured-pieces').innerHTML += wB
        else if(black_captured[i] == 'r') document.getElementById('black-captured-pieces').innerHTML += wR
        else if(black_captured[i] == 'q') document.getElementById('black-captured-pieces').innerHTML += wQ
        document.getElementById("black-captured-pieces").childNodes[i].style.paddingLeft = (1.1*i + 2*x).toString()+"vh"
        last_piece = black_captured[i]
    }
    if(white_score > black_score){
        document.getElementById('white-score').innerText = '+' + (white_score-black_score).toString()
        document.getElementById('black-score').innerText = ''
    }
    else if(white_score < black_score){
        document.getElementById('black-score').innerText = '+' + (black_score-white_score).toString()
        document.getElementById('white-score').innerText = ''
    }
    else{
        document.getElementById('black-score').innerText = ''
        document.getElementById('white-score').innerText = ''
    }
    let count = 1
    move_tracker.innerHTML = ""
    for(let i = 0; i < chess_notation_record.length; i+=2){
        if((i+1) < chess_notation_record.length) move_tracker.innerHTML += "<div class='move'>" + "<div>" + count.toString() + '.' + chess_notation_record[i] + "</div>" + "<div>" + chess_notation_record[i+1] + "</div>" + "</div>"
        else{
            move_tracker.innerHTML += "<div class='move'>" + count.toString() + '.' + chess_notation_record[i] + "</div>"
            break
        }
        count++
    }
    document.getElementById('move-tracker').scrollTop = document.getElementById('move-tracker').scrollHeight;
    terminate()
}
function flipBoard(){
    let a1 = document.getElementById('a1')
    let a2 = document.getElementById('a2')
    let a3 = document.getElementById('a3')
    let a4 = document.getElementById('a4')
    let a5 = document.getElementById('a5')
    let a6 = document.getElementById('a6')
    let a7 = document.getElementById('a7')
    let a8 = document.getElementById('a8')

    let b1 = document.getElementById('b1')
    let b2 = document.getElementById('b2')
    let b3 = document.getElementById('b3')
    let b4 = document.getElementById('b4')
    let b5 = document.getElementById('b5')
    let b6 = document.getElementById('b6')
    let b7 = document.getElementById('b7')
    let b8 = document.getElementById('b8')

    let c1 = document.getElementById('c1')
    let c2 = document.getElementById('c2')
    let c3 = document.getElementById('c3')
    let c4 = document.getElementById('c4')
    let c5 = document.getElementById('c5')
    let c6 = document.getElementById('c6')
    let c7 = document.getElementById('c7')
    let c8 = document.getElementById('c8')

    let d1 = document.getElementById('d1')
    let d2 = document.getElementById('d2')
    let d3 = document.getElementById('d3')
    let d4 = document.getElementById('d4')
    let d5 = document.getElementById('d5')
    let d6 = document.getElementById('d6')
    let d7 = document.getElementById('d7')
    let d8 = document.getElementById('d8')

    let e1 = document.getElementById('e1')
    let e2 = document.getElementById('e2')
    let e3 = document.getElementById('e3')
    let e4 = document.getElementById('e4')
    let e5 = document.getElementById('e5')
    let e6 = document.getElementById('e6')
    let e7 = document.getElementById('e7')
    let e8 = document.getElementById('e8')

    let f1 = document.getElementById('f1')
    let f2 = document.getElementById('f2')
    let f3 = document.getElementById('f3')
    let f4 = document.getElementById('f4')
    let f5 = document.getElementById('f5')
    let f6 = document.getElementById('f6')
    let f7 = document.getElementById('f7')
    let f8 = document.getElementById('f8')

    let g1 = document.getElementById('g1')
    let g2 = document.getElementById('g2')
    let g3 = document.getElementById('g3')
    let g4 = document.getElementById('g4')
    let g5 = document.getElementById('g5')
    let g6 = document.getElementById('g6')
    let g7 = document.getElementById('g7')
    let g8 = document.getElementById('g8')

    let h1 = document.getElementById('h1')
    let h2 = document.getElementById('h2')
    let h3 = document.getElementById('h3')
    let h4 = document.getElementById('h4')
    let h5 = document.getElementById('h5')
    let h6 = document.getElementById('h6')
    let h7 = document.getElementById('h7')
    let h8 = document.getElementById('h8')

    chessboard_container.innerHTML = ''
    if(board_orientation == b){
        chessboard_container.appendChild(a8)
        chessboard_container.appendChild(b8)
        chessboard_container.appendChild(c8)
        chessboard_container.appendChild(d8)
        chessboard_container.appendChild(e8)
        chessboard_container.appendChild(f8)
        chessboard_container.appendChild(g8)
        chessboard_container.appendChild(h8)

        chessboard_container.appendChild(a7)
        chessboard_container.appendChild(b7)
        chessboard_container.appendChild(c7)
        chessboard_container.appendChild(d7)
        chessboard_container.appendChild(e7)
        chessboard_container.appendChild(f7)
        chessboard_container.appendChild(g7)
        chessboard_container.appendChild(h7)

        chessboard_container.appendChild(a6)
        chessboard_container.appendChild(b6)
        chessboard_container.appendChild(c6)
        chessboard_container.appendChild(d6)
        chessboard_container.appendChild(e6)
        chessboard_container.appendChild(f6)
        chessboard_container.appendChild(g6)
        chessboard_container.appendChild(h6)

        chessboard_container.appendChild(a5)
        chessboard_container.appendChild(b5)
        chessboard_container.appendChild(c5)
        chessboard_container.appendChild(d5)
        chessboard_container.appendChild(e5)
        chessboard_container.appendChild(f5)
        chessboard_container.appendChild(g5)
        chessboard_container.appendChild(h5)

        chessboard_container.appendChild(a4)
        chessboard_container.appendChild(b4)
        chessboard_container.appendChild(c4)
        chessboard_container.appendChild(d4)
        chessboard_container.appendChild(e4)
        chessboard_container.appendChild(f4)
        chessboard_container.appendChild(g4)
        chessboard_container.appendChild(h4)

        chessboard_container.appendChild(a3)
        chessboard_container.appendChild(b3)
        chessboard_container.appendChild(c3)
        chessboard_container.appendChild(d3)
        chessboard_container.appendChild(e3)
        chessboard_container.appendChild(f3)
        chessboard_container.appendChild(g3)
        chessboard_container.appendChild(h3)

        chessboard_container.appendChild(a2)
        chessboard_container.appendChild(b2)
        chessboard_container.appendChild(c2)
        chessboard_container.appendChild(d2)
        chessboard_container.appendChild(e2)
        chessboard_container.appendChild(f2)
        chessboard_container.appendChild(g2)
        chessboard_container.appendChild(h2)

        chessboard_container.appendChild(a1)
        chessboard_container.appendChild(b1)
        chessboard_container.appendChild(c1)
        chessboard_container.appendChild(d1)
        chessboard_container.appendChild(e1)
        chessboard_container.appendChild(f1)
        chessboard_container.appendChild(g1)
        chessboard_container.appendChild(h1)
        board_orientation = w
        overlay.setAttribute('src','images/overlay.png')
    }
    else{
        chessboard_container.appendChild(h1)
        chessboard_container.appendChild(g1)
        chessboard_container.appendChild(f1)
        chessboard_container.appendChild(e1)
        chessboard_container.appendChild(d1)
        chessboard_container.appendChild(c1)
        chessboard_container.appendChild(b1)
        chessboard_container.appendChild(a1)

        chessboard_container.appendChild(h2)
        chessboard_container.appendChild(g2)
        chessboard_container.appendChild(f2)
        chessboard_container.appendChild(e2)
        chessboard_container.appendChild(d2)
        chessboard_container.appendChild(c2)
        chessboard_container.appendChild(b2)
        chessboard_container.appendChild(a2)

        chessboard_container.appendChild(h3)
        chessboard_container.appendChild(g3)
        chessboard_container.appendChild(f3)
        chessboard_container.appendChild(e3)
        chessboard_container.appendChild(d3)
        chessboard_container.appendChild(c3)
        chessboard_container.appendChild(b3)
        chessboard_container.appendChild(a3)

        chessboard_container.appendChild(h4)
        chessboard_container.appendChild(g4)
        chessboard_container.appendChild(f4)
        chessboard_container.appendChild(e4)
        chessboard_container.appendChild(d4)
        chessboard_container.appendChild(c4)
        chessboard_container.appendChild(b4)
        chessboard_container.appendChild(a4)

        chessboard_container.appendChild(h5)
        chessboard_container.appendChild(g5)
        chessboard_container.appendChild(f5)
        chessboard_container.appendChild(e5)
        chessboard_container.appendChild(d5)
        chessboard_container.appendChild(c5)
        chessboard_container.appendChild(b5)
        chessboard_container.appendChild(a5)

        chessboard_container.appendChild(h6)
        chessboard_container.appendChild(g6)
        chessboard_container.appendChild(f6)
        chessboard_container.appendChild(e6)
        chessboard_container.appendChild(d6)
        chessboard_container.appendChild(c6)
        chessboard_container.appendChild(b6)
        chessboard_container.appendChild(a6)

        chessboard_container.appendChild(h7)
        chessboard_container.appendChild(g7)
        chessboard_container.appendChild(f7)
        chessboard_container.appendChild(e7)
        chessboard_container.appendChild(d7)
        chessboard_container.appendChild(c7)
        chessboard_container.appendChild(b7)
        chessboard_container.appendChild(a7)

        chessboard_container.appendChild(h8)
        chessboard_container.appendChild(g8)
        chessboard_container.appendChild(f8)
        chessboard_container.appendChild(e8)
        chessboard_container.appendChild(d8)
        chessboard_container.appendChild(c8)
        chessboard_container.appendChild(b8)
        chessboard_container.appendChild(a8)
        overlay.setAttribute('src','images/overlay_flip.png')
        board_orientation = b
    }
    let player_console1 = document.getElementsByClassName('player-console')[0].innerHTML
    document.getElementsByClassName('player-console')[0].innerHTML = document.getElementsByClassName('player-console')[1].innerHTML
    document.getElementsByClassName('player-console')[1].innerHTML = player_console1
    white_profile_pic = document.getElementById("white-profile")
    black_profile_pic = document.getElementById("black-profile")
}

function showMove(element){
    if(endMarker()) return
    let valid_squares = []
    if(start_piece){
        let start_element = document.getElementById(start_piece.location)
        if(game_record.length != 0){
            document.getElementById(game_record[game_record.length-1][0]).style.removeProperty('background-color')
            document.getElementById(game_record[game_record.length-1][1]).style.removeProperty('background-color')
            endMarker()
        }
        for(let i = 0; i < 64; i++){
            if(start_piece.canMove(Locations[i]) && !start_piece.inCheck(Locations[i])){
                let square = document.getElementById(Locations[i])
                if(square.className == "white-square") square.style.backgroundColor = white_overlay
                else square.style.backgroundColor = black_overlay
                valid_squares.push(square)
            }
        }
        if(valid_squares.includes(element)) element.style.backgroundColor = hover_color
        return start_element.style.backgroundColor = selected_color
    }
    else if(ChessBoard[element.id] && ChessBoard[element.id].team == turn) element.style.backgroundColor = hover_color
}
function hideMove(toggle){
    for(let i = 0; i < 64; i++) document.getElementById(Locations[i]).style.removeProperty('background-color')
    if(game_record.length != 0){
        document.getElementById(game_record[game_record.length-1][0]).style.backgroundColor = hover_color
        document.getElementById(game_record[game_record.length-1][1]).style.backgroundColor = selected_color
        endMarker()
    }
    if(toggle)showMove()
}
function hoverUpdate(loc){
    if(ChessBoard[loc] && ChessBoard[loc].team == turn) document.getElementById(loc).style.backgroundColor = hover_color
}
function endMarker(){
    if(chess_notation_record.length < 2) return
    if(chess_notation_record[chess_notation_record.length - 1][chess_notation_record[chess_notation_record.length - 1].length - 1] == '#'){
        if(turn == w) document.getElementById(white_king_location).style.backgroundColor = 'rgb(238, 144, 144)'
        else document.getElementById(black_king_location).style.backgroundColor = 'rgb(238, 144, 144)'
        return true
    }
    else if(chess_notation_record[chess_notation_record.length - 1][chess_notation_record[chess_notation_record.length - 1].length - 1] == '$'){
        if(turn == w) document.getElementById(white_king_location).style.backgroundColor = 'lightgreen'
        else document.getElementById(black_king_location).style.backgroundColor = 'lightgreen'
        return true
    }
}

function newGame(){ // reset redo record
    while(game_record.length != 0) undo(true)
    document.getElementById("black-score").innerHTML = ''
    document.getElementById("black-captured-pieces").innerHTML = ''
    document.getElementById("white-captured-pieces").innerHTML = ''
    document.getElementById("black-score").innerHTML = ''
    redo_record = []
    if(engine_team == w) playEngine(w)

}

function setDepth(n,element){
    engine_depth = n
    element.style.backgroundColor = "grey"
    for(let i = 1; i < 6; i++){
        if(n == i) continue
        document.getElementById('B' + (i).toString()).style.removeProperty("background-color")
    }
}
function setEngine(team,element){
    if(team == board_orientation) flipBoard()
    if(turn == (engine_team = team)) playEngine(team)
    element.style.backgroundColor = "grey"
    if(team == w){
        document.getElementById('TT').style.removeProperty("background-color")
        document.getElementById('Tb').style.removeProperty("background-color")
        white_profile_pic.innerHTML = '<i class="fas fa-laptop"></i>'
        black_profile_pic.innerHTML = '<i class="fas fa-user-alt"></i>'
    }
    else if(team == b){
        document.getElementById('Tw').style.removeProperty("background-color")
        document.getElementById('TT').style.removeProperty("background-color")
        black_profile_pic.innerHTML = '<i class="fas fa-laptop"></i>'
        white_profile_pic.innerHTML = '<i class="fas fa-user-alt"></i>'
    }
    else {
        document.getElementById('Tw').style.removeProperty("background-color")
        document.getElementById('Tb').style.removeProperty("background-color")
        white_profile_pic.innerHTML = '<i class="fas fa-user-alt"></i>'
        black_profile_pic.innerHTML = '<i class="fas fa-user-alt"></i>'
    }
}
function Open(){
    pop_up.style.removeProperty("padding")
}
function Close(){
    if(pop_up.innerHTML != pawn_promotion_prompt) engine_settings = pop_up.innerHTML
    pop_up.innerHTML = ""
    pop_up.style.padding = 0  
}
function openEngineSettings(){
    pop_up.style.removeProperty("background-color")
    pop_up.style.removeProperty("padding")
    pop_up.innerHTML = engine_settings
}
setEngine(undefined,document.getElementById("TT"))
setDepth(3,document.getElementById("B3"))
Close()