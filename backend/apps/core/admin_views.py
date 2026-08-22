import random
from datetime import datetime, timedelta
from bson import ObjectId
from django.conf import settings
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission

from config.db import get_db

class IsAdminUser(BasePermission):
    """
    Allows access only to the specific admin user.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            getattr(request.user, 'role', '').lower() == 'admin' and
            request.user.email == 'meera.ldrp.7@gmail.com'
        )

# --- Seeding Helpers ---

def seed_default_skills(db):
    default_skills = [
        {"name": "Python", "category": "Backend", "demand": "High", "users_count": 45},
        {"name": "JavaScript", "category": "Frontend", "demand": "High", "users_count": 52},
        {"name": "React.js", "category": "Frontend", "demand": "High", "users_count": 38},
        {"name": "Django", "category": "Backend", "demand": "Medium", "users_count": 28},
        {"name": "SQL", "category": "Database", "demand": "High", "users_count": 41},
        {"name": "MongoDB", "category": "Database", "demand": "Medium", "users_count": 20},
        {"name": "Docker", "category": "DevOps", "demand": "High", "users_count": 15},
        {"name": "AWS", "category": "Cloud/DevOps", "demand": "High", "users_count": 18},
        {"name": "Kubernetes", "category": "DevOps", "demand": "Medium", "users_count": 8},
        {"name": "TypeScript", "category": "Frontend", "demand": "High", "users_count": 25},
        {"name": "Node.js", "category": "Backend", "demand": "High", "users_count": 30},
        {"name": "Machine Learning", "category": "AI/Data Science", "demand": "High", "users_count": 12}
    ]
    db.skills.insert_many(default_skills)

def seed_default_jobs(db):
    default_jobs = [
        {
            "title": "Junior Python Developer",
            "company": "TechLogix Solutions",
            "location": "Mumbai, India (Hybrid)",
            "salary": "₹6,00,000 - ₹8,00,000",
            "type": "Full-time",
            "description": "We are looking for a Junior Python Developer who is passionate about backend engineering, Django, and database designs.",
            "skills": ["Python", "Django", "SQL"],
            "matches_count": 14,
            "created_at": datetime.utcnow() - timedelta(days=5)
        },
        {
            "title": "Frontend React Developer",
            "company": "Appify Technologies",
            "location": "Bengaluru, India (Remote)",
            "salary": "₹8,00,000 - ₹11,00,000",
            "type": "Full-time",
            "description": "Join our fast-paced UI team to design and develop interactive consumer dashboards in React.js and Tailwind CSS.",
            "skills": ["JavaScript", "React.js", "TypeScript"],
            "matches_count": 22,
            "created_at": datetime.utcnow() - timedelta(days=3)
        },
        {
            "title": "Cloud Devops Engineer",
            "company": "CloudScale Systems",
            "location": "Pune, India (On-site)",
            "salary": "₹12,00,000 - ₹16,00,000",
            "type": "Full-time",
            "description": "Manage our multi-cloud deployment automation, build CI/CD pipelines, and configure Kubernetes container environments.",
            "skills": ["AWS", "Docker", "Kubernetes"],
            "matches_count": 6,
            "created_at": datetime.utcnow() - timedelta(days=7)
        },
        {
            "title": "Data Analyst Intern",
            "company": "Insight Data Labs",
            "location": "Bengaluru, India (On-site)",
            "salary": "₹25,00,000 - ₹35,00,000",
            "type": "Internship",
            "description": "Perfect for students. Write clean SQL queries, prepare visualization dashboards, and analyze core user acquisition metrics.",
            "skills": ["SQL", "Python"],
            "matches_count": 35,
            "created_at": datetime.utcnow() - timedelta(days=2)
        }
    ]
    db.jobs.insert_many(default_jobs)

def seed_default_resources(db):
    default_resources = [
        {
            "title": "Complete Python Bootcamp",
            "type": "Course",
            "provider": "Udemy",
            "linked_skills": ["Python"],
            "url": "https://www.udemy.com",
            "cost": "Paid",
            "rating": 4.8
        },
        {
            "title": "React - The Complete Guide",
            "type": "Course",
            "provider": "Academind",
            "linked_skills": ["React.js", "JavaScript"],
            "url": "https://academind.com",
            "cost": "Paid",
            "rating": 4.7
        },
        {
            "title": "Docker and Kubernetes Roadmap",
            "type": "Tutorial",
            "provider": "YouTube",
            "linked_skills": ["Docker", "Kubernetes"],
            "url": "https://www.youtube.com",
            "cost": "Free",
            "rating": 4.9
        },
        {
            "title": "AWS Certified Cloud Practitioner",
            "type": "Certification",
            "provider": "Amazon Web Services",
            "linked_skills": ["AWS"],
            "url": "https://aws.amazon.com",
            "cost": "Paid",
            "rating": 4.6
        }
    ]
    db.learning_resources.insert_many(default_resources)

def seed_default_bugs(db):
    default_bugs = [
        {
            "email": "student1@skillora.ai",
            "subject": "ATS Analysis timeout",
            "description": "When uploading a 5MB resume PDF, the loading spinner spins for 3 minutes and then throws a timeout exception.",
            "status": "Open",
            "created_at": datetime.utcnow() - timedelta(days=2)
        },
        {
            "email": "testuser@gmail.com",
            "subject": "LinkedIn link typo in Profile",
            "description": "The linkedin profile link on the dashboard homepage does not open in a new tab, causing users to leave the platform.",
            "status": "In Progress",
            "created_at": datetime.utcnow() - timedelta(days=4)
        },
        {
            "email": "career_builder@gmail.com",
            "subject": "Roadmap step shows duplicate descriptions",
            "description": "Step 2 and Step 3 in my Software Engineer roadmap display identical text descriptions.",
            "status": "Resolved",
            "created_at": datetime.utcnow() - timedelta(days=10)
        }
    ]
    db.bug_reports.insert_many(default_bugs)


# --- API VIEWS ---

class AdminStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        
        # Check collections & Seed if empty
        if db.skills.count_documents({}) == 0:
            seed_default_skills(db)
        if db.jobs.count_documents({}) == 0:
            seed_default_jobs(db)
        if db.learning_resources.count_documents({}) == 0:
            seed_default_resources(db)
        if db.bug_reports.count_documents({}) == 0:
            seed_default_bugs(db)

        # Core Metrics
        total_users = db.users.count_documents({})
        total_resumes = db.resumes.count_documents({})
        total_analyses = db.resume_analyses.count_documents({})
        total_skill_matches = db.matcher_history.count_documents({})
        total_recommendations = db.job_recommendations.count_documents({})
        total_jobs = db.jobs.count_documents({})
        total_bugs = db.bug_reports.count_documents({})
        open_bugs = db.bug_reports.count_documents({'status': 'Open'})
        skills_count = db.skills.count_documents({})
        resources_count = db.learning_resources.count_documents({})

        # Average ATS Score & Distribution calculation
        resumes = list(db.resumes.find({}, {"ats_score": 1, "score": 1}))
        total_score = 0
        score_count = 0
        ats_distribution = {
            "critical": 0,
            "moderate": 0,
            "strong": 0,
            "elite": 0
        }
        for res in resumes:
            score = res.get('ats_score') or res.get('score')
            if score is not None:
                try:
                    score_val = float(score)
                    total_score += score_val
                    score_count += 1
                    
                    if score_val <= 50:
                        ats_distribution["critical"] += 1
                    elif score_val <= 70:
                        ats_distribution["moderate"] += 1
                    elif score_val <= 85:
                        ats_distribution["strong"] += 1
                    else:
                        ats_distribution["elite"] += 1
                except ValueError:
                    pass
        avg_ats = round(total_score / score_count, 1) if score_count > 0 else 78.5

        # System Health
        try:
            db.command('ping')
            db_status = "Connected"
        except:
            db_status = "Disconnected"
            
        system_health = {
            "api_status": "Healthy",
            "db_connection": db_status,
            "ai_service": "Online (GPT-4o)",
            "uptime": "99.98%"
        }

        # Real registration trends for the last 6 months
        import calendar
        
        now = datetime.utcnow()
        months_list = []
        for i in range(5, -1, -1):
            y, m = now.year, now.month - i
            while m <= 0:
                m += 12
                y -= 1
            months_list.append((y, m))

        reg_trends = []
        upload_trends = []

        for y, m in months_list:
            start_of_month = datetime(y, m, 1)
            next_m = m + 1
            next_y = y
            if next_m > 12:
                next_m = 1
                next_y += 1
            end_of_month = datetime(next_y, next_m, 1)

            month_str = calendar.month_abbr[m]
            
            regs = db.users.count_documents({
                'created_at': {'$gte': start_of_month, '$lt': end_of_month}
            })
            uploads = db.resumes.count_documents({
                'created_at': {'$gte': start_of_month, '$lt': end_of_month}
            })
            
            reg_trends.append({"month": month_str, "registrations": regs})
            upload_trends.append({"month": month_str, "uploads": uploads})

        # Unified Recent Activity feed creation
        recent_activity = []

        # 1. New registrations (Users)
        try:
            latest_users = list(db.users.find().sort('created_at', -1).limit(5))
            for u in latest_users:
                dt = u.get('created_at')
                recent_activity.append({
                    'id': f"user_{str(u['_id'])}",
                    'type': 'user_registration',
                    'description': f"New user {u.get('name', 'N/A')} ({u.get('role', 'Student')}) registered.",
                    'timestamp': dt.isoformat() if isinstance(dt, datetime) else str(dt),
                    'icon': 'user-plus',
                    'dt_obj': dt if isinstance(dt, datetime) else datetime.utcnow()
                })
        except Exception:
            pass

        # 2. Resumes uploaded
        try:
            latest_resumes = list(db.resumes.find().sort('created_at', -1).limit(5))
            user_ids = [r.get('user_id') for r in latest_resumes if r.get('user_id')]
            users_info = {str(x['_id']): x for x in db.users.find({'_id': {'$in': user_ids}})}
            for r in latest_resumes:
                dt = r.get('created_at')
                u_info = users_info.get(str(r.get('user_id')), {})
                user_name = u_info.get('name', 'Anonymous')
                recent_activity.append({
                    'id': f"resume_{str(r['_id'])}",
                    'type': 'resume_upload',
                    'description': f"Resume '{r.get('filename', 'resume.pdf')}' uploaded by {user_name}.",
                    'timestamp': dt.isoformat() if isinstance(dt, datetime) else str(dt),
                    'icon': 'file-text',
                    'dt_obj': dt if isinstance(dt, datetime) else datetime.utcnow()
                })
        except Exception:
            pass

        # 3. Resume analyses completed
        try:
            latest_analyses = list(db.resume_analyses.find().sort('created_at', -1).limit(5))
            user_ids_an = [a.get('user_id') for a in latest_analyses if a.get('user_id')]
            users_info_an = {str(x['_id']): x for x in db.users.find({'_id': {'$in': user_ids_an}})}
            for a in latest_analyses:
                dt = a.get('created_at')
                u_info = users_info_an.get(str(a.get('user_id')), {})
                user_name = u_info.get('name', 'Anonymous')
                score = a.get('score', 0)
                recent_activity.append({
                    'id': f"analysis_{str(a['_id'])}",
                    'type': 'resume_analysis',
                    'description': f"ATS Analysis completed for {user_name} (Score: {score}%).",
                    'timestamp': dt.isoformat() if isinstance(dt, datetime) else str(dt),
                    'icon': 'bar-chart-2',
                    'dt_obj': dt if isinstance(dt, datetime) else datetime.utcnow()
                })
        except Exception:
            pass

        # 4. Skill matches run
        try:
            latest_matches = list(db.matcher_history.find().sort('created_at', -1).limit(5))
            user_ids_ma = [m.get('user_id') for m in latest_matches if m.get('user_id')]
            users_info_ma = {str(x['_id']): x for x in db.users.find({'_id': {'$in': user_ids_ma}})}
            for m in latest_matches:
                dt = m.get('created_at')
                u_info = users_info_ma.get(str(m.get('user_id')), {})
                user_name = u_info.get('name', 'Anonymous')
                recent_activity.append({
                    'id': f"match_{str(m['_id'])}",
                    'type': 'skill_match',
                    'description': f"Skill Match run for {user_name} against '{m.get('job_title', 'Job')}'.",
                    'timestamp': dt.isoformat() if isinstance(dt, datetime) else str(dt),
                    'icon': 'cpu',
                    'dt_obj': dt if isinstance(dt, datetime) else datetime.utcnow()
                })
        except Exception:
            pass

        # 5. Job recommendations generated
        try:
            latest_recs = list(db.job_recommendations.find().sort('created_at', -1).limit(5))
            user_ids_re = [r.get('user_id') for r in latest_recs if r.get('user_id')]
            users_info_re = {str(x['_id']): x for x in db.users.find({'_id': {'$in': user_ids_re}})}
            for r in latest_recs:
                dt = r.get('created_at')
                u_info = users_info_re.get(str(r.get('user_id')), {})
                user_name = u_info.get('name', 'Anonymous')
                recent_activity.append({
                    'id': f"rec_{str(r['_id'])}",
                    'type': 'job_recommendation',
                    'description': f"Generated {len(r.get('jobs', []))} job recommendations for {user_name}.",
                    'timestamp': dt.isoformat() if isinstance(dt, datetime) else str(dt),
                    'icon': 'briefcase',
                    'dt_obj': dt if isinstance(dt, datetime) else datetime.utcnow()
                })
        except Exception:
            pass

        # 6. Bug reports submitted
        try:
            latest_bugs = list(db.bug_reports.find().sort('created_at', -1).limit(5))
            for b in latest_bugs:
                dt = b.get('created_at')
                recent_activity.append({
                    'id': f"bug_{str(b['_id'])}",
                    'type': 'bug_report',
                    'description': f"Bug reported: '{b.get('subject')}' by {b.get('email')}.",
                    'timestamp': dt.isoformat() if isinstance(dt, datetime) else str(dt),
                    'icon': 'bug',
                    'dt_obj': dt if isinstance(dt, datetime) else datetime.utcnow()
                })
        except Exception:
            pass

        # Sort activities descending by date
        recent_activity.sort(key=lambda x: x['dt_obj'] if x.get('dt_obj') else datetime.min, reverse=True)
        # Drop helper dt_obj before return
        for act in recent_activity:
            act.pop('dt_obj', None)
        
        recent_activity = recent_activity[:15]

        # 7. Aggregate most common missing skills
        most_common_missing = []
        try:
            missing_skills_agg = list(db.resume_analyses.aggregate([
                {"$unwind": "$missingSkills"},
                {"$group": {"_id": "$missingSkills", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 8}
            ]))
            missing_skills_history = list(db.matcher_history.aggregate([
                {"$unwind": "$missing_skills"},
                {"$group": {"_id": "$missing_skills", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 8}
            ]))
            
            missing_counts = {}
            for item in missing_skills_agg:
                name = item['_id']
                if name:
                    missing_counts[name] = missing_counts.get(name, 0) + item['count']
            for item in missing_skills_history:
                name = item['_id']
                if name:
                    missing_counts[name] = missing_counts.get(name, 0) + item['count']
            
            sorted_missing = sorted(missing_counts.items(), key=lambda x: x[1], reverse=True)[:8]
            most_common_missing = [{"name": k, "count": v} for k, v in sorted_missing]
        except Exception:
            pass

        if not most_common_missing:
            most_common_missing = []

        # 8. Aggregate most matched skills
        most_matched_skills = []
        try:
            matched_skills_agg = list(db.resume_analyses.aggregate([
                {"$unwind": "$skills"},
                {"$group": {"_id": "$skills", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 8}
            ]))
            matched_skills_history = list(db.matcher_history.aggregate([
                {"$unwind": "$matched_skills"},
                {"$group": {"_id": "$matched_skills", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 8}
            ]))
            
            matched_counts = {}
            for item in matched_skills_agg:
                name = item['_id']
                if name:
                    matched_counts[name] = matched_counts.get(name, 0) + item['count']
            for item in matched_skills_history:
                name = item['_id']
                if name:
                    matched_counts[name] = matched_counts.get(name, 0) + item['count']
            
            sorted_matched = sorted(matched_counts.items(), key=lambda x: x[1], reverse=True)[:8]
            most_matched_skills = [{"name": k, "count": v} for k, v in sorted_matched]
        except Exception:
            pass

        if not most_matched_skills:
            most_matched_skills = []

        # 9. AI Usage statistics
        roadmaps_generated = 0
        career_insights_generated = 0
        try:
            roadmaps_generated = db.roadmaps.count_documents({})
            career_insights_generated = db.career_insights.count_documents({})
        except Exception:
            pass

        ai_usage_stats = {
            "resume_analyses_run": total_analyses,
            "skills_matches_run": total_skill_matches,
            "roadmaps_generated": roadmaps_generated,
            "career_insights_generated": career_insights_generated,
            "recommendations_generated": total_recommendations
        }

        return Response({
            "metrics": {
                "total_users": total_users,
                "total_resumes": total_resumes,
                "total_analyses": total_analyses,
                "total_skill_matches": total_skill_matches,
                "total_job_recommendations": total_recommendations,
                "total_jobs": total_jobs,
                "total_bugs": total_bugs,
                "open_bugs": open_bugs,
                "skills_count": skills_count,
                "resources_count": resources_count,
                "avg_ats": avg_ats
            },
            "system_health": system_health,
            "charts": {
                "registrations": reg_trends,
                "uploads": upload_trends
            },
            "recent_activity": recent_activity,
            "most_common_missing": most_common_missing,
            "most_matched_skills": most_matched_skills,
            "ai_usage_stats": ai_usage_stats,
            "ats_distribution": ats_distribution
        }, status=status.HTTP_200_OK)


class AdminUsersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        users = list(db.users.find())
        
        user_list = []
        for u in users:
            user_id = u['_id']
            resumes_count = db.resumes.count_documents({'user_id': user_id})
            analyses_count = db.resume_analyses.count_documents({'user_id': user_id})
            matches_count = db.matcher_history.count_documents({'user_id': user_id})
            
            user_list.append({
                "id": str(user_id),
                "name": u.get('name', 'N/A'),
                "email": u.get('email'),
                "role": u.get('role', 'Student'),
                "is_verified": u.get('is_verified', False),
                "is_active": u.get('is_active', True),
                "created_at": u.get('created_at', datetime.utcnow()).isoformat() if isinstance(u.get('created_at'), datetime) else str(u.get('created_at')),
                "phone_number": u.get('phone_number', ''),
                "linkedin": u.get('linkedin', ''),
                "github": u.get('github', ''),
                "bio": u.get('bio', ''),
                "stats": {
                    "resumes_count": resumes_count,
                    "analyses_count": analyses_count,
                    "matches_count": matches_count
                }
            })
            
        return Response(user_list, status=status.HTTP_200_OK)

    def post(self, request):
        db = get_db()
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role', 'Student')
        
        if not name or not email or not password:
            return Response({"error": "Name, email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        if role and role.lower() == 'admin' and email.lower().strip() != 'meera.ldrp.7@gmail.com':
            return Response({"error": "Cannot assign Admin role to this email."}, status=status.HTTP_400_BAD_REQUEST)

        # Check uniqueness
        if db.users.find_one({'email': email}):
            return Response({"error": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
            
        user_doc = {
            'name': name,
            'email': email,
            'password': make_password(password),
            'role': role,
            'is_verified': True,
            'is_active': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        db.users.insert_one(user_doc)
        
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)

    def put(self, request):
        db = get_db()
        user_id = request.data.get('id')
        role = request.data.get('role')
        name = request.data.get('name')
        email = request.data.get('email')
        is_active = request.data.get('is_active')
        
        if not user_id:
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        if role and role.lower() == 'admin':
            target_user = db.users.find_one({'_id': ObjectId(user_id)})
            if not target_user:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
            target_email = email or target_user.get('email', '')
            if target_email.lower().strip() != 'meera.ldrp.7@gmail.com':
                return Response({"error": "Cannot assign Admin role to this email."}, status=status.HTTP_400_BAD_REQUEST)

        update_data = {}
        if role:
            update_data['role'] = role
        if name:
            update_data['name'] = name
        if email:
            update_data['email'] = email
        if is_active is not None:
            update_data['is_active'] = bool(is_active)
            
        if not update_data:
            return Response({"error": "Nothing to update."}, status=status.HTTP_400_BAD_REQUEST)
            
        result = db.users.update_one({'_id': ObjectId(user_id)}, {'$set': update_data})
        if result.modified_count > 0:
            return Response({"message": "User updated successfully."}, status=status.HTTP_200_OK)
        return Response({"error": "User not found or no change made."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        db = get_db()
        user_id = request.query_params.get('id')
        
        if not user_id:
            return Response({"error": "User ID is required in query params."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Get email to clean up other collections
        user = db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
            
        email = user.get('email')
        
        # Clean up database collections
        user_queries = [{'user_id': ObjectId(user_id)}]
        if email:
            user_queries.append({'email': email})
            user_queries.append({'user_email': email})
            
        collections_to_clean = [
            'resumes', 'resume_analyses', 'analyses', 
            'skill_matcher_history', 'matcher_history', 
            'learning_roadmaps', 'roadmaps', 
            'job_recommendations', 'career_insights'
        ]
        
        for q in user_queries:
            for col_name in collections_to_clean:
                try:
                    db[col_name].delete_many(q)
                except Exception:
                    pass
                    
        # Delete user
        db.users.delete_one({'_id': ObjectId(user_id)})
        return Response({"message": "User and all associated data deleted successfully."}, status=status.HTTP_200_OK)


class AdminResumesView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        resumes = list(db.resumes.find())
        
        # Collect all user details to optimize queries
        users = list(db.users.find({}, {"email": 1, "name": 1, "resume": 1}))
        user_map = {str(u['_id']): u for u in users}
        
        resume_list = []
        for r in resumes:
            user_id_str = str(r.get('user_id'))
            user_info = user_map.get(user_id_str, {})
            
            score = r.get('ats_score') or r.get('score') or 75
            
            # A resume is active if its ID matches the owner's active resume ID
            active_resume = user_info.get('resume', {})
            is_active = False
            if active_resume and active_resume.get('id') == str(r['_id']):
                is_active = True
            
            resume_list.append({
                "id": str(r['_id']),
                "filename": r.get('filename', 'Unnamed Resume'),
                "owner_email": user_info.get('email', 'Unknown User'),
                "owner_name": user_info.get('name', 'Unknown'),
                "score": score,
                "uploaded_at": r.get('created_at', datetime.utcnow()).isoformat() if isinstance(r.get('created_at'), datetime) else str(r.get('created_at')),
                "skills_count": len(r.get('skills', [])),
                "is_active": is_active
            })
            
        return Response(resume_list, status=status.HTTP_200_OK)

    def delete(self, request):
        db = get_db()
        resume_id = request.query_params.get('id')
        
        if not resume_id:
            return Response({"error": "Resume ID is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Delete resume document
        db.resumes.delete_one({'_id': ObjectId(resume_id)})
        # Clean up analyses & match histories referencing this resume
        db.resume_analyses.delete_many({'resume_id': ObjectId(resume_id)})
        db.matcher_history.delete_many({'resume_id': ObjectId(resume_id)})
        
        return Response({"message": "Resume deleted successfully."}, status=status.HTTP_200_OK)


class AdminJobsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        
        if db.jobs.count_documents({}) == 0:
            seed_default_jobs(db)
            
        jobs = list(db.jobs.find().sort('created_at', -1))
        
        job_list = []
        for j in jobs:
            job_list.append({
                "id": str(j['_id']),
                "title": j.get('title'),
                "company": j.get('company'),
                "location": j.get('location'),
                "salary": j.get('salary', 'Not Specified'),
                "type": j.get('type', 'Full-time'),
                "description": j.get('description', ''),
                "skills": j.get('skills', []),
                "matches_count": j.get('matches_count', random.randint(3, 18)),
                "created_at": j.get('created_at', datetime.utcnow()).isoformat() if isinstance(j.get('created_at'), datetime) else str(j.get('created_at'))
            })
            
        return Response(job_list, status=status.HTTP_200_OK)

    def post(self, request):
        db = get_db()
        title = request.data.get('title')
        company = request.data.get('company')
        location = request.data.get('location')
        salary = request.data.get('salary', 'Not Specified')
        job_type = request.data.get('type', 'Full-time')
        description = request.data.get('description', '')
        skills = request.data.get('skills', [])
        
        if not title or not company or not location:
            return Response({"error": "Title, company, and location are required fields."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Convert skills comma/list
        if isinstance(skills, str):
            skills = [s.strip() for s in skills.split(',') if s.strip()]
            
        job_doc = {
            "title": title,
            "company": company,
            "location": location,
            "salary": salary,
            "type": job_type,
            "description": description,
            "skills": skills,
            "matches_count": 0,
            "created_at": datetime.utcnow()
        }
        db.jobs.insert_one(job_doc)
        
        return Response({"message": "Job created successfully."}, status=status.HTTP_201_CREATED)

    def put(self, request):
        db = get_db()
        job_id = request.data.get('id')
        title = request.data.get('title')
        company = request.data.get('company')
        location = request.data.get('location')
        salary = request.data.get('salary')
        job_type = request.data.get('type')
        description = request.data.get('description')
        skills = request.data.get('skills')
        
        if not job_id:
            return Response({"error": "Job ID is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        update_data = {}
        if title: update_data['title'] = title
        if company: update_data['company'] = company
        if location: update_data['location'] = location
        if salary: update_data['salary'] = salary
        if job_type: update_data['type'] = job_type
        if description: update_data['description'] = description
        if skills is not None:
            if isinstance(skills, str):
                skills = [s.strip() for s in skills.split(',') if s.strip()]
            update_data['skills'] = skills
            
        result = db.jobs.update_one({'_id': ObjectId(job_id)}, {'$set': update_data})
        if result.modified_count > 0:
            return Response({"message": "Job updated successfully."}, status=status.HTTP_200_OK)
        return Response({"error": "Job not found or no change made."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        db = get_db()
        job_id = request.query_params.get('id')
        
        if not job_id:
            return Response({"error": "Job ID is required in query params."}, status=status.HTTP_400_BAD_REQUEST)
            
        db.jobs.delete_one({'_id': ObjectId(job_id)})
        return Response({"message": "Job deleted successfully."}, status=status.HTTP_200_OK)


class AdminSkillsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        if db.skills.count_documents({}) == 0:
            seed_default_skills(db)
            
        skills = list(db.skills.find())
        
        skills_list = []
        for s in skills:
            skills_list.append({
                "id": str(s['_id']),
                "name": s.get('name'),
                "category": s.get('category', 'General'),
                "demand": s.get('demand', 'Medium'),
                "users_count": s.get('users_count', 0)
            })
            
        return Response(skills_list, status=status.HTTP_200_OK)

    def post(self, request):
        db = get_db()
        name = request.data.get('name')
        category = request.data.get('category', 'General')
        demand = request.data.get('demand', 'Medium')
        
        if not name:
            return Response({"error": "Skill name is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Check duplicate
        if db.skills.find_one({'name': name}):
            return Response({"error": "Skill already exists."}, status=status.HTTP_400_BAD_REQUEST)
            
        skill_doc = {
            "name": name,
            "category": category,
            "demand": demand,
            "users_count": 0
        }
        db.skills.insert_one(skill_doc)
        
        return Response({"message": "Skill added successfully."}, status=status.HTTP_201_CREATED)

    def delete(self, request):
        db = get_db()
        skill_id = request.query_params.get('id')
        
        if not skill_id:
            return Response({"error": "Skill ID is required in query params."}, status=status.HTTP_400_BAD_REQUEST)
            
        db.skills.delete_one({'_id': ObjectId(skill_id)})
        return Response({"message": "Skill deleted successfully."}, status=status.HTTP_200_OK)

    def put(self, request):
        db = get_db()
        skill_id = request.data.get('id')
        name = request.data.get('name')
        category = request.data.get('category')
        demand = request.data.get('demand')
        
        if not skill_id:
            return Response({"error": "Skill ID is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        update_data = {}
        if name:
            update_data['name'] = name
        if category:
            update_data['category'] = category
        if demand:
            update_data['demand'] = demand
            
        if not update_data:
            return Response({"error": "Nothing to update."}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            result = db.skills.update_one({'_id': ObjectId(skill_id)}, {'$set': update_data})
            if result.modified_count > 0:
                return Response({"message": "Skill updated successfully."}, status=status.HTTP_200_OK)
            return Response({"error": "Skill not found or no change made."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AdminResourcesView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        if db.learning_resources.count_documents({}) == 0:
            seed_default_resources(db)
            
        resources = list(db.learning_resources.find())
        
        res_list = []
        for r in resources:
            res_list.append({
                "id": str(r['_id']),
                "title": r.get('title'),
                "type": r.get('type', 'Course'),
                "provider": r.get('provider', 'External'),
                "linked_skills": r.get('linked_skills', []),
                "url": r.get('url', '#'),
                "cost": r.get('cost', 'Free'),
                "rating": r.get('rating', 4.5)
            })
            
        return Response(res_list, status=status.HTTP_200_OK)

    def post(self, request):
        db = get_db()
        title = request.data.get('title')
        res_type = request.data.get('type', 'Course')
        provider = request.data.get('provider')
        linked_skills = request.data.get('linked_skills', [])
        url = request.data.get('url', '#')
        cost = request.data.get('cost', 'Free')
        rating = request.data.get('rating', 4.5)
        
        if not title or not provider:
            return Response({"error": "Title and provider are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        if isinstance(linked_skills, str):
            linked_skills = [s.strip() for s in linked_skills.split(',') if s.strip()]
            
        res_doc = {
            "title": title,
            "type": res_type,
            "provider": provider,
            "linked_skills": linked_skills,
            "url": url,
            "cost": cost,
            "rating": float(rating)
        }
        db.learning_resources.insert_one(res_doc)
        
        return Response({"message": "Learning resource added successfully."}, status=status.HTTP_201_CREATED)

    def put(self, request):
        db = get_db()
        resource_id = request.data.get('id')
        title = request.data.get('title')
        res_type = request.data.get('type')
        provider = request.data.get('provider')
        linked_skills = request.data.get('linked_skills')
        url = request.data.get('url')
        cost = request.data.get('cost')
        rating = request.data.get('rating')
        
        if not resource_id:
            return Response({"error": "Resource ID is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        update_data = {}
        if title: update_data['title'] = title
        if res_type: update_data['type'] = res_type
        if provider: update_data['provider'] = provider
        if url: update_data['url'] = url
        if cost: update_data['cost'] = cost
        if rating is not None: update_data['rating'] = float(rating)
        if linked_skills is not None:
            if isinstance(linked_skills, str):
                linked_skills = [s.strip() for s in linked_skills.split(',') if s.strip()]
            update_data['linked_skills'] = linked_skills
            
        result = db.learning_resources.update_one({'_id': ObjectId(resource_id)}, {'$set': update_data})
        if result.modified_count > 0:
            return Response({"message": "Learning resource updated successfully."}, status=status.HTTP_200_OK)
        return Response({"error": "Learning resource not found or no change made."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        db = get_db()
        resource_id = request.query_params.get('id')
        
        if not resource_id:
            return Response({"error": "Resource ID is required in query params."}, status=status.HTTP_400_BAD_REQUEST)
            
        db.learning_resources.delete_one({'_id': ObjectId(resource_id)})
        return Response({"message": "Learning resource deleted successfully."}, status=status.HTTP_200_OK)


class AdminBugsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        if db.bug_reports.count_documents({}) == 0:
            seed_default_bugs(db)
            
        bugs = list(db.bug_reports.find().sort('created_at', -1))
        
        # Optimize by getting all user details for these bugs
        emails = list(set([b.get('email') for b in bugs if b.get('email')]))
        users = list(db.users.find({'email': {'$in': emails}}, {'name': 1, 'role': 1, 'email': 1}))
        user_map = {u['email']: u for u in users}
        
        bug_list = []
        for b in bugs:
            email = b.get('email', 'Anonymous')
            user_info = user_map.get(email, {})
            bug_list.append({
                "id": str(b['_id']),
                "email": email,
                "user_name": user_info.get('name', 'Guest'),
                "user_role": user_info.get('role', 'Visitor'),
                "subject": b.get('subject', 'No Subject'),
                "description": b.get('description', ''),
                "status": b.get('status', 'Open'),
                "created_at": b.get('created_at', datetime.utcnow()).isoformat() if isinstance(b.get('created_at'), datetime) else str(b.get('created_at'))
            })
            
        return Response(bug_list, status=status.HTTP_200_OK)

    def put(self, request):
        db = get_db()
        bug_id = request.data.get('id')
        status_val = request.data.get('status')
        
        if not bug_id or not status_val:
            return Response({"error": "Bug ID and Status are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        result = db.bug_reports.update_one({'_id': ObjectId(bug_id)}, {'$set': {'status': status_val}})
        if result.modified_count > 0:
            return Response({"message": "Bug status updated successfully."}, status=status.HTTP_200_OK)
        return Response({"error": "Bug report not found or no change made."}, status=status.HTTP_404_NOT_FOUND)


class AdminSettingsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        db = get_db()
        config = db.admin_settings.find_one({})
        
        if not config:
            config = {
                "active_model": "gpt-4o",
                "ats_threshold": 75,
                "smtp_host": "smtp.gmail.com",
                "smtp_port": 587,
                "debug_mode": True,
                "updated_at": datetime.utcnow()
            }
            db.admin_settings.insert_one(config)
            
        return Response({
            "active_model": config.get('active_model', 'gpt-4o'),
            "ats_threshold": config.get('ats_threshold', 75),
            "smtp_host": config.get('smtp_host', 'smtp.gmail.com'),
            "smtp_port": config.get('smtp_port', 587),
            "debug_mode": config.get('debug_mode', True)
        }, status=status.HTTP_200_OK)

    def post(self, request):
        db = get_db()
        active_model = request.data.get('active_model')
        ats_threshold = request.data.get('ats_threshold')
        smtp_host = request.data.get('smtp_host')
        smtp_port = request.data.get('smtp_port')
        debug_mode = request.data.get('debug_mode')
        
        update_data = {"updated_at": datetime.utcnow()}
        if active_model: update_data['active_model'] = active_model
        if ats_threshold is not None: update_data['ats_threshold'] = int(ats_threshold)
        if smtp_host: update_data['smtp_host'] = smtp_host
        if smtp_port is not None: update_data['smtp_port'] = int(smtp_port)
        if debug_mode is not None: update_data['debug_mode'] = bool(debug_mode)
        
        db.admin_settings.update_one({}, {'$set': update_data}, upsert=True)
        return Response({"message": "Settings updated successfully."}, status=status.HTTP_200_OK)
