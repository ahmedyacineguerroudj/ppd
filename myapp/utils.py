import os


def upload_to(instance, filename):

    _, ext = os.path.splitext(filename)
    filename = f"{instance.name}{ext}"

    return f"src/assets/images/{filename}"

