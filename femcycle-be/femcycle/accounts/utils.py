from sklearn.impute import SimpleImputer


def validate_instance_file_name(instance, file_field="file", file_name="file_name"):
    import os
    # checking if file is updated or not, if updated then directory to the file is given by:
    # os.path.split(self.file.name)[0] ==> (<file_directory>, <file_name_with_extension>)
    # if <file_directory> is empty ie. '' then we can replace the new file name received in request.
    # otherwise let the file name as it is.
    if hasattr(instance, file_field) and not os.path.split(getattr(instance, file_field).name)[0]:
        setattr(instance, file_name, getattr(instance, file_field).name)


import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from config.settings import ROOT_DIR

import os
from django.conf import settings


def predictor(age, length_of_cycle, length_of_luteal, total_num_of_high_days, total_num_of_peak_days,
              total_days_of_fertility, bmi, length_of_menses):
    # Load the data
    data = pd.read_csv(os.path.join(os.path.join(ROOT_DIR, "femcycle-be"), "cycle_data.csv"))
    # Select the relevant columns
    selected_columns = ['Age', 'LengthofCycle', 'LengthofMenses', 'LengthofLutealPhase',
                        'TotalNumberofHighDays', 'TotalNumberofPeakDays', 'TotalDaysofFertility', 'BMI', 'EstimatedDayofOvulation']
    data_selected = data[selected_columns]
    # Replace empty spaces with NaN, convert to float, and fill NaNs with the median
    for column in ['Age', 'LengthofMenses', 'LengthofLutealPhase', 'TotalNumberofHighDays',
                   'TotalNumberofPeakDays', 'TotalDaysofFertility', 'BMI']:
        data_selected[column] = data_selected[column].replace(' ', np.nan)
        data_selected[column] = data_selected[column].astype(float)
        data_selected[column].fillna(data_selected[column].median(), inplace=True)

    # Convert 'LengthofCycle' to float (it's already numeric and doesn't contain any missing values)
    data_selected['LengthofCycle'] = data_selected['LengthofCycle'].astype(float)

    data_selected.to_csv('Cleaned_CycleData_selected.csv', index=False)

    # Convert 'EstimatedDayofOvulation' to float, and drop rows with missing values in this column
    data_selected['EstimatedDayofOvulation'] = data_selected['EstimatedDayofOvulation'].replace(' ', np.nan).astype(
        float)
    data_selected = data_selected.dropna(subset=['EstimatedDayofOvulation'])

    # Separate the data into features (X) and target (y)
    X = data_selected.drop(columns='EstimatedDayofOvulation')
    y = data_selected['EstimatedDayofOvulation']

    # Impute missing values (mean imputation)
    imputer = SimpleImputer(strategy='mean')
    X_imputed = imputer.fit_transform(X)

    # Standardize the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_imputed)

    # Apply PCA
    pca = PCA()
    X_pca = pca.fit_transform(X_scaled)

    # Determine the number of components to keep
    explained_variance_ratio = pca.explained_variance_ratio_.cumsum()
    n_components = (explained_variance_ratio < 0.95).sum() + 1

    # Re-apply PCA with the optimal number of components
    pca = PCA(n_components=n_components)
    X_pca = pca.fit_transform(X_scaled)

    # Show the shape of the data after PCA

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X_pca, y, test_size=0.2, random_state=42)

    # Train a linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    sample_input = [age, length_of_cycle, length_of_menses, length_of_luteal, total_num_of_high_days,
                    total_num_of_peak_days, total_days_of_fertility, bmi]

    # Preprocess the sample input to match the preprocessing applied to the original data
    sample_input = [sample_input]  # Convert to a 2D array
    sample_input_scaled = scaler.transform(sample_input)  # Apply the same scaler used on the training data
    sample_input_pca = pca.transform(sample_input_scaled)  # Apply PCA

    # Make predictions for the sample input
    predicted_output = model.predict(sample_input_pca)

    # Display the predicted output
    return round(predicted_output[0])
