#!/bin/bash
# VERGR Firebase Deploy Script
# Run this from the vergr-firebase directory

echo "🎮 VERGR Firebase Deploy"
echo "========================"

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if logged in
firebase projects:list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "🔐 Please log in to Firebase..."
    firebase login
fi

echo ""
echo "📋 Step 1: Installing Cloud Functions dependencies..."
cd functions && npm install && cd ..

echo ""
echo "📋 Step 2: Building Cloud Functions..."
cd functions && npm run build && cd ..

echo ""
echo "📋 Step 3: Deploying Firestore rules..."
firebase deploy --only firestore:rules

echo ""
echo "📋 Step 4: Deploying Firestore indexes..."
firebase deploy --only firestore:indexes

echo ""
echo "📋 Step 5: Deploying Storage rules..."
firebase deploy --only storage

echo ""
echo "📋 Step 6: Deploying Cloud Functions..."
firebase deploy --only functions

echo ""
echo "✅ VERGR Firebase backend deployed!"
echo ""
echo "🔗 Console: https://console.firebase.google.com/project/vergr-63852042"
echo "🔗 Firestore: https://console.firebase.google.com/project/vergr-63852042/firestore"
echo "🔗 Auth: https://console.firebase.google.com/project/vergr-63852042/authentication"
echo "🔗 Functions: https://console.firebase.google.com/project/vergr-63852042/functions"
echo ""
echo "Next step: Build the React frontend and deploy to Hosting!"
