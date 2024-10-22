from flask import Flask
from flask_cors import CORS 
import joblib


def create_app():
    app = Flask(__name__)
    CORS(app)
    model = joblib.load('voting_classification_model.pkl')
    from src.routes.predict_route import predict_bp
    app.register_blueprint(predict_bp)
    return app