import os
import sys
import django
from django.core.management import execute_from_command_line

import logging
def start_background_task():
    import threading
    from myapp.tt import background_task
    logging.info("Starting background task...")
    background_thread = threading.Thread(target=background_task)
    background_thread.daemon = True  # Mark the background thread as a daemon so it exits when the main thread exits
    background_thread.start()
def main():




    #sys.argv.append('--noreload')
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ppdproject.settings')

    try:
        django.setup()
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    logging.info("Starting main function...")
    start_background_task()

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
