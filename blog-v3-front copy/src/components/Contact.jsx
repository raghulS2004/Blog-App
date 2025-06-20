import React, { useState } from "react";
import './css/about.css';
import './css/contact.css';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Full Name is required.';
        if (!form.email.trim()) {
            errs.email = 'Email is required.';
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
            errs.email = 'Enter a valid email address.';
        }
        if (!form.message.trim()) errs.message = 'Message is required.';
        return errs;
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        // Optionally, send to backend here
        setStatus('Thank you for reaching out! I will get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTimeout(() => setStatus(''), 5000);
    }

    return (
        <div className="contact-section fade-in">
            <div className="container contact-container">
                <h1 className="contact-heading">Get in Touch</h1>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Full Name<span>*</span></label>
                        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} autoComplete="off" />
                        {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address<span>*</span></label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} autoComplete="off" />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message<span>*</span></label>
                        <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} />
                        {errors.message && <div className="form-error">{errors.message}</div>}
                    </div>
                    <button type="submit" className="contact-btn">Send Message</button>
                    {status && <div className="form-success">{status}</div>}
                </form>
                
            </div>
        </div>
    );
}

export default Contact;