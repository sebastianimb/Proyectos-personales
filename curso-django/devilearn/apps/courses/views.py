from django.shortcuts import render

# Create your views here.
def course_list(request):
    courses_list = [
        {
            "id": 1,
            "level": 'Principiante',
            'rating': 4.8,
            'course_title': 'Python: fundamentos hasta los detalles',
            'instructor': 'Alison Walsh',
            'course_image': 'images/curso_1.jpg',
            'instructor_image': 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        {
            "id": 2,
            "level": 'Principianto',
            'rating': 5.0,
            'course_title': 'Django: Crea aplicaciones robustas',
            'instructor': 'Patty Kutch',
            'course_image': 'images/curso_2.jpg',
            'instructor_image': 'https://randomuser.me/api/portraits/women/20.jpg'
        },
        {
            "id": 3,
            "level": 'Avanzado',
            'rating': 7.0,
            'course_title': 'Django: Avanzado',
            'instructor': 'Alonzo Murray',
            'course_image': 'images/curso_3.jpg',
            'instructor_image': 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            "id": 4,
            "level": 'Avanzado',
            'rating': 10.0,
            'course_title': 'FastAPI: Avanzado',
            'instructor': 'Gregory Harris',
            'course_image': 'images/curso_4.jpg',
            'instructor_image': 'https://randomuser.me/api/portraits/women/68.jpg'
        },
    ]
    return render(request, 'courses/courses.html', {
        "courses_list": courses_list
    })

def course_detail(request):
    course = {
        'course_title': 'Django Aplicaciones',
        'course_link': 'course_lessons',
        'course_image': 'images/curso_2.jpg',
        'info_course': {
            'lessons': 79,
            'duration': 8,
            'instructor': 'Sebastian Molina'
        },
        'course_content': [
            {
                'id': 1,
                'name': 'Introduccion al curso',
                'lessons': [
                    {
                        'name': '¿Qué aprenderás en este curso?',
                        'type': 'video'
                    },
                    {
                        'name': '¿Cómo usar la plataforma?',
                        'type': 'article'
                    }
                ]
            }
        ]
    }
    return render(request, 'courses/courses_details.html', {
        'course': course
    })

def course_lessons(request):
    lessons = {
        'course_title': 'Django Aplicaciones',
        'progress': 30,
        'course_content': [
            {
                'id': 1,
                'name': 'Introduccion al curso',
                'total_lessons': 6,
                'complete_lessons': 3,
                'lessons': [
                    {
                        'name': '¿Qué aprenderás en este curso?',
                        'type': 'video'
                    },
                    {
                        'name': '¿Cómo usar la plataforma?',
                        'type': 'article'
                    }
                ]
            },
            {
                'id': 2,
                'name': 'Django principios',
                'total_lessons': 12,
                'complete_lessons': 2,
                'lessons': [
                    {
                        'name': '¿Qué aprenderás en este curso?',
                        'type': 'video'
                    },
                    {
                        'name': '¿Cómo usar la plataforma?',
                        'type': 'article'
                    }
                ]
            }
        ]
    }
    return render(request, 'courses/courses_lessons.html', {
        'lessons': lessons
    })
