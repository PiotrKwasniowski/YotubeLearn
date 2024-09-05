# Steps to Properly Run the App

## 1. Configure Environment Variables

   ### Create an .env file in your project directory.
 
   ### Store your YouTube Data API v3 key in this file under the variable name API_KEY. For more details on obtaining an API key, refer to the [YouTube Data API v3 documentation](https://developers.google.com/youtube/v3?hl=pl).

## 2. Prepare and Build the App

### This app is built using Expo. To fully utilize Expo, you'll need to prebuild the project and then deploy it. Run the following commands:

### use bash/cmd

      npx expo prebuild
      npx expo run:android
	  
 ### For detailed guidance on the prebuild process, check the [Expo prebuild documentation](https://docs.expo.dev/workflow/prebuild/).
 
 ## 3.Set Up Android Studio Emulator

### If you're using an Android Studio emulator, ensure you have Java 17 installed.

### Link Java 17 in your system environment variables through the Control Panel. For assistance with setting up your environment, see the [Expo setup guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated).
