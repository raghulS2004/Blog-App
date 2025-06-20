import React from "react";
import './css/about.css';

function About() {
    return (
        <section className="about-section blog-about-bg fade-in">
            <div className="container about-container blog-about-container">
                <div className="blog-about-logo">
                    <span role="img" aria-label="blog icon" className="blog-about-icon">📝</span>
                </div>
                <h1 className="about-heading">Welcome to DevThoughts Blog</h1>
                <h2 className="about-subheading">What This Blog Is All About</h2>
                <p className="about-mission">
                    <em>“Empowering developers and tech enthusiasts to learn, share, and grow together.”</em>
                </p>
                <p>
                    <b>DevThoughts Blog</b> is a space dedicated to <b>tech articles</b>, <b>personal thoughts</b>, <b>tutorials</b>, and <b>opinions</b> on all things software and technology. Whether you're a developer, student, or curious tech reader, you'll find practical guides, deep dives, and honest reflections here.
                </p>
                <p>
                    Our goal is to <b>share knowledge</b>, <b>express ideas</b>, and <b>build a welcoming community</b> for anyone passionate about technology. We believe in open learning, thoughtful discussion, and helping each other grow.
                </p>
                <p>
                    <b>Who is this blog for?</b> Anyone interested in web development, programming, new tech trends, or simply looking for inspiration and advice on their coding journey.
                </p>
                <p>
                    <b>Looking ahead:</b> We aim to expand with more collaborative posts, guest articles, and interactive content to make learning and sharing even more engaging.
                </p>
                <div className="about-cta">
                    <a href="/" className="about-link about-cta-btn">Explore Posts</a>
                </div>
        </div>
        </section>
    );
}

export default About;