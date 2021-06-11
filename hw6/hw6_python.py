from flask import Flask
from flask import  jsonify,render_template,request, redirect
import requests


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

class DataStore():
    keyword = None
    geopoint = None
    radius = None
    location = None
    category = None
data = DataStore()

@app.route('/getlat')
def geolocation_func(val):
     val = val.split(" ")
     print(val)
     add_on = "";
     for y in val:
         add_on += "+";
         add_on += y
     url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAjU6cgR6QnwPyH5ICJAbcl7_D4NAxwJ2c&address=" + add_on
     print(url)
     x = geo_extraction(url)
     comma = ","
     if(data.location == None):
         print("KOIKLKKH")
         data.location = (str(x['results'][0]['geometry']['location']['lat']) + comma + str(x['results'][0]['geometry']['location']['lng']))
         print(data.location)
     return 1

def geo_extraction(url):
    req = requests.get(url)
    json_request = req.json()
    return json_request


@app.route('/')
def hello():
    return app.send_static_file('index.html')

@app.route('/generic')
def hello123():
    req = requests.get('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    json_request = req.json();
    json_obj = jsonify(json_request)
    # print(json_obj);
    return json_obj

def event_extraction(url):
    req = requests.get(url)
    json_request = req.json()
    json_obj = jsonify(json_request)
    #print(json_request)
    return json_obj


@app.route('/test', methods=['GET','POST'])
def event():

    event_data = request.json
    print(event_data)
    data.keyword = event_data['keyword']
    data.geopoint = event_data['geoPoint']
    data.radius = event_data['radius']
    data.category = event_data['category']
    temp = event_data['location']
    geolocation_func(temp)

    return "true"

@app.route('/events')
def big():
    print("Happened")
    try:
        print(data.location)
        print("Hello")
        x = ""
        print(data.location)
        url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF"+"&keyword=" + data.keyword + "&radius=" + data.radius + "&geoPoint=" + data.location + "&SegmentId=" + data.category
        #url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF"
        print(url)
        x = event_extraction(url)
        data.keyword = None
        data.geopoint = None
        data.radius = None
        data.location = None
        data.category = None
        return x
    except:
        if(data.location == None):
            redirect(render_template('/test'))
        return("not_now")

    #url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF"

if __name__ == '__main__':
    app.run(debug=True)
