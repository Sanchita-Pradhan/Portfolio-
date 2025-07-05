import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

@app.route('/')
def home():
    """Home page with welcome message and introduction"""
    return render_template('home.html')



@app.route('/about')
def about():
    """About page with bio, education, and achievements"""
    return render_template('about.html')

@app.route('/projects')
def projects():
    """Projects page showcasing portfolio projects"""
    # Project data based on the provided information
    projects = [
        {
            'title': 'News Website',
            'description': 'Designed and developed a functional website for real-time news updates, enhancing web development skills and content management.',
            'tech_stack': ['HTML', 'CSS', 'JavaScript', 'Web Development'],
            'github_link': '#',
            'demo_link': '#'
        },
        {
            'title': 'Calculator Application',
            'description': 'A mini project featuring a functional calculator with clean UI and smooth interactions.',
            'tech_stack': ['JavaScript', 'HTML', 'CSS'],
            'github_link': '#',
            'demo_link': '#'
        },
        {
            'title': 'Fun Games Collection',
            'description': 'Interactive games developed to practice programming concepts and user interface design.',
            'tech_stack': ['JavaScript', 'HTML5', 'CSS3'],
            'github_link': '#',
            'demo_link': '#'
        },
        {
            'title': 'Food Recipe Web App',
            'description': 'A full-stack web application for browsing and managing food recipes with user-friendly interface.',
            'tech_stack': ['HTML', 'CSS', 'JavaScript', 'Full Stack Development'],
            'github_link': '#',
            'demo_link': '#'
        },
        {
            'title': 'Personal Portfolio',
            'description': 'Modern, animated personal portfolio website built with Flask showcasing skills and projects.',
            'tech_stack': ['Flask', 'Python', 'HTML', 'CSS', 'Bootstrap'],
            'github_link': '#',
            'demo_link': '#'
        }
    ]
    return render_template('projects.html', projects=projects)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page with form and contact information"""
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # In a real application, you would process the form data
        # For now, just show a success message
        if name and email and message:
            flash('Thank you for your message! I will get back to you soon.', 'success')
        else:
            flash('Please fill in all fields.', 'error')
        
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
