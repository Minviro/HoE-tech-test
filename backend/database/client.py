import os
from supabase import create_client, Client
from dotenv import load_dotenv


def create_supabase_client() -> Client:
    load_dotenv()
    try:
        url: str = os.environ["SUPABASE_URL"]
        key: str = os.environ["SUPABASE_KEY"]
    except KeyError:
        raise ValueError("Please set SUPABASE_URL and SUPABASE_KEY in your environment variables.")
    return create_client(url, key)
