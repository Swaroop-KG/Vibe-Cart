# 🛒 Vibe Cart - E-Commerce Shopping Cart

✅ **Project is 100% Complete and Ready to Use!**

A full-stack shopping cart application with React, Express, and MongoDB featuring smart quantity controls and local product images.

## ✨ Features

✅ **Product Display**
- 10 products with images from `frontend/public/images/`
- Responsive grid layout
- Product images, names, prices, and descriptions

✅ **Smart Cart System**
- Add to cart with one click
- **Quantity controls (- / + buttons) automatically appear when item is in cart**
- Real-time cart count in header
- Persistent cart stored in MongoDB

✅ **Cart Management**
- Slide-out cart drawer
- Thumbnail images for each item
- Adjust quantities with +/- buttons
- Remove individual items
- Real-time total calculation

✅ **Checkout**
- Simple checkout form (name & email)
- Order confirmation with receipt
- Mock payment system

Tech
- Frontend: React (Vite), TailwindCSS
- Backend: Node, Express, Mongoose
- DB: MongoDB (Atlas or local)

Monorepo structure
- /backend – Express API + MongoDB
- /frontend – React + Tailwind app

## 🚀 Quick Start

### Option 1: Run with Script (Easiest)

```powershell
cd C:\Users\swaroop\vibe-cart
.\start.ps1
```

This automatically:
- Installs dependencies
- Starts backend (port 5000)
- Starts frontend (port 5173)
- Opens browser to http://localhost:5173

### Option 2: Manual Start

**Prerequisites:** Node.js 18+, MongoDB running

**Terminal 1 - Backend:**
```powershell
cd backend
npm install
npm run seed:reset  # Seed database with products
npm start           # or npm run dev for auto-reload
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm install
npm run dev
```

**Browser:** Open http://localhost:5173

## 🎯 How It Works

1. **Browse Products** - View all 10 products with images
2. **Add to Cart** - Click "Add to Cart" button
3. **Quantity Controls Appear** - Button transforms to **[ - ] [ qty ] [ + ]**
4. **Adjust Quantity** - Click + to increase, - to decrease
5. **View Cart** - Click "Cart (N)" in header to open cart drawer
6. **Checkout** - Enter name/email and complete order

Environment variables (backend/.env)
- MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/vibe
- PORT=5000
- CORS_ORIGIN=http://localhost:5173

## 🖼️ Product Images

All 10 product images are in `frontend/public/images/`:

1. **tee.jpg** - Vibe Tee ($19.99)
2. **hoodie.jpg** - Vibe Hoodie ($39.99)
3. **cap.jpg** - Vibe Cap ($14.99)
4. **bottle.jpg** - Water Bottle ($12.50)
5. **stickers.jpg** - Sticker Pack ($4.99)
6. **sneakers.png** - Sneakers ($59.99)
7. **sunglasses.jpg** - Sunglasses ($24.99)
8. **watch.jpg** - Wrist Watch ($89.00)
9. **sleeve.jpg** - Laptop Sleeve ($29.99)

Images are served by backend at: `http://localhost:5000/images/*`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | Get all products |
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add item to cart |
| PATCH | `/api/cart` | Update item quantity |
| DELETE | `/api/cart/:productId` | Remove item |
| POST | `/api/checkout` | Process checkout |
| GET | `/images/:filename` | Serve product images |

Notes
- This app uses a fixed mock user id ("demo-user") to keep state on the server.
- Seed script inserts sample products when collection is empty.

Scripts
- backend: npm run dev, npm run seed, npm start
- frontend: npm run dev, npm run build, npm run preview

## 🐛 Troubleshooting

### Images not showing?
- Ensure backend is running on port 5000
- Check images exist in `frontend/public/images/`
- Verify: `http://localhost:5000/images/tee.jpg`

### Products not loading?
- Check MongoDB connection in `backend/.env`
- Run `npm run seed:reset` to re-seed database

### Cart not updating?
- Verify both servers are running
- Check browser console for errors
- Clear browser cache

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[FEATURES.md](FEATURES.md)** - Complete feature documentation
- **[start.ps1](start.ps1)** - Quick start script

## 🎉 Status

✅ **Project is 100% Complete and Ready to Use!**

All features implemented:
- ✅ Product images from `frontend/public/images/`
- ✅ Backend serves static images
- ✅ Smart quantity controls on product cards
- ✅ Full cart management with +/- buttons
- ✅ Checkout flow with order confirmation
- ✅ Database seeded with 10 products
- ✅ Professional UI/UX

## 📄 License

MIT - Demo project for educational purposes

---

**Built with ❤️ for Vibe Commerce**
