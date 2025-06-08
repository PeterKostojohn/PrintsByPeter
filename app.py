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

# Design placeholders (no specific titles yet)
DESIGNS = [
    {
        'id': 'design1',
        'placeholder': True,
        'theme': 'skyline'
    },
    {
        'id': 'design2', 
        'placeholder': True,
        'theme': 'nature'
    },
    {
        'id': 'design3',
        'placeholder': True,
        'theme': 'culture'
    }
]

@app.route('/')
def index():
    return render_template('index.html', designs=DESIGNS, categories=CATEGORIES)

@app.route('/api/designs')
def get_designs():
    return jsonify(DESIGNS)

@app.route('/api/categories')
def get_categories():
    return jsonify(CATEGORIES)

@app.route('/design/<design_id>')
def design_products(design_id):
    design = next((d for d in DESIGNS if d['id'] == design_id), None)
    if not design:
        return "Design not found", 404
    
    return render_template('products.html', design=design, categories=CATEGORIES)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
