# Steps to Properly Run the App

## 1. Configure Environment Variables and install npms

   ### 1. Install Dependencies
   
   Open your terminal or command prompt and run the following command to install all required npm packages:
   
   	npm install
    
   ### 2. Create an ```.env``` File

   In your project directory, create a file named ```.env```. This file will hold your environment variables.
 
   ## 3. Add API Key
   Store your YouTube Data API v3 key in the ```.env``` file with the following entry:
   
	API_KEY=your_youtube_data_api_key_here

   For instructions on obtaining an API key, refer to the [YouTube Data API v3 documentation](https://developers.google.com/youtube/v3?hl=pl).


## 2. Prepare and Build the App

### This app utilizes Expo for development. Follow these steps to prepare and build your project:

### 1. Prebuild the Project
Run the following command to prebuild your Expo project:

      npx expo prebuild
	  
 ### 2. Run on Android 
 To deploy the app on an Android device or emulator, use:
 
 	npx expo run:android
  
 For detailed guidance on the prebuild process, refer to the [Expo prebuild documentation](https://docs.expo.dev/workflow/prebuild/).
 
 ## 3. Set Up Android Studio Emulator

### 1. Install Java 17 
Ensure that Java 17 is installed on your system.

### 2. Configure Environment Variables 
Link Java 17 in your system environment variables via the Control Panel. For setup assistance, consult the [Expo setup guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated).
