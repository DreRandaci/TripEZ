# TripEZ - NSS Front-End Capstone

**Summary**: A virtual trip planner that eases the process of searching for and organizing activities. TripEZ is Mitchell Blom's front end capstone at Nashville Software School. It integrates AngularJS, Angular-Animate, Bootstrap, UI-Bootstrap, Sass, jQuery, Firebase Web API, Google Places Javascript API, and Google Places Geocoding.

<hr>

### Description

Helps users organize their vacation plans using Trips, Bases, and Events. Users define where they want to go, and TripEZ makes it easy to search for places to eat, stay, and see.

<hr>

### Features
 - User login and registration using Firebase or Google authentication
 - Trips, Bases, and Events can be added, edited, archived, or deleted
 - List views reorder items automatically based on start date
 - Bases within each Trip streamline Event searching
 - New Base Search dynamically communicates with Google Places to find and save location coordinates
 - App consistent between pages to display Trip and Base the user is working on
 - Event Search automated to the selected Base coordinates
 - Event Search results provide average ratings and link users to external sites for additional research
 - Event type differentiates them with symbols on the itinerary view
 - Archive view mode allows users to save and recall past trips rather than deleting
 - Google users can view their cloud calendar 

<hr>

### User Flow
1. Arrive on landing page
1. Identify as existing user, needing to register, or Google user
1. Arrive at the Event List view that shows upcoming events
1. Select existing Trip to view Base List
1. Add or edit Trip and select desired dates
1. Click existing Trip routes to Base list for that Trip
1. Select existing Base to view & edit, or add another Base
1. Add another Base and select desired dates
1. Click existing Base routes to Event List for that Base
1. Select Base to filter the Event List, or select All Bases to show entire trip itinerary
1. Filter by Event type to see only Food, Site, Transit, or Lodging
1. Click Search New Event button routes to Event Search page
1. Arrive on Event Search Page that automatically centers map on most recently selected Base
1. Search for Events returns 10-20 maximum results with the free API license
1. Save Event to Base/Trip by indicating type, start, and end
1. View and Edit Event details by clicking from Event List 
1. Click Archived Trips to view the archive, which is only viewable
1. Click the unlock button to return an archived Trip to the Active list for editing and additions

<hr>

### Stretch Goals
 - Itinerary view includes tab to view mapped Bases and Events
 - Google users save and edit Events in sync with their cloud-based calendar
 - Direction support between Events

<hr>

### Screen Shots

#### Landing

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/landing.png)

#### Login

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/login.png)

#### Trips

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/trips.png)

#### Bases and Expanded Navbar

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/bases.png)

#### Events

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/events.png)

#### Event Search

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/event-search.png)

#### Event Detail

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/event-detail.png)

#### Archive Example

![Splashpage](https://raw.githubusercontent.com/mitchellblom/TripEZ/readme/images/screenshots/archive.png)
