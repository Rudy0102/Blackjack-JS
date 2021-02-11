document.addEventListener("DOMContentLoaded", function Main(){   //Ensurees that script will be started when all elements are loaded               //Made by Robert Żółtowski
    function RandomGenerator() {                    //Generate values
        return Math.floor((Math.random() * 52) + 1); //In this program this function only need to generate beetwen 1 and 52
    }
    class Player {
        constructor() {
            this.name = "player";
            this.cards = new Array();
            this.values = new Array();
            this.sum = 0;
            this.balance = 100.0;
            this.actualbet = 0.0;
        }
    }
    function Restart() {    //Restarts the gmae
        ClearCards(player.cards,"player");
        ClearCards(dealer.cards,"dealer");
        DisableButtons(false);
        MainGame("start");
    }
    function ButtonStart(){         //Button starting the game
        document.getElementById("mainmenu").className="none";
        document.getElementById("playscreen").className="playscreen";
        MainGame("start");
    }
    function CheckSpecialButtons() {
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
    function GetsValue(a){             //Assigns values for cards (Ace deafult=11 but if over 21 ace=1)
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
            //console.log(document.getElementById(playername+element));
            const actualcard=document.getElementById(playername+element).className="none";
        })
    }
    function Show_endscreen(x){                     //PB=PLayerBLackjack, DB=DealerBlackjack
        endscreen.className="endscreen";
        document.getElementById("dealer-value").className="dealer-value";           //TODO Make a function showing cards, rather than copying the same lines
        document.getElementById("dealer"+dealer.cards[1]).className="dealercard";
        document.getElementById("dealer53").className="none";
        switch(x){
            case "DB":
                endscreen_text.innerHTML="Dealer Blackjack!";
                player.balance=player.balance-player.actualbet;
                break;
            case "PB":
                endscreen_text.innerHTML="Blackjack!";
                player.balance=player.balance+(player.actualbet*1.5+player.actualbet);   //payout 3:2
                break;
            case "Push":
                endscreen_text.innerHTML="Push!";
                player.balance=player.balance+player.actualbet;
                break;
            case "PW":
                endscreen_text.innerHTML="You won!";
                player.balance=player.balance+(player.actualbet*2);
                break;
            case "DW":
                endscreen_text.innerHTML="You lost";
                player.balance=player.balance-player.actualbet;
                break;
            case "Bust":
                endscreen_text.innerHTML="Bust!";
                player.balance=player.balance-player.actualbet;
                break;
            case "DBust":
                endscreen_text.innerHTML="Dealer Bust!";
                player.balance=player.balance+(player.actualbet*2);
                break;            
            case "Show":
                endscreen.className="none";
                button_list.forEach(element => {
                    element.className="none"
                })
                button_retry.className="button";
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
    function MainGame(button){                          //Main Function
        console.log(player.balance);
        switch (button){
            case "start":{
                //Get 2 cards for each player
                // console.log(button)
                // player.cards.forEach(x => x=null);
                // player.values.forEach(x => x=null);
                // dealer.cards.forEach(x => x=null);
                // dealer.values.forEach(x => x=null);
                player.cards.length=2;
                player.values.length=2;
                dealer.cards.length=2;
                dealer.values.length=2;
                // console.log(dealer,player);
                button_list.forEach(element => {element.className="button"})
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
                document.getElementById("dealer53").className="dealercard";
                document.getElementById("player"+player.cards[0]).className="playercard";
                document.getElementById("player"+player.cards[1]).className="playercard";
                document.getElementById("player53").className="none";
                // console.log(player);
                document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
                document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
                let i=0;
                if(counter===1){GetPlayerName()};   //If it first time player starts playing ask for his/her name
                function GetPlayerName(){
                    do{
                        if (i!=0){alert("Invalid name!")};
                        player.name=window.prompt("What's your name? (Max 10 characters, default: Player)");
                        if (player.name==""){player.name="Player"};
                        i++;
                    }while(player.name.length>10);
                    document.getElementById("player-text").innerHTML=player.name;
                };
                counter=1;
                break;
            }
            case "hit":{
                //give player additional card
                // console.log(button);
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
                // console.log(dealer,player);
                break;
            }
            case "stand":{
                //if every player stands do dealers turn
                // console.log(button);
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
                else{WhoWins();}  //Who wins+endscreen}
                document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
                document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
                counter++;
                // console.log(dealer,player);
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
        CheckSpecialButtons();
    }
    const button_stand=document.getElementById("stand")
    button_stand.addEventListener("click",MainGame.bind(this,"stand"));     //False means that functions isnt executed instantly
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
    const button_retry=document.getElementById("retry");
    button_retry.addEventListener("click",function(){button_retry.className="none";Restart()})    //Hides retry button and calls function MainGame
    button_list=[button_hit,button_insurance,button_surrender,button_stand,button_doubledown]
    const button_start=document.getElementById("menustart");
    button_start.addEventListener("click",ButtonStart, false);
    // let button_split=document.getElementById("split")
    // button_split.addEventListener("click",MainGame.bind(this,"split"));
    // let player=window.prompt("Enter your name: ")
    const dealer=new Player();
    const player=new Player();
    // console.log(player);
    // console.log(dealer);
    let counter=1;
}) 