     ____          ____       _ _ 
    |  _ \  __ _  | __ )  ___| | |
    | | | |/ _` | |  _ \ / _ \ | |
    | |_| | (_| | | |_) |  __/ | |
    |____/ \__,_| |____/ \___|_|_|
                                  

This is Da Bell.

It will ring all the open browsers when you send a POST.

I made it so we can hear about new orders and things coming in from our online store (www.dolbeau.ca).


## Usage

    npm install  # dependencies
    node app.js

It listens on *0.0.0.0:5000* so to listen to the bell ring just go there.

To ring the bell:

    curl -d "" http://localhost:5000/ring/bell

Or in Python, use requests!

    import requests
    requests.post("http://localhost:5000/ring/bell")


Enjoy!