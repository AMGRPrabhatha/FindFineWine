from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

app = Flask(__name__)

# Load datasets
wine_data = pd.read_csv('FINDFINEWINE2.csv', encoding='ISO-8859-1')
popular_wine_data = pd.read_csv('PopularWine2.csv', encoding='ISO-8859-1')

# Fix column names
wine_data.columns = wine_data.columns.str.replace('ï»¿', '')
popular_wine_data.columns = popular_wine_data.columns.str.replace('ï»¿', '')

# Drop any unnecessary columns
wine_data = wine_data[['Title', 'Wine Type', 'Grape Variety', 'Gender', 'Occasion', 'Description', 'price', 'Country', 'ABV', 'IMG URL']]
popular_wine_data = popular_wine_data[['Title', 'Sales Volume']]

# Merge datasets on 'Title' (assuming 'Title' is the common key)
df = pd.merge(wine_data, popular_wine_data, on='Title', how='inner')

# Remove '%' from 'ABV' and convert to float
df['ABV'] = df['ABV'].str.rstrip('%').astype(float)

# Drop any rows with missing values
df.dropna(inplace=True)

# Convert categorical variables to numeric
le_wine_type = LabelEncoder()
le_grape_variety = LabelEncoder()
le_gender = LabelEncoder()
le_occasion = LabelEncoder()
le_title = LabelEncoder()

df['Wine Type'] = le_wine_type.fit_transform(df['Wine Type'])
df['Grape Variety'] = le_grape_variety.fit_transform(df['Grape Variety'])
df['Gender'] = le_gender.fit_transform(df['Gender'])
df['Occasion'] = le_occasion.fit_transform(df['Occasion'])
df['Title'] = le_title.fit_transform(df['Title'])

# Features and target variable
X = df[['Wine Type', 'Grape Variety', 'Gender', 'Occasion', 'price', 'ABV']]
y = df['Sales Volume']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest Regressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Define the recommendation function
def recommend_wine(wine_type, grape_variety, gender, occasion):
    # Convert input to numeric
    wine_type_num = le_wine_type.transform([wine_type])[0]
    grape_variety_num = le_grape_variety.transform([grape_variety])[0]
    gender_num = le_gender.transform([gender])[0]
    occasion_num = le_occasion.transform([occasion])[0]

    # Prepare the input data
    input_data = pd.DataFrame([[wine_type_num, grape_variety_num, gender_num, occasion_num]], 
                              columns=['Wine Type', 'Grape Variety', 'Gender', 'Occasion'])

    # Fit NearestNeighbors model
    X_knn = df[['Wine Type', 'Grape Variety', 'Gender', 'Occasion']]
    nn = NearestNeighbors(n_neighbors=5)
    nn.fit(X_knn)

    # Use the model to find the 5 nearest neighbors
    distances, indices = nn.kneighbors(input_data)

    # Get the indices of the 5 nearest neighbors
    recommended_wines_indices = indices[0]

    # Retrieve full details of recommended wines
    recommended_wines = df.loc[recommended_wines_indices]

    # Filter recommended wines to match user criteria
    recommended_wines = recommended_wines[
        (recommended_wines['Wine Type'] == wine_type_num) &
        (recommended_wines['Grape Variety'] == grape_variety_num) &
        (recommended_wines['Gender'] == gender_num) &
        (recommended_wines['Occasion'] == occasion_num)
    ]

    if recommended_wines.empty:
        return None, None

    # Predict trending scores for the recommended wines
    recommended_wines_X = recommended_wines[['Wine Type', 'Grape Variety', 'Gender', 'Occasion', 'price', 'ABV']]
    trending_scores = model.predict(recommended_wines_X)
    recommended_wines['Trending Score'] = trending_scores

    # Find the most trending wine
    most_trending_wine_index = recommended_wines['Trending Score'].idxmax()
    most_trending_wine = recommended_wines.loc[most_trending_wine_index]

    # Inverse transform categorical columns for all recommended wines
    recommended_wines['Wine Type'] = le_wine_type.inverse_transform(recommended_wines['Wine Type'])
    recommended_wines['Grape Variety'] = le_grape_variety.inverse_transform(recommended_wines['Grape Variety'])
    recommended_wines['Gender'] = le_gender.inverse_transform(recommended_wines['Gender'])
    recommended_wines['Occasion'] = le_occasion.inverse_transform(recommended_wines['Occasion'])
    recommended_wines['Title'] = le_title.inverse_transform(recommended_wines['Title'])

    # Inverse transform the title for the most trending wine
    most_trending_wine_title = le_title.inverse_transform([most_trending_wine['Title']])[0]

    return recommended_wines.to_dict(orient='records'), most_trending_wine_title, most_trending_wine['IMG URL']

# Define the Flask route
@app.route('/recommend', methods=['GET'])
def recommend():
    wine_type = request.args.get('wine_type')
    grape_variety = request.args.get('grape_variety')
    gender = request.args.get('gender')
    occasion = request.args.get('occasion')
    
    if not all([wine_type, grape_variety, gender, occasion]):
        return jsonify({'error': 'Missing parameters'}), 400
    
    recommendations, trending_title, trending_img_url = recommend_wine(wine_type, grape_variety, gender, occasion)

    if recommendations is None:
        return jsonify({'message': 'No wines match your criteria.'}), 404

    return jsonify({
        'recommended_wines': recommendations,
        'most_trending_wine': {
            'title': trending_title,
            'img_url': trending_img_url
        }
    })

if __name__ == '__main__':
    app.run(debug=True)

