from flask import Flask
from flask import  jsonify,render_template
import requests


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)


@app.route('/')
def hello():
    print("Hello")
    r = requests.get('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    va = r.json()['city']
    x = jsonify(va)
    print(x)
    return app.send_static_file('hw6.html')

@app.route('/generic')
def hello123():
    r = requests.get('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    va = r.json()['city']
    x = jsonify(va)
    return(x)


    fetch("/generic/")

if __name__ == '__main__':
    app.run(debug=True)

