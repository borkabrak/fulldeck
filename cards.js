// Global to the file
// ━━━━━━━━━━━━━━━━━━━━━
var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var suits = ["S", "H", "D", "C"];

// A Card has, mainly, a rank and a suit
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Card = function(r, s) {

    this.rank = r;
    this.suit = s; 

};

Card.prototype.color = function(){
    return this.suit.match(/^H|^D/) ? "red" : "black" ;
};

Card.prototype.suit_symbol = function(){
    return ["&spades;", "&hearts;", "&diams;", "&clubs;"][suits.indexOf(this.suit.toUpperCase())];
};

Card.prototype.toHTML = function(){
    return $("<div />", {
        'class': 'card',
    }).append( // rank
        $("<span />", {
            'class': 'rank1',
            'html': this.rank,
        })
    ).append( // suit
        $("<span />", {
            'class': 'suit ' + this.color(),
            'html': this.suit_symbol(),
        })
    ).append( // rank
        $("<span />", {
            'class': 'rank2',
            'html': this.rank,
        })
    );
};


// A Deck is a stack of Poker cards, for any purpose.  Including, players'
// hands, which are Decks of, say, five cards.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deck = function(config) {
    var self = this;
    this.cards = [];

    this.container = config && config.container;
    this.offset = config && parseFloat(config.offset).toString() || "0";

    // Initialize a fresh deck on command
    if (config && config.fresh === true) {
        suits.forEach(function(suit){
            ranks.forEach(function(rank){
                self.cards.push(new Card(rank, suit)); }); });
    };

};

Deck.prototype.show = function(){

    var self = this;
    $(this.container).empty();
    //this.cards.forEach(function(card){
    for (var i = 0; i < this.cards.length; i++){
        $(self.container).append(this.cards[i].toHTML().css("left", parseFloat(i * this.offset).toString() + "px"));
    };

    // Side effects, side effects..

};

Deck.prototype.shuffle = function(){

    var oldcards = this.cards.slice(); // *copy* the array (not just make a ref to it)
    this.cards = [];

    while(oldcards.length){
        this.cards.push(oldcards.splice(Math.rand(oldcards.length) - 1, 1)[0]);
    };

    // More side effects..

};

Deck.prototype.pop = function(){
    return this.cards.pop();
}

Deck.prototype.push = function(card){
    return this.cards.push(card);
}

Math.rand = function(x, y){
    /* 
        Return a random integer in the range given [x-y], inclusive.

        This algorithm was found in a Stack Overflow question.  The accepted
        answer contains an interesting and thorough explanation of how it
        works.  Check it out at: 
        http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    */
    var min = y ? x : 0;
    var max = y || x;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
