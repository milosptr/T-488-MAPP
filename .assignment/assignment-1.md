# Toodler

You have been contacted by a world recognized agency called **Umbrella** and they specialize in making project management tools and are particularly interested in the **Kanban** technique. They are currently working on a product called **Toodler** and it hasn't been successful lately because of their inability to develop apps. Because they don't know how to make apps they need your help to create this fantastic product using **React Native**. As always failure is not an option!

## Database

In this assignment you will not be working with any external database or web service but instead all data will reside in memory. This creates a small problem: every time you shut down the application, all the data will be wiped out clean as well. In **Canvas** a file is provided called **data.json** which contains pre-populated data which can be loaded into memory every time the application is started. Therefore you ( _and your group_ ) won't have to populate everything manually each time the application is restarted.

## Structure

If the code does not follow the principles laid down here below, each group can receive up to -2 in penalties for their assignment. Here are the rules of structure:

- Code should be broken up into components which follow the Single Responsibility Principle
- Common logic should reside in a separate module and imported into components which make use of this logic
- The folder structure should be in accordance to the course lectures
- Consistency in code, meaning all group members should follow the same set of rules, e.g. 4 spaces as indent, Egyptian style curly braces, etc... hint: eslint can help

## Assignment description

Here below is an enlisting of all the functionality this product should implement:

- (25%) Boards
    - (10%) A user should see a list of all his boards within the Board view
    - (10%) A user should be able to create a new board. ( see Models section below )
    - (5%) A user should be able to delete a board
- (25%) Board
    - (10%) A user should see all lists which are associated with a certain board
    - (10%) A user should be able to create a new list. ( see Models section below )
    - (5%) A user should be able to delete a list
- (30%) Task
    - (10%) A user should see all tasks which are associated with a certain list
    - (10%) A user should be able to create a new task. ( see Models section below )
    - (10%) A user should be able to move tasks from one list to another
- (20%) Extras - Students are allowed to do something extra which is not stated in the list above for a higher grade. Do note that extras should only be implemented if everything above has been implemented.

## Models

Here all the models are enlisted and each property they should contain:

**Board**

```
- Name
- Description ( optional for the user to input but must be present within the object )
- Thumbnail photo
```

**List**

```
- Name
- Color ( a code representing an optional color of the list. Must be present within the object, and an option for the user to set a color )
- BoardId ( the link to a certain board )
```

**Task**

```
- Name
- Description
- Is finished? ( a boolean determining whether the task has been completed or not )
- ListId ( the link to a certain list )
```

_(If you feel the need to add models to support the_ **_Extras_** _section, feel free.)_

---

README.md template example:

# Project Name

## Description

[A brief description of your React Native application.]

## Table of Contents

    -	Installation
    -	Features
    -	Technologies Used
    -	Platform Support
    -	Project Structure
    -	Setup Instructions
    -	Running the App
    -	Testing
    -	Screenshots
    -	Known Issues
    -	Future Improvements

## Running the app

### Navigate to project directory

`cd your-project-name`

### Install dependencies

`npm install`

### Running the App

`npm run`

## Technologies Used

    -	React Native
    -	React Navigation (if used)
    -	State Management Solution (Redux/Context API/etc.)
    -	[Any other major libraries/frameworks]

## Platform Support

### Primary Development Platform

    -	Primary Platform: [iOS/Android]
    -	Test Device: [e.g., iPhone 14 Pro/Samsung Galaxy S21]
    -	OS Version: [e.g., iOS 16.5/Android 13]

### Secondary Platform Testing

    -	Secondary Platform: [iOS/Android]
    -	Test Device: [e.g., iPhone 13/Google Pixel 6]
    -	OS Version: [e.g., iOS 16.2/Android 12]
    -	Testing Status: [Limited/Partial/Comprehensive]
    -	Known Platform-Specific Issues: [List any issues specific to this platform]

### Platform-Specific Features

    - Only state here if any

## Setup Instructions

### Prerequisites

    -	Node.js (v14 or higher)
    -	npm or yarn
    -	React Native CLI
    -	Xcode (for iOS development)
    -	Android Studio (for Android development)

### Environment Setup

    1.	Install React Native dependencies
    2.	Configure development environment
    3.	Set up emulators/simulators

## Known Issues

- [List issues]
