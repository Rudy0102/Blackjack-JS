document.addEventListener("DOMContentLoaded", function Main(){   //ANCHOR Ensurees that script will be started when all elements are loaded               //Made by Robert Żółtowski
    function RandomGenerator() {                    //ANCHOR Generate values
        return Math.floor((Math.random() * 52) + 1); //In this program this function only need to generate beetwen 1 and 52
    }
    class Player {
        constructor() {
            this.name = "player";
            this.cards = new Array();
            this.values = new Array();
            this.sum = 0;
            this.counter = 0;     //ANCHOR It will help not get stack error in GetValue()
        }
    }
    function CheckInsurance() {
        if (dealer.values[0]===11&&counter===1) {
            button_insurance.disabled=false;
        }
        else{
            button_insurance.disabled=true;
        }
        counter++;
    }
    function DisableButtons(x){
        button_hit.disabled=x;
        button_stand.disabled=x;
    };
    function GetsValue(a){             // ANCHOR Assigns values for cards (Ace deafult=11 but if over 21 ace=1)
        for (let i = 0; i < a.cards.length; i++) {
                a.values[i]=CheckValue(a.cards[i]);
            }
        let y=0;
        a.values.forEach(x =>{
            y+=x;
        })
        if (y>21){
            do{
                z=Aceone(a);
                if(z[0]!==0){
                    y=z[0];
                }
            }while(z[0]>21||z[1]===true)}
        a.sum=y;
        function Aceone(a){
            let y=0;
            let Ace=true
            for (let i = 0; i < a.cards.length; i++) {
                if (a.values[i]===11){
                    a.values[i]=1;
                    y=0;
                    a.values.forEach(x =>{
                        y+=x;
                    });
                    Ace=true;
                    break;
                }
                else{Ace=false;}
            }
        return [y,Ace];
        }
    function CheckValue(x){
        switch (true) {
            case(x<5) :
                return 2;
            case(x<9) :
                return 3;
            case(x<13) :
                return 4;
            case(x<17) :
                return 5;
            case(x<21) :
                return 6;
            case(x<25) :
                return 7;
            case(x<29) :
                return 8;
            case(x<33) :
                return 9;
            case(x<49) :
                return 10;
            case(x<53) :
                return 11;              
                }
            }

    }
    function ClearCards(card,name){
        let playername=name;
        card.forEach(element => {
            console.log(element);
            document.getElementById(playername+element).className="none";
        })
    }
    function Show_endscreen(x){                     //ANCHOR PB=PLayerBLackjack, DB=DealerBlackjack
        endscreen.className="endscreen";
        document.getElementById("dealer-value").classList="dealer-value";           //TODO Make a function showing cards, rather than copying the same lines
        document.getElementById("dealer"+dealer.cards[1]).className="dealercard";
        document.getElementById("dealer53").className="none";
        switch(x){
            case "DB":
                endscreen_text.innerHTML="Dealer Blackjack!";
                break;
            case "PB":
                endscreen_text.innerHTML="Blackjack!";
                break;
            case "Push":
                endscreen_text.innerHTML="Push!";
                break;
            case "PW":
                endscreen_text.innerHTML="You won!";
                break;
            case "DW":
                endscreen_text.innerHTML="You lost";
                break;
            case "Bust":
                endscreen_text.innerHTML="Bust!";
                break;
            case "DBust":
                endscreen_text.innerHTML="Dealer Bust!";
                break;            
            case "Show":
                endscreen.className="none";
                // ClearCards(player.cards,"dealer"); TODO
                // ClearCards(dealer.cards,"player");
                // MainGame();
                // DisableButtons(false);
                break;
                                   
        }
    }
    function CheckBlackjack(){
        if (player.sum===21&&dealer.sum!=21){               
            Show_endscreen("PB");   //Player Blackjack
            DisableButtons(true);
        }
        else if(dealer.values[0]===11&&dealer.sum===21){    
            if(player.sum==21){Show_endscreen("Push")}
        else{
                Show_endscreen("DB");
            }
            document.getElementById("dealer"+dealer.cards[1]).className="dealercard";
            document.getElementById("dealer53").className="none";
            DisableButtons(true)
        }
    }
    function WhoWins(){
        switch (true) {
            case dealer.sum===player.sum:   //Push
                Show_endscreen("Push")
                break;
            case dealer.sum>player.sum:     //Dealer wins
                Show_endscreen("DW")
                break;
            case dealer.sum<player.sum:     //Player wins
                Show_endscreen("PW")
                break;
        }
    }
    function MainGame(button){                          //ANCHOR Main Function
        switch (button){
            case undefined:{
                //Get 2 cards for each player
                // console.log(button)
                document.getElementById("dealer-value").classList="none";
                do {
                    dealer.cards=[RandomGenerator(),RandomGenerator()];
                } while (dealer.cards[0]===dealer.cards[1]);
                do {
                    player.cards=[RandomGenerator(),RandomGenerator()];
                } while (player.cards[0]===player.cards[1]);
                GetsValue(player); 
                GetsValue(dealer);
                CheckBlackjack();
                document.getElementById("dealer"+dealer.cards[0]).className="dealercard";
                document.getElementById("player"+player.cards[0]).className="playercard";
                document.getElementById("player"+player.cards[1]).className="playercard";
                document.getElementById("player53").className="none";
                // console.log(player);
                document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
                document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
                if(counter===1){GetPlayerName()};
                function GetPlayerName(){
                    do{
                    player.name=window.prompt("What's your name? (Max 10 characters)");
                    }while(player.name.length>10);
                    document.getElementById("player-text").innerHTML=player.name;
                };
                counter=1;
                break;
            }
            case "hit":{
                //ANCHOR give player additional card
                console.log(button);
                let x=player.cards.length;
                player.cards[x]=RandomGenerator();
                for (let i = 0; i < x; i++) {
                    if (player.cards[i]===player.cards[x]) {
                        player.cards[x]=RandomGenerator();
                    }
                }
                document.getElementById("player"+player.cards[x]).className="playercard";
                GetsValue(player);
                if (player.sum>21) {
                    Show_endscreen("Bust");
                    DisableButtons(true);
                    }
                counter++;
                document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
                document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
                break;
            }
            case "stand":{
                //ANCHOR if every player stands do dealers turn
                console.log(button);
                DisableButtons(true);
                let ends=false
                do{
                    let x=dealer.cards.length;
                    if (dealer.sum>=17||dealer.sum>=21) {
                        for (let i = 0; i < x; i++) {
                            document.getElementById("dealer"+dealer.cards[i]).className="dealercard";
                            document.getElementById("dealer53").className="none";
                        }
                        ends=true;
                    }
                    else{
                        dealer.cards[x]=RandomGenerator();
                        for (let i = 0; i < x; i++) {
                            if (dealer.cards[i]===dealer.cards[x]) {
                                dealer.cards[x]=RandomGenerator();
                            }
                        }
                    }
                    GetsValue(player); GetsValue(dealer);
                }while(ends===false);
                if(dealer.sum>21){Show_endscreen("DBust")}
                else{WhoWins();}  //ANCHOR Who wins+endscreen}
                document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
                document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
                counter++;
                break;
            }
            case "double-down":{
                //TODO give 1 card and doubles bet
                console.log(button);
                counter++;
                break;
            }
            case "surrender":{
                //TODO return 1/2 of bet and player doesnt ply this round
                console.log(button);
                counter++;
                break;
            }
            case "insurance":{
                //TODO place 1/2 of player bet that dealer have natural blackjack
                console.log(button);
                counter++;
                break;
            }
            // case "split":{
            //     //TODO if player is dealt 2 cards with the same value they can double the bet and play each hand separetly
            //     console.log(button)
            //     break;
            // }    
        }
        CheckInsurance();
    }
    const button_stand=document.getElementById("stand")
    button_stand.addEventListener("click",MainGame.bind(this,"stand"));
    const button_hit=document.getElementById("hit")
    button_hit.addEventListener("click",MainGame.bind(this,"hit"));
    const button_doubledown=document.getElementById("double-down")
    button_doubledown.addEventListener("click",MainGame.bind(this,"double-down"));
    const button_surrender=document.getElementById("surrender")
    button_surrender.addEventListener("click",MainGame.bind(this,"surrender"));
    const button_insurance=document.getElementById("insurance")
    button_insurance.addEventListener("click",MainGame.bind(this,"insurance"));
    const endscreen=document.getElementById("endscreen");
    endscreen.addEventListener("click",Show_endscreen.bind(this,"Show"));
    const endscreen_text=document.getElementById("endscreen-text");
    // let button_split=document.getElementById("split")
    // button_split.addEventListener("click",MainGame.bind(this,"split"));
    // let player=window.prompt("Enter your name: ")
    const dealer=new Player();
    const player=new Player();
    console.log(player);
    console.log(dealer);
    let counter=1;

    MainGame();
}) 