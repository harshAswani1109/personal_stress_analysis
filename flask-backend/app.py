from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np


app = Flask(__name__)
CORS(app)  


model = joblib.load('voting_classification_model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        hr = data.get('hr')
        resp = data.get('resp')
        spo2 = data.get('spo2')
        temp = data.get('temp')

       
        if None in [hr, resp, spo2, temp]:
            return jsonify({'status': 'error', 'message': 'Missing vital inputs'}), 400

       
        input_data = np.array([[hr, resp, spo2, temp]])
        prediction = model.predict(input_data)
        health_status = "Normal" if prediction[0] == 0 else "Abnormal"

       
        return jsonify({'status': 'success', 'health_status': health_status})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
