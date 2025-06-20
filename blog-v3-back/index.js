const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.SESSION_DB_URI;

console.log("🔌 Connecting to DB:", MONGO_URI);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connection successful"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    collectionName: "sessions",
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  mobile: Number
});

const textSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Plugins & Models
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
const Text = mongoose.model("Text", textSchema);

// Passport Config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get("/current_user", (req, res) => {
  res.json({ user: req.isAuthenticated() ? req.user : null });
});

app.post("/register", (req, res, next) => {
  const { name, username, mobile, password } = req.body;
  const newUser = new User({ name, username, mobile });

  User.register(newUser, password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ user });
    });
  });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ user: req.user });
});

app.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(err => {
      if (err) return next(err);
      res.json({ message: "Logout successful" });
    });
  });
});

app.get("/posts", (req, res) => {
  Text.find()
    .then(posts => res.json(posts))
    .catch(() => res.status(500).json({ error: "Failed to fetch posts" }));
});

app.post("/compose", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { title, content } = req.body;
  const newPost = new Text({
    title,
    content,
    author: req.user.name || req.user.username,
    authorId: req.user._id
  });

  newPost.save()
    .then(() => res.status(200).send("Text Saved Successfully"))
    .catch(() => res.status(500).send("Failed to save text"));
});

app.patch("/posts/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const post = await Text.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author !== req.user.name && post.author !== req.user.username) {
      return res.status(403).json({ error: "Forbidden: You can only edit your own posts." });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch {
    res.status(500).json({ error: "Failed to update post" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const post = await Text.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author !== req.user.name && post.author !== req.user.username) {
      return res.status(403).json({ error: "Forbidden: You can only delete your own posts." });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Start server with error handling
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try another port or stop the running process.`);
    process.exit(1);
  } else {
    console.error('❌ Server failed to start:', err);
  }
});
