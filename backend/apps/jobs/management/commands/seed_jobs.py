from django.core.management.base import BaseCommand
from apps.jobs.models import Job

class Command(BaseCommand):
    help = 'Prepopulates the MongoDB database with sample jobs'

    def handle(self, *args, **kwargs):
        sample_jobs = [
            {
                "title": "Frontend Developer (React)",
                "company": "Google",
                "location": "Bangalore (Hybrid)",
                "salary": "₹1,800,000 - ₹2,400,000 /yr",
                "tags": ["React", "TypeScript", "TailwindCSS", "JavaScript", "Git"],
                "logo_letter": "G",
                "logo_bg": "bg-red-500"
            },
            {
                "title": "Software Engineer Intern",
                "company": "Microsoft",
                "location": "Hyderabad (Remote)",
                "salary": "₹80,000 /mo",
                "tags": ["JavaScript", "Node.js", "Python", "Git", "SQL"],
                "logo_letter": "M",
                "logo_bg": "bg-blue-600"
            },
            {
                "title": "React Developer",
                "company": "Synent Technologies",
                "location": "Ahmedabad (Onsite)",
                "salary": "₹600,000 - ₹900,000 /yr",
                "tags": ["React", "Redux", "REST APIs", "JavaScript", "HTML", "CSS"],
                "logo_letter": "S",
                "logo_bg": "bg-indigo-600"
            },
            {
                "title": "Full Stack Engineer",
                "company": "Razorpay",
                "location": "Bangalore (Onsite)",
                "salary": "₹1,200,000 - ₹1,800,000 /yr",
                "tags": ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Docker"],
                "logo_letter": "R",
                "logo_bg": "bg-sky-500"
            },
            {
                "title": "Backend Developer (Django & Python)",
                "company": "Amazon",
                "location": "Chennai (Hybrid)",
                "salary": "₹1,500,000 - ₹2,200,000 /yr",
                "tags": ["Python", "Django", "SQL", "AWS", "Docker", "Git"],
                "logo_letter": "A",
                "logo_bg": "bg-orange-500"
            },
            {
                "title": "Junior Python Developer",
                "company": "TCS",
                "location": "Pune (Onsite)",
                "salary": "₹400,000 - ₹600,000 /yr",
                "tags": ["Python", "SQL", "Git", "HTML", "CSS"],
                "logo_letter": "T",
                "logo_bg": "bg-blue-500"
            },
            {
                "title": "DevOps Engineer",
                "company": "Infosys",
                "location": "Mumbai (Hybrid)",
                "salary": "₹1,000,000 - ₹1,400,000 /yr",
                "tags": ["AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Python"],
                "logo_letter": "I",
                "logo_bg": "bg-teal-600"
            },
            {
                "title": "UI Engineer",
                "company": "Adobe",
                "location": "Noida (Hybrid)",
                "salary": "₹1,600,000 - ₹2,200,000 /yr",
                "tags": ["React", "JavaScript", "CSS", "Tailwind", "Git"],
                "logo_letter": "A",
                "logo_bg": "bg-red-600"
            }
        ]

        created_count = 0
        for job_data in sample_jobs:
            job, created = Job.objects.get_or_create(
                title=job_data["title"],
                company=job_data["company"],
                defaults=job_data
            )
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {created_count} new sample jobs.'))
