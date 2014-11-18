# Topic: Getting started with PhoneGap
## 1. Install Dependencies

**Node.js**
* Visit the [node.js website](http://nodejs.org/download/) and download the Windows or Mac install (depending on your operating system)

**Node Package Manager**
* Install the [Node Package Manager (npm)](https://github.com/npm/npm)
     * [Mac](https://github.com/npm/npm#fancy-install-unix)
     * [Windows](https://github.com/npm/npm#windows-install-or-upgrade)
   
## 2. Install PhoneGap 
* Visit the [install section](http://phonegap.com/install/) in the PhoneGap website. It will ask you to open terminal and enter `sudo npm install -g phonegap`. This should successfully install PhoneGap on your machine.

## 3. Create your PhoneGap project

* Open terminal
* Create a PhoneGap application template by entering `phonegap create app-name` (where "app-name" is your desired application name)
* Enter `cd app-name`(again, replace `app-name` with the previous app name you use)
* To run your project in a simulator, enter `phonegap run os-name`, where `os-name` is the type of phone you want to run your project on (i.e. `ios` or `android`)

## 4. Run your application
* Copy your code into your application's `www` folder.
* To test your application on a simulator run `phonegap local os-name` (where `os-name` is `android` or `ios`)
* To test your application remotely, visit [http://app.phonegap.com/](http://app.phonegap.com/) and download the PhoneGap mobile client. Once it's open, run `phonegap serve` on your computer.

## Resources
* [Ripple Browser Emulator](http://emulate.phonegap.com/) - Develop your app on a desktop browser
* [PhoneGap Developer App](http://app.phonegap.com/) - Develop your app on a mobile device
* [PhoneGap Build](https://build.phonegap.com/) - Distribute applications