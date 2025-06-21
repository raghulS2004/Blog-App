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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.SESSION_DB_URI;
const isLocalhost = process.env.NODE_ENV !== 'production';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'https://blog-app-im5z.vercel.app', // Your main deployed frontend
];

// Allow all *.vercel.app subdomains of your project
const dynamicVercelPattern = /^https:\/\/blog-app-im5z.*\.vercel\.app$/;

app.use(cors({
  origin: function (origin, callback) {
    console.log("🌐 CORS origin trying to access:", origin);
    if (!origin || allowedOrigins.includes(origin) || dynamicVercelPattern.test(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



// Trust proxy (important for cookies on Render)
app.set('trust proxy', 1);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // important for JSON parsing

// Session setup
app.use(session({
  secret: process.env.SECRET || 'defaultsecret',
  resave: true,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: !isLocalhost,
    httpOnly: true,
    sameSite: !isLocalhost ? 'none' : 'lax',
    maxAge: 14 * 24 * 60 * 60 * 1000
  },
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60
  })
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  mobile: Number
});
userSchema.plugin(passportLocalMongoose);

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

const User = mongoose.model("User", userSchema);
const Text = mongoose.model("Text", textSchema);

// Passport strategies
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user || false))
    .catch(err => done(err));
});

// Debug logger
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.path}`);
  console.log('🔍 Session ID:', req.sessionID);
  console.log('🔍 Authenticated:', req.isAuthenticated());
  console.log('🔍 Cookies:', req.headers.cookie);
  next();
});

// Routes
app.get("/current_user", (req, res) => {
  res.json({ user: req.isAuthenticated() ? req.user : null });
});

app.get("/session-debug", (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    session: req.session,
    user: req.user,
    sessionID: req.sessionID
  });
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

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return next(err);
      req.session.save((err) => {
        if (err) return next(err);
        console.log("✅ Login successful - Session ID:", req.sessionID);
        res.status(200).json({ user });
      });
    });
  })(req, res, next);
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
    console.log("❌ Unauthorized compose attempt");
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
    .then(() => {
      console.log("✅ Post saved successfully by:", req.user.username);
      res.status(200).json({ message: "Post saved successfully" });
    })
    .catch(err => {
      console.error("❌ Error saving post:", err);
      res.status(500).json({ error: "Failed to save post" });
    });
});

app.patch("/posts/:id", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });

  try {
    const post = await Text.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author !== req.user.name && post.author !== req.user.username) {
      return res.status(403).json({ error: "Forbidden" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.json({ message: "Post updated", post });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });

  try {
    const post = await Text.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author !== req.user.name && post.author !== req.user.username) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} already in use`);
    process.exit(1);
  } else {
    console.error('❌ Server failed to start:', err);
  }
});
