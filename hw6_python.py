from flask import Flask
from flask import  jsonify,render_template,request
import requests


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

class DataStore():
    keyword = None
    geopoint = None
    radius = None
data = DataStore()



global url
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

@app.route('/events')
def big():
    url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF"+"&keyword=" + data.keyword + "&geoPoint="+ data.geopoint + "&radius=" + data.radius
    print(url)
    x = event_extraction(url)
    data.keyword = None
    data.geopoint = None
    data.radius = None
    return x


@app.route('/test', methods=['POST','GET'])
def events():
    event_data = request.json
    print(event_data)
    data.keyword = event_data['keyword']
    data.geopoint = event_data['geoPoint']
    data.radius = event_data['radius']

    return "success"


if __name__ == '__main__':
    app.run(debug=True)
