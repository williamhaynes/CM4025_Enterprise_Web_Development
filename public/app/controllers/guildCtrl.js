/**
 *  Guild Controller related functions for guild details
 */

angular.module('guildController', ['guildServices'])
    .controller('guildCtrl', function(Gui, $timeout, $location) {
        var app = this;
        var lesserUpgrade = 100;
        var greaterUpgrade = 1000;
        var sufficientFunds = false;
        //ballistae, main.gold, main.username
        this.upgradeBuilding1 = function(goldData, username){
            var clicked = 1;
            if (confirm("Upgrade Adventurers ATK by 1 for 100 Gold?")) {
                if(goldData > lesserUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, lesserUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            console.log("I should be redirecting");
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);

                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
        this.upgradeBuilding2 = function(goldData, username){
            var clicked = 2;
            if (confirm("Upgrade Adventurers DEF by 1 for 100 Gold?")) {
                if(goldData > lesserUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, lesserUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);
                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
        this.upgradeBuilding3 = function(goldData, username){
            var clicked = 3;
            if (confirm("Upgrade Adventurers HP by 1 for 100 Gold?")) {
                if(goldData > lesserUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, lesserUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);
                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
        this.upgradeBuilding4 = function(goldData, username){
            var clicked = 4;
            if (confirm("Upgrade Adventurers Cost by 1 for 100 Gold?")) {
                if(goldData > lesserUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, lesserUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);
                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
        this.upgradeBuilding5 = function(goldData, username){
            var clicked = 5;
            if (confirm("Upgrade Adventurers ATK by 15 for 1000 Gold?")) {
                if(goldData > greaterUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, greaterUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);
                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
        this.upgradeBuilding6 = function(goldData, username){
            var clicked = 6;
            if (confirm("Upgrade Adventurers DEF by 15 for 1000 Gold?")) {
                if(goldData > greaterUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, greaterUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);
                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
        this.upgradeBuilding7 = function(goldData, username){
            var clicked = 7;
            if (confirm("Upgrade Adventurers HP by 15 for 1000 for 100 Gold?")) {
                if(goldData > greaterUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, greaterUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);
                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
        this.upgradeBuilding8 = function(goldData, username){
            var clicked = 8;
            if (confirm("Upgrade Adventurers Cost by 15 for 1000 for 100 Gold?")) {
                if(goldData > greaterUpgrade){
                    sufficientFunds = true;
                    console.log("Sufficient Funds");
                }
                else{
                    sufficientFunds = false;
                    console.log("Insufficient Funds");
                }
                if (sufficientFunds){
                    Gui.upgradeBuilding(clicked, goldData, username, greaterUpgrade).then(function(data){
                        if(data.data.success){
                            //Redirect to the account after a Timeout
                            $timeout(function(){$location.path('/myHeroes');}, 100);
                            $timeout(function(){$location.path('/myGuild');}, 100);
                        }
                    });
                }
                return true;
            } else {
                return false;
            }
        };
});