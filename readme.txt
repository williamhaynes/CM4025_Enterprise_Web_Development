#CM4025 Enterprise Web Courswork MMORPG

Author: William Haynes
Matriculation Number: 1401676

#Overview

Themes: Fantasy, Guild building.
Progression: Go on adventures to generate Gold. Use Gold to buy upgrades for Adventurers. Compete to have best Adventurer.
Social Interaction: Chat Communication available once signed in. Global Leaderboard of Adventurers.

####### Description #######

The app is an Angularjs implementation of a MMORPG called Guildmaster. The aim of the game is to compete against other
players to climb to the top of the leaderboard and become the top ranked player by having the top ranked heroes. This is
done by upgrading your heroes on the Guild page. Heroes can be sent on Adventures from the Battle map to earn your guild
more gold to allow you to buy more upgrades. You can chat against your competitors and use this system to coordinate
buying and selling heroes to one another.

#Functionality by Page

~Non Logged In Pages~
Register Page: Allows registration of new user  -   Includes HTML5, client side and server side data entry checks
Login Page: Allows registered user to sign in   -   Provides basic level of security using username:password authentication

~Logged In Pages~
My Account Page: Allows you to change details   -   Modify your Guild Name, Email Address or Password
Battle Map: Send your Heroes on Adventures      -   2D interactive map to add immersion. Send your Heroes to different locations,
                                                    where they will battle randomly generated monsters. If you win the battle you
                                                    get more gold, if you lose you only get 100 gold. Heroes will rest for 24 hours
                                                    after a fight.
My Heroes: Allows you to review and sell Heroes -   Allows you to sell your heroes by clicking on them and review their stats,
                                                    provides confirmation checks on sale to prevent misclicks.
My Guild: Allows you to upgrade your Heroes     -   Click on any upgrade to get confirmation checks, allows you to upgrade all your
                                                    Heroes for an advertised cost. Can buy larger upgrade for higher price but more
                                                    cost effective. Price checking means if you can't afford you can't buy (client
                                                    and server side check).
Marketplace: Allows purchase of Heroes          -   Click on any Hero and get confirm check whether you want to buy them. Price
                                                    checking means if you can't afford you can't buy (client and server side check)
Leaderboard: Shows global heroes ranked         -   Shows the global heroes ranked. Uses a data table to allow you to sort the
                                                    fields so you can find what you're looking for more easily.

####### Additional Comments on Functionality #######
Extensive use was made of Angularjs features to pass information to relevant part of the API via the controllers and services.

####### Future Development #######
OAuth                                           -   The code to implement OAuth was included but commented out in the final impmentation
                                                    Due to Facebooks recent situation, their app support requires linking to your hosted
                                                    privacy policy which was not possible. If this was hosted on an external rather than
                                                    local site I would have included Facebook OAuth.
More MMORPG Elements                            -   It would be nice to have group based adventures, "Raids" or "Dungeons". The idea
                                                    would be that map hexs would have a number of slots which needed to be filled, say
                                                    12 slots. Once this was met the potential for Reward would be much higher. Flavour
                                                    text would also have branching interactive choices where each player would have to
                                                    make individual choices to affect the whole group.
                                                -   More resources than just Gold. It would be nice to implement a more base building
                                                    element to the game. This would allow the inclusion of a resource trading market
                                                    to buy and sell resources. This would be a dynamic marketplace which would adjust
                                                    according to supply and demand.
                                                -   In App Purchasing. Ultimately any true game has to fund itself. With resources
                                                    added it would be possible to add a real money marketplace where you could buy
                                                    in game resources with actual money. Limited Time and special heroes could also
                                                    be added.
More User Friendly CMS                          -   User and other Content Management is handled through Robo, a MongoDB GUI tool, it
                                                    would be nice to develop a web based tool for this management.

####### Conclusions #######
This project has greatly developed my understanding of angularjs with what I would argue is a strong implementation in the format. Overall
I'm very happy with my MMORPG.