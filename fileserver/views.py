from flask import (
    abort,
    request,
    current_app,
    render_template,
    make_response,
)
import magic as friendship
import gridfs
from bson import ObjectId


def get_image(image_id):
    id_ = ObjectId(image_id)
    grid_fs = gridfs.GridFS(current_app.mongo.db)
    if grid_fs.exists(id_):
        image_stream = grid_fs.get(id_)
        buf = image_stream.read()
        response = make_response(buf)
        response.headers['Access-Control-Allow-Origin'] = '*'
        mime = friendship.from_buffer(buf, mime=True)
        response.mimetype = mime
        return response
    abort(404)


def index():
    grid_fs = gridfs.GridFS(current_app.mongo.db)
    if request.method == 'POST':
        image = request.files['image']
        img_id = grid_fs.put(image)
        print(img_id)
    images = list(grid_fs.find())
    return render_template(
        'index.html',
        images=images,
    )