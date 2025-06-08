from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Product categories and subcategories
CATEGORIES = {
    'sweatshirts': {
        'name': 'Sweatshirts',
        'subcategories': ['hoodies', 'crewnecks'],
        'icon': 'fas fa-tshirt'
    },
    'hats': {
        'name': 'Hats',
        'subcategories': ['mesh-snapback', 'baseball-cap', 'flattop', 'beanie', 'bucket-hat'],
        'icon': 'fas fa-hat-cowboy'
    },
    'shirts': {
        'name': 'Shirts', 
        'subcategories': ['tanktop', 't-shirts'],
        'icon': 'fas fa-tshirt'
    },
    'accessories': {
        'name': 'Accessories',
        'subcategories': ['mugs', 'phone-cases', 'blankets', 'tote-bag', 'mousepads'],
        'icon': 'fas fa-shopping-bag'
    }
}

# Design collections (unnamed as requested)
COLLECTIONS = [
    {
        'id': 'collection1',
        'name': 'Collection 1',
        'description': 'Urban skyline designs capturing Seattle\'s architectural beauty',
        'theme': 'urban',
        'gradient': 'urban-gradient'
    },
    {
        'id': 'collection2',
        'name': 'Collection 2', 
        'description': 'Pacific Northwest nature and mountain landscapes',
        'theme': 'nature',
        'gradient': 'nature-gradient'
    },
    {
        'id': 'collection3',
        'name': 'Collection 3',
        'description': 'Seattle culture, coffee, and local lifestyle',
        'theme': 'culture',
        'gradient': 'culture-gradient'
    }
]

@app.route('/')
def index():
    return render_template('index.html', collections=COLLECTIONS, categories=CATEGORIES)

@app.route('/api/collections')
def get_collections():
    return jsonify(COLLECTIONS)

@app.route('/api/categories')
def get_categories():
    return jsonify(CATEGORIES)

@app.route('/api/collection/<collection_id>')
def get_collection(collection_id):
    collection = next((c for c in COLLECTIONS if c['id'] == collection_id), None)
    if not collection:
        return jsonify({'error': 'Collection not found'}), 404
    return jsonify(collection)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
