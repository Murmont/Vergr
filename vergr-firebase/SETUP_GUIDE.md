# VERGR Firebase Setup Guide
## Follow these steps in order — paste the files where indicated

---

## STEP 1: Enable Firebase Services (Console)

Go to: https://console.firebase.google.com/project/vergr-63852042

### 1.1 Authentication
- Left menu → **Build → Authentication → Get Started**
- Enable these sign-in providers:
  - **Email/Password** → Enable (also enable Email link/passwordless)
  - **Google** → Enable → set support email to your email
  - **Apple** → Enable (you'll need Apple Developer account later for iOS — skip config for now, just enable)
- We'll add Discord/Steam/Xbox as custom OAuth later via Cloud Functions

### 1.2 Cloud Firestore
- Left menu → **Build → Firestore Database → Create Database**
- Choose **Start in production mode** (we'll deploy proper rules)
- Location: **europe-west1 (Belgium)** — closest to South Africa with full feature support
- Click **Create**

### 1.3 Firebase Storage
- Left menu → **Build → Storage → Get Started**
- Choose **Start in production mode**
- Same location as Firestore (europe-west1)

### 1.4 Cloud Functions
- Left menu → **Build → Functions**
- You need **Blaze plan** (pay-as-you-go) for Cloud Functions
- Upgrade if not already on Blaze: Settings → Usage & Billing → Modify plan → Blaze
- Note: You won't be charged anything meaningful during development. Firebase has generous free tiers.

### 1.5 Cloud Messaging
- Left menu → **Build → Cloud Messaging**
- This is auto-enabled. Just make sure you see the dashboard.

### 1.6 Hosting
- Left menu → **Build → Hosting → Get Started**
- Just click through the setup wizard (we'll deploy later)

---

## STEP 2: Deploy Firestore Rules

Go to: **Firestore Database → Rules tab**

Delete everything in the editor and paste the entire contents of:
📄 **`firestore.rules`** (provided in this package)

Click **Publish**.

---

## STEP 3: Deploy Firestore Indexes

You'll need the Firebase CLI for this. In your terminal:

```bash
npm install -g firebase-tools
firebase login
firebase init
# Select: Firestore, Functions, Hosting, Storage
# Use existing project: vergr-63852042
# Accept defaults for everything, BUT:
#   - Firestore Rules file: firestore.rules
#   - Firestore Indexes file: firestore.indexes.json
#   - Functions language: TypeScript
#   - Public directory: public
#   - Single-page app: Yes

# Then deploy indexes:
firebase deploy --only firestore:indexes
```

Or manually create each index in Console → Firestore → Indexes tab (slower but works).

---

## STEP 4: Deploy Storage Rules

Go to: **Storage → Rules tab**

Delete everything and paste the contents of:
📄 **`storage.rules`** (provided in this package)

Click **Publish**.

---

## STEP 5: Deploy Cloud Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

---

## STEP 6: Create Firestore Collections (Auto-Created)

Collections are created automatically when the app first writes data. However, you can seed initial data by going to **Firestore → + Start Collection** and creating these with one dummy document each (the app will handle the rest):

### Priority collections to seed:
1. `users` — created on first sign-up
2. `posts` — created on first post
3. `squads` — created on first squad creation
4. `products` — you'll load these manually or via admin panel
5. `coin_packages` — seed these now (see SEED_DATA section below)
6. `app_config` — seed this now (see below)

---

## STEP 7: Seed Required Data

### 7.1 Coin Packages
Go to Firestore → **+ Start Collection** → Collection ID: `coin_packages`

Add these documents (click **+ Add Document** for each, use Auto-ID):

**Document 1:**
```
name: "Starter Pack"
coins: 100
priceZAR: 29.99
priceBonusPercent: 0
icon: "starter"
active: true
sortOrder: 1
```

**Document 2:**
```
name: "Gamer Bundle"
coins: 500
priceZAR: 129.99
priceBonusPercent: 10
icon: "bundle"
active: true
sortOrder: 2
```

**Document 3:**
```
name: "Pro Stack"
coins: 1200
priceZAR: 279.99
priceBonusPercent: 20
icon: "pro"
active: true
sortOrder: 3
```

**Document 4:**
```
name: "Legend Vault"
coins: 3000
priceZAR: 599.99
priceBonusPercent: 30
icon: "legend"
active: true
sortOrder: 4
```

### 7.2 App Config
Collection: `app_config` → Document ID: `general`
```
appName: "VERGR"
tagline: "Where Gamers Converge"
minAppVersion: "1.0.0"
maintenanceMode: false
maxPostLength: 5000
maxBioLength: 300
maxUsernameLength: 20
maxSquadMembers: 500
maxSquadNameLength: 40
reportThreshold: 5
autoModEnabled: true
adsEveryNPosts: 7
proBoostMultiplier: 2.0
newsBoostMultiplier: 0.8
featuredCreatorSlots: 6
```

### 7.3 App Config — Verification Tiers
Collection: `app_config` → Document ID: `verification`
```
tiers: [
  { name: "Verified", icon: "check", color: "#4DFFD4", requirement: "Manual approval" },
  { name: "Pro", icon: "star", color: "#7B6FFF", requirement: "Subscription", monthlyPriceZAR: 99.99 },
  { name: "Legend", icon: "crown", color: "#F5C542", requirement: "Invited / 50k+ followers" }
]
```

---

## STEP 8: Configure Authentication Templates

Go to: **Authentication → Templates**

### Email Verification
- Subject: `Verify your VERGR account`
- Customize the template with VERGR branding

### Password Reset
- Subject: `Reset your VERGR password`

---

## STEP 9: Set Up Stripe (Later — When Wiring Payments)

1. Create Stripe account at stripe.com
2. Enable Stripe Connect (for creator payouts)
3. Get API keys (test mode first)
4. Add keys to Firebase Functions config:
```bash
firebase functions:config:set stripe.secret="sk_test_..." stripe.webhook_secret="whsec_..."
```

---

## Firebase Project Summary

| Service | Status | Notes |
|---------|--------|-------|
| Authentication | Enable manually | Email + Google + Apple |
| Firestore | Deploy rules + indexes | 35+ collections |
| Storage | Deploy rules | User uploads, media |
| Functions | Deploy code | Coin economy, notifications, moderation |
| Hosting | Deploy later | React app |
| Cloud Messaging | Auto-enabled | Push notifications |
| Remote Config | Optional | Feature flags |
