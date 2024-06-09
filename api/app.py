from flask import Flask
import datetime

app = Flask(__name__)

@app.route('/date')
def get_time():
    {
        }



if __name__ == '__main__':
    app.run(debug=True)