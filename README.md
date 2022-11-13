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
Since most of us had no prior experience with restricted APIs, we first had trouble obtaining authentication tokens for the INRIX API. But thanks to our hackathon mentors and the INRIX documentation, we were able to dynamically update our tokens in the end. The grid of squares on our map presented another set of difficulties because we had to account for the Earth's curvature. We solved this using a set of equations that precisely translated latitude and longitude information to miles.


## Accomplishments that we're proud of
The plot we were able to produce are something we are quite proud of. The user-important data is displayed in a clear and understandable manner on the interactive map. We were quite proud that we were able to present our data on an interactive map, which was something we had really hoped to accomplish. We are quite proud with the practical application of the offered INRIX API, which goes along with our visualization. To clarify, the majority of the crew had zero knowledge with APIs before to beginning the project. We were able to overcome our lack of knowledge and produce a useful project thanks to the training and mentoring. We take satisfaction in our newfound understanding of how APIs are used.

## What we learned
Some team members had never used Typescript before this event, yet they were nevertheless able to pick it up quickly and contribute to the final output. Our team had a fantastic opportunity to gain practical skills by getting first-hand exposure to API requests. Additionally, we were able to gain knowledge of many of the open-source JavaScript libraries and APIs, which helped us advance the project as a whole. The truly effective programmer needs to be aware of the libraries and APIs available to him or her while developing a project because starting from scratch is a difficult undertaking.

## What's next for Pool IT
Many of the features that were added after the initial capability of showing pertinent customer trip data was realized showed how the team views this as a constantly changing product. Given that the INRIX API is designed to collect data, PoolIt can handle larger data sets if they are made available. Our objective is to give businesses as much pertinent information as we can. We anticipate that further features will be added, such as the option for users to export the data for analysis with their own tools and the presentation of person group  trends across the data to explain consumer travel patterns. Additionally, we think that using this tool for longer periods of time could yield even more beneficial insight.

## Authors

- [Jagadeesh Marali](https://github.com/jagadeeshmarali)
- [Nisarg Bhalavat](https://github.com/bhalavat-nisarg)
- [Vaibhav Sachdeva](https://github.com/Vaibhav-Sachdeva)
- [Abhishek Praveenkumar](https://github.com/ABHISHEK22415)
- [Dhruv Desai](https://github.com/Dhruv590)
