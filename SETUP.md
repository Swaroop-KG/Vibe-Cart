# Vibe Cart - Complete Setup Guide

## ✅ Project is Ready!

Your e-commerce cart application is fully configured with:
- ✅ Product images from `frontend/public/images` folder
- ✅ Backend serving static images
- ✅ Quantity controls (- and +) on product cards when items are in cart
- ✅ Database seeded with 10 products
- ✅ Full cart functionality

## 🚀 How to Run the Project

### Prerequisites
- Node.js installed
- MongoDB running (local or cloud)

### Step 1: Start the Backend

```powershell
cd C:\Users\swaroop\vibe-cart\backend
npm install
npm start
```

The backend will run on: **http://localhost:5000**

### Step 2: Start the Frontend

Open a new terminal:

```powershell
cd C:\Users\swaroop\vibe-cart\frontend
npm install
npm run dev
```

The frontend will run on: **http://localhost:5173**

### Step 3: Open in Browser

Navigate to: **http://localhost:5173**

## 🎯 Features

### Product Cards
- Displays all 10 products with images from `public/images`
- **"Add to Cart"** button when product not in cart
- **Quantity controls (- / number / +)** when product is already in cart
- Fallback placeholder images if any image fails to load

### Cart Functionality
- Click "Cart" button in header to open cart drawer
- View all items with thumbnails
- Adjust quantities with +/- buttons
- Remove items
- See real-time total calculation
- Checkout with name and email

### Images
All product images are served from: `frontend/public/images/`
- tee.jpg
- hoodie.jpg
- cap.jpg
- bottle.jpg
- stickers.jpg
- sneakers.png
- sunglasses.jpg
- watch.jpg
- sleeve.jpg

## 🔧 Useful Commands

### Backend Commands
```powershell
cd C:\Users\swaroop\vibe-cart\backend

# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Seed database (only if empty)
npm run seed

# Reset and re-seed database
npm run seed:reset
```

### Frontend Commands
```powershell
cd C:\Users\swaroop\vibe-cart\frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 How It Works

1. **Add to Cart**: Click "Add to Cart" on any product
2. **Quantity Controls Appear**: The button changes to show - / number / +
3. **Adjust Quantity**: 
   - Click **+** to increase quantity
   - Click **-** to decrease quantity
   - When quantity reaches 0, button changes back to "Add to Cart"
4. **View Cart**: Click "Cart" in header to see all items
5. **Checkout**: Click "Checkout" button in cart drawer

## 📁 Project Structure

```
vibe-cart/
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── seed/         # Database seeding
│   │   │   └── data.js   # Product data with image paths
│   │   └── index.js      # Express server (serves images)
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── images/       # Product images (served statically)
    ├── src/
    │   ├── components/   # React components
    │   │   ├── ProductCard.jsx    # Shows quantity controls
    │   │   ├── CartDrawer.jsx     # Cart sidebar
    │   │   └── CartItem.jsx       # Cart item with controls
    │   ├── pages/
    │   │   └── ProductsPage.jsx   # Product grid
    │   ├── hooks/
    │   │   └── useCart.js         # Cart state management
    │   └── App.jsx
    └── package.json
```

## 🐛 Troubleshooting

### Images not showing?
1. Make sure backend is running on port 5000
2. Check that images exist in `frontend/public/images/`
3. Try accessing directly: http://localhost:5000/images/tee.jpg

### Products not loading?
1. Check MongoDB connection in `backend/.env`
2. Run `npm run seed:reset` to re-seed the database
3. Check browser console for errors

### Cart not updating?
1. Make sure both frontend and backend are running
2. Check browser console for API errors
3. Verify MongoDB is running

## 🎉 You're All Set!

Your Vibe Cart application is fully functional with:
- Beautiful product display with real images
- Smart quantity controls that appear when items are in cart
- Full shopping cart functionality
- Checkout flow

Enjoy your e-commerce application!
