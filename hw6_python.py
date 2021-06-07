from flask import Flask
from flask import  jsonify,render_template,request
import requests


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

class DataStore():
    a = None
data = DataStore()



global url
@app.route('/')
def hello():
    return app.send_static_file('index.html')

@app.route('/generic')
def hello123():
    req = requests.get('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    json_request = req.json();
    #print(va);
    json_obj = jsonify(json_request)
    print(json_obj);
    return json_obj

def event_extraction(url):
    req = requests.get(url)
    json_request = req.json()
    json_obj = jsonify(json_request)
    return json_obj

@app.route('/events')
def big():
    print(data.a)
    url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF"+"&keyword=" + data.a
    print(url)
    x = event_extraction(url)
    data.a = None
    return x


@app.route('/test', methods=['POST','GET'])
def events():
    event_data = request.json
    print("1")
    print(event_data['keyword'])
    print("2")
    data.a = event_data['keyword']
    #session['keyword'] = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF'
    return event_data['keyword']


if __name__ == '__main__':
    app.run(debug=True)
