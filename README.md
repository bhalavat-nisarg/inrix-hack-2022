# Pool IT

Pool IT is for both!. If you drive to work on a regular basis, sign up to find passengers and
enjoy the benefits of HOV or express lanes, share the costs of driving, and enjoy the
company. If you don’t like driving, want to limit your driving, or don’t have a car, sign up to
find a driver. Carpool matching works when there is a balance between commuters who
want to ride and who want to drive. 

## Inspiration

In recent years, the economic, and environmental factors have encouraged people to save natural resources and opt for a greener approach. Carpooling becomes a more prevalent approach to save these resources as carpooling would mean that we reduce the usage of fuel consumption, and reduce traffic congestion on roads. This way we can reduce abuse of roads and reduce emissions. 

## What it does

We are providing an efficient way to carpool by clustering the latitudes and longitudes using K-Means algorithm. Using this algorithm we have the start location cluster and end location cluster so that the car deployments can be optimized in areas having higher density. We used [INRIX](https://inrix.com/)'s [Trade Area Trips API](https://docs.inrix.com/analytics/tradeareatrips/) to get the consumer trip data, i.e. `startLoc` and `endLoc`.

## How we built it

We have use angularjs for the forntend with the help leaflate maps to show case data on the map. Using the nodejs and expressJs framework for the api calls in the backend. We used INRIX's trade area trips API to get the consumer trip data, i.e. `startLoc` and `endLoc`. In order to get the Start location and end location points cluster's we have use k-means machine learning algorithem to cluster the data from the api. 

## Challenges we ran into



## Accomplishments that we're proud of

## What we learned

## What's next for Pool IT

## Authors

- [Jagadeesh Marali](https://github.com/jagadeeshmarali)
- [Nisarg Bhalavat](https://github.com/bhalavat-nisarg)
- [Vaibhav Sachdeva](https://github.com/Vaibhav-Sachdeva)
- [Abhishek Praveenkumar](https://github.com/ABHISHEK22415)
- [Dhruv Desai](https://github.com/Dhruv590)
