from flask import Flask
from flask import  jsonify,render_template
import requests


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

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

@app.route('/events')
def event_extraction():
    req = requests.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF')
    json_request = req.json();
    json_obj = jsonify(json_request)
    print(json_obj)
    return json_obj

@app.route('/hello')
def hellq():
    print("YAYAYA")

if __name__ == '__main__':
    app.run(debug=True)
