## Toronto House Market
House market in GTA is always a hot topic, this project aims to utilize different regression models to predict the house price in GTA area. 
I will keep updating this regularly for a foreseeable period of time. 

# Steps
1. Scrap the recently sold record from Zoocasa with Puppeteer
2. Obtain the mean income of different districts 
3. Obtain the TTC subway stations map and get the location of the stations from geocode
4. Obtain the location of the listings from any one of the available map api or web scraping
5. Find the district where the individual listing belongs to
6. Stitch all the data 
7. Start exploring and model building! 

The MVP is just an optimized XGBRegressor model, will start exploring others and stacking more on top of it.

# Crucial Finding

![image](https://user-images.githubusercontent.com/45325095/157573163-bb04f5fe-c8c6-4fb0-9be2-d4fafe107983.png)


The property price strongly depends on:
1. displacement from closest TTC subway stations (transportation score)
2. district (mean income of that district is a good reference whether that is prime region or not)
3. sqft
4. number of parking
5. number of bedroom
6. number of bathroom
7. Bloor Denforth Line (Line 2)

It coincides to why people always says "LOCATION LOCATION LOCATION!"
