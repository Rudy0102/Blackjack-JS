document.addEventListener("DOMContentLoaded", function Main(){   //ANCHOR Ensurees that script will be started when all elements are loaded               //Made by Robert Żółtowski
    function RandomGenerator() {                    //ANCHOR Generate values
        return Math.floor((Math.random() * 52) + 1); //In this program this function only need to generate beetwen 1 and 52
    }
    class Player {
        constructor() {
            this.cards = new Array();
            this.values = new Array();
            this.sum = 0;
            // thisplayer.cards=new Array();
            // thisplayer.values=new Array();
            // thisplayer.sum=0;
            // this.counter=1;
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
        if (x===undefined){y=true}
        else{y=false};
        button_doubledown.disabled=y;
        button_hit.disabled=y;
        button_insurance.disabled=y;
        button_stand.disabled=y;
        button_surrender.disabled=y;
    };
    function GetsValue(Aceone){             // ANCHOR Assigns values for cards (Ace deafult=11 but if over 21 ace=1)
        let y=0;
        let z=0;
        let array1=player.cards;
        for (let i = 0; i < dealer.cards.length; i++) {
            dealer.values[i]=CheckValue(dealer.cards[i]);
            let x=dealer.values[i];
            z+=x
        }
        for (let i = 0; i < array1.length; i++) {
            let x;
            if (player.cards[i]===Aceone) {
                player.values[i]=1;
                x=player.values[i];
            } else {
                player.values[i]=CheckValue(player.cards[i]);
                x=player.values[i];
            }
            y+=x
        }
        player.sum=y;
        dealer.sum=z;
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
    function Show_endscreen(x){
        if(x===undefined){
            endscreen.className="endscreen";
        }
        else{
            endscreen.className="none";
        }
    }
    function MainGame(button){                          //ANCHOR Main Function
        switch (button){
            case undefined:{
                //Get 2 cards for each player
                // console.log(button)
                do {
                    dealer.cards=[RandomGenerator(),RandomGenerator()];
                } while (dealer.cards[0]===dealer.cards[1]);
                do {
                    player.cards=[RandomGenerator(),RandomGenerator()];
                } while (player.cards[0]===player.cards[1]);
                GetsValue();
                document.getElementById("dealer"+dealer.cards[0]).className="dealercard";
                document.getElementById("player"+player.cards[0]).className="playercard";
                document.getElementById("player"+player.cards[1]).className="playercard";
                document.getElementById("player53").className="none";
                // console.log(player);
                document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
                // document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
                if (player.sum===21&&dealer.sum!=21){               //Blackjack for player TODO
                    Show_endscreen();
                    endscreen_text.innerHTML="Blackjack!";
                    DisableButtons();
                }
                else if(dealer.values[0]===11&&dealer.sum===21){
                    if(player.sum==21){alert("Push!")}
                    else{
                        Show_endscreen();
                        endscreen_text.innerHTML="Dealer Blackjack!";}
                    document.getElementById("dealer"+dealer.cards[1]).className="dealercard";
                    document.getElementById("dealer53").className="none";
                    DisableButtons()
                }
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
                GetsValue();
                if (player.sum>21) {
                    for (let i = 0; i < player.values.length; i++) {
                        if (player.values[i]===11){
                            Aceone=player.cards[i];
                            GetsValue(Aceone);
                        }
                    }
                    if (player.sum>21) {
                        Show_endscreen();
                        endscreen_text.innerHTML="Bust";
                        DisableButtons();
                        }
                }
                counter++;
                document.getElementById("player-value").innerHTML="Cards value: "+player.sum;
                // document.getElementById("dealer-value").innerHTML="Cards value: "+dealer.sum;
                break;
            }
            case "stand":{
                //TODO if every player stands do dealers turn
                console.log(button);
                DisableButtons();

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
    endscreen.addEventListener("click",Show_endscreen.bind(this,"show"));
    const endscreen_text=document.getElementById("endscreen-text");
    // let button_split=document.getElementById("split")
    // button_split.addEventListener("click",MainGame.bind(this,"split"));
    const dealer=new Player();
    // let player=window.prompt("Enter your name: ")
    const player=new Player();
    console.log(player);
    let counter=1;

    MainGame();
}) 