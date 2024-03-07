import pandas as pd
from google.cloud import storage
from dotenv import load_dotenv
import os

load_dotenv()  # This loads the .env file at the application startup
print(os.getenv('GOOGLE_APPLICATION_CREDENTIALS'))
