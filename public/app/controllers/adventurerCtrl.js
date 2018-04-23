/**
 *  Adventurer Controller related functions for adventurer details
 */

angular.module('adventurerController', ['adventurerServices'])
    .controller('adventurerCtrl', function($http, $location, Adv, Auth, $timeout) {
        var app = this;

        if(Auth.isLoggedIn) {
            //Adv.get
            app.adventurers = [];
            //console.log("Hello Potato");
            Adv.get().then(function(data){
                app.adventurers = data.data;
                    //console.log("Client side Data: " + data);
                    //console.log(app.adventurers);
            });
            Adv.getMarketplace().then(function(data){
                app.marketplace = data.data;
                //console.log(app.marketplace);
            });


        }
        else{
            console.log("Failed to access Adv");
        }
        /**
         * Functions to buy and sell adventurers
         */
        this.buyAdventurer = function(purchaseData, goldData, username){
            console.log("Adventurer Purchase - Controller");
            console.log(purchaseData);
            console.log(goldData);

            //console.log(app);
            console.log(purchaseData.cost);
            if (confirm("Would you like to buy this Adventurer?")) {
                txt = "You pressed Yes!";
                var sufficientFunds = false;
                //Check if user has enough Gold
                console.log("Your Gold: " + goldData);
                console.log("Cost: " + purchaseData.cost);
                if(goldData > purchaseData.cost){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    console.log("Insufficient Funds");
                }
                purchaseData.goldData = goldData;
                purchaseData.requestingUser = username;
                if(sufficientFunds) {
                    Adv.buyAdventurer(purchaseData).then(function (data) {
                        //return data
                        if (data.data.success) {
                            //Create success message & show a loading bar
                            //app.sASuccessMsg = data.data.message;
                            //app.updated = true;
                            //Redirect to the hero page after a Timeout
                            $timeout(function () {
                                $location.path('/myHeroes');
                            }, 500);
                        } else {
                            //Create error message & show a loading bar
                            //app.updated = false;
                            //app.sAErrorMsg = data.data.message;
                        }
                    });
                }
                //If not then don't
                //app.sAErrorMsg = returnMsg;
            } else {
                txt = "You pressed No!";
            }
            console.log(txt);
        };
        /**
         * Functions to buy and sell adventurers
         */
        this.sellAdventurer = function(saleData, goldData, username){
            console.log("Adventurer Sale - Controller");
            console.log(saleData);
            console.log(goldData);
            //console.log(app);
            console.log(saleData.cost);
            if (confirm("Would you like to sell this Adventurer?")) {
                txt = "You pressed Yes!";
                console.log("Your Gold: " + goldData);
                console.log("Sale Value: " + saleData.cost);
                saleData.goldData = goldData;
                saleData.requestingUser = username;
                    Adv.sellAdventurer(saleData).then(function(data){
                        //return data
                        if(data.data.success){
                            //Create success message & show a loading bar
                            //app.sASuccessMsg = data.data.message;
                            //app.updated = true;

                            //Redirect to the marketplace page after a Timeout
                            $timeout(function(){$location.path('/myMarketplace');}, 500);
                        } else {
                            //Create error message & show a loading bar
                            //app.updated = false;
                            //app.sAErrorMsg = data.data.message;
                        }
                    });
                //If not then don't
                //app.sAErrorMsg = returnMsg;
            } else {
                txt = "You pressed No!";
            }

        };

        /**
         * Functions to send Adventurers on adventures
         */

        this.goOnAdventure = function(adventureData){
            //console.log("I'm going on an adventure!");
            var today = new Date();
            var todayAsIso = today.toISOString();
            var todayAsDate = todayAsIso.substring(0, 10);
            var oldGold = $('#indexPageG').text();
            //console.log(todayAsDate);
            //console.log(app.adventurers);
            console.log(oldGold);
            var j;
            for(j in app.adventurers){
                if(app.adventurers[j].name == adventureData.hero){
                    var adventurerDate = app.adventurers[j].available;
                    var adventurerAsDate = adventurerDate.substring(0, 10);
                    //console.log(adventurerAsDate);
                    //If the adventurer is available to be used (less than or equal to todays date
                    if(adventurerAsDate <= todayAsDate){
                        console.log("You can use this hero");
                        Adv.goOnAdventure(adventureData).then(function(data){
                            if(data.data.success){
                                console.log(app);
                                $timeout(function(){$location.path('/myHeroes');}, 100);
                                $timeout(function(){$location.path('/battleMap');}, 100);
                                console.log(app);
                                $timeout(function(){
                                    var newGold = $('#indexPageG').text();
                                    var resultGold = newGold - oldGold;
                                    if(resultGold>100){
                                        alert("Your adventurer saunters back into the guild swaggeringly, laughing they hurl a golden trinket into your hands. This should be worth a good amount of gold at the markeplace!" +
                                            "You got " + resultGold + " Gold!");
                                    }
                                    else{
                                        alert("Your adventurer staggers back into the guild wounded, dropping a bloodstained purse into your hands." +
                                            "You got " + resultGold + " Gold!");
                                    }

                                }, 250);
                            } else {
                                //Create error message & show a loading bar
                            }
                        });
                    }
                    else{
                        //console.log("You CANNOT use this hero");
                        alert("This hero is tired and must rest, they will be available to adventure again tomorrow.")
                    }
                }
            }
        }

        /**
         * Battle map control data
         *
         */

        this.A1 = function(){
            alert("Cold Marsh! A coastal town known for its pirates and smugglers");
        };
        this.A2 = function(){
            alert("The Seeping Bogs! A vile and stinking marsh filled with terrifying beasts!");
        };
        this.A3 = function(){
            alert("The Seeping Bogs! A vile and stinking marsh filled with terrifying beasts!");
        };
        this.A4 = function(){
            alert("Mountains! Who knows what creatures dwell at the lofty heights!");
        };

        this.B1 = function(){
            alert("A quiet vale... Or is it... ?");
        };
        this.B2 = function(){
            alert("This hilltop manor has a haunting past, and is believed to be home to a terrifying banshee");
        };
        this.B3 = function(){
            alert("A Mausoleum is no place for the living, but don't worry, you won't be living for long...");
        };
        this.B4 = function(){
            alert("Hah! You try to flee this place and will encounter more than bandits on the road")
        };

        this.C1 = function(){
            alert("The outskirts of the forest are filled with mists, who knows what lurks here")
        };
        this.C2 = function(){
            alert("Deadman's Cavern... a place which few enter, and fewer return...")
        };
        this.C3 = function(){
            alert("A quiet vale... Or is it... ?");
        };
        this.C4 = function(){
            alert("Mountains! Who knows what creatures dwell at the lofty heights!");
        };

        this.D1 = function(){
            alert("They say nothing lives in these forests, but something moves in the dark...")
        };
        this.D2 = function(){
            alert("My a glowing portal! Should we go through?")
        };
        this.D3 = function(){
            alert("A fairy mound glows here with treasures scattered around... nothing seems to be guarding it though... Or...")
        };
        this.D4 = function(){
            alert("A vile swamp! Rumours abound of a mysterious swamp man kidnapping merchants!");
        };


    });
